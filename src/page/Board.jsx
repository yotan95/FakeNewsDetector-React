import { Link, useLocation } from 'react-router-dom';
import './Board.css';
import { useState, useEffect } from 'react';
import { getBoardList } from '../api/board.api';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './ModalStyles.css';
import { BoardPasswordCheck } from '../api/board.api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export function Board() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = query.get("page") ? parseInt(query.get("page"), 10) : 1;
    const [boardList, setBoardList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedBoard, setSelectedBoard] = useState(null);
    const { isAuthenticated, member } = useAuth();
    const [number, setNumber] = useState(page);
    const [totalPages, setTotalPaqges] = useState();
    const navigate = useNavigate();
    // 모달 열기
    const openModal = (board) => {
        setModalIsOpen(true);
        setSelectedBoard(board);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleClick = (board) => {
        if (member != null && member?.role == "ROLE_ADMIN") {
            navigate(`/board/${board.id}`, { state: { password: '' } });
        }
        else if (board.lock) {
            openModal(board);
        } else {
            navigate(`/board/${board.id}`, { state: { password: '' } });
        }
    };
    // 비밀번호 제출 핸들러
    const handleSubmit = (e) => {
        if (password.trim() === '') {
            toast.error('비밀번호를 입력해주세요.');
        } else {
            e.preventDefault();
            const response = BoardPasswordCheck({ id: selectedBoard.id, password });
            response.then((res) => {
                if (res.data.status === 200) {
                    navigate(`/board/${selectedBoard.id}`, { state: { password } });
                    closeModal();
                } else {
                    setPassword('');
                    toast.error('비밀번호가 틀렸습니다.');
                }
            });
            closeModal();
        }
    };
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            padding: '20px',
            width: '400px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        },
    };
    useEffect(() => {
        // 게시판 목록 가져오기
        const boardList = getBoardList(page - 1);
        boardList.then((res) => {
            if (res.data.status === 200) {
                console.log(res.data.data);
                setBoardList(res.data.data.content);
                console.log(res.data.data.content);
                setTotalPaqges(res.data.data.totalPages);
            } else {
                alert("게시글 목록 불러오기 실패");
            }
        });
    }, [page]);
    const handleWriteButtonClick = () => {
        if (isAuthenticated && member) {
            navigate('/board/write');
        } else {
            toast.error("로그인이 필요합니다.");
            navigate('/login');
        }

    }
    return (
        <div className="board-container">
            <div className="board-div">
                <div className="board-frame-2">
                    <div className="board-frame-3">
                        <div className="board-large-title">고객문의 게시판</div>
                        <button className="board-button" onClick={handleWriteButtonClick}>
                            <img className="board-icon-edit" src="/icon-edit.png" />
                            <div className="board-text">글 작성</div>
                        </button>
                    </div>
                    <div className="board-frame-wrapper">
                        <div className="board-frame-4">
                            <div>
                                <div className="board-frame-11" style={{ cursor: 'default' }}>
                                    <div className="board-num"><div className="board-text-wrapper-4">번호</div></div>
                                    <div className="board-category"><div className="board-text-wrapper-5">카테고리</div></div>
                                    <div className="board-title">
                                        <div className="board-frame-12">
                                            <p className="board-p">재목</p>
                                        </div>
                                    </div>
                                    <div className="board-user"><div className="board-text-wrapper-6">작성자</div></div>
                                    <div className="board-date"><div className="board-text-wrapper-7">작성일</div></div>
                                    <div className="board-state-comment"><div className="board-text-wrapper-comment">답변
                                    </div></div>
                                </div>
                            </div>
                            {boardList.map((board) => (
                                // <Link to={`/board/${board.id}`} key={board.id} style={{ textDecoration: 'none' }}>
                                <div className="board-frame-11" key={board.id} onClick={() => handleClick(board)}>
                                    <div className="board-num"><div className="board-text-wrapper-4">{board.id}</div></div>
                                    <div className="board-category"><div className="board-text-wrapper-5">{board.category}</div></div>
                                    <div className="board-title">
                                        <div className="board-frame-12">
                                            <p className="board-p">{board.title}</p>
                                            {board.lock ? <img className="board-img" src="lock.png" /> : ""}
                                        </div>
                                    </div>
                                    <div className="board-user"><div className="board-text-wrapper-6">{board.user}</div></div>
                                    <div className="board-date"><div className="board-text-wrapper-7">{board.createdDate.substring(0, 10)}</div></div>
                                    {board.answer ? (<div className="board-state"><div className="board-text-wrapper-8">답변완료</div></div>
                                    ) : (<div className="board-state-2"><div className="board-text-wrapper-8">답변대기</div></div>
                                    )}
                                </div>
                                // </Link>
                            ))}

                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button onClick={closeModal} className="modal-close-button">×</button>
                    <div className="modal-title">게시글 타이틀</div>

                    <form onSubmit={handleSubmit} className="modal-form">
                        <input
                            type="password"
                            className="modal-input"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="modal-submit-button">
                            제출
                        </button>
                    </form>
                </Modal>
            </div>
            <div className="pagination-container">
                <button className="pagination-button prev" onClick={() => navigate(`/board?page=${page - 1}`)} disabled={page === 1}>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`pagination-number ${i === page - 1 ? "active" : ""}`}
                        onClick={() => { setNumber(i); navigate(`/board?page=${i + 1}`); }}
                    >
                        {i + 1}
                    </button>
                ))}
                <button className="pagination-button next" onClick={() => navigate(`/board?page=${page + 1}`)} disabled={page === totalPages}>
                    Next
                    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}