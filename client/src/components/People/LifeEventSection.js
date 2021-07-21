const LifeEventSection = (props) => {
    const typeChangeHandler = (event) => {
        props.dispatch({
            type: "updateType",
            index: props.eventIndex,
            value: event.target.value,
        });
    };

    const dateChangeHandler = (event) => {
        props.dispatch({
            type: "updateDate",
            index: props.eventIndex,
            value: event.target.value,
        });
    };

    const infoChangeHandler = (event) => {
        props.dispatch({
            type: "updateInfo",
            index: props.eventIndex,
            value: event.target.value,
        });
    };

    const deleteHandler = (event) => {
        event.preventDefault();
        props.dispatch({
            type: "delete",
            index: props.eventIndex,
        });
    };

    return (
        <span key={props.eventIndex}>
            <select name="type" value={props.type} onChange={typeChangeHandler}>
                <option value="any">Dowolne</option>
                <option value="birth">Narodziny</option>
                <option value="baptism">Chrzest</option>
                <option value="marriage">Ślub</option>
                <option value="death">Śmierć</option>
                <option value="funeral">Pogrzeb</option>
            </select>
            <label>
                <input
                    type="text"
                    name="date"
                    placeholder="RRRR-MM-DD"
                    value={props.date}
                    onChange={dateChangeHandler}
                />
            </label>
            <label>
                <input
                    type="text"
                    name="info"
                    placeholder="info"
                    value={props.info}
                    onChange={infoChangeHandler}
                />
            </label>
            <button onClick={deleteHandler}>Usuń</button>
            <br />
        </span>
    );
};

export default LifeEventSection;
