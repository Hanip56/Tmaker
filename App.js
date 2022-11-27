import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, SIZES } from './constants/theme';
import Modal from 'react-native-modal';
import { kajianTemplateList } from './constants/constants';
import { Masagi } from './components';

const App = () => {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  let content = (
    <View>
      <Text style={{ ...FONTS.body3, color: 'white' }}>
        Please select template
      </Text>
    </View>
  );

  if (selectedTemplate) {
    if (selectedTemplate === 'tk1') {
      content = <Masagi />;
    }
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg, flex: 1 }}>
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
                onPress={() => setSelectedTemplate(el.id)}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    marginRight: SIZES.radius,
                  }}
                >
                  <Image
                    source={el.previewImage}
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
                <Text style={{ flex: 1, ...FONTS.h4 }}>{el.name}</Text>
                <Text style={{}}>{'>'}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Pressable onPress={() => setShowSelectModal(false)}>
          <Text style={{ ...FONTS.body4, color: 'white' }}>Hide modal</Text>
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
        BUAT CEPAT
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
            SELECT TEMPLATE
          </Text>
        </TouchableOpacity>

        {/* info */}
        {content}
      </View>
    </ScrollView>
  );
};

export default App;
