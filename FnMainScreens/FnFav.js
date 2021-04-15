/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {
  FnremoveFavAction,
  FnsetFavAction,
  FnsetCurrentProductAction,
} from '../FnStateManagement/FnActions';
import {H_W} from '../FnFrequentUsage/FnResponsive';
import FnHeader from '../FnFrequentUsage/FnHeader';
import {colors} from '../FnFrequentUsage/FnColor';
import WrapperScreen from '../FnFrequentUsage/FnWrapperScreen';
import Loop from '../FnFrequentUsage/FnFlatList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationRef from '../FnFrequentUsage/FnRefNavigation';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FnVerticalTile} from './FnHome';

const FnFavourites = (props) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const FnGoToSingleProduct = (item) => {
    props.FnsetCurrentProductAction(item);
    NavigationRef.Navigate('FnSP');
  };

  const FnGoBack = () => NavigationRef.Navigate('FnHome');

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
            top: HEIGHT * 0.5,
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
      <View style={{flex: 1}}>
        <Loop
          numColumns={2}
          horizontal={false}
          data={props.FnFavs}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}>
              <FnVerticalTile
                item={item}
                FnGoToSingleProduct={FnGoToSingleProduct}
                FnCart={props.FnCart}
              />
            </View>
          )}
          ListHeaderComponent={
            <FnHeader
              leftIcon={FontAwesome}
              leftIconName="chevron-left"
              leftIconAction={FnGoBack}
              Title={
                <Text style={styles.FnFav2}>
                  {props.FnFavs.length} Favourites
                </Text>
              }
            />
          }
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    FnCart: state.FnCartReducer.items,
    FnFavs: state.FnToggleFav,
  };
};

export default connect(mapStateToProps, {
  FnsetFavAction,
  FnsetCurrentProductAction,
  FnremoveFavAction,
})(FnFavourites);

const styles = StyleSheet.create({
  FnFav2: {
    color: colors.primary,
    fontSize: 22,
  },
});
