import axios from "axios";
const API_BASE_URL = "http://localhost:3000";
const API_LOGIN_PATH = "/api/login";
const API_SHIPMENTS_PATH = "/api/shipments";
const API_ADD_NEW_SHIPMENT_PATH = "/api/shipment";
const API_CLIENTS_PATH = "/api/clients";
export const apiSignIn = async (email, password) => {
  try {
    const response = await axios.post(API_BASE_URL + API_LOGIN_PATH, {
      email,
      password,
      //  email: "sasa@sasa.com",
      //  password: "asdasdasdasd",
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiFetchShipments = async (page, size, token) => {
  try {
    const response = await axios.get(API_BASE_URL + API_SHIPMENTS_PATH, {
      params: {
        page: page,
        size: size,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const apiFetchClients = async (token) => {
  try {
    const response = await axios.get(API_BASE_URL + API_CLIENTS_PATH, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error + "eeeeeeeer");
    throw error;
  }
};

export const apiAddNewShipment = async (shipment, token) => {
  try {
    const response = await axios.post(
      API_BASE_URL + API_ADD_NEW_SHIPMENT_PATH,
      {
        client: shipment.client,
        date: shipment.date,
        gauge: shipment.gauge,
        extraGauge: shipment.extraGauge,
        bags: shipment.gauge,
        extraBags: shipment.extraBags,
        isPriced: shipment.isPriced,
        weight: shipment.weight,
        pricePerKantar: shipment.pricePerKantar,
        expenses: shipment.expenses,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
