/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
import FnSearchBar from '../FnFrequentUsage/FnSearchBar';
import FnHeader from '../FnFrequentUsage/FnHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {FnVerticalTile} from './FnHome';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.Product.filter((item) =>
      item.product.toLowerCase().includes(searchText.toLowerCase()),
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
        numColumns={2}
        horizontal={false}
        data={Arr}
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
      />
    );
  };
  const FnGoBack = () => NavigationRef.GoBack();

  const FnchangeSearchText = (t) => setSearchText(t);
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
          position: 'absolute',
          top: -HEIGHT * 0.2,
          right: -H_W.width * 0.4,
          zIndex: -1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient
          style={{
            width: H_W.width * 1.2,
            height: H_W.width * 1.2,
            borderRadius: H_W.width * 0.6,
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
                marginBottom: H_W.width * 0.15,
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
                  marginBottom: H_W.width * 0.15,
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
      <FnHeader
        leftIcon={FontAwesome}
        leftIconName="chevron-left"
        leftIconColor={colors.primary}
        leftIconAction={FnGoBack}
        Title={<Text style={styles.FnSearch2}>Search</Text>}
      />
      <View style={styles.FnSearch3}>
        <View
          style={{
            marginTop: HEIGHT * 0.01,
            ...styles.FnSearch4,
          }}>
          <FnSearchBar changeSearchText={FnchangeSearchText} />
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
    color: 'white',
  },
  FnSearch3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  FnSearch4: {
    width: '85%',
  },
});
