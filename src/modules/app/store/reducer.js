import {
  GET_PROMO
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
      default:
        return state;
    }
};

function getPromo(state,payload){
    return {...state,
        promo:response.data
    }

}

export default reducer;
  