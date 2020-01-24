import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
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
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';

import { MenuItem } from 'material-ui/Menu';

import { DangerButton, IDBlock } from '../shared/styles';

import { deletePatient } from '../../actions';

import { ITEMS_PER_PAGE } from '../../config';

const PatientsQuery = gql`
  query Patients(
    $page: Int!
    $limit: Int!
    $companyShortID: String!
    $patientID: String
    $firstName: String
    $lastName: String
  ) {
    patients(
      page: $page
      limit: $limit
      companyShortID: $companyShortID
      patientID: $patientID
      firstName: $firstName
      lastName: $lastName
    ) {
      edges {
        patientID
        dob
        firstName
        lastName
        gender
        slug
        active
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

const SearchFields = styled.div`
  flex: 1;
`;

const SearchFieldSelect = styled(TextField)`
  min-width: 161px !important;
  margin-right: 8px !important;
`;

class Patients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBy: 'patientID',
      searchValue: '',
      alertOpen: false,
      selectedPatient: ''
    };

    this.patientsList = this.patientsList.bind(this);
    this.updateState = this.updateState.bind(this);
    this.patientsTable = this.patientsTable.bind(this);
    this.openDeletePatientDialog = this.openDeletePatientDialog.bind(this);
    this.cancelDeletePatient = this.cancelDeletePatient.bind(this);
    this.deletePatient = this.deletePatient.bind(this);
  }

  componentDidMount() {
    this.props.refetch();
  }

  openDeletePatientDialog(slug) {
    this.setState({
      alertOpen: true,
      selectedPatient: slug
    });
  }

  cancelDeletePatient() {
    this.setState({
      alertOpen: false,
      selectedPatient: ''
    });
  }

  deletePatient() {
    const { selectedPatient } = this.state;

    this.props.deletePatient({ slug: selectedPatient, callback: this.props.refetch });

    this.setState({
      alertOpen: false
    });
  }

  patientsList() {
    const { patients, loading, error } = this.props;

    if (loading || error || !patients) {
      return <tr />;
    }

    const patientsData = patients.edges;

    return patientsData.map(patient => (
      <TableRow key={patient.slug}>
        <TableCell>
          <IDBlock>{patient.patientID}</IDBlock>
        </TableCell>
        <TableCell>{patient.firstName}</TableCell>
        <TableCell>{patient.lastName}</TableCell>
        <TableCell>{patient.dob}</TableCell>
        <TableCell>{patient.gender}</TableCell>
        <TableCell>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              this.openDeletePatientDialog(patient.slug);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="Edit" component={Link} to={`/patients/${patient.slug}/edit`}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }

  updateState({ key, value }) {
    const newState = {};
    newState[key] = value;

    this.setState(newState);
  }

  patientsTable() {
    const { loading, error, patients, goToPage } = this.props;

    if (loading || error || !patients) {
      return (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      );
    }

    const { page, total } = patients.pageInfo;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>PatientID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{this.patientsList()}</TableBody>
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
    const { search } = this.props;
    const { searchBy, searchValue, alertOpen } = this.state;

    return (
      <div>
        <Paper>
          <Toolbar>
            <SearchFields>
              <SearchFieldSelect
                id="search-field"
                select
                label="Search by"
                value={searchBy}
                margin="normal"
                onChange={(event) => {
                  this.updateState({ key: 'searchBy', value: event.target.value });
                }}
              >
                <MenuItem value="patientID">PatientID</MenuItem>
                <MenuItem value="firstName">First Name</MenuItem>
                <MenuItem value="lastName">Last Name</MenuItem>
              </SearchFieldSelect>
              <TextField
                type="search"
                label="Search"
                margin="normal"
                value={searchValue}
                onChange={(event) => {
                  const value = event.target.value;

                  this.updateState({
                    key: 'searchValue',
                    value
                  });

                  search({
                    searchBy,
                    value
                  });
                }}
              />
            </SearchFields>

            <Button component={Link} to="/patients/add" raised color="primary" dense>
              Add Patient
            </Button>
          </Toolbar>

          {this.patientsTable()}
        </Paper>

        <Dialog open={alertOpen}>
          <DialogTitle>Are you sure you want to remove this patient?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              All the patient records including the scans will be removed from the system.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelDeletePatient} color="primary">
              Cancel
            </Button>
            <DangerButton onClick={this.deletePatient} raised>
              Yes
            </DangerButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userCompany } = state.user;

  return {
    userCompany
  };
};

const debounceSearch = debounce(({ query, fetchMore, page }) => {
  const variables = {
    page,
    limit: ITEMS_PER_PAGE
  };

  variables[query.searchBy] = query.value;

  fetchMore({
    query: PatientsQuery,
    variables,
    updateQuery: (previousResult, { fetchMoreResult }) => ({
      patients: fetchMoreResult.patients
    })
  });
}, 250);

const PatientsWithGraphQL = graphql(PatientsQuery, {
  options(props) {
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        page: 1,
        limit: ITEMS_PER_PAGE,
        companyShortID: props.userCompany.shortID
      }
    };
  },
  props({ ownProps, data: { loading, patients, fetchMore, refetch } }) {
    return {
      loading,
      patients,
      refetch,
      goToPage(page) {
        fetchMore({
          query: PatientsQuery,
          variables: {
            page,
            limit: ITEMS_PER_PAGE,
            companyShortID: ownProps.userCompany.shortID
          },
          updateQuery: (previousResult, { fetchMoreResult }) => ({
            patients: fetchMoreResult.patients
          })
        });
      },
      search(query) {
        debounceSearch({ query, fetchMore, page: patients.pageInfo.page });
      }
    };
  }
})(Patients);

export default connect(mapStateToProps, {
  deletePatient
})(PatientsWithGraphQL);
