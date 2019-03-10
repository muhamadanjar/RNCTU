import HTTP from '../../../utils/Http';
import {Dimensions} from 'react-native';
import {
    GET_INPUT,
    GET_CURRENT_LOCATION,
    TOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTIONS,
    GET_SELECTED_ADDRESS,
    GET_DISTANCE_MATRIX,
    GET_FARE,
    GET_MOBIL_AVAILABLE,
    GET_NEARBY_DRIVERS,
    BOOKING_CANCELED,
    BOOKING_CONFIRMED,
    BOOK_CAR,
    GET_SELECTED_CAR,
    GET_INTERVAL_BOOK
  } from './action-types';
const initialState = {region:{}, inputData:{},resultTypes:{},selectedAddress:{},mobilavailable:{}};
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA

const reducer = (state = initialState, { type, payload = null }) => {
    switch(type) {
      case GET_INPUT:
      //return { ...state, inputData:action.payload};
      const { key, value } = action.payload;
      return update(state, {
        inputData:{
          [key]:{
            $set:value
          }
        }
      });
    case GET_CURRENT_LOCATION:
      return update(state, {
        region:{
          latitude:{
            $set:action.payload.coords.latitude
          },
          longitude:{
            $set:action.payload.coords.longitude
          },
          latitudeDelta:{
            $set:LATITUDE_DELTA
          },
          longitudeDelta:{
            $set:LONGITUDE_DELTA
          }
        }
      })
    case TOGGLE_SEARCH_RESULT:
      if(action.payload === "pickUp"){
        return update(state, {
          resultTypes:{
            pickUp:{
              $set:true,
            },
            dropOff:{
              $set:false
            }
          },
          predictions:{
            $set:{}
          }
    
        });
      }
      if(action.payload === "dropOff"){
        return update(state, {
          resultTypes:{
            pickUp:{
              $set:false,
            },
            dropOff:{
              $set:true
            }
          },
          predictions:{
            $set:{}
          }
    
        });
      }
    case GET_ADDRESS_PREDICTIONS:
      return update(state, {
        predictions:{
          $set:action.payload
        }
      })
    case GET_SELECTED_ADDRESS:
      let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff"
      return update(state, {
        selectedAddress:{
          [selectedTitle]:{
            $set:action.payload
          }		
        },
        resultTypes:{
          pickUp:{
            $set:false
          },
          dropOff:{
            $set:false
          }
        }
      })
    case GET_DISTANCE_MATRIX:
      return update(state, {
        distanceMatrix:{
          $set:action.payload
        }
      })
    case GET_FARE:
      return update(state, {
        fare:{
          $set:action.payload
        }
      })
    case 'GET_FARE2':
      return update(state, {
        fare2:{
          $set:action.payload
        }
      })
    case GET_MOBIL_AVAILABLE:
      return update(state, {
        mobilavailable:{
          $set:action.payload
        }
      })
    case GET_SELECTED_CAR:
      return update(state, {
        selectedCar:{
          $set:action.payload
        },
        currentSewa:{
          $set:action.payload.id
        }
      })
    case BOOK_CAR:
      return update(state, {
        booking:{
          $set:action.payload
        }
      })
    case BOOKING_CANCELED:
      return update(state, {
        booking:{
          status:{
            $set:action.payload
          }
        }
      })
    case BOOKING_CONFIRMED:
      return update(state, {
        booking:{
          status:{
            $set:action.payload
          }
        }
      })
    case GET_INTERVAL_BOOK:
      return update(state, {
        intervalbook:{
          $set:action.payload
        }
      })
    case GET_NEARBY_DRIVERS:
      return update(state, {
        nearByDrivers:{
          $set:action.payload
        }
    });
      default:
        return state;
    }
};


export default reducer