import React from "react";
import Modal from "react-modal";
import './PrivacyConsentModal.css'
// Modal.setAppElement("#root"); // 접근성 문제 해결을 위해 루트 요소 설정

const TermsModal = ({ isOpen, onClose, onAgree }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="서비스 이용약관 동의"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <h2 className="modal-title">서비스 이용약관 동의</h2>
            <div className="modal-body">
                <p>
                    본 서비스를 이용하시기 전에 아래의 이용약관을 반드시 확인해 주세요.
                </p>
                <div className="terms-content">
                    <h3>1. 서비스 개요</h3>
                    <p>본 서비스는 사용자의 편의를 위해 다양한 기능을 제공합니다.</p>

                    <h3>2. 이용자의 의무</h3>
                    <ul>
                        <li>서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다.</li>
                        <li>타인의 권리를 침해하거나 불법적인 행위를 해서는 안 됩니다.</li>
                    </ul>

                    <h3>3. 서비스 제공 및 변경</h3>
                    <p>
                        본 서비스는 필요에 따라 일부 기능이 변경되거나 중단될 수 있습니다.
                    </p>

                    <h3>4. 책임 제한</h3>
                    <p>
                        서비스 이용으로 발생하는 문제에 대해 당사는 법적 책임을 지지 않습니다.
                    </p>
                </div>
                <p>
                    이용약관에 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.
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

export default TermsModal;
