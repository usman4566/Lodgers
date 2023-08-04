import { Box, Checkbox, Divider, Heading, Hide, Input, SkeletonCircle, SkeletonText, Stack, Icon, VStack, InputGroup, InputLeftElement, InputRightElement, Button, RangeSlider, RangeSliderMark, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from "@chakra-ui/react";
import axios from "axios";
// import PriceSlider from "../Components/PriceSlider";

import { ImSearch } from "react-icons/im";
import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../Components/ProductCard";

export default function ProductsPage() {
  //   const { search } = useContext(SearchContext);
  const [products, setproducts] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(20000);
  const [amenities, setAmenities] = useState({
    wifi: false,
    parking: false,
    security: false,
    tv: false,
    food: false,
    laundry: false,
    kitchen: false,
    singleroom: false,
    doublebedroom: false,
    threebedroom: false,
    attachbath: false,
    airconditioned: false,
  });

  const [text, setText] = useState({
    title: "",
  });

  const getHostels = async () => {
    try {
      let res = await axios.get("http://localhost:5000/get-hostels");
      console.log(res);
      setproducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const FtchData = async () => {
      try {
        let res = await axios({
          method: "get",
          url: `http://localhost:5000/get-hostels`,
        });
        console.log(res.data.hostels);
        setproducts(res.data.hostels);
        setHostels(res.data.hostels);
        // console.error(res.data.hostels);
      } catch (error) {
        console.error(error);
      }
    };
    FtchData();
  }, [search]);

  // const filterItem = (price) => {
  //     const updatedItems = products.filter(curElem) => {
  //         return curElem.price === price;
  //     });
  // }

  const toggleAmeneties = (amenity, value) => {
    let obj = amenities;
    obj[amenity] = value;
    setAmenities(obj);
    filterHostels();
  };

  const toggleText = (value) => {
    let filteredByText = products.filter((hostel) => {
      return hostel.name.toLowerCase().includes(value);
    });
    filterHostels(filteredByText);
  };

  function filterByFeatures(arr, features) {
    console.log("filter se filter");
    return arr.filter((item) => {
      for (let feature in features) {
        if (features[feature] == true && item.features[feature] != features[feature]) {
          return false;
        }
      }
      return true;
    });
  }

  function filterByPrice() {
    console.log("price se filter");
    filterHostels();
  }

  function filterHostels(arr = undefined) {
    let filteredByAmenities;
    if (arr) {
      filteredByAmenities = filterByFeatures(arr, amenities);
    } else {
      filteredByAmenities = filterByFeatures(products, amenities);
    }
    let filteredByPrice = filteredByAmenities.filter((hostel) => (hostel.price == undefined) || hostel.price >= priceMin && hostel.price <= priceMax);
    setHostels(filteredByPrice);
  }

  return (
    <Box px={40}>
      <Stack direction="row" spacing={10} mt="50px">
        <Hide below="md">
          <VStack w={{ sm: "0%", md: "30%" }} border="0px solid grey" align="flex-start">
            <InputGroup>
              <InputLeftElement color="black.400" fontSize="1.2em" marginTop={"5px"} children={<Icon as={ImSearch} />} />
              <Input
                focusBorderColor="black"
                textColor="black"
                placeholder="Enter name/location or choose location on map "
                size="lg"
                variant="filled"
                opacity={"0.6"}
                onChange={(e) => {
                  toggleText(e.target.value);
                }}
              />
              <InputRightElement />
            </InputGroup>
            {/* <Button colorScheme="teal" size="lg">
              Search
            </Button> */}

            <Heading size="md">Amenities</Heading>
            <Checkbox size="lg" onChange={(e) => toggleAmeneties("wifi", e.target.checked)}>
              Wifi
            </Checkbox>

            <Checkbox size="lg" onChange={(e) => toggleAmeneties("parking", e.target.checked)}>
              Parking
            </Checkbox>
            <Checkbox size="lg" onChange={(e) => toggleAmeneties("security", e.target.checked)}>
              Security
            </Checkbox>
            <Checkbox size="lg" onChange={(e) => toggleAmeneties("tv", e.target.checked)}>
              TV
            </Checkbox>
            <Checkbox size="lg" onChange={(e) => toggleAmeneties("food", e.target.checked)}>
              Food and Mess
            </Checkbox>
            <Checkbox size="lg" onChange={(e) => toggleAmeneties("laundry", e.target.checked)}>
              Laundry
            </Checkbox>
            <Checkbox size="lg" onChange={(e) => toggleAmeneties("kitchen", e.target.checked)}>
              Kitchen
            </Checkbox>
            <Divider orientation="horizontal" />
            <br />

            <Heading size="md" pb="40px">
              Price
            </Heading>

            <RangeSlider
              defaultValue={[0, 20000]}
              min={0}
              max={20000}
              step={1000}
              colorScheme="blue"
              onChange={([min, max]) => {
                setPriceMin(min);
                setPriceMax(max);
              }}
              onChangeEnd={() => {
                filterByPrice();
              }}
            >
              <RangeSliderMark value={priceMin} textAlign="center" bg="blue.500" color="white" mt="-10" ml="-5" w="12">
                {priceMin}
              </RangeSliderMark>
              <RangeSliderMark value={priceMax} textAlign="center" bg="blue.500" color="white" mt="-10" ml="-5" w="12">
                {priceMax}
              </RangeSliderMark>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={4} index={0} />
              <RangeSliderThumb boxSize={4} index={1} />
            </RangeSlider>

            <Divider orientation="horizontal" pt="8px" />

            <Heading size="md">Room Type</Heading>
            <Checkbox size="lg" onChange={(e) => toggleAmeneties("singleroom", e.target.checked)}>Single Room</Checkbox>

            <Checkbox size="lg" onChange={(e) => toggleAmeneties("doublebedroom", e.target.checked)}>2 Bed Room</Checkbox>

            <Checkbox size="lg" onChange={(e) => toggleAmeneties("threebedroom", e.target.checked)}>3 Bed Room</Checkbox>
            <Checkbox size="lg" onChange={(e) => toggleAmeneties("attachbath", e.target.checked)}>Attach Bath</Checkbox>
            <Checkbox size="lg" onChange={(e) => toggleAmeneties("airconditioned", e.target.checked)}>Air Condition Room</Checkbox>
            <Divider orientation="horizontal" />
            <br />

            {/* Distance */}
            {/* <Heading size='md'>Distance</Heading>
                    <Checkbox size='lg'>
                        0-5 km
                    </Checkbox>
                    <Checkbox size='lg'>
                       0-10 km
                    </Checkbox>
                    <Checkbox size='lg'>
                        0-15 km
                    </Checkbox>
                    <Checkbox size='lg'>
                        0-20 km
                    </Checkbox>
                    <Checkbox size='lg'>
                        0-25 km
                    </Checkbox>
                    <Divider orientation='horizontal' />
                    <br /> */}
          </VStack>
        </Hide>

        {products.length == 0 ? (
          <Box w="100%">
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            </Box>
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            </Box>
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            </Box>
            ``
          </Box>
        ) : (
          <VStack w={{ base: "100%", sm: "100%", md: "70%" }} border="0px solid">
            {hostels.map((product, i) => (
              <ProductCard product={product} key={i} id={product.id} />
            ))}
          </VStack>
        )}
      </Stack>
    </Box>
  );
}