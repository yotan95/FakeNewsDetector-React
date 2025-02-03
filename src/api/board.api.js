import { data } from "react-router-dom";
import { httpApi } from "./axios api.";
export const postBoard = async (requestBoard, multipartFile = null) => {
    const formData = new FormData();

    // JSON 데이터를 FormData에 추가 (JSON은 문자열로 변환해야 함)
    formData.append(
        "requestBoard",
        new Blob([JSON.stringify(requestBoard)], { type: "application/json" })
    );

    // 파일이 존재하는 경우 FormData에 추가
    if (multipartFile) {
        formData.append("multipartFile", multipartFile);
    }
    const token = localStorage.getItem("token");

    return await httpApi.post("/board", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

};
export const getBoardList = async (page) => {
    if (page === null || page === undefined) {
        page = 0;
    }
    return await httpApi.get(`/board/list?page=${page}`);
}

export const getBoardDetail = async (requestBoardPassword) => {
    return await httpApi.post('/board-detail', requestBoardPassword);
}

export const BoardPasswordCheck = async (requestBoardPassword) => {
    return await httpApi.post('/board-check', requestBoardPassword);
}

export const deleteBoard = async (requestBoard) => {
    const token = localStorage.getItem('token');
    return await httpApi.delete(`/board`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-type': 'application/json',
        },
        data: requestBoard,
    });
}

export const modifyBoard = async (requestBoard) => {
    const token = localStorage.getItem('token');
    return await httpApi.put(`/board/${requestBoard.id}`, requestBoard, {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-type': 'application/json',
        },
    });
}
