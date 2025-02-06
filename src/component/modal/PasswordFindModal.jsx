import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./EmailFindModal.css"; // 스타일 적용
import { findMemberExist, setNewPassword } from "../../api/member.api";
import { toast } from "react-toastify";

Modal.setAppElement("#root"); // 접근성 문제 해결

export const PasswordFindModal = ({ isOpen, setIsOpen }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [foundEmail, setFoundEmail] = useState("");
    const [contryCode, setCountryCode] = useState('+82');
    const [phone, setPhone] = useState('');
    const [step, setStep] = useState(0);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const handleFindEmail = () => {
        const emailFindData = {
            email,
            name: name,
            phone: contryCode + ' ' + phone
        }
        console.log(emailFindData);
        // 이메일 찾기 로직 (여기서는 예제 데이터 사용)
        const response = findMemberExist(emailFindData);
        response.then((res) => {
            if (res.data.status === 200) {
                setStep(1);
                return;
            } else {
                toast.error(res.data.message);
                return;
            }
        })
    };
    const handleFindPassword = () => {
        if (!isPasswordMatch) {
            toast.error("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (!checkPasswordStrength(password)) {
            toast.error("비밀번호는 최소 8글자 이상이어야 하며, 특수문자가 포함되어야 합니다.");
            return;
        }

        const passwordFindData = {
            email,
            name: name,
            phone: contryCode + ' ' + phone,
            password,
            confirmPassword
        }
        console.log(passwordFindData);
        // 이메일 찾기 로직 (여기서는 예제 데이터 사용)
        const response = setNewPassword(passwordFindData);
        response.then((res) => {
            if (res.data.status === 200) {
                toast.success("변경 성공");
                handleClose();
                return;
            } else {
                toast.error(res.data.message);
                return
            }
        })
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

    const handleClose = () => {
        setIsOpen(false);
        setName("");
        setEmail("");
        setFoundEmail("");
        setCountryCode("+82");
        setPhone("");
    }
    const checkPasswordStrength = (password) => {
        const minLengthValid = password.length >= 8; // 최소 8글자 이상
        const specialCharValid = /[^a-zA-Z0-9]/.test(password); // 특수문자 포함 여부

        return minLengthValid && specialCharValid;
    };
    useEffect(() => {
        setIsPasswordMatch(password === confirmPassword);
    }, [password, confirmPassword]);
    const first = () => {
        return (
            <div>
                <h2>비밀번호 찾기</h2>
                <input
                    type="text"
                    placeholder="이메일 입력"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="사용자 이름 입력"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                />
                <div className="modal-form-group">
                    <div className="modal-phone-wrapper">
                        <div className="modal-country-selector">
                            <select id="country-code" required onChange={(e) => setCountryCode(e.target.value)}>
                                <option value="+82" data-flag="kr">🇰🇷 +82</option>
                                <option value="+1" data-flag="us">🇺🇸 +1</option>
                            </select>
                            <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} maxLength="13" required placeholder="010 0000 0000" />
                        </div>
                    </div>
                </div>
                <button onClick={handleFindEmail} className="btn-find">비밀번호 찾기</button>
                {foundEmail && <p className="result">{foundEmail}</p>}
                <button onClick={handleClose} className="btn-close">닫기</button>
            </div>
        )
    }
    const second = () => {
        return (
            <div>
                <h2>비밀번호 찾기</h2>
                <input
                    type="text"
                    placeholder="새로운 비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="새로운 비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                />
                {!isPasswordMatch && (<h4>비밀번호가 일치하지 않습니다.</h4>)}
                <button onClick={handleFindPassword} className="btn-find">비밀번호 찾기</button>
                <button onClick={handleClose} className="btn-close">닫기</button>
            </div>
        )
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal-content" overlayClassName="modal-overlay">
            {step == 0 && first()}
            {step == 1 && second()}
        </Modal >
    );
};