import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    useToast,
    Text,
    useColorModeValue,
    Avatar,
  } from '@chakra-ui/react';
  
  import { useEffect, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { Link, useNavigate } from 'react-router-dom';
  import axios from 'axios'
  
  
  export default function Signup() {
    const [email, setEmail] = useState('');

   const navigate=useNavigate()
    let initial={
      mobile:null,
      email:null,
      password:null,
    }
    const [showPassword, setShowPassword] = useState(false);
    const [signup, setsignup] = useState(initial)
    
  
    const toast = useToast()
  
      const handleSignup=()=>{
        if(email===""){
          toast({
            title: "Error",
            description: "Please Provide Email to receive OTP",
            status: "error",
            duration: 1000,
            isClosable: true,
          })
          
          console.log("error")
          return
        }
        else{
          axios.post('http://localhost:5000/email-send',{email})
          .then(res=>{
            console.log(res.data)
            if(res.data.message==="Email sent successfully!"){
              toast({
                title: "Success",
                description: "OTP sent to your email",
                status: "success",
                duration: 1000,
                isClosable: true,
              })
              navigate('/updatepass',{ state: { email }})
            }
            else{
              toast({
                title: "Error",
                description: "Email not found",
                status: "error",
                duration: 1000,
                isClosable: true,
              })
            }
          })
          .catch(err=>{
            console.log(err)
          })
        }

  
  
      };
  

  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Enter Email
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              You will receive an OTP on the provided email. 
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
           


  
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name='email' onChange={(e)=>{setEmail(e.target.value)}}/>
              </FormControl>
  

  
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  width='100px'
                  alignSelf='center'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSignup}>
                  Send OTP
                </Button>
              </Stack>

            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }