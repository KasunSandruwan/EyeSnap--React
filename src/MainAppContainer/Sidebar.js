import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

// Material imports
import { Drawer, Button, IconButton } from 'material-ui';
import {
  CameraAlt,
  People,
  GpsFixed,
  Hotel,
  Receipt,
  ContentCopy,
  Menu,
  ArrowBack
} from 'material-ui-icons';

import backgroundImage from '../assets/images/background.jpg';
import logoWithText from '../assets/images/logoWithText.png';

const SidebarDrawer = styled(Drawer)`
  div[class*='MuiPaper-root'] {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  }
`;

const SideDrawerContainer = styled.div`
  min-width: 276px;
  min-height: 100%;
`;

const SideDrawerInnerContainer = styled.div`
  background-image: linear-gradient(
    to bottom,
    rgba(23, 82, 188, 0.8),
    rgba(38, 116, 255, 0.8) 52%,
    rgba(77, 135, 238, 0.8)
  );
  min-height: 100%;
  position: absolute;
  padding: 36px;
  box-sizing: border-box;

  h1,
  h2,
  h3,
  p,
  span,
  li {
    color: #fff;
  }

  :before {
    content: '';
    background-image: url(${backgroundImage});
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -33;
    top: 0px;
    left: 0;
    background-position: 0 100%;
  }
`;

const AppLogo = styled.img`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
  padding-bottom: 20px;
  padding: 10px 16px 20px 10px;
  margin-bottom: 10px;
`;

const SidebarButton = styled(Button)`
  background-color: ${(props) => {
    if (props.raised) {
      return '#fff !important';
    }
    return 'transparent';
  }};
  width: 100%;
  margin: 10px 0;
  color: ${(props) => {
    if (props.raised) {
      return '#4f4f4f';
    }
    return '#ffffff';
  }};

  span {
    justify-content: left;
    color: ${(props) => {
    if (props.raised) {
      return '#4f4f4f';
    }
    return '#ffffff';
  }};
  }

  .sidebar-icon {
    width: 21px;
    height: 21px;
  }
`;

const SidebarCloseButton = styled(SidebarButton)`
  border: 1px solid #fff !important;
  height: 20px !important;
  padding-top: 7px !important;

  span {
    font-size: 11px;
    font-weight: 100;
  }
`;

const SidebarOpenButton = styled(IconButton)`
  margin-top: 19px;
  margin-left: 18px;
`;

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: true
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentWillMount() {
    this.setState({
      sidebarOpen: window.innerWidth > 992
    });

    window.onresize = () => {
      this.setState({
        sidebarOpen: window.innerWidth > 992
      });
    };
  }

  toggleSidebar() {
    const { sidebarOpen } = this.state;

    this.setState({
      sidebarOpen: !sidebarOpen
    });
  }

  render() {
    const { sidebarOpen } = this.state;
    const { pathname } = this.props.location;

    return (
      <div
        style={{
          position: 'absolute'
        }}
      >
        <SidebarOpenButton onClick={this.toggleSidebar}>
          <Menu />
        </SidebarOpenButton>

        <SidebarDrawer type="persistent" open={sidebarOpen}>
          <SideDrawerContainer>
            <SideDrawerInnerContainer>
              <Link to="/">
                <AppLogo src={logoWithText} alt="EyeSnap Logo" />
              </Link>

              <SidebarButton component={Link} raised={pathname === '/scans'} to="/scans">
                <CameraAlt className="sidebar-icon" />&nbsp;&nbsp;Scans
              </SidebarButton>
              <SidebarButton component={Link} raised={pathname === '/patients'} to="/patients">
                <People className="sidebar-icon" />&nbsp;&nbsp;Patients
              </SidebarButton>
              <SidebarButton component={Link} raised={pathname === '/users'} to="/users">
                <People className="sidebar-icon" />&nbsp;&nbsp;Users
              </SidebarButton>
              <SidebarButton component={Link} to="/">
                <GpsFixed className="sidebar-icon" />&nbsp;&nbsp;Locations
              </SidebarButton>
              <SidebarButton component={Link} to="/">
                <Hotel className="sidebar-icon" />&nbsp;&nbsp;Company
              </SidebarButton>
              <SidebarButton component={Link} to="/">
                <Receipt className="sidebar-icon" />&nbsp;&nbsp;Billing
              </SidebarButton>
              <SidebarButton component={Link} to="/">
                <ContentCopy className="sidebar-icon" />&nbsp;&nbsp;Compare
              </SidebarButton>

              <MediaQuery maxWidth={992}>
                <br />
                <br />
                <SidebarCloseButton onClick={this.toggleSidebar}>
                  <ArrowBack className="sidebar-icon" />&nbsp;&nbsp;Close
                </SidebarCloseButton>
              </MediaQuery>
            </SideDrawerInnerContainer>
          </SideDrawerContainer>
        </SidebarDrawer>
      </div>
    );
  }
}

export default withRouter(Sidebar);
