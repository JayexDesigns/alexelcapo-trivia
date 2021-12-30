import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Dice.css';

function Dice(props) {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(6);
    const [value, setValue] = useState(1);

    const rollDice = () => {
        if (min < 0) setMin(0);
        else if (min > 99) setMin(99);
        if (max < 0) setMax(0);
        else if (max > 99) setMax(99);
        let res = Math.floor(Math.random() * (max+1 - min)) + min;
        setValue(res);
    };

    return (
        <div className="dice-section">
            <h2>Dice</h2>
            <div className="dice-controls">
                <label>min</label>
                <input type="number" min={0} max={99} value={min} onChange={(e) => setMin(parseInt(e.target.value))}/>
                <div className="dice-value-modifiers">
                    <button onClick={() => setMin(prevState => (prevState < 99 && prevState < max) ? prevState+1 : prevState)}>
                        <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                    </button>
                    <button onClick={() => setMin(prevState => (prevState > 0) ? prevState-1 : prevState)}>
                        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                    </button>
                </div>
                <div className="dice-value-modifiers">
                    <button onClick={() => setMax(prevState => (prevState < 99) ? prevState+1 : prevState)}>
                        <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                    </button>
                    <button onClick={() => setMax(prevState => (prevState > 0 && prevState > min) ? prevState-1 : prevState)}>
                        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                    </button>
                </div>
                <input type="number" min={0} max={99} value={max} onChange={(e) => setMax(parseInt(e.target.value))}/>
                <label>max</label>
            </div>
            <p>Result: {value}</p>
            <button onClick={rollDice}>Roll</button>
        </div>
    );
}

export default Dice;
