import {NEW_QUERY_REQUEST,
NEW_QUERY_SUCCESS,
NEW_QUERY_FAIL,
ALL_QUERY_FAIL,
ALL_QUERY_REQUEST,
ALL_QUERY_SUCCESS,
DELETE_QUERY_REQUEST,
DELETE_QUERY_SUCCESS,
DELETE_QUERY_FAIL,
CLEAR_ERRORS
} from "../constants/contactConstant";
import axios from "axios";


export const createQuery = (queryData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_QUERY_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        `/api/v1/query/new`,
        queryData,
        config
      );
      
      dispatch({
        type: NEW_QUERY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_QUERY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getAllQueries = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_QUERY_REQUEST });
      const { data } = await axios.get("/api/v1/admin/queries");
  
      dispatch({
        type: ALL_QUERY_SUCCESS,
        payload: data.contacts,
      });
    } catch (error) {
      dispatch({
        type: ALL_QUERY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const deleteQuery = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_QUERY_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/delete/query/${id}`);
     
      dispatch({
        type: DELETE_QUERY_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_QUERY_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };