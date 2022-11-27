import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import MasagiSvg from './svg/Masagi';
import DatePicker from 'react-native-date-picker';
import { getStringTanggal } from '../utils';
import ImageCropPicker from 'react-native-image-crop-picker';
import ViewShot from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Share from 'react-native-share';

const Masagi = () => {
  const [pemateri, setPemateri] = useState('');
  const [materi, setMateri] = useState('');
  const [picture, setPicture] = useState('');

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('18.15');
  const [tanggalModal, setTanggalModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);

  const { hari, tanggal, bulan, tahun } = getStringTanggal(date);

  const flyerRef = useRef();

  const handleGetPicture = () => {
    ImageCropPicker.openPicker({
      width: 600,
      height: 799,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        setPicture(image.path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // save to camera roll
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePicture(uri) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.save(uri);
    console.log('done');
  }

  // change img to svg
  const handleSave = async () => {
    let uri = await flyerRef.current.capture();
    await savePicture(uri);
  };

  // share functionality
  const handleShare = async () => {
    let uri = await flyerRef.current.capture();
    try {
      const shareResponse = await Share.open({
        message: 'hello from masagi',
        url: uri,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    // Pemateri
    <View style={{ flex: 1, width: '100%' }}>
      {/* date modal */}
      <DatePicker
        modal
        open={tanggalModal}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setTanggalModal(false);
          setDate(date);
        }}
        onCancel={() => {
          setTanggalModal(false);
        }}
      />

      {/* time modal */}
      <DatePicker
        modal
        open={timeModal}
        date={date}
        mode="time"
        onConfirm={(date) => {
          setTimeModal(false);
          setTime(`${date.getHours()}.${date.getMinutes()}`);
        }}
        onCancel={() => {
          setTimeModal(false);
        }}
      />

      {/* input */}
      <View style={{ marginBottom: SIZES.radius }}>
        <Text style={{ ...FONTS.h4, color: COLORS.white }}>Pemateri</Text>
        <TextInput
          style={{
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginTop: SIZES.base,
            color: COLORS.white,
          }}
          onChangeText={(text) => setPemateri(text)}
          value={pemateri}
          placeholder="Masukan pemateri"
          placeholderTextColor="#777"
        />
      </View>

      {/* Materi */}
      <View style={{ marginBottom: SIZES.radius }}>
        <Text style={{ ...FONTS.h4, color: COLORS.white }}>Materi</Text>
        <TextInput
          style={{
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginTop: SIZES.base,
            color: COLORS.white,
          }}
          maxLength={56}
          onChangeText={(text) => setMateri(text)}
          value={materi}
          placeholder="Masukan materi"
          placeholderTextColor="#777"
        />
      </View>

      {/* tanggal */}
      <View style={{ marginBottom: SIZES.radius }}>
        <Text style={{ ...FONTS.h4, color: COLORS.white }}>Tanggal</Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.padding,
            marginTop: SIZES.base,
            flexDirection: 'row',
          }}
          onPress={() => setTanggalModal(true)}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: '#777',
              marginHorizontal: SIZES.padding,
              marginVertical: SIZES.radius,
              flex: 1,
            }}
          >{`${tanggal}/${tahun}`}</Text>
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
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>T</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* waktu */}
      <View style={{ marginBottom: SIZES.radius }}>
        <Text style={{ ...FONTS.h4, color: COLORS.white }}>Waktu</Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.padding,
            marginTop: SIZES.base,
            flexDirection: 'row',
          }}
          onPress={() => setTimeModal(true)}
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
            {time}
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
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>T</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* get Photo */}
      <View style={{ marginBottom: SIZES.radius }}>
        <Text style={{ ...FONTS.h4, color: COLORS.white }}>Picture</Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.padding,
            marginTop: SIZES.base,
            flexDirection: 'row',
          }}
          onPress={handleGetPicture}
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
            url
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
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>C</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* share button */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: SIZES.radius,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.padding,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SIZES.padding,
            marginHorizontal: SIZES.base,
          }}
          onPress={handleSave}
        >
          <Text style={{ ...FONTS.h4, color: COLORS.white }}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.padding,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SIZES.padding,
            marginHorizontal: SIZES.base,
          }}
          onPress={handleShare}
        >
          <Text style={{ ...FONTS.h4, color: COLORS.white }}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* preview */}
      <Text style={{ ...FONTS.body4, color: 'white' }}>Preview :</Text>
      <ViewShot
        ref={flyerRef}
        options={{
          fileName: 'Your-File-Name',
          format: 'png',
          quality: 1,
        }}
      >
        <View
          style={{
            width: SIZES.width - SIZES.padding * 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SIZES.radius,
            position: 'relative',
          }}
        >
          <MasagiSvg
            hari={hari}
            tanggal={tanggal}
            bulan={bulan}
            tahun={tahun}
            judul={materi}
            pemateri={pemateri}
            time={time}
            picture={picture}
            width="100%"
            height="300"
          />
          {picture && (
            <View
              style={{
                width: 56.4,
                height: 79.9,
                position: 'absolute',
                zIndex: -10,
                top: 42,
                right: 120,
              }}
            >
              <Image
                source={{ uri: picture }}
                style={{
                  width: '270%',
                  height: '270%',
                }}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </ViewShot>
    </View>
  );
};

export default Masagi;
