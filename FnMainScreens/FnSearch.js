/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import WrapperScreen from '../FnFrequentUsage/FnWrapperScreen';
import {H_W} from '../FnFrequentUsage/FnResponsive';
import NavigationRef from '../FnFrequentUsage/FnRefNavigation';
import {colors} from '../FnFrequentUsage/FnColor';
import Data from '../FnData';
import Loop from '../FnFrequentUsage/FnFlatList';
import {connect} from 'react-redux';
import {
  FnsetCurrentProductAction,
  FnsetFavAction,
  FnremoveFavAction,
} from '../FnStateManagement/FnActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FnHeader from '../FnFrequentUsage/FnHeader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {FnHorizontalTile} from './FnHome';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.Product.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const FnGoToSingleProduct = (item) => {
    props.FnsetCurrentProductAction(item);
    NavigationRef.Navigate('FnSP');
  };

  const CardRender = (Arr) => {
    return (
      <Loop
        horizontal={false}
        data={Arr}
        renderItem={({item}) => (
          <FnHorizontalTile
            item={item}
            FnGoToSingleProduct={FnGoToSingleProduct}
            FnFavs={props.FnFavs}
            FnsetFav={(Fn) => props.FnsetFavAction(Fn)}
            FnremoveFav={(Fn) => props.FnremoveFavAction(Fn)}
          />
        )}
      />
    );
  };
  const FnGoBack = () => NavigationRef.GoBack();

  const FnchangeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <FnHeader
        leftIcon={SimpleLineIcons}
        leftIconName="arrow-left"
        leftIconColor={colors.primary}
        leftIconAction={FnGoBack}
        Title={<Text style={styles.FnSearch2}>Search</Text>}
      />
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
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: HEIGHT * 0.05,
              paddingLeft: H_W.width * 0.03,
              backgroundColor: `rgba(${colors.rgb_Primary},0.25)`,
              borderRadius: 7,
            }}>
            <Fontisto name="search" size={18} color={colors.primary} />
            <TextInput
              style={{
                width: '80%',
                fontWeight: 'bold',
                fontSize: 15,
                color: 'black',
                marginLeft: H_W.width * 0.02,
              }}
              placeholderTextColor={colors.darkGray}
              placeholder="Search Here..."
              onChangeText={FnchangeSearchText}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: HEIGHT * 0.01, flex: 1}}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.Product)}
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  FnCart: state.FnCartReducer.items,
  FnFavs: state.FnToggleFav,
});

export default connect(mapStateToProps, {
  FnsetCurrentProductAction,
  FnsetFavAction,
  FnremoveFavAction,
})(Search);

const styles = StyleSheet.create({
  FnSearch2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  FnSearch3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  FnSearch4: {
    width: '85%',
  },
});
