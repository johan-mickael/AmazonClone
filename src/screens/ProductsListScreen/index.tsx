import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Text, TextInput, View} from 'react-native';
import ProductItems from '../../components/ProductItem';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import Loader from '../../components/Loader';
import debounce from 'lodash.debounce';
import Snackbar from '../../components/Snackbar';

const ProductsListScreen = ({searchValue = ''}) => {
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
      const {data} = await axios.get(endpoint);
      setLoading(false);
      setLoadNewData(false);
      if (data.length === 0) {
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
    setNoData(false);
    setLoadNewData(true);
    const data = await fetchApi(
      `http://localhost:3000/api/products?page=${page}`,
    );
    setLoading(false);
    setLoadNewData(false);
    if (data.length === 0) {
      return;
    }
    setProducts([...products, ...data]);
  };

  const searchProducts = async search => {
    setLoading(true);
    setNoData(false);
    setPage(1);
    const data = await fetchApi(
      `http://localhost:3000/api/products?search=${search}&limit=0`,
    );
    if (data.length === 0) {
      setNoData(true);
      setProducts([]);
    }
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const debouncedSearch = debounce(searchProducts, 500);

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
      return (
        <View style={styles.page}>
          <Snackbar text="No data found" />
        </View>
      );
    }
    return loading ? (
      <View style={{padding: 40}}>
        <Loader size="large" color="#e47911" />
      </View>
    ) : (
      <View style={styles.page}>
        <View>
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={products}
            renderItem={({item}) => <ProductItems item={item} />}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            keyExtractor={keyExtractor}
          />
        </View>
        {loadNewData && (
          <View style={styles.infiniteLoader}>
            <Loader size="large" color="gray" />
          </View>
        )}
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    height: '100%',
    width: '100%',
  },
  flatlist: {
    paddingBottom: 150,
  },
  infiniteLoader: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    height: '95%',
    width: '105%',
    opacity: 0.4,
  },
  loading: {
    backgroundColor: '',
  },
});

export default ProductsListScreen;
