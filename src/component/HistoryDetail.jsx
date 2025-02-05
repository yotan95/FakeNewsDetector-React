import "./HistoryDetail.css";

export const HistoryDetail = ({ history }) => {
    return (
        <div className="history-detail-frame">
            <div className="history-detail-div">
                <div className="history-detail-div-2">
                    <img className="history-detail-element" src={`https://i.ytimg.com/vi/${history.url.match(/[?&]v=([^&]+)/)[1]}/hq720.jpg`} />
                    <div className="history-detail-div-3">
                        <div className="history-detail-group"><div className="history-detail-text-wrapper">{history.title}</div></div>
                        <div className="history-detail-div-4">
                            <div className="history-detail-div-5">
                                <img className="history-detail-page" src="/done.png" />
                                <div className="history-detail-text-wrapper-2">MCQ’s</div>
                            </div>
                            <div className="history-detail-div-6">
                                <img className="history-detail-page" src="/done.png" />
                                <div className="history-detail-text-wrapper-3">Technical interview</div>
                            </div>
                            <div className="history-detail-div-6">
                                <img className="history-detail-page" src="/done.png" />
                                <div className="history-detail-text-wrapper-3">HR interview</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="history-detail-div-7">
                    <div className="history-detail-group-2">
                        <img className="history-detail-vector" src="/history-date.png" />
                        <div className="history-detail-p">
                            <span className="history-detail-span">검색 일자 :</span> <span className="history-detail-text-wrapper-4">&nbsp;&nbsp;{history.detectionDate.split('T')[0]}</span>
                        </div>
                    </div>
                    <div className="history-detail-group-wrapper">
                        <div className="history-detail-overlap-group-wrapper">
                            <div className="history-detail-overlap-group" onClick={() => window.open(history.url)}><div className="history-detail-text-wrapper-5">영상으로 이동</div></div>
                        </div>
                    </div>
                </div>
            </div>
            <img className="history-detail-img" src="/Vector.png" />
            <div className="history-detail-div-8">
                <div className="history-detail-text-wrapper-6">분석 결과 &gt;</div>
                <div className="history-detail-div-9">
                    <div className="history-detail-div-10">
                        <div className="history-detail-group-4">
                            <img className="history-detail-line-2" src="/line-49.png" />
                            <p className="history-detail-div-11">
                                <span className="history-detail-text-wrapper-8">fakeNewsRate</span> <span className="history-detail-text-wrapper-9">: {history.fakeNewsRate}%</span>
                            </p>
                        </div>
                        <div className="history-detail-group-4">
                            <img className="history-detail-line-2" src="/line-49.png" />
                            <p className="history-detail-div-11">
                                <span className="history-detail-text-wrapper-8">deepVoiceRate</span> <span className="history-detail-text-wrapper-9">: {history.deepVoiceRate}%</span>
                            </p>
                        </div>
                        <div className="history-detail-group-4">
                            <img className="history-detail-line-2" src="/line-49.png" />
                            <p className="history-detail-div-11">
                                <span className="history-detail-text-wrapper-8">deepFakeRate</span> <span className="history-detail-text-wrapper-9">: {history.deepFakeRate}%</span>
                            </p>
                        </div>
                    </div>
                    <div className="history-detail-group-5">
                        <img className="history-detail-line-2" src="/line-49.png" />
                        <p className="history-detail-no-of-openings">
                            <span className="history-detail-text-wrapper-8"></span> <span className="history-detail-text-wrapper-9">{history.content}</span>
                        </p>
                    </div>
                </div>
            </div>
            <img className="history-detail-img" src="/Vector.png" />
            <div className="history-detail-div-12">
                <div className="history-detail-text-wrapper-6">관련 정보 &gt;</div>
                <div className="history-detail-div-13">
                    {history?.relatedNews.map((news, index) => (
                        <div className="history-detail-div-14">
                            <div className="history-detail-text-wrapper-10">관련 URL :</div>
                            <div className="history-detail-div-6">
                                <div className="history-detail-text-wrapper-11">{news.url}</div>
                                <div className="history-detail-div-wrapper">
                                    <div className="history-detail-overlap-group-2" onClick={() => window.open(news.url)}><div className="history-detail-text-wrapper-12">URL 이동</div></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}