import React, { Component } from "react";
import {
  Segment,
  Grid,
  Table,
  Search,
  Button,
  Icon,
  Message
} from "semantic-ui-react";
import { injectIntl } from 'react-intl'
import IntlMessages from "../../util/intlMessages";
import { Link } from "react-router-dom";
import { getParties, searchData } from "../../actions";
import { connect } from "react-redux";

// Style Components
import { PageWrapperStyle } from "../../components/appStyles/appStyles";
import {
  pageSize,
  skipDecrement,
  skipInitial,
} from "../../constants/defaultValues";
import TopMenu from '../../components/topMenu/topMenu'
import LeftMenu from '../../components/leftMenu/leftMenu'
import MainContainer from '../../pages/mainContainer'
class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderData: [],
      Item: pageSize,
      skip: skipInitial,
      data: [],
      filtered: [],
      sortedData: ""
    };
    this.getData = this.getData.bind(this);
    this.btnClick = this.btnClick.bind(this);
    this.prevButton = this.prevButton.bind(this);
    this.getAllSearch = this.getAllSearch.bind(this)
  }

  // React Life cycle methods

  componentDidMount() {
    this.getAllSearch()
  }

  componentWillMount() {
    this.getData();

  }

  // Method for Fetching API Data
  getData() {
    let filter = {
      limit: this.state.Item,
      skip: this.state.skip,
      order: this.state.sortedData,
      where: {
        parentId: null,
      },
    };
    this.props.getParties(filter);
  }

  componentWillReceiveProps(nextProps, renderProps) {
    console.log(nextProps)
    if (nextProps) {
      this.setState({
        data: nextProps.parties,
        renderData: nextProps.renderData
      });
    }
  }
  // Next Button
  btnClick() {
    const Item = this.state.Item;
    const skip = this.state.skip;
    this.setState(
      {
        Item,
        skip: skip + pageSize
      },
      () => this.getData()
    );
  }

  // Prev Button
  prevButton() {
    const skip = this.state.skip;
    this.setState(
      {
        skip: skip - skipDecrement
      },
      () => this.getData()
    );
  }

  getAllSearch() {
    const filter = {
      where:
       {
         parentId: null
         }
      }
    this.props.getParties(filter)
  }

  // Method for handling sort filter
  sortHandler = (val1, val2) => {
    if (this.state.sortedData !== val1) {
      this.setState(
        {
          Item: pageSize,
          skip: skipInitial
        },
        () => {
          this.getData();
        }
      );
    }
    this.setState(
      {
        sortedData: this.state.sortedData === val1 ? val2 : val1
      },
      () => {
        this.getData();
      }
    );
  };

  // Method for Handle Search input
  searchHandler(event) {
    let keyword = event.target.value.toLowerCase();
    let filtered = this.state.renderData.filter(item => {
      return (
        item.companyName.toLowerCase().indexOf(keyword) > -1 ||
        item.primaryPhone.toLowerCase().indexOf(keyword) > -1 ||
        item.emailAddress.toLowerCase().indexOf(keyword) > -1 ||
        item.venueCode.toLowerCase().indexOf(keyword) > -1 ||
        item.website.toLowerCase().indexOf(keyword) > -1 ||
        item.description.toLowerCase().indexOf(keyword) > -1
      );
    });
    console.log(filtered)
    if (keyword === "") {
      filtered = [];
    }

    this.setState({
      filtered
    });
  }

  // Method for rendering data in tabular
  getDataItems(data) {
    return data.map(dataItem => (
      <Table.Row key={dataItem.id}>
        <Table.Cell>{dataItem.companyName}</Table.Cell>
        <Table.Cell>{dataItem.primaryPhone}</Table.Cell>
        <Table.Cell>{dataItem.emailAddress}</Table.Cell>
        <Table.Cell>{dataItem.venueCode}</Table.Cell>
        <Table.Cell>{dataItem.account}</Table.Cell>
        <Table.Cell>{dataItem.openDate}</Table.Cell>
        <Table.Cell>{dataItem.website}</Table.Cell>
        <Table.Cell>{dataItem.description}</Table.Cell>
      </Table.Row>
    ));
  }
  render() {
    const filteredItems = this.getDataItems(this.state.filtered);
    const dataItems = this.getDataItems(this.state.data);
    const { messages } = this.props.intl
    return (
      <div>
        <TopMenu/>
        <LeftMenu/>
        <MainContainer>
      <PageWrapperStyle>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
                <Grid columns="equal">
                  <Grid.Column width={8}>
                    <Search
                      input={{ fluid: true }}
                      onSearchChange={this.searchHandler.bind(this)}
                      placeholder={
                        messages[
                        'organizations.place-holder'
                        ]
                      }
                      showNoResults={false}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Button
                      as={Link}
                      to="/organizations/new"
                      floated="right"
                      icon
                      labelPosition="left"
                      color="green"
                      size="small"
                    >
                      <Icon name="plus" />{" "}
                      <IntlMessages id="organizations.create-organization" />
                    </Button>
                  </Grid.Column>
                </Grid>

                <Table sortable celled fixed>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell
                        onClick={() =>
                          this.sortHandler(
                            "companyName asc",
                            "companyName desc"
                          )
                        }
                      >
                        <IntlMessages id="organizations.name" />
                      </Table.HeaderCell>

                      <Table.HeaderCell
                        onClick={() =>
                          this.sortHandler(
                            "primaryPhone asc",
                            "primaryPhone desc"
                          )
                        }
                      >
                        <IntlMessages id="organizations.primary-phone" />
                      </Table.HeaderCell>

                      <Table.HeaderCell
                        onClick={() =>
                          this.sortHandler(
                            "emailAddress asc",
                            "emailAddress desc"
                          )
                        }
                      >
                        <IntlMessages id="organizations.primary-email" />
                      </Table.HeaderCell>

                      <Table.HeaderCell
                        onClick={() =>
                          this.sortHandler("venueCode asc", "venueCode desc")
                        }
                      >
                        <IntlMessages id="organizations.venue-code" />
                      </Table.HeaderCell>

                      <Table.HeaderCell
                        onClick={() =>
                          this.sortHandler("account asc", "account desc")
                        }
                      >
                        <IntlMessages id="organizations.account-number" />
                      </Table.HeaderCell>

                      <Table.HeaderCell
                        onClick={() =>
                          this.sortHandler("openDate asc", "openDate desc")
                        }
                      >
                        <IntlMessages id="organizations.open-date" />
                      </Table.HeaderCell>

                      <Table.HeaderCell
                        onClick={() =>
                          this.sortHandler("website asc", "website desc")
                        }
                      >
                        <IntlMessages id="organizations.website" />
                      </Table.HeaderCell>

                      <Table.HeaderCell
                        onClick={() =>
                          this.sortHandler(
                            "description asc",
                            "description desc"
                          )
                        }
                      >
                        <IntlMessages id="organizations.description" />
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.state.filtered.length === 0
                      ? dataItems
                      : filteredItems}
                  </Table.Body>
                </Table>
                <Grid>
                  <Grid.Column width={16}>
                    {!this.state.data.length && (
                      <Message negative>
                        <Message.Header>
                          <IntlMessages id="organizations.error-message-title" />{" "}
                        </Message.Header>
                        <p>
                          <IntlMessages id="organizations.error-messsage" />
                        </p>
                      </Message>
                    )}
                  </Grid.Column>
                </Grid>
                <Grid>
                  <Grid.Column>
                    <Button.Group floated="right">
                      <Button
                        onClick={this.prevButton}
                        disabled={!this.state.skip}
                      >
                        <IntlMessages id="organizations.prev-button" />
                      </Button>
                      <Button.Or />
                      <Button
                        positive
                        onClick={this.btnClick}
                        disabled={
                          this.state.skip >= this.state.renderData.length
                        }
                      >
                        <IntlMessages id="organizations.next-button" />
                      </Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </PageWrapperStyle>
      </MainContainer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    parties: state.organizations.parties,
    renderData:state.searchData.searchData
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    { getParties, searchData }
  )(Organization)
)
