import "./Body.css";

function handleOnClick(){
    alert("Body 클릭됨");
}

const func = () => {
    console.log("화살표 함수");
}

const Body = () =>{
    return(
        <div className="body">
            <button onClick={handleOnClick}>클릭하세요</button>
            
            <button onClick={ ()=> {alert("버튼2가 클릭")} }>버튼2</button>
            
            <button onClick={ func }>버튼3</button>
        </div> 
    );   
}

export default Body;