
import { Image,
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    Toast,
  ToastBody,
  ToastCloseButton,
  ToastContent,
  ToastHeader,
    HStack,
    ListItem,
    List,
    ListIcon,
    useColorModeValue,
    Wrap,
    WrapItem,
    FormControl,
    Stack,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    useToast,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Textarea, } from '@chakra-ui/react';
    import  { useState } from "react";
    import { Navigate, useNavigate } from 'react-router-dom';

    import {
        MdPhone,
        MdEmail,
        MdLocationOn,
        MdFacebook,
        MdOutlineEmail,
      } from 'react-icons/md';

    import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import Help from '../Assets/help.png'

import { FaCheckCircle } from 'react-icons/fa';


  

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

export default function All() {



    const toast = useToast();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
   
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (!name || !email || !message) {
        toast({
          title: "Error",
          description: "Please Provide all the information",
          status: "error",
          duration: 1000,
          isClosable: true,
        })
      }

      else{
          
        toast({
          title: "Success",
          description: "Your Query has been submitted",
          status: "success",
          duration: 1000,
          isClosable: true,

        })
        
        navigate('/')
      }
  
      // TODO: handle form submission
    };

  

return (

<div>   

<Image
        w="100%"
        h='500px'
        src={Help}
        alt="image three"
    />

  <Box py={12}>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl">
            FAQ's
          </Heading>
          <Text fontSize="lg" color={'gray.500'}>
            You can search you answers by topics in each section!
          </Text>
        </VStack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}>

          <PriceWrapper>
            <Box position="relative" px={5}>
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: 'translate(-50%)' }}>
                <Text
                  textTransform="uppercase"
                  bg={useColorModeValue('red.300', 'red.700')}
                  px={3}
                  py={1}
                  color={useColorModeValue('gray.900', 'gray.300')}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl">
                  Most Popular
                </Text>
              </Box>
              <Box py={4} width='320px'>
                <Text fontWeight="500" fontSize="2xl">
                  1
                </Text>
                <HStack justifyContent="center">

                  <Text fontSize="3xl" color="gray.500">
                    Booking Q's
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}>
                <Accordion allowMultiple>
                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        How do I get more info about the room or property's facilities?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    You can find the room and property facilities in your Hostel Information "Show Details".
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        I can't find my confirmation email. What should I do?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    Be sure to check your email inbox, spam, and junk folders. If you still can't find your confirmation, go to booking.com/help and we'll resend it to you.
                    </AccordionPanel>
                  </AccordionItem>


                </Accordion>

                <Box w="80%" pt={7}>
                  <Button w="full" height='10px' colorScheme="red">   
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>


          <PriceWrapper>
            <Box position="relative" px={5}>
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: 'translate(-50%)' }}>
                <Text
                  textTransform="uppercase"
                  bg={useColorModeValue('red.300', 'red.700')}
                  px={3}
                  py={1}
                  color={useColorModeValue('gray.900', 'gray.300')}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl">
                  Most Popular
                </Text>
              </Box>
              <Box py={4} width='320px'>
                <Text fontWeight="500" fontSize="2xl">
                  2
                </Text>
                <HStack justifyContent="center">

                  <Text fontSize="3xl" color="gray.500">
                    Account Q's
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}>
                <Accordion allowMultiple>
                
                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        Do I need to have or buy a yearly membership Hostel Card?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    No. You do not have to have or buy a yearly hostel membership card to book at any hostel listed on our site.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        How do I become a member of Lodgers?                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    If you have previously booked with Lodgers.com, a Lodgers account was automatically created for you so there is no need to sign up again! All you need to do is enter your username/email address and password here.

                    If you have not previously booked with us and would like to set up an account, please click here. Also, creating an account with Lodgers is completely free!                    
                    </AccordionPanel>
                  </AccordionItem>

                </Accordion>

                <Box w="80%" pt={7}>
                  <Button w="full" height='10px' colorScheme="red">   
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>

          <PriceWrapper>
            <Box position="relative" px={5}>
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: 'translate(-50%)' }}>
                <Text
                  textTransform="uppercase"
                  bg={useColorModeValue('red.300', 'red.700')}
                  px={3}
                  py={1}
                  color={useColorModeValue('gray.900', 'gray.300')}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl">
                  Most Popular
                </Text>
              </Box>
              <Box py={4} width='320px'>
                <Text fontWeight="500" fontSize="2xl">
                  3
                </Text>
                <HStack justifyContent="center">

                  <Text fontSize="3xl" color="gray.500">
                    Hostel Q's
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}>
                <Accordion allowMultiple>
                
                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        How do I know if parking is available at the property?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    You can see if the property has parking under "Facilities" before making a booking. If the property requires you to reserve a space, contact them directly with the contact details provided in your booking confirmation.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        How do I find out if a property has a certain facility?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    You can see if the property has parking under "Facilities" before making a booking. If the property requires you to reserve a space, contact them directly with the contact details provided in your booking confirmation.
                    </AccordionPanel>
                  </AccordionItem>
                  
                </Accordion>

                <Box w="80%" pt={7}>
                  <Button w="full" height='10px' colorScheme="red">   
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>
        </Stack>
      </Box>


      <Box py={12}>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={0}>

          <PriceWrapper>
            <Box position="relative" px={5}>

              <Box py={4} width='320px'>
                <Text fontWeight="500" fontSize="2xl">
                  4
                </Text>
                <HStack justifyContent="center">

                  <Text fontSize="3xl" color="gray.500">
                    Password Q's
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}>
                <Accordion allowMultiple>
                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        How do I change my account password?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    Go to login page
                      Click "Forgot Password"
                      Enter the recovery email
                      Enter Otp recieved through email
                      Ennter New Password
                      Login Again
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        I have forgotten my password, how can I get it?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Go to login page
                      Click "Forgot Password"
                      Enter the recovery email
                      Enter Otp recieved through email
                      Ennter New Password
                      Login Again
                    </AccordionPanel>
                  </AccordionItem>

                </Accordion>


                <Box w="80%" pt={7}>
                  <Button w="full" height='10px' colorScheme="red">   
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>


          <PriceWrapper>
            <Box position="relative" px={5}>

              <Box py={4} width='320px'>
                <Text fontWeight="500" fontSize="2xl">
                  5
                </Text>
                <HStack justifyContent="center">

                  <Text fontSize="3xl" color="gray.500">
                    Room Q's
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}>
                <Accordion allowMultiple>
                
                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        ifference between a Double Seater Room and a Single Seater Room?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      A Double Room has one double/full bed and a Twin Room has 2 twin beds. If a room is called Double/Twin, it can be set up for either type. You can specify your bed-type preference in the "Special Requests" box during the booking process.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        Can I request an extra bed in my room?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    When making a booking, you can request an extra bed in the “Special requests” box. We recommend contacting the property before arrival to make sure they have an extra bed available. You can find their contact details in the confirmation email and when you view your bookings in your account.
                    </AccordionPanel>
                  </AccordionItem>
                  
                </Accordion>

                <Box w="80%" pt={7}>
                  <Button w="full" height='10px' colorScheme="red">   
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>

          <PriceWrapper>
            <Box position="relative" px={5}>

              <Box py={4} width='320px'>
                <Text fontWeight="500" fontSize="2xl">
                  6
                </Text>
                <HStack justifyContent="center">

                  <Text fontSize="3xl" color="gray.500">
                    Payment Q's
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}>
                <Accordion allowMultiple>
                
                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        What payment methods are accepted?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Credit cards are the most widely-accepted payment method for properties listed on Lodgers.com, and most of them use credit cards to validate your booking.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem width='310px'>
                    <h2>
                      <AccordionButton>
                        <Text as="span"  textAlign='left'>
                        Why do I need to provide my card details?
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    Properties normally request this to guarantee your booking, and the card is often used to pay when you book. If you don’t need to make a prepayment, then they may hold an amount on your card to make sure it has sufficient funds. This test payment will be returned to you.
                    </AccordionPanel>
                  </AccordionItem>
                  
                </Accordion>

                <Box w="80%" pt={7}>
                  <Button w="full" height='10px' colorScheme="red">   
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>
        </Stack>
      </Box>


    <Container  maxW='container.2xl' mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          boxShadow='xl' p='6' rounded='md'
          color='black'
          borderRadius='lg'
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem alignItems='center'>
                <Box width='sm' >
                  <Heading color="gray.600">Didn't get your query answered?</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form to contact. We will get back to you!
                  </Text>

                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={20}
                    
                    >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box  width='xl' borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input type="text" size="md" name='name'  value={name} onChange={(event) => setName(event.target.value)} />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="mail">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input type="text" size="md" name='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="message">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          name='message' value={message} onChange={(event) => setMessage(event.target.value)}
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="submit" float="right">
                        <Button
                           type='submit' onClick={handleSubmit}
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}>
                          Submit Query
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>


</div>
    



    
  
  );
}