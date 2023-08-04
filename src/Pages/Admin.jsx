import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  Center,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import Axios from "axios";
Chart.register(
  ArcElement,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);
const AdminDashboard = () => {
  const [data, setData] = React.useState([]);
  const [users1, setUsers1] = React.useState([]);
  const [owners, setOwners] = React.useState([]);
  const [bookingsCount, setBookingsCount] = React.useState(0);
  const [ownersCount, setOwnersCount] = React.useState(0);
  const [usersCount, setUsersCount] = React.useState(0);


  const doughnutData = {
    labels: ["Bookings", "Owners", "Users"],
    datasets: [
      {
        label: "Count",
        data: [bookingsCount, ownersCount, usersCount],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgba(54, 162, 235, 0.6)",
        tension: 0.1,
      },
    ],
  };

  const filterUsers = (users) => {
    const filteredUsers = users.filter((user) => {
      return user.role === "user";
    });
    setUsers1(filteredUsers);
    const filteredOwners = users.filter((user) => {
      return user.role === "owner";
    });
    setOwners(filteredOwners);
    setUsersCount(users1.length);
    setOwnersCount(owners.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await Axios.get("http://localhost:5000/get-users");
      const users = usersResponse.data.users;
      filterUsers(users);

      const bookingsResponse = await Axios.get(
        "http://localhost:5000/get-bookings"
      );
      const bookings = bookingsResponse.data.bookings;
      setData(bookings);
      setBookingsCount(data.length);
    };

    fetchData();
  }, [
    data.length,
    owners.length,
    users1.length,
    bookingsCount,
    ownersCount,
    usersCount,
  ]);

  return (
    <>
      <Container maxW="container.lg">
        <Box mt={8}>
          <Heading as="h1" size="xl" textAlign="center">
            Admin Dashboard
          </Heading>
        </Box>
        <Flex mt={8} direction={["column", "column", "row"]} gap={4}>
          <Box flex="1">
            <Text fontWeight="bold" fontSize="xl" mb={4} textAlign="center">
              Users Chart
            </Text>
            <Center>
              <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
                <Doughnut data={doughnutData} />
              </Box>
            </Center>
          </Box>
          <Box flex="1">
            <Text fontWeight="bold" fontSize="xl" mb={4} textAlign="center">
              Bar Chart
            </Text>
            <Center>
              <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
                <Bar data={barData} />
              </Box>
            </Center>
          </Box>
        </Flex>
        <Box mt={8}>
          <Text fontWeight="bold" fontSize="xl" mb={4} textAlign="center">
            Line Chart
          </Text>
          <Center>
            <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
              <Line data={lineData} />
            </Box>
          </Center>
        </Box>
      </Container>
    </>
  );
};

export default AdminDashboard;
