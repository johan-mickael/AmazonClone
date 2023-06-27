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

function ProductScreen() {
  const route = useRoute();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const globalVariable = useSelector(state => state.globalVariable.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${route.params.id}`,
        );
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
    await axios.post('http://localhost:3000/api/carts', {
      productId: product._id,
      quantity,
      option: selectedOption,
    });
    const res = await axios.get('http://localhost:3000/api/carts/count');
    dispatch(setGlobalVariable(res.data));
    console.log('Added to cart');
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
