import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import OpenMap from './openMap';
import Table from './table';

import { apiURl } from '../../api';
import Topbar from '../../components/Topbar';
import * as S from './styles';

const Customer = (props) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`${apiURl}/customers/${props.match.params.id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: document.cookie,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data.customer));
  }, []);

  if (data) {
    const { name, email, telephone, Location } = data;
    return (
      <React.Fragment>
        <Topbar payment />
        <S.CustomerWrapper>
          <div style={{ display: 'flex' }}>
            <S.Profile>
              <Paper>
                <OpenMap />
                <S.Info>
                  <Typography variant="h6" gutterBottom>
                    {name}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Email: {email}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Telephone: {telephone}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Country: {Location.country}
                  </Typography>
                </S.Info>
              </Paper>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  style={{ marginTop: 18 }}
                  data-cy="add-payment"
                  onClick={() =>
                    props.history.push('/add/payment', props.match.params.id)
                  }
                >
                  Add Payment
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: 18 }}
                  data-cy="edit-customer"
                  onClick={() => props.history.push('/edit/customer', data)}
                >
                  Edit Customer
                </Button>
              </div>
            </S.Profile>
            <div style={{ padding: 8 }}>
              <Table customerId={props.match.params.id} />
            </div>
          </div>
        </S.CustomerWrapper>
      </React.Fragment>
    );
  }
  return 'Carregando...';
};

export default Customer;
