import { Button, Stack, Icon, Input, InputGroup, InputLeftElement, InputRightElement, useToast, Text,IconButton } from "@chakra-ui/react"
import { ImSearch,ImLocation2, ImCalendar } from 'react-icons/im';
import { Link, useNavigate } from "react-router-dom";
import 'react-datalist-input/dist/styles.css';
import { useContext } from "react";
import { SearchContext } from "../Contexts/SearchContextProvider";
import { useState } from "react";
import Alert from './Alert'
import Home from '../Assets/Home.jpg'



export default function SearchPanel() {
    const navigate = useNavigate();
    const { setsearch } = useContext(SearchContext)
    const [location, setlocation] = useState(null)
    const toast = useToast()
    const [inputValue, setInputValue] = useState('');
    // let alertdata={
    //     title: ' Invalid Input',
    //     description: "Please check the input again",
    //     status: 'warning',
    //   }

    let initialdata = {
        destination: null,
        checkin: null,
        checkout: null,
        travellers: null,
        rooms: null,
    }

    const [traveldata, settraveldata] = useState(initialdata)
    //console.log(traveldata)

    let handletraveller = (el) => {
        settraveldata({ ...traveldata, [el.target.name]: el.target.value })
    }

    const handleSearch = () => {

        


    if (inputValue.toLowerCase() === 'islamabad' || inputValue.toLowerCase() === 'rawalpindi') {
        toast({
            title: "Success",
            description: "Proceeding to the next step...",
            status: "success",
            duration: 1000,
            isClosable: true,

          })

          navigate('/products')
    } else {
        toast({
            title: "Invalid INPUT",
            description: "Invalid Location, Please enter Islamabad/Rawalpindi",
            status: "warning",
            duration: 1000,
            isClosable: false,

          })
    }
 


        let flag=true
        for(let key in traveldata)
        {
            if(traveldata[key]==null)
            { 
                //toast(Alert(alertdata)) 
                flag=false;
                break;
            }
        }
        

        if(flag==true) 
        {
            let bookingdata=JSON.parse(localStorage.getItem('booking'))
            setsearch(location)
            navigate('/products')
            localStorage.setItem('booking',JSON.stringify({...bookingdata,...traveldata}))
        }
    }

    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };

    return <div style={{ 'marginBottom': '2%','border':'0px solid' }}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={2} border='0px solid' justifyContent='space-evenly' >
            { <InputGroup>
                <InputLeftElement
                    color='black.400'
                    fontSize='1.2em'
                    marginTop={'5px'}
                    children={<Icon as={ImSearch} />}
                />              
                <Input focusBorderColor="white" textColor="white" placeholder="Enter name/location or choose location on map "
                size='lg'
                variant='filled'
                opacity={'0.8'}
                value={inputValue}
                onChange={handleInputChange}
                />
                <InputRightElement  
                    />
                </InputGroup> }
                <Button colorScheme='teal' size='lg' onClick={handleSearch}>
                    Search
                </Button>


        </Stack>

        




    </div>
}