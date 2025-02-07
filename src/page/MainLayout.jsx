import { Outlet } from "react-router-dom";
import { Header } from "../component/Header";

export const MainLayout = () => {
    return (
        <div className="main-layout">
            <Header />
            <Outlet />
        </div>
    );
};

