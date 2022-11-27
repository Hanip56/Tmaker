const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const week = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];

export const getStringTanggal = (dateInput) => {
  const day = dateInput.getDay();
  const date = dateInput.getDate();
  const month = dateInput.getMonth();
  const year = dateInput.getFullYear();

  return { hari: week[day], tanggal: date, bulan: months[month], tahun: year };
};
