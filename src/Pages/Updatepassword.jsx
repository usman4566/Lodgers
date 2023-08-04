import {
    Flex,
    Box,
    HStack,
    PinInput,
    PinInputField,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
  import { Link,useLocation,useNavigate } from 'react-router-dom';
  export default function SimpleCard({navigation,route}) {
    //recieve email from forgetpass.jsx
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [otp, setOtp] = useState('');

    const handleClick = async() => {
        if(password === confirmPassword) {
        const res = await Axios.post('http://localhost:5000/change-password', {
          otp,
          newPassword:password,
          email: email.email
        });
        if(res.data.message === 'Password changed successfully!') {
          alert('Password changed successfully!');
          navigate('/login');
        }
        else {
          alert('Invalid OTP');
        }
      }

      else {
        alert('Passwords do not match');
      }

    }
 


    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Setting Up New Password</Heading>
            
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
            
            <FormControl id="otp">
                <FormLabel>Enter OTP</FormLabel>
                <HStack>
                    <PinInput
                        onChange={value => setOtp(value)}

                    >
                        <PinInputField/>
                        <PinInputField 
                        />
                        <PinInputField />
                        <PinInputField />
                    </PinInput>
                </HStack>
              </FormControl>
              
              <FormControl id="newpassword">
                <FormLabel>New Password</FormLabel>
                <Input type="newpassword" 
                onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="confirmpassword">
                <FormLabel>Confirm Password</FormLabel>
                <Input type="confirmpassword" 
                onChange={e => setConfirmPassword(e.target.value)}
                />
              </FormControl>

              <Stack spacing={10}>
               
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleClick}
                  >
                    
                Confirm
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }