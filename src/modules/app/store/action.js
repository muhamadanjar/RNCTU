import HTTP from '../../../utils/Http'
import {GET_PROMO,GET_TYPECAR} from './action-types'
import {PROMO_GET,TYPECAR_GET} from '../../../utils/config'
export function getPromo(){
    return async (dispatch)=>{
        HTTP.get(PROMO_GET).then((res)=>{
            let response = res.data;
            dispatch ({ 
                type:GET_PROMO,
                payload:response.data
            })
            
        }).catch((err)=>console.log(err));
    }
}
export function getTypeCar(){
    return async (dispatch)=>{
        
        
        HTTP.get(TYPECAR_GET).then((res)=>{
            let response = res.data;
            console.log(response);
            
            dispatch({
                type:GET_TYPECAR,
                payload:response.data
            })
        }).catch((err)=>dispatch({type:'ERROR_MESSAGE',err}));
    }
}

