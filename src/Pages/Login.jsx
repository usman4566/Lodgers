import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Link,
  Modal,
  useDisclosure,
  textDecoration,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from '../Components/Alert';
import EmailContactForm from '../Components/Mail';
import PinModal from '../Components/PinModal';
import Product from '../Components/Product';
import AuthContextProvider, { AuthContext } from '../Contexts/AuthContextProvider';
import { Link as Linkto} from 'react-router-dom';


export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let { Login,page } = useContext(AuthContext)
  const navigate = useNavigate();
  const [confirm, setconfirm] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //console.log(confirm)


 



//Authenticating the login credentials---------------------  
  const toast = useToast()

  const handleLogin = () => {
        fetch('http://localhost:5000/loginW', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
              }),
            })
            .then((res) => res.json())
            .then((data) => {
              console.log('DATA+++++++++++++++++++')
              console.log(data)
              if(data.errors){
                toast({
                  title: "Error",
                  description: "Invalid Credentials",
                  status: "error",
                  duration: 1000,
                  isClosable: true,
                })

              }
              else{
                console.log(data.userInfo)
                
                sessionStorage.setItem("userId", data.userInfo._id);
                 

                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.userInfo))
                toast({
                  title: "Success",
                  description: "Login Successful",
                  status: "success",
                  duration: 1000,
                  isClosable: true,

                })
                // AuthContext.Login()
                if (data.userInfo.role=='owner'){
                  navigate('/owner')
                }
                else if (data.userInfo.role=='admin'){
                  navigate('/adminDash')
                }

                else{
                  navigate('/')
                } 
                                
              }
            })
  }
// else
  return (<>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Welcome User...</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Glad to see you !
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
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name='password' onChange={(e)=>{setPassword(e.target.value )}} />
            </FormControl>
            <Stack spacing={10}>            
                <Linkto  to='/forgetpass' ><Text as='u' color='blue.400'>Forgot password?</Text></Linkto>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleLogin}>
                Log in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Not on Lodgers yet? <Linkto to='/signup'><Text as='u'>Signup</Text></Linkto>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>

    {/* <PinModal handlePin={handlePin} isOpen={isOpen} onClose={onClose} device={'email address'} isVerify={setverify}/> */}
  </>
  );
}