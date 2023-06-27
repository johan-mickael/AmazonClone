import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import {SafeAreaView, View, TextInput, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();

interface HeaderComponentProps {
  searchValue: string;
  setSearchValue: () => void;
}

const HeaderComponent = ({
  searchValue,
  setSearchValue,
}: HeaderComponentProps) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.inputWrapper}>
        <Feather name="search" size={20} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>
    </SafeAreaView>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{title: 'Home', headerShown: false}}>
        {() => <HomeScreen />}
      </Stack.Screen>
      <Stack.Screen component={ProductScreen} name="ProductDetails" options={{title: "Product details"}} />
    </Stack.Navigator>
  );
};

export default HomeStack;

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
