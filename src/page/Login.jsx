import './Login.css';
import { useState } from 'react';
import { loginApi } from '../api/member.api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        }

        const response = loginApi(loginData);
        response.then((res) => {
            if (res.data.status === 200) {
                const token = res.headers.get('Authorization');
                login(token, res.data.data);
                toast.success(res.data.message);
                navigate('/');
            } else {
                toast.error(res.data.message);
            }
        });
    }

    return (
        <div className="login-overlap">
            <div className="login-img-frame">
                <img className="login-img" src="/main.png" />
            </div>
            <div className="login-login-container">
                <form className="login-login-form" onSubmit={handleLogin}>
                    <h1 className="login-login-title">로그인</h1>
                    <div className="login-form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="이메일을 입력하세요" />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="비밀번호를 입력하세요" />
                    </div>
                    <button type="submit" className="login-login-button">로그인</button>
                </form>
            </div>
        </div>
    );
}