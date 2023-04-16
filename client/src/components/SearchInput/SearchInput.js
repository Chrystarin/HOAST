import React,{useState,useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchInput.scss';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchSuggested from './SearchSuggested';
function SearchInput(props) {
    const keys = ["lastname","firstname","email"];
    const [search,setSearch] = useState({
        value:"",
        focus:false
    })

    const users = [
        {id:1,lastname:"Castillo",firstname:"Dianne Chrystarin",middlename:"Manabat"},
        {id:2,lastname:"Castillo",firstname:"Harold James",middlename:"Hipos"},
        {id:3,lastname:"Llagas",firstname:"Jon Angelo",middlename:"Castroverde"},
        {id:4,lastname:"Dela Cruz",firstname:"Gian Carlo",middlename:"Sample"},
        {id:5,lastname:"Embile",firstname:"David Joshua",middlename:"Sample"},
        {id:6,lastname:"Castillo",firstname:"Harrison",middlename:"Hipos"},
        {id:7,lastname:"Castillo",firstname:"Shiba",middlename:"Brandez"},
    ]

    const searchData = (data) => {
        return data.filter(
            (item)=>
                keys.some((key)=>item[key]?.toString().toLowerCase().includes(search.value.toLowerCase()))
        );
    }
    
    return <>
        <div id='SearchInput'>
            <div  id='SearchInput__Container'>
                <label htmlFor="input">
                    <SearchIcon id=""/>
                </label>
                <input 
                    id="input" 
                    type="text" 
                    value={search.value} 
                    onChange={(e)=> setSearch(search => ({...search,value: e.target.value}))} 
                    placeholder={"Search..."} 
                    onFocus={()=>setSearch(search => ({...search,focus: !search.focus}))} 
                    onBlur={()=>setSearch(search => ({...search,focus: !search.focus}))}
                />
                <IconButton aria-label="delete" size="small" onClick={()=>setSearch(search => ({...search,value: ""}))}>
                    <ClearIcon fontSize="small" />
                </IconButton>
            </div>
            {props.suggested?<>
                {(!search.focus)?"":
                    !search.value?"":<SearchSuggested data={searchData(users)}/>
                }
            </>:<></>
            }
            
        </div>
    </>
}

export default SearchInput