import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import ShoppingCartStack from './ShoppingCartStack';
import ProfileScreen from '../screens/ProfileScreen';
import MoreScreen from '../screens/MoreScreen';
import HomeStack from './HomeStack';
import {Badge} from 'react-native-elements';
import IconWithBadge from '../components/IconWithBadge';
import {useDispatch, useSelector} from 'react-redux';
import {setTotalCount, setTotalPrice} from '../store';
import axios from 'axios';
import {API_URL} from '../../config/constants';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  const totalItems = useSelector(state => state.globalVariable.count);
  const dispatch = useDispatch();

  // count cart items
  useEffect(() => {
    async function fetchCart() {
      const res = await axios.get(`${API_URL}/carts/sum`);
      dispatch(setTotalCount(res.data.count));
      dispatch(setTotalPrice(res.data.price));
    }
    fetchCart();
  }, [totalItems]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        inactiveTintColor: '#ffbd7d',
        activeTintColor: '#e47911',
      }}>
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Entypo name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="user" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={ShoppingCartStack}
        name="ShoppingCart"
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <IconWithBadge
              icon={{name: 'shopping-cart', color: color}}
              badge={{text: totalItems, status: 'error'}}
            />
          ),
        }}
      />
      <Tab.Screen
        component={MoreScreen}
        name="More"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="menu" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
