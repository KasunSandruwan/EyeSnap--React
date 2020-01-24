import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Material imports
import { IconButton, Badge } from 'material-ui';
import Menu, { MenuItem } from 'material-ui/Menu';
import { MoreVert, Notifications, Person, ExitToApp } from 'material-ui-icons';

import { userLogout } from '../actions';

import defaultAvatar from '../assets/images/doctor-default-avatar.svg';

const NotificationsBadge = styled(Badge)`
  float: right;
`;

const User = styled.div`
  margin-left: 31px;
  margin-right: -7px;
`;

const UserAvatar = styled.img`
  width: 28px;
  border-radius: 50%;
`;

const UserName = styled.span`
  margin-left: 9px;
  margin-top: 5px;
  display: block;
  float: right;
  font-size: 17px;
`;

const MoreIconButton = styled(IconButton)`
  margin-top: -8px;
`;

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      anchorElement: undefined
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu(event) {
    this.setState({ menuOpen: true, anchorElement: event.currentTarget });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    const { menuOpen, anchorElement } = this.state;
    const { user } = this.props;

    return (
      <div>
        <MoreIconButton className="float-right">
          <MoreVert id="user-menu-more-button" onClick={this.openMenu} />

          <Menu
            id="simple-menu"
            anchorEl={anchorElement}
            open={menuOpen}
            onRequestClose={this.closeMenu}
          >
            <MenuItem>
              <Person />&nbsp;&nbsp; Profile
            </MenuItem>
            <MenuItem onClick={this.props.userLogout}>
              <ExitToApp />&nbsp;&nbsp; Logout
            </MenuItem>
          </Menu>
        </MoreIconButton>

        <User className="float-right">
          <UserAvatar src={defaultAvatar} alt="Avatar" />
          <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
        </User>

        <NotificationsBadge badgeContent={132} className="float-right">
          <Notifications />
        </NotificationsBadge>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.session;

  return {
    user
  };
};

export default connect(mapStateToProps, { userLogout })(UserMenu);
