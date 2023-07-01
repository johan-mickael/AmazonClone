import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Loader from '../../components/Loader';
import Snackbar from 'react-native-snackbar';

const MoreScreen = () => {
  Snackbar.show({
    text: 'This screen will be available soon.',
    duration: Snackbar.LENGTH_SHORT,
  });
  return <Loader size="large" color="gray" />;
};

export default MoreScreen;

const styles = StyleSheet.create({});
