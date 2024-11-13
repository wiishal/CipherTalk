import axios from "axios";
const url = "http://localhost:3000";

export async function login(
  username: string,
  password: string
): Promise<string | null> {
  try {
    const response = await axios.post(`${url}/auth/login`, {
      userName: username,
      userPassword: password,
    });
    console.log(response);
    return response.data.token;
  } catch (error: any) {
    console.error(
      "Error during login:",
      error.response?.status || error.message
    );
    return null;
  }
}


export async function signup(
  username: string,
  email:string,
  password: string,
): Promise<string | null> {
  try {
    const response = await axios.post(`${url}/auth/login`, {
      userName: username,
      userEmail:email,
      userPassword: password,

    });
    console.log(response);
    return response.data.token;
  } catch (error: any) {
    console.error(
      "Error during login:",
      error.response?.status || error.message
    );
    return null;
  }
}