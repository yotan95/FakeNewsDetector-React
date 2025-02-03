import { toast } from 'react-toastify';
import { signupApi } from '../api/member.api';
import './Signup.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [countryCode, setCountryCode] = useState('+82');
    const [svcAgmt, setSvcAgmt] = useState(false);
    const [infoAgmt, setInfoAgmt] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태
    const navigate = useNavigate();
    // 비밀번호 유효성 검사 함수
    const checkPasswordStrength = (password) => {
        const minLengthValid = password.length >= 8; // 최소 8글자 이상
        const specialCharValid = /[^a-zA-Z0-9]/.test(password); // 특수문자 포함 여부

        return minLengthValid && specialCharValid;
    };

    const handlePhoneChange = (e) => {
        e.preventDefault();
        // 입력된 값을 가져옴
        let input = e.target.value;

        // 숫자만 남기고 모두 제거
        input = input.replace(/[^\d]/g, '');

        // 전화번호 포맷: 000-0000-0000
        if (input.length <= 3) {
            input = input.replace(/(\d{0,3})/, '$1');
        } else if (input.length <= 7) {
            input = input.replace(/(\d{3})(\d{0,4})/, '$1-$2');
        } else {
            input = input.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
        }

        // 상태 업데이트
        setPhone(input);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // 폼 유효성 검사 추가 (비밀번호 확인, 동의 체크 등)
        if (!isPasswordMatch) {
            toast.error("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (!checkPasswordStrength(password)) {
            toast.error("비밀번호는 최소 8글자 이상이어야 하며, 특수문자가 포함되어야 합니다.");
            return;
        }
        if (!svcAgmt || !infoAgmt) {
            toast.error("모든 동의 항목에 체크해야 합니다.");
            return;
        }
        if (email.toLowerCase().includes("admin")) {
            toast.error("사용할 수 없는 이메일입니다.")
        }

        // 요청 보낼 데이터 객체 생성
        const userData = {
            email,
            password,
            phone: `${countryCode} ${phone}`,
            name,
            nickName,
            svcAgmt,
            infoAgmt,
        };

        const response = signupApi(userData);
        response.then((res) => {
            if (res.data.status === 200) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        });
    };
    useEffect(() => {
        setIsPasswordMatch(password === confirmPassword);
    }, [password, confirmPassword]);
    return (
        <div className="signup-overlap">
            <img className="signup-img" src="https://c.animaapp.com/TFf1ian7/img/-----2025-01-22-161402-1.png" />
            <img className="signup-element-2" src="https://c.animaapp.com/TFf1ian7/img/-----2025-01-22-161343-1@2x.png" />
            <img className="signup-element-3" src="https://c.animaapp.com/TFf1ian7/img/-----2025-01-22-161057-1@2x.png" />
            <img className="signup-image" src="https://c.animaapp.com/TFf1ian7/img/image4@2x.png" />
            <img className="signup-image-2" src="https://c.animaapp.com/TFf1ian7/img/image2@2x.png" />
            <img className="signup-image-3" src="https://c.animaapp.com/TFf1ian7/img/image3.png" />
            <img className="signup-element-4" src="https://c.animaapp.com/TFf1ian7/img/-----2025-01-22-161237-1@2x.png" />
            <div className="signup-signup-container">
                <h1 className="signup-signup-title">회원가입</h1>
                <form className="signup-signup-form" onSubmit={handleFormSubmit}>
                    <div className="signup-form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="이메일을 입력하세요" />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="비밀번호를 입력하세요" />
                    </div>
                    <label className="signup-form-label">비밀번호는 최소 8글자 이상이여야 합니다.</label>
                    <label className="signup-form-label">비밀번호에는 최소 하나 이상의 특수문자가 포함되어있어야합니다<div className="signup-"></div></label>
                    <div className="signup-form-group">
                        <label htmlFor="confirmPassword">비밀번호 확인</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="비밀번호를 다시 입력하세요" />
                    </div>
                    {!isPasswordMatch && (
                        <label className="signup-form-label">비밀번호가 일치하지 않습니다.</label>
                    )}
                    <div className="signup-form-group">
                        <label htmlFor="phone">휴대전화 번호</label>
                        <div className="signup-phone-wrapper">
                            <div className="signup-country-selector">
                                <select id="country-code" required onChange={(e) => setCountryCode(e.target.value)}>
                                    <option value="+82" data-flag="kr">🇰🇷 +82</option>
                                    <option value="+1" data-flag="us">🇺🇸 +1</option>
                                </select>
                                <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} maxLength="13" required placeholder="010 0000 0000" />
                            </div>
                        </div>
                    </div>
                    <div className="signup-name-inputs">
                        <div className="signup-form-group">
                            <label htmlFor="name">이름</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력해주세요." required />
                        </div>

                        <div className="signup-form-group">
                            <label htmlFor="nickName">닉네임</label>
                            <input type="text" id="nickName" value={nickName} onChange={(e) => setNickName(e.target.value)} placeholder="닉네임을 입력해주세요." required />
                        </div>
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="svcAgmt">
                            <input type="checkbox" value={svcAgmt} onChange={(e) => setSvcAgmt(e.target.checked)} id="svcAgmt" required />
                            개인정보 수집 및 이용에 동의 하십니까?
                        </label>
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="infoAgmt">
                            <input type="checkbox" value={infoAgmt} onChange={(e) => setInfoAgmt(e.target.checked)} id="infoAgmt" required />
                            서비스 이용약관에 동의 하십니까?
                        </label>
                    </div>
                    <button className="signup-signup-button">회원가입</button>
                </form>
            </div>
        </div>
    );
}
