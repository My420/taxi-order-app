import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import validateAddressInput from '../utils/validateAddress';
import mapService from '../services/map';
import { findCrew } from '../services/crew';
import { findOrder } from '../services/order';

// constant

export const moduleName = 'ORDER_FORM';
export const INPUT_CHANGE = 'ORDER_FORM/INPUT/CHANGE';
export const LOCATION_LOAD_REQUEST = 'ORDER_FORM/LOCATION/LOAD_REQUEST';
export const LOCATION_LOAD_SUCCESS = 'ORDER_FORM/LOCATION/LOAD_SUCCESS';
export const LOCATION_LOAD_ERROR = 'ORDER_FORM/LOCATION/LOAD_ERROR';
export const CREW_LOAD_REQUEST = 'ORDER_FORM/CREW/LOAD_REQUEST';
export const CREW_LOAD_SUCCESS = 'ORDER_FORM/CREW/LOAD_SUCCESS';
export const CREW_LOAD_ERROR = 'ORDER_FORM/CREW/LOAD_ERROR';
export const CREW_CLEAR = 'ORDER_FORM/CREW/CLEAR';
export const ORDER_SEND_REQUEST = 'ORDER_FORM/ORDER/SEND_REQUEST';
export const ORDER_SEND_SUCCESS = 'ORDER_FORM/ORDER/SEND_SUCCESS';
export const ORDER_SEND_ERROR = 'ORDER_FORM/ORDER/SEND_ERROR';
export const ORDER_CLEAR = 'ORDER_FORM/ORDER/CLEAR';


// types

export interface ICrewInfo {
  crew_id: number,
  car_mark: string,
  car_model: string,
  car_color: string,
  car_number: string,
  driver_name: string,
  driver_phone: string,
  lat: number,
  lon: number,
  distance: number
}

export type CrewList = ICrewInfo[];
export interface ICrewData { data: ICrewInfo[] }

export interface IOrder {
  source_time: string,
  addresses: ILocation[],
  crew_id: number,
}

export interface ILocation {
  address: string,
  lat: number,
  lon: number,
}

export interface ILocationError {
  error: string,
  lat?: number,
  lon?: number,
}

export interface IChangeInputAction {
  type: typeof INPUT_CHANGE,
  payload: {data: string}
}

export interface ILocationLoadRequestAction {
  type: typeof LOCATION_LOAD_REQUEST,
  payload: null,
}

export interface ILocationLoadSuccessAction {
  type: typeof LOCATION_LOAD_SUCCESS,
  payload: {data: ILocation},
}

export interface ILocationLoadErrorAction {
  type: typeof LOCATION_LOAD_ERROR,
  payload: {error: string},
}

export interface ICrewLoadRequestAction {
  type: typeof CREW_LOAD_REQUEST,
  payload: null,
}
export interface ICrewLoadSuccessAction {
  type: typeof CREW_LOAD_SUCCESS,
  payload: ICrewData,
}

export interface ICrewLoadErrorAction {
  type: typeof CREW_LOAD_ERROR,
  payload: { error: string },
}

export interface ICrewClearAction {
  type: typeof CREW_CLEAR,
  payload: null,
}

export interface IOrderSendRequestAction {
  type: typeof ORDER_SEND_REQUEST,
  payload: null,
}

export interface IOrderSendSuccessAction {
  type: typeof ORDER_SEND_SUCCESS,
  payload: {id: number},
}

export interface IOrderSendErrorAction {
  type: typeof ORDER_SEND_ERROR,
  payload: { error: string },
}

export interface IOrderClearAction {
  type: typeof ORDER_CLEAR,
  payload: null,
}

export interface ReducerState {
  input: {
    isValid: boolean,
    value: string,
    error: string,
  },
  location: {
    isLoading: boolean,
    isValid: boolean,
    error: string,
    address: string,
    lat: null | number,
    lon: null | number,
  },
  crew: {
    isLoading: boolean,
    error: string,
    list: CrewList| null,
    selected: number | null,
  },
  order: {
    isSending: boolean,
    isSuccess: boolean,
    error: string,
    orderID: number | null,
  }
}

export type ActionType = IChangeInputAction
| ILocationLoadRequestAction
| ILocationLoadSuccessAction
| ILocationLoadErrorAction
| ICrewLoadRequestAction
| ICrewLoadSuccessAction
| ICrewLoadErrorAction
| IOrderSendRequestAction
| IOrderSendSuccessAction
| IOrderSendErrorAction
| ICrewClearAction
| IOrderClearAction;

// action creator

export const changeInput = (value: string): IChangeInputAction => ({
  type: INPUT_CHANGE,
  payload: { data: value },
});

export const loadLocation = (): ILocationLoadRequestAction => ({
  type: LOCATION_LOAD_REQUEST,
  payload: null,
});


export const loadLocationSuccess = (data: ILocation): ILocationLoadSuccessAction => ({
  type: LOCATION_LOAD_SUCCESS,
  payload: { data },
});

export const loadLocationError = (errorMsg: string): ILocationLoadErrorAction => ({
  type: LOCATION_LOAD_ERROR,
  payload: { error: errorMsg },
});

export const loadCrew = (): ICrewLoadRequestAction => ({
  type: CREW_LOAD_REQUEST,
  payload: null,
});

export const loadCrewSuccess = (data: ICrewData): ICrewLoadSuccessAction => ({
  type: CREW_LOAD_SUCCESS,
  payload: data,
});

export const loadCrewError = (errorMsg: string): ICrewLoadErrorAction => ({
  type: CREW_LOAD_ERROR,
  payload: { error: errorMsg },
});

export const clearCrew = (): ICrewClearAction => ({
  type: CREW_CLEAR,
  payload: null,
});

export const sendOrder = (): IOrderSendRequestAction => ({
  type: ORDER_SEND_REQUEST,
  payload: null,
});

export const sendOrderSuccess = (id: number): IOrderSendSuccessAction => ({
  type: ORDER_SEND_SUCCESS,
  payload: { id },
});

export const sendOrderError = (errorMsg: string): IOrderSendErrorAction => ({
  type: ORDER_SEND_ERROR,
  payload: { error: errorMsg },
});

export const clearOrder = (): IOrderClearAction => ({
  type: ORDER_CLEAR,
  payload: null,
});

// utils

const sortCrews = (crews: CrewList): CrewList => crews.sort((a, b) => {
  if (a.distance > b.distance) return 1;
  if (a.distance < b.distance) return -1;
  return 0;
});


// async action creator
export const getCrewInfo = (data: ILocation): ThunkAction<Promise<void>,
ReducerState, {}, ActionType> => async (dispatch: ThunkDispatch<{}, {}, ActionType>) => {
  dispatch(loadCrew());
  const crewsData = await findCrew(data);
  if ('data' in crewsData) {
    dispatch(loadCrewSuccess(crewsData));
    mapService.displayCabLocation([...crewsData.data]);
  } else {
    dispatch(loadCrewError(crewsData.error));
    mapService.deleteCabFromMap();
  }
};

// eslint-disable-next-line arrow-body-style
export const getLocationByAddress = (): ThunkAction<Promise<void>,
ReducerState,
{},
ActionType> => async (dispatch: ThunkDispatch<ReducerState, {}, ActionType>, getState) => {
  dispatch(loadLocation());
  dispatch(clearCrew());
  const { value } = getState().input;
  const data = await mapService.getCoordinate(value);
  if ('address' in data) {
    dispatch(loadLocationSuccess(data));
    dispatch(getCrewInfo(data));
  } else {
    dispatch(loadLocationError(data.error));
    mapService.deleteCabFromMap();
  }
};

export const setLocationFromCoords = (data: ILocation | ILocationError): ThunkAction<Promise<void>,
ReducerState, {}, ActionType> => async (dispatch: ThunkDispatch<ReducerState, {}, ActionType>) => {
  dispatch(loadLocation());
  dispatch(clearCrew());
  if ('error' in data) {
    const { error } = data;
    dispatch(loadLocationError(error));
    mapService.deleteCabFromMap();
  } else {
    dispatch(loadLocationSuccess(data));
    dispatch(getCrewInfo(data));
  }
};

