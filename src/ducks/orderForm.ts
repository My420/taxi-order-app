import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import validateAddressInput from '../utils/validateAddress';

// constant

export const moduleName = 'ORDER_FORM';
export const INPUT_CHANGE = 'ORDER_FORM/INPUT/CHANGE';
export const LOCATION_LOAD_REQUEST = 'ORDER_FORM/LOCATION/LOAD_REQUEST';
export const LOCATION_LOAD_SUCCESS = 'ORDER_FORM/LOCATION/LOAD_SUCCESS';
export const LOCATION_LOAD_ERROR = 'ORDER_FORM/LOCATION/LOAD_ERROR';
export const CREW_LOAD_REQUEST = 'ORDER_FORM/CREW/LOAD_REQUEST';
export const CREW_LOAD_SUCCESS = 'ORDER_FORM/CREW/LOAD_SUCCESS';
export const CREW_LOAD_ERROR = 'ORDER_FORM/CREW/LOAD_ERROR';
export const ORDER_SEND_REQUEST = 'ORDER_FORM/ORDER/SEND_REQUEST';
export const ORDER_SEND_SUCCESS = 'ORDER_FORM/ORDER/SEND_SUCCESS';
export const ORDER_SEND_ERROR = 'ORDER_FORM/ORDER/SEND_ERROR';


// types

export interface ICrewInfo {
  'crew_id': number,
  'car_mark': string,
  'car_model': string,
  'car_color': string,
  'car_number': string,
  'driver_name': string,
  'driver_phone': string,
  'lat': number,
  'lon': number,
  'distance': number,
}

export type CrewList = ICrewInfo[];

export interface IOrderAddress {
  'address': string,
  'lat': number,
  'lon': number,
}

export interface IOrder {
  'source_time': string,
  'addresses': IOrderAddress[],
  'crew_id': number,
}

export interface ILocation {
  address: string,
  lat: number,
  loc: number,
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
  payload: {data: ILocation},
}

export interface ICrewLoadSuccessAction {
  type: typeof CREW_LOAD_SUCCESS,
  payload: {data: CrewList},
}

export interface ICrewLoadErrorAction {
  type: typeof CREW_LOAD_ERROR,
  payload: { error: string },
}

export interface IOrderSendRequestAction {
  type: typeof ORDER_SEND_REQUEST,
  payload: {data: IOrder},
}

export interface IOrderSendSuccessAction {
  type: typeof ORDER_SEND_SUCCESS,
  payload: null,
}

export interface IOrderSendErrorAction {
  type: typeof ORDER_SEND_ERROR,
  payload: { error: string },
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
    let: null | number,
    lon: null | number,
  },
  crew: {
    isLoading: boolean,
    error: string,
    list: CrewList| null,
    selected: string | null,
  },
  order: {
    isSending: boolean,
    isSuccess: boolean,
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
| IOrderSendErrorAction;

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

export const loadCrew = (data: ILocation): ICrewLoadRequestAction => ({
  type: CREW_LOAD_REQUEST,
  payload: { data },
});

export const loadCrewSuccess = (data: CrewList): ICrewLoadSuccessAction => ({
  type: CREW_LOAD_SUCCESS,
  payload: { data },
});

export const loadCrewError = (errorMsg: string): ICrewLoadErrorAction => ({
  type: CREW_LOAD_ERROR,
  payload: { error: errorMsg },
});

export const sendOrder = (data: IOrder): IOrderSendRequestAction => ({
  type: ORDER_SEND_REQUEST,
  payload: { data },
});

export const sendOrderSuccess = (): IOrderSendSuccessAction => ({
  type: ORDER_SEND_SUCCESS,
  payload: null,
});

export const sendOrderError = (errorMsg: string): IOrderSendErrorAction => ({
  type: ORDER_SEND_ERROR,
  payload: { error: errorMsg },
});


// async action creator

// eslint-disable-next-line arrow-body-style
export const getLocation = (): ThunkAction<Promise<void>, ReducerState, {}, ActionType> => {
  return async (dispatch: ThunkDispatch<{}, {}, ActionType>, getState) => {
    dispatch(loadLocation());
    const { value } = getState().input;
    console.log(value);
  };
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
    let: null,
    lon: null,
  },
  crew: {
    isLoading: false,
    error: '',
    list: [],
    selected: '',
  },
  order: {
    isSending: false,
    isSuccess: false,
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
      const newLocation = { ...state.location, isLoading: true, error: '' };
      return { ...state, location: newLocation };
    }
    default:
      return state;
  }
};

export default reducer;
