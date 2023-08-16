import { useState } from "react";
export const useToggle = (id: string | number | null) => {
  const [selected, setSelected] = useState<string | number | null>(null);
  if (selected === id) {
    return setSelected(null);
  } else {
    setSelected(id);
  }

  return selected;
};
