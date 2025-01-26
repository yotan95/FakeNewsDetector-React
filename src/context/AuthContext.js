import React, { createContext, useContext, useState, useEffect } from 'react';

// 로그인 상태 관리 Context
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [member, setMember] = useState(null);
    // 페이지 로드 시 localStorage에서 JWT를 읽어 로그인 상태 초기화
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        if (localStorage.getItem('member')) {
            setMember(JSON.parse(localStorage.getItem('member')));
        }
    }, []);

    const login = (token, member) => {
        // 로그인 성공 시 localStorage에 JWT 저장하고 상태 업데이트
        localStorage.setItem('token', token);
        localStorage.setItem('member', JSON.stringify(member));
        setMember(member);
        setIsAuthenticated(true);
    };

    const logout = () => {
        // 로그아웃 시 localStorage에서 JWT 제거하고 상태 업데이트
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        localStorage.removeItem('member');
        setMember(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, member, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
