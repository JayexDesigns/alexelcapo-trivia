import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Export.css';

function Export(props) {
    const [exportPrompt, setExportPrompt] = useState(false);
    const [exportText, setExportText] = useState("");
    const [exportTextWritten, setExportTextWritten] = useState(false);
    const [textCopied, setTextCopied] = useState(false);

    useEffect(() => {
        if (exportPrompt) {
            window.scrollTo(0, 0);
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
        }
        if (exportPrompt && !exportTextWritten) {
            let data = {
                themes: props.themes,
                cards: props.cards,
                diceMin: props.min,
                diceMax: props.max,
            };
            data = JSON.stringify(data);
            setExportText(data);
            setExportTextWritten(true);
        }
    }, [exportPrompt, exportText, setExportText, props, exportTextWritten, setExportTextWritten]);

    const close = () => {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        setExportTextWritten(false);
        setTextCopied(false);
        setExportPrompt(false);
    }

    const handleClick = () => {
        setExportPrompt(true);
    };

    const copyText = () => {
        // console.log(exportText);
        // navigator.clipboard.writeText(exportText);
        props.setChangesSaved(true);
        setTextCopied(true);
    };

    return (
        <div className="export">
            <button id="export" onClick={() => handleClick()}>Export</button>
            {exportPrompt ? 
                <div className="export-area">
                    <div className="popup-background" onClick={() => close()}>
                        <FontAwesomeIcon icon={faTimes} className="exit-cross" onClick={() => close()}></FontAwesomeIcon>
                    </div>
                    <div className="export-prompt">
                        <h2>Copy The Text Below For Importing Later</h2>
                        <textarea className="export-input" cols="40" rows="10" value={exportText} readOnly></textarea>
                        <CopyToClipboard text={exportText}>
                            <button className="export-done" onClick={() => copyText()}>{textCopied ? "Done" : "Copy"}</button>
                        </CopyToClipboard>
                    </div>
                </div> : null
            }
        </div>
    );
}

export default Export;
