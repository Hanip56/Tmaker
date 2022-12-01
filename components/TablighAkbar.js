import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import TablighAkbarSVG from './svg/TablighAkbarSVG';
import DatePicker from 'react-native-date-picker';
import { getStringTanggal } from '../utils';
import ImageCropPicker from 'react-native-image-crop-picker';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import SimpleForm from './pieces/SimpleForm';
import PressForm from './pieces/PressForm';

// 1. setState - get which changeable
// 2.

const TablighAkbar = () => {
  const [pemateri, setPemateri] = useState('');
  const [materi, setMateri] = useState('');
  const [picture, setPicture] = useState('');
  const [ahadKe, setAhadKe] = useState('');
  const [sebagai, setSebagai] = useState('');
  const [curLines, setCurlines] = useState(1);
  const [materiFontOptions, setMateriFontOptions] = useState({});
  const [sebagaiOffset, setSebagaiOffset] = useState(false);

  const [date, setDate] = useState(new Date());
  const [dari, setDari] = useState('13.00');
  const [sampai, setSampai] = useState('15.00');
  const [tanggalModal, setTanggalModal] = useState(false);
  const [dariModal, setDariModal] = useState(false);
  const [sampaiModal, setSampaiModal] = useState(false);

  const { hari, tanggal, bulan, tahun } = getStringTanggal(date);

  const flyerRef = useRef();

  const onTextLayout = useCallback((e) => {
    setCurlines(e.nativeEvent.lines.length);
  }, []);

  useEffect(() => {
    if (curLines >= 4) {
      setMateriFontOptions({
        size: 11,
        lineHeight: 14,
      });
      return;
    }

    if (curLines === 1) {
      setMateriFontOptions({
        size: 14.5,
        lineHeight: 18,
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
        Tabligh Akbar
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

      {/* dari modal */}
      <DatePicker
        modal
        open={dariModal}
        date={date}
        mode="time"
        onConfirm={(date) => {
          setDariModal(false);
          setDari(
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
          setDariModal(false);
        }}
      />

      {/* sampai modal */}
      <DatePicker
        modal
        open={sampaiModal}
        date={date}
        mode="time"
        onConfirm={(date) => {
          setSampaiModal(false);
          setSampai(
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
          setSampaiModal(false);
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

      {/* Sebagai */}
      <SimpleForm
        label="Sebagai"
        placeholder="Jabatan/pangkat"
        value={sebagai}
        setValue={setSebagai}
      />

      {/* Ahad ke */}
      <SimpleForm
        label="Ahad Ke"
        placeholder="-"
        value={ahadKe}
        setValue={setAhadKe}
        keyboardType="number-pad"
        maxLength={1}
      />

      {/* tanggal */}
      <PressForm
        label="Tanggal"
        textContent={`${tanggal}/${tahun}`}
        onPress={() => setTanggalModal(true)}
        logoButton="T"
      />

      {/* waktu */}
      <View style={{ flexDirection: 'row' }}>
        <PressForm
          label="Dari"
          textContent={dari}
          onPress={() => setDariModal(true)}
          logoButton="d"
          containerStyle={{ flex: 1, marginRight: 4 }}
        />
        <PressForm
          label="Sampai"
          textContent={sampai}
          onPress={() => setSampaiModal(true)}
          logoButton="s"
          containerStyle={{ flex: 1, marginLeft: 4 }}
        />
      </View>

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
          height: 440,
        }}
      >
        <TablighAkbarSVG
          width="100%"
          height="100%"
          hari={hari}
          tanggal={tanggal}
          dari={dari}
          sampai={sampai}
          bulan={bulan}
          tahun={tahun}
          ahadKe={ahadKe}
        />

        {/* MATER */}
        <View
          style={{
            position: 'absolute',
            left: 15.4,
            top: 38,
            zIndex: 10,
            width: 125,
            height: 55,
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
            left: 20,
            top: sebagaiOffset ? 210 : 217,
            fontSize:
              pemateri.length <= 30 ? 11 : pemateri.length <= 46 ? 10 : 8,
            fontFamily: 'MADETOMMY-Black',
            lineHeight: 12,
            color: '#466859',
            backgroundColor: '#ffd86b',
            paddingVertical: pemateri.length <= 30 ? 3 : 2,
            paddingHorizontal: 8,
            borderRadius: SIZES.radius,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            zIndex: 10,
            minWidth: 140,
            maxWidth: 260,
            opacity: 1,
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            textDecorationColor: '#466859',
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {pemateri}
        </Text>

        {/* Sebagai */}
        <Text
          style={{
            position: 'absolute',
            left: 26,
            top: sebagaiOffset ? 233 : 240,
            fontSize: 5.2,
            fontFamily: 'MADETOMMY-Bold',
            lineHeight: 6.2,
            color: '#FFD051',
            zIndex: 10,
            width: 110,
            opacity: 1,
          }}
          numberOfLines={3}
          onTextLayout={(e) => {
            if (e.nativeEvent.lines.length === 3) {
              setSebagaiOffset(true);
            } else if (e.nativeEvent.lines.length <= 2) {
              setSebagaiOffset(false);
            }
          }}
        >
          {sebagai && `( ${sebagai} )`}
        </Text>

        {/* picture */}
        {picture && (
          <View
            style={{
              width: 63,
              height: 80,
              position: 'absolute',
              zIndex: -10,
              top: 80,
              right: 106,
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

export default TablighAkbar;
