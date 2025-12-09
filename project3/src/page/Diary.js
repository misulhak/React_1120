import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import { getFormattedDate } from '../util';
import Header from '../componet/Header';
import Button from '../componet/Button';
import Viewer from '../componet/Viewer';

const Diary = () => {
    const {id} = useParams();
    const data = useDiary(id);
    
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const goEdit = () => {
        navigate(`/edit/${id}`);
    }
    
    if(!data){       
        return <div>일기 데이타를 불려오고 있습니다..</div>
    }else{
        const {date, emotionId, content}  = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
        
        return (
            <div>
                <Header
                    title={title}
                    leftChild={<Button text={"뒤로가기"} onClick={goBack} />}
                    rightChild={<Button text={"수정하기"} onClick={goEdit} />}
                />                
                <Viewer content={content} emotionId = {emotionId} />
            </div>
        );
    }
};

export default Diary;