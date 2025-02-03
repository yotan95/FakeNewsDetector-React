import { useNavigate } from 'react-router-dom';
import { getAnalysis } from '../api/analysis.api';
import './Url.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function UrlPage() {
    const [url, setUrl] = useState('')
    const navigation = useNavigate();
    const handleSubmit = () => {
        const response = getAnalysis(url);
        response.then((res) => {
            if (res.data.status === 200) {
                navigation('/history');
            } else {
                toast.error(res.data.message);
            }
        })
    }

    return (
        <div className="url-rectangle-parent">
            <div className="url-group-child">
            </div>
            <div className="url-bg-parent">
                <div className="url-bg">
                </div>
                <div className="url-ui-element-4">
                    <div className="url-bg1">
                    </div>
                    <img className="url-avatar-icon" alt="" src="https://s3-alpha-sig.figma.com/img/c118/ce62/114b3744aca2d7c302fcb51fe1a671aa?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BUzge95IJ1a7nM4UIPgKeSss2ILcGSU0HvPCnawEd87YuWGpo7kqF-lBUzz2IOU~CupTv0h9uXsmUKroTwKga860N0EzBJTk613329h2bWuX6iY0zhdCA6SozmS2HLBG3ktwEdqPanNdZRabQwhFn1inWAKYKfPuBSUO6TdgCw~aAR6NcbAmC6BbLriPpmcZadsUvV6ZWgK92OxVdwdNoeBzyXAwK7Ck-ez-pimPds8QrixPCg~GulbN4mChQ6mO-y5EgMaqvpxLaHmxPe8ITEmx47VJW-5KNf0fJ93D1364AHCQZLqxXp8M~2p6aRs0RcPtJzPUxWXzQdRaKSGy1w__" />

                    <b className="url-heading">Anneta Wilson</b>
                    <div className="url-subheading">Product Manager</div>
                    <div className="url-text-mockup">
                    </div>
                    <div className="url-text-mockup1">
                    </div>
                </div>
                <div className="url-ui-element-3-wrapper">
                    <div className="url-ui-element-3">
                        <div className="url-bg2">
                        </div>
                        <img className="url-checkmark-icon" alt="" src="/Icon Border.png" />

                        <b className="url-headline"> Project Updated</b>
                        <div className="url-text-mockup2">
                        </div>
                        <div className="url-text-mockup3">
                        </div>
                    </div>
                </div>
                <div className="url-ui-element-5">
                    <div className="url-bg3">
                    </div>
                    <div className="url-fake-button">
                    </div>
                    <img className="url-checkmark-icon1" alt="" src="/Icon Border.png" />

                    <img className="url-checkmark-icon2" alt="" src="/Icon Border.png" />

                    <img className="url-checkmark-icon3" alt="" src="/Icon Border.png" />

                    <div className="url-text-mockup4">
                    </div>
                    <div className="url-text-mockup5">
                    </div>
                    <div className="url-text-mockup6">
                    </div>
                    <div className="url-text-mockup7">
                    </div>
                    <div className="url-text-mockup8">
                    </div>
                    <b className="url-subheader">Step one</b>
                    <b className="url-heading1">Project Overview</b>
                </div>
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
    );
}