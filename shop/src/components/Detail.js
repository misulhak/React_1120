import { useParams } from "react-router-dom";

function Detail(props) {
    
    let {paramId} = useParams();
    //console.log(paramId);
    //const { imgUrl, title, content, price } = props.fruit[paramId];

    let item = props.fruit.find(f => f.id === parseInt(paramId));
    const { imgUrl, title, content, price } = item;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                <img src={'/' + imgUrl} width="100%" alt={title} />
                {/* <img src={process.env.PUBLIC_URL + '/' + imgUrl} width="100%" alt={title} /> */}
                </div>
                <div className="col-md-6">
                    <h5 className="pt-5">{title}</h5>
                    <p>{content}</p>
                    <p>{price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;
