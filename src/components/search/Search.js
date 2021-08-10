import React, {useState, useEffect, useRef} from 'react'
import Item from './Item';
import axios from 'axios'

const INITIAL_STATE ={
    term:'',
};
const Search = () => {
    const [values, setValues] = useState(INITIAL_STATE);
    const [responseData, setResponseData] = useState({});

    const inputRef = useRef()

    useEffect(() => {
       const timerSearch = setTimeout(() =>{
            if(values.term) {
                runSearch(values.term)
            }
        },500);

        return () => {
            clearTimeout(timerSearch);
        }
    }, [values.term]);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = (event) => {
        const {name, value} =  event.target;
        setValues((presvState) => ({...presvState, [name]:value}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        runSearch(values.term)
    }

    const runSearch = (term) => {
        axios
        .get(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
        .then((response) => {
            setResponseData(response.data);
        })
        .catch((error) => {
            console.log('Error', error);
        })
        .finally(() => {
            setValues(INITIAL_STATE);
        });
    };
    return (
        <>
        <form onSubmit={handleSubmit} className='search'> 
            <input 
            ref={inputRef}
                onChange={handleChange}
                type='text' 
                name='term'
                className="search-input" 
                placeholder="Search.." 
                value={values.term}
                />
        </form>
        {responseData.drinks && 
        responseData.drinks.slice(0, 3).map((item) => ( 
            <Item key={item.idDrink} item={item} />
            ))}
        </>
    );
};

export default Search
