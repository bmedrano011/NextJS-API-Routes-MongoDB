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

  const getData = async (url) => {
    setIsLoading(true);
    const response = await http
      .get(`${url}/${0}`)
      .then((response) => {
        setReturnData(response.data);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const createData = async (url, post) => {
    if (!url) return;
    setIsLoading(true);
    const response = await http
      .post(`${url}/${0}`, post)
      .then((response) => {
        setReturnData(response.data);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setIsLoading(false));

    await getData("todos");
  };

  const updateData = async (url, id) => {
    if (!url) return;
    setIsLoading(true);
    const response = await http
      .put(`${url}/${id}`)
      .then((response) => {
        returnData(response.data);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setIsLoading(false));
    await getData("todos");
  };

  const deleteData = async (url, id) => {
    if (!url) return;
    setIsLoading(true);
    const response = await http
      .delete(`${url}/${id}`)
      .then((response) => {
        returnData(response.data);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setIsLoading(false));
    await getData("todos");
  };

  return {
    isLoading,
    returnData,
    error,
    getData,
    createData,
    updateData,
    deleteData,
  };
}
