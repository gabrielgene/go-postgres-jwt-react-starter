import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import { useFormik } from 'formik';
import { apiURl } from '../../api';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as S from './styles';

const fields = {
  methodType: 'Method Type',
  cardBin: 'Card Bin',
  cardLastFour: 'Card Last Four',
  expiryMonth: 'Expiry Month',
  expiryYear: 'Expiry Year',
  eWallet: 'E Wallet',
  nameOnCard: 'Name On Card',
  country: 'Country',
  latitude: 'Latitude',
  longitude: 'Longitude',
  street1: 'Street',
};

const CustomerAdd = (props) => {
  const customerID = props.location.state;
  const handleClose = () => {
    props.history.push(`/customer/${customerID}`);
  };

  const formik = useFormik({
    initialValues: {
      methodType: '',
      cardBin: '',
      cardLastFour: '',
      expiryMonth: '',
      expiryYear: '',
      eWallet: '',
      nameOnCard: '',
      country: '',
      latitude: '',
      longitude: '',
      street1: '',
    },
    onSubmit: (values) => {
      fetch(`${apiURl}/paymentmethods`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          customerID: parseInt(customerID, 10),
          methodType: values.methodType,
          cardBin: values.cardBin,
          cardLastFour: values.cardLastFour,
          expiryMonth: values.expiryMonth,
          expiryYear: values.expiryYear,
          eWallet: values.eWallet,
          nameOnCard: values.nameOnCard,
          billingAddress: {
            latitude: parseInt(values.latitude, 10),
            longitude: parseInt(values.longitude, 10),
            country: values.country,
            street1: values.street,
          },
          ...values,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: document.cookie,
        },
      }).then(() => handleClose());
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
    handleClose();
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Payment</DialogTitle>
      <DialogContent>
        <S.DialogWrapper>
          {Object.keys(fields).map((k) => (
            <S.TextField
              key={k}
              id={k}
              label={fields[k]}
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values[k]}
            />
          ))}
        </S.DialogWrapper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" data-cy="submit">
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withRouter(CustomerAdd);
