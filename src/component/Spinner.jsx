import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Spinner.css"; // CSS 파일 임포트
import { MoonLoader } from "react-spinners";

export const Spinner = ({ message = "Loading..." }) => {
    return (
        <div className="spinner-overlay">
            <div className="spinner-container">
                <MoonLoader size={60} color="#8976fd" />
                {message && <p className="spinner-message">{message}</p>}
            </div>
        </div>
    );
};