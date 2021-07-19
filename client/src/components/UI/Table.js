import TableRow from "./TableRow";

const Table = (props) => {
    const headers = props.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ));

    const rows = props.data.map((rowData) => (
        <TableRow
            key={rowData._id}
            keys={props.keys}
            data={rowData}
            detailsAddress={props.detailsAddress}
        />
    ));

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <button onClick={props.onAddClick}>Dodaj</button>
                    </th>
                    {headers}
                    <th>ID</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};

export default Table;
