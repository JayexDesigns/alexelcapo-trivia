import './Import.css';

function Import(props) {
    const handleClick = () => {
        console.log("Importing");
    };

    return (
        <div className="import">
            <button id="import" onClick={() => handleClick()}>Import</button>
        </div>
    );
}

export default Import;
