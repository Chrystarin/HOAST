import React,{useState,useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchInput.scss';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchSuggested from './SearchSuggested';
import { getAccordionDetailsUtilityClass } from '@mui/material';
function SearchInput(props) {
    const keys = props.keys;
    const [search,setSearch] = useState({
        value:"",
        focus:false,
    })

    useEffect(() => {
        props.setData(searchData(props.data))
    }, [search.focus, search.value]);


    const searchData = (data) => {
        return data.filter(
            (item)=>keys.some((key)=>item[key]?.toString().toLowerCase().includes(search.value.toLowerCase()))
        )
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
            {
            props.suggested?<>
                {(!search.focus)?"":
                    !search.value?"":<SearchSuggested data={searchData(props.data)}/>
                }
            </>:""
            }
            
        </div>
    </>
}


export default SearchInput