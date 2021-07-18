
import TableRow from './TableRow';

const Table = props => {


    const headers = props.headers.map((header, index) => <th key={index}>{header}</th>)
    const rows = props.data.map(rowData => <TableRow key={rowData[2]} data={rowData} />)

    return (
        <table>
            <thead>
                <tr>
                    <th><button onClick={props.onAddClick}>Dodaj</button></th>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default Table;