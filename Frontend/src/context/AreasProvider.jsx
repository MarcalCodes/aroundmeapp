import { useState, useEffect } from "react";
import axios from "axios";
import { AreasContext } from "./AreasContext";

export const AreasProvider = ({ children }) => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/areas');
        setAreas(response.data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  return (
    <AreasContext.Provider value={areas}>
      {children}
    </AreasContext.Provider>
  );
};
