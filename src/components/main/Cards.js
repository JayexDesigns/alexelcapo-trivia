import { useState } from 'react';
import './Cards.css';

function Cards(props) {
    const [theme, setTheme] = useState("any");

    const randomInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const getRandomCard = (theme) => {
        if (theme === "any") {
            return props.cards[randomInRange(0, props.cards.length)];
        }
        else {
            let possibleCards = props.cards.filter(card => card.theme === theme);
            return possibleCards[randomInRange(0, possibleCards.length)];
        }
    };

    const changeTheme = (e) => {
        setTheme(prevState => e.target.value);
    };

    return (
        <div className="cards-section">
            <h2>Cards</h2>
            <div className="cards-controls">
                <select id="card-select" value={theme} onChange={(e) => changeTheme(e)}>
                    <option value="any">any</option>
                    {props.themes.map((theme, index) => {
                        return (
                            <option key={index} value={theme.name}>{theme.name}</option>
                        );
                    })}
                </select>
                <button id="random-card" onClick={() => props.setCardShowing(getRandomCard(theme))}>Random Card</button>
            </div>
        </div>
    );
}

export default Cards;
