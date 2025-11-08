import axios from "axios";
import { useState, useEffect } from "react";

type UseFetchProps = {
  query: string;
  variables?: Record<string, any>;
  url: string;
};

export default function useFetch({ query, variables = {}, url }: UseFetchProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let isCancelled = false;

    const fetchData = async () => {
      try {
        const res = await axios.post(url, {
          query,
          variables,
        });

        if (res.status !== 200) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        if (!isCancelled) {
          setData(res.data.data);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err.message || "An unknown error occurred");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [query, variables, url]);

  return { data, loading, error };
}