import { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
// import Card from './components/Card';
import Cards from './components/Cards';
import Dice from './components/Dice';
import Edit from './components/Edit';
import Export from './components/Export';
import Import from './components/Import';
import Themes from './components/edit/Themes';

function App() {
    const [themes, setThemes] = useState([]);
    const [cards, setCards] = useState([]);
    const [changesSaved, setChangesSaved] = useState(true);
    const [editThemesClicked, setEditThemesClicked] = useState(false);
    const [editCardsClicked, setEditCardsClicked] = useState(false);

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
                ></Edit>
                <Cards
                    themes={themes} setThemes={setThemes}
                    cards={cards} setCards={setCards}
                ></Cards>
                <Dice></Dice>
                {/* <Card theme="coding" themeColor="#fca311" question="what language is used on the web" options={["PHP", "JavaScript", "C++", "Python"]} correct={"JavaScript"}></Card>
                <Card theme="youtube" themeColor="#e5383b" question="first video on youtube" options={["Youtube function showcase", "Testing video", "Tetris walkthrough", "Me at the zoo"]} correct={"Me at the zoo"}></Card>
                <Card theme="minecraft" themeColor="#00ffcc" question="first mob ever created" options={["Human", "Pig", "Creeper", "Dog"]} correct={"Human"}></Card>
                <Card theme="gaming" themeColor="#00ccff" question="silksong release date" options={["01/02/22", "14/12/22", "21/05/23", "Never"]} correct={"Never"}></Card> */}
            </div>
            <div id="import-export">
                <Import
                    themes={themes} setThemes={setThemes}
                    cards={cards} setCards={setCards}
                    setChangesSaved={setChangesSaved}
                ></Import>
                <Export
                    themes={themes} setThemes={setThemes}
                    cards={cards} setCards={setCards}
                    setChangesSaved={setChangesSaved}
                ></Export>
            </div>
            <div id="edits">
                {editThemesClicked ? <Themes
                    themes={themes} setThemes={setThemes}
                    cards={cards} setCards={setCards}
                    setChangesSaved={setChangesSaved} setEditThemesClicked={setEditThemesClicked}
                ></Themes> : null}
            </div>
        </div>
    );
}

export default App;
