import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination
} from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import { DangerButton, IDBlock, SmallDangerButton, SmallButton } from '../shared/styles';

import { removeUserFromCompany, approveJoinRequest, rejectJoinRequest } from '../../actions';

import { ITEMS_PER_PAGE } from '../../config';

const UsersQuery = gql`
  query Users(
    $page: Int!
    $limit: Int!
    $shortID: String
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
  ) {
    users(
      page: $page
      limit: $limit
      shortID: $shortID
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
    ) {
      edges {
        shortID
        firstName
        lastName
        email
        phoneNumber
        userRole
      }
      pageInfo {
        total
        page
        pages
      }
    }
  }
`;

const UserCompanyJoinRequestQuery = gql`
  query UserCompanyJoinRequests(
    $page: Int!
    $limit: Int!
    $shortID: String
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
  ) {
    userCompanyJoinRequests(
      page: $page
      limit: $limit
      shortID: $shortID
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
    ) {
      edges {
        shortID
        firstName
        lastName
        email
        phoneNumber
        companyJoinRequestID
      }
      pageInfo {
        total
        page
        pages
      }
    }
  }
`;

const LoadingContainer = styled(Paper)`
  text-align: center;
  padding: 21px;
`;

const SearchFields = styled.div``;

const SearchFieldSelect = styled(TextField)`
  min-width: 161px !important;
  margin-right: 8px !important;
`;

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersSearchBy: 'shortID',
      userCompanyJoinRequestsSearchBy: 'shortID',
      usersSearchValue: '',
      userCompanyJoinRequestsSearchValue: '',
      alertOpen: false,
      selectedUser: ''
    };

    this.usersList = this.usersList.bind(this);
    this.updateState = this.updateState.bind(this);
    this.usersTable = this.usersTable.bind(this);
    this.openremoveUserFromCompanyDialog = this.openremoveUserFromCompanyDialog.bind(this);
    this.cancelremoveUserFromCompany = this.cancelremoveUserFromCompany.bind(this);
    this.removeUserFromCompany = this.removeUserFromCompany.bind(this);
  }

  componentDidMount() {
    const {
      users,
      userCompanyJoinRequests,
      userRefetch,
      userCompanyJoinRequestsRefetch
    } = this.props;

    if (users && userCompanyJoinRequests) {
      userRefetch();
      userCompanyJoinRequestsRefetch();
    }
  }

  openremoveUserFromCompanyDialog(slug) {
    this.setState({
      alertOpen: true,
      selectedUser: slug
    });
  }

  cancelremoveUserFromCompany() {
    this.setState({
      alertOpen: false,
      selectedUser: ''
    });
  }

  removeUserFromCompany() {
    const { selectedUser } = this.state;
    const { selectedCompany } = this.props;

    this.props.removeUserFromCompany({
      userShortID: selectedUser,
      callback: this.props.refetch,
      companyShortID: selectedCompany.shortID
    });

    this.setState({
      alertOpen: false
    });
  }

  usersList({ type }) {
    const {
      users,
      userCompanyJoinRequests,
      userLoading,
      userCompanyJoinRequestsLoading,
      error,
      userCompanyJoinRequestsRefetch,
      userRefetch
    } = this.props;

    if (type === 'users' && (userLoading || error || !users)) {
      return <tr />;
    } else if (
      type === 'userCompanyJoinRequests' &&
      (userCompanyJoinRequestsLoading || error || !userCompanyJoinRequests)
    ) {
      return <tr />;
    }

    let usersData;

    if (type === 'users') {
      usersData = users.edges;
    } else {
      usersData = userCompanyJoinRequests.edges;
    }

    return usersData.map(user => (
      <TableRow key={user.shortID}>
        <TableCell>
          <IDBlock>{user.shortID}</IDBlock>
        </TableCell>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phoneNumber}</TableCell>
        {type === 'users' && <TableCell>{user.userRole}</TableCell>}
        <TableCell>
          {type === 'users' ? (
            <SmallDangerButton
              raised
              aria-label="Delete"
              onClick={() => {
                this.openremoveUserFromCompanyDialog(user.shortID);
              }}
            >
              Remove from company
            </SmallDangerButton>
          ) : (
            <div>
              <SmallButton
                color="primary"
                raised
                aria-label="Approve"
                onClick={() => {
                  this.props.approveJoinRequest({
                    shortID: user.shortID,
                    companyJoinRequestID: user.companyJoinRequestID,
                    callback: () => {
                      userRefetch();
                      userCompanyJoinRequestsRefetch();
                    }
                  });
                }}
              >
                Approve
              </SmallButton>
              &nbsp;
              <SmallDangerButton
                raised
                aria-label="Reject"
                onClick={() => {
                  this.props.rejectJoinRequest({
                    companyJoinRequestID: user.companyJoinRequestID,
                    callback: () => {
                      userCompanyJoinRequestsRefetch();
                    }
                  });
                }}
              >
                Reject
              </SmallDangerButton>
            </div>
          )}
        </TableCell>
      </TableRow>
    ));
  }

  updateState({ key, value }) {
    const newState = {};
    newState[key] = value;

    this.setState(newState);
  }

  usersTable({ type }) {
    const {
      userLoading,
      userCompanyJoinRequestsLoading,
      error,
      users,
      userCompanyJoinRequests,
      goToPage
    } = this.props;

    let page;
    let total;

    if ((type === 'users' && userLoading) || error || !users) {
      return (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      );
    } else if (
      (type === 'userCompanyJoinRequests' && userCompanyJoinRequestsLoading) ||
      error ||
      !userCompanyJoinRequests
    ) {
      return (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      );
    }

    if (type === 'user') {
      page = users.pageInfo.page;
      total = users.pageInfo.total;
    } else {
      page = userCompanyJoinRequests.pageInfo.page;
      total = userCompanyJoinRequests.pageInfo.total;
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UserID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            {type === 'users' && <TableCell>User Role</TableCell>}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{this.usersList({ type })}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={total}
              page={page - 1}
              rowsPerPageOptions={[ITEMS_PER_PAGE]}
              rowsPerPage={ITEMS_PER_PAGE}
              onChangePage={(event, pageToShow) => {
                goToPage(pageToShow + 1);
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }

  render() {
    const { usersSearch, userCompanyJoinRequestsSearch } = this.props;
    const {
      usersSearchBy,
      userCompanyJoinRequestsSearchBy,
      usersSearchValue,
      userCompanyJoinRequestsSearchValue,
      alertOpen
    } = this.state;

    return (
      <div>
        <Paper>
          <Toolbar>
            <Typography type="title" color="inherit" style={{ flex: 1 }}>
              Users in the company
            </Typography>

            <SearchFields>
              <SearchFieldSelect
                id="search-field"
                select
                label="Search by"
                value={usersSearchBy}
                margin="normal"
                onChange={(event) => {
                  this.updateState({ key: 'usersSearchBy', value: event.target.value });
                }}
              >
                <MenuItem value="shortID">ID</MenuItem>
                <MenuItem value="firstName">First Name</MenuItem>
                <MenuItem value="lastName">Last Name</MenuItem>
                <MenuItem value="email">Eamil</MenuItem>
                <MenuItem value="phoneNumber">Phone Number</MenuItem>
              </SearchFieldSelect>
              <TextField
                type="search"
                label="Search"
                margin="normal"
                value={usersSearchValue}
                onChange={(event) => {
                  const value = event.target.value;

                  this.updateState({
                    key: 'usersSearchValue',
                    value
                  });

                  usersSearch({
                    searchBy: usersSearchBy,
                    value
                  });
                }}
              />
            </SearchFields>
          </Toolbar>

          {this.usersTable({ type: 'users' })}
        </Paper>

        <br />
        <br />

        <Paper>
          <Toolbar>
            <Typography type="title" color="inherit" style={{ flex: 1 }}>
              Requests to join the company
            </Typography>

            <SearchFields>
              <SearchFieldSelect
                id="search-field"
                select
                label="Search by"
                value={userCompanyJoinRequestsSearchBy}
                margin="normal"
                onChange={(event) => {
                  this.updateState({
                    key: 'userCompanyJoinRequestsSearchBy',
                    value: event.target.value
                  });
                }}
              >
                <MenuItem value="shortID">ID</MenuItem>
                <MenuItem value="firstName">First Name</MenuItem>
                <MenuItem value="lastName">Last Name</MenuItem>
                <MenuItem value="email">Eamil</MenuItem>
                <MenuItem value="phoneNumber">Phone Number</MenuItem>
              </SearchFieldSelect>
              <TextField
                type="search"
                label="Search"
                margin="normal"
                value={userCompanyJoinRequestsSearchValue}
                onChange={(event) => {
                  const value = event.target.value;

                  this.updateState({
                    key: 'userCompanyJoinRequestsSearchValue',
                    value
                  });

                  userCompanyJoinRequestsSearch({
                    searchBy: userCompanyJoinRequestsSearchBy,
                    value
                  });
                }}
              />
            </SearchFields>
          </Toolbar>

          {this.usersTable({ type: 'userCompanyJoinRequests' })}
        </Paper>

        <Dialog open={alertOpen}>
          <DialogTitle>Are you sure you want to remove this user from your company?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The user will no longer be able to upload scans to your company.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelremoveUserFromCompany} color="primary">
              Cancel
            </Button>
            <DangerButton onClick={this.removeUserFromCompany} raised>
              Yes
            </DangerButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const debounceSearch = debounce(({ type, query, fetchMore, page }) => {
  const variables = {
    page,
    limit: ITEMS_PER_PAGE
  };

  variables[query.searchBy] = query.value;

  fetchMore({
    query: type === 'users' ? UsersQuery : UserCompanyJoinRequestQuery,
    variables,
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (type === 'users') {
        return {
          users: fetchMoreResult.users
        };
      }
      return {
        userCompanyJoinRequests: fetchMoreResult.userCompanyJoinRequests
      };
    }
  });
}, 250);

const UsersWithGraphQL = compose(
  graphql(UsersQuery, {
    options: {
      notifyOnNetworkStatusChange: true,
      variables: {
        page: 1,
        limit: ITEMS_PER_PAGE
      }
    },
    props({
      data: { loading: userLoading, users, fetchMore: userFetchMore, refetch: userRefetch }
    }) {
      return {
        userLoading,
        users,
        userRefetch,
        usersGoToPage(page) {
          userFetchMore({
            query: UsersQuery,
            variables: {
              page,
              limit: ITEMS_PER_PAGE
            },
            updateQuery: (previousResult, { fetchMoreResult }) => ({
              users: fetchMoreResult.users
            })
          });
        },
        usersSearch(query) {
          debounceSearch({
            type: 'users',
            query,
            fetchMore: userFetchMore,
            page: users.pageInfo.page
          });
        }
      };
    }
  }),
  graphql(UserCompanyJoinRequestQuery, {
    options: {
      notifyOnNetworkStatusChange: true,
      variables: {
        page: 1,
        limit: ITEMS_PER_PAGE
      }
    },
    props({
      data: {
        loading: userCompanyJoinRequestsLoading,
        userCompanyJoinRequests,
        fetchMore: userCompanyJoinRequestsFetchMore,
        refetch: userCompanyJoinRequestsRefetch
      }
    }) {
      return {
        userCompanyJoinRequestsLoading,
        userCompanyJoinRequests,
        userCompanyJoinRequestsRefetch,
        userCompanyJoinRequestsGoToPage(page) {
          userCompanyJoinRequestsFetchMore({
            query: UserCompanyJoinRequestQuery,
            variables: {
              page,
              limit: ITEMS_PER_PAGE
            },
            updateQuery: (previousResult, { fetchMoreResult }) => ({
              userCompanyJoinRequests: fetchMoreResult.userCompanyJoinRequests
            })
          });
        },
        userCompanyJoinRequestsSearch(query) {
          debounceSearch({
            type: 'userCompanyJoinRequests',
            query,
            fetchMore: userCompanyJoinRequestsFetchMore,
            page: userCompanyJoinRequests.pageInfo.page
          });
        }
      };
    }
  })
)(Users);

const mapStateToProps = (state) => {
  const { selectedCompany } = state.user;

  return {
    selectedCompany
  };
};

export default connect(mapStateToProps, {
  removeUserFromCompany,
  approveJoinRequest,
  rejectJoinRequest
})(UsersWithGraphQL);
