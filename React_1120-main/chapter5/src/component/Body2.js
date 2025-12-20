import { useRef, useState } from "react";
// import "./Body.css";



const Body2 = () =>{

    const [text, setText] = useState("");

    const textRef = useRef();

    const handleOnChange = (e) => {
        setText(e.target.value);
    };

    const handleOnClick = ()=>{

        if(text.length <5){
            textRef.current.focus();
        }else{
            alert(text);
            textRef.current.value = "";
        }
    }

    return(
        <div className="body">
            <input ref={textRef} type="text" onChange={handleOnChange} />
            <button onClick={handleOnClick}>작성완료</button>
            <br />
        </div>
    );
}

export default Body2;