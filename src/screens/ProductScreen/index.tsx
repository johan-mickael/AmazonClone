import React, {useEffect, useState} from 'react';

import styles from './styles';
import {View, Text, Image, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import {useRoute} from '@react-navigation/native';
import Loader from '../../components/Loader';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setGlobalVariable} from '../../store';
import Snackbar from 'react-native-snackbar';
import {API_URL} from '../../../config/constants';

function ProductScreen() {
  const route = useRoute();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const globalVariable = useSelector(state => state.globalVariable.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${route.params.id}`);
        const json = await response.json();
        setProduct(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [route.params.id]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleButtonClick = () => {
    console.warn('Buy now');
  };

  const addToCart = async () => {
    if (0 >= quantity) {
      return;
    }
    await axios.post(`${API_URL}/carts`, {
      productId: product._id,
      quantity,
      option: selectedOption,
    });
    const res = await axios.get(`${API_URL}/carts/count`);
    dispatch(setGlobalVariable(res.data));
    Snackbar.show({
      text: `${quantity} item${quantity > 1 ? 's' : ''} added to cart`,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  return loading ? (
    <Loader size="large" color="#e47911" />
  ) : (
    <ScrollView style={styles.root}>
      <Text>{product.title}</Text>
      <ImageCarousel images={product.images} />
      {product.options && (
        <Picker
          selectedValue={selectedOption}
          onValueChange={itemValue => setSelectedOption(itemValue)}>
          {product.options.map(option => (
            <Picker.Item label={option} value={option} />
          ))}
        </Picker>
      )}

      <Text style={styles.price}>
        from ${product.price}
        {product.oldPrice && (
          <Text style={styles.oldPrice}>${product.oldPrice}</Text>
        )}
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button
        text={'Add to cart'}
        onPress={addToCart}
        containerStyles={{backgroundColor: '#e3c905'}}
      />
      <Button text={'Buy now'} onPress={handleButtonClick} />
    </ScrollView>
  );
}

export default ProductScreen;
