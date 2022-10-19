const actionType = {
    SET_USER: 'SET_USER',
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_CART_ITEMS: 'SET_CART_ITEM',
    DELETE_ITEMS: ' DELETE_ITEMS',
    SET_MODIFY_ITEMS_SHOW: 'SET_MODIFY_ITEMS_SHOW',
    SET_SEARCH_RESULT: 'SET_SEARCH_RESULT',
    SET_SORT_STATE: 'SET_SORT_STATE'
};

const reducer = (state, action) => {
    console.log(state, action);
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
            return {
                ...state,
                cartItems: action.cartItems,
            };
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
                sortResult: action.sortResult,
            };
        default:
            return state
    }
};

export { actionType };

export default reducer;