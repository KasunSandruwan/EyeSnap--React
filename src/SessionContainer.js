import React from 'react';
import styled from 'styled-components';

// Material ui imports
import { Grid } from 'material-ui';
import Card, { CardMedia } from 'material-ui/Card';

// Image imports
import sessionHeader from './assets/images/sessionHeader.jpg';
import logo from './assets/images/logoWithText.png';

// Custom styles
const SessionContentContainer = styled.div`
  min-height: 99vh;
  width: 100% !important;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
`;

const SessionCardMedia = styled(CardMedia)`
  position: relative;
`;

const SessionLogoContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  display: flex;
`;

const AppLogo = styled.img`
  width: 56%;
  margin: auto;
`;

const SessionContainer = ({ children, location }) => {
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {
      pathname: location.pathname
    })
  );

  return (
    <SessionContentContainer container>
      <Grid container align="center" direction="column" justify="center">
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <SessionCardMedia image="">
              <img src={sessionHeader} alt="Session header" />
              <SessionLogoContainer>
                <AppLogo src={logo} alt="Logo" />
              </SessionLogoContainer>
            </SessionCardMedia>
            {childrenWithProps}
          </Card>
        </Grid>
      </Grid>
    </SessionContentContainer>
  );
};

export default SessionContainer;
