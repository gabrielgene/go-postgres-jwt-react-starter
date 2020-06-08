import React from 'react';
import { withRouter } from 'react-router';
import * as S from './styles';

const Topbar = ({ history, customer, payment }) => {
  return (
    <S.TopBar>
      <S.Button onClick={() => history.push('/customers')}>Customers</S.Button>
      {customer && (
        <S.Button
          data-cy="add-customer"
          onClick={() => history.push('/add/customer')}
        >
          Adicionar Customer
        </S.Button>
      )}
    </S.TopBar>
  );
};

export default withRouter(Topbar);
