/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {H_W} from './FnResponsive';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FnaddCartAction,
  FnremoveCartAction,
} from '../FnStateManagement/FnActions';

const ItemCounterWrapper = ({style, position, Counterlength, ...props}) => {
  return (
    <View
      style={{
        ...style,
        alignItems: 'center',
        flexDirection:
          position === 'top' || position === 'bottom' ? 'column' : 'row',
      }}>
      {(position === 'top' || position === 'left') && (
        <DefaultCounter
          position={position}
          item={props.item}
          FnaddCart={(i) => props.FnaddCartAction(i)}
          FnremoveCart={(i) => props.FnremoveCartAction(i)}
          Counterlength={Counterlength}
          counterColor={props.counterColor}
          counterContentColor={props.counterContentColor}
        />
      )}
      {props.children}
      {(position === 'bottom' || position === 'right') && (
        <DefaultCounter
          position={position}
          item={props.item}
          FnaddCart={(i) => props.FnaddCartAction(i)}
          FnremoveCart={(i) => props.FnremoveCartAction(i)}
          Counterlength={Counterlength}
          counterColor={props.counterColor}
          counterContentColor={props.counterContentColor}
        />
      )}
    </View>
  );
};

const DefaultCounter = ({
  item,
  FnremoveCart,
  FnaddCart,
  position,
  Counterlength,
  counterColor,
  counterContentColor,
}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <View
      style={{
        ...styles.itemCounter_CE2,
        paddingVertical: HEIGHT * 0.003,
        backgroundColor: counterColor ? counterColor : 'white',
      }}>
      <View
        style={{
          ...styles.itemCounter_CE1,
          marginVertical: HEIGHT * 0.013,
          ...(position === 'top' || position === 'bottom'
            ? {width: Counterlength}
            : {height: Counterlength}),
          flexDirection:
            position === 'top' || position === 'bottom' ? 'row' : 'column',
        }}>
        <TouchableOpacity onPress={() => FnremoveCart(item)}>
          <FontAwesome
            name="minus"
            size={H_W.width * 0.05}
            color={counterContentColor ? counterContentColor : 'black'}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            color: counterContentColor ? counterContentColor : 'black',
          }}>
          {item.added}
        </Text>
        <TouchableOpacity onPress={() => FnaddCart(item)}>
          <FontAwesome
            name="plus"
            size={H_W.width * 0.05}
            color={counterContentColor ? counterContentColor : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCounter_CE1: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCounter_CE2: {
    borderRadius: 15,
    elevation: 3,
    paddingHorizontal: H_W.width * 0.03,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});

export default connect(null, {FnaddCartAction, FnremoveCartAction})(
  ItemCounterWrapper,
);
