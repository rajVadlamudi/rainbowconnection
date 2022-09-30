//Defines the User View UI
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Dropdown from './Dropdown'
import { useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { StyledTableCell, StyledTableRow, Item } from '../libs/Styles'
import { User, ConnectedUser } from '../libs/Types'
import { useNavigate } from 'react-router-dom';

const UserView = () => {
  let { id } = useParams();
  console.log('id:', id)
  const [userData, setUser] = useState<User | null>(null)
  const [error, setError] = useState({})

  const navigate = useNavigate()

  //fetch user data through API call with user id from params
  useEffect(() => {
    fetch(`http://localhost:8000/api/projects/${id}`)
      .then(response => response.json())
      .then(res => setUser(res as User))
      .catch(err => setError(err))
  }, [])
  console.log('User data', JSON.stringify(userData))

  return (
    <>
      <Stack spacing={2} alignItems='center' justifyContent='center'>
        {/* Title UI component */}
        <Item>
          Rainbow Connection - User View
        </Item>
        <Button onClick={() => { navigate(`/`) }}>
          Close View
        </Button>
        {/* User fullname and favorite color with dropdowm UI component*/}
        {userData != null ? (
          <Item style={{ width: '75%' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Full name</StyledTableCell>
                    <StyledTableCell align="right">Favorite Color</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      <span>{userData.fullname}</span>
                    </StyledTableCell>
                    {/* Dropdown UI component displaying favorite color */}
                    <StyledTableCell align="right">
                      <Dropdown _id={userData._id} fullname={userData.fullname} color={userData.color} connections={userData.connections} />
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        ) : null}
        {userData != null && userData.connections.length>0 ? (
          // Table UI component displaying user connections fullname and favorite color
            <Item>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Connections</StyledTableCell>
                      <StyledTableCell>Favorite Color</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {userData.connections.map((row: ConnectedUser) => (
                      <StyledTableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <StyledTableCell component="th" scope="row">
                          <span>{row.fullname}</span>
                        </StyledTableCell>
                        <StyledTableCell style={{ color: row.color }}>{row.color}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
        ) : null}
      </Stack>
    </>

  );
}

export default UserView;