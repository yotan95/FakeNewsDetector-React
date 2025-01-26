import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
export function Header() {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
    useEffect(() => {
    }, [isAuthenticated]);
    return (
        (
            <div className="parent">
                <Link to="/">
                    <img className="icon" alt="" src="/logo.png" />
                </Link>
                <div className="group">
                    <Link to="/board">
                        <b className="b">게시판</b>
                    </Link>
                    {isAuthenticated ? (
                        <div className="groupWrapper">
                            <div className="loginsignupParent">
                                <Link to="/" onClick={handleLogout}>
                                    <div className="loginsignup">
                                        <div className="wrapper">
                                            <b className="b1">로그아웃</b>
                                        </div>
                                    </div>
                                </Link>
                                <Link to="/mypage">
                                    <b className="b2">마이 페이지</b>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="groupWrapper">
                            <div className="loginsignupParent">
                                <Link to="/signup">
                                    <div className="loginsignup">
                                        <div className="wrapper">
                                            <b className="b1">회원가입</b>
                                        </div>
                                    </div>
                                </Link>
                                <Link to="/login">
                                    <b className="b2">로그인</b>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    );
}