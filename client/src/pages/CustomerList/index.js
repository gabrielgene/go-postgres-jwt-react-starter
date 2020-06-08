import React from 'react';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Topbar from '../../components/Topbar';
import { apiURl } from '../../api';

const CustomerList = ({ history }) => {
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => {
    fetch(`${apiURl}/customers`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: document.cookie,
      },
    })
      .then((response) =>
        response.status === 401 ? history.push('/') : response.json()
      )
      .then((data) => {
        data && setCustomers(data.customers);
      });
  }, []);

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
              secondary={`${c.telephone} - ${c.email} - ${c.Location.country}`}
            />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default CustomerList;
