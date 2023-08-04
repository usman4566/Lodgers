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
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Axios from "axios";

const OwnerTable = (props) => {
  const history = useNavigate();

  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const userList = async () => {
    const response = await Axios.get("http://localhost:5000/get-users", {});
    const users = response.data.users;
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
      user.role === "owner" &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
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
            Owner List
          </Heading>
        </Box>
      <Flex direction="column">
        <Box mb={4}
          display="flex"
          justifyContent="flex-end"
          width="100%"
          alignItems="center"
          mt={4}
          >
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
              <Th>Customer name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentRows.map((user, index) => (
              <Tr key={user._id}>
                <Td>{index + 1}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit"
                    // onClick={() =>
                    //   editUser({
                    //     user: user,
                    //     role: "Teacher",
                    //     edit: true,
                    //   })
                    // }
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete"
                    color="red"
                    // onClick={() => handleClickOpenConfir(user._id)}
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

export default OwnerTable;
