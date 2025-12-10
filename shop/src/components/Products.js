import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Products = ({ id, title, price, imgUrl, content}) => {   
    
    const navigate  = useNavigate();
    
    return (
        <div className="col-md-4" style={{ marginBottom: "50px" }}>
            <Nav.Link className="c1" onClick={() => navigate(`/detail/${id}`)}>
                <img src={imgUrl} width="80%" />
                <h5 style={{ marginTop: "10px" }}>{title}</h5>
                <p>{content}</p>
                <span>{price}</span>
            </Nav.Link>
        </div>
    );
};
export default Products;
