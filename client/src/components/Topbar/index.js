import React from 'react';
import { withRouter } from 'react-router';
import * as S from './styles';

const Topbar = ({ history, customer, payment }) => {
  return (
    <S.TopBar>
      <S.Button onClick={() => history.push('/')}>Customers</S.Button>
      {customer && (
        <S.Button onClick={() => history.push('/add/customer')}>
          Adicionar Customer
        </S.Button>
      )}
      {payment && (
        <S.Button onClick={() => history.push('/add/customer')}>
          Adicionar Payment
        </S.Button>
      )}
    </S.TopBar>
  );
};

export default withRouter(Topbar);
