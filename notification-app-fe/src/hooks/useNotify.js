import { useState, useEffect } from "react";
import { fetchnotify } from "../apis/notify";

export function usenotify() {
  const [notify, setnotify] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await fetchnotify();
      setnotify(data.notify ?? []);
    };

    load();
  }, [notify]);

  const totalPages = 0;

  return { notify, total, totalPages, loading: false, error: true };
}
