import './Cards.css';

function Cards(props) {
    return (
        <div className="cards-section">
            <h2>Cards</h2>
            <div className="cards-controls">
                <select id="card-select">
                    <option value="any">Any</option>
                    <option value="coding">Coding</option>
                    <option value="Gaming">Gaming</option>
                </select>
                <button id="random-card">Random Card</button>
            </div>
        </div>
    );
}

export default Cards;
