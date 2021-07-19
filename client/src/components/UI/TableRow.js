import { Link } from "react-router-dom";

const TableRow = (props) => {
    const idCopyHandler = () => {
        navigator.clipboard.writeText(props.data._id);
    };

    const fields = props.keys.map((key) => (
        <td key={key}>{props.data[key]}</td>
    ));

    return (
        <tr>
            <td>
                <Link to={props.detailsAddress + props.data._id}>
                    Szczegóły
                </Link>
            </td>
            {fields}
            <td className="copyText" onClick={idCopyHandler}>
                {props.data._id}
            </td>
        </tr>
    );
};

export default TableRow;
