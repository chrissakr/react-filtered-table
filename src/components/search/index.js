import React, { useState } from 'react';
import './style.css';

function Search(props) {
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [searchObject, setSearchObject] = useState({});
    const setData = props.setData;
    const data = props.data;
    const headers = props.headers;

    const doSearch = event => {
        let val = event.target.value;
        if (val.length > 2) {
            let newData = props.data.filter(x => Object.entries(x).join(',').indexOf(val) > -1);
            setData(newData);
        } else {
            setData(data);
        }
    };

    const updateSearchObject = event => {
        const key = event.target.getAttribute('ob_key');
        const newSearchObject = Object.assign({}, searchObject);
        newSearchObject[key] = event.target.value;
        setSearchObject(newSearchObject);
    };

    const performAdvancedSearch = () => {
        if (Object.keys(searchObject)?.length > 0) {
            let keys = Object.keys(searchObject).filter(x => searchObject[x] !== '');
            let newData = data.filter(x => {
                let isOk = true;
                for (let i = 0, len = keys.length; i < len; i++) {
                    let key = keys[i];
                    let searchValue = searchObject[key];
                    if (headers[key].exact && x[key] !== searchValue) {
                        isOk = false;
                    } else if (!headers[key].exact && x[key].indexOf(searchValue) === -1) {
                        isOk = false;
                    }
                }

                return isOk;
            });

            setData(newData);
        }
    };

    const resetData = () => setData(data);

    const showFiltering = event => {
        event.preventDefault();
        setAdvancedSearch(!advancedSearch);
    };

    const generateDistinctValues = key => data.map(x => x[key]).sort((a, b) => a < b ? -1 : ( a > b ? 1 : 0)).filter((value, index, self) => self.indexOf(value) === index);

    const generateAdvancedSearch = () => {
        let keys = Object.keys(headers)?.filter(x => headers[x].filterable);

        const keyToJSX = key => {
            let searchForm = <></>;
            if (headers[key].searchType === 'text') {
                searchForm = <input type="text" placeholder={headers[key].name} onKeyUp={updateSearchObject} ob_key={key} />;
            } else if (headers[key].searchType === 'dropdown') {
                let searchOptions = generateDistinctValues(key).map(x => <option value={x} key={x}>{x}</option>);
                searchForm = <select name={headers[key].name} ob_key={key} onChange={updateSearchObject}><option value=""></option>{searchOptions}</select>
            }

            return <div key={'adv_search_div_key_'+key}>{headers[key].name}{searchForm}</div>
        };

        return <>{keys.map(keyToJSX)}</>;
    };

    const searchSwitcher = () => {
        if (advancedSearch) {
            return (
                <>
                    {generateAdvancedSearch()}
                    <div>
                         <button onClick={performAdvancedSearch}>Search</button>
                         <button onClick={resetData}>Reset</button>
                     </div>
                    <a href="#" onClick={showFiltering}>Simple search</a>
                </>
            );
        } else {
            return (
                <>
                    <input type="text" placeholder="Search..." onChange={doSearch} />
                    <a href="#" onClick={showFiltering}>Advanced search</a>
                </>
            );
        }
    };

    return (
        <>
            <div className="table_search">
                {searchSwitcher()}
            </div>
        </>
    );
}

export default Search;