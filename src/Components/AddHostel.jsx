import OwnerCarousel from '../Components/OwnerCarousal';

import { Navigate, useNavigate } from 'react-router-dom';

import React, { useState, useEffect, useRef } from "react";

import {
    Flex,
    Box,
    Avatar,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    useToast,
    Button,
    Heading,
    Image,
    Text,
    InputGroup,
    InputRightElement,
    useColorModeValue,
  } from '@chakra-ui/react';

  import { MdLocationPin } from "react-icons/md";


  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  

  
  export default function OwnerPortal() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState({ value: '', error: '' })
    const [longitude, setLongitude] = useState(null)
    const [latitude, setLatitude] = useState(null)
    


    const [image, setImage] = useState(null);  
    //hostel features modal
    const [modalVisible, setModalVisible] = useState(false);

    //hostel features
    const [featuress, setFeatures] = useState([]);
    const [wifi, setWifi] = useState(false);
    const [parking, setParking] = useState(false);
    const [security, setSecurity] = useState(false);
    const [laundry, setLaundry] = useState(false);
    const [kitchen, setKitchen] = useState(false);
    const [tv, setTv] = useState(false);
    const [singleroom, setSingleRoom] = useState(false);
    const [doublebedroom, setDoubleBedRoom] = useState(false);
    const [threebedroom, setThreeBedRoom] = useState(false);
    const [attachbath, setAttachBath] = useState(false);
    const [airconditioned, setAirConditioned] = useState(false);

    const [ac, setAc] = useState(false);
    const [heater, setHeater] = useState(false);
    const [gym, setGym] = useState(false);

        
        
    const toast = useToast();
    const navigate = useNavigate();

    function success(pos) {

        var crd = pos.coords;
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        setLatitude(crd.latitude)
        setLongitude(crd.longitude)
        
      }
    const handleMaps=()=>{
        console.log("Ali")
            if (navigator.geolocation) {
              navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                  if (result.state === "granted") {
                    console.log(result.state);
                    //If granted then you can directly call your function here
                    navigator.geolocation.getCurrentPosition(success, errors, options);
                  } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(success, errors, options);
                  } else if (result.state === "denied") {
                    //If denied then you have to show instructions to enable location
                  }
                  
                                
                  toast({
                    title: "Success",
                    description: "Your current location recorded",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
        
                  })
                    console.log(longitude,latitude)
                
                });
            } else {
              alert("Sorry Not available!");
            }
            navigator.geolocation.getCurrentPosition();




    }


    
    const handleAdd=()=>
    {
        let user=JSON.parse(localStorage.getItem("user"))
        const formData = new FormData();

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
            
        //    console.log(featuress.wifi)
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('longitude', longitude);
            formData.append('latitude', latitude);
            formData.append('owner', user._id);
            formData.append('tv', tv);
            formData.append('wifi', wifi);
            formData.append('parking', parking);
            formData.append('security', security);
            formData.append('laundry', laundry);
            formData.append('kitchen', kitchen);
            formData.append('singleroom', singleroom);
            formData.append('doublebedroom', doublebedroom);
            formData.append('threebedroom', threebedroom);
            formData.append('airconditioned', airconditioned);
            formData.append('attachbath', attachbath);
            formData.append('city', "islamabad");
            formData.append('image', file);
            
            fetch("http://localhost:5000/add-hostel", {
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

        if(name===""||description===""||price===""){
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
            description: "Hostel Added Successful",
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
  
      /////// previeew image
  const [imageFile, setImageFile] = useState(null);
  const inputRef = useRef(null);
  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };


  // else
return (<>


        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
            <Stack align={'center'}>
            <Heading fontSize={'4xl'} mb='50px'>Add Hostel Details</Heading>

            </Stack> 
            <FormControl>
                <div className="App">
                    <input type="file" onChange={handleChange}                         
                      ref={inputRef} 
                      onBlur={handleInputChange}/>
                        {imageFile && (
                            <img src={URL.createObjectURL(imageFile)} alt="Preview" className='center-image' style={{width: 200, height: 200, borderRadius: 400/ 2, }} />
                          )}
                </div>
            </FormControl>         
            <FormControl id="hostel-name">
                <FormLabel>Hostel Name</FormLabel>
                <Input type="text" name='name'
                // onChangeText={(text) => setName({ value: text, error: '' })}
                onChange={(e)=>{setName(e.target.value)}}
                />
            </FormControl>

            <FormControl id="description">
                <FormLabel> Short Description</FormLabel>
                <Input type="text" height='100px' name='description'
                        // onChangeText={(text) => setDescription({ value: text, error: '' })}
                        onChange={(e)=>{setDescription(e.target.value)}}
                />
            </FormControl>

            <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <InputGroup>
                <InputRightElement mr='20px' opacity='0.6'>-/month</InputRightElement>
                <Input type="number" name='price'
                        onChange={(e)=>{setPrice(e.target.value)}}
                />
                </InputGroup>
            </FormControl>

            <FormControl id="location">
                <FormLabel>Get Current Location</FormLabel>
                <Text>
                    <Button onClick={handleMaps} leftIcon={<MdLocationPin/>} color='teal.500' href='#'>
                        Maps
                    </Button>
                </Text>
            </FormControl>

            <FormControl id="features">
                <FormLabel> Select Features</FormLabel>

                <Stack ml='20px' spacing={[20]} direction={['column', 'row']}>
                    <Checkbox size='md' colorScheme='green' 
                    onChange={()=>{setWifi(true)}}
                    >
                    Wifi
                    </Checkbox>
                    <Checkbox size='md' colorScheme='green' 
                    onChange={()=>{setParking(true)}}
                    >
                    Parking
                    </Checkbox>
                    <Checkbox size='md' colorScheme='green' 
                     onChange={()=>{setAttachBath(true)}}
                    >
                    Attach Bath
                    </Checkbox>
                </Stack>

                <Stack ml='20px' mt='20px' spacing={[14]} direction={['column', 'row']}>
                    <Checkbox size='md' colorScheme='green'
                     onChange={()=>{setLaundry(true)}} >
                    Laundry
                    </Checkbox>
                    <Checkbox size='md' width='95px' colorScheme='green'
                     onChange={()=>{setKitchen(true)}}
                    >
                    Kicthen
                    </Checkbox>

                    <Checkbox size='md' colorScheme='green' width='140px'
                     onChange={()=>{setAirConditioned(true)}} >
                    Air Conditioned
                    </Checkbox>
                </Stack>

                <Stack ml='20px' mt='20px' spacing={[14]} direction={['column', 'row']}>

                    <Checkbox size='md' colorScheme='green'
                     onChange={()=>{setSecurity(true)}}
                    >
                    Security
                    </Checkbox>

                    <Checkbox size='md' colorScheme='green'
                     onChange={()=>{setTv(true)}}
                    >
                    Tv
                    </Checkbox>
                   
                </Stack>

                <FormLabel mt='20px'> Select Room Type</FormLabel>
                <Stack ml='20px'  spacing={[14]} direction={['column', 'row']}>
                    <Checkbox size='md' colorScheme='green'
                     onChange={()=>{setSingleRoom(true)}} >
                    Single Room
                    </Checkbox>
                    <Checkbox size='md' colorScheme='green'
                     onChange={()=>{setDoubleBedRoom(true)}}
                    >
                    2 Bed Room
                    </Checkbox>
                    <Checkbox size='md' colorScheme='green'
                     onChange={()=>{setThreeBedRoom(true)}}
                    >
                    3 Bed Room
                    </Checkbox>
                </Stack>



            </FormControl>

            
            <Stack spacing={6}>
                <Button colorScheme={'blue'} variant={'solid'} onClick={handleAdd}>
                  Add Hostel
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
