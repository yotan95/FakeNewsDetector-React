import React from 'react';
import { FaArrowUp } from 'react-icons/fa';  // 위쪽 화살표 아이콘
import './ScrollToTopButton.css';  // CSS 파일을 임포트

const ScrollToTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 부드럽게 스크롤
        });
    };

    return (
        <button onClick={scrollToTop} className="scroll-button">
            <FaArrowUp className="scroll-icon" />
        </button>
    );
};

export default ScrollToTopButton;
