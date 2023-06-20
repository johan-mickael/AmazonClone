import React from 'react';
import {FlatList, View} from 'react-native';
import ProductItems from '../../components/ProductItem';
import {StyleSheet} from 'react-native';

import products from '../../data/products';

const index = () => {
  return (
    <View style={styles.page}>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductItems item={item} />}
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

export default index;
