import React from 'react';
import {FlatList, Text, View} from 'react-native';
import CartProductItems from '../../components/CartProductItem';
import {StyleSheet} from 'react-native';
import Button from '../../components/Button';

import products from '../../data/cart';

const ShoppingCartScreen = () => {
  const totalPrice = products.reduce(
    (summedPrice, product) =>
      summedPrice + product.item.price * product.quantity,
    0,
  );

  return (
    <View style={styles.page}>
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          Subtotal ({products.length} items):
          <Text style={{color: '#e47911'}}>${totalPrice.toFixed(2)}</Text>
        </Text>
        <Button
          text="Proceed to checkout"
          onPress={() => console.warn('Go to checkout')}
          containerStyles={{backgroundColor: '#f7e300', borderColor: '#c7b702'}}
        />
      </View>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <CartProductItems cartItem={item} />
          // render quantity selector
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});

export default ShoppingCartScreen;
