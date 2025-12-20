import React from "react";

const Title = () => {
    let csst1 = {
        marginTop: "70px",
        textAlign: "center",
    };

    return (
    <>
        <h3 style={csst1}>햇과일 BEST</h3>
        <p style={{ textAlign: "center" }}>
        {" "}
        농부가 추천하는 제철과일을 만나보세요.
        </p>
    </>
    );
};

export default Title;