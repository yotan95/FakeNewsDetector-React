import './BoardDetail.css'
import { useEffect, useState } from 'react';
import { getBoardDetail, deleteBoard } from '../api/board.api';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { postComment } from '../api/comment.api';

export const BoardDetail = () => {
    const location = useLocation()
    const [boardDetail, setBoardDetail] = useState({});
    const { id } = useParams();
    const password = location.state?.password || '';
    const navigate = useNavigate();
    const { member } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [comment, setComment] = useState('');
    // 모달 열기
    const openModal = () => {
        setModalIsOpen(true);
        // setSelectedBoard(board);
    };
    // 모달 닫기
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleDeleteClick = (e) => {
        e.preventDefault();
        console.log(boardDetail.id);
        const boardDate = {
            id: boardDetail.id,
            password: deletePassword.length === 0 ? null : deletePassword,
        }
        const response = deleteBoard(boardDate);
        response.then((res) => {
            if (res.data.status === 200) {
                toast.success(res.data.message);
                navigate('/board');
            } else {
                toast.error(res.data.message);
            }
        });
    };
    useEffect(() => {
        const requestBoardPassword = {
            id: id,
            password: password.length === 0 ? null : password,
        }
        // 게시글 상세보기
        const getboardDetail = getBoardDetail(requestBoardPassword);
        getboardDetail.then((res) => {
            if (res.data.status === 200) {
                setBoardDetail(res.data.data);
            } else {
                navigate('/board');
                alert(res.data.message);
            }
        });
    }, []);

    const handleDownload = async () => {
        const response = await fetch(`http://43.203.195.193:8080/download?file=${boardDetail.imageUrl}`);

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', boardDetail.imageUrl);
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    }
    const handleComment = () => {
        let commentData = {
            board_id: id,
            content: comment,
        }
        const response = postComment(commentData);
        response.then((res) => {
            if (res.data.status === 200) {
                window.location.reload();
            } else {
                toast.error(res.data.message);
            }
        })
    }
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
    return (
        <div className="bd-container">
            <div className="bd-frame">
                <div className="bd-div">
                    <div className="bd-frame-2">
                        <div className="bd-text-wrapper">고객문의 게시글</div>
                        <Link to="/board">
                            <div className="bd-group">
                                <div className="bd-text-wrapper-2">Back</div>
                                <img className="bd-vector" src="/Vector.png" />
                            </div>
                        </Link>
                    </div>
                    <div className="bd-frame-3">
                        <div className="bd-frame-4">
                            <div className="bd-frame-5">
                                <div className="bd-div-wrapper"><div className="bd-text-wrapper-3">분류</div></div>
                                <img className="bd-img" src="/Line-49.png" />
                                <div className="bd-text-wrapper-4">{boardDetail.categoryName}</div>
                            </div>
                            <div className="bd-frame-5">
                                <div className="bd-group-2"><div className="bd-text-wrapper-5">작성자</div></div>
                                <img className="bd-img" src="/Line-49.png" />
                                <div className="bd-text-wrapper-6">{boardDetail.memberName}</div>
                            </div>
                        </div>
                        <div className="bd-frame-5">
                            <div className="bd-div-wrapper"><div className="bd-text-wrapper-3">제목</div></div>
                            <img className="bd-img" src="/Line-49.png" />
                            <p className="bd-p">{boardDetail.title}</p>
                        </div>
                        {boardDetail.imageUrl && (
                            <div className="bd-frame-5" onClick={handleDownload}>
                                <div className="bd-image-overlap"><div className="bd-image-text">이미지 다운로드</div></div>
                            </div>
                        )}
                        <div className="bd-frame-6">
                            <div className="bd-text-wrapper-7">문의 내용</div>
                            <div className="bd-flexcontainer">
                                <p className="bd-text">
                                    {boardDetail.content}
                                </p>
                            </div>
                        </div>
                    </div>
                    <img className="bd-line-2" src="/Line-49.png" />
                    <div className="bd-frame-7">
                        <div className="bd-text-wrapper-7">답변</div>
                        <div className="bd-flexcontainer-2">
                            <p className="bd-text">
                                <span className="bd-span">{boardDetail.comment}<br /></span>
                            </p>
                            {member?.role == "ROLE_ADMIN" && (
                                <textarea className="bd-textarea" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>

                            )}
                        </div>
                    </div>
                    {(member?.id === boardDetail?.memberId || member?.role === "ROLE_ADMIN") && (
                        <div className="bd-frame-8">
                            {member?.role === "ROLE_ADMIN" && (
                                <div className="bd-overlap-group-wrapper" onClick={() => handleComment()}>
                                    <div className="bd-overlap-group"><div className="bd-text-wrapper-8">답변</div></div>
                                </div>
                            )}
                            <Link to={`/board/modify/${boardDetail.id}`} state={{ boardDetail }}>
                                <div className="bd-overlap-group-wrapper">
                                    <div className="bd-overlap-group"><div className="bd-text-wrapper-8">수정</div></div>
                                </div>
                            </Link>
                            <div className="bd-overlap-wrapper" onClick={openModal}>
                                <div className="bd-overlap"><div className="bd-text-wrapper-8">삭제</div></div>
                            </div>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <button onClick={closeModal} className="modal-close-button">×</button>
                                <div className="modal-title">게시글 삭제</div>

                                <form className="modal-form">
                                    {password !== '' && (
                                        <input
                                            type="password"
                                            className="modal-input"
                                            placeholder="비밀번호 입력"
                                            value={deletePassword}
                                            onChange={(e) => setDeletePassword(e.target.value)}
                                        />
                                    )}
                                    <button type="submit" className="modal-submit-button" onClick={handleDeleteClick}>
                                        삭제
                                    </button>
                                </form>
                            </Modal>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}