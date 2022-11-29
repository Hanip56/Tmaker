import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const PressForm = ({ label, onPress, textContent, logoButton }) => {
  return (
    <View style={{ marginBottom: SIZES.radius }}>
      <Text style={{ ...FONTS.h4, color: COLORS.white }}>{label}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.secondary,
          borderRadius: SIZES.padding,
          marginTop: SIZES.base,
          flexDirection: 'row',
        }}
        onPress={onPress}
      >
        <Text
          style={{
            ...FONTS.body3,
            color: '#777',
            marginHorizontal: SIZES.padding,
            marginVertical: SIZES.radius,
            flex: 1,
          }}
        >
          {textContent}
        </Text>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
          }}
        >
          <Text style={{ ...FONTS.h4, color: COLORS.white }}>{logoButton}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PressForm;
