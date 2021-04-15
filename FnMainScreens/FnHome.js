/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import WrapperScreen from '../FnFrequentUsage/FnWrapperScreen';
import {colors, textFont} from '../FnFrequentUsage/FnColor';
import {H_W} from '../FnFrequentUsage/FnResponsive';
import Data from '../FnData';
import Loop from '../FnFrequentUsage/FnFlatList';
import RefNavigation from '../FnFrequentUsage/FnRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FnsetCurrentProductAction,
  FnremoveFavAction,
  FnsetFavAction,
} from '../FnStateManagement/FnActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import {Badge} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

function FnHome(props) {
  useEffect(() => {
    FnchangeTab(Data.Category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Fncategories, setFncategories] = useState(Data.Category);
  const [FncurrentCat, setFnCurrentCat] = useState(Data.Category[0]);
  const [FntabProducts, setFnTabProducts] = useState([]);

  const FnchangeTab = (tab) => {
    setFnCurrentCat(tab);
    const filteredProducts = Data.Product.filter(
      (item) => item.categoryid === tab.id,
    );
    setFnTabProducts(filteredProducts);
  };

  const FnGotoCart = () => RefNavigation.Navigate('FnCart');
  const FnGotoSearch = () => RefNavigation.Navigate('FnSearch');
  const FnGotoFav = () => RefNavigation.Navigate('FnFav');
  const FnGoToSingleProduct = (item) => {
    props.FnsetCurrentProductAction(item);
    RefNavigation.Navigate('FnSP');
  };

  return (
    <WrapperScreen
      statusColor={`rgba(${colors.rgb_Primary},0.2)`}
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary},0.2)`,
      }}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: -H_W.width * 0.06,
            height: HEIGHT * 0.02,
          },
          shadowOpacity: 1,
          shadowRadius: 14.78,
        }}>
        <LinearGradient
          style={{
            zIndex: -1,
            width: H_W.width * 1.2,
            height: H_W.width * 1.2,
            borderRadius: H_W.width * 0.6,
            position: 'absolute',
            right: -H_W.width * 0.4,
            top: HEIGHT * 0.1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          colors={[
            `rgba(${colors.rgb_Primary},0.0)`,
            `rgba(${colors.rgb_Primary},0.1)`,
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: -H_W.width * 0.06,
                height: HEIGHT * 0.02,
              },
              shadowOpacity: 0.1,
              shadowRadius: 14.78,
            }}>
            <LinearGradient
              style={{
                zIndex: -1,
                width: H_W.width * 1.05,
                height: H_W.width * 1.05,
                borderRadius: H_W.width * 0.6,
                marginLeft: H_W.width * 0.15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={[
                `rgba(${colors.rgb_Primary},0.0)`,
                `rgba(${colors.rgb_Primary},0.5)`,
              ]}>
              <LinearGradient
                style={{
                  zIndex: -1,
                  width: H_W.width * 0.9,
                  height: H_W.width * 0.9,
                  borderRadius: H_W.width * 0.6,
                  marginLeft: H_W.width * 0.15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                colors={[
                  `rgba(${colors.rgb_Primary},0.0)`,
                  `rgba(${colors.rgb_Primary},0.5)`,
                ]}
              />
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
      <Loop
        ListHeaderComponent={
          <ScrollView bounces={false}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: H_W.width * 0.04,
                flexDirection: 'row',
                marginTop: HEIGHT * 0.025,
              }}>
              <TouchableOpacity
                onPress={FnGotoFav}
                style={{
                  padding: 5,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                }}>
                <Ionicons name="heart" color={colors.primary} size={23} />
              </TouchableOpacity>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={FnGotoCart}
                  style={{
                    padding: 5,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,
                  }}>
                  <Feather
                    name="shopping-cart"
                    color={colors.primary}
                    size={23}
                  />
                  {props.FntotalItems > 0 && (
                    <Badge
                      value={''}
                      containerStyle={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                      }}
                      badgeStyle={{
                        backgroundColor: 'red',
                      }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={FnGotoSearch}
                  style={{
                    padding: 5,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,
                  }}>
                  <Feather name="search" color={colors.primary} size={23} />
                </TouchableOpacity>
              </View>
            </View>
            <Loop
              style={{marginTop: HEIGHT * 0.03}}
              data={Fncategories}
              renderItem={({item}) => (
                <TabList
                  item={item}
                  FncurrentCat={FncurrentCat}
                  FnchangeTab={FnchangeTab}
                />
              )}
            />
            <Text
              style={{
                fontFamily: textFont.Avenir,
                marginLeft: H_W.width * 0.05,
                marginBottom: HEIGHT * 0.03,
                fontSize: 20,
              }}>
              {FntabProducts.length} Products
            </Text>
          </ScrollView>
        }
        numColumns={2}
        horizontal={false}
        data={FntabProducts}
        renderItem={({item}) => (
          <FnVerticalTile
            item={item}
            FnGoToSingleProduct={FnGoToSingleProduct}
            FnCart={props.FnCart}
          />
        )}
      />
    </WrapperScreen>
  );
}

export const FnVerticalTile = ({item, FnGoToSingleProduct, FnCart}) => {
  useEffect(() => {
    checkIfInCart();
  }, []);

  const checkIfInCart = () => {};

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  return (
    <TouchableOpacity
      onPress={() => FnGoToSingleProduct(item)}
      style={{
        paddingVertical: HEIGHT * 0.02,
        paddingHorizontal: H_W.width * 0.025,
        borderRadius: 15,
        backgroundColor: 'white',
        width: H_W.width * 0.45,
        marginHorizontal: H_W.width * 0.025,
        marginBottom: HEIGHT * 0.02,
        shadowColor: colors.primary,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      }}>
      <FastImage
        source={item.image}
        style={{
          width: '80%',
          height: HEIGHT * 0.15,
          alignSelf: 'center',
        }}
        resizeMode="contain"
      />
      <Text
        numberOfLines={2}
        style={{
          fontFamily: textFont.FuturaMedium,
          fontSize: 15,
          marginTop: HEIGHT * 0.025,
        }}>
        {item.product}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          color: colors.darkGray,
          marginTop: HEIGHT * 0.005,
          fontSize: 12.5,
        }}>
        {item.dis}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: HEIGHT * 0.02,
        }}>
        <Text style={{fontSize: 17, fontWeight: 'bold', color: colors.primary}}>
          ${item.price}
        </Text>
        <View>
          <Feather name="shopping-cart" color={colors.lightGrey3} size={19} />
          {FnCart && FnCart[item.id] !== undefined && (
            <Badge
              value={''}
              containerStyle={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              badgeStyle={{
                backgroundColor: 'red',
              }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TabList = ({item, FnchangeTab, FncurrentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: H_W.width * 0.03,
      }}
      onPress={() => FnchangeTab(item)}>
      <Text
        style={{
          fontWeight: 'bold',
          color:
            item.category === FncurrentCat.category ? 'black' : colors.primary,
          opacity: item.category === FncurrentCat.category ? 1 : 0.8,
          fontSize: item.category === FncurrentCat.category ? 35 : 25,
          marginTop: HEIGHT * 0.01,
          fontFamily: 'Palatino-Roman',
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    FntotalItems: state.FnCartReducer.totalItems,
    FnCart: state.FnCartReducer.items,
    FnFavs: state.FnToggleFav,
  };
};

export default connect(mapStateToProps, {
  FnsetCurrentProductAction,
  FnremoveFavAction,
  FnsetFavAction,
})(FnHome);
