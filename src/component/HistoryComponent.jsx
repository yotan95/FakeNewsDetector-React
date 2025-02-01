import './HistoryComponent.css'

export const HistoryComponent = ({ history, onClick, isActive }) => {
    return (
        <div className={`history-comp-frame ${isActive ? "active" : ""}`} onClick={onClick} data-title={history.title}>
            <img className="history-comp-element" src="https://i.ytimg.com/vi/fpxiKxgFSlQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBFuSVVD65vJ-ucuwF7wK8G0W2gLA" />

            <div className="history-comp-group">
                <div className="history-comp-div">
                    <div className="history-comp-div-wrapper"><div className="history-comp-text-wrapper">{history.title}</div></div>
                    <div className="history-comp-div-2">
                        <img className="history-comp-img" src="/history-date.png" />
                        <p className="history-comp-p">검색 일자 : {history.create_date}</p>
                    </div>
                    <div className="history-comp-div-3">
                        <div className="history-comp-div-4">
                            <img className="history-comp-img" src="/done.png" />
                            <div className="history-comp-text-wrapper-2">내용 : {history.content}</div>
                        </div>
                        <div className="history-comp-div-4">
                            <img className="history-comp-img" src="/done.png" />
                            <div className="history-comp-text-wrapper-3">HR interview</div>
                        </div>
                        <div className="history-comp-div-5">
                            <img className="history-comp-img" src="/done.png" />
                            <div className="history-comp-text-wrapper-4">Technical interview</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}