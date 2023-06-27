import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import ProductItems from '../../components/ProductItem';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import Loader from '../../components/Loader';
import debounce from 'lodash.debounce';
import Feather from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadNewData, setLoadNewData] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const fetchProducts = async () => {
    try {
      const {data} = await axios.get(
        `http://localhost:3000/api/products?page=${page}`,
      );
      if (data.length === 0) {
        setLoading(false);
        setLoadNewData(false);
        return;
      }
      setProducts([...products, ...data]);
      setLoading(false);
      setLoadNewData(false);
    } catch (error) {
      console.error(error);
    }
  };

  const searchProducts = debounce(async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(
        `http://localhost:3000/api/products?search=${searchValue}&page=${page}`,
      );
      setProducts(data);
      setLoading(false);
      setLoadNewData(false);
    } catch (error) {
      console.error(error);
    }
  }, 300);

  useEffect(() => {
    fetchProducts();
  }, [searchValue]);

  const handleLoadMore = () => {
    setLoadNewData(true);
    setPage(page + 1);
    fetchProducts();
  };

  const keyExtractor = item => item._id.toString();

  return loading ? (
    <Loader size="large" color="#e47911" />
  ) : (
    <View>
      <SafeAreaView style={{backgroundColor: '#22e3dd'}}>
        <View
          style={{
            margin: 10,
            padding: 5,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Feather name="search" size={20} />
          <TextInput
            style={{height: 40, marginLeft: 10}}
            placeholder="Search..."
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </View>
      </SafeAreaView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});

export default HomeScreen;
