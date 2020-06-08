import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable({ customerId }) {
  const classes = useStyles();
  const [payments, setPayments] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://localhost:8081/customers/${customerId}/paymentmethods`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: document.cookie,
      },
    })
      .then((response) => response.json())
      .then((data) => setPayments(data.payments));
  }, []);

  return (
    <TableContainer style={{ maxHeight: 440 }} component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Method Type</TableCell>
            <TableCell align="right">Name On Card</TableCell>
            <TableCell align="right">Card Bin</TableCell>
            <TableCell align="right">E Wallet</TableCell>
            <TableCell align="right">Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.methodType}
              </TableCell>
              <TableCell align="right">{row.nameOnCard}</TableCell>
              <TableCell align="right">{row.cardBin}</TableCell>
              <TableCell align="right">{row.eWallet}</TableCell>
              <TableCell align="right">{row.BillingAddress.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
