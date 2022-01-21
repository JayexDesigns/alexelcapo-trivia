import { useState, useEffect } from 'react';
import './Card.css';

function Card(props) {
    const [options, setOptions] = useState([]);
    const [shuffled, setShuffled] = useState(false);
    const [answered, setAnswered] = useState("");

    useEffect(() => {
        if (!shuffled) {
            for (let i = props.cardData.options.length-1; i > 0; --i) {
                let j = Math.floor(Math.random() * i);
                let val = props.cardData.options[i];
                props.cardData.options[i] = props.cardData.options[j];
                props.cardData.options[j] = val;
            }
            setOptions([...props.cardData.options]);
            setShuffled(true);
        }
    }, [props.cardData.options, options, setOptions, shuffled, setShuffled]);

    const handleClick = (elem) => {
        setAnswered(elem);
    };

    const getThemeIndex = () => {
        for (let i = 0; i < props.themes.length; ++i) if (props.themes[i].name === props.cardData.theme) return i;
        return 0;
    };

    return (
        <div className="card">
            <p className="card-theme" style={{borderColor: `#${props.themes[getThemeIndex()].color}`}}>{props.cardData.theme}</p>
            <div className="card-content">
                <h2>{props.cardData.question}</h2>
                <ul>
                    {options.map((elem, index) => {
                        return (
                            <li key={index}><button disabled={(answered === "") ? false : true} onClick={() => handleClick(elem)}
                                style={
                                    (answered === "") ? {} : 
                                    (elem === props.cardData.correct) ? {
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
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Card;
