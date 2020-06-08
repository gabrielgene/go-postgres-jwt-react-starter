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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SimpleTable({ customerId }) {
  const classes = useStyles();
  const [payments, setPayments] = React.useState([]);

  console.log(payments);
  React.useEffect(() => {
    fetch(`http://localhost:8081/customers/${customerId}/paymentmethods`)
      .then((response) => response.json())
      .then((data) => setPayments(data.payments));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Card Bin</TableCell>
            <TableCell align="right">E Wallet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.methodType}
              </TableCell>
              <TableCell align="right">{row.nameOnCard}</TableCell>
              <TableCell align="right">{row.cardBin}</TableCell>
              <TableCell align="right">{row.eWallet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
