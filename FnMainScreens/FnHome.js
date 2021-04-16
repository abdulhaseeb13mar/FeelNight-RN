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
import Fontisto from 'react-native-vector-icons/Fontisto';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Badge} from 'react-native-elements';
import HomeSvg from '../FnAllAssets/UtilityAssets/HomeSvg';
import LinearGradient from 'react-native-linear-gradient';
import dp from '../FnAllAssets/Images/1.png';
import FnHeader from '../FnFrequentUsage/FnHeader';

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
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <Loop
        style={{paddingBottom: HEIGHT * 0.03}}
        ListHeaderComponent={
          <ScrollView bounces={false}>
            <FnHeader
              leftIcon={SimpleLineIcons}
              leftIconName="heart"
              rightIcon={SimpleLineIcons}
              rightIconName="handbag"
            />
            <Text
              style={{
                marginLeft: H_W.width * 0.06,
                marginVertical: HEIGHT * 0.02,
                fontSize: 30,
                fontFamily: 'Verdana',
                color: '#CF596D',
              }}>
              PERFUME <Text style={{color: 'black'}}>Store</Text>{' '}
            </Text>
            <View style={{paddingHorizontal: H_W.width * 0.06}}>
              <View
                style={{
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,
                  borderRadius: 7,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: HEIGHT * 0.05,
                    paddingLeft: H_W.width * 0.03,
                    backgroundColor: `rgba(${colors.rgb_Primary},0.25)`,
                    borderRadius: 7,
                  }}>
                  <Fontisto name="search" size={18} color={colors.primary} />
                  <Text style={{marginLeft: H_W.width * 0.02}}>
                    Search Here...
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: HEIGHT * 0.03}}>
              <Loop
                data={Fncategories}
                renderItem={({item}) => (
                  <TabList
                    item={item}
                    FncurrentCat={FncurrentCat}
                    FnchangeTab={FnchangeTab}
                  />
                )}
              />
            </View>
            <View style={{marginVertical: HEIGHT * 0.03}}>
              <Loop
                data={FntabProducts}
                renderItem={({item}) => <FnVerticalTile item={item} />}
              />
            </View>
            <Text style={{marginLeft: H_W.width * 0.06, fontSize: 25}}>
              Best Deals
            </Text>
          </ScrollView>
        }
        horizontal={false}
        data={FntabProducts}
        renderItem={({item}) => <FnHorizontalTile item={item} />}
      />
    </WrapperScreen>
  );
}

export const FnVerticalTile = ({item, FnGoToSingleProduct, FnCart}) => {
  useEffect(() => {
    getTheCategory();
  }, []);

  const [productCategory, setProductCategory] = useState('');

  const getTheCategory = () => {
    for (let Fn = 0; Fn < Data.Category.length; Fn++) {
      if (Data.Category[Fn].id === item.categoryid) {
        setProductCategory(Data.Category[Fn].category);
        break;
      }
    }
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  return (
    <View
      style={{
        width: H_W.width * 0.57,
        marginHorizontal: H_W.width * 0.05,
      }}>
      <View style={{zIndex: -1, position: 'absolute'}}>
        <HomeSvg width={H_W.width * 0.57} height={HEIGHT * 0.29} />
      </View>
      <LinearGradient
        style={{
          width: H_W.width * 0.57,
          height: HEIGHT * 0.29,
          position: 'absolute',
          zIndex: -1,
        }}
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        locations={[0.1, 1]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />
      <FastImage
        source={item.image}
        style={{
          width: '100%',
          height: HEIGHT * 0.24,
          marginTop: HEIGHT * 0.02,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.64,
          shadowRadius: 10.27,
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'GillSans-Light',
          fontSize: 12,
          paddingHorizontal: H_W.width * 0.01,
        }}
        numberOfLines={2}>
        {productCategory.toUpperCase()}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'DamascusMedium',
          marginTop: HEIGHT * 0.01,
          fontSize: 16,
          paddingHorizontal: H_W.width * 0.007,
        }}
        numberOfLines={2}>
        {item.name.toUpperCase()}
      </Text>
    </View>
  );
};

export const FnHorizontalTile = ({item, FnGoToSingleProduct}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => FnGoToSingleProduct(item)}
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: H_W.width * 0.85,
        }}>
        <LinearGradient
          style={{
            width: H_W.width * 0.2,
            height: H_W.width * 0.2,
            borderRadius: 13,
          }}
          colors={[`rgba(${colors.rgb_Primary},0.7)`, 'rgba(255,255,255,1)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <FastImage
            source={item.image}
            style={{
              width: H_W.width * 0.2,
              height: H_W.width * 0.2,
              borderRadius: 13,
            }}
            resizeMode="contain"
          />
        </LinearGradient>
        <View
          style={{
            width: H_W.width * 0.6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              numberOfLines={2}
              style={{
                color: 'black',
                width: H_W.width * 0.35,
                fontFamily: textFont.FuturaMedium,
                fontSize: 15.5,
              }}>
              {item.name}
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                alignSelf: 'flex-start',
                marginTop: HEIGHT * 0.015,
              }}>
              <Text style={{fontSize: 18}}>${item.price}</Text>
            </View>
          </View>
          <Ionicons name="heart-circle" size={37} />
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
        marginHorizontal: H_W.width * 0.03,
        paddingHorizontal: H_W.width * 0.03,
        paddingVertical: HEIGHT * 0.005,
        borderRadius: 10,
        backgroundColor:
          item.category === FncurrentCat.category ? 'black' : null,
        borderWidth: 1,
        borderColor: colors.lightGrey3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      }}
      onPress={() => FnchangeTab(item)}>
      <Text
        style={{
          fontWeight: 'bold',
          color:
            item.category === FncurrentCat.category ? 'white' : colors.primary,
          fontSize: item.category === FncurrentCat.category ? 25 : 20,
          fontFamily: 'PingFangSC-Ultralight',
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
};
const border = {
  borderColor: 'red',
  borderWidth: 1,
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
