import styled from 'styled-components';

// Material ui imports
import { CardActions, CardContent } from 'material-ui/Card';

export const SessionCardContent = styled(CardContent)`
  margin: 0 60px;
  margin-bottom: 32px;

  @media (max-width: 992px) {
    margin: 0 10px !important;
  }
`;

export const SessionCardActions = styled(CardActions)`
  margin: 0 60px;
  margin-bottom: 30px;

  @media (max-width: 992px) {
    margin: 0 10px;
    flex-wrap: wrap;
    height: auto !important;
    padding-top: 6px;

    .login-buttons {
      width: 100%;
    }

    .main-login-button {
      margin-bottom: 10px;
      margin-top: 6px;
    }
  }
`;

export const SessionButtonContainer = styled.div`
  flex: 1 1 auto;
  text-align: right;
`;
