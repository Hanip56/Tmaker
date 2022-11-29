import Svg, { Path, Circle, Text, TSpan, Image } from 'react-native-svg';

const Masagi = ({
  judul = '',
  hari = '',
  tanggal = '',
  bulan = '',
  tahun = '',
  pukul = '',
  tempat = '',
  time = '',
  pemateri = '',
  picture = '',
  ...props
}) => {
  let arrJudul = judul?.split(' ');
  let convertedJudul = [];
  let maxWord = 20;
  let currentLine = 0;
  let titleFontSize = 52;
  let titleLineHeight = 58;

  for (let i = 0; i < arrJudul.length; i++) {
    const lines =
      convertedJudul[currentLine] &&
      convertedJudul[currentLine] + ' ' + arrJudul[i];

    if (lines?.length < maxWord) {
      convertedJudul[currentLine] = lines;
    } else {
      if (convertedJudul[0]) {
        currentLine += 1;
      }

      convertedJudul[currentLine] = arrJudul[i];
    }
  }

  if (convertedJudul.length > 0) {
    if (convertedJudul.length >= 3) {
      titleFontSize = 44;
      titleLineHeight = 48;
    }
    if (convertedJudul.length >= 4) {
      titleFontSize = 38;
      titleLineHeight = 38;
    }
    if (convertedJudul.length >= 5) {
      titleFontSize = 32;
      titleLineHeight = 32;
    }
  }

  return (
    <Svg viewBox="0 0 1000 1000" {...props}>
      <Path
        fill="#BBE2E2"
        d="M0 0v1000h1000V0H0zm940.7 638.3c0 103.4-83.8 187.3-187.3 187.3H425.1V342.2c0-103.4 83.8-187.3 187.3-187.3h328.3v483.4z"
      />
      <Path
        fill="#D8EEEC"
        d="M313.5 883.3c0 36.6-6.3 71.7-17.8 104.3-1.5 4.2-3 8.3-4.6 12.3H0V569.8c25.5 0 50.4 3.1 74.1 8.8 27.4 6.6 53.4 16.9 77.4 30.2 37.8 20.9 70.9 49.4 97.1 83.5 14.2 18.5 26.4 38.6 36.3 60 5.5 12 10.3 24.5 14.3 37.3 8.5 27.3 13.4 56.2 14.2 86.1.1 2.5.1 5.1.1 7.6z"
      />
      <Path
        fill="#489D9F"
        d="M211.5 883.3c0 37.9-10 73.6-27.5 104.3-2.4 4.2-4.9 8.3-7.6 12.3H0V671.8c26.1 0 51.1 4.7 74.1 13.4 16 6 31 13.8 44.9 23.3 17.8 12.2 33.7 27 47.1 43.9 9.1 11.5 17 24 23.6 37.3 12.9 26.1 20.6 55.3 21.7 86.1 0 2.4.1 5 .1 7.5z"
      />
      <Path
        fill="#D7EEEC"
        d="M1000 0v233h-3c-19.5 0-38.4-2.8-56.3-7.9v-70.2H837c-17.4-22.3-30.3-48.3-37.2-76.6-3.3-13.3-5.2-27.1-5.7-41.3-.1-2.3-.1-4.7-.1-7 0-10.2.8-20.2 2.2-30H1000z"
      />
      <Path
        fill="#489AA0"
        d="M1000 0v167h-3c-20.1 0-39.1-4.3-56.3-12.1-33-14.9-59-42.5-71.9-76.6-4.9-12.9-7.9-26.8-8.6-41.3-.1-2.3-.2-4.7-.2-7 0-10.3 1.1-20.3 3.3-30H1000z"
      />
      <Path
        fill="#166E87"
        d="M425.1 789.6H134.9c-33.5 0-60.7-27.2-60.7-60.8V300.6h355.6l-4.7 489z"
      />
      <Path fill="#D7EEEC" d="M966 37h6.7v41.3H966z" />
      <Path
        fill="#136F84"
        d="M961 78.3H665.7c-12.5 0-22.7-10.1-22.7-22.7V37h318v41.3z"
      />
      <Path
        fill="#D6E273"
        d="M573 875.7H61.3C33.5 875.7 11 898.2 11 926v61.7h511.7c27.8 0 50.3-22.5 50.3-50.3v-61.7z"
      />
      <Path
        fill="none"
        stroke="#EBD028"
        strokeWidth={10}
        strokeMiterlimit={10}
        d="M425.1 825.6h328.3c103.4 0 187.3-83.9 187.3-187.3V154.9H612.4c-103.4 0-187.3 83.9-187.3 187.3v483.4z"
      />
      <Path
        fill="#EBD722"
        d="M336 79.5H85V39h251c10.5 0 19 8.5 19 19v2.5c0 10.5-8.5 19-19 19z"
      />
      <Circle fill="#0D9648" cx={71.5} cy={57} r={31} />
      <Path
        fill="#176D85"
        d="M66.3 148.5H85V118H74.8c-4.7 0-8.5 3.8-8.5 8.5v22z"
      />
      <Path fill="#D6EEEC" d="M66.3 148.5h18.8V179H66.3z" />
      <Path fill="#2ABEC1" d="M66.3 179h18.8v30.5H66.3z" />
      <Path
        fill="#1A6882"
        d="M48 834.8v14.8h14V840c0-2.8-2.3-5.1-5.1-5.1H48z"
      />
      <Path fill="#D0EBE7" d="M34.1 834.8h14v14.7h-14z" />
      <Path
        fill="#2DBEC3"
        d="M20.1 834.8h14v14.7h-14zM92.5 834.8h14v14.7h-14z"
      />
      <Path fill="#D0EBE7" d="M78.6 834.8h14v14.7h-14z" />
      <Path
        fill="#1A6882"
        d="M64.6 849.5v-8.2c0-3.6 2.9-6.6 6.6-6.6h7.4v14.8h-14zM136.5 834.8v14.8h14V840c0-2.8-2.3-5.1-5.1-5.1h-8.9z"
      />
      <Path fill="#D0EBE7" d="M122.5 834.8h14v14.7h-14z" />
      <Path
        fill="#2DBEC3"
        d="M108.5 834.8h14v14.7h-14zM181 834.8h14v14.7h-14z"
      />
      <Path fill="#D0EBE7" d="M167 834.8h14v14.7h-14z" />
      <Path
        fill="#1A6882"
        d="M153 849.5v-8.2c0-3.6 2.9-6.6 6.6-6.6h7.4v14.8h-14z"
      />
      {/* <Path
        fill="#BBE2E2"
        d="M743.7 752.3H149c-16.6 0-30-13.4-30-30v-30h624.7c16.6 0 30 13.4 30 30s-13.5 30-30 30z"
      /> */}
      <Text
        transform="translate(432.658 68.756)"
        fill="#1A6882"
        fontFamily="Roboto-Bold"
        fontSize={39.639}
      >
        {'MaSaGi'}
      </Text>
      <Text
        transform="translate(671.416 66.756)"
        fill="#FFF"
        fontFamily="Roboto-Bold"
        fontSize={28}
      >
        {'Maghrib Sabtu Ngaji'}
      </Text>
      <Text
        transform="translate(128.494 65.756)"
        fill="#0D9648"
        fontFamily="Roboto-Bold"
        fontSize={24}
      >
        {'Masjid Al Firdaus'}
      </Text>
      <Path fill="none" d="M103 118h308.5v174H103z" />
      <Text transform="translate(103.004 149.781)">
        {convertedJudul?.map((el, idx) => (
          <TSpan
            key={`judul-${idx}`}
            x={0}
            y={idx * titleLineHeight}
            fill="#166E87"
            fontFamily="Roboto-Black"
            fontSize={titleFontSize}
          >
            {el}
          </TSpan>
        ))}
      </Text>
      <Path fill="none" d="M117.5 349h273v70h-273z" />
      <Text transform="translate(117.534 368.88)">
        <TSpan
          x={0}
          y={0}
          fill="#FFFEFC"
          fontFamily="Roboto-Bold"
          fontSize={30}
        >
          {`${hari}, ${tanggal}`}
        </TSpan>
        <TSpan
          x={0}
          y={33.6}
          fill="#FFFEFC"
          fontFamily="Roboto-Bold"
          fontSize={30}
        >
          {`${bulan}, ${tahun}`}
        </TSpan>
      </Text>
      <Path fill="none" d="M117.5 441h273v70h-273z" />
      <Text transform="translate(117.534 460.88)">
        <TSpan
          x={0}
          y={0}
          fill="#FFFEFC"
          fontFamily="Roboto-Bold"
          fontSize={28}
        >
          {`PUKUL ${time}`}
        </TSpan>
        <TSpan
          x={0}
          y={33.6}
          fill="#FFFEFC"
          fontFamily="Roboto-Bold"
          fontSize={28}
        >
          {'S/D SELESAI'}
        </TSpan>
      </Text>
      <Path fill="none" d="M117.5 534.8h273v70h-273z" />
      <Text transform="translate(117.534 553.3)">
        <TSpan
          x={0}
          y={0}
          fill="#FFFEFC"
          fontFamily="Roboto-Bold"
          fontSize={26}
        >
          {'DI MASJID AL-FIRDAUS'}
        </TSpan>
        <TSpan
          x={0}
          y={31.2}
          fill="#FFFEFC"
          fontFamily="Roboto-Bold"
          fontSize={26}
        >
          {'PPI 259 FIRDAUS'}
        </TSpan>
      </Text>
      <Path fill="none" d="M205.8 652.3h240.5V679H205.8z" />
      <Text
        transform="translate(205.841 670.793)"
        fill="#FFFEFC"
        fontFamily="Roboto-Bold"
        fontSize={26}
      >
        {'LENSA FIRDAUS'}
      </Text>
      <Path
        fill="#FFFEFC"
        d="M117.5 608.8s4.3-.1 11.7-.3c3.7-.1 8.3-.2 13.5-.3 5.2-.1 11.1-.2 17.5-.3 6.4-.1 13.3-.2 20.7-.2 7.3-.1 15.1-.2 23.1-.2 8 0 16.3-.1 24.7-.1 8.4 0 16.9 0 25.5-.1 8.5 0 17.1 0 25.5.1 8.4 0 16.7.1 24.7.1 16 .1 30.9.3 43.7.5 6.4.1 12.3.2 17.5.3 5.2.1 9.7.2 13.5.3 7.5.2 11.7.3 11.7.3s-4.3.1-11.7.3c-3.7.1-8.3.2-13.5.3-5.2.1-11.1.2-17.5.3-12.8.1-27.7.4-43.7.5-8 0-16.3.1-24.7.1-8.4 0-16.9 0-25.5.1-8.5 0-17.1 0-25.5-.1-8.4 0-16.7-.1-24.7-.1s-15.7-.1-23.1-.2c-7.3-.1-14.3-.2-20.7-.2-6.4-.1-12.3-.2-17.5-.3-5.2-.1-9.7-.2-13.5-.3-7.4-.4-11.7-.5-11.7-.5z"
      />
      <Text
        transform="translate(119.52 638)"
        fill="#63BDE0"
        fontFamily="Roboto-Bold"
        fontSize={24}
      >
        {'LIVE STREAMING'}
      </Text>
      {/* <Text
        transform="translate(146.82 737.578)"
        fill="#166E87"
        fontFamily="Roboto-Black"
        fontSize={pemateri.length <= 25 ? 48 : 36}
      >
        {pemateri}
      </Text> */}
    </Svg>
  );
};

export default Masagi;
