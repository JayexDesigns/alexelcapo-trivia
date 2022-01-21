import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import './CardShowcase.css';

function EditThemes(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    });

    const close = () => {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        props.setCardShowing(false);
    }

    return (
        <div className="card-showcase">
            <div className="popup-background" onClick={() => close()}>
                <FontAwesomeIcon icon={faTimes} className="exit-cross" onClick={() => close()}></FontAwesomeIcon>
            </div>
            <div className="card-element">
                <Card
                    themes={props.themes}
                    cardData={props.cardData}>
                </Card>
            </div>
        </div>
    );
}

export default EditThemes;
