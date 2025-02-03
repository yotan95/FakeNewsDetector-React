import './HistoryComponent.css'

export const HistoryComponent = ({ history, onClick, isActive }) => {
    return (
        <div className={`history-comp-frame ${isActive ? "active" : ""}`} onClick={onClick} data-title={history.title}>
            <img className="history-comp-element" src={`https://i.ytimg.com/vi/${history.url.match(/[?&]v=([^&]+)/)[1]}/hq720.jpg`} />

            <div className="history-comp-group">
                <div className="history-comp-div">
                    <div className="history-comp-div-wrapper"><div className="history-comp-text-wrapper">{history.title}</div></div>
                    <div className="history-comp-div-2">
                        <img className="history-comp-img" src="/history-date.png" />
                        <p className="history-comp-p">검색 일자 : {history.detectionDate.match(/^\d{4}-\d{2}-\d{2}/)[0]}</p>
                    </div>
                    <div className="history-comp-div-3">
                        <div className="history-comp-div-4">
                            <img className="history-comp-img" src="/done.png" />
                            <div className="history-comp-text-wrapper-2">fakeNewsRate : {history.fakeNewsRate}%</div>
                        </div>
                        <div className="history-comp-div-4">
                            <img className="history-comp-img" src="/done.png" />
                            <div className="history-comp-text-wrapper-3">deepVoiceRate : {history.deepVoiceRate}%</div>
                        </div>
                        <div className="history-comp-div-5">
                            <img className="history-comp-img" src="/done.png" />
                            <div className="history-comp-text-wrapper-4">deepFakeRate : {history.deepFakeRate}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}