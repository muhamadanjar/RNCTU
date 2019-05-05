import {
  GET_PROMO,
  GET_TYPECAR,
  GET_RENT_PACKAGE,
  GET_SETTINGS,
  SELECTED_TYPE_CAR,
  SELECTED_RENT_PACKAGE
} from './action-types';
import update from 'react-addons-update'
const initialState = {
  isAuthenticated: false,
  user:{},
  promo:{},
  rp:{},
  selectedTypeCar:null,
  selectedRP:null
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch(type) {
      case GET_PROMO:
        return getPromo(state,payload);
      case GET_TYPECAR:
        return getTypeCar(state,payload);
      case GET_RENT_PACKAGE:
        return update(state,{
          rp:{
            $set:payload
          }
        })
      case SELECTED_TYPE_CAR:
        return update(state,{
          selectedTypeCar:{
            $set:payload
          }
        })
      case SELECTED_RENT_PACKAGE:
      return update(state,{
        selectedRP:{
          $set:payload
        }
      })
      default:
        return state;
    }
};

function getPromo(state,payload){
    return {...state,
        promo:payload
    }
}

function getTypeCar(state,payload){
  return {...state,
    typecar:payload
  }
}

export default reducer;
  