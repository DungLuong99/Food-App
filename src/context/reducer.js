const actionType = {
    SET_USER: 'SET_USER',
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_CART_ITEMS: 'SET_CART_ITEM',
    DELETE_ITEMS: ' DELETE_ITEMS',
};

const reducer = (state, action) => {
    console.log(state);
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
            const currentItems = [...state.foodItems];
            console.log(currentItems);

            const newItems = currentItems.splice(action.payload, 1)
            return {
                ...state.foodItems,
                foodItems: newItems,
            };
        default:
            return state
    }
};

export { actionType };

export default reducer;