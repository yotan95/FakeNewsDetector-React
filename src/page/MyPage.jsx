import { toast } from 'react-toastify';
import './MyPage.css';
import { useEffect, useState } from 'react';
import { getProfile, putPassword, putProfile } from '../api/member.api';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';


export const MyPage = () => {
    const [profile, setProfile] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태
    // 국가 코드 및 전화번호 분리
    const countryCode = profile?.phone?.split(" ")[0] || "+82";
    const phoneNumber = profile?.phone?.split(" ")[1] || "";
    const navigate = useNavigate();

    // 모달 열기
    const openModal = (board) => {
        setModalIsOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalIsOpen(false);
    };
    // 비밀번호 유효성 검사 함수
    const checkPasswordStrength = (password) => {
        const minLengthValid = password.length >= 8; // 최소 8글자 이상
        const specialCharValid = /[^a-zA-Z0-9]/.test(password); // 특수문자 포함 여부

        return minLengthValid && specialCharValid;
    };
    const handlePasswpord = (e) => {
        e.preventDefault();
        // 폼 유효성 검사 추가 (비밀번호 확인, 동의 체크 등)
        if (!isPasswordMatch) {
            toast.error("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (!checkPasswordStrength(newPassword)) {
            toast.error("비밀번호는 최소 8글자 이상이어야 하며, 특수문자가 포함되어야 합니다.");
            return;
        }

        const passwordDate = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword, confirmPassword,
        }
        const response = putPassword(passwordDate);
        response.then((res) => {
            if (res.data.status === 200) {
                toast.success("비밀번호 변경 완료");
                closeModal();
            } else {
                toast.error(res.data.message);
            }
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };
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
    useEffect(() => {
        setIsPasswordMatch(newPassword === confirmPassword);
    }, [newPassword, confirmPassword]);
    // 국가 코드 변경 핸들러
    const handleCountryCodeChange = (e) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            phone: e.target.value + " " + phoneNumber,  // 새로운 국가 코드 적용
        }));
    };

    // 전화번호 변경 핸들러
    const handlePhoneNumberChange = (e) => {
        let input = handlePhoneChange(e)

        setProfile((prevProfile) => ({
            ...prevProfile,
            phone: countryCode + " " + input,  // 새로운 전화번호 적용
        }));
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
        return input;
    };
    const handleProfileChange = (e) => {
        e.preventDefault();
        const response = putProfile(profile);
        response.then((res) => {
            if (res.data.status === 200) {
                toast.success("프로필 수정 완료")
            } else {
                toast.error(res.data.message);
            }
        })
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            padding: '20px',
            width: '400px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        },
    };
    return (
        <div className="mp-div">
            <img className="mp-rectangle" src="img/rectangle-6700.svg" />
            <form className="mp-frame" onSubmit={(e) => handleProfileChange(e)}>
                <div className="mp-frame-2">
                    <div className="mp-frame-3">
                        <div className="mp-profile-wrapper"><img className="mp-profile" src="/Profile.png" /></div>
                        <div className="mp-frame-4">
                            <div className="mp-text-wrapper">{profile.name}</div>
                            <div className="mp-text-wrapper-2">{profile.email}</div>
                        </div>
                    </div>
                    <div className="mp-name-inputs">
                        <div className="mp-form-group">
                            <label htmlFor="name">이름</label>
                            <input type="text" id="name" placeholder="이름을 입력해주세요." required disabled value={profile.name} />
                        </div>

                        <div className="mp-form-group">
                            <label htmlFor="nickName">닉네임</label>
                            <input type="text" name="nickName" id="nickName" placeholder="닉네임을 입력해주세요." required value={profile.nickName} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className="mp-form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" required placeholder="이메일을 입력하세요" value={profile.email} disabled />
                    </div>
                    <div className="mp-form-group">
                        <label htmlFor="phone">휴대전화 번호</label>
                        <div className="phone-wrapper">
                            <div className="country-selector">
                                <select id="country-code" required value={countryCode} onChange={(e) => handleCountryCodeChange(e)}>
                                    <option value="+82" data-flag="kr">🇰🇷 +82</option>
                                    <option value="+1" data-flag="us">🇺🇸 +1</option>
                                </select>

                                <input type="tel" id="phone" maxLength="13" required placeholder="010 0000 0000" value={phoneNumber} onChange={(e) => handlePhoneNumberChange(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mp-button-frame">
                    <div className="mp-group" onClick={openModal}>
                        <div className="mp-overlap"><div className="mp-text-wrapper-7">비밀번호 변경</div></div>
                    </div>
                    <div className="mp-group">
                        <button className="mp-overlap"><div className="mp-text-wrapper-7">수정하기</div></button>
                    </div>
                </div>
            </form>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal} className="modal-close-button">×</button>
                <div className="modal-title">비밀번호 변경</div>

                <form className="modal-form" onSubmit={(e) => handlePasswpord(e)}>
                    <input
                        type="password"
                        className="modal-input"
                        placeholder="기존 비밀번호 입력"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="modal-input"
                        placeholder="새로운운 비밀번호 입력"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="modal-input"
                        placeholder="새로운 비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {!isPasswordMatch && (
                        <label className="form-label">비밀번호가 일치하지 않습니다.</label>
                    )}
                    <button type="submit" className="modal-submit-button">
                        제출
                    </button>
                </form>
            </Modal>
        </div>
    )
}