import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, SIZES } from './constants/theme';
import Modal from 'react-native-modal';
import { kajianTemplateList } from './constants/constants';
import { Masagi, TablighAkbar } from './components';

const App = () => {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  let content = (
    <View>
      <Text style={{ ...FONTS.body3, color: 'white' }}>
        Pilih template terlebih dahulu
      </Text>
    </View>
  );

  if (selectedTemplate) {
    if (selectedTemplate === 'tk1') {
      content = <Masagi />;
    } else if (selectedTemplate === 'tk2') {
      content = <TablighAkbar />;
    }
  }

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Tunggu dulu!', 'Tinggalkan Aplikasi?', [
        {
          text: 'TIDAK',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'IYA', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg, flex: 1 }}>
      {/* status bar */}
      <StatusBar animated={true} backgroundColor={COLORS.bg} />

      {/* Modal */}
      <Modal
        backdropColor="#00000090"
        isVisible={showSelectModal}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <View
          style={{
            width: '95%',
            height: '50%',
            backgroundColor: '#eee',
            borderRadius: SIZES.radius,
            padding: SIZES.radius,
          }}
        >
          <ScrollView style={{ flex: 1 }}>
            {kajianTemplateList?.map((el) => (
              <TouchableOpacity
                key={el.id}
                style={{
                  flexDirection: 'row',
                  marginBottom: SIZES.radius,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: SIZES.base,
                  borderRadius: SIZES.base,
                }}
                onPress={() => {
                  setSelectedTemplate(el.id);
                  setShowSelectModal(false);
                }}
              >
                <Text style={{ flex: 1, ...FONTS.h4, textAlign: 'center' }}>
                  {el.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Pressable onPress={() => setShowSelectModal(false)}>
          <Text
            style={{
              ...FONTS.body4,
              color: 'white',
              marginTop: SIZES.base,
              backgroundColor: '#d15555',
              paddingVertical: 2,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
              fontWeight: 'bold',
            }}
          >
            Cancel
          </Text>
        </Pressable>
      </Modal>

      {/* title */}
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.white,
          textAlign: 'center',
          marginVertical: SIZES.radius,
        }}
      >
        LfLab
      </Text>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: SIZES.padding,
        }}
      >
        {/* select template */}
        <TouchableOpacity
          style={{
            paddingVertical: SIZES.base,
            width: '100%',
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.padding,
            marginBottom: SIZES.radius * 3,
          }}
          onPress={() => setShowSelectModal(true)}
        >
          <Text
            style={{ ...FONTS.body4, color: COLORS.white, textAlign: 'center' }}
          >
            PILIH TEMPLATE
          </Text>
        </TouchableOpacity>

        {/* info */}
        {content}
      </View>
    </ScrollView>
  );
};

export default App;
