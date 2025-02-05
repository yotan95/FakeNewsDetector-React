import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
const PrivateRoute = () => {
    const { member } = useAuth(); // member 값 확인

    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" replace />; // 로그인 페이지로 리디렉트
    }

    return <Outlet />; // 정상 접근 시 해당 라우트 렌더링
};

export default PrivateRoute;