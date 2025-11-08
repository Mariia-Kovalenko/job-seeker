import { useState, useEffect } from "react";

type UseDebounceProps = {
  value: string;
  delay: number;
};
export default function useDebounce({ value, delay = 300 }: UseDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup if value changes before delay finishes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
