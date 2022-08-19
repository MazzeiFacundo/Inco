import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const productsSlice = createSlice({
    name: "product",
    initialState: {
        currentProducts: [],
        currentProductDetails: [],
        productGallery: [],
        userToken: "",
        currentUser: {},
        currentUserById: {},
        currentUserProducts: [],
        typeOfDeals: [],
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
        showCurrentProductGallery: (state, action) => {
            state.productGallery = [action.payload]
        },
        getToken: (state, action) => {
            state.userToken = action.payload
        },
        getUserInfo: (state, action) => {
            state.currentUser = action.payload
        },
        getUserInfoById: (state, action) => {
            state.currentUserById = action.payload
        },
        getTypesOfDeals: (state, action) => {
            state.typeOfDeals = action.payload
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

export const getProductsGallery = (productId) => async (dispatch) => {
    try {
        console.log(productId)
        const response = await axios.get(`http://localhost:3001/display/getGalleryProduct?id=${productId}`);
        dispatch(showCurrentProductGallery(response.data));
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

export const getCurrentUserById = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/users/profileInfoById?id=${userId}`);
        dispatch(getUserInfoById(response.data));
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

export const getAllTypesOfDeals = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/display/allTypeOfDeals');
        dispatch(getTypesOfDeals(response.data));
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
    getUserInfoById,
    showCurrentUserProducts,
    showCurrentProductDetails,
    showCurrentProductGallery,
    getTypesOfDeals
} = productsSlice.actions
export const showProducts = (state) => state.product.currentProducts;
export const showProductGallery = (state) => state.product.productGallery;
export const showUserData = (state) => state.product.currentUser;
export const showUserDataById = (state) => state.product.currentUserById;
export const userProducts = (state) => state.product.currentUserProducts;
export const productDetail = (state) => state.product.currentProductDetails;
export const typeOfDeals = (state) => state.product.typeOfDeals;

export default productsSlice.reducer