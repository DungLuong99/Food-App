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
    console.log("state", state);
    console.log("action", action);
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
            // let preCart = [...state.cartItems];
            // //mang [] ban dau
            // // console.log("preCart", preCart);
            // console.log("payload", action.payload);

            // const newCart = preCart.map(item => {
            //     //neu mang da co san pham thi` +1 so luong
            //     if (item?.id === action.payload.id) {
            //         return { ...item, quantity: item.quantity += 1 }

            //     } else {
            //         // neu chua co them san pham vao mang
            //         return item
            //     }
            // })
            // console.log("newCart", newCart);
            return {
                ...state,
                //set mang moi thay cho mang cu
                cartItems: [...state.cartItems, action.payload].map((item) =>
                    action.payload.id === item.id ? { item.quantity += 1, ...item } : ())
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
                sortState: action.sortState,
            };
        default:
            return state
    }
};

export { actionType };

export default reducer;