import { useEffect, useReducer, useRef } from "react";
import { useInput } from "../../hooks/use-input";
import { useRadio } from "../../hooks/use-radio";
import { useHistory } from "react-router-dom";

import FormField from "../UI/FormField";
import LifeEventSection from "./LifeEventSection";

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
    } = useInput("",true);
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

    const [lifeEvents, dispatchLifeEvents] = useReducer(lifeEventsReducer, []);

    useEffect(() => {
        fetch("http://localhost:4000/person/" + id)
            .then((response) => response.json())
            .then((data) => {
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
                setGender(data.gender);
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
        setGender,
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

    // function handleSubmit(event) {
    //     var data = JSON.stringify(this.state.formData);
    //     fetch("http://localhost:4000/personFormSubmin", {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //         body: data,
    //     }).then(() => this.props.history.push("/peopleList"));

    //     event.preventDefault();
    // }

    const addNextEventHandler = (event) => {
        event.preventDefault();
        dispatchLifeEvents({ type: "add" });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const data = JSON.stringify({
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
        });

        fetch("http://localhost:4000/personFormSubmin", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: data,
        }).then(() => history.push("/peopleList"));

        event.preventDefault();
    };

    const removeHandler = (event) => {
        event.preventDefault();

        if (window.confirm("Czy na pewno usunąć?")) {
            fetch("http://localhost:4000/personRemove", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ _id: id }),
            }).then(() => history.push("/peopleList"));
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
            {isAlive && (
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
                    <FormField
                        name="residencePlace"
                        labelText=" Miejsce zamieszkania: "
                        input={{ type: "text", ...bindResidencePlace }}
                    />
                </>
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
