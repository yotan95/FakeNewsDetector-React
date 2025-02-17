import { getAnalysisHistory } from "../api/analysis.api";
import { HistoryComponent } from "../component/HistoryComponent";
import { HistoryDetail } from "../component/HistoryDetail";
import "./History.css";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const History = () => {
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [history, setHistory] = useState([]);
    const [isColumn, setIsColumn] = useState(false); //  클릭 여부 상태 추가
    const historyRef = useRef(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = query.get("page") ? parseInt(query.get("page"), 10) : 1;
    const [totalPages, setTotalPaqges] = useState();
    const navigate = useNavigate();
    const [number, setNumber] = useState(page);
    useEffect(() => {
        // historyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        if (selectedHistory && historyRef.current) {
            const selectedElement = historyRef.current.querySelector(`[data-title="${selectedHistory.id}"]`);
            console.log(selectedElement);
            if (selectedElement) {
                console.log(selectedElement);
                selectedElement.scrollIntoView({ behavior: "smooth", block: "start" });
                window.scroll(0, 0);
            }
        }
    }, [selectedHistory]);

    const handleClick = (hist) => {
        if (selectedHistory?.id === hist.id) {
            setSelectedHistory(null);
            setIsColumn(false);
        } else {
            // 추가 history배열 순서 변경
            const currentHistory = [...history]
            const index = currentHistory.findIndex(item => item.id === hist.id);
            const reorderHistory = [
                ...history.slice(index),
                ...history.slice(0, index)
            ];
            // 
            setHistory(reorderHistory);
            setSelectedHistory(hist);
            setIsColumn(true);
        }
    };

    useEffect(() => {
        const response = getAnalysisHistory(page - 1);
        response.then((res) => {
            if (res.data.status === 200) {
                setHistory(res.data.data.content);
                setTotalPaqges(res.data.data.totalPages);

            }
        })
    }, [page])
    return (
        <div className="history-container-container">
            <div className="history-index">영상 분석 기록</div>

            <div className="history-container">
                <div ref={historyRef} className={`history-frame ${isColumn ? "column-view" : ""}`}>
                    {history.map((hist, index) => (
                        <HistoryComponent
                            key={index}
                            history={hist}
                            isActive={selectedHistory?.id === hist.id}
                            onClick={() => handleClick(hist)}
                            data-title={hist.id}
                        />
                    ))}
                </div>
                {isColumn && (
                    <HistoryDetail
                        history={selectedHistory}
                    />
                )}
            </div>
            <div className="pagination-container">
                <button className="pagination-button prev" onClick={() => navigate(`/history?page=${page - 1}`)} disabled={page === 1}>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`pagination-number ${i === page - 1 ? "active" : ""}`}
                        onClick={() => { setNumber(i); navigate(`/history?page=${i + 1}`); }}
                    >
                        {i + 1}
                    </button>
                ))}
                <button className="pagination-button next" onClick={() => navigate(`/history?page=${page + 1}`)} disabled={page === totalPages}>
                    Next
                    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};
