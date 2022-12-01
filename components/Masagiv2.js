import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import MasagiSvg from './svg/Masagi_v2';
import DatePicker from 'react-native-date-picker';
import { getStringTanggal } from '../utils';
import ImageCropPicker from 'react-native-image-crop-picker';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import SimpleForm from './pieces/SimpleForm';
import PressForm from './pieces/PressForm';

// 1. setState - get which changeable
// 2.

const MasagiV2 = () => {
  const [pemateri, setPemateri] = useState('');
  const [materi, setMateri] = useState('');
  const [picture, setPicture] = useState('');
  const [curLines, setCurlines] = useState(1);
  const [materiFontOptions, setMateriFontOptions] = useState({
    size: 11,
    lineHeight: 14,
  });

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('18.15');
  const [tanggalModal, setTanggalModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);

  const { hari, tanggal, bulan, tahun } = getStringTanggal(date);

  const flyerRef = useRef();

  const onTextLayout = useCallback((e) => {
    setCurlines(e.nativeEvent.lines.length);
  }, []);

  useEffect(() => {
    if (curLines >= 4) {
      setMateriFontOptions({
        size: 9,
        lineHeight: 11,
      });
      return;
    }

    if (curLines === 1) {
      setMateriFontOptions({
        size: 11,
        lineHeight: 14,
      });
      return;
    }
  }, [curLines]);

  const handleGetPicture = () => {
    ImageCropPicker.openPicker({
      width: 630,
      height: 800,
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
      {/* title */}
      <Text
        style={{
          ...FONTS.h4,
          color: COLORS.white,
          textAlign: 'center',
          textDecorationLine: 'underline',
          marginBottom: SIZES.base,
        }}
      >
        Masagi
      </Text>

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
          setTime(
            `${
              date.getHours().toString().length < 2
                ? `0${date.getHours()}`
                : date.getHours()
            }.${
              date.getMinutes().toString().length < 2
                ? `0${date.getMinutes()}`
                : date.getMinutes()
            }`
          );
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
          width="100%"
          height="100%"
          hari={hari}
          tanggal={tanggal}
          time={time}
          bulan={bulan}
          tahun={tahun}
        />

        {/* MATER */}
        <View
          style={{
            position: 'absolute',
            left: 15.4,
            top: 33,
            zIndex: 10,
            width: 125,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'Mont-HeavyDEMO',
              fontSize: materiFontOptions.size,

              lineHeight: materiFontOptions.lineHeight,
              color: '#537F6F',
              width: '100%',
            }}
            onTextLayout={onTextLayout}
            numberOfLines={curLines < 4 ? undefined : 4}
          >
            {materi}
          </Text>
        </View>

        {/* PEMATERI */}
        <Text
          style={{
            position: 'absolute',
            left: 18,
            bottom: 73,
            fontSize: pemateri.length <= 30 ? 11 : 9,
            fontFamily: 'Mont-HeavyDEMO',
            lineHeight: 12,
            color: '#537f6f',
            backgroundColor: '#ffd86b',
            paddingVertical: pemateri.length <= 30 ? 1 : 2,
            paddingTop: pemateri.length <= 30 ? 4 : 2,
            paddingHorizontal: 8,
            borderRadius: SIZES.radius,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            zIndex: 10,
            minWidth: 160,
            maxWidth: 280,
            opacity: 1,
          }}
          numberOfLines={1}
        >
          {pemateri}
        </Text>

        {/* picture */}
        {picture && (
          <View
            style={{
              width: 63,
              height: 80,
              position: 'absolute',
              zIndex: -10,
              top: 60,
              right: 107,
            }}
          >
            <Image
              source={{ uri: picture }}
              style={{
                width: '250%',
                height: '250%',
              }}
              resizeMode="cover"
            />
          </View>
        )}
      </ViewShot>
    </View>
  );
};

export default MasagiV2;
