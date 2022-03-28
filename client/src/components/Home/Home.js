import react, { useEffect, useState } from "react";
import request from "../../helpers/http";

const Home = () => {
    const [summaryData, setSummaryData] = useState();

    useEffect(() => {
        request({
            type: "getSummary",
        }).then((data) => {
            console.log('response', data)
            setSummaryData(data)
        });
    }, []);

    const summary = summaryData ? (
        <>
            <h4>Liczebność tabel</h4>
            <table>
                <tbody>
                    <tr><td>Osoby</td><td>{summaryData.count.people}</td></tr>
                    <tr><td>Nagrobki</td><td>{summaryData.count.graves}</td></tr>
                    <tr><td>Cmentarze</td><td>{summaryData.count.cemeteries}</td></tr>
                </tbody>
            </table>

            <h4>Płcie</h4>
            <table>
                <tbody>
                    <tr><td>Kobiety</td><td>{summaryData.gender.w}</td></tr>
                    <tr><td>Mężczyźni</td><td>{summaryData.gender.m}</td></tr>
                </tbody>
            </table>

            <h4>Powtarzające się nazwiska</h4>
            <table>
                <tbody>
                    <tr><th>Nazwisko</th><th>Ilość wystąpień</th></tr>
                    {summaryData.surnamesCount.map(({surname, count})=><tr key={surname}><td>{surname}</td><td>{count}</td></tr>)}
                </tbody>
            </table>

            <h4>Cmentarze - podsumowanie</h4>
            <table>
                <tbody>
                    <tr><th>Nazwa</th><th>Liczba nagrobków</th><th>Liczba pochowanych</th></tr>
                    {summaryData.cemeteriesSummary.map((cemetery)=><tr key={cemetery.name}><td>{cemetery.name}</td><td>{cemetery.gravesCount}</td><td>{cemetery.buriedCount}</td></tr>)}
                </tbody>
            </table>
        </>
    ) : null;

    return (
        <div>
            <h2>Witaj!</h2>
            {summary}
        </div>
        
    );
};

export default Home;
