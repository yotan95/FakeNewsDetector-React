import PrivateRoute from "./PrivateRoute";
import { BoardModify } from '../page/BoardModify';
import { History } from '../page/History';
import { UrlPage } from '../page/UrlPage';
import { Pricing } from '../page/Pricing';
import { Board } from '../page/Board';
import { BoardWrite } from '../page/BoardWrite';
import { BoardDetail } from '../page/BoardDetail';
import { MyPage2 } from '../page/MyPage2';
import { Login } from '../page/Login';
import { Signup } from '../page/Signup';
import { Home } from '../page/Home';
import { useRoutes } from 'react-router-dom';
import { MainLayout } from "../page/MainLayout";
import { Header } from "../component/Header";
import { MyPage } from '../page/MyPage'
import { About } from "../page/About";
const AppRoutes = () => {
    const routes = useRoutes([
        {
            element: <MainLayout />,  // 기본 레이아웃 (Header 포함)
            children: [
                { path: "/", element: <Home /> },
                { path: "/login", element: <Login /> },
                { path: "/signup", element: <Signup /> },
                { path: "/board", element: <Board /> },
                { path: "/board/:id", element: <BoardDetail /> },
                { path: "/pricing", element: <Pricing /> },
                {
                    element: <PrivateRoute />, // 보호된 경로 관리
                    children: [
                        { path: "/board/write", element: <BoardWrite /> },
                        { path: "/board/modify/:id", element: <BoardModify /> },
                        { path: "/mypage", element: <MyPage /> },
                        { path: "/history", element: <History /> },
                        { path: "/url", element: <UrlPage /> },
                        { path: "/mypage2", element: <MyPage2 /> },
                    ],
                },
            ],
        },
        { path: "/about", element: <About /> }
        // { path: "/", element: <Home /> },
        // { path: "/login", element: <Login /> },
        // { path: "/signup", element: <Signup /> },
        // { path: "/board", element: <Board /> },
        // { path: "/board/:id", element: <BoardDetail /> },
        // { path: "/pricing", element: <Pricing /> },
        // {
        //     element: <PrivateRoute />, // PrivateRoute를 감싸서 보호된 경로 관리
        //     children: [
        //         { path: "/board/write", element: <BoardWrite /> },
        //         { path: "/board/modify/:id", element: <BoardModify /> },
        //         { path: "/mypage", element: <MyPage /> },
        //         { path: "/history", element: <History /> },
        //         { path: "/url", element: <UrlPage /> },
        //         { path: "/dashboard", element: <Template /> }
        //     ],
        // },
    ]);

    return routes;
};

export default AppRoutes;