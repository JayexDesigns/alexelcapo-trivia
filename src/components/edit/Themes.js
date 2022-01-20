import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import './Themes.css';

function Themes(props) {
    const [unsavedThemes, setUnsavedThemes] = useState(props.themes.map(theme => ({...theme})));
    const [unsavedCards, setUnsavedCards] = useState(props.cards.map(card => ({...card})));

    useEffect(() => {
        window.scrollTo(0, 0);
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    });

    const closeEdit = () => {
        setUnsavedThemes(props.themes);
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        props.setEditThemesClicked(false);
    }

    const addTheme = () => {
        setUnsavedThemes(prevState => {
            let state = [...prevState];
            state.push({name: "", color: "ff0000"});
            return state;
        });
    };

    const changeThemeName = (e, index) => {
        let themeName = unsavedThemes[index].name;
        setUnsavedCards(prevState => {
            return prevState.map(card => {
                if (card.theme === themeName) card.theme = e.target.value;
                return card;
            });
        });
        setUnsavedThemes(prevState => {
            let state = [...prevState];
            state[index]["name"] = e.target.value;
            return state;
        });
    };

    const changeThemeColor = (e, index) => {
        setUnsavedThemes(prevState => {
            let state = [...prevState];
            state[index]["color"] = e.target.value.substr(1, 6);
            return state;
        });
    };

    const removeTheme = (index) => {
        let themeName = unsavedThemes[index].name;
        setUnsavedCards(prevState => {
            return prevState.filter(card => card.theme !== themeName);
        });
        setUnsavedThemes(prevState => {
            let state = [...prevState];
            state.splice(index, 1);
            return state;
        });
    };

    const saveThemes = () => {
        for (let i = 0; i < unsavedThemes.length; ++i) {
            if (unsavedThemes[i].name === "") {
                toast.error("All Themes Must Have A Name", {
                    style: {
                        color: 'var(--dark-color-3)',
                        backgroundColor: 'var(--primary-color)',
                        fontSize: '0.85rem',
                    }
                });
                return;
            }
            for (let j = 0; j < unsavedThemes.length; ++j) {
                if (i !== j && unsavedThemes[i].name.toLowerCase() === unsavedThemes[j].name.toLowerCase()) {
                    toast.error("Two Themes Cannot Have The Same Name", {
                        style: {
                            color: 'var(--dark-color-3)',
                            backgroundColor: 'var(--primary-color)',
                            fontSize: '0.85rem',
                        }
                    });
                    return;
                }
            }
        }
        props.setThemes(prevState => unsavedThemes);
        props.setCards(prevState => unsavedCards);
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        props.setEditThemesClicked(false);
    };

    return (
        <div className="edit-themes">
            <div className="popup-background" onClick={() => closeEdit()}>
                <FontAwesomeIcon icon={faTimes} className="exit-cross" onClick={() => closeEdit()}></FontAwesomeIcon>
            </div>
            <div className="edit-theme-controls">
                <button onClick={() => addTheme()}>Add Theme</button>
                <ul className="themes-list">
                    {unsavedThemes.map((elem, index) => {
                        return (
                            <li key={index}>
                                <div style={{backgroundColor: `#${elem.color}`}}>
                                    <input autoComplete="off" id={`theme-color-${index}`} type="color" value={`#${elem.color}`} onChange={(e) => {changeThemeColor(e, index)}}></input>
                                </div>
                                <input autoComplete="off" id={`theme-name-${index}`} type="text" value={elem.name} placeholder="Theme Name" onChange={(e) => {changeThemeName(e, index)}}></input>
                                <button>
                                    <FontAwesomeIcon icon={faTimes} onClick={() => removeTheme(index)}></FontAwesomeIcon>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <button onClick={() => saveThemes()}>Save</button>
            </div>
            <Toaster></Toaster>
        </div>
    );
}

export default Themes;
