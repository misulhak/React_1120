
import React, { useState } from 'react';
import { Button, Table, Form, Alert } from 'react-bootstrap';

const FruitBoard = () => {

    // 게시물 목록 상태 관리
    const [boardList, setBoardList] = useState([
        { no: "1", title: '사과는 언제 배송이 되나요?', description: '어제부터 기다렸는데 아직 배송이 안됐어요.', viewCount: 1 },
        { no: "2", title: '수박크기가 작아요', description: '수박이 맛있고 달았습니다. 하지만 수박크기는 많이 작았어요. ', viewCount: 2 },
        { no: "3", title: '오렌지 당도가 낮아요', description: '당도가 11birx이상은 아닌것같아요.', viewCount: 1 },
        { no: "4", title: '딸기향이 이상해요', description: '딸기에서 흙냄새가 납니다.', viewCount: 1 }
    ]);

    // UI 상태들
    const [listOk, setListOk] = useState(true);// 게시글 전체리스트
    const [readOk, setReadOk] = useState(false);// 게시글 읽기
    const [writeOk, setWriteOk] = useState(false); // 게시글 쓰기
    const [editOk, setEditOk] = useState(false);// 게시글 수정
    const [boardInfo, setBoardInfo] = useState({}); // 현재 읽고 있는 게시글의 정보 (제목, 내용 등)를 저장하는 상태


    // 작성 폼 상태들
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // 수정 상태들 추가
    const [editNo, setEditNo] = useState(null); // 수정할 게시물 번호
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    // 오류 메시지 상태
    const [errorMessage, setErrorMessage] = useState('');


    // 게시글 목록 보기
    const boardListView = () => {
        setReadOk(false);
        setWriteOk(false);
        setEditOk(false);
        setListOk(true);
    };

    // 게시글 읽기
    const boardRead = (no) => {
        setListOk(false);
        setWriteOk(false);
        setEditOk(false);
        setReadOk(true);
        
        // 조회수 증가, 클릭한 게시물이면 1증감 
        const updatedList = boardList.map(b =>
            b.no === no ? { ...b, viewCount: b.viewCount + 1 } : b
        );
        setBoardList(updatedList); //조회수 1 증가해서 다시 렌더링
        
        const selectedBoard = boardList.find(b => b.no === no); // 클릭한 게시물 번호를 찾아
        setBoardInfo(selectedBoard); // 현재 읽고 있는 게시글의 정보를 저장해서 화면에 렌더링
    };

    // 게시글 작성 폼 열기
    const boardWrite = () => {
        setListOk(false);
        setWriteOk(true);
    };

    // 새 글 저장
    const boardSave = () => {
        // 제목과 설명이 비어있으면 유효성 검사
        if (title.trim() === '' || description.trim() === '') {
            setErrorMessage('제목과 내용을 모두 입력해주세요!');
            return;
        }
        
        // 새 글 추가
        const newBoard= {
            no: (boardList.length + 1).toString(),
            title: title,
            description: description,
            viewCount: 0 // 초기 조회수는 0
        };
        setBoardList([...boardList, newBoard]);
        setTitle('');
        setDescription('');
        setErrorMessage(''); // 오류 메시지 초기화
        boardListView(); // 새글 저장후 게시글 목록 함수 호출
    };

    // 게시글 삭제
    const boardDelete = (no) => {
        // 삭제할 게시글을 `no` 값으로 필터링하여 삭제
        const updatedList = boardList.filter(b => b.no !== no.toString());  // no.toString()으로 비교
        setBoardList(updatedList); 
        boardListView(); // 삭제 후 목록 보기로 이동
    };

    // 게시글 수정 폼 열기
    const boardEdit = (no) => {
        setEditOk(true);
        setListOk(false);
        
        const boardToEdit = boardList.find(b => b.no === no);  // 클릭한 번호를 찾아 객체의 데이터(게시글제목, 내용) 가져와서
        setEditNo(boardToEdit.no);   // 데이터의 번호
        setEditTitle(boardToEdit.title);  // 데이터의 제목
        setEditDescription(boardToEdit.description);  // 데이터의 내용을 폼태그에 채워넣는다.
    };







    // 수정된 게시글 저장
    const updateBoard = () => {
        const updatedBoardList = boardList.map(b =>  // 게시물에서 수정된 번호를 찾아 게시글제목과 설명을 저장
            b.no === editNo ? { ...b, title: editTitle, description: editDescription } : b
        );
        setBoardList(updatedBoardList);   // 게시물 목록을 업데이트
        boardListView();  // 수정 후 목록 보기로 이동
    };

    return (
        <div className="container" style={{ marginTop: "80px" }}>

            <h3>과일농장 게시판</h3>

            {/* 과일 목록 보기 */}
            {listOk && (
                <div style={{ marginTop: "30px" }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>문의글</th>
                                <th>조회수</th>
                                <th>문의하기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boardList.slice().reverse().map(board => (
                                <tr key={board.no}>
                                    <td>{board.no}</td>
                                    <td style={{ cursor: 'pointer',  textAlign: 'left' }} onClick={() => boardRead(board.no)}>
                                        {board.title}
                                    </td>
                                    <td style={{ cursor: 'pointer',  textAlign: 'left' }} onClick={() => boardRead(board.no)}>
                                        {board.description}
                                    </td>
                                    <td>{board.viewCount}</td> {/* 조회수 표시 */}
                                    <td>
                                        <Button variant="outline-primary" onClick={() => boardRead(board.no)}>
                                            게시글읽기
                                        </Button>
                                        <Button variant="outline-success" onClick={() => boardEdit(board.no)} style={{ marginLeft: "10px" }}>수정</Button>
                                        <Button variant="outline-danger" onClick={() => boardDelete(board.no)} style={{ marginLeft: "10px" }}>
                                            삭제
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={boardWrite} style={{ float: 'right' }}>
                       문의글 작성하기
                    </Button>
                </div>
            )}

            {/* 게시글 읽기 */}
            {readOk && (
                <div>
                    <h5 style={{textAlign: "left" }}>{boardInfo.title}</h5>
                    <hr></hr>
                    <p  style={{textAlign: "left" }}>{boardInfo.description}</p>
                    <br></br>
                    <div style={{ textAlign: "right"}}>
                        <Button variant="secondary" onClick={boardListView}  style={{textAlign: "right" }}>
                            목록으로
                        </Button>
                    </div>
                </div>
            )}








            {/* 새 글 작성 폼 */}
            {writeOk && (
                <div style={{ marginTop: "30px" }}>
                    <h5  style={{textAlign: "left" }}>과일농장에게 문의글 남기기</h5>

                    {/* 오류 메시지 표시 */}
                    {errorMessage && (
                        <Alert variant="danger">{errorMessage}</Alert>
                    )}

                    <Form.Group controlId="formName">
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="게시글을 입력하세요"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription" style={{ marginTop: "30px" }}>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="게시물에 작성하세요"
                        />
                    </Form.Group>
                    <br></br>
                    <div style={{ textAlign: "right"}}>
                        <Button variant="primary" onClick={boardSave} style={{ marginRight: "10px" }}>저장</Button>
                        <Button variant="secondary" onClick={boardListView}>목록으로</Button>
                    </div>
                </div>
            )}





            {/* 과일 수정 폼 */}
            {editOk && (
                <div style={{ marginTop: "30px" }}>
                    <h5 style={{textAlign: "left" }}>게시물 수정</h5>
                    <Form.Group controlId="formEditName">
                        <Form.Control
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="수정된 제목"
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formEditDescription">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="수정된 설명"
                        />
                    </Form.Group>
                    <br></br>
                    <div style={{ textAlign: 'right' }}>
                        <Button variant="outline-success" onClick={updateBoard} style={{ marginRight: "10px" }}>수정</Button>
                        <Button variant="outline-info" onClick={boardListView}>목록으로</Button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default FruitBoard;
