export type SatuanHariType = { id_hari: number; hari: string };
export const allHari: SatuanHariType[] = [
  { id_hari: 1, hari: "senin" },
  { id_hari: 2, hari: "selasa" },
  { id_hari: 3, hari: "rabu" },
  { id_hari: 4, hari: "kamis" },
  { id_hari: 5, hari: "jum'at" },
  { id_hari: 6, hari: "sabtu" },
  { id_hari: 7, hari: "minggu" },
];

export const allWaktu = [
  {
    waktu: "pagi",
    jam_min: 8,
    jam_max: 10,
  },
  {
    waktu: "siang",
    jam_min: 13,
    jam_max: 15,
  },
  {
    waktu: "sore",
    jam_min: 16,
    jam_max: 18,
  },
];
