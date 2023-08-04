import { ReactNode,useEffect } from 'react';
import axios from 'axios';
import Logo from "../Assets/Logo.png"
import {
  Box,
  Flex,
  Avatar,
  Linki,
  Button,
  Menu,
  Text,
  MenuButton,
  useToast,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Image,
  Card,
  Divider,
  IconButton,
  Heading,
  HStack,
  VStack,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
import {BellIcon,RepeatClockIcon, InfoIcon, QuestionIcon } from '@chakra-ui/icons'

import { AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContextProvider';

import React, { useState } from 'react';



const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);



  

 





export default function Navbar() {
  const navigate=useNavigate();
  const [loginbuttonColor, setLoginButtonColor] = useState('');
  const [signupButtonColor, setSignupButtonColor] = useState('');
  const [bookings, setBookings] = useState([])
  const [checkBooking, setCheckBooking] = useState([])
  const { isOpen, onToggle, onClose } = useDisclosure()

  const toast = useToast();

  const [admin, setAdmin] = useState(false)
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  const handleClick1 = () => {
    if (loginbuttonColor === '') {
      setLoginButtonColor('black');
      setSignupButtonColor('');
    }
  };

  const handleClick2 = () => {
    if (signupButtonColor === '') {
      setSignupButtonColor('black');
      setLoginButtonColor('');
    }
  };
  const { colorMode, toggleColorMode } = useColorMode();
 // const { isOpen, onOpen, onClose } = useDisclosure();
 const {isAuth,Logout}=useContext(AuthContext)
 let userdata=JSON.parse(localStorage.getItem('booking'))
let user=JSON.parse(localStorage.getItem("user"))
// if(user.role==="admin"){
//   setAdmin(true)
// }else
// {
//   setAdmin(false)
// }
  
 const handleLogout=()=>{
  setLoginButtonColor('');
  // setSignupButtonColor('');
  Logout();
  localStorage.clear()
  navigate(`/`)
}

useEffect(() => {
  const isAdmin=()=>{
    if(user)
    if(user.role==="admin"){
      setAdmin(true)
    }else
    {
      setAdmin(false)
    }
  }
  isAdmin()

  const FtchData = async () => {
      try {
          let res = await axios({
              method: 'get',
              url: `http://localhost:5000/get-bookings-by-owner/${user._id}`,
          })
          
          setCheckBooking(res.data.booking)          
          console.log(res.data.booking)
          setBookings(res.data.booking)
          console.log(bookings)
          //filter out the booking where status is false
          let filteredBookings=res.data.booking.filter((booking)=>booking.status===false)
          console.log(filteredBookings)
          setBookings(filteredBookings)

        } 
      catch (error) {
          console.error(error)
      }
  }
  FtchData()
}, [1])
const handleAccept=(id)=>{
  console.log(id)
  axios.put(`http://localhost:5000/change-booking-status/${id}`)
  .then(res=>{
    console.log(res.data)
    window.location.reload()
    toast({
      title: "Success",
      description: "The booking is accepted sucessfully",
      status: "success",
      duration: 1000,
      isClosable: true,
    
    })
  })
  .catch(err=>{
    console.log(err)
  })
}

const handleReject=(id)=>{
  console.log(id)
  axios.put(`http://localhost:5000/change-booking-status/${id}`)
  .then(res=>{
    console.log(res.data)
    
    window.location.reload()
    toast({
      title: "Success",
      description: "The booking is rejected sucessfully",
      status: "success",
      duration: 1000,
      isClosable: true,
    
    })
  })
 
  .catch(err=>{
    console.log(err)
  })
  
}


  return (
    <div style={{ position: 'sticky', top: '0px', zIndex:'1' }}>
    {admin?
      (
      
      <Box bg={bgColor} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link to='/adminDash'><Box><Image src={Logo} width='8em' alt='logo' /></Box></Link>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={4}>

              <Link to='/bookinglist'>
                <Button colorScheme='teal' variant='ghost'>
                  <Icon as={RepeatClockIcon}  paddingRight='4px'/>All Bookings
                </Button>
              </Link> 

              <Link to='/userList'>
                <Button colorScheme='teal' variant='ghost'>
                  <Icon as={InfoIcon}  paddingRight='4px'/>Users
                </Button>
              </Link>       
                
              <Link to='/hostellist'>
                <Button colorScheme='teal' variant='ghost'>
                  <Icon as={QuestionIcon}  paddingRight='4px'/>All Hostels
                </Button>
              </Link> 
              <Link to='/ownerList'>
                <Button colorScheme='teal' variant='ghost'>
                  <Icon as={BellIcon}  paddingRight='4px'/>Owners
                </Button>
              </Link>      
              

              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
{!user?
              <Link to='/login'>
                <Button
                disabled={isAuth?true:false}
                  variant={'outline'}
                  colorScheme={'teal'}
                  size={'md'}
                  mr={4}
                  style={{ color: loginbuttonColor }} onClick={handleClick1}>
                  Login
                </Button>

              </Link>
              :null}
              {!user?
              <Link to='/signup'>
                <Button
                disabled={isAuth?true:false}
                  variant={'outline'}
                  colorScheme={'teal'}
                  size={'md'}
                  mr={4}
                  style={{ color: signupButtonColor }} onClick={handleClick2}>
                  Signup
                </Button>
              </Link>
:null}
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://wallpaperaccess.com/full/226302.jpg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://wallpaperaccess.com/full/226302.jpg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{userdata?.mobile}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Link to='/admin'><MenuItem>Admin User</MenuItem></Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    
    ):(
      
      <Box bg={bgColor} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link to='/'><Box><Image src={Logo} width='8em' alt='logo' /></Box></Link>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={4}>

              <Link to='/userbookings'>
                <Button colorScheme='teal' variant='ghost'>
                  <Icon as={RepeatClockIcon}  paddingRight='4px'/>My Bookings
                </Button>
              </Link> 


                <Popover
                  returnFocusOnClose={false}
                  isOpen={isOpen}
                  onClose={onClose}
                  placement='bottom'
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                  <Button colorScheme='teal' variant='ghost' onClick={onToggle}>
                    <Icon as={BellIcon}  paddingRight='4px'/>Notifications
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>Booking Requests</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />


                    {/* apply .map on below code  */}
 

                    <Divider />
                      {bookings?.map((booking) => {
                        return (
                          <PopoverBody>
                          <Grid templateColumns='repeat(2, 1fr)'>
                          <GridItem>
                            <Heading size='sm' textAlign='left'>{booking.hostelName}</Heading>
                            <Text textAlign='start'>{booking.roomType}</Text>
                            <Text fontSize='xs' textAlign='start'>{booking.checkInDate}</Text>
                          </GridItem>
                          <GridItem>
                            <Text textAlign='end' fontSize='sm'>Rs. {booking.price}/mo</Text>
                            
                          </GridItem>
                          <GridItem>
                            <ButtonGroup size='sm'>
                              <Button variant='outline' 
                              onClick={()=>{handleAccept(booking._id)}}
                              >Accept</Button>
                              <Button colorScheme='red' 
                              onClick={()=>{handleReject(booking._id)}}
                              >Reject</Button>
                            </ButtonGroup>
                          </GridItem>
                        </Grid>
                        </PopoverBody>
                        )
                      })
                      }

                  </PopoverContent>
                </Popover>

              <Link to='/about'>
                <Button colorScheme='teal' variant='ghost'>
                  <Icon as={InfoIcon}  paddingRight='4px'/>About
                </Button>
              </Link>       
                
              <Link to='/help'>
                <Button colorScheme='teal' variant='ghost'>
                  <Icon as={QuestionIcon}  paddingRight='4px'/>Help
                </Button>
              </Link>       
              

              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
{!user?
              <Link to='/login'>
                <Button
                disabled={isAuth?true:false}
                  variant={'outline'}
                  colorScheme={'teal'}
                  size={'md'}
                  mr={4}
                  style={{ color: loginbuttonColor }} onClick={handleClick1}>
                  Login
                </Button>

              </Link>
              :null}
              {!user?
              <Link to='/signup'>
                <Button
                disabled={isAuth?true:false}
                  variant={'outline'}
                  colorScheme={'teal'}
                  size={'md'}
                  mr={4}
                  style={{ color: signupButtonColor }} onClick={handleClick2}>
                  Signup
                </Button>
              </Link>
:null}
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://wallpaperaccess.com/full/226302.jpg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://wallpaperaccess.com/full/226302.jpg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{userdata?.mobile}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Link to='/admin'><MenuItem>Admin User</MenuItem></Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    
    )
  }
  </div>
    
  );
}