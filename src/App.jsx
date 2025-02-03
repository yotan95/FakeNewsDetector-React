import './App.css';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Header } from './component/Header';
import { Home, Index } from './page/Home';
import { useEffect } from 'react';
import { Login } from './page/Login';
import { Signup } from './page/Signup';
import { AuthProvider } from './context/AuthContext';
import { Board } from './page/Board';
import { BoardWrite } from './page/BoardWrite';
import { BoardDetail } from './page/BoardDetail';
import { MyPage } from './page/MyPage';
import { ToastContainer } from 'react-toastify';
import { BoardModify } from './page/BoardModify';
import { History } from './page/History';
import { UrlPage } from './page/UrlPage';
import { Pricing } from './page/Pricing';
import { Footer } from './component/Footer';
function Url() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />
    }, {
      path: '/login',
      element: <Login />
    }, {
      path: '/signup',
      element: <Signup />
    }, {
      path: '/board',
      element: <Board />
    }, {
      path: '/board/write',
      element: <BoardWrite />
    }, {
      path: 'board/:id',
      element: <BoardDetail />
    }, {
      path: 'mypage',
      element: <MyPage />
    }, {
      path: '/board/modify/:id',
      element: <BoardModify />
    }, {
      path: '/history',
      element: <History />
    }, {
      path: '/url',
      element: <UrlPage />
    }, {
      path: '/pricing',
      element: <Pricing />
    }
  ])
  return routes;
}

function App() {
  useEffect(() => {
    // 화면 배율 구하기
    const devicePixelRatio = window.devicePixelRatio;

    // 배율에 따라 scale 값 계산 (예: 125% 배율은 0.8, 100% 배율은 1.0)
    let scaleValue = 1.0;  // 기본 값 1.0
    if (devicePixelRatio > 1) {
      scaleValue = 0.8;  // 배율이 100% 이상일 때 0.8로 축소
    }

    // 화면 축소 적용
    document.body.style.transform = `scale(${scaleValue})`;  // 배율에 맞게 축소
    document.body.style.transformOrigin = "0 0";  // 축소 기준을 왼쪽 상단으로 설정

    // 화면 크기 설정 (1920x1080)
    document.body.style.width = "1920px";
    document.body.style.height = "1080px";
  }, []);
  return (
    <div className="screen">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <ToastContainer />
          <Url />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
