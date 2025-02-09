import React, { useEffect, useState } from 'react';
import { getProfile, putPassword, putProfile } from '../api/member.api';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './MyPage2.css';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

export const MyPage2 = () => {
  const [activeMenu, setActiveMenu] = useState('usage');
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

  const siteInfo = {
    siteName: '사용자 지정 그룹명명',
    siteUrl: '회사 도메임 default 공백',
    domainName: '그룹 인원수',
    totalPages: '17 개 / 18 개',
    registeredDate: '2023-08-08(화) 10:57',
    siteId: '30',
    activatedPages: '17'
  };

  const dailyData = [
    { time: '12', normal: 1, spam: 0 },
    { time: '15', normal: 5, spam: 1 },
    { time: '18', normal: 1, spam: 0 },
    { time: '21', normal: 2, spam: 0 },
    { time: '00', normal: 0, spam: 0 },
    { time: '03', normal: 0, spam: 0 },
    { time: '06', normal: 1, spam: 0 },
    { time: '09', normal: 7, spam: 1 },
    { time: '12', normal: 1, spam: 0 }
  ];

  return (
    <div className="page-container">
      {/* 사이드바 */}
      <div className="sidebar">
        <div
          className={`menu-item ${activeMenu === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveMenu('profile')}
        >
          내 정보 수정
        </div>
        <div
          className={`menu-item ${activeMenu === 'usage' ? 'active' : ''}`}
          onClick={() => setActiveMenu('usage')}
        >
          사용량 분석
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="main-content">
        <div className="dashboard">
          <h1 className="page-title">
            {activeMenu === 'profile' ? '내 정보 수정' : '사용량 분석'}
          </h1>

          {/* 내 정보 수정 부분 */}
          {activeMenu === 'profile' && (
            <div>내 정보 수정</div>

          )}

          {/* 사용량 분석 부분 */}
          {activeMenu === 'usage' && (
            <>
              <InfoCard siteInfo={siteInfo} />
              <ChartCard dailyData={dailyData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// InfoCard 컴포넌트
const InfoCard = ({ siteInfo }) => (
  <div className="info-card">
    <h2 className="card-title">기본 정보</h2>
    <div className="info-grid">
      <div className="info-column">
        <InfoRow label="그룹 명" value={siteInfo.siteName} />
        <InfoRow label="사이트 URL" value={siteInfo.siteUrl} />
        <InfoRow label="도메인 명" value={siteInfo.domainName} />
        <InfoRow label="총 페이지수" value={siteInfo.totalPages} />
      </div>
      <div className="info-column">
        <InfoRow label="등록일자" value={siteInfo.registeredDate} />
        <InfoRow label="사이트 아이디" value={siteInfo.siteId} />
        <InfoRow label="활성 페이지" value={siteInfo.activatedPages} />
      </div>
    </div>
  </div>
);

// ChartCard 컴포넌트
const ChartCard = ({ dailyData }) => (
  <div className="chart-card">
    <h2 className="card-title">사용량 통계(샘플)</h2>
    <div className="chart-container">
      <h3 className="chart-subtitle">최근 24시간</h3>
      <div className="chart-wrapper">
        <LineChart
          width={700}
          height={240}
          data={dailyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="normal" stroke="#4F46E5" name="내 사용량" />
          <Line type="monotone" dataKey="spam" stroke="#EF4444" name="총 사용량량" />
        </LineChart>
        <LineChart
          width={700}
          height={240}
          data={dailyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="normal" stroke="#4F46E5" name="내 사용량" />
          <Line type="monotone" dataKey="spam" stroke="#EF4444" name="총 사용량량" />
        </LineChart>
      </div>
    </div>
  </div >
);

// InfoRow 컴포넌트
const InfoRow = ({ label, value }) => (
  <div className="info-row">
    <span className="info-label">{label}</span>
    <span className="info-value">{value}</span>
  </div>
);

export default MyPage2;
