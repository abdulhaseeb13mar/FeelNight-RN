/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../CsFrequentUsage/CsWrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {H_W} from '../CsFrequentUsage/CsResponsive';
import {colors} from '../CsFrequentUsage/CsColor';
import {Button, Overlay} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isFormValid} from '../CsFrequentUsage/Csvalidation';
import NavPointer from '../CsFrequentUsage/CsRefNavigation';
import {CsUserAction, CsresetCart} from '../CsStateManagement/CsActions';
import Toast from 'react-native-root-toast';
import UseHeader from '../CsFrequentUsage/CsHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const ConfirmOrder = (props) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
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

  const CsConfirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        MoveToConfirmOrder();
      }, 2000);
      props.CsUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      position: -60,
      backgroundColor: colors.secondary,
      opacity: 1,
      textColor: 'white',
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            address: address,
            phonenumber: phone,
            email: email,
            appname: 'BountiFul Bags',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status ? setShowModal(true) : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

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

  const MoveToConfirmOrder = () => {
    props.CsresetCart();
    NavPointer.Push('CsConfirmOrder');
  };

  const closeModal = () => {
    setShowModal(false);
    props.CsresetCart();
    NavPointer.Push('CsHome');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const CsGoBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

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
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <UseHeader
          leftIcon={FontAwesome}
          leftIconName="chevron-left"
          leftIconColor={colors.primary}
          leftIconAction={CsGoBack}
          Title={<Text style={styles.CsContact2}>Checkout</Text>}
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
        <View style={styles.CsPersonalInfoWrapper}>
          <View style={styles.CsSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.CsPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.CsPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.CsSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.CsPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.CsPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.CsSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.CsPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              CONTACT NUMBER<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.CsPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Contact Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.CsSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.CsPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              DELIVERY ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.CsPersonalInfoInputWrapper}>
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
              ...styles.CsModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <MaterialCommunityIcons
              name="bag-personal"
              size={H_W.width * 0.25}
              color="white"
            />
            <Text style={styles.CsModalHeadText}>
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
            onPress={CsConfirm}
            disabled={props.CsTotalItems === 0}
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
    total: state.CsCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {CsUserAction, CsresetCart})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  CsContact2: {
    color: colors.primary,
    fontSize: 22,
  },
  CsModalHeadText: {
    fontSize: H_W.width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  CsModalWrapper: {
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
  CsInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.secondary,
  },
  CsPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  CsPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  CsSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  CsPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
