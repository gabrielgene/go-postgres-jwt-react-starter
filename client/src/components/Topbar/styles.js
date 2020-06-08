import styled from 'styled-components';
import MUIButton from '@material-ui/core/Button';

export const TopBar = styled.div`
  height: 64px;
  background-color: #97aabd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const Button = styled(MUIButton).attrs({
  variant: 'contained',
  color: 'primary',
})`
  background-color: #8395a4;
  &:hover {
    background-color: #8395a4;
    opacity: 0.5;
  }
`;
