import React,{useEffect,useState} from 'react'
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import NativeSelect from '@mui/material/NativeSelect';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Filter({setData,data,types}) {
    const [anchorElFilter, setAnchorElFilter] = useState(null);
    const openFilter = Boolean(anchorElFilter);
    
    useEffect(() => {
	}, []);
    const FilterData = () =>{
        types.forEach(element => {
            switch (element) {
                case "A_Z":
                    setData(data.sort((a, b) => a.name > b.name?1:-1))
                    break;
                case "Z_A":
                    setData(data.sort((a, b) => a.name < b.name?1:-1))
                    break;
                case "Recent":
                    setData(data.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt)?1:-1));
                break;
            default:
                break;
                
            }
        });
        
    }
    return <>
    
        <Button 
            variant="" 
            startIcon={<FilterAltIcon/>} 
            onClick={
              (event) => setAnchorElFilter(event.currentTarget)
              
            }>
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
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                        >
                            <option value={"A_Z"}>A to Z</option>
                        </NativeSelect>
                    </div>
                </li>
                    
                    
                </ul>
                <div className='Filter__Buttons'>
                    <div>
                    <Button variant=''>Reset All</Button>
                    </div>
                    <Button variant=''>Cancel</Button>
                    <Button variant='contained' onClick={() => {
                        setAnchorElFilter(null)
                    }}>Apply</Button>
                </div>
            </div>
          </Menu>
    
    </>
}

export default Filter