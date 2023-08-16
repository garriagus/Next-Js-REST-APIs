"use client"

import React, { useEffect, useState } from "react";
import { apiFetchAllData } from "@/api-requests";
import { notFound } from "next/navigation";

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromApi();
    async function fetchDataFromApi() {
      try {
        const apiData = await apiFetchAllData('employees', 3); // Reemplaza 'endpoint' con el endpoint de tu API
        setData(apiData);
        console.log("SLUGaaaaa" + apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  }, []);




  if (!data) {
    notFound();
  }

  return (
    <div>
      <h1>API Data Example</h1>
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>{item.firstName}</li>
        ))}
      </ul>
    </div>
  )
};

export default Table;