export const sendUserOrder = (): ThunkAction<Promise<void>,
ReducerState,
{},
ActionType> => async (dispatch: ThunkDispatch<ReducerState, {}, ActionType>, getState) => {
  const { input: { value }, location, crew: { selected } } = getState();
  const { address, lat, lon } = location;
  dispatch(sendOrder());
  if (value === address && lat && lon && selected) {
    const orderData = await findOrder({ address, lat, lon }, selected);
    if ('orderID' in orderData) {
      dispatch(sendOrderSuccess(orderData.orderID));
    } else {
      dispatch(sendOrderError(orderData.error));
    }
  } else {
    dispatch(sendOrderError('Адрес в поле ввода не совпадает с меткой на карте.'));
  }
};

// reducer
export const initialState: ReducerState = {
  input: {
    isValid: false,
    value: '',
    error: '',
  },
  location: {
    isLoading: false,
    isValid: false,
    error: '',
    address: '',
    lat: null,
    lon: null,
  },
  crew: {
    isLoading: false,
    error: '',
    list: [],
    selected: null,
  },
  order: {
    isSending: false,
    error: '',
    isSuccess: false,
    orderID: null,
  },
};

const reducer = (state: ReducerState = initialState, action: ActionType) => {
  switch (action.type) {
    case INPUT_CHANGE: {
      const { payload } = action;
      const { data: value } = payload;
      const status = validateAddressInput(value);
      return { ...state, input: { ...status, value } };
    }
    case LOCATION_LOAD_REQUEST: {
      const newLocation = {
        ...state.location,
        isLoading: true,
        error: '',
        isValid: false,
        address: '',
        lat: null,
        lon: null,
      };
      return { ...state, location: newLocation };
    }
    case LOCATION_LOAD_SUCCESS: {
      const { data } = action.payload;
      const newLocation = {
        ...state.location, ...data, isLoading: false, isValid: true,
      };
      const newInput = {
        ...state.input, isValid: true, error: '', value: data.address,
      };
      return { ...state, location: newLocation, input: newInput };
    }
    case LOCATION_LOAD_ERROR: {
      const { error } = action.payload;
      const newLocation = {
        ...state.location,
        isLoading: false,
        error,
      };
      return { ...state, location: newLocation };
    }
    case CREW_LOAD_REQUEST: {
      const newCrew = {
        ...state.crew,
        isLoading: true,
        error: '',
        list: [],
        selected: null,
      };
      return { ...state, crew: newCrew };
    }
    case CREW_LOAD_SUCCESS: {
      const { data } = action.payload;
      sortCrews(data);
      const newCrew = {
        ...state.crew, isLoading: false, list: [...data], selected: data[0].crew_id,
      };
      return { ...state, crew: newCrew };
    }
    case CREW_LOAD_ERROR: {
      const { error } = action.payload;
      const newCrew = { ...state.crew, isLoading: false, error };
      return { ...state, crew: newCrew };
    }

    case CREW_CLEAR: {
      const newCrew = {
        ...state.crew,
        isLoading: false,
        error: '',
        list: [],
        selected: null,
      };
      return { ...state, crew: newCrew };
    }

    case ORDER_SEND_REQUEST: {
      const newOrder = {
        ...state.order,
        isSending: true,
        error: '',
        isSuccess: false,
        orderID: null,
      };
      return { ...state, order: newOrder };
    }

    case ORDER_SEND_SUCCESS: {
      const newOrder = {
        ...state.order,
        isSending: false,
        isSuccess: true,
        orderID: action.payload.id,
      };
      return { ...state, order: newOrder };
    }

    case ORDER_SEND_ERROR: {
      const newOrder = {
        ...state.order,
        isSending: false,
        error: action.payload.error,
      };
      return { ...state, order: newOrder };
    }

    case ORDER_CLEAR: {
      const newOrder = {
        ...state.order,
        isSending: false,
        error: '',
        isSuccess: false,
        orderID: null,
      };
      return { ...state, order: newOrder };
    }

    default:
      return state;
  }
};

export default reducer;
