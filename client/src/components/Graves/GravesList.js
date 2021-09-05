import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import request from "../../helpers/http";

import Table from "../UI/Table";

const GravesList = (props) => {
    const [gravesData, setGravesData] = useState([]);
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

    return (
        <div>
            Lista nagrobków
            <Table
                onAddClick={addGraveHandler}
                headers={headers}
                keys={keys}
                data={gravesData}
                detailsAddress="/grave/"
            />
        </div>
    );
};

export default GravesList;
