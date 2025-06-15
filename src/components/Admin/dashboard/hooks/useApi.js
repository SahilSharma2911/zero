import { useState } from 'react';
import axios from 'axios';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postRequest = async (url, payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, payload);
      setData(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  return { data, error, loading, postRequest };
};

export default useApi;