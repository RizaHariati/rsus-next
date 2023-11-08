export const testGeneralForm = (info: any) => {
  const detail = [
    { id: 0, title: "Tujuan Test", value: info.title },
    { id: 1, title: "Id", value: info.id },

    {
      id: 2,
      title: "Keterangan",
      value: info.description
        ? { description: info.description }
        : { pemeriksaan: info.pemeriksaan, laboratorium: info.laboratorium },
    },
    {
      id: 3,
      title: "Harga",
      value: info.price.length > 0 ? info.price[0].value : info.price,
    },
  ];

  return detail;
};
