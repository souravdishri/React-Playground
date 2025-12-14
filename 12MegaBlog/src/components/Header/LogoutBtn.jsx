//LogoutBtn.jsx

import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {
    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                // we are logging out from appwrite
                dispatch(logout()); // we are updating the redux store
            })
            .catch((error) => { //handling error if any
                console.error("Logout failed:", error);
            });
    };

    return (
        <button
            className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
