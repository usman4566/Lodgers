import React from "react"
import axios from 'axios'
import {  
    Button,
    Container,
    Heading,
    Grid,
    Badge,
    FormControl,
    Input,ImaTab, TabList, Flex, SimpleGrid, Icon, chakra, Tabs, useColorModeValue, Image, Box, Card, CardFooter,CardBody,Text, CardHeader, Stack } from "@chakra-ui/react"
    import {ExternalLinkIcon} from '@chakra-ui/icons'
export default function ImageCarousal() {

    return(
<SimpleGrid
  columns={{
    base: 1,
    md: 2,
  }}
  spacing={0}
>
  <Flex bg="brand.400">
    <Image
      src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80"
      alt="3 women looking at a laptop"
      fit="cover"
      w="full"
      h={{
        base: 64,
        md: "full",
      }}
      bg="gray.100"
      loading="lazy"
      opacity={0.8}
    />
  </Flex>
  <Flex
    direction="column"
    alignItems="start"
    justifyContent="center"
    backgroundColor='gray.200'
    px={{
      base: 4,
      md: 8,
      lg: 20,
    }}
    py={24}
    zIndex={3}
  >
    <chakra.span
      color="brand.600"
      _dark={{
        color: "gray.300",
      }}
      fontSize="md"
      textTransform="uppercase"
      fontWeight="extrabold"
    >
      Want to know about something?
    </chakra.span>
    <chakra.h1
      mb={4}
      fontSize={{
        base: "4xl",
        md: "4xl",
        lg: "5xl",
      }}
      fontWeight="bold"
      color="brand.600"
      _dark={{
        color: "gray.300",
      }}
      lineHeight="shorter"
      textShadow="2px 0 currentcolor"
    >
      We&apos;re here to help
    </chakra.h1>
    <chakra.p
      pr={{
        base: 0,
        lg: 16,
      }}
      mb={4}
      fontSize="lg"
      color="brand.600"
      _dark={{
        color: "gray.400",
      }}
      letterSpacing="wider"
    >
      Get the Best Business Messenger and start getting personalized
      experiences at every stage of the Lodgers's journey.
    </chakra.p>
    <Box display="inline-flex" rounded="md" shadow="md">
      <chakra.Button
        mt={2}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        px={5}
        py={3}
        border="solid transparent"
        fontWeight="bold"
        w="full"
        rounded="md"
        _light={{
          color: "black",
        }}
        bg="brand.600"
        _dark={{
          bg: "brand.500",
        }}
        _hover={{
          bg: "gray.400",
        }}
      >
        Visit the Help Centre
        <Icon as={ExternalLinkIcon} ml={2} />
      </chakra.Button>
    </Box>
  </Flex>
</SimpleGrid>
);
};
