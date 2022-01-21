import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Dice.css';

function Dice(props) {
    const [value, setValue] = useState(1);

    const rollDice = () => {
        if (props.min < 0) props.setMin(0);
        else if (props.min > 99) props.setMin(99);
        if (props.max < 0) props.setMax(0);
        else if (props.max > 99) props.setMax(99);
        let res = Math.floor(Math.random() * (props.max+1 - props.min)) + props.min;
        setValue(res);
    };

    return (
        <div className="dice-section">
            <h2>Dice</h2>
            <div className="dice-controls">
                <label>min</label>
                <input autoComplete="off" type="number" min={0} max={99} value={props.min} onChange={(e) => props.setMin(parseInt(e.target.value))}/>
                <div className="dice-value-modifiers">
                    <button onClick={() => props.setMin(prevState => (prevState < 99 && prevState < props.max) ? prevState+1 : prevState)}>
                        <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                    </button>
                    <button onClick={() => props.setMin(prevState => (prevState > 0) ? prevState-1 : prevState)}>
                        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                    </button>
                </div>
                <div className="dice-value-modifiers">
                    <button onClick={() => props.setMax(prevState => (prevState < 99) ? prevState+1 : prevState)}>
                        <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                    </button>
                    <button onClick={() => props.setMax(prevState => (prevState > 0 && prevState > props.min) ? prevState-1 : prevState)}>
                        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                    </button>
                </div>
                <input autoComplete="off" type="number" min={0} max={99} value={props.max} onChange={(e) => props.setMax(parseInt(e.target.value))}/>
                <label>max</label>
            </div>
            <p>Result: {value}</p>
            <button onClick={rollDice}>Roll</button>
        </div>
    );
}

export default Dice;
