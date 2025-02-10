import { useNavigate } from 'react-router-dom';
import { getAnalysis } from '../api/analysis.api';
import './Url.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'
import { Spinner } from '../component/Spinner';
// 로그인 버튼 후후
export function UrlPage() {
    const [url, setUrl] = useState('')
    const { member } = useAuth();
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [estimatedTime, setEstimatedTime] = useState(null); // 초기 예상 시간 (초 단위)

    const handleSubmit = async () => {
        if (member === null) {
            toast.error('로그인 필요');
            navigation('/login');
            return
        }
        if (!url.trim()) return; // url이 빈 문자열 또는 공백만 있으면 요청하지 않음
        const youtubeId = extractYouTubeID(url);
        const estimatedSeconds = await getVideoDuration(youtubeId); // 예상 시간(초)
        setIsLoading(true);
        if (estimatedSeconds !== null) {
            setEstimatedTime(estimatedSeconds);
        }
        const response = getAnalysis(url);
        response.then((res) => {
            if (res.data.status === 200) {
                setIsLoading(false);
                navigation('/history');
            } else {
                setIsLoading(false);
                toast.error(res.data.message);
            }
        })
    }
    const API_KEY = "AIzaSyCfcL1x3RImKMX72FuP6tXm1bnGoN9PNtQ";

    const getVideoDuration = async (VIDEO_ID) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?id=${VIDEO_ID}&part=contentDetails&key=${API_KEY}`
            );
            const data = await response.json();

            if (data.items.length > 0) {
                const duration = data.items[0].contentDetails.duration;
                return parseYouTubeDuration(duration);
            } else {
                console.log("동영상을 찾을 수 없습니다.");
                return null;
            }
        } catch (error) {
            console.error("오류 발생:", error);
            return null;
        }
    };

    const parseYouTubeDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = parseInt((match[1] || "0H").replace("H", ""), 10) || 0;
        const minutes = parseInt((match[2] || "0M").replace("M", ""), 10) || 0;
        const seconds = parseInt((match[3] || "0S").replace("S", ""), 10) || 0;

        return Math.floor((hours * 3600 + minutes * 60 + seconds) / 2);
    };

    const extractYouTubeID = (url) => {
        const match = url.match(/[?&]v=([^&]+)/);
        return match ? match[1] : null;
    };
    return (
        <div className="url-container">
            <div className="url-rectangle-parent">
                <div className="url-img-frame">
                    <img className="url-img" src="/main.png" />
                </div>
                <div className="url-headline-parent">
                    <b className="url-headline1">가짜 뉴스 확인을 위해 신뢰할 수 있는<br></br>AI 알고리즘과 공신력 있는 뉴스 데이터를 활용합니다.</b>
                    <div className="url-email-text-input">
                        <input className="url-text-input" placeholder="URL을 입력해주세요." value={url} onChange={(e) => setUrl(e.target.value)} />
                        <div className="url-cta" onClick={handleSubmit}>
                            <div className="url-div">분석하기</div>
                        </div>
                    </div>
                    <div className="url-descripton">아래 입력란에 유튜브 동영상의 URL을 복사하여 붙여넣고 '분석하기' 버튼을 눌러주세요. 분석 결과는 콘텐츠 요약, 의심스러운 정보 여부, 관련 뉴스 기사 등의 형태로 제공됩니다</div>
                </div>
            </div>
            {isLoading && <Spinner message={message} initialTime={estimatedTime} />}
        </div>
    );
}