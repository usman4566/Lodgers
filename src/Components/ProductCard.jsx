import {
Badge,
Button,
Card,
CardBody,
CardFooter,
Center,
Divider,
Flex,
Heading,
Image,
Icon,
Stack,
Text,
Box,
useColorModeValue,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { ImSearch,GoLocation} from 'react-icons/go';


const MAX_LENGTH = 150;


export default function ProductCard({ product, id }) {
//const {id}=useParams();
return (
  <>
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      cursor='pointer'
      border='none'
      w='100%'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={product.image}
        alt='Caffe Latte'
      />

      <Stack w='100%'>
        <CardBody textAlign='start'>
          <Heading size='md'>{product.name}</Heading>
       
            
         <Text fontSize='15px' color='green'> <Icon as={GoLocation} mt="2" boxSize={3} />{product.city}</Text>

          
          <Text>{product.description.length > MAX_LENGTH ? `${product.description.slice(0, MAX_LENGTH)}...` : product.description}</Text>
          
        </CardBody>
        


        {/* <CardFooter justifyContent='space-between'>
          <Text fontSize='xl'>Price: <b>{product.price}</b>/individual</Text>
          <Link to={`/singleproduct/1`}>
            <Button variant='solid' colorScheme='blue'>
              Show Details
            </Button>
          </Link>
        </CardFooter>
      </Stack> */}

          <CardFooter justifyContent='space-between'>
            <Text fontSize='xl'>Price: {product.price ? <><b>{product.price}</b>/individual</> : <b>11000</b>}</Text>
            <Link to={`/singleproduct` } state={{hostel: product}} >
              <Button variant='solid' colorScheme='blue'>
                Show Details
              </Button>
            </Link>
          </CardFooter>
        </Stack>


    </Card>
    <Divider orientation='horizontal' color='grey'/>
  </>
);
}