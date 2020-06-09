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

const addDefaultValues = {
  email: '',
  name: '',
  telephone: '',
  latitude: '',
  longitude: '',
  country: '',
  street: '',
};

const CustomerAdd = (props) => {
  const isEditMode = props.match.path === '/edit/customer';

  const editState = props.location.state;

  const handleClose = () => {
    props.history.push(
      isEditMode ? `/customer/${editState.customerID}` : '/customers'
    );
  };

  const formik = useFormik({
    initialValues: isEditMode
      ? {
          ...editState,
          latitude: editState.Location.latitude,
          longitude: editState.Location.longitude,
          country: editState.Location.country,
          street: editState.Location.street1,
        }
      : addDefaultValues,
    onSubmit: (values) => {
      fetch(`${apiURl}/customers`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          customerID: isEditMode
            ? parseInt(editState.customerID, 10)
            : undefined,
          email: values.email,
          name: values.name,
          telephone: values.telephone,
          location: {
            latitude: parseFloat(values.latitude),
            longitude: parseFloat(values.longitude),
            country: values.country,
            street1: values.street,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: document.cookie,
        },
      });
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
      <DialogTitle id="form-dialog-title">
        {isEditMode ? 'Edit Customer' : 'Add Customer'}
      </DialogTitle>
      <DialogContent>
        <S.DialogWrapper>
          <S.TextField
            autoFocus
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <S.TextField
            id="name"
            label="Nome"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <S.TextField
            id="telephone"
            label="Telefone"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.telephone}
          />
          <S.TextField
            id="latitude"
            label="Latitude"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.latitude}
          />
          <S.TextField
            id="longitude"
            label="Longitude"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.longitude}
          />
          <S.TextField
            id="country"
            label="Country"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.country}
          />
          <S.TextField
            id="street"
            label="Street"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.street}
          />
        </S.DialogWrapper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" data-cy="submit">
          {isEditMode ? 'Editar' : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withRouter(CustomerAdd);
