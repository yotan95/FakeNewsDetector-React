import { getAnalysisHistory } from "../api/analysis.api";
import { HistoryComponent } from "../component/HistoryComponent";
import { HistoryDetail } from "../component/HistoryDetail";
import "./History.css";
import { useState, useEffect, useRef } from "react";

export const History = () => {
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [history, setHistory] = useState([]);
    const [isColumn, setIsColumn] = useState(false); // ✅ 클릭 여부 상태 추가
    const historyRef = useRef(null);

    useEffect(() => {
        // historyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        if (selectedHistory && historyRef.current) {

            const selectedElement = historyRef.current.querySelector(`[data-title="${selectedHistory.title}"]`);
            console.log(selectedElement);
            if (selectedElement) {
                console.log(selectedElement);
                selectedElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [selectedHistory]);

    const handleClick = (hist) => {
        if (selectedHistory?.title === hist.title) {
            // ✅ 같은 항목 클릭 시 선택 해제
            setSelectedHistory(null);
            setIsColumn(false);
        } else {
            // ✅ 새로운 항목 클릭 시 선택
            setSelectedHistory(hist);
            setIsColumn(true);
        }
    };

    useEffect(() => {
        const response = getAnalysisHistory();
        response.then((res) => {
            if (res.data.status === 200) {
                setHistory(res.data.data);
            }
        })
    }, [])
    return (
        <div className="history-container">
            <div ref={historyRef} className={`history-frame ${isColumn ? "column-view" : ""}`}>
                {history.map((hist, index) => (
                    <HistoryComponent
                        key={index}
                        history={hist}
                        isActive={selectedHistory?.title === hist.title} // ✅ 선택 여부 전달
                        onClick={() => handleClick(hist)}
                        data-title={hist.title}
                    />
                ))}
            </div>
            {isColumn && (
                <HistoryDetail
                    history={selectedHistory}
                />
            )}
        </div>
    );
};
