import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
export function Home() {
    const navigate = useNavigate();
    return (
        <div className="main-frame">
            <div className="main-img-frame">
                <img className="main-element" src="/main.png" />
            </div>
            <div className="main-group">
                <img className="main-img" src="/youtube.png" />
                <div className="main-div">
                    <div className="main-FAKE-NEWS-DETECTER">FAKE NEWS<br />DETECTER</div>
                    <p className="main-URL">유튜브 URL 입력만으로<br />가짜뉴스 및 허위정보를 담고 있는 영상인지 확인해보세요!</p>
                    <button className="main-button" onClick={() => navigate('/url')}><div className="main-text-wrapper">사용해보기</div></button>
                </div>
            </div>
        </div>
    );
}