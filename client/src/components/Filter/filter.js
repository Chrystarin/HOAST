import React,{useEffect,useState} from 'react'
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import NativeSelect from '@mui/material/NativeSelect';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Filter(props) {

    
    useEffect(() => {
        // console.log(data)
        // setData(FilterData(data,keys));
        // setData()
        const { data: [data] } = props;

        // console.log(crawlData(data));
    }, [props.data,props.keys])

    


    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const openFilter = Boolean(anchorElFilter);
    
    // const Operation = (data,key)=>{

    //     switch (key) {
    //         case "A_Z":
    //             return data.sort((a, b) => a.name > b.name?1:-1)
    //         case "Z_A":
    //             return data.sort((a, b) => a.name < b.name?1:-1)
    //         case "Recent":
    //             return data.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt)?1:-1)
    //     default:
    //             // setData(data);
    //         break;
    //     }
    //     return "WEW"
    // }

    // const FilterData = (data,keys) =>{
    //     return data.filter(
    //         (item)=>keys.some((key)=>item[key]?.item.sort((a, b) => a.name > b.name?1:-1))
    //     )
    // }

    return <>
        {/* <Button 
            variant="" 
            startIcon={<FilterAltIcon/>} 
            onClick={(event) => setAnchorElFilter(event.currentTarget)}>
                Filter
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorElFilter}
            open={openFilter}
            onClose={() => {
                setAnchorElFilter(null);
            }}
        MenuListProps={{
        'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <div className='Filter'>
                <h6 className='Filter__Title'>Filter</h6>
                <ul>
                    <li>
                        <p className="BodyText3 Filter__Titles">Sort by</p>
                        <div>
                            <NativeSelect
                                defaultValue={null}
                                onChange={(e)=> {
                                        // props.setFilterKeys({...props.filterKeys, ["sortBy"]: e.target.value.toString()})
                                    }
                                }
                                inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                                }}
                            >
                                <option value={""}></option>
                                <option value={"A_Z"}>A to Z</option>
                                <option value={"Z_A"}>Z to A</option>
                                <option value={"Recent"}>Recent</option>
                                
                            </NativeSelect>
                        </div>
                    </li>
                </ul>
                <div className='Filter__Buttons'>
                    <div>
                        <Button variant=''>Reset All</Button>
                    </div>
                    <Button variant=''>Cancel</Button>
                    <Button variant='contained' onClick={()=>{
                        
                        setAnchorElFilter(null);
                    }}>Apply</Button>
                </div>
            </div>
        </Menu> */}
        
        
    
    </>
}

export default Filter