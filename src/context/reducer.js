const actionType = {
    SET_USER: 'SET_USER',
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_CART_ITEMS: 'SET_CART_ITEM',
    DELETE_ITEMS: ' DELETE_ITEMS',
    SET_MODIFY_ITEMS_SHOW: 'SET_MODIFY_ITEMS_SHOW',
    SET_SEARCH_RESULT: 'SET_SEARCH_RESULT',
    SET_SORT_STATE: 'SET_SORT_STATE',
    RESET_CART: 'RESET_CART',
    CHANGE_QUANTITY: 'CHANGE_QUANTITY',
};

const reducer = (state, action) => {
    // console.log("state", state);
    // console.log("action", action);
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionType.SET_FOOD_ITEMS:
            return {
                ...state,
                foodItems: action.foodItems,
            };
        case actionType.SET_CART_SHOW:
            return {
                ...state,
                cartShow: action.cartShow,
            };
        case actionType.SET_CART_ITEMS:
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.id === action.payload.id ?
                            { ...item, quantity: item.quantity + 1 }
                            : item)
                }
            }
            return {
                ...state,
                cartItems: [...state?.cartItems, action.payload]
            };
        case actionType.RESET_CART:
            return {
                ...state,
                cartItems: action.payload
            }
        case actionType.CHANGE_QUANTITY:
            return {
                ...state,
                cartItems: action.quantity
            }
        case actionType.DELETE_ITEMS:
            const newItems = [...state.foodItems];
            newItems.splice(action.payload, 1);
            return {
                ...state,
                foodItems: newItems
            };
        case actionType.SET_MODIFY_ITEMS_SHOW:
            return {
                ...state,
                modifyItemsShow: action.modifyItemsShow,
            };
        case actionType.SET_SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.searchResult,
            };
        case actionType.SET_SORT_STATE:
            return {
                ...state,
                sortState: action.sortState,
            };
        default:
            return state
    }
};

export { actionType };

export default reducer;