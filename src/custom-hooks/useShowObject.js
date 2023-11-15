import { useState } from "react";
export function useToggle(initialVal) {
  const [value, setToggle] = useState(initialVal);

  function handleToggle() {
    setToggle(e => !e);
  }

  return [value, handleToggle];
}
