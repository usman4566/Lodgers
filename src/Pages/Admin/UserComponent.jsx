import { Paper, Typography, Button } from "@mui/material";
import UserTable from "./UserTable";

import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";




const styles = {
  paperContainer: {
    height: 130,
    backgroundImage: `url(${"/Static/GreenBackground.png"})`,
  },
};
const UserComponent = () => {

  const [data, setData] = useState({});
  var filteredData= null;
 
  const userList = async () => {
    const user = await Axios.get("http://localhost:5000/get-users", {
    });
    // setData(user.data.users);
    console.log(user.data.users);
    
    //filters the users with role User 
     filteredData = user.data.users.filter((user) => {
      return user.role === "user";
    });
    // console.log(filteredData)
    setData(filteredData);
    console.log(filteredData)
    // console.log(data)
  };

  useEffect(() => {
    userList();
  }, []);

  // console.log(data);
  return (
    <>
      {data != null ? (
        <>
          {/* <Paper style={styles.paperContainer}> */}
            {/* <Typography className="text-center text-light py-5" variant="h4">
              User Information
            </Typography> */}
          {/* </Paper> */}
          <div class="mt-2">
            <UserTable data={filteredData} />
          </div>
        </>
      ) : (
        null
      )}
    </>
  );
};

export default UserComponent;
