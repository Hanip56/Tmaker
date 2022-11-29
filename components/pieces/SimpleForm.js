import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const SimpleForm = ({ value, setValue, placeholder, label }) => {
  return (
    <View style={{ marginBottom: SIZES.radius }}>
      <Text style={{ ...FONTS.h4, color: COLORS.white }}>{label}</Text>
      <TextInput
        style={{
          backgroundColor: COLORS.secondary,
          borderRadius: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.base,
          color: COLORS.white,
        }}
        onChangeText={(text) => setValue(text)}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#777"
      />
    </View>
  );
};

export default SimpleForm;
