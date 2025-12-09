import { useContext, useEffect, useState } from 'react';
import Button from '../componet/Button';
import Editor from '../componet/Editor';
import Header from '../componet/Header';
import { DiaryStateContext } from '../App';
import { getMonthRangeByDate } from '../util';
import DiaryList from '../componet/DiaryList';

const Home = () => {   
    const data = useContext(DiaryStateContext);
    const [filteredData, setFilteredData] = useState([]);
    
    const [pivotDate, setPivotDate] = useState(new Date());

    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`

    const onIncreaseMonth = ()=>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
   
    const onDecreaseMonth = ()=>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    useEffect(() => {
        if(data.length>=1){
            const {beginTimeDate, endTimeStamp} = getMonthRangeByDate(pivotDate);

            setFilteredData(
                data.filter((it)=> beginTimeDate<= it.date && it.date <= endTimeStamp )
            );
        }else{
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    return (
        <>
            <Header
                title={headerTitle}
                leftChild = {<Button text={"<"}  onClick={onDecreaseMonth} />}
                rightChild = {<Button text={">"} onClick={onIncreaseMonth} />}
            />

            <DiaryList data={filteredData}/>
        </>
    );
};

export default Home;