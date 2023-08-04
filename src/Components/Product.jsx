import {
  Box,
  Container,
  Stack,
  Text,
  CardBody,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Icon,
  Card,
  useToast,
  Divider,
  CardHeader,
  Grid,
  Textarea,
  
} from '@chakra-ui/react';
import {CheckCircleIcon, EditIcon,ArrowForwardIcon} from '@chakra-ui/icons'
import Alert from '../Components/Alert'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContextProvider';
import { Navigate, useParams } from 'react-router-dom';
import React from 'react';
import ImageCarousal from './ImageCarousal';
import { ImLocation, ImGift} from 'react-icons/im';
import { HiGift} from 'react-icons/hi';
import { FaHandHoldingHeart, FaBed,FaWalking} from 'react-icons/fa';
import { FiArrowUpRight} from 'react-icons/fi';
import { AiFillCloseCircle} from 'react-icons/ai';


import RoomCarousal from '../Components/RoomCarousal'


export default function Product({products}){
  let {isAuth, page}=useContext(AuthContext)
const navigate = useNavigate();
const toast = useToast()
const handlesubmit=()=>{

  toast({
    title: "Success",
    description: "Your review has been submitted",
    status: "success",
    duration: 1000,
    isClosable: true,
  })
  window.location.reload()
  
}


const [resize, setResize] = React.useState('horizontal')
//let isAuth = true;

let alertdata={};  
if(!isAuth){
alertdata={
  title: ' Kindly Login/Signup first',
  description: "Sorry to interrupt, but we can't proceed further.",
  status: 'warning',
}
}
const { id } = useParams()
const roomsAvailable = true; 


let bookingdata=JSON.parse(localStorage.getItem('booking'))

const free_amenities = ["Wifi", "Parking", "Food", "TV", "Kitchen", "Laundry"];
const extra_amenities = ["Laundary", "Lunch", "Air-Conditioning", "Cupboard", "Tv", "Geyser", "Attach Bath", "Room Service", "Transport", "Study Table", "Sports Room"];
const nearby = ["Margalla Hill view Park", "Shalimar North Housing Society", "Mohtarma Fatima Jinnah Park", "PIMS General Hospital", "Shah Faisal Grand Mosque","G11/3 Markaz Sports Complex"];


  return<>
  <Container maxW={'6xl'} border='0px solid'>
    <SimpleGrid
      spacing={{ base: 2, md: 2 }}
      py={{ base: 18, md: 10 }}>
   
      <Stack>
        <ImageCarousal image={products.image}/>
      </Stack>

      <Card textAlign='left'>
        <CardHeader>
          <Heading  size='lg'>{products.name}</Heading> 
          <Flex  mt='10px'>
            <Icon fontSize={'xl'} size='md' as ={ImLocation}></Icon>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'md'}>
              {products.city}
            </Text>
          </Flex>
        </CardHeader>


        <CardBody>
          <Stack divider={<StackDivider pt='20px' />} spacing='2'>
            <Box>
              <Heading size='md' textTransform='uppercase' opacity='0.8'>
                Description
              </Heading>
              <Text pt='2' fontSize='sm'>
                {products.name} In Islamabad has fully furnished rooms with attached baths, AC, TV in each room, fridge in each room.
                two time quality food, 8mb Internet, laundry facility 2 time weekly, standby generator, neat and clean environment,
                pure water to drink, car parking and security guards to secure the hostel and much more. Pak Boys Hostel is the best place
                for students and job holders studying and working in Islamabad. Please contact us for more information or message us on facebook.<br/><br/>
                This is the most comfortable hostel for Students and Job holders because of it's amazing facilities that include Three Time Meal,
                Internet, Cable Connection, Laundry Facility, Geyser etc. Please Contact us for more details or message us on Facebook.
                Ups, Delicious meal 3 times a day, Neat & clean homely environment, Big & Airy furnished rooms , <br/><br/>Attached up to date washrooms,
                High speed DSL Wi-Fi internet system, Luxury bedding with mattress, pillow and sheet and much more. It is highly recommended for
                students in job holders looking for a hostel in islamabad. Do not hesitate to contact us or simply message us on Facebook.
              </Text>
            </Box>
            <Box>
              <Heading size='md' textTransform='uppercase' mt='20px' opacity='0.8'>
                Facilities
              </Heading>

              <Text  fontSize='lg' textTransform='uppercase' color='blue'  mt='40px'>
                <Icon as={HiGift} color='blue' mr='7px' />
                Free
              </Text>
              <Divider />
              <Grid templateColumns="repeat(4, 1fr)" spacing={10} src='https://www.google.com/maps'>

                 {free_amenities.map((amenity) => (
                  <Text variant='outline' mt='20px'>
                    <Icon as={CheckCircleIcon} color='green.500' mr='7px' />
                    {amenity}
                  </Text>
                ))} 
              
              </Grid>
              <Text  fontSize='lg' textTransform='uppercase' color='blue'  mt='40px'>
                <Icon as={FaHandHoldingHeart} color='blue' mr='7px' />
                Additional Services
              </Text>
              <Divider />
              <Grid templateColumns="repeat(4, 1fr)" spacing={10} src='https://www.google.com/maps'>
                {extra_amenities.map((amenity) => (
                  <Text variant='outline' mt='20px'>
                    <Icon as={CheckCircleIcon} color='green.500' mr='7px' />
                    {amenity}
                  </Text>
                ))}
              </Grid>
            </Box>
            <Box>
              <Heading size='md' textTransform='uppercase' mt='20px' opacity='0.8'>
                <Icon as={FaWalking}  mr='7px' />
                What's Nearby...?
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" spacing={10} src='https://www.google.com/maps'>
                {nearby.map((amenity) => (
                  <Text variant='outline' mt='30px'>
                    <Icon as={AiFillCloseCircle} color='black.500' mr='7px' />
                    {amenity}
                  </Text>
                ))}
              </Grid>
            </Box>

            {/* <Heading size='md' textTransform='uppercase' mt='20px' opacity='0.8'>
            <Icon as={FaBed} mr='7px' />
            Available Rooms
          </Heading>
            {roomsAvailable ? (
        <>
          
          <RoomCarousal id={products._id} />
        </>
      ) : (
        
        <p>Sorry, no rooms are currently available.</p>
      )} */}

             <Heading size='md' textTransform='uppercase' mt='20px' opacity='0.8'>
            <Icon as={FaBed}  mr='7px'/>
            Available Rooms</Heading>
            <RoomCarousal id={products._id} /> 
           
            <Heading size='md' textTransform='uppercase' mt='20px' opacity='0.8'>
              <Icon as={EditIcon}  mr='7px'/>
                  Add a review
            </Heading>

            <Stack>
              <Textarea
                placeholder='Share details of you experience at this place'
                size='sm'
                mb='10px'
                resize={resize}
              />
              <Button onClick={handlesubmit} width='100px' rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='solid'>
                Submit
                
              </Button>
            </Stack>

            
          </Stack>


        </CardBody>

        {/* <Stack>
          <Box>
            <Heading size='md' textTransform='uppercase'>
               Summary
            </Heading>
            <Text pt='2' fontSize='sm'>
              View a summary of all your clients over the last month.
            </Text>
          </Box>
            <Heading size='md'>Awards and affiliations</Heading>
            <Text fontSize={'lg'}>            
            Green / Sustainable Property.
            This property participates in EarthCheck, a program that measures the property's impact on one or more of the following: environment, community, cultural-heritage, the local economy.
            </Text>
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('yellow.500', 'yellow.300')}
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              Amenities
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <List spacing={2}>
                <ListItem>Hot Tub</ListItem>
                <ListItem>Free WiFi</ListItem>
                <ListItem>Swimming Pool</ListItem>
              </List>
              <List spacing={2}>
                <ListItem>Spa</ListItem>
                <ListItem>Food and Drinks</ListItem>
                <ListItem>Parking and Transportation</ListItem>
              </List>
            </SimpleGrid>
          </Box>
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('yellow.500', 'yellow.300')}
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              Other Details
            </Text>

            <List spacing={2}>
                <ListItem>WheelChair Accessible</ListItem>
                <ListItem>LGBTQ Welcoming</ListItem>
                <ListItem>Family Friendly</ListItem>
                <ListItem>Safety Fit</ListItem>
            </List>
          </Box>
        </Stack> */}


        
        {/* Random generated people  */}

        {/* <Stack direction="row" alignItems="center" justifyContent={'center'}>
          <Text color='tomato'>{Math.floor(Math.random() * 31) + 30} people booked this place today</Text>
        </Stack> */}
      </Card>
    </SimpleGrid>
  </Container>
  </>
}
