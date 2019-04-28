import {
  GET_PROMO,
  GET_TYPECAR
} from './action-types';
const initialState = {
  isAuthenticated: false,
  user:{},
  promo:{}
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch(type) {
      case GET_PROMO:
        return getPromo(state,payload);
      case GET_TYPECAR:
        return getTypeCar(state,payload);
      default:
        return state;
    }
};

function getPromo(state,payload){
    return {...state,
        promo:response.data
    }
}

function getTypeCar(state,payload){
  return {...state,
    typecar:payload
  }
}

export default reducer;
  