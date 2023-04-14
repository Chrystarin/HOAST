import React,{useState,useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchInput.scss'
function SearchInput(props) {

    function Search(input, dataSet){
        console.log(input)
        if (input.length) {
            return dataSet.filter((data) => {
                return (data.name).toLowerCase().includes(input.toLowerCase());
            });
        } 
        else {
            return ([]);
        }
    }

    return (
        <div id='SearchInput'>
            <input type="text" onChange={props.onChange} value={props.value} placeholder={props.placeholder}/>
            <SearchIcon/>
        </div>
    )
}

export default SearchInput