import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Heading
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Axios from "axios";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const BookingTable = (props) => {
  const history = useNavigate();

  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

 


  const editUser = async (user) => {
  //code here
  };

  const removeUser = async () => {
    //code here
  };

  const userList = async () => {
    const response = await Axios.get("http://localhost:5000/get-bookings", {});
    const users = response.data.bookings;
    setData(users);
    setUsers(users);
  };

  useEffect(() => {
    userList();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = users.filter((user) => {
    return (
      user.contactNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
    <Box mt={8}>
          <Heading as="h1" size="xl" textAlign="center">
            Booking Table
          </Heading>
        </Box>
      <Flex direction="column">
        <Box mb={4}>
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Serial No.</Th>
              <Th>Hostel name</Th>
              <Th>Customer Name</Th>
              <Th>Contact No</Th>
              <Th>Check In</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentRows.map((user, index) => (
              <Tr key={user._id}>
                <Td>{index + 1}</Td>
                <Td>{user.hostelName}</Td>
                <Td>{user.customerName}</Td>
                <Td>{user.contactNo}</Td>
                <Td>{user.checkIn.split("T")[0]}</Td>
                <Td>
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    // onClick={() => handleClickOpenConfir(user._id)}
                    colorScheme="red"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex justify="space-between" align="center" mt={4}>
          <IconButton
            icon={<ChevronLeftIcon />}
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            mr={2}
            aria-label="Previous Page"
          />
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <IconButton
            icon={<ChevronRightIcon />}
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            ml={2}
            aria-label="Next Page"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default BookingTable;
