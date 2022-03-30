import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./PersonCard.scss";

import request from "../../helpers/http";

const PersonCard = (props) => {
    const [personData, setPersonData] = useState();

    const {
        match: {
            params: { id },
        },
    } = props;

    const history = useHistory();

    useEffect(() => {
        request({
            type: "getPersonCard",
            source: "people",
            _id: id,
        }).then((data) => setPersonData(data));
    }, [id, props]);

    const navigate = (id) => {
        history.push("/personCard/" + id);
    };


    if (!personData) return null;

    const Field = ({ data: {fullName, _id} }) => (
        <div
            className={`card__field`}
            onClick={() => _id && navigate(_id)}
        >
            {fullName ? <span className="card__button">{fullName}</span> : "-"}
        </div>
    );

    return (
        <div className="card">
            <div className="card__parents">
                <Field data={personData.father} />
                <Field data={personData.mother} />
            </div>
            <div
                className={`card__field`}
            >
                {personData.fullName}<br/>
                *{personData.lifeEvents.find((event)=>event.type==="birth")?.date}<br/>
                +{personData.lifeEvents.find((event)=>event.type==="death")?.date}<br/>
                {personData.description}
            </div>
            <div className="card__children">
                {personData.children.map((childData) =>
                    <Field data={childData} />
                )}
            </div>
        </div>
    );
};

export default PersonCard;
