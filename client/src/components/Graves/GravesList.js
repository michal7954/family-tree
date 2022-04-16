import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import request from "../../helpers/http";

import Table from "../UI/Table";

const GravesList = (props) => {
    const [gravesData, setGravesData] = useState([]);
    const [filter, setFilter] = useState("");
    const history = useHistory();

    useEffect(() => {
        request({
            type: "getAll",
            source: "graves",
        }).then((data) => {
            const transformData = data.map((grave) => {
                
                return {
                    description: grave.description,
                    cemeteryName: grave.cemeteryName, 
                    _id: grave._id,
                };
            });

            setGravesData(transformData);
        });
    }, []);

    const addGraveHandler = async (event) => {
        request({
            type:"create",
            source: "graves"
        }).then((data)=>{
            history.push("/grave/" + data._id);
        });

        event.preventDefault();
    };

    const headers = ["Nagrobek", "Cmentarz"];
    const keys = ["description", "cemeteryName"];

    const filteredGravesData = gravesData.filter(
        (graveData) =>
            graveData._id.includes(filter) ||
            graveData.cemeteryName.toLowerCase().includes(filter.toLowerCase()) ||
            graveData.description.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            Lista nagrobków<br />
            <input
                type="text"
                placeholder="filtrowanie"
                onChange={(event) => setFilter(event.target.value)}
            />
            <Table
                onAddClick={addGraveHandler}
                headers={headers}
                keys={keys}
                data={filteredGravesData}
                detailsAddress="/grave/"
            />
        </div>
    );
};

export default GravesList;
