import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './InputCard.css';

function InputCard(props) {
    return (
        <div className="input-card">
            <span>
                <select className="input-card-theme" value={props.cardData.theme} onChange={(e) => props.changeCardTheme(e, props.cardIndex)}>{props.cardData.theme}
                    {props.themes.map((elem, index) => {
                        return (
                            <option key={index} value={elem.name}>{elem.name}</option>
                        )
                    })}
                </select>
                <FontAwesomeIcon className="input-card-remove" icon={faTimes} onClick={() => props.removeCard(props.cardIndex)}></FontAwesomeIcon>
            </span>
            <div className="input-card-content">
                <input type="text" value={props.cardData.question} className="input-card-question" onChange={(e) => props.changeCardQuestion(e, props.cardIndex)}></input>
                <ul>
                    {props.cardData.options.map((elem, index) => {
                        return (
                            <li key={index}>
                                <input type="text" value={elem} onChange={(e) => props.changeCardOption(e, props.cardIndex, index)}></input>
                                <FontAwesomeIcon className="input-card-option-remove" icon={faTimes} onClick={() => props.removeOption(props.cardIndex, index)}></FontAwesomeIcon>
                                {
                                    (props.cardData.correct === elem) ? 
                                    <FontAwesomeIcon className="input-card-option-correct input-card-option-correct-checked" icon={faCheck} onClick={() => props.setCorrectOption(props.cardIndex, index)}></FontAwesomeIcon> :
                                    <FontAwesomeIcon className="input-card-option-correct" icon={faCheck} onClick={() => props.setCorrectOption(props.cardIndex, index)}
                                    ></FontAwesomeIcon>
                                }
                            </li>
                        );
                    })}
                    <li><button className="input-card-add-option" onClick={() => {props.addOption(props.cardIndex)}}>Add Option</button></li>
                </ul>
            </div>
        </div>
    );
}

export default InputCard;
