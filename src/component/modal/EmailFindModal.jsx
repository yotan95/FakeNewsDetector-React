import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./EmailFindModal.css"; // 스타일 적용
import { findMemberEmail } from "../../api/member.api";

Modal.setAppElement("#root"); // 접근성 문제 해결

export const EmailFindModal = ({ isOpen, setIsOpen }) => {
    const [name, setName] = useState("");
    const [foundEmail, setFoundEmail] = useState("");
    const [contryCode, setCountryCode] = useState('+82');
    const [phone, setPhone] = useState('');
    const handleFindEmail = () => {
        const emailFindData = {
            name,
            phone: contryCode + ' ' + phone
        }
        console.log(emailFindData);

        const response = findMemberEmail(emailFindData);
        response.then((res) => {
            if (res.data.status === 200) {
                setFoundEmail(res.data.data);
            } else {
                setFoundEmail("해당 사용자의 이메일을 찾을 수 없습니다.");
            }
        });
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
        setFoundEmail("");
        setCountryCode("+82");
        setPhone("");
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal-content" overlayClassName="modal-overlay">
            <h2>이메일 찾기</h2>
            <input
                type="text"
                placeholder="사용자 이름 입력"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
            />
            <div className="modal-form-group">
                {/* <label>휴대전화 번호</label> */}
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
            <button onClick={handleFindEmail} className="btn-find">이메일 찾기</button>
            {foundEmail && <p className="result">{foundEmail}</p>}
            <button onClick={handleClose} className="btn-close">닫기</button>
        </Modal >
    );
};