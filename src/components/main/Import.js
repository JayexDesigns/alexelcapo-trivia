import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import './Import.css';

function Import(props) {
    const [importPrompt, setImportPrompt] = useState(false);
    const [importText, setImportText] = useState("");

    useEffect(() => {
        if (importPrompt) {
            window.scrollTo(0, 0);
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
        }
    }, [importPrompt]);

    const close = () => {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        setImportText("");
        setImportPrompt(false);
    }

    const handleClick = () => {
        setImportPrompt(true);
    };

    const changeImportText = (e) => {
        setImportText(e.target.value);
    };

    const importErrorToast = () => {
        toast.error("Import JSON Is Incorrect", {style: {
            color: 'var(--dark-color-3)',
            backgroundColor: 'var(--primary-color)',
            fontSize: '0.85rem',
        }});
    };

    const importJson = () => {
        let data = JSON.parse(importText);
        try {
            let valid = true;
            props.setThemes(prevState => {
                for (let i = 0; i < data.themes.length; ++i) if (!data.themes[i]["name"] || !data.themes[i]["color"]) {
                    valid = false;
                    importErrorToast();
                    return [];
                }
                return data.themes;
            });
            if (valid) props.setCards(prevState => {
                for (let i = 0; i < data.cards.length; ++ i) if (!data.cards[i].theme || !data.cards[i].question || !data.cards[i].options || !data.cards[i].correct || data.cards[i].options.length < 1) {
                    valid = false;
                    importErrorToast();
                    return [];
                }
                return data.cards;
            });
            if (valid) props.setMin(data.diceMin);
            if (valid) props.setMax(data.diceMax);
            if (valid) props.setChangesSaved(false);
            if (valid) close();
        }
        catch (error) {
            console.log(error);
            importErrorToast();
        }
    };

    return (
        <div className="import">
            <button id="import" onClick={() => handleClick()}>Import</button>
            {importPrompt ? 
                <div className="input">
                    <div className="popup-background" onClick={() => close()}>
                        <FontAwesomeIcon icon={faTimes} className="exit-cross" onClick={() => close()}></FontAwesomeIcon>
                    </div>
                    <div className="input-prompt">
                        <h2>Paste Here Your Exported JSON Text</h2>
                        <textarea className="import-input" cols="40" rows="10" value={importText} onChange={(e) => changeImportText(e)}></textarea>
                        <button className="import-done" onClick={() => importJson()}>Done</button>
                    </div>
                </div> : null
            }
            <Toaster></Toaster>
        </div>
    );
}

export default Import;
