import React, { useState, useEffect } from "react";
import http from "./services/http-axios";

export default function useData(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [returnData, setReturnData] = useState([]);
  const [error, setServerError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      getData(url);
    };

    fetchData();
  }, [url]);

  const getData = async () => {
    setIsLoading(true);
    const response = await http
      .get(url)
      .then((response) => {
        setReturnData(response.data);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    returnData,
    error,
    getData,
  };
}
