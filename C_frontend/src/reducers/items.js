import { actionTypes } from "../actions/actionTypes";
import ItemSet from "../components/cafe/menu/ItemSet";


const initialState = {
    items: []
}

export function findID(state) {
    //pre = -1 is initialization.
    const maxId = state.reduce( (pre, pro2) => Math.max(pre, pro2.id), -1); 
    return maxId + 1
}

function buildOrderNo(items, currentID) {
    const needPaidOrder = items.filter(e => e.is_paid === false);
    const needPaidIds_min = needPaidOrder.reduce( (p, e) => p > e.id ? e.id : p, currentID);

    //check old order_no of all un_paid orders 
    const order_no = needPaidOrder.length > 0 ? 
        needPaidOrder[0].order_no 
        : "K0" + String(needPaidIds_min);

    return order_no;
    
}

const pattern = {
    id: 0,  //add more
    order_no: "",
    category: null,     //avalable
    type: null,         //avalable
    name: null,         //avalable
    
    extras: {},                 //add more
    sizes_prices: null,         //add more

    unit_price: null,   //avalable
    quantity: 1,        //avalable
    total_price: 1,     //avalable

    is_set: false,      //add more
    is_paid: false,     //add mor

}

export default function(state = initialState, action) {
    switch(action.type){
        case actionTypes.ITEM_SET:
            return {
                ...state,
                items: [
                    ...state.items, 
                    {...action.payload,
                        id: findID(state.items),
                        is_set: true,
                        is_paid: false                
                    }
                ]
            }  
            
        case actionTypes.ITEM_CANCELLED:
            return {
                ...state,
                items: state.items.filter( 
                    e => e.id !== action.payload 
                )
            }

        case actionTypes.ITEMS_PAID:
        case actionTypes.ORDER_SAVED:
            return {
                ...state,
                items: state.items.map( 
                    e => e.is_paid ? e : ({...e, is_paid : true}) 
                )
            }

        default:
            return state
    }
} 
