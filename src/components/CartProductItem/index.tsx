import React, {useEffect, useState} from 'react';

import {View, Image, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import QuantitySelector from '../QuantitySelector';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setGlobalVariable} from '../../store';

interface CartProductItemProps {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    item: {
      id: string;
      title: string;
      image: string;
      avgRating: number;
      ratings: number;
      price: number;
      oldPrice?: number;
    };
  };
}

function CartProductItem({cartItem}: CartProductItemProps) {
  const {quantity: quantityProp, item} = cartItem;
  const [quantity, setQuantity] = useState(quantityProp);
  const globalVariable = useSelector(state => state.globalVariable.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateQuantity = async () => {
      await axios.post(
        `http://localhost:3000/api/carts/remove/item/${cartItem._id}`,
        {
          quantity,
        },
      );
      const res = await axios.get('http://localhost:3000/api/carts/count');
      dispatch(setGlobalVariable(res.data));
    };
    updateQuantity();
  }, [quantity]);

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <View style={styles.ratingsContainer}>
            {[0, 0, 0, 0, 0].map((el, i) => (
              <FontAwesome
                key={`${item._id}-${i}`}
                style={styles.star}
                name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
                size={18}
                color={'#e47911'}
              />
            ))}
            <Text>{item.ratings}</Text>
          </View>
          <Text style={styles.price}>
            from ${item.price}
            {item.oldPrice && (
              <Text style={styles.oldPrice}>${item.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </View>
    </View>
  );
}

export default CartProductItem;
