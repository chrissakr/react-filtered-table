import React, { useState } from 'react';
import './style.css';
import Search from '../search';

const h_reducer = (prev, curr) => [prev, curr];

const setHeaders = ob => {
    return Object.keys(ob)?.map(
        (x, i) => <th key={i}>{ob[x].name}</th>
    )?.reduce(h_reducer);
};

const setContent = ob => {
    if (ob.length === 0) return <></>;
    return ob.map(
        (x, i) => <tr key={'tr_k_'+ i}>{Object.values(x)?.map((x, i) => <td key={i}>{x}</td>)?.reduce(h_reducer)}</tr>
    )?.reduce(h_reducer);
};


function Table(props) {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [data, setData] = useState([{a: 1, b: 2}]);

    if (!dataLoaded) {
        setData(props.data);
        setDataLoaded(true);
    }

    const headers = setHeaders(props.headers);
    const content = setContent(data);

    return (
        <>
            <Search data={props.data} headers={props.headers} setData={setData} />
            <table className="table_component">
                <thead>
                    <tr>{headers}</tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </>
    );
};

export default Table;