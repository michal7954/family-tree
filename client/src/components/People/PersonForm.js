import { useEffect, useReducer, useRef, useState } from "react";
import { useInput } from "../../hooks/use-input";
import { useRadio } from "../../hooks/use-radio";
import { useHistory } from "react-router-dom";

import FormField from "../UI/FormField";
import LifeEventSection from "./LifeEventSection";
import request from "../../helpers/http";

const lifeEventsReducer = (data, action) => {
    let clone = JSON.parse(JSON.stringify(data));

    switch (action.type) {
        case "set":
            return action.data;
        case "add":
            return [...clone, { type: "", date: "", info: "" }];
        case "delete":
            clone.splice(action.index, 1);
            return clone;
        case "updateType":
            clone[action.index].type = action.value;
            return clone;
        case "updateDate":
            clone[action.index].date = action.value;
            return clone;
        case "updateInfo":
            clone[action.index].info = action.value;
            return clone;
        default:
            return clone;
    }
};

const PersonForm = (props) => {
    let formData = useRef();

    const {
        match: {
            params: { id },
        },
    } = props;

    const history = useHistory();

    const { value: name, setValue: setName, bind: bindName } = useInput("");
    const {
        value: surname,
        setValue: setSurname,
        bind: bindSurname,
    } = useInput("");
    const {
        value: isAlive,
        setValue: setIsAlive,
        bind: bindIsAlive,
    } = useInput("", true);
    const {
        value: gender,
        setValue: setGender,
        bind: bindGender,
    } = useRadio("");
    const {
        value: description,
        setValue: setDescription,
        bind: bindDescription,
    } = useInput("");
    const {
        value: mother,
        setValue: setMother,
        bind: bindMother,
    } = useInput("");
    const {
        value: father,
        setValue: setFather,
        bind: bindFather,
    } = useInput("");
    const {
        value: phoneNumber,
        setValue: setPhoneNumber,
        bind: bindPhoneNumber,
    } = useInput("");
    const {
        value: emailAddress,
        setValue: setEmailAddress,
        bind: bindEmailAddress,
    } = useInput("");
    const {
        value: residencePlace,
        setValue: setResidencePlace,
        bind: bindResidencePlace,
    } = useInput("");
    const {
        value: graveId,
        setValue: setGraveId,
        bind: bindGraveId,
    } = useInput("");
    const [creationDate, setCreationDate] = useState();

    const [lifeEvents, dispatchLifeEvents] = useReducer(lifeEventsReducer, []);

    useEffect(() => {
        request({
            type: "get",
            source: "people",
            _id: id,
        }).then((data) => {
            formData.current = data;

            setName(data.name);
            setSurname(data.surname);
            setIsAlive(data.isAlive);
            setDescription(data.description);
            setMother(data.mother);
            setFather(data.father);
            setPhoneNumber(data.phoneNumber);
            setEmailAddress(data.emailAddress);
            setResidencePlace(data.residencePlace);
            setGraveId(data.graveId);
            setGender(data.gender);
            setCreationDate(data.creationDate);
            dispatchLifeEvents({ type: "set", data: data.lifeEvents });
        });
    }, [
        id,
        props,
        setName,
        setSurname,
        setIsAlive,
        setDescription,
        setMother,
        setFather,
        setPhoneNumber,
        setEmailAddress,
        setResidencePlace,
        setGraveId,
        setGender,
        setCreationDate,
    ]);

    const events = lifeEvents.map((lifeEvent, index) => (
        <LifeEventSection
            key={index}
            type={lifeEvent.type}
            date={lifeEvent.date}
            info={lifeEvent.info}
            dispatch={dispatchLifeEvents}
            eventIndex={index}
        />
    ));

    const addNextEventHandler = (event) => {
        event.preventDefault();
        dispatchLifeEvents({ type: "add" });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const data = {
            _id: id,
            name,
            surname,
            isAlive,
            gender,
            description,
            mother,
            father,
            children: formData.current.children,
            lifeEvents,
            phoneNumber,
            emailAddress,
            residencePlace,
            graveId,
            creationDate,
        };

        request({
            type: "update",
            source: "people",
            data,
        }).then(() => history.push("/people"));
    };

    const removeHandler = (event) => {
        event.preventDefault();

        if (window.confirm("Czy na pewno usunąć?")) {
            request({
                type: "remove",
                source: "people",
                _id: id,
            }).then(() => history.push("/people"));
        }
    };

    return (
        <form onSubmit={submitHandler}>
            Formularz osoby
            <br />
            <button onClick={removeHandler}>Usuń osobę</button>
            <FormField
                name="name"
                labelText="Imię: "
                input={{ type: "text", ...bindName }}
            />
            <FormField
                name="surname"
                labelText="Nazwisko: "
                input={{ type: "text", ...bindSurname }}
            />
            <FormField
                name="isAlive"
                labelText="Żyjąca: "
                input={{
                    type: "checkbox",
                    ...bindIsAlive,
                    checked: isAlive,
                }}
            />
            <div>
                Płeć:
                <FormField
                    name="gender"
                    labelText="kobieta"
                    input={{
                        type: "radio",
                        value: "w",
                        ...bindGender,
                        checked: gender === "w",
                    }}
                />
                <FormField
                    name="gender"
                    labelText="mężczyzna"
                    input={{
                        type: "radio",
                        value: "m",
                        ...bindGender,
                        checked: gender === "m",
                    }}
                />
            </div>
            <FormField
                name="description"
                labelText="Opis: "
                input={{ type: "textarea", ...bindDescription }}
            />
            <FormField
                name="mother"
                labelText="Matka: "
                input={{ type: "text", ...bindMother }}
            />
            <FormField
                name="father"
                labelText="Ojciec: "
                input={{ type: "text", ...bindFather }}
            />
            <FormField
                name="residencePlace"
                labelText=" Miejsce zamieszkania: "
                input={{ type: "text", ...bindResidencePlace }}
            />
            {isAlive ? (
                <>
                    <FormField
                        name="phoneNumber"
                        labelText="Telefon: "
                        input={{ type: "text", ...bindPhoneNumber }}
                    />
                    <FormField
                        name="emailAddress"
                        labelText="E-mail: "
                        input={{ type: "text", ...bindEmailAddress }}
                    />
                </>
            ) : (
                <FormField
                    name="graveId"
                    labelText="ID cmentarza: "
                    input={{ type: "text", ...bindGraveId }}
                />
            )}
            <button onClick={addNextEventHandler}>
                Dodaj wydarzenie z życia
            </button>
            <div>{events}</div>
            <input type="submit" value="Zapisz" />
        </form>
    );
};

export default PersonForm;
