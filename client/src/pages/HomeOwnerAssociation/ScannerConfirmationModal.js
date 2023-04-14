import React, { useState } from 'react';
import './ScannerConfirmationModal.scss';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
function ScannerConfirmationModal(props) {
    const [viewMore, setViewMore] = useState(false);
    return <>
        <div id='ConfirmationModal'>
            {props.type==="user"?<>
                <div className='ConfirmationModal__Template' id='ConfirmationModal__User'>
                    <div className='ConfirmationModal__Header'>
                        <Avatar className='ConfirmationModal__Avatar'/>
                        <div className='ConfirmationModal__HeaderInfo'>
                            <h6 className='ConfirmationModal__Title'>Dianne Chrystalin Brandez</h6>
                            <p className="ConfirmationModal__SubTitle">Resident</p>
                        </div>
                    </div>
                    <div className='ConfirmationModal__BodyInfo'>
                            <ul>
                                <li>
                                    <p className='ConfirmationModal__BodyInfo__Title'>Address:</p>
                                    <p className="BodyText3 ConfirmationModal__BodyInfo__Value">#17, Abuab II</p>
                                </li>
                            </ul>
                        </div>
                        <div className='ConfirmationModal__Footer'>
                            <Button variant='contained' onClick={()=>props.close()}>Continue</Button>
                        </div>
                </div>
            </>:<></>}
            {props.type==="visitor"?<>
                <div className='ConfirmationModal__Template' id='ConfirmationModal__User'>
                    <div className='ConfirmationModal__Header'>
                        <div className='ConfirmationModal__HeaderInfo'>
                            <h6 className='ConfirmationModal__Title'>Digi Ann Brandez</h6>
                            <p className="ConfirmationModal__SubTitle">Visitor/s</p>
                        </div>
                    </div>
                    <div className='ConfirmationModal__BodyInfo'>
                        <ul>
                            <li>
                                <p className='ConfirmationModal__BodyInfo__Title'>Arrival Date - Departure Date:</p>
                                <p className="BodyText3 ConfirmationModal__BodyInfo__Value"><span>Jan 1,2023</span> - <span>Jan 6, 2023</span></p>
                            </li>
                            <li className={viewMore?"BodyText3":"BodyText3 ConfirmationModal__BodyInfo__More "}>
                                <p className='ConfirmationModal__BodyInfo__Title'>Note:</p>
                                <p className="ConfirmationModal__BodyInfo__Value">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et voluptates magnam eos explicabo cumque, omnis temporibus, culpa, ad sed voluptatum mollitia reprehenderit ullam. Officia eveniet nihil cupiditate consequatur adipisci!</p>
                            </li>
                            <li className={viewMore?"BodyText3":"BodyText3 ConfirmationModal__BodyInfo__More "}>
                                <p className='ConfirmationModal__BodyInfo__Title'>To Be Visited:</p>
                                <p className="ConfirmationModal__BodyInfo__Value">Dianne Chrystalin Brandez</p>
                            </li>
                            <li className={viewMore?"BodyText3":"BodyText3 ConfirmationModal__BodyInfo__More "}>
                                <p className='ConfirmationModal__BodyInfo__Title'>Address to be visited:</p>
                                <p className="ConfirmationModal__BodyInfo__Value">Abuab II</p>
                            </li>
                        </ul>
                        <Button className='ConfirmationModal__BodyInfo__Button' variant='text' onClick={()=>setViewMore(!viewMore)}>{viewMore?"View Less!":"View More!"}</Button>
                    </div>
                    <div className='ConfirmationModal__Footer'>
                    <Button variant='contained' onClick={()=>props.close()}>Continue</Button>
                    </div>
                </div>
            </>:<></>}
            {props.type==="vehicle"?<>
                <div className='ConfirmationModal__Template' id='ConfirmationModal__User'>
                    <div className='ConfirmationModal__Header'>
                        <div className='ConfirmationModal__HeaderInfo'>
                            <h6 className='ConfirmationModal__Title'>300-2432</h6>
                            <p className="ConfirmationModal__SubTitle">Plate Number</p>
                        </div>
                    </div>
                    <div className='ConfirmationModal__BodyInfo'>
                        <ul>
                            <li>
                                <p className='ConfirmationModal__BodyInfo__Title'>Owner:</p>
                                <p className="BodyText3 ConfirmationModal__BodyInfo__Value">Dianne Chrystalin Brandez</p>
                            </li>
                            <li className={viewMore?"BodyText3":"BodyText3 ConfirmationModal__BodyInfo__More "}>
                                <p className='ConfirmationModal__BodyInfo__Title'>Address:</p>
                                <p className="ConfirmationModal__BodyInfo__Value">Abuab II</p>
                            </li>
                            <li className={viewMore?"BodyText3":"BodyText3 ConfirmationModal__BodyInfo__More "}>
                                <p className='ConfirmationModal__BodyInfo__Title'>Color:</p>
                                <p className="ConfirmationModal__BodyInfo__Value">Black</p>
                            </li>
                            <li className={viewMore?"BodyText3":"BodyText3 ConfirmationModal__BodyInfo__More "}>
                                <p className='ConfirmationModal__BodyInfo__Title'>Model & Brand</p>
                                <p className="ConfirmationModal__BodyInfo__Value">Raptor, Ford</p>
                            </li>
                        </ul>
                        <Button className='ConfirmationModal__BodyInfo__Button' variant='text' onClick={()=>setViewMore(!viewMore)}>{viewMore?"View Less!":"View More!"}</Button>
                    </div>
                    <div className='ConfirmationModal__Footer'>
                        <Button variant='contained' onClick={()=>props.close()}>Continue</Button>
                    </div>
                </div>
            </>:<></>}
            {props.type==="notResident"?<>
                <div className='ConfirmationModal__Template' id='ConfirmationModal__User'>
                    <div className='ConfirmationModal__Header Warning'>
                        <div className='ConfirmationModal__HeaderInfo'>
                            <h6 className='ConfirmationModal__Title'>Not part of the Resident</h6>
                            <p className="ConfirmationModal__SubTitle">QR Code Error</p>
                        </div>
                    </div>
                    <div className='ConfirmationModal__Footer'>
                        <Button variant='contained' onClick={()=>props.close()}>Continue</Button>
                    </div>
                </div>
            </>:<></>}
        </div>
    </>
}

export default ScannerConfirmationModal