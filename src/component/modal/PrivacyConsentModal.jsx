import React from "react";
import Modal from "react-modal";
import './PrivacyConsentModal.css'
Modal.setAppElement("#root"); // 접근성 문제 해결을 위해 루트 요소 설정

const PrivacyConsentModal = ({ isOpen, onClose, onAgree }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="개인정보 수집 및 이용 동의"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <h2 className="modal-title">개인정보 수집 및 이용 동의</h2>
            <div className="modal-body">
                <p>
                    본 서비스 이용을 위해 개인정보를 제공해야 하며, 아래 내용을 확인 후 동의 여부를 결정해 주세요.
                </p>
                <h3>1. 개인정보 수집 및 이용 목적</h3>
                <ul>
                    <li>서비스 제공 및 운영 관리</li>
                    <li>회원가입 및 본인 확인</li>
                    <li>고객 문의 및 상담 대응</li>
                    <li>맞춤형 서비스 제공</li>
                    <li>법적 의무 준수</li>
                </ul>
                <h3>2. 수집하는 개인정보 항목</h3>
                <ul>
                    <li>필수: 성명, 연락처(이메일/전화번호), 생년월일, 주소</li>
                    <li>선택: 프로필 사진, 관심 분야, 기타 서비스 이용 정보</li>
                </ul>
                <h3>3. 개인정보 보유 및 이용 기간</h3>
                <p>
                    원칙적으로 개인정보 수집 및 이용 목적이 달성되면 지체 없이 파기됩니다.
                    단, 관련 법령에 따라 일정 기간 보관될 수 있습니다.
                </p>
                <h3>4. 동의를 거부할 권리 및 불이익 안내</h3>
                <p>
                    귀하는 개인정보 제공을 거부할 권리가 있으며, 다만 필수 항목 미동의 시 서비스 이용이 제한될 수 있습니다.
                </p>
            </div>
            <div className="modal-footer">
                <button className="modal-btn agree" onClick={onAgree}>
                    동의함
                </button>
                <button className="modal-btn decline" onClick={onClose}>
                    동의하지 않음
                </button>
            </div>
        </Modal>
    );
};

export default PrivacyConsentModal;
