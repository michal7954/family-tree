import { useEffect, useRef } from "react";
import { useInput } from "../../hooks/use-input";
import { useHistory } from "react-router-dom";

import FormField from "../UI/FormField";
import request from "../../helpers/http";


const GraveForm = (props) => {
    let formData = useRef();

    const {
        match: {
            params: { id },
        },
    } = props;

    const history = useHistory();

    const {
        value: description,
        setValue: setDescription,
        bind: bindDescription,
    } = useInput("");
    const {
        value: location,
        setValue: setLocation,
        bind: bindLocation,
    } = useInput("");
    const {
        value: cemeteryId,
        setValue: setCemeteryId,
        bind: bindCemeteryId,
    } = useInput("");

    useEffect(() => {
        request({
            type: "get",
            source: "graves",
            _id: id,
        }).then((data) => {
            formData.current = data;

            setDescription(data.description);
            setLocation(data.location);
            setCemeteryId(data.cemeteryId);
        });
    }, [
        id,
        props,
        setDescription,
        setLocation,
        setCemeteryId,
    ]);

    const submitHandler = (event) => {
        event.preventDefault();

        const data = {
            _id: id,
            description,
            location,
            cemeteryId,
        };

        request({
            type: "update",
            source: "graves",
            data,
        }).then(() => history.push("/graves"));
    };

    const removeHandler = (event) => {
        event.preventDefault();

        if (window.confirm("Czy na pewno usunąć?")) {
            request({
                type: "remove",
                source: "graves",
                _id: id,
            }).then(() => history.push("/graves"));
        }
    };

    return (
        <form onSubmit={submitHandler}>
            Formularz nagrobka
            <br />
            <button onClick={removeHandler}>Usuń nagrobek</button>
            <FormField
                name="description"
                labelText="Opis: "
                input={{ type: "textarea", ...bindDescription }}
            />
            <FormField
                name="localization"
                labelText="Lokalizacja: "
                input={{ type: "input", ...bindLocation }}
            />
            <FormField
                name="cemeteryId"
                labelText="ID cmentarza: "
                input={{ type: "input", ...bindCemeteryId }}
            />
        
            <input type="submit" value="Zapisz" />
        </form>
    );
};

export default GraveForm;
