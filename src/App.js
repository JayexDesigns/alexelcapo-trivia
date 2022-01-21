import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import logo from './assets/logo.png';
import Cards from './components/main/Cards';
import Dice from './components/main/Dice';
import Edit from './components/main/Edit';
import Export from './components/main/Export';
import Import from './components/main/Import';
import EditThemes from './components/edit/EditThemes';
import EditCards from './components/edit/EditCards';
import CardShowcase from './components/card/CardShowcase';

function App() {
    const [themes, setThemes] = useState([]);
    const [cards, setCards] = useState([]);
    const [changesSaved, setChangesSaved] = useState(true);
    const [editThemesClicked, setEditThemesClicked] = useState(false);
    const [editCardsClicked, setEditCardsClicked] = useState(false);
    const [cardShowing, setCardShowing] = useState(null);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(6);

    const sendError = (text) => {
        toast.error(text, {
            style: {
                color: 'var(--dark-color-3)',
                backgroundColor: 'var(--primary-color)',
                fontSize: '0.85rem',
            }
        });
    };

    window.onbeforeunload = () => {
        if (changesSaved) return;
        else return "Are you sure you want to leave? Changes will not be saved";
    };

    return (
        <div className="App">
            <nav>
                <img src={logo} alt="something went wrong"/>
            </nav>
            <div id="nav-gap"></div>
            <div id="controls">
                <Edit
                    themes={themes} setThemes={setThemes}
                    cards={cards} setCards={setCards}
                    setChangesSaved={setChangesSaved} setEditThemesClicked={setEditThemesClicked} setEditCardsClicked={setEditCardsClicked}
                    sendError={sendError}
                ></Edit>
                <Cards
                    themes={themes} setThemes={setThemes}
                    cards={cards} setCards={setCards}
                    cardShowing={cardShowing} setCardShowing={setCardShowing}
                ></Cards>
                <Dice
                    min={min} setMin={setMin}
                    max={max} setMax={setMax}
                ></Dice>
            </div>
            <div id="import-export">
                <Import
                    themes={themes} setThemes={setThemes}
                    cards={cards} setCards={setCards}
                    min={min} setMin={setMin}
                    max={max} setMax={setMax}
                    setChangesSaved={setChangesSaved}
                ></Import>
                <Export
                    themes={themes} setThemes={setThemes}
                    cards={cards} setCards={setCards}
                    min={min} setMin={setMin}
                    max={max} setMax={setMax}
                    setChangesSaved={setChangesSaved}
                ></Export>
            </div>
            <div id="edits">
                {editThemesClicked ? <EditThemes
                    themes={themes} setThemes={setThemes}
                    cards={cards} setCards={setCards}
                    setChangesSaved={setChangesSaved} setEditThemesClicked={setEditThemesClicked}
                ></EditThemes> : null}
                {editCardsClicked ? <EditCards
                    themes={themes} setThemes={setThemes}
                    cards={cards} setCards={setCards}
                    setChangesSaved={setChangesSaved} setEditCardsClicked={setEditCardsClicked}
                ></EditCards> : null}
            </div>
            <div id="card-showing">
                {cardShowing ? <CardShowcase
                    themes={themes}
                    cardData={cardShowing} setCardShowing={setCardShowing}
                ></CardShowcase> : null}
            </div>
            <Toaster></Toaster>
        </div>
    );
}

export default App;
