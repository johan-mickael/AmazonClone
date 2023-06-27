import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ProductsListScreen from '../ProductsListScreen';
import HeaderComponent from '../../components/Header';

const HomeScreen = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <View>
      <HeaderComponent
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <ProductsListScreen searchValue={searchValue} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
