import { fetchUSer, fetchCart } from "~/data/fetchLocalStorage"

const userInfo = fetchUSer();
const cartInfo = fetchCart();

const initialState = {
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo,
    modifyItemsShow: false,
    searchResult: null,
    sortState: null,
}

export { initialState }