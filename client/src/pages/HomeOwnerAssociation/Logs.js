import React,{useState, useEffect} from 'react'
import NavBar from '../../layouts/NavBar';
import './Dashboard.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import SearchInput from '../../components/SearchInput/SearchInput';
import Filter from '../../components/Filter/Filter'
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import loading from '../../images/loading.gif';
import axios from '../../utils/axios';
import TableFooter from '@mui/material/TableFooter';
import SnackbarComp from '../../components/SnackBar/SnackbarComp';
import Pagination from '../../components/Pagination/Pagination';
function Logs() {

    const [logs, setLogs] = useState()
    const [data,setData] = useState({});
    const [paginationData,setPaginationData]=useState({})
    const [filterValue,setFilterValue] = useState(
        {
            sortBy:"A_Z"
        }
    );
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });
    
    // States for popup filter
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const openFilter = Boolean(anchorElFilter);

    // Runs onLoad
	useEffect(() => {
		const fetchLogs = async () => {
			await axios
				.get(`logs`, {
					params: {
						hoaId: localStorage.getItem('hoaId')
					}
				})
				.then((response) => {
					setLogs(response.data);
                    // console.log(response.data);
                    // console.log(Object.keys(response.data[0]));

                    // // get object headers keys
                    // const headers = Object.keys(response.data[0]).toString();
                    // console.log(headers);
                    
                    // // get object values
                    // const main = response.data.map((data) => {
                    //     return Object.values(data).toString();
                    // });
                    // console.log(main);

                    // // combine headers and values
                    // const csv = [headers, ...main].join('\n');
                    // console.log(csv);

                    // downloadCSV(csv);
				});
		};
		fetchLogs();
        console.log("data",data)
	}, [data]);

    // Function for downloading csv
    // function downloadCSV(input) {

    //     // create blob
    //     const blob = new Blob([input], { type: 'application/csv' });
        
    //     // create url
    //     const url = URL.createObjectURL(blob);

    //     document.getElementById('downloadButton').addEventListener('click', () => {
    //          // create link
    //         const link = document.createElement('a');
    //         link.download = 'logs.csv';                     // name of the file
    //         link.href = url;                                // url of the file

    //         // append link to the body
    //         document.body.appendChild(link);

    //         // click the link
    //         link.click();

    //         // remove link from the body
    //         link.remove();
    //         URL.revokeObjectURL(url);                       // free up memory
    //     });
    // }

    function tableToCSV() {
 
        // Variable to store the final csv data
        var csv_data = [];

        // Get each row data
        var rows = document.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {

            // Get each column data
            var cols = rows[i].querySelectorAll('td, th');

            // Stores each csv row data
            var csvrow = [];
            for (var j = 0; j < cols.length; j++) {

                // Get the text data of each cell
                // of a row and push it to csvrow
                csvrow.push(cols[j].innerHTML);
            }

            // Combine each column value with comma
            csv_data.push(csvrow.join(","));
        }

        // Combine each row data with new line character
        csv_data = csv_data.join('\n');

        // Call this function to download csv file 
        downloadCSVFile(csv_data);

    }

    function downloadCSVFile(csv_data) {

        // Create CSV file object and feed
        // our csv_data into it
        const CSVFile = new Blob([csv_data], { type: "application/csv" });

        // Create to temporary link to initiate
        // download process
        var temp_link = document.createElement('a');

        // Download csv file
        temp_link.download = "logs.csv";
        var url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        // Automatically click the link to
        // trigger download
        temp_link.click();
        document.body.removeChild(temp_link);
    }

    if(!logs) return <>
    <div className='Loading'>
        <img src={loading} alt="" />
        <h3>Loading...</h3>
    </div>
  </>

    return <>
        <NavBar/>
        <div className='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="Logs"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Logs</a></span></h3>
                    <div className='SectionController'>
                        <div id='SearchInput__Container'>
                            <SearchInput setData={setData} data={logs} keys={["visitor.name","vehicle.plateNumber","createdAt",'name.firstName','name.lastName']} filterValue={filterValue}/>
                        </div>
                        {/* <Filter value={filterValue} setValue={setFilterValue}/> */}
                        <Button variant="contained" id='downloadButton' 
                        onClick={() => {
                            tableToCSV(); 
                            setOpenSnackBar(openSnackBar => ({
                                ...openSnackBar,
                                open:true,
                                type:'info',
                                note:"CSV Downloading",
                            }));
                        }}
                        >Export to Excel</Button>
                    </div>
                    <div id='Manage__Hoa' className='SectionView'>
                        <div className='SectionView__Content'>
                            <TableContainer component={Paper} >
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell component="th" align='center'><h6>Plate/ID Number</h6></TableCell>
                                            <TableCell component="th" align="center"><h6>Name</h6></TableCell>
                                            <TableCell component="th" align='center'><h6>LogType</h6></TableCell>
                                            <TableCell component="th" align="center"><h6>Timestamp</h6></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {paginationData.length === 0 ? (
													<></>
                                        ) : (
                                            <>
                                                {paginationData.length > 0 &&
                                                    paginationData.map((log) => {
                                                        return (
                                                            <TableRow
                                                                key={log.logId}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row" align='center'>
                                                                    {log.logType === 'user' ? log.user.userId :
                                                                    log.logType === 'vehicle' ? log['vehicle.plateNumber'] :
                                                                    log['visitor.visitorId']}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {log.logType === 'user' ? log['user.name.firstName'] + ' ' + log['user.name.lastName'] :
                                                                    log.logType === 'vehicle' ? log['vehicle.brand']:
                                                                    log['visitor.name']}
                                                                </TableCell>
                                                                <TableCell component="th" scope="row" align='center'>{log.logType} </TableCell>
                                                                <TableCell align="center">{new Date(log.createdAt).getMonth() + " - " + new Date(log.createdAt).getDate()  + " - " + new Date(log.createdAt).getFullYear() + " | " + new Date(log.createdAt).getHours() + ":" + new Date(log.createdAt).getMinutes() + ":" + new Date(log.createdAt).getSeconds()}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                            </>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className='Pagination__Container'>
                                <Pagination data={data} setter={setPaginationData}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <SnackbarComp open={openSnackBar} setter={setOpenSnackBar}/>
        </div>
    </>
}

export default Logs