import './Export.css';

function Export(props) {
    const handleClick = () => {
        console.log("Exporting");
    };

    return (
        <div className="export">
            <button id="export" onClick={() => handleClick()}>Export</button>
        </div>
    );
}

export default Export;
