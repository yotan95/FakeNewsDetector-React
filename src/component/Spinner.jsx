import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Spinner.css"; // CSS 파일 임포트
import { MoonLoader } from "react-spinners";
import { useState, useEffect } from 'react';
export const Spinner = ({ message = "Loading...", initialTime }) => {
    const [remainingTime, setRemainingTime] = useState(initialTime);

    useEffect(() => {
        if (!remainingTime) return;

        const interval = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTime]);

    // 초 단위를 `hh:mm:ss` 형식으로 변환하는 함수
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours > 0 ? hours + ":" : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };
    return (
        <div className="spinner-overlay">
            <div className="spinner-container">
                <MoonLoader size={60} color="#8976fd" />
                <p className="spinner-message">예상 시간: {formatTime(remainingTime)}</p>
            </div>
        </div>
    );
};