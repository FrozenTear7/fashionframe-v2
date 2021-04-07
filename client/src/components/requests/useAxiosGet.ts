/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import * as React from 'react';

const useAxiosGet = (
  url: string,
  config?: AxiosRequestConfig
): {
  data: any;
  loading: boolean;
  error: string | undefined;
} => {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    let mounted = true;

    const fetchData = async (): Promise<void> => {
      if (mounted) {
        setError(undefined);
        setLoading(true);
      }

      try {
        const { data: responseData } = await axios.get(url, config);
        if (mounted) setData(responseData);
      } catch ({ response }) {
        if (mounted) setError(response.data.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void fetchData();

    return (): void => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
};

export default useAxiosGet;
