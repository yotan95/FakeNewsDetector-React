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
    const handleSubmit = () => {
        if (member === null) {
            toast.error('로그인 필요');
            navigation('/login');
            return
        }
        if (!url.trim()) return; // url이 빈 문자열 또는 공백만 있으면 요청하지 않음
        setIsLoading(true);
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

    return (
        <div className="url-container">
            <div className="url-rectangle-parent">
                <div className="url-img-frame">
                    <img className="url-img" src="/url.png" />
                </div>
                <div className="url-headline-parent">
                    <b className="url-headline1">가짜 뉴스 확인을 위해 신뢰할 수 있는 AI 알고리즘과 공신력 있는 뉴스 데이터를 활용합니다.</b>
                    <div className="url-email-text-input">
                        <input className="url-text-input" placeholder="URL을 입력해주세요." value={url} onChange={(e) => setUrl(e.target.value)} />
                        <div className="url-cta" onClick={handleSubmit}>
                            <div className="url-div">분석하기</div>
                        </div>
                    </div>
                    <div className="url-descripton">아래 입력란에 유튜브 동영상의 URL을 복사하여 붙여넣고 '분석하기' 버튼을 눌러주세요. 분석 결과는 콘텐츠 요약, 의심스러운 정보 여부, 관련 뉴스 기사 등의 형태로 제공됩니다</div>
                </div>
            </div>
            {isLoading && <Spinner />}
        </div>
    );
}