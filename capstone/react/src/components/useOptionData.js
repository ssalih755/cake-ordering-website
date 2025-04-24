import { useEffect, useState } from "react";

export default function useOptionData(serviceFn) {
  const [data, setData] = useState([]);

  useEffect(() => {
    serviceFn()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [serviceFn]);

  return data;
}
