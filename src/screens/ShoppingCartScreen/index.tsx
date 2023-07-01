import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';
import axios from 'axios';
import Loader from '../../components/Loader';
import { API_URL } from '../../../config/constants';

const ShopingCartScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    const res = await axios.get(`${API_URL}/carts`);
    const cart = res.data;
    setProducts(cart);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      const res = await axios.get(`${API_URL}/carts`);
      const cart = res.data;
      setProducts(cart);
      setLoading(false);
    }
    fetchCart();
  }, [isFocused]);

  const totalPrice = products.reduce(
    (summedPrice, product) =>
      summedPrice + product.item.price * product.quantity,
    0,
  );

  const onCheckout = () => {
    navigation.navigate('Address');
  };

  const render = () => {
    if (loading) {
      return <Loader size="large" color="#e47911" />;
    }
    return (
      <View style={styles.page}>
        {/* Render Product Componet */}
        <FlatList
          data={products}
          renderItem={({item}) => <CartProductItem cartItem={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              <Text style={{fontSize: 18}}>
                Subtotal ({products.length} items):{' '}
                <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                  ${totalPrice.toFixed(2)}
                </Text>
              </Text>
              <Button
                text="Proceed to checkout"
                onPress={onCheckout}
                containerStyles={{
                  backgroundColor: '#f7e300',
                  borderColor: '#c7b702',
                }}
              />
            </View>
          )}
        />
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});

export default ShopingCartScreen;
