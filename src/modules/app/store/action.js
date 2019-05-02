import HTTP from '../../../utils/Http'
import {GET_PROMO,GET_TYPECAR,SELECTED_TYPE_CAR,GET_RENT_PACKAGE,SELECTED_RENT_PACKAGE} from './action-types'
import {PROMO_GET,TYPECAR_GET,RENT_GET} from '../../../utils/config'
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
export function _selectedTypeCar(type){
    return dispatch =>{
        dispatch({type:SELECTED_TYPE_CAR,type})
    }
}
export function selectedRp(rp){
    return dispatch =>{
        dispatch({type:SELECTED_RENT_PACKAGE,payload:rp})
    }
}

export function getRentPackage(a){
    return async (dispatch,getState) =>{
        let rstate = getState();
        try {
            let res = await HTTP.get(`${RENT_GET}/${a}`);
            let response =  res.data;
            if (response.status) {
                dispatch({type:GET_RENT_PACKAGE,payload:response.data});    
            }
            
        } catch (error) {
            dispatch({type:'ERROR_MESSAGE',error});
        }
    }

}

