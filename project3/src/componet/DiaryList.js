import { useEffect, useState } from 'react';
import Button from './Button';
import "./DiaryList.css";
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
];

const DiaryList = ({data}) => {
    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState([]);

    useEffect(()=>{

        // 정렬 조건
        const compare = (a,b) => {
            if(sortType === "latest"){
                return Number(b.date) - Number(a.date);
            }else{
                return Number(a.date) - Number(b.date);
            }
        };
        /*
            {name: "홍길동", age: 20} -> js객체
            {"name": "홍길동", "age": 20} -> json
            JSON.stringify(data) : js객체-> json변환
            JSON.parse() : json -> js객체변경

            이유 : 원본데이타 보존하기위해서...(깊은복사)
            const copyList = data (얕은 복사)
        */
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);
    }, [data, sortType]);

    const onChangeSortType = (e)=>{
        setSortType(e.target.value);
    };

    const navigate = useNavigate();

    const onClickNew = () => {
        navigate("/new");
    };

    return (
        <div className='DiaryList'>
            <div className='menu_wrapper'>
                <div className='left_col'>
                    <select value={sortType} 
                            onChange={onChangeSortType}>
                        {
                        sortOptionList.map((it, i)=>(
                            <option key={i} value={it.value}>
                                {it.name}
                            </option>
                        ))   
                        }
                    </select>
                </div>
                <div className='right_col'>
                    <Button 
                        type={"positive"} 
                        text={"새 일기 쓰기"} 
                        onClick={onClickNew}
                    />
                </div>
            </div>
            <div className='list_wrapper'>
                { sortedData.map( (it) => (
                    <DiaryItem key={it.id} {...it}/>
                ))
                }
            </div>  
        </div>
    );
};

export default DiaryList;