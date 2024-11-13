import axios from "axios";
const url = "http://localhost:3000";

export async function getUsers(token: string): Promise<string | null> {
  try {
    const response = await axios.post(`${url}/Friend/get-Users`, {
      usertoken: token,
    });
    console.log(response);
    return response.data.data;
  } catch (error: any) {
    console.error(
      "Error during login:",
      error.response?.status || error.message
    );
    return null;
  }
}

export async function getUserDetails(
  token: string,
  user: string
): Promise<userDetail | null> {
  try {
    const response = await axios.post(`${url}/Friend/verify`, {
      usertoken: token,
      userid: user,
    });

    return response.data.userFind;
  } catch (error) {
    console.log("Error while getting detail");
    return null;
  }
}

interface userDetail{
    username:string,
    userid:number
}

 