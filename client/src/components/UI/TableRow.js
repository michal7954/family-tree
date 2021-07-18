import { Link } from "react-router-dom";

const TableRow = props => {

    const length = props.data.length

    const fields = props.data
        .filter((field, index) => index < length - 1)
        .map((field, index) => <td key={index}>{field}</td>)

    return (
        <tr>
            <td><Link to={"/personForm/" + props.data[2]}>Szczegóły</Link></td>
            {fields}
            <td className="copyText" onClick={() => { navigator.clipboard.writeText(props.data[length-1]) }}>{props.data[length-1]}</td>
        </tr>
    )

}

export default TableRow