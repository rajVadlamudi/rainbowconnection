//Defines the initial view of Rainbow connection
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Stack from '@mui/material/Stack';
import { StyledTableCell, StyledTableRow, Item } from '../libs/Styles'
import { useNavigate } from 'react-router-dom';
import { User, ConnectedUser } from '../libs/Types';
import { LOCAL_HOST, API_ROUTE } from "../utils/config";

//props type for table pagination
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const DEFAULT_ROWS_PER_PAGE: number = 20

//methods to handle pagination
function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  //Pagination UI components displayed at the bottom of the table
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const MainView = () => {
  const [usersData, setUsers] = useState([])
  const [error, setError] = useState({})

  //fetch all users data through API call
  useEffect(() => {
    fetch(`${LOCAL_HOST}${API_ROUTE}`)
      .then(response => response.json())
      .then(res => setUsers(res))
      .catch(err => setError(err))
  }, [])
  console.log('main data', JSON.stringify(usersData))

  const navigate = useNavigate()

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Stack spacing={2} alignItems='center' justifyContent='center'>
      {/* Title UI component */}
      <Item>
        Rainbow Connection - Initial View
      </Item>
      {/* Users count UI component */}
      <Item>
        {`${usersData.length} Users`}
      </Item>
      {/* Table UI component displaying rows of all users */}
      {/* User fullname and 2 connections are clickable and will navigate to user page on click */}
      <Item style={{ width: '75%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Full name</StyledTableCell>
                <StyledTableCell align="right">Favorite Color</StyledTableCell>
                <StyledTableCell align="right">Connections</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? usersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : usersData
              ).map((row: User) => (
                <StyledTableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {/* User fullname clickable and will navigate to user page on click */}
                    <Button onClick={() => { navigate(`/User/${row._id}`) }}>{row.fullname}</Button>
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ color: row.color }}>{row.color}</StyledTableCell>
                  {/* User connections are clickable and will navigate to user page on click */}
                  <StyledTableCell align="right">{row.connections.map((connection: ConnectedUser) => (
                    <Button onClick={() => { navigate(`/User/${connection._id}`) }}>{connection.fullname}</Button>
                  ))}</StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
            {usersData.length > DEFAULT_ROWS_PER_PAGE ? 
              (<TableFooter>
                {/* Pagination UI at the bottom of the table */}
                <StyledTableRow>
                  <TablePagination
                    rowsPerPageOptions={[DEFAULT_ROWS_PER_PAGE, (DEFAULT_ROWS_PER_PAGE * 2), { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={usersData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </StyledTableRow>
              </TableFooter>) : null
            }
          </Table>
        </TableContainer>
      </Item>
    </Stack>
  );
}

export default MainView;


