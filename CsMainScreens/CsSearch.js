/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WrapperScreen from '../CsFrequentUsage/CsWrapperScreen';
import {H_W} from '../CsFrequentUsage/CsResponsive';
import NavigationRef from '../CsFrequentUsage/CsRefNavigation';
import {colors} from '../CsFrequentUsage/CsColor';
import Data from '../CsData';
import Loop from '../CsFrequentUsage/CsFlatList';
import {connect} from 'react-redux';
import {
  CssetCurrentProductAction,
  CssetFavAction,
  CsremoveFavAction,
} from '../CsStateManagement/CsActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CsSearchBar from '../CsFrequentUsage/CsSearchBar';
import CsHeader from '../CsFrequentUsage/CsHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {CsVerticalTile} from './CsHome';

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

  const CsGoToSingleProduct = (item) => {
    props.CssetCurrentProductAction(item);
    NavigationRef.Navigate('CsSP');
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
            <CsVerticalTile
              item={item}
              CsGoToSingleProduct={CsGoToSingleProduct}
              CsCart={props.CsCart}
            />
          </View>
        )}
      />
    );
  };
  const CsGoBack = () => NavigationRef.GoBack();

  const CschangeSearchText = (t) => setSearchText(t);
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
      <CsHeader
        leftIcon={FontAwesome}
        leftIconName="chevron-left"
        leftIconColor={colors.primary}
        leftIconAction={CsGoBack}
        Title={<Text style={styles.CsSearch2}>Search</Text>}
      />
      <View style={styles.CsSearch3}>
        <View
          style={{
            marginTop: HEIGHT * 0.01,
            ...styles.CsSearch4,
          }}>
          <CsSearchBar changeSearchText={CschangeSearchText} />
        </View>
      </View>
      <View style={{marginTop: HEIGHT * 0.01, flex: 1}}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.Product)}
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  CsCart: state.CsCartReducer.items,
  CsFavs: state.CsToggleFav,
});

export default connect(mapStateToProps, {
  CssetCurrentProductAction,
  CssetFavAction,
  CsremoveFavAction,
})(Search);

const styles = StyleSheet.create({
  CsSearch2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  CsSearch3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  CsSearch4: {
    width: '85%',
  },
});
