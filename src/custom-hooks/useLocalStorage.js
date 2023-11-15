import { useEffect, useState } from "react";

export function useLocalStorage(strgName) {
  const [data, setData] = useState(function () {
    const storage = localStorage.getItem(strgName);

    return storage ? JSON.parse(storage) : [];
  });
  useEffect(() => {
    localStorage.setItem(strgName, JSON.stringify(data));
  }, [strgName, data]);

  return [data, setData];
}
