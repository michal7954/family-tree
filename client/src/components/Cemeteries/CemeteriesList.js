import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import request from "../../helpers/http";

import Table from "../UI/Table";

const CemeteriesList = (props) => {
    const [cemeteriesData, setCemeteriesData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        request({
            type: "getAll",
            source: "cemeteries",
        }).then((data) => {
            const transformData = data.map((cemetery) => {
                
                return {
                    name: cemetery.name,
                    address: cemetery.address, 
                    _id: cemetery._id,
                };
            });

            setCemeteriesData(transformData);
        });
    }, []);

    const addCemeteryHandler = async (event) => {
        request({
            type:"create",
            source: "cemeteries"
        }).then((data)=>{
            history.push("/cemetery/" + data._id);
        });

        event.preventDefault();
    };

    const headers = ["Nazwa", "Adres"];
    const keys = ["name", "address"];

    return (
        <div>
            Lista cmentarzy
            <Table
                onAddClick={addCemeteryHandler}
                headers={headers}
                keys={keys}
                data={cemeteriesData}
                detailsAddress="/cemetery/"
            />
        </div>
    );
};

export default CemeteriesList;
