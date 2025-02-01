import { HistoryComponent } from "../component/HistoryComponent";
import { HistoryDetail } from "../component/HistoryDetail";
import "./History.css";
import { useState, useEffect, useRef } from "react";

export const History = () => {
    const [selectedHistory, setSelectedHistory] = useState(null);
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

    const sample = [
        { title: "sample1", create_date: "2025-01-27", content: "content1" },
        { title: "sample2", create_date: "2025-01-26", content: "content2" },
        { title: "sample3", create_date: "2025-01-25", content: "content3" },
        { title: "sample4", create_date: "2025-01-24", content: "content4" },
        { title: "sample5", create_date: "2025-01-23", content: "content5" },
        { title: "sample6", create_date: "2025-01-22", content: "content6" },
        { title: "sample7", create_date: "2025-01-21", content: "content7" },
        { title: "sample8", create_date: "2025-01-20", content: "content8" },
        { title: "sample9", create_date: "2025-01-19", content: "content9" },
    ];
    const handleClick = (samp) => {
        if (selectedHistory?.title === samp.title) {
            // ✅ 같은 항목 클릭 시 선택 해제
            setSelectedHistory(null);
            setIsColumn(false);
        } else {
            // ✅ 새로운 항목 클릭 시 선택
            setSelectedHistory(samp);
            setIsColumn(true);
        }
    };
    return (
        <div className="history-container">
            <div ref={historyRef} className={`history-frame ${isColumn ? "column-view" : ""}`}>
                {sample.map((samp, index) => (
                    <HistoryComponent
                        key={index}
                        history={samp}
                        isActive={selectedHistory?.title === samp.title} // ✅ 선택 여부 전달
                        onClick={() => handleClick(samp)}
                        data-title={samp.title}
                    />
                ))}
            </div>
            {isColumn && (
                <HistoryDetail />
            )}
        </div>
    );
};
