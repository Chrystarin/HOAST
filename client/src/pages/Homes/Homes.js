import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Card from '../../components/Card/Card.js';
import Menu from '@mui/material/Menu';
import NativeSelect from '@mui/material/NativeSelect';
import './Homes.scss';
import loading from '../../images/loading.gif';

function Homes() {

  const [homes, setHomes] = useState();
  const [data,setData] = useState({});

  // States for popup filter
  const [anchorElFilter, setAnchorElFilter] = React.useState(null);
  const openFilter = Boolean(anchorElFilter);

  
  useEffect(() => {
		// Retrieves Homes
		const fetchHomes = async () => {
			await axios
				.get(`homes`)
				.then((response) => {
					setHomes(response.data);
				});
		};
    fetchHomes();
	}, []);

  // Returns if member is null
	if (!homes) return <>
    <div className='Loading'>
      <img src={loading} alt="" />
      <h3>Loading...</h3>
    </div>
  </>

  return <>
    <Navbar type="home"/>
    <div className='SectionHolder'>
      <section className='Section'>
        <h3 className='SectionTitleDashboard'>Homes</h3>
        <div className='SectionController'>
          <div id='SearchInput__Container'>
            <SearchInput setData={setData} data={homes} keys={["hoa","name","owner.name"]}/>
          </div>
          <Button variant="" startIcon={<FilterAltIcon/>} onClick={(event) => setAnchorElFilter(event.currentTarget)}>Filter</Button>
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
                          <option value={10}>A to Z</option>
                          <option value={20}>Recent Register</option>
                          <option value={30}>More Residents</option>
                      </NativeSelect>
                      </div>
                      </li>
                  </ul>
                  <div className='Filter__Buttons'>
                      <div>
                      <Button variant=''>Reset All</Button>
                      </div>
                      <Button variant=''>Cancel</Button>
                      <Button variant='contained' onClick={() => {setAnchorElFilter(null)}}>Apply</Button>
                  </div>
              </div>
          </Menu>
          <Button variant="contained" href='/homes/add'>Add Home</Button>
        </div>

        <div className='SectionList'>
          
          {(data.length === 0 )?
                  <p>No homes found!</p>
              :
              <>
                  {data.length > 0 &&
                      data.map((home) => {
                      return (
                      <Card 
                          type="Home"
                          key={home.homeId}
                          id={home.homeId}
                          title={home.name}
                          subTitle1={home.address.number}
                          subTitle2={home.address.street}
                          url={`/homes/${home.homeId}`}
                      />
                      );
                  })}
              </>
          }
        </div>
      </section>
    </div>
  </>
}

export default Homes;
