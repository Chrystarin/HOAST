import React, { useEffect, useState } from 'react';

import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Card from '../../components/Card/Card.js';
import Menu from '@mui/material/Menu';
import axios from '../../utils/axios';
import NativeSelect from '@mui/material/NativeSelect';
import './Homes.scss'

function Homes() {

  const [homes, setHomes] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };




  useEffect(() => {
		// Retrieves Homes
		const fetchHomes = async () => {
			const response = await axios
				.get(`homes`)
				.then((response) => {
					setHomes(response.data);
				});
		};

    fetchHomes();
	}, []);

  // Returns if member is null
	if (!homes) return <div>Loading...</div>;

  return <>
    <Navbar type="home"/>
    <div id='SectionHolder'>
      <section className='Section'>
        <h3 className='SectionTitleDashboard'> Homes</h3>
        <div className='SectionController'>
          <div id='SearchInput__Container'>
            <SearchInput/>
          </div>
          <Button variant="" startIcon={<FilterAltIcon/>} onClick={(event) => setAnchorEl(event.currentTarget)}>Filter</Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
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
                <Button variant='contained'>Apply</Button>
              </div>
            </div>
          </Menu>












          <Button variant="contained" href='/homes/add'>Add Home</Button>
        </div>

        <div className='SectionList'>

            {(homes.length === 0 )?
                    <p>No homes found!</p>
                :
                <>
                    {homes.length > 0 &&
                        homes.map((home) => {
                        return (
                        <Card 
                            type="Home"
                            key={home.homeId}
                            id={home.homeId}
                            title={home.address.houseName}
                            subTitle1={home.address.houseNumber}
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
