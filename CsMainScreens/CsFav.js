/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {
  CsremoveFavAction,
  CssetFavAction,
  CssetCurrentProductAction,
} from '../CsStateManagement/CsActions';
import {H_W} from '../CsFrequentUsage/CsResponsive';
import CsHeader from '../CsFrequentUsage/CsHeader';
import {colors} from '../CsFrequentUsage/CsColor';
import WrapperScreen from '../CsFrequentUsage/CsWrapperScreen';
import Loop from '../CsFrequentUsage/CsFlatList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationRef from '../CsFrequentUsage/CsRefNavigation';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CsVerticalTile} from './CsHome';

const CsFavourites = (props) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const CsGoToSingleProduct = (item) => {
    props.CssetCurrentProductAction(item);
    NavigationRef.Navigate('CsSP');
  };

  const CsGoBack = () => NavigationRef.Navigate('CsHome');

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
          data={props.CsFavs}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}>
              <CsVerticalTile
                item={item}
                CsGoToSingleProduct={CsGoToSingleProduct}
                CsCart={props.CsCart}
              />
            </View>
          )}
          ListHeaderComponent={
            <CsHeader
              leftIcon={FontAwesome}
              leftIconName="chevron-left"
              leftIconAction={CsGoBack}
              Title={
                <Text style={styles.CsFav2}>
                  {props.CsFavs.length} Favourites
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
    CsCart: state.CsCartReducer.items,
    CsFavs: state.CsToggleFav,
  };
};

export default connect(mapStateToProps, {
  CssetFavAction,
  CssetCurrentProductAction,
  CsremoveFavAction,
})(CsFavourites);

const styles = StyleSheet.create({
  CsFav2: {
    color: colors.primary,
    fontSize: 22,
  },
});
