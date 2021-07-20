import axios from "axios";

const API_BASE_URL = "/api";
const API_LOGIN_PATH = "/login";
const API_SHIPMENTS_PATH = "/shipments";
const API_ADD_NEW_SHIPMENT_PATH = "/shipment";
const API_EDITE_SHIPMENT_PATH = "/editeShipment";
const API_CLIENTS_PATH = "/clients";
const API_DELETE_SHIPMENT = "/deleteShipment";

export const login = async (email, password) => {
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

export const fetchShipments = async ({
  client,
  startDate,
  endDate,
  page,
  limit,
  token,
}) => {
  const params = { page: page, limit: limit };
  if (client) {
    params["client"] = client;
  }
  if (startDate) {
    params["dateAfter"] = startDate;
  }
  if (endDate) {
    params["dateBefore"] = endDate;
  }

  try {
    const response = await axios.get(API_BASE_URL + API_SHIPMENTS_PATH, {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchClients = async (token) => {
  try {
    const response = await axios.get(API_BASE_URL + API_CLIENTS_PATH, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postShipment = async (shipment, token) => {
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

export const updateShipment = async (shipment, token) => {
  try {
    const response = await axios.put(
      API_BASE_URL + API_EDITE_SHIPMENT_PATH,
      {
        id: shipment._id,
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
export const deleteShipment = async (id, token) => {
  try {
    const response = await axios.delete(
      API_BASE_URL + API_DELETE_SHIPMENT,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          id: id,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
