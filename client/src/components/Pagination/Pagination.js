import React,{useState,useEffect} from 'react'
import PaginationMU from '@mui/material/Pagination';

// const [paginationData,setPaginationData]=useState({})
{/* <Pagination data={data} setter={setPaginationData}/> */}

function Pagination({data,setter}) {
    const [paginationValue, setPaginationValue] = React.useState({
        page:1,
        items: 10,
        count:1,
        show:false
    });
    useEffect(() => {
        if(data.length > 0 ){
            setPaginationValue({ ...paginationValue, count: Math.ceil(data.length / paginationValue.items) });
            Slice(paginationValue);
            // setter( Object.entries(data).slice(0,3))
        }else{
            setter({})
        }
	}, [data, paginationValue.count, paginationValue.page, paginationValue.items]);
    const Slice = (value) =>{
        const startIndex = (value.page - 1) * value.items;
        const endIndex = startIndex + value.items;

        setter(data.slice(startIndex,endIndex))
        // console.log(startIndex + " to " + endIndex)
    }
    return <>{
        <PaginationMU count={paginationValue.count} page={paginationValue.page} onChange={(event,value)=>setPaginationValue({...paginationValue, page: value})}/>
    }
    </>
}

export default Pagination

