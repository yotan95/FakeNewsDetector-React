import { Link } from 'react-router-dom';
import './Home.css';
export function Home() {
    return (
        <div className="home-overlap">
            <div className="home-group-2">
                <Link to="/url">
                    <button className="home-button">
                        <div className="home-text-wrapper-2">사용해보기</div>
                    </button>
                </Link>
                <div className="home-overlap-group">
                    <img className="home-element" src="https://c.animaapp.com/TFf1ian7/img/-----2025-01-20-211216-1.png" />
                    <p className="home-URL">유튜브 URL 입력만으로<br />가짜뉴스 및 허위정보를 담고 있는 영상인지 확인해보세요!</p>
                    <div className="home-FAKE-NEWS-DETECTER">FAKE NEWS<br />DETECTER</div>
                </div>
            </div>
            <img className="home-img" src="https://c.animaapp.com/TFf1ian7/img/-----2025-01-22-161402-1.png" />
            <img className="home-element-2" src="https://c.animaapp.com/TFf1ian7/img/-----2025-01-22-161343-1@2x.png" />
            <img className="home-element-3" src="https://c.animaapp.com/TFf1ian7/img/-----2025-01-22-161057-1@2x.png" />
            <img className="home-image" src="https://c.animaapp.com/TFf1ian7/img/image4@2x.png" />
            <img className="home-image-2" src="https://c.animaapp.com/TFf1ian7/img/image2@2x.png" />
            <img className="home-image-3" src="https://c.animaapp.com/TFf1ian7/img/image3.png" />
            <img className="home-element-4" src="https://c.animaapp.com/TFf1ian7/img/-----2025-01-22-161237-1@2x.png" />
        </div>
    );
}