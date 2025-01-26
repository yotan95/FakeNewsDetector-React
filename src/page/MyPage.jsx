import { toast } from 'react-toastify';
import './MyPage.css';
import { useEffect, useState } from 'react';
import { getProfile } from '../api/member.api';
import { useNavigate } from 'react-router-dom';
export const MyPage = () => {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const response = getProfile();
        response.then((res) => {
            if (res.data.status === 200) {
                console.log(res.data.data);
                setProfile(res.data.data);
            } else {
                toast.error("조회 실패");
                navigate('/');
            }
        });
    }, []);

    return (
        <div className="mp-div">
            <img className="mp-rectangle" src="img/rectangle-6700.svg" />
            <div className="mp-frame">
                <div className="mp-frame-2">
                    <div className="mp-frame-3">
                        <div className="mp-profile-wrapper"><img className="mp-profile" src="/Profile.png" /></div>
                        <div className="mp-frame-4">
                            <div className="mp-text-wrapper">{profile.name}</div>
                            <div className="mp-text-wrapper-2">{profile.email}</div>
                        </div>
                    </div>
                    <div className="name-inputs">
                        <div className="form-group">
                            <label htmlFor="name">이름</label>
                            <input type="text" id="name" placeholder="이름을 입력해주세요." required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nickName">닉네임</label>
                            <input type="text" id="nickName" placeholder="닉네임을 입력해주세요." required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" required placeholder="이메일을 입력하세요" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">휴대전화 번호</label>
                        <div className="phone-wrapper">
                            <div className="country-selector">
                                <select id="country-code" required value={profile?.phone?.split(" ")[0]} >
                                    <option value="+82" data-flag="kr">🇰🇷 +82</option>
                                    <option value="+1" data-flag="us">🇺🇸 +1</option>
                                </select>

                                <input type="tel" id="phone" maxLength="13" required placeholder="010 0000 0000" value={profile?.phone?.split(" ")[1]} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mp-button-frame">
                    <div className="mp-group">
                        <div className="mp-overlap"><div className="mp-text-wrapper-7">비밀번호 변경</div></div>
                    </div>
                    <div className="mp-group">
                        <div className="mp-overlap"><div className="mp-text-wrapper-7">수정하기</div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}