import { useNavigate } from 'react-router-dom'
import './AboutMain.css'
import ScrollIndicator from './ScrollIndicator';
import { FaArrowLeft } from 'react-icons/fa';  // 내려가는 화살표 아이콘과 뒤로 가기 아이콘
import ScrollToTopButton from './ScrollToTopButton';
import { useEffect } from 'react';


export function AboutMain() {
    const navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate(-1)} className='about-main-back-button'>
                <FaArrowLeft className='backIcon' /> Back
            </button>
            {/* <div className='about-main'> */}
            {/* <img className='about-main-img' src="/about-main.webp"></img> */}
            {/* <img className='about-main-img' src="/Designer.jpeg" /> */}
            {/* </div> */}
            <div className='about-main-frame'>
                <div className='about-main-frame-1'>
                    {/* <h1>text1</h1>
                    <img src='/aalogo.png' />
                    <h1>text2</h1> */}
                </div>
                {/* <div>
                    <button className='about-main-button'>Home</button>
                </div> */}
            </div>
            <ScrollIndicator />
            <div className="about-content-container">
                {/* <img className="about-content-img" src='/jelly_aboutpage_01.png' /> */}
                <img className='about-content-img' src="/about-content.png"></img>
                {/* <img className='about-content-img' src="/Frame (2).png"></img> */}
                {/* <img className='about-content-img' src="/about-3.png"></img> */}

            </div >
            <ScrollToTopButton />
        </>
    )
}