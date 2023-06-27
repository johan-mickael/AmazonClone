import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const Loader = ({size, color}) => {
  return (
    <View style={styles.indicator}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
