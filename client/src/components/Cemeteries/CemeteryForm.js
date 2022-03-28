import { useEffect, useRef } from "react";
import { useInput } from "../../hooks/use-input";
import { useHistory } from "react-router-dom";

import FormField from "../UI/FormField";
import request from "../../helpers/http";

const CemeteryForm = (props) => {
    let formData = useRef();

    const {
        match: {
            params: { id },
        },
    } = props;

    const history = useHistory();

    const { 
        value: name,
         setValue: setName,
          bind: bindName 
    } = useInput("");
    const { 
        value: address,
         setValue: setAddress,
          bind: bindAddress 
    } = useInput("");
    

    useEffect(() => {
        request({
            type: "get",
            source: "cemeteries",
            _id: id,
        }).then((data) => {
            formData.current = data;

            setName(data.name);
            setAddress(data.address);
        });
    }, [
        id,
        props,
        setName,
        setAddress,
    ]);

    

    const submitHandler = (event) => {
        event.preventDefault();

        const data = {
            _id: id,
            name,
            address,
            graves: formData.current.graves,
        };

        request({
            type: "update",
            source: "cemeteries",
            data,
        }).then(() => history.push("/cemeteries"));
    };

    const removeHandler = (event) => {
        event.preventDefault();

        if (window.confirm("Czy na pewno usunąć?")) {
            request({
                type: "remove",
                source: "cemeteries",
                _id: id,
            }).then(() => history.push("/cemeteries"));
        }
    };

    return (
        <form onSubmit={submitHandler}>
            Formularz cmentarza
            <br />
            <button onClick={removeHandler}>Usuń cmentarz</button>
            <FormField
                name="name"
                labelText="Nazwa: "
                input={{ type: "text", ...bindName }}
            />
            <FormField
                name="address"
                labelText="Adres: "
                input={{ type: "text", ...bindAddress }}
            />
            
            <input type="submit" value="Zapisz" />
        </form>
    );
};

export default CemeteryForm;
