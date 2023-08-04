

  import OwnerCarousel from '../Components/OwnerCarousal';
  import axios from 'axios'
import { useContext, useEffect } from "react";
import { useState } from "react";
import Axios from 'axios'

import { SearchContext } from "../Contexts/SearchContextProvider";
  
  export default function OwnerPortal() {

    const { search } = useContext(SearchContext)
    const [bookings, setBookings] = useState("")


  // else
    return (<>

    <OwnerCarousel />



    </>
    );
  }