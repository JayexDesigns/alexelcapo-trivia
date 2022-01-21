import './Edit.css';

function Edit(props) {
    const editThemes = () => {
        props.setChangesSaved(false);
        props.setEditThemesClicked(true);
    };
    const editCards = () => {
        if (props.themes.length === 0) {
            props.sendError("Create At Least 1 Theme First");
            return;
        }
        props.setChangesSaved(false);
        props.setEditCardsClicked(true);
    };

    return (
        <div className="edit-section">
            <h2>Edit</h2>
            <div className="edit-controls">
                <button id="edit-themes" onClick={() => editThemes()}><p>Edit Themes</p><p>{props.themes.length}</p></button>
                <button id="edit-cards" onClick={() => editCards()}><p>Edit Cards</p><p>{props.cards.length}</p></button>
            </div>
        </div>
    );
}

export default Edit;
