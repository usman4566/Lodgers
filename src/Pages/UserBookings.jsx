import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { SiLinkedin, SiMessenger } from 'react-icons/si';
import { VStack ,HStack,Box, Button, Center, Stack,Card,Image,CardBody,Heading,CardFooterTable, TableCaption,Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios'
import { useContext, useEffect } from "react";
import { useState } from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";

import { SearchContext } from "../Contexts/SearchContextProvider";
import { useNavigate } from 'react-router-dom';
export default function All() {

    const { search } = useContext(SearchContext)
    const [bookings, setBookings] = useState([])
    const [checkBooking, setCheckBooking] = useState([])
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);


    let user=JSON.parse(localStorage.getItem("user"))
    const id = user._id
    console.log("hiiiiiii",user.role);
    
   

    
useEffect(() => {
    const FtchData = async () => {
        try {
            let res;
            if (user.role === "user") {
                res = await axios.get(`http://localhost:5000/get-bookings-by-users/${id}`);
            } else {
                res = await axios.get(`http://localhost:5000/get-bookings-by-owner/${id}`);
            }
            setBookings(res.data.booking);
            setCheckBooking(res.data.booking);          
            console.log(res.data.booking);
            console.log(bookings);
            //filter out the booking where status is true
            const filteredBookings = res.data.booking.filter((booking) => booking.status === true);
            console.log(filteredBookings);
            setBookings(filteredBookings);
        } 
        catch (error) {
            console.error(error);
        }
    };
    FtchData();
}, [search]);


    // useEffect(() => {
    //     const FtchData = async () => {
    //         try {
    //             let res = await axios({
    //                 method: 'get',
    //                 url: `http://localhost:5000/get-bookings-by-users/${id}`,
    //             })
    //             setBookings(res.data.booking)
    //             setCheckBooking(res.data.booking)          
    //             console.log(res.data.booking)
    //             console.log(bookings)
    //         } 
    //         catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     FtchData()
    // }, [search])

    // useEffect(() => {
    //     const FtchData = async () => {
    //         try {
    //             let res = await axios({
    //                 method: 'get',
    //                 url: `http://localhost:5000/get-bookings-by-owner/${id}`,
    //             })
    //             setBookings(res.data.booking)
    //             setCheckBooking(res.data.booking)          
    //             console.log(res.data.booking)
    //             console.log(bookings)
    //             //filter out the booking where status is true
    //             let filteredBookings=res.data.booking.filter((booking)=>booking.status===true)
    //             console.log(filteredBookings)
    //             setBookings(filteredBookings)

    //         } 
    //         catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     FtchData()
    // }, [search])

return (
    <div style={{margin: '60px'}}>
    <Heading 
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'200%'}
            textAlign='left'
            >
            <Text as={'span'} color={'black'} fontWeight='bold' opacity='0.7'>
              Your Bookings
            </Text>

            <TableContainer marginLeft='200px'>
      <Table variant='striped'  >
        <Thead>
          <Tr> 
            <Th fontSize='20px'>Hostel</Th>
            <Th fontSize='20px'>Room Type</Th>
            <Th fontSize='20px'>Checkin</Th>
            <Th fontSize='20px'>Price</Th>
            <Th fontSize='20px'>Status</Th>
            
          </Tr>
        </Thead>
        
      </Table>
    </TableContainer>

    </Heading>
    {bookings?bookings.map((booking,i)=>(
        <Card 
        width='100%'
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
    >
    <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={booking.roomImage}
        width='160px'
        height='120px'
        alt='Caffe Latte'
    />
        <VStack ml='50px' width='110px' >
            <Text size='md' textAlign='left'>{booking.hostelName}</Text>
        </VStack>

        <VStack ml='140px'  width='100px'>
            <Text size='md' textAlign='left'>{booking.roomType}</Text>
        </VStack>

        <VStack ml='210px'  width='100px'>
            <Text size='md' textAlign='left' >{booking.checkIn}</Text>
        </VStack>

        <VStack ml='110px'  width='100px'>
            <Text size='md' textAlign='left' >{booking.price}</Text>
        </VStack>

        <VStack ml='110px'  width='100px'>
            <Box bgColor='white.500' width='100px' textAlign='center' border='2px' borderRadius='md'>
                <Text size='md' textAlign='center'  >{booking.paid ? "paid" : "unpaid"}</Text>
            </Box>
            {user.role === "user" && !booking.paid && (
        <Link to='/payment' ><Button colorScheme="blue" size="sm" width='100px' border='2px' borderRadius='md'>
          Pay
        </Button></Link>
      )}
        </VStack>
         
    </Card>

    )):(
        <Text>No Bookings</Text>
    )

    }

        </div>

    
  
  );
}