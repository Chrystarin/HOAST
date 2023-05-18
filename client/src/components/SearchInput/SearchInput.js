import React,{useState,useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchInput.scss';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchSuggested from './SearchSuggested';
import { getAccordionDetailsUtilityClass } from '@mui/material';



{/* 
    const [data,setData] = useState({});
    const [filterValue,setFilterValue] = useState(
        {
            sortBy:"A_Z"
        }
    );
*/}


{/* 
<div id='SearchInput__Container'>
    <SearchInput setData={setData} data={visitors} keys={["name","visitorId"]} filterValue={filterValue}/>
</div>
<Filter value={filterValue} setValue={setFilterValue}/> 
*/}


function SearchInput(props) {
    const keys = props.keys;
    const [search,setSearch] = useState({
        value:"",
        focus:false,
    })



    useEffect(() => {
        
        // console.log(props.data.map((data)=>crawler(data)))
        props.setData(()=>{
            return sortBy(
                searchData(props.data.map((data)=>crawler(data))),
                props.filterValue.sortBy
            );
        })
        // console.log(sortBy(
        //     searchData(props.data.map((data)=>crawler(data))),
        //     props.filterValue.sortBy
        // ))
        
    }, [search.focus, search.value,props.filterValue]);


    const searchData = (data) => {
        return data.filter(
            (item)=>keys.some((key)=>item[key]?.toString().toLowerCase().includes(search.value.toLowerCase()))
        )
    }


    const crawler = (data, parent)=> Object.entries(data).reduce((data,[key,value])=>{
        if(value instanceof Array) return data;

        key = parent ? `${parent}.${key}`:key;
        if(typeof value === 'object')
            return {
                ... data,...crawler(value,key)
            };
        return {...data,[key]:value};
    },{});
    
    const sortBy = (data,type)=>{
        switch (type) {
            case "A_Z":
                return data.sort((a, b) => a[props.keys[0]] > b[props.keys[0]]?1:-1)
            case "Z_A":
                return data.sort((a, b) => a[props.keys[0]] < b[props.keys[0]]?1:-1)
            case "Recent":
                return data.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt)?1:-1)
            default:
                return data
                break;
        }
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
                    onChange={(e)=> 
                        setSearch(search => ({...search,value: e.target.value})
                    )} 
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