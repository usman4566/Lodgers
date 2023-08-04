

import OwnerCarousel from '../Components/OwnerCarousal';
import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import {
    Flex,
    Avatar,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Image,
    useToast,
    Divider,
    Select,
    InputGroup,
    InputRightElement,
    useColorModeValue,
  } from '@chakra-ui/react';

  import { useLocation } from 'react-router-dom'

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  

  
  export default function AddRoom() {
    let location= useLocation();
    const {hostel}= location.state

    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [oneseater, setOneseater] = useState('');
    const [twoseater, setTwoseater] = useState('');
    const [threeseater, setThreeseater] = useState('');
    const [fourseater, setFourseater] = useState('');


    const [image, setImage] = useState(null);  
    const toast = useToast();
    const navigate = useNavigate();
    //hostel features modal

    //hostel features


    const handleAddRoom=()=>{
        let user=JSON.parse(localStorage.getItem("user"))
        const formData = new FormData();
        //    console.log(featuress.wifi)

        
        if(price<=0){
          toast({
            title: "Error",
            description: "price should be greater than zero",
            status: "error",
            duration: 1000,
            isClosable: true,
          })
          
          console.log("error")
          return
        }
            
            formData.append('roomDescription', description);
            formData.append('roomPrice', price);      
            formData.append('roomImage', file);
            formData.append('hostel', hostel);
            formData.append('roomType', oneseater);


            fetch("http://localhost:5000/add-rooms", {
        body: formData,
        method: "post",
        headers: {
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.errors) {
            console.log(result.errors)
          } else {
            // navigation.navigate('OwnerHome')
            console.log(result)
        }
        })
        .catch((err) => {
          console.log(err);
        });

        if(description===""||price===""){
          toast({
            title: "Error",
            description: "Please Provide all the information",
            status: "error",
            duration: 1000,
            isClosable: true,
          })
          
          console.log("error")
          return
        }
  
        else{
          
          toast({
            title: "Success",
            description: "Room Added Successful",
            status: "success",
            duration: 1000,
            isClosable: true,

          })
          
          navigate('/owner')
        }


    };

    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0])
    }
    
  

  // else
return (<>


    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
            <Stack align={'center'}>
            <Heading fontSize={'4xl'} mb='50px'>Add Room Details
                <Divider orientation='horizontal' />
            </Heading>

            

            </Stack> 
            <FormControl>
                <div className="App">
                    <input type="file" onChange={handleChange} />
                    <Avatar size='xl' src={file} />
                </div>
            </FormControl>         
            <FormControl id="roomtype">
                <FormLabel>Room Type</FormLabel>
                {/* <Input type="text" name='name'
                onChangeText={(text) => setName({ value: text, error: '' })}
                /> */}

                <Select placeholder='Select option'
                onChange={(e)=>{setOneseater(e.target.value)}}
                >
                    <option value='oneseater' onChange={(e)=>{setOneseater(e.target.value)}}>One Seater</option>
                    <option value='twoseater'onChange={(e)=>{setTwoseater(e.target.value)}}>Two Seater</option>
                    <option value='threeseater'onChange={(e)=>{setThreeseater(e.target.value)}}>Three Seater</option>
                    <option value='fourseater'onChange={(e)=>{setFourseater(e.target.value)}}>Four Seater</option>
                </Select>
            </FormControl>

            <FormControl id="description">
                <FormLabel> Room Description</FormLabel>
                <Input type="text" height='100px' name='description'
                        onChange={(e)=>{setDescription(e.target.value)}}
                />
            </FormControl>

            <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <InputGroup>
                <InputRightElement mr='20px' opacity='0.6'>-/month</InputRightElement>
                <Input type="text" name='price' min='0'
                        onChange={(e)=>{
                          const newPrice = Math.max(0, parseInt(e.target.value));
                          setPrice(newPrice.toString());
                        }}
                />
                </InputGroup>
            </FormControl>
            
            <Stack spacing={6}>
                <Button colorScheme={'blue'} variant={'solid'} onClick={handleAddRoom}>
                  Add Room
                </Button>
            </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>


    </>
    );
  }



  ///////////////////////////




