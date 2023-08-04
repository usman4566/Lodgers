import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { SearchContext } from "../Contexts/SearchContextProvider";
import './Style.css'
import {  
    Heading,
    Box,
    Text,
    Badge,
    Button,
    Stack,
    useToast,
    CardBody} from "@chakra-ui/react"

import { StarIcon, DeleteIcon } from "@chakra-ui/icons";
import { MdAddCircleOutline } from "react-icons/md";

function Carousel({product,id}){
  const toast = useToast()
    const { search } = useContext(SearchContext)
    const [products, setproducts] = useState([])
    let navigate=useNavigate();
    const getHostels = async () => {
        try {
            let res = await axios.get(`http://localhost:5000/get-hostels    `)
            console.log(res)
            setproducts(res.data)
        } catch (error) {
            console.error(error)
        }
    }

   

    
    useEffect(() => {
        const FtchData = async () => {
            let user=JSON.parse(localStorage.getItem("user"))
            if(user.role==="owner"){
            try {
                let res = await axios({
                    method: 'get',
                    url: `http://localhost:5000/get-hostels/${user._id}`,
                })
                console.log("hostels data",res.data.hostels)
                setproducts(res.data.hostels)
            } catch (error) {
                console.error(error)
            }
        }
        else{
            navigate('/Login')
        }
        }
        FtchData()
    }, [search])

    const deleteHostel = async (id) => {
     
      try {
        let res = await axios({
          method: 'delete',
          url: `http://localhost:5000/delete-hostel/${id}`,
      })
        // const response = await axios.delete(`http://localhost:3000/delete-hostel/${product._id}`);
        console.log('Hostel deleted successfully');
        toast({
          title: "Success",
          description: "Hostel deleted successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        }) 
        window.location.reload(false);
      } catch (error) {
        console.error('Error deleting hostel:', error);
      }
    }
    const property = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        beds: 3,
        baths: 2,
        title: "Modern home in city center in the heart of historic Los Angeles",
        formattedPrice: "$1,900.00",
        reviewCount: 34,
        rating: 4,
      };
    
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return <Box width='100%' height='500px' bgColor='teal.100' mb='150px'><div className='Carousel'>


        <Heading 
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'200%'}>
            <Text as={'span'} color={'black'} fontWeight='bold' opacity='0.7'>
              YOUR HOSTELS
            </Text>
            <Stack alignItems='center'>
              <Button
                leftIcon={<MdAddCircleOutline/>}
                loadingText="Submitting"
                size="lg"
                width='250px'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                <Link to={'/addhostel'}> Add New Hostel</Link>
              </Button>
            </Stack>
        </Heading>

        <Slider {...settings} > 
            {products.map((product) => (   
                <div className='room-card'>
                    <div className='card-top'><img src={product.image} alt={product.name}/></div>
                        
                    <Box p="6">
          <Box display="flex" alignItems="baseline" >
            <Badge rounded="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {/* {property.beds} beds &bull; {property.baths} baths */}
            </Box>
          </Box>

          <Text
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {product.name}
          </Text>

          <Box>
          <Box as="span" color="gray.600" fontSize="sm">Starting from: </Box>
            {product.price}
            <Box as="span" color="gray.600" fontSize="sm">
              / month
            </Box>
          </Box>

          <Box display="flex" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? "teal.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount} reviews
            </Box>
          </Box>
            <Button
                  mt='10px'
                  leftIcon={<MdAddCircleOutline/>}
                  loadingText="Submitting"
                  size="md"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.400',
                  }}>
                  <Link to={'/addroom'}state={{hostel: product._id}}> Add Room</Link>
                </Button>

               <Button 
               
                size="md"
                mt='11px'
                ml='110px'
                bg={'red.400'}
                onClick={() => deleteHostel(product._id)}
                
                >
                  <DeleteIcon />
                </Button>
                
          </Box>
          <Button 
                leftIcon={<DeleteIcon/>}
                size="md"
                >

                </Button>
                </div>
                ))}
        </Slider>
    </div>

    </Box>



}

export default Carousel;
