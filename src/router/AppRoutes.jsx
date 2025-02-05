import PrivateRoute from "./PrivateRoute";
import { BoardModify } from '../page/BoardModify';
import { History } from '../page/History';
import { UrlPage } from '../page/UrlPage';
import { Pricing } from '../page/Pricing';
import { Board } from '../page/Board';
import { BoardWrite } from '../page/BoardWrite';
import { BoardDetail } from '../page/BoardDetail';
import { MyPage } from '../page/MyPage';
import { Login } from '../page/Login';
import { Signup } from '../page/Signup';
import { Home } from '../page/Home';
import { useRoutes } from 'react-router-dom';

const AppRoutes = () => {
    const routes = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/board", element: <Board /> },
        { path: "/board/:id", element: <BoardDetail /> },
        { path: "/pricing", element: <Pricing /> },
        {
            element: <PrivateRoute />, // PrivateRoute를 감싸서 보호된 경로 관리
            children: [
                { path: "/board/write", element: <BoardWrite /> },
                { path: "/board/modify/:id", element: <BoardModify /> },
                { path: "/mypage", element: <MyPage /> },
                { path: "/history", element: <History /> },
                { path: "/url", element: <UrlPage /> },
            ],
        },
    ]);

    return routes;
};

export default AppRoutes;