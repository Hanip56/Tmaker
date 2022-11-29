import {
  View,
  Text,
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
import SimpleForm from './pieces/SimpleForm';
import PressForm from './pieces/PressForm';

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
  // async function hasAndroidPermission() {
  //   const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  //   const hasPermission = await PermissionsAndroid.check(permission);
  //   if (hasPermission) {
  //     return true;
  //   }

  //   const status = await PermissionsAndroid.request(permission);
  //   return status === 'granted';
  // }

  // async function savePicture(uri) {
  //   if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
  //     return;
  //   }
  //   CameraRoll.save(uri);
  //   console.log('done');
  // }

  // change img to svg
  // const handleSave = async () => {
  //   let uri = await flyerRef.current.capture();
  //   await savePicture(uri);
  // };

  // share functionality
  const handleShare = async () => {
    let uri = await flyerRef.current.capture();
    try {
      const shareResponse = await Share.open({
        message: `
        🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊

HADIRILAH

📚 *MAGHRIB SABTU NGAJI (MASAGI)*

🕋 MASJID AL-FIRDAUS PPI 259 FIRDAUS PANGALENGAN 🕌

Bersama,
👳🏻‍♀️ *${pemateri}*, 

Berjudul,
*_"${materi}"_*

🗓️ *${hari},${tanggal} ${bulan} ${tahun}*

🕕 *Pukul ${time}-Selesai WIB*

🕌 *Bertempat di Masjid Al-Firdaus*

_________
😷 *_Terapkan Protokol Kesehatan_*

📹Live streaming di FB Lensa Firdaus https://m.facebook.com/lensafirdaus259/

#masagimasjidalfirdauspangalengan #masjidalfirdausppi259 #masjidalfirdauspangalengan #ppi259firdaus #rgugppi259 #syubbaanulfirdaus #lensafirdaus #blkppi259 #kopontrenppi259 #ayokemasjid #ayohijrahbersama #keluargabesarmasjidalfirdauspangalengan #keluargabesarpersispangalengan #tablighakbarmasjidalfirdaus #indonesia #quotes #sunnatanhasanatan #alquran #quran #hadis #hadits #alhadits #quransunnah #persis #ppi #masjid #mesjid #islam #muslim`,
        url: uri,
      });
    } catch (error) {
      console.log(error.message);
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
      <SimpleForm
        label="Pemateri"
        placeholder="Masukan pemateri"
        value={pemateri}
        setValue={setPemateri}
      />

      {/* Materi */}
      <SimpleForm
        label="Materi"
        placeholder="Masukan materi"
        value={materi}
        setValue={setMateri}
      />

      {/* tanggal */}
      <PressForm
        label="Tanggal"
        textContent={`${tanggal}/${tahun}`}
        onPress={() => setTanggalModal(true)}
        logoButton="T"
      />

      {/* waktu */}
      <PressForm
        label="Waktu"
        textContent={time}
        onPress={() => setTimeModal(true)}
        logoButton="W"
      />

      {/* get Photo */}
      <PressForm
        label="Picture"
        textContent={'url'}
        onPress={handleGetPicture}
        logoButton="C"
      />

      {/* share button */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: SIZES.radius,
          flexDirection: 'row',
        }}
      >
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

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
        style={{
          backgroundColor: 'gray',
          width: SIZES.width - SIZES.padding * 2,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZES.radius,
          position: 'relative',
          height: 311,
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
          height="100%"
        />

        {/* PEMATERI */}
        <Text
          style={{
            position: 'absolute',
            left: 37,
            bottom: 73,
            fontSize: pemateri.length <= 30 ? 13 : 10,
            fontWeight: '700',
            lineHeight: 17,
            color: '#1A6882',
            backgroundColor: '#BBE2E2',
            paddingVertical: 0.5,
            paddingHorizontal: 8,
            borderRadius: SIZES.padding,
            borderTopLeftRadius: 0,
            zIndex: 10,
            minWidth: 150,
            maxWidth: 240,
          }}
          numberOfLines={1}
        >
          {pemateri}
        </Text>

        {/* picture */}
        {picture && (
          <View
            style={{
              width: 56.4,
              height: 79.9,
              position: 'absolute',
              zIndex: -10,
              top: 42.5,
              right: 122,
            }}
          >
            <Image
              source={{ uri: picture }}
              style={{
                width: '281%',
                height: '281%',
              }}
              resizeMode="contain"
            />
          </View>
        )}
      </ViewShot>
    </View>
  );
};

export default Masagi;
