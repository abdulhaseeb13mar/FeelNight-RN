/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {H_W} from '../FnFrequentUsage/FnResponsive';
import WrapperScreen from '../FnFrequentUsage/FnWrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../FnFrequentUsage/FnColor';
import NavigationRef from '../FnFrequentUsage/FnRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  FnremoveFavAction,
  FnsetFavAction,
  FnaddCartAction,
  FnremoveCartAction,
  FnsetCurrentProductAction,
} from '../FnStateManagement/FnActions';
import Data from '../FnData';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FastImage from 'react-native-fast-image';
import FnHeader from '../FnFrequentUsage/FnHeader';

function SingleProduct(props) {
  useEffect(() => {
    getTheCategory();
    checkIfFav();
  }, []);
  const FnProduct = props.FnProduct;
  const [fav, setFav] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const getTheCategory = () => {
    for (let Fn = 0; Fn < Data.Category.length; Fn++) {
      if (Data.Category[Fn].id === FnProduct.categoryid) {
        setProductCategory(Data.Category[Fn].category);
        break;
      }
    }
  };

  const checkIfFav = () => {
    for (let Fn = 0; Fn < props.FnFavs.length; Fn++) {
      if (props.FnFavs[Fn].id === FnProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.FnremoveFavAction(FnProduct.id)
      : props.FnsetFavAction(FnProduct);
    setFav(!fav);
  };

  const FnAddToCart = () => {
    props.FnaddCartAction({...FnProduct});
  };

  const FnRemoveFromCart = () => {
    props.FnCart[FnProduct.id] !== undefined &&
      props.FnremoveCartAction(FnProduct);
  };

  const FnGotoCart = () => NavigationRef.Navigate('FnContact');
  const FnGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      style={{backgroundColor: `rgba(${colors.rgb_Primary},0.45)`}}
      statusColor={`rgba(${colors.rgb_Primary},0.45)`}>
      <FnHeader
        leftIcon={SimpleLineIcons}
        leftIconName="arrow-left"
        leftIconAction={FnGoBack}
        rightIcon={SimpleLineIcons}
        rightIconAction={FnGotoCart}
        rightIconName="handbag"
      />
      <View
        style={{
          flex: 1,
          marginTop: HEIGHT * 0.25,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: 'rgba(255,255,255,0.7)',
          marginBottom: -insets.bottom,
          paddingBottom: insets.bottom,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={FnProduct.image}
            style={{
              width: H_W.width * 0.8,
              height: HEIGHT * 0.4,
              marginTop: -HEIGHT * 0.24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.44,
              shadowRadius: 6.27,
              overflow: 'visible',
            }}
            resizeMode="contain"
          />
          <View
            style={{
              width: H_W.width,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: H_W.width * 0.05,
              marginTop: HEIGHT * 0.01,
            }}>
            <Text
              style={{
                fontFamily: 'GillSans-Light',
                fontSize: 13.5,
                paddingHorizontal: H_W.width * 0.01,
              }}>
              {productCategory.toUpperCase()}
            </Text>
            <Text>Price</Text>
          </View>
          <View
            style={{
              width: H_W.width,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: H_W.width * 0.05,
              marginTop: HEIGHT * 0.005,
            }}>
            <Text
              style={{
                fontFamily: 'DamascusMedium',
                fontSize: 23,
                width: H_W.width * 0.65,
              }}>
              {FnProduct.name.toUpperCase()}
            </Text>
            <Text
              style={{
                fontFamily: 'DamascusMedium',
                fontSize: 20,
              }}>
              ${FnProduct.price}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'DamascusLight',
              fontSize: 15,
              marginTop: HEIGHT * 0.02,
              paddingHorizontal: H_W.width * 0.05,
            }}>
            {FnProduct.dis}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: H_W.width,
            paddingHorizontal: H_W.width * 0.06,
          }}>
          <TouchableOpacity
            onPress={toggleFav}
            style={{
              borderWidth: 1,
              borderColor: colors.darkGray,
              paddingHorizontal: H_W.width * 0.03,
              paddingVertical: HEIGHT * 0.01,
              borderRadius: 10,
            }}>
            <AntDesign
              name={fav ? 'heart' : 'hearto'}
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
          {props.FnCart[FnProduct.id] !== undefined ? (
            <View
              style={{
                width: H_W.width * 0.65,
                height: HEIGHT * 0.063,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                backgroundColor: `rgba(${colors.rgb_Primary},0.7)`,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
              }}>
              <TouchableOpacity
                onPress={FnRemoveFromCart}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: H_W.width * 0.015,
                  paddingVertical: HEIGHT * 0.004,
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                }}>
                <AntDesign name="minus" size={22} />
              </TouchableOpacity>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                {props.FnCart[FnProduct.id].added}
              </Text>
              <TouchableOpacity
                onPress={FnAddToCart}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: H_W.width * 0.015,
                  paddingVertical: HEIGHT * 0.004,
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                }}>
                <AntDesign name="plus" size={22} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={FnAddToCart}
              style={{
                width: H_W.width * 0.65,
                height: HEIGHT * 0.059,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `rgba(${colors.rgb_Primary},0.7)`,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Add to cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    FnProduct: state.FnCrntPrdtReducer,
    FnFavs: state.FnToggleFav,
    totalItems: state.FnCartReducer.totalItems,
    FnCart: state.FnCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  FnsetFavAction,
  FnremoveFavAction,
  FnremoveCartAction,
  FnsetCurrentProductAction,
  FnaddCartAction,
})(React.memo(SingleProduct));
