'use client'
import { useEffect, useState } from "react";


export  function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/profile').then(response =>
      response.json().then(data => {
        setLoading(true);
        setData(data)
        setLoading(false);
      })
    )
  },[])

  return ({loading, data});
}