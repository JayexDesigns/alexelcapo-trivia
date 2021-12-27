import { useState } from 'react';
import './Card.css';

function Card(props) {
    const [answered, setAnswered] = useState("");

    const handleClick = (elem) => {
        setAnswered(elem);
    };

    return (
        <div className="card">
            <p className="card-theme" style={{borderColor: props.themeColor}}>{props.theme}</p>
            <div className="card-content">
                <h2>{props.question}</h2>
                <ul>
                    {props.options.map((elem, index) => {
                        return (
                            <li key={index}><button disabled={(answered === "") ? false : true} onClick={() => handleClick(elem)}
                                style={
                                    (answered === "") ? {} : 
                                    (elem === props.correct) ? {
                                        borderColor: "var(--accent-color-1)",
                                        backgroundColor: "var(--accent-color-1)",
                                        color: "var(--dark-color-3)"} :
                                    (elem === answered) ? {
                                        borderColor: "var(--accent-color-2)",
                                        backgroundColor: "var(--accent-color-2)",
                                        color: "var(--dark-color-3)"} : 
                                    {}
                                }
                            >{elem}</button></li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Card;
