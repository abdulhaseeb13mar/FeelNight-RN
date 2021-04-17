/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {
  FnremoveFavAction,
  FnsetFavAction,
  FnsetCurrentProductAction,
} from '../FnStateManagement/FnActions';
import FnHeader from '../FnFrequentUsage/FnHeader';
import {colors} from '../FnFrequentUsage/FnColor';
import WrapperScreen from '../FnFrequentUsage/FnWrapperScreen';
import Loop from '../FnFrequentUsage/FnFlatList';
import NavigationRef from '../FnFrequentUsage/FnRefNavigation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {FnHorizontalTile} from './FnHome';

const FnFavourites = (props) => {
  const FnGoToSingleProduct = (item) => {
    props.FnsetCurrentProductAction(item);
    NavigationRef.Navigate('FnSP');
  };

  const FnGoBack = () => NavigationRef.Navigate('FnHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <Loop
          horizontal={false}
          data={props.FnFavs}
          renderItem={({item}) => (
            <FnHorizontalTile
              item={item}
              FnGoToSingleProduct={FnGoToSingleProduct}
              FnFavs={props.FnFavs}
              FnsetFav={(Fn) => props.FnsetFavAction(Fn)}
              FnremoveFav={(Fn) => props.FnremoveFavAction(Fn)}
            />
          )}
          ListHeaderComponent={
            <FnHeader
              leftIcon={SimpleLineIcons}
              leftIconName="arrow-left"
              leftIconAction={FnGoBack}
              Title={<Text style={styles.FnFav2}>Favourites</Text>}
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
