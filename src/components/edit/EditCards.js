import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import './EditCards.css';
import InputCard from '../card/InputCard';

function EditThemes(props) {
    const [unsavedCards, setUnsavedCards] = useState(props.cards.map(card => {
        let newCard = Object.assign({}, card);
        newCard.options = [...card.options];
        return newCard;
    }));

    useEffect(() => {
        window.scrollTo(0, 0);
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    });

    const reRender = () => { // I Fucking Hate React Right Now
        props.setThemes(prevState => [...prevState])
    };

    const closeEdit = () => {
        setUnsavedCards(props.themes);
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        props.setEditCardsClicked(false);
    }

    const addCard = () => {
        setUnsavedCards(prevState => {
            prevState.push({
                theme: props.themes[0].name,
                question: "",
                options: [],
                correct: null,
            });
            return prevState;
        });
        reRender();
    };

    const removeCard = (index) => {
        setUnsavedCards(prevState => {
            prevState.splice(index, 1);
            return prevState;
        });
        reRender();
    };

    const addOption = (index) => {
        setUnsavedCards(prevState => {
            let options = [...prevState[index].options];
            options.push("");
            prevState[index].options = [...options];
            return prevState;
        });
        reRender();
    };

    const removeOption = (index, optionIndex) => {
        setUnsavedCards(prevState => {
            let options = [...prevState[index].options];
            options.splice(optionIndex, 1);
            prevState[index].options = [...options];
            return prevState;
        });
        reRender();
    };

    const setCorrectOption = (index, optionIndex) => {
        setUnsavedCards(prevState => {
            prevState[index].correct = prevState[index].options[optionIndex];
            return prevState;
        });
        reRender();
    };

    const changeCardQuestion = (e, index) => {
        setUnsavedCards(prevState => {
            prevState[index].question = e.target.value;
            return prevState;
        });
        reRender();
    };

    const changeCardOption = (e, index, optionIndex) => {
        setUnsavedCards(prevState => {
            prevState[index].options[optionIndex] = e.target.value;
            return prevState;
        });
        reRender();
    };

    const changeCardTheme = (e, index) => {
        setUnsavedCards(prevState => {
            prevState[index].theme = e.target.value;
            return prevState;
        });
        reRender();
    };

    const saveCards = () => {
        const defaultToastConfig = {
            color: 'var(--dark-color-3)',
            backgroundColor: 'var(--primary-color)',
            fontSize: '0.85rem',
        };
        for (let i = 0; i < unsavedCards.length; ++i) {
            if (unsavedCards[i].question === "") {
                toast.error("All Cards Must Have A Question", {style: defaultToastConfig});
                return;
            }
            else if (unsavedCards[i].options.length < 1) {
                toast.error("A Card Must Have At Least One Option", {style: defaultToastConfig});
                return;
            }
            else if ((unsavedCards[i].options.filter(option => option === "")).length !== 0) {
                toast.error("An Option Cannot Be Empty", {style: defaultToastConfig});
                return;
            }
            else if ((unsavedCards[i].options.filter(option => option === unsavedCards[i].correct)).length !== 1) {
                toast.error("There Must Be One Correct Option", {style: defaultToastConfig});
                return;
            }
            for (let j = 0; j < unsavedCards[i].options.length; ++j) {
                for (let k = 0; k < unsavedCards[i].options.length; ++k) {
                    if (j !== k && unsavedCards[i].options[j].toLowerCase() === unsavedCards[i].options[k].toLowerCase()) {
                        toast.error("Two Options Cannot Have The Same Text", {style: defaultToastConfig});
                        return;
                    }
                }
            }
        }
        props.setCards(prevState => unsavedCards);
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        props.setEditCardsClicked(false);
    };

    return (
        <div className="edit-cards">
            <div className="popup-background" onClick={() => closeEdit()}>
                <FontAwesomeIcon icon={faTimes} className="exit-cross" onClick={() => closeEdit()}></FontAwesomeIcon>
            </div>
            <div className="edit-card-controls">
                <button onClick={() => addCard()}>Add Card</button>
                <div className="edit-cards-list">
                    {unsavedCards.map((elem, index) => {
                        return (
                            <InputCard key={index} className="edit-cards-card"
                                themes={props.themes}
                                cardData={elem} cardIndex={index}
                                removeCard={removeCard}
                                addOption={addOption} removeOption={removeOption} setCorrectOption={setCorrectOption}
                                changeCardQuestion={changeCardQuestion} changeCardOption={changeCardOption}
                                changeCardTheme={changeCardTheme}
                            ></InputCard>
                        );
                    })}
                </div>
                <button onClick={() => saveCards()}>Save</button>
            </div>
            <Toaster></Toaster>
        </div>
    );
}

export default EditThemes;
