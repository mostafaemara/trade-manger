import axios from "axios";
const API_BASE_URL="http://localhost:3000";
const API_LOGIN_PATH="/api/login";

export const apiSignIn = async (email, password) => {
    try {
        const response= await axios.post(API_BASE_URL+API_LOGIN_PATH, {
            email,
            password
          //  email: "sasa@sasa.com",
          //  password: "asdasdasdasd",
          });

          return  response.data;
        
    } catch (error) {
        throw error;
        
    }
 
};
