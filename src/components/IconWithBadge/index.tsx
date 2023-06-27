import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {Badge} from 'react-native-elements';

const IconWithBadge = ({icon, badge}) => {
  return (
    <View>
      <Entypo name={icon.name} color={icon.color} size={25} />
      <Badge
        value={badge.text}
        status={badge.status}
        containerStyle={{position: 'absolute', top: -10, right: -10}}
      />
    </View>
  );
};

export default IconWithBadge;

const styles = StyleSheet.create({});
