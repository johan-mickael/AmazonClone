import React from 'react';
import {SafeAreaView, View, TextInput, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

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

export default HeaderComponent;

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
