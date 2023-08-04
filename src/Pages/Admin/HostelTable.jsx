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

const HostelTable = (props) => {
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
    const response = await Axios.get("http://localhost:5000/get-hostels", {});
    const users = response.data.hostels;
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
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.city.toLowerCase().includes(searchTerm.toLowerCase())
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
            Hostel List
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
              <Th>Description</Th>
              <Th>City</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentRows.map((user, index) => (
              <Tr key={user._id}>
                <Td>{index + 1}</Td>
                <Td>{user.name}</Td>
                <Td>
                  {user.description.length > 10
                    ? user.description.substring(0, 50) + "..."
                    : user.description}
                </Td>
                <Td>{user.city}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => editUser(user)}
                    mr={2}
                  />
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

export default HostelTable;
