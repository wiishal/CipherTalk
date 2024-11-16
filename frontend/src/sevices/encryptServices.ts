import axios from "axios";
const url = "http://localhost:3000";

export async function checkKeyStatus(token: String): Promise<keystatus | null> {
  try {
    const response = await axios.post(`${url}/encrypt/verifyKetStatus`, {
      usertoken: token,
    });
    return response.data;
  } catch (error) {
    console.log("Error while getting keystatus");
    return null;
  }
}

export async function changeKeystatus(token: string) {
  try {
    const response = await axios.post(`${url}/encrypt/setKeystatus`, {
      usertoken: token,
    });
    return response.data;
  } catch (error) {
    console.log("error while setting key!");
  }
}

interface keystatus{
    keystatus:boolean
}
