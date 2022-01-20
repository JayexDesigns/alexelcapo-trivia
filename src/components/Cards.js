import './Cards.css';

function Cards(props) {
    return (
        <div className="cards-section">
            <h2>Cards</h2>
            <div className="cards-controls">
                <select id="card-select">
                    <option value="any">any</option>
                    {props.themes.map((theme, index) => {
                        return (
                            <option key={index} value={theme.name}>{theme.name}</option>
                        );
                    })}
                </select>
                <button id="random-card">Random Card</button>
            </div>
        </div>
    );
}

export default Cards;
