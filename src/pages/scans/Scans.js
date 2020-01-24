import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import formatDate from 'date-fns/format';

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
import PreviewIcon from 'material-ui-icons/RemoveRedEye';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

import { MenuItem } from 'material-ui/Menu';

import { DangerButton, IDBlock } from '../shared/styles';

import { deleteScan, editScan } from '../../actions';

import { ITEMS_PER_PAGE } from '../../config';

const ScansQuery = gql`
  query Scans($page: Int!, $limit: Int!, $patientID: String, $uploadedBy: String) {
    scans(page: $page, limit: $limit, patientID: $patientID, uploadedBy: $uploadedBy) {
      edges {
        shortID
        patientID
        url
        note
        side
        uploadedBy
        createdAt
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

const ScanPreview = styled.img`
  width: 100%;
  margin-top: 10px;
`;

class Scans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBy: 'patientID',
      searchValue: '',
      alertOpen: false,
      selectedScan: '',
      previewOpen: false,
      previewingScan: '',
      editingScan: '',
      editOpen: false
    };

    this.scansList = this.scansList.bind(this);
    this.updateState = this.updateState.bind(this);
    this.scansTable = this.scansTable.bind(this);
    this.openDeleteScanDialog = this.openDeleteScanDialog.bind(this);
    this.cancelDeleteScan = this.cancelDeleteScan.bind(this);
    this.deleteScan = this.deleteScan.bind(this);
    this.updateScan = this.updateScan.bind(this);
    this.editScan = this.editScan.bind(this);
  }

  componentDidMount() {
    this.props.refetch();
  }

  openDeleteScanDialog(id) {
    this.setState({
      alertOpen: true,
      selectedScan: id
    });
  }

  cancelDeleteScan() {
    this.setState({
      alertOpen: false,
      selectedScan: ''
    });
  }

  updateScan({ key, value }) {
    const { editingScan } = this.state;

    this.setState({
      editingScan: {
        ...editingScan,
        [key]: value
      }
    });
  }

  editScan() {
    const { editingScan } = this.state;

    this.props.editScan({
      scan: editingScan,
      callback: () => {
        this.setState({
          editingScan: '',
          editOpen: false
        });
        this.props.refetch();
      }
    });
  }

  deleteScan() {
    const { selectedScan } = this.state;

    this.props.deleteScan({ shortID: selectedScan, callback: this.props.refetch });

    this.setState({
      alertOpen: false
    });
  }

  scansList() {
    const { scans, loading, error } = this.props;

    if (loading || error || !scans) {
      return <tr />;
    }

    const scansData = scans.edges;

    return scansData.map(scan => (
      <TableRow key={scan.shortID}>
        <TableCell>
          <IDBlock>{scan.shortID}</IDBlock>
        </TableCell>
        <TableCell>
          <IDBlock>{scan.patientID}</IDBlock>
        </TableCell>
        <TableCell>{scan.side}</TableCell>
        <TableCell>{formatDate(scan.createdAt, 'Do of MMMM, YYYY')}</TableCell>
        <TableCell>{scan.uploadedBy}</TableCell>
        <TableCell>{scan.note}</TableCell>
        <TableCell>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              this.setState({
                previewOpen: true,
                previewingScan: scan
              });
            }}
          >
            <PreviewIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              this.openDeleteScanDialog(scan.shortID);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="Edit"
            onClick={() => {
              this.setState({
                editingScan: scan,
                editOpen: true
              });
            }}
          >
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

  scansTable() {
    const { loading, error, scans, goToPage } = this.props;

    if (loading || error || !scans) {
      return (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      );
    }

    const { page, total } = scans.pageInfo;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ScanID</TableCell>
            <TableCell>PatientID</TableCell>
            <TableCell>Eye Side</TableCell>
            <TableCell>Scan Date</TableCell>
            <TableCell>Uploaded By</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{this.scansList()}</TableBody>
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
    const {
      searchBy,
      searchValue,
      alertOpen,
      previewOpen,
      previewingScan,
      editOpen,
      editingScan
    } = this.state;

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
                <MenuItem value="uploadedBy">Uploaded By</MenuItem>
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
          </Toolbar>

          {this.scansTable()}
        </Paper>

        <Dialog open={editOpen} fullWidth>
          <DialogTitle>
            ScanID: <IDBlock>{editingScan.shortID}</IDBlock>
          </DialogTitle>
          <DialogContent>
            <TextField
              value={editingScan.note}
              onChange={(event) => {
                this.updateScan({
                  key: 'note',
                  value: event.target.value
                });
              }}
              required
              id="note"
              label="Note"
              type="text"
              fullWidth
              multiline
              rows={5}
            />

            <br />
            <br />
            <br />

            <FormControl component="fieldset" required>
              <FormLabel component="legend">Side</FormLabel>
              <RadioGroup
                value={editingScan.side}
                onChange={(event, value) => {
                  this.updateScan({
                    key: 'side',
                    value
                  });
                }}
                aria-label="side"
                name="side"
              >
                <FormControlLabel value="left" control={<Radio />} label="Left" />
                <FormControlLabel value="right" control={<Radio />} label="Right" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({
                  editingScan: '',
                  editOpen: false
                });
              }}
              color="primary"
            >
              Close
            </Button>
            <Button raised color="primary" onClick={this.editScan}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={previewOpen}>
          <DialogTitle>PatientID: {previewingScan.patientID}</DialogTitle>
          <DialogContent>
            <DialogContentText>{previewingScan.note}</DialogContentText>
            <ScanPreview src={previewingScan.url} alt="Scan preview" />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({
                  previewingScan: '',
                  previewOpen: false
                });
              }}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={alertOpen}>
          <DialogTitle>Are you sure you want to remove this scan?</DialogTitle>
          <DialogContent />
          <DialogActions>
            <Button onClick={this.cancelDeleteScan} color="primary">
              Cancel
            </Button>
            <DangerButton onClick={this.deleteScan} raised>
              Yes
            </DangerButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const debounceSearch = debounce(({ query, fetchMore, page }) => {
  const variables = {
    page,
    limit: ITEMS_PER_PAGE
  };

  variables[query.searchBy] = query.value;

  fetchMore({
    query: ScansQuery,
    variables,
    updateQuery: (previousResult, { fetchMoreResult }) => ({
      scans: fetchMoreResult.scans
    })
  });
}, 250);

const ScansWithGraphQL = graphql(ScansQuery, {
  options: {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1,
      limit: ITEMS_PER_PAGE
    }
  },
  props({ data: { loading, scans, fetchMore, refetch } }) {
    return {
      loading,
      scans,
      refetch,
      goToPage(page) {
        fetchMore({
          query: ScansQuery,
          variables: {
            page,
            limit: ITEMS_PER_PAGE
          },
          updateQuery: (previousResult, { fetchMoreResult }) => ({
            scans: fetchMoreResult.scans
          })
        });
      },
      search(query) {
        debounceSearch({ query, fetchMore, page: scans.pageInfo.page });
      }
    };
  }
})(Scans);

export default connect(null, {
  deleteScan,
  editScan
})(ScansWithGraphQL);
