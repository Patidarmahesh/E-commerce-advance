import axios from "axios";
const servalUrl = "http://localhost:8000";

// POSTREQUEST || METHOD POST
export const PostRequest = async (endpoint, body, options) => {
  try {
    const response = await axios.post(`${servalUrl}${endpoint}`, body, {
      ...options,
    });
    if (response?.data?.success) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.log("}}}}}}}}}}}}", error.message);
  }
};
// POSTREQUEST || METHOD POST

// GETREQUEST || METHOD GET
export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${servalUrl}${endpoint}`);
    if (response?.data?.success) {
      return response.data.response;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
// GETREQUEST || METHOD GET

// GETREQUESTOFSINGLEPRODUCT || METHOD GET
export const getRequestOfSingleProduct = async (endpoint) => {
  try {
    const response = await axios.get(`${servalUrl}${endpoint}`);
    if (response?.data?.success) {
      return response.data.response;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
// GETREQUESTOFSINGLEPRODUCT || METHOD GET


// PUTREQUESTOFSINGLEPRODUCT || METHOD PUT
export const PutRequest = async (endpoint, body, options) => {
  try {
    const response = await axios.put(`${servalUrl}${endpoint}`, body, {
      ...options,
    });
    console.log("mayank????",response?.data?.response);
    if (response?.data?.success) {
      return response?.data?.response;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
// PUTREQUESTOFSINGLEPRODUCT || METHOD PUT


// DELETEREQUEST || METHOD DELETE
export const deleteRequest = async (endpoint, id, token) => {
  try {
    const response = await axios.delete(`${servalUrl}${endpoint}${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    });
    if (response?.data?.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
// DELETEREQUEST || METHOD DELETE
