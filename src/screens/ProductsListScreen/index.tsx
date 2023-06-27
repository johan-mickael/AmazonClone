import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, TextInput, View} from 'react-native';
import ProductItems from '../../components/ProductItem';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import Loader from '../../components/Loader';
import debounce from 'lodash.debounce';
import Snackbar from '../../components/Snackbar';

const ProductsListScreen = ({searchValue}) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadNewData, setLoadNewData] = useState(false);
  const [noData, setNoData] = useState(false);

  const handleError = () => {
    setProducts([]);
    setNoData(true);
    setLoadNewData(false);
    setLoading(false);
  };

  const fetchApi = async endpoint => {
    try {
      setLoading(true);
      setNoData(false);
      const {data} = await axios.get(endpoint);
      if (data.length === 0) {
        setLoading(false);
        setLoadNewData(false);
        return [];
      }
      setLoading(false);
      setLoadNewData(false);
      return data;
    } catch (error) {
      handleError();
    }
  };

  const fetchProducts = async () => {
    const data = await fetchApi(
      `http://localhost:3000/api/products?page=${page}`,
    );
    setProducts([...products, ...data]);
  };

  const searchProducts = async search => {
    setPage(1);
    const data = await fetchApi(
      `http://localhost:3000/api/products?search=${search}&limit=0`,
    );
    if (data.length === 0) {
      setNoData(true);
    }
    setProducts(data);
  };
  const debouncedSearch = debounce(searchProducts, 500);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue]);

  const handleLoadMore = () => {
    if (searchValue) {
      return;
    }
    setLoadNewData(true);
    setPage(page + 1);
    fetchProducts();
  };

  const keyExtractor = item => item._id.toString();

  const render = () => {
    if (noData) {
      return <Snackbar text="No product found ..." />;
    }
    return loading ? (
      <Loader size="large" color="#e47911" />
    ) : (
      <View style={styles.page}>
        <FlatList
          data={products}
          renderItem={({item}) => <ProductItems item={item} />}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          keyExtractor={keyExtractor}
        />

        {loadNewData && <Loader size="large" color="#e47911" />}
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  inputWrapper: {
    margin: 10,
    padding: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {height: 40, marginLeft: 10},
  safeAreaView: {backgroundColor: '#22e3dd'},
});

export default ProductsListScreen;
