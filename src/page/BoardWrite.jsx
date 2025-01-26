import React from "react";
import "./BoardWrite.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getCategory } from "../api/category.api";
import { postBoard } from "../api/board.api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
export const BoardWrite = () => {
    //category state
    const [categoryList, setCategoryList] = React.useState([]);
    //board write state
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    //게시글 post 요청
    const handleWrite = (e) => {
        e.preventDefault();

        const writeData = {
            title: title,
            content: content,
            password: password.length === 0 ? null : password,
            category: category,
        };
        const boardWrite = postBoard(writeData, file);
        boardWrite.then((res) => {
            if (res.data.status === 200) {
                toast.success("게시글 작성 성공");
                navigate("/board");
            } else {
                toast.error("게시글 작성 실패");
            }
        });
    };
    // 파일 선택 시 상태 업데이트
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    useEffect(() => {
        const categories = getCategory();
        categories.then((res) => {
            if (res.data.status === 200) {
                setCategoryList(res.data.data);
            } else {
                alert("카테고리 불러오기 실패");
            }
        });
    }, []);
    return (
        <div className="screen">
            <div className="boardwr-group">
                <form className="boardwr-frame" onSubmit={handleWrite}>
                    <div className="boardwr-frame-2">
                        <div className="boardwr-text-wrapper">고객문의 게시판 작성</div>
                        <Link to="/board">
                            <div className="boardwr-group-2">
                                <div className="boardwr-text-wrapper-2">Back</div>
                                <img className="boardwr-vector" src="/Vector.png" />
                            </div>
                        </Link>
                    </div>
                    <div className="boardwr-frame-3">
                        <div className="boardwr-frame-4">
                            <div className="boardwr-text-wrapper-4">문의 카테고리</div>
                            <div className="boardwr-overlap-group-wrapper">
                                {/* 카테고리 선택 input */}
                                <select className="boardwr-div-2" required onChange={(e) => setCategory(e.target.value)} >
                                    <option value="" disabled selected>카테고리를 선택하세요.</option>
                                    {categoryList.map((item) => (
                                        <option value={item.name} key={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* <div className="boardwr-frame-4">
                        <div className="boardwr-text-wrapper-4">작성자</div>
                        <div className="boardwr-overlap-group-wrapper">
                            <div className="boardwr-div-2"><div className="boardwr-text-wrapper-5">a06143</div></div>
                        </div>
                    </div> */}
                    </div>
                    <div className="boardwr-frame-5">
                        <p className="boardwr-p"><span className="boardwr-text-wrapper-6">* </span> <span className="boardwr-span">제목</span></p>
                        <input className="boardwr-rectangle" type="text" placeholder="제목을 입력하세요." required onChange={(e) => setTitle(e.target.value)}></input>
                    </div>
                    {/* 이미지 업로드 */}
                    <div className="boardwr-frame-5">
                        <p className="boardwr-p"><span className="boardwr-span">이미지 업로드</span></p>
                        <input className="" type="file" accept="image/*" onChange={handleFileChange}></input>
                    </div>

                    <div className="boardwr-frame-6">
                        <p className="boardwr-span-wrapper-2"><span className="boardwr-span">* 문의 내용</span></p>
                        <textarea className="boardwr-rectangle-2" required onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <div className="boardwr-frame-7">
                        <div className="boardwr-frame-8">
                            <div className="boardwr-text-wrapper-7">게시글 비밀번호 설정</div>
                            <div className="boardwr-div-wrapper"><input className="boardwr-rectangle-3" type="password" onChange={(e) => setPassword(e.target.value)}></input></div>
                            <p className="boardwr-text-wrapper-8">*비밀번호 미입력 시 공개글로 등록됩니다.</p>
                        </div>
                        <div className="boardwr-group-4">
                            <button className="boardwr-overlap-group-2" ><div className="boardwr-text-wrapper-9">등록</div></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
