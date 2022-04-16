import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import request from "../../helpers/http";

import Table from "../UI/Table";

const CemeteriesList = (props) => {
    const [cemeteriesData, setCemeteriesData] = useState([]);
    const [filter, setFilter] = useState("");
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

    const filteredCemeteriesData = cemeteriesData.filter(
        (cemeteryData) =>
            cemeteryData._id.includes(filter) ||
            cemeteryData.name.toLowerCase().includes(filter.toLowerCase()) ||
            cemeteryData.address.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            Lista cmentarzy<br />
            <input
                type="text"
                placeholder="filtrowanie"
                onChange={(event) => setFilter(event.target.value)}
            />
            <Table
                onAddClick={addCemeteryHandler}
                headers={headers}
                keys={keys}
                data={filteredCemeteriesData}
                detailsAddress="/cemetery/"
            />
        </div>
    );
};

export default CemeteriesList;
