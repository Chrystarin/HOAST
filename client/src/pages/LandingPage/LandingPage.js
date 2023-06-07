import React from 'react';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import './LandingPage.scss';
import Button from '@mui/material/Button';
import HomeWorkIcon from '@mui/icons-material/HomeWork';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function LandingPage() {
  const element = document.getElementById('section-1');
  
  return (
    <>
      <div id='landingPage'>
        <Header/>
        <div className='SectionHolder'>
          <section className='Section' id='MainSection'>
            <div id='MainSection__Container'>
              <div id='MainSection__About'>
                <h1>Lorem Ipsum</h1>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique!</h4>
                <Button variant="contained">Learn more</Button>
              </div>
            </div>
          </section>
          <section className='Section' id='Section1'>
            <div className='SectionTitleLandingPage' style={{color: "white"}}>
              <h4 >About</h4>
              <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, dolor.</h6>
            </div>
            <div id='Section1__Cards'> 
                <div>
                  <HomeWorkIcon className='Section1__Icon'/>
                  <h4>Lorem Ipsum</h4>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, ipsa nesciunt. Dolorem, soluta eaque. Consequuntur ab ipsa blanditiis iusto fugit.</p>
                </div>
                <div>
                  <HomeWorkIcon className='Section1__Icon'/>
                  <h4>Lorem Ipsum</h4>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, ipsa nesciunt. Dolorem, soluta eaque. Consequuntur ab ipsa blanditiis iusto fugit.</p>
                </div>
                <div>
                  <HomeWorkIcon className='Section1__Icon'/>
                  <h4>Lorem Ipsum</h4>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, ipsa nesciunt. Dolorem, soluta eaque. Consequuntur ab ipsa blanditiis iusto fugit.</p>
                </div>
                <div>
                  <HomeWorkIcon className='Section1__Icon'/>
                  <h4>Lorem Ipsum</h4>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, ipsa nesciunt. Dolorem, soluta eaque. Consequuntur ab ipsa blanditiis iusto fugit.</p>
                </div>
                
              </div>
          </section>
          <section className='Section' id='Section2'>
            <div className='SectionTitleLandingPage'>
              <h4>Frequently Ask Questions</h4>
              <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, dolor.</h6>
            </div>
            <div id='AccordionFAQ'>
              <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Accordion 3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
         

          </section>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default LandingPage;
