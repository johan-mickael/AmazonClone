import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Snackbar = ({text}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: 'gray',
  },
});
