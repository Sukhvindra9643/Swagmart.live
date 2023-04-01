import {NEW_QUERY_REQUEST,
    NEW_QUERY_SUCCESS,
    NEW_QUERY_FAIL,
    ALL_QUERY_FAIL,
    ALL_QUERY_REQUEST,
    ALL_QUERY_SUCCESS,
    DELETE_QUERY_REQUEST,
    DELETE_QUERY_SUCCESS,
    DELETE_QUERY_FAIL,
    DELETE_QUERY_RESET,
    CLEAR_ERRORS
    } from "../constants/contactConstant";
export const newQueryReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_QUERY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_QUERY_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_QUERY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const getContactQueryReducer = (state = { QUERY: [] }, action) => {
    switch (action.type) {
      case ALL_QUERY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_QUERY_SUCCESS:
        return {
          loading: false,
          contacts: action.payload,
        };
      case ALL_QUERY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const deleteQueryReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_QUERY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_QUERY_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
        case DELETE_QUERY_RESET:
          return {
            ...state,
            isDeleted: false,
          };
      case DELETE_QUERY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };