import React from "react";

const ComVeggie = ({ imgUrl, title, content, price }) => {
        
    return (
    <div className="col-md-4" style={{marginBottom:"50px"}}>
        <img src={process.env.PUBLIC_URL +"/" + imgUrl} width="80%" />
        <h5 style={{marginTop:"10px"}}>{title}</h5>
        <span>{content}</span>
        <p>{price}</p>
    </div>
    );
};

export default ComVeggie;
