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

    const childElement = (childData) => {
        return <div className="card__children-child" onClick={()=>navigate(childData._id)}>{childData.fullName}</div>;
    };

    if (!personData) return null;

    return (
        <div className="card">
            <div className="card__parents">
                <div className="card__parents-father" onClick={()=>navigate(personData.father._id)}>
                    {personData.father.fullName}
                </div>
                <div className="card__parents-mother" onClick={()=>navigate(personData.mother._id)}>
                    {personData.mother.fullName}
                </div>
            </div>
            <div className="card__person">{personData.fullName}</div>
            <div className="card__children">
                {personData.children.map((childData) =>
                    childElement(childData)
                )}
            </div>
        </div>
    );
};

export default PersonCard;
