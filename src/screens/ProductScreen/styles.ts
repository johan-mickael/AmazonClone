import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  description: {
    marginVertical: 10,
    lineHeight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  image: {
    height: 300,
    resizeMode: 'contain',
  },
});

export default styles;