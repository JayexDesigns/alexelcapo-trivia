import { useState } from 'react';
import './App.css';
import Dice from './components/Dice';
// import Card from './components/Card';
import logo from './assets/logo.png'

function App() {
    const [changesSaved, setChangesSaved] = useState(true);

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
            <div id="cards">
                <Dice></Dice>
                {/* <Card theme="coding" themeColor="#fca311" question="what language is used on the web" options={["PHP", "JavaScript", "C++", "Python"]} correct={"JavaScript"}></Card>
                <Card theme="youtube" themeColor="#e5383b" question="first video on youtube" options={["Youtube function showcase", "Testing video", "Tetris walkthrough", "Me at the zoo"]} correct={"Me at the zoo"}></Card>
                <Card theme="minecraft" themeColor="#00ffcc" question="first mob ever created" options={["Human", "Pig", "Creeper", "Dog"]} correct={"Human"}></Card>
                <Card theme="gaming" themeColor="#00ccff" question="silksong release date" options={["01/02/22", "14/12/22", "21/05/23", "Never"]} correct={"Never"}></Card> */}
            </div>
        </div>
    );
}

export default App;
