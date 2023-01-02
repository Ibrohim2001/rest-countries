import { useState, useEffect } from 'react';
import { makeRequest } from './makeRequest';

const useData = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await makeRequest.get(url);
        setData(res?.data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [url]);
  return {data}

}

export default useData;