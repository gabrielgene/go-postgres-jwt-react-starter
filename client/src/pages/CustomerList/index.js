import React from 'react';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Topbar from '../../components/Topbar';

// import * as S from './styles';

const CustomerList = ({ history }) => {
  const [customers, setCustomers] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fetch('http://localhost:8081/customers')
      .then((response) => response.json())
      .then((data) => setCustomers(data.customers));
  }, [open]);

  return (
    <React.Fragment>
      <Topbar customer />
      {customers.length === 0 && 'Você não possui customers'}
      <List component="nav" aria-label="main mailbox folders">
        {customers.map((c) => (
          <ListItem
            button
            divider
            key={c.customerID}
            onClick={() => history.push(`/customer/${c.customerID}`, c)}
          >
            <ListItemAvatar>
              <Avatar alt={c.name}>
                {c.name.substring(0, 2).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={c.name}
              secondary={`${c.telephone} - ${c.email}`}
            />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default CustomerList;
