import { Box, Button, Center,InputLeftAddon,InputGroup, Divider, Heading, HStack, Input, Stack, Text, useToast, VStack } from "@chakra-ui/react";
import { useNavigate,useParams } from "react-router-dom";
import React, { useState } from 'react'
import Alert from "../Components/Alert";
import axios from "axios";
import { useLocation } from 'react-router-dom'
import { useContext,useEffect } from 'react';
import { SearchContext } from "../Contexts/SearchContextProvider";
import { AuthContext } from '../Contexts/AuthContextProvider';
import { Link } from 'react-router-dom';
export default function CheckoutPage(){

    const [name,setName] = useState('')
    const [checkin,setCheckin] = useState('')
    const [message,setMessage] = useState('')
    const [contact,setContact] = useState('')
    const [item,setItem] = useState({})

    let {isAuth, setpage}=useContext(AuthContext)
    const { search } = useContext(SearchContext)
    const navigate = useNavigate();
    //let isAuth = true;
    const location= useLocation();
    const {hostel}= location.state


  

    const { id } = useParams()
    setpage(id)
    const [products, setproducts] = React.useState([])
    const [products1, setproducts1] = React.useState([])
    const [room, setRoom] = useState("");

    console.log(hostel)

    const hostelId = sessionStorage.getItem('hostelId');
    
 
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    console.log(user);


    // React.useEffect(() => {
    //     const FtchData = async () => {
    //       try {
    //         let res = await axios({
    //           method: 'get',
    //           url: `https://real-rose-tortoise-tutu.cyclic.app/products?id=${id}`,
    //         })
    //         // console.log(res)
    //         setproducts(res.data[0])
    //       } catch (error) {
    //         console.error(error)
    //       }
    //     }
    //     FtchData()
    //   }, [])

    
      useEffect(() => {
        const FtchData = async () => {

            try {
                let res = await axios({
                    method: 'get',
                    url: `http://localhost:5000/get-hostelsByID?_id=${hostelId}`,
                })
                    
                    setItem(res.data)
                    console.log(item)
                //console.log(res.data);
                //setproducts1(res.data.hostels)
            } 
            catch (error) {
                console.error(error)
            }
        }
        FtchData()
    }, [search])



    
    let initialdetails={
        contactnumber:null,
        message:null,
        checkin:null
    }
    const toast = useToast()
    let alertdata={
        title: ' Invalid Input',
        description: "Please enter the input fields",
        status: 'warning',
      }

    const [detail,setdetail]=React.useState(initialdetails)
    //console.log(detail)

    const handlebooking=()=>{
        toast({
            title: "Booking Success",
            description: "The booking request has been sent to hostel owner",
            status: "success",
            duration: 1000,
            isClosable: true,
          })
        navigate('/')
        if(!contact||!checkin) toast(Alert(alertdata))
        else{
            fetch('http://localhost:5000/add-booking',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    hostelId:item._id,
                    userId:user._id,
                    checkIn:checkin,
                    contactNo:contact,
                    customerName:user.name,
                    price:hostel.roomPrice,
                    message:message,
                    ownerId:item.owner,
                    hostelName:item.name,
                    roomImage:hostel.roomImage,
                    roomType:hostel.roomType,
                    roomId:hostel._id,
                })
            }).then(res=>res.json())
            .then(data=>{
               
                
                    
                
            }).catch(err=>{
                console.log(err)
            }
            )

        } 

        
        // navigate('/payment')
    }


  let bookdata=JSON.parse(localStorage.getItem('booking'))
  let discount=0;
  let couponadd=0;
  let payableamount=hostel.roomPrice-discount-couponadd;
  
  
    
    return<div>
        
        <Heading size='lg' mt='50px'>Booking Summary</Heading>

        <Stack direction={{base:'column',md:'row'}} w='80%' border='0px solid' margin='auto'marginTop='5%' marginBottom='5%'>
            <VStack border='1px solid grey' w={{base:'100%',md:'60%'}} p={3} spacing={3}>
                <Box textAlign='start'>
                    <Heading size='md'>Who's checking in?</Heading>
                    <Text>We will use these details to share your booking information</Text>

                    <Stack direction='row' marginTop= '30px' mb='30px'>
                        <Input type='text' placeholder="Enter Your Name" name='contactnumber' size="md" onChange={(e)=>{setName(e.target.value)}}/>
                        {/* <Input type='email' placeholder="Email" name='email' onChange={handleChange}/> */}
                    </Stack>

                    <Stack >
                        <InputGroup>
                            <InputLeftAddon>Check In</InputLeftAddon>
                            <Input
                                size="md"
                                type="date"
                                name="checkin"
                                onChange={(e)=>{setCheckin(e.target.value)}}
                            // onChange={handletraveller}
                            //onFocus={(el) => el.target.type = 'date'}
                            />
                        </InputGroup>
                    </Stack>

                    <Stack direction='row' marginTop= '30px'>
                        <Input type='number' placeholder="Contact Number" name='contactnumber' size="md" onChange={(e)=>{setContact(e.target.value)}}/>
                        {/* <Input type='email' placeholder="Email" name='email' onChange={handleChange}/> */}
                    </Stack>

                    <Stack  marginTop= '30px'>
                        <Input height='100px' type='text' placeholder="Any Message" name='message' size="md" onChange={(e)=>{setMessage(e.target.value)}}/>
                        {/* <Input type='email' placeholder="Email" name='email' onChange={handleChange}/> */}
                    </Stack>

                </Box>

                <Button bg='teal.400'onClick={handlebooking} marginTop='30px'>Proceed to Payment</Button>
            </VStack>
    
            <Box border='1px solid grey' w={{base:'100%',md:'40%'}} p={3}>
               {/* <Heading size='md' textAlign='start'>{bookdata.hotel}</Heading> */}
               <HStack justifyContent='space-between'>
               <Text>Room Category: <b>{hostel.roomType}</b></Text>
               </HStack>
               <Divider />
               
               <Box>
                    <HStack justifyContent='space-around'>
                        <Text>Total Amount</Text>
                        <Heading size='md'>{hostel.roomPrice}</Heading>
                    </HStack>
                    <HStack justifyContent='space-around'>
                        <Text>Price Drop</Text>
                        <Heading size='md'>-{discount}</Heading>
                    </HStack>
                    <HStack justifyContent='space-around'>
                        <Text>Discount  </Text>
                        <Heading size='md'>-{couponadd}</Heading>
                    </HStack>
                </Box>    
                <Divider></Divider>
                <HStack justifyContent='space-around'>
                    <Text>Payable Amount</Text>
                    <Heading size='md'>{payableamount}</Heading>
                </HStack>
                
            </Box>
        </Stack>
    </div>
}