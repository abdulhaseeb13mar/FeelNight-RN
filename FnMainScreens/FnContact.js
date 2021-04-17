/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../FnFrequentUsage/FnWrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {H_W} from '../FnFrequentUsage/FnResponsive';
import {colors} from '../FnFrequentUsage/FnColor';
import {Button, Overlay} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isFormValid} from '../FnFrequentUsage/Fnvalidation';
import NavPointer from '../FnFrequentUsage/FnRefNavigation';
import {
  FnUserAction,
  FnresetCart,
  FnsetCurrentProductAction,
} from '../FnStateManagement/FnActions';
import UseHeader from '../FnFrequentUsage/FnHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Loop from '../FnFrequentUsage/FnFlatList';
import ItemCounterWrapper from '../FnFrequentUsage/FnItemCounterWrapper';
import {FnVerticalTile} from './FnHome';

const ConfirmOrder = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.FnCart]);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [phone, setPhone] = useState('');

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.FnCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.FnCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const FnConfirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);
      }, 2000);
      props.FnUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
      });
    }
  };

  // const CallApi = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       'https://reactnativeapps.herokuapp.com/customers',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           firstname: firstName,
  //           address: address,
  //           phonenumber: phone,
  //           email: email,
  //           appname: 'BountiFul Bags',
  //         }),
  //       },
  //     );
  //     const response = await res.json();
  //     setLoading(false);
  //     response.status ? setShowModal(true) : ShowToast('Some error occurred');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setEmailErrMsg('');
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  // const MoveToConfirmOrder = () => {
  //   props.FnresetCart();
  //   NavPointer.Push('FnConfirmOrder');
  // };

  const closeModal = () => {
    setShowModal(false);
    props.FnresetCart();
    NavPointer.NavigateAndReset('FnHome');
  };
  const FnGoToSingleProduct = (item) => {
    props.FnsetCurrentProductAction(item);
    NavPointer.Navigate('FnSP');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const FnGoBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <UseHeader
          leftIcon={SimpleLineIcons}
          leftIconName="arrow-left"
          leftIconColor={colors.primary}
          leftIconAction={FnGoBack}
          Title={<Text style={styles.FnContact2}>Checkout</Text>}
        />
        <Loop
          data={HorizontalCartArray}
          renderItem={({item}) => (
            <ItemCounterWrapper
              style={{marginVertical: HEIGHT * 0.025}}
              counterColor={colors.primary}
              counterContentColor="white"
              item={item}
              position="top"
              Counterlength={H_W.width * 0.2}>
              <FnVerticalTile
                item={item}
                FnGoToSingleProduct={FnGoToSingleProduct}
              />
            </ItemCounterWrapper>
          )}
        />
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: H_W.width * 0.035,
            paddingTop: HEIGHT * 0.03,
            marginBottom: HEIGHT * 0.04,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
              Total Price
            </Text>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
              $ {props.total}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: HEIGHT * 0.01,
              paddingBottom: HEIGHT * 0.03,
              borderBottomWidth: 1,
            }}>
            <Text style={{color: 'white'}}>Payment Method</Text>
            <Text style={{color: 'white'}}>Cash on Delivery</Text>
          </View>
        </View>
        <View style={styles.FnPersonalInfoWrapper}>
          <View style={styles.FnSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FnPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.FnPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.FnSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FnPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.FnPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.FnSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FnPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              CONTACT NUMBER<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.FnPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Contact Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.FnSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FnPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              DELIVERY ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.FnPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.13}}
                onChangeText={changeAddress}
                multiline
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
        </View>
        <Overlay
          onBackdropPress={closeModal}
          isVisible={showModal}
          animationType="fade">
          <View
            style={{
              ...styles.FnModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <MaterialCommunityIcons
              name="bottle-tonic-outline"
              size={H_W.width * 0.25}
              color="white"
            />
            <Text style={styles.FnModalHeadText}>
              YOUR ORDER HAS BEEN CONFIRMED!
            </Text>
          </View>
        </Overlay>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 20,
          }}>
          <Button
            raised
            loading={loading}
            onPress={FnConfirm}
            disabled={props.FnTotalItems === 0}
            title="CONFIRM ORDER"
            titleStyle={{fontWeight: 'bold', fontSize: 20}}
            containerStyle={{width: '95%'}}
            buttonStyle={{
              paddingVertical: HEIGHT * 0.02,
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.46,
              shadowRadius: 11.14,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.FnCartReducer.totalAmount,
    FnCart: state.FnCartReducer.items,
    FnTotalItems: state.FnCartReducer.totalItems,
  };
};

export default connect(mapStateToProps, {
  FnUserAction,
  FnresetCart,
  FnsetCurrentProductAction,
})(React.memo(ConfirmOrder));

const styles = StyleSheet.create({
  FnContact2: {
    color: colors.primary,
    fontSize: 22,
  },
  FnModalHeadText: {
    fontSize: H_W.width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  FnModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  Input: {
    width: H_W.width * 0.81,
    color: colors.primary,
    fontWeight: 'bold',
  },
  FnInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.secondary,
  },
  FnPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  FnPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  FnSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  FnPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
