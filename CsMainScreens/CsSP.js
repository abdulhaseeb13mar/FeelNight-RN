/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {H_W} from '../CsFrequentUsage/CsResponsive';
import WrapperScreen from '../CsFrequentUsage/CsWrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../CsFrequentUsage/CsColor';
import NavigationRef from '../CsFrequentUsage/CsRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  CsremoveFavAction,
  CssetFavAction,
  CsaddCartAction,
  CsremoveCartAction,
  CssetCurrentProductAction,
} from '../CsStateManagement/CsActions';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Loop from '../CsFrequentUsage/CsFlatList';
import Data from '../CsData';
import {CsVerticalTile} from './CsHome';
import CsHeader from '../CsFrequentUsage/CsHeader';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
    filterRecommendedProducts();
  }, []);
  const CsProduct = props.CsProduct;
  const [fav, setFav] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const filterRecommendedProducts = () => {
    const filteredProducts = Data.Product.filter(
      (item) => item.categoryid === CsProduct.categoryid,
    );
    setRecommendedProducts(filteredProducts);
  };

  const checkIfFav = () => {
    for (let Cs = 0; Cs < props.CsFavs.length; Cs++) {
      if (props.CsFavs[Cs].id === CsProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.CsremoveFavAction(CsProduct.id)
      : props.CssetFavAction(CsProduct);
    setFav(!fav);
  };

  const CsAddToCart = () => {
    props.CsaddCartAction({...CsProduct});
  };

  const CsRemoveFromCart = () => {
    props.CsCart[CsProduct.id] !== undefined &&
      props.CsremoveCartAction(CsProduct);
  };

  const CsGoBack = () => NavigationRef.GoBack();

  const CsGoToSingleProduct = (item) => {
    props.CssetCurrentProductAction(item);
    NavigationRef.Navigate('CsSP');
  };

  return (
    <WrapperScreen
      statusColor={`rgba(${colors.rgb_Primary},0.3)`}
      style={{backgroundColor: 'white'}}>
      <LinearGradient
        style={{
          zIndex: -1,
          width: H_W.width,
          height: H_W.height,
          position: 'absolute',
        }}
        colors={[
          `rgba(${colors.rgb_Primary},0.3)`,
          `rgba(${colors.rgb_Primary},0.9)`,
        ]}
        end={{x: 0, y: 1}}
        start={{x: 0, y: 0}}
      />
      <ImageBackground
        style={{width: H_W.width, height: HEIGHT}}
        source={CsProduct.image}
        resizeMode="cover">
        <CsHeader
          leftIcon={FontAwesome}
          leftIconName="chevron-left"
          leftIconAction={CsGoBack}
        />
        <Text
          numberOfLines={3}
          style={{
            marginTop: HEIGHT * 0.05,
            paddingLeft: H_W.width * 0.05,
            fontSize: 35,
            fontFamily: 'Palatino-Bold',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: colors.primary,
          }}>
          {CsProduct.product}
        </Text>
        <View
          style={{
            borderTopLeftRadius: 40,
            backgroundColor: 'white',
            width: H_W.width * 0.9,
            position: 'absolute',
            bottom: -insets.bottom,
            right: 0,
          }}>
          <View
            style={{
              borderTopLeftRadius: 40,
              backgroundColor: `rgba(${colors.rgb_Primary},0.1)`,
              width: H_W.width * 0.9,
              height: H_W.height * 0.65,
              paddingTop: HEIGHT * 0.03,
              paddingHorizontal: H_W.width * 0.04,
            }}>
            <TouchableOpacity onPress={toggleFav}>
              <AntDesign
                name={fav ? 'heart' : 'hearto'}
                size={30}
                color={colors.primary}
                style={{}}
              />
            </TouchableOpacity>
            <ScrollView bounces={false}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <ImageBackground
                  style={{
                    width: H_W.width * 0.45,
                    height: H_W.width * 0.45,
                    borderRadius: H_W.width * 0.225,
                    backgroundColor: colors.primary,
                    shadowColor: colors.primary,
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.85,
                    shadowRadius: 10.27,
                  }}
                  source={CsProduct.image}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={{
                  marginTop: HEIGHT * 0.03,
                  fontSize: 20,
                  textAlign: 'center',
                  fontFamily: 'KohinoorTelugu-Medium',
                }}>
                {CsProduct.product}
              </Text>
              <Text
                style={{
                  marginTop: HEIGHT * 0.03,
                  fontSize: 15,
                  fontFamily: 'KohinoorTelugu-Medium',
                  color: colors.darkGray,
                  opacity: 0.8,
                  textAlign: 'center',
                }}>
                {CsProduct.dis}
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: H_W.width * 0.03,
                  marginTop: HEIGHT * 0.04,
                }}>
                <Text
                  style={{
                    fontSize: 23,
                    fontFamily: 'KohinoorTelugu-Medium',
                  }}>
                  $234
                </Text>
                {props.CsCart[CsProduct.id] !== undefined &&
                props.CsCart[CsProduct.id].added !== 0 ? (
                  <View
                    style={{
                      height: HEIGHT * 0.05,
                      paddingHorizontal: H_W.width * 0.03,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 0.29,
                      shadowRadius: 4.65,
                      backgroundColor: 'white',
                      borderRadius: 10,
                    }}>
                    <TouchableOpacity
                      onPress={CsRemoveFromCart}
                      style={{
                        backgroundColor: colors.primary,
                        borderRadius: 5,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                      }}>
                      <Entypo name="minus" size={22} color="white" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginHorizontal: H_W.width * 0.04,
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {props.CsCart[CsProduct.id].added}
                    </Text>
                    <TouchableOpacity
                      onPress={CsAddToCart}
                      style={{
                        backgroundColor: colors.primary,
                        borderRadius: 5,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                      }}>
                      <Entypo name="plus" size={22} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={CsAddToCart}
                    style={{
                      height: HEIGHT * 0.05,
                      paddingHorizontal: H_W.width * 0.03,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.primary,
                      borderRadius: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 0.29,
                      shadowRadius: 4.65,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'KohinoorTelugu-Medium',
                        color: 'white',
                        fontSize: 17,
                      }}>
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text
                style={{
                  marginTop: HEIGHT * 0.03,
                  marginLeft: H_W.width * 0.03,
                  fontSize: 18,
                  fontFamily: 'KohinoorTelugu-Medium',
                }}>
                Recommended Products
              </Text>
              <Loop
                style={{marginTop: HEIGHT * 0.03, marginBottom: HEIGHT * 0.03}}
                data={recommendedProducts}
                renderItem={({item}) => (
                  <CsVerticalTile
                    item={item}
                    CsGoToSingleProduct={CsGoToSingleProduct}
                  />
                )}
              />
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    CsProduct: state.CsCrntPrdtReducer,
    CsFavs: state.CsToggleFav,
    totalItems: state.CsCartReducer.totalItems,
    CsCart: state.CsCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  CssetFavAction,
  CsremoveFavAction,
  CsremoveCartAction,
  CssetCurrentProductAction,
  CsaddCartAction,
})(React.memo(SingleProduct));
