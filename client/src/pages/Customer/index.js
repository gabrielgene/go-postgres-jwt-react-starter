import React from 'react';
import Paper from '@material-ui/core/Paper';
import OpenMap from './openMap';
import Table from './table';

import Topbar from '../../components/Topbar';
import * as S from './styles';

const Customer = (props) => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    fetch(`http://localhost:8081/customers/${props.match.params.id}`)
      .then((response) => response.json())
      .then((data) => setData(data.customer));
  }, []);

  const { name, email, telephone } = data;
  return (
    <React.Fragment>
      <Topbar payment />
      <S.CustomerWrapper>
        <div style={{ display: 'flex' }}>
          <S.Profile>
            <Paper>
              <OpenMap />
              <S.Info>
                <h1>{name}</h1>
                <h2>{email}</h2>
                <h2>{telephone}</h2>
              </S.Info>
            </Paper>
          </S.Profile>
          <div style={{ padding: 8 }}>
            <Table customerId={props.match.params.id} />
          </div>
        </div>
      </S.CustomerWrapper>
    </React.Fragment>
  );
};

export default Customer;
