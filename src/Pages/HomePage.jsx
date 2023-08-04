import React from "react"
import axios from 'axios'
import { useContext, useEffect } from "react";
import { useState } from "react";
import { SearchContext } from "../Contexts/SearchContextProvider";

import {  
    Button,
    Container,
    Heading,
    Grid,
    Badge,
    FormControl,
    Input,ImaTab, TabList, Flex, SimpleGrid, Icon, chakra, Tabs, useColorModeValue, Image, Box, Card, CardFooter,CardBody,Text, CardHeader, Stack } from "@chakra-ui/react"
    import {ExternalLinkIcon} from '@chakra-ui/icons' 
import Testimonials from "../Components/Testimonials"
import SearchPanel from "../Components/SearchPanel"
import Home from '../Assets/Home.jpg'
import Discount from '../Assets/discount.jpg'
import {Link} from "react-router-dom"
import MapContainer from "../Components/MapContainer"
import Carousel from "../Components/Carousel"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete'


export default function HomePage() {
    
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null
    });
  
    const handleSelect = async value => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setCoordinates(latLng);
    };

    const colors = useColorModeValue(
        ['teal.50', 'red.50', 'blue.50'],
        ['teal.900', 'red.900', 'blue.900'],
    )
    const [tabIndex, setTabIndex] = React.useState(0)
    const bg = colors[tabIndex]
    return (<>
    <Stack justifyContent='space-evenly' >
        <Box bottom='0' padding={9} border='0px solid' bgImage={Home} bgSize="100%" backgroundRepeat="no-repeat" h="400px" paddingLeft={'200px'} paddingRight={'200px'}>
            <Box mt='250px'><SearchPanel/></Box>
        </Box> 
    </Stack>    

    

    <Heading size='lg' mt='50px' marginLeft='270px' fontSize='50px' textAlign='left'  opacity='0.8'>Explore some new hostels !</Heading>
    <Text mb='20px' fontSize='xl' textAlign='left' marginLeft='270px'>Wanna checout some recent uploads from Lodgers? Here are some of the top picks...... </Text>
    <Carousel />

    {/* <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>

            <input {...getInputProps({ placeholder: "Type address" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}  
      </PlacesAutocomplete>
    </div> */}

        <Container maxW="container.lg" mt='50px'>
            <Heading size='lg' fontSize='50px' textAlign='left'  opacity='0.8'>Top cities to explore !</Heading>
            <Text mb='20px' fontSize='xl' textAlign='left'>These are some popular destinations that offer a large variety of hostels to match your requirements</Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} >  
                    <Image
                        w="100%"
                        h='90%'
                        src="https://images.unsplash.com/photo-1606511490662-b2c5be7d95a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=825&q=80"
                        alt="image three"
                    />
                    <Link to="/products">
                    <Image
                        w="100%"
                        h='90%'
                        src='https://images.unsplash.com/photo-1608020932658-d0e19a69580b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                        alt="image three"
                    />
                    </Link>
            </Grid>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} >
                    <Image
                        w="100%"
                        src='https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1221&q=80'
                        alt="image three"
                    />
                    <Image
                        w="100%"
                        height='94.5%'
                        src='https://c0.wallpaperflare.com/preview/974/765/190/pakistan-multan-darbar-of-hazrat-shah-rukn-e-alam-pakistani.jpg'
                        alt="image three"
                    />
                    <Image
                        w="100%"
                        src="https://i.pinimg.com/564x/b8/cf/4d/b8cf4d061b7cedcc5b700ee959d62c29.jpg"
                        alt="image three"
                    />
            </Grid>
        </Container>
        <Testimonials/>
        </>
    )

}
