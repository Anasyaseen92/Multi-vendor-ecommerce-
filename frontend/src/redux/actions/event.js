// src/redux/actions/event.js
import { server } from "../../../server";
import axios from "axios";

// CREATE EVENT
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreateRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );

    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
  }
};

// GET ALL EVENTS OF A SHOP
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsShopRequest" });

    const { data } = await axios.get(
      `${server}/event/get-all-events-shop/${id}`
    );

    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFail",
      payload: error.response?.data?.message || "Failed to fetch events",
    });
  }
};

// DELETE EVENT
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteEventRequest" });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true } // ✅ fixed typo
    );

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFail",
      payload: error.response?.data?.message || "Failed to delete event",
    });
  }
};
