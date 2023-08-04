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
  import { AuthContext } from '../Contexts/AuthContextProvider';
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
                  localStorage.setItem('token', data.token)
                  localStorage.setItem('user', JSON.stringify(data.userInfo))
                  toast({
                    title: "Success",
                    description: "Login Successful",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
  
                  })
                  navigate('/')
                }
              })
    }
  // else
    return (<>
        <h1>HIIIIIIII</h1>
  
      {/* <PinModal handlePin={handlePin} isOpen={isOpen} onClose={onClose} device={'email address'} isVerify={setverify}/> */}
    </>
    );
  }