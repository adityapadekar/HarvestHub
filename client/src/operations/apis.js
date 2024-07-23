const BASE_URL = import.meta.env.VITE_API_URL;

// auth endpoints
export const AuthEndPoints = {
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/login`,
    VERIFY_EMAIL_API: `${BASE_URL}/auth/verify-email`,
    FORGOT_PASSWORD_API: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD_API: `${BASE_URL}/auth/reset-password`,
    UPDATE_PROFILE_API: `${BASE_URL}/auth/user`,
};

// Admin endpoints

export const AdminEndPoints = {
    GET_ALL_MODERATORS: `${BASE_URL}/admin/moderators`,
    ADD_PRODUCT_ADMIN: `${BASE_URL}/admin/product`,
    ADD_MARKET_ADMIN: `${BASE_URL}/admin/market`,
    ADD_MODERATOR_ADMIN: `${BASE_URL}/admin/moderator`,
    DELETE_MODERATOR_ADMIN: `${BASE_URL}/admin/market`,
    UPDATE_MODERATOR_ADMIN: `${BASE_URL}/admin/moderator-market-mapping`,// /moderator-market-mapping
};

// products
export const ProductsEndPoints = {
    GET_ALL_PRODUCTS: `${BASE_URL}/item/all`,   // this is for admin
};

// moderator
export const ModeratorEndPoints = {
    GET_ALL_MODERATORS: `${BASE_URL}/admin/moderators`,
    GET_MODERATOR_DATA: `${BASE_URL}/`,
};

//market
export const MarketEndPoints = {
    GET_ALL_MARKETS: `${BASE_URL}/market/all`,
};
