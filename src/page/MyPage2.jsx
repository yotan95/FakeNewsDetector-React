import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './MyPage2.css';

export const MyPage2 = () => {
  const [activeMenu, setActiveMenu] = useState('usage');

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
    { time: '12', normal: 1, spam: 0 },
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
          
          {/* 기본 정보 카드 */}
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

          {/* 차트 카드 */}
          {activeMenu === 'usage' && (
            <div className="chart-card">
              <h2 className="card-title">사용량 통계(샘플)</h2>
              <div className="chart-container">
                <h3 className="chart-subtitle">최근 24시간</h3>
                <div className="chart-wrapper">
                  <LineChart
                    width={800}
                    height={240}
                    data={dailyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="normal" stroke="#4F46E5" name="정상메일" />
                    <Line type="monotone" dataKey="spam" stroke="#EF4444" name="스팸메일" />
                  </LineChart>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="info-row">
    <span className="info-label">{label}</span>
    <span className="info-value">{value}</span>
  </div>
);

export default MyPage2;