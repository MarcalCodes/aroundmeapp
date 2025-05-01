import {useEffect, useState} from "react";
import {AreasContext} from "./AreasContext";
import axios from "axios";

export const AreasProvider = ({isLoggedIn, children}) => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/areas', {withCredentials: true});
        setAreas(response.data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    isLoggedIn && fetchAreas();
  }, [isLoggedIn]);

  return (
    <AreasContext.Provider value={areas}>
      {children}
    </AreasContext.Provider>
  );
};
