import HTTP from '../../../utils/Http'
import {GET_PROMO} from './action-types'
import {PROMO_GET} from '../../../utils/config'
export function getPromo(){
    return async (dispatch)=>{
        HTTP.get(PROMO_GET).then((res)=>{
            let response = res.data;
            return {...state,
                promo:response.data
            }
        }).catch((err)=>console.log(err));
    }
    
}