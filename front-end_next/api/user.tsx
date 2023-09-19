import axios from "axios";
import { useEffect } from "react";

async function fetchUsers() {
  try {
    const response = await axios.get("http://localhost:3333/");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

const getUsers = () => {
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
    
    </>
  )
};

export default getUsers;