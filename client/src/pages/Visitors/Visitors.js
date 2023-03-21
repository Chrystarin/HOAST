import React, {useState, useEffect} from 'react'
import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Card from '../../components/Card/Card.js';
import axios from '../../utils/axios';
function Visitors() {

  const [visitors, setVisitors] = useState();

  useEffect(() => {
    // Retrieves Homes
    const fetchVisitors = async () => {
      const response = await axios
        .get(`visitors`)
        .then((response) => {
          setVisitors(response.data);
        });
    };

    fetchVisitors();
  }, []);

  console.log(visitors)

    function createData(name,type,date) {
      return { name, type,date};
    }
    const visitor = [
      { name : 'Jon Angelo Llagas', type : 'Single', date : 'March 2 - March 5'},
      { name : 'Gian, Mary, John, D...', type : 'Multiple', date : 'May 7 - May 18'},
      { name : 'Gian, Mary, John, D...', type : 'Multiple', date : 'May 7 - May 18'}
    ];

    return <>
    <Navbar type="visitors"/>
    <div id='SectionHolder'>
      <section className='Section'>
        <h3 className='SectionTitleDashboard'>Visitors</h3>
        <div className='SectionController'>
          <div id='SearchInput__Container'>
            <SearchInput/>
          </div>
          <Button variant="text" startIcon={<FilterAltIcon/>}>Filter</Button>
          <Button variant="contained" href='/visitors/add'>Add Visitors</Button>
        </div>

        <div className='SectionList'>
          {visitor.map((Visitor) => (
            <Card type="Visitor" title={Visitor.name} subTitle1={Visitor.type} subTitle2={Visitor.date} url="/visitors/:id" />
          ))}

          {/* {Visitors.length > 0 && Visitors.map((Visitor) => {
            return (
              <Card type="Visitor" title="Jon Angelo Llagas" subTitle1="Single" subTitle2="March 1 - March 2" url="viewvisitor" />
            )
          })} */}
          
        </div>
      </section>
    </div>
  </>
}

export default Visitors