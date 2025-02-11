import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
export function Header() {
    const { isAuthenticated, logout, member } = useAuth();

    const handleLogout = () => {
        logout();
    };
    useEffect(() => {
    }, [isAuthenticated]);
    return (
        (
            <div className="parent">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img className="icon" alt="" src="/logo.png" />
                </Link>
                <div className="group">
                    <Link to="/Introduce" style={{ textDecoration: 'none' }}>
                        <b className='b'> 서비스 소개</b>
                    </Link>
                    <Link to="/pricing" style={{ textDecoration: 'none' }}>
                        <b className="b">요금안내</b>
                    </Link>
                    {isAuthenticated && (
                        <Link to="/board" style={{ textDecoration: 'none' }}>
                            <b className="b">고객센터</b>
                        </Link>
                    )}
                    {(isAuthenticated && member.role === "ROLE_USER") && (
                        <Link to="/history" style={{ textDecoration: 'none' }}>
                            <b className="b">탐지 내역</b>
                        </Link>
                    )}
                    {isAuthenticated ? (
                        <div className="groupWrapper">
                            <div className="loginsignupParent">
                                {member.role === "ROLE_USER" && (
                                    <Link to="/mypage2" style={{ textDecoration: 'none' }}>
                                        <b className="b2">마이 페이지</b>
                                    </Link>
                                )}
                                <Link to="/" onClick={handleLogout} style={{ textDecoration: 'none' }}>
                                    <div className="loginsignup">
                                        <div className="wrapper">
                                            <b className="b1">로그아웃</b>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="groupWrapper">
                            <div className="loginsignupParent">
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <b className="b2">로그인</b>
                                </Link>
                                <Link to="/signup" style={{ textDecoration: 'none' }}>
                                    <div className="loginsignup">
                                        <div className="wrapper">
                                            <b className="b1">회원가입</b>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    );
}