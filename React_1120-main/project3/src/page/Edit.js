import React, { useContext } from 'react';
import { replace, useNavigate, useParams } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import Header from '../componet/Header';
import Button from '../componet/Button';
import { DiaryDispatchContext } from '../App';
import Editor from '../componet/Editor';

const Edit = () => {
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const {OnDelete, OnUpdate} = useContext(DiaryDispatchContext);

    const onClickDelete = () => {
        if(window.confirm("일기를 정말 삭제할까요?")){
            OnDelete(id);
            navigate("/", {replace: true});
        }
    };

    const onClickUpdate = (data) => {
        if(window.confirm("일기를 정말 수정할까요?")) {
            OnUpdate(data);
            navigate("/", { replace: true });
        }
    };

    const goBack = () => {
        navigate(-1);
    }

    if(!data){
        return "<div>일기를 불러오고 있습니다.</div>";
    }else{
        return (
            <div>
                <Header
                    title={"일기 수정하기"}
                    leftChild={<Button text={"뒤로 가기"} 
                        onClick={goBack} />}
                    rightChild={
                        <Button text={"삭제하기"} 
                                type={"negative"} 
                                onClick={onClickDelete}
                        />}
                />     

                <Editor initData={data} onSubmit={onClickUpdate} />   
            </div>
        );
    }
};

    export default Edit;