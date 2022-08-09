import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const productsSlice = createSlice({
    name: "product",
    initialState: {
        currentProducts: [],
        currentProductDetails: [],
        userToken: "",
        currentUser: {},
        currentUserProducts: [],
    },
    reducers: {
        showAll: (state, action) => {
            state.currentProducts = action.payload;
        },
        showAllAsc: (state, action) => {
            state.currentProducts.push(action.payload)
        },
        showAllDesc: (state, action) => {
            state.currentProducts.push(action.payload)
        },
        showCurrentUserProducts: (state, action) => {
            state.currentUserProducts.push(state.currentUser.products)
        },
        showCurrentUserProducts: (state, action) => {
            state.currentUserProducts.push(state.currentUser.products)
        },
        showCurrentProductDetails: (state, action) => {
            state.currentProductDetails[0] = action.payload
        },
        getToken: (state, action) => {
            state.userToken = action.payload
        },
        getUserInfo: (state, action) => {
            state.currentUser = action.payload
        }
    }
});

export const showAllProducts = (data) => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:3001/display/allProducts");
        dispatch(showAll(response.data));
    } catch (err) {
        console.log(err);
    }
};

export const getCurrentProductDetail = (productId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/display/productById?id=${productId}`);
        console.log(response.data)
        dispatch(showCurrentProductDetails(response.data));
    } catch (err) {
        console.log(err);
    }
};

export const getCurrentUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/users/profileInfoToken?token=${userData}`);
        dispatch(getUserInfo(response.data));
    } catch (err) {
        console.log(err);
    }
};

export const getProductsSearched = (productName) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/display/allProducts?name=${productName}`);
        dispatch(showAll(response.data));
    } catch (err) {
        console.log(err);
    }
};


export const {
    showAll,
    showAllAsc,
    showAllDesc,
    getToken,
    getUserInfo,
    showCurrentUserProducts,
    showCurrentProductDetails,
} = productsSlice.actions
export const showProducts = (state) => state.product.currentProducts;
export const showUserData = (state) => state.product.currentUser;
export const userProducts = (state) => state.product.currentUserProducts;
export const productDetail = (state) => state.product.currentProductDetails;

export default productsSlice.reducer