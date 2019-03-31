import React, { Component } from 'react';
import { Segment, Grid, Table, Button, Message } from 'semantic-ui-react';
import IntlMessages from '../../util/intlMessages';
import TopMenu from '../../components/topMenu/topMenu';
import LeftMenu from '../../components/leftMenu/leftMenu';
import MainContainer from '../mainContainer';
import { getSingleContact, getParties } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl } from 'react-intl';
// Style Components
import { PageWrapperStyle } from '../../components/appStyles/appStyles';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getContact();
    this.getOrganization();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
    }
  }
  getContact = () => {
    let filter = {
      where: {
        id: this.props.params.id
      }
    };
    this.props.getSingleContact(filter);
  };
  getOrganization = () => {
    let filter = {
      where: {
        id: this.props.contact.parentId
      }
    };
    this.props.getParties(filter);
  };
  handleEditClick = () => {};
  render() {
    const { contact, organization } = this.props;
    console.log(contact);
    const { messages } = this.props.intl;
    return (
      <PageWrapperStyle>
        <TopMenu />
        <LeftMenu />
        <MainContainer>
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column width={16}>
                <Segment padded="very">
                  {contact.length > 0 && contact[0].parentId !== null ? (
                    contact.map((item, i) => (
                      <div key={i}>
                        <Table basic="very">
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell width={6}>
                                <IntlMessages id="contacts.full-name" />
                              </Table.Cell>
                              <Table.Cell>{item.firstName + ' ' + item.lastName}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <IntlMessages id="contacts.organization-name" />
                              </Table.Cell>
                              {organization.length > 0 ? (
                                <Table.Cell>{organization[0].companyName}</Table.Cell>
                              ) : (
                                <Table.Cell />
                              )}
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <IntlMessages id="contacts.email" />
                              </Table.Cell>
                              <Table.Cell>{item.emailAddress}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <IntlMessages id="contacts.office#" />
                              </Table.Cell>
                              <Table.Cell>{item.officePhone}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <IntlMessages id="contacts.mobile#" />
                              </Table.Cell>
                              <Table.Cell>{item.mobilePhone}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <IntlMessages id="contacts.status" />
                              </Table.Cell>
                              <Table.Cell>{item.status === true ? 'enable' : 'disable'}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <IntlMessages id="contacts.title" />
                              </Table.Cell>
                              <Table.Cell>{item.title}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <IntlMessages id="contacts.department" />
                              </Table.Cell>
                              <Table.Cell>{item.department}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>
                                <IntlMessages id="contacts.description" />
                              </Table.Cell>
                              <Table.Cell>{item.description}</Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                        <Grid centered padded>
                          <Button
                            content={messages['contacts.edit']}
                            icon="edit"
                            labelPosition="left"
                            color="green"
                            as={Link}
                            to={`/contacts/${this.props.params.id}/edit`}
                          />
                        </Grid>
                      </div>
                    ))
                  ) : (
                    <Message
                      error
                      header={messages['contacts.not-found-header']}
                      content={messages['contacts.not-found-content']}
                    />
                  )}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </MainContainer>
      </PageWrapperStyle>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    notification: state.notifications.notification,
    contact: state.contacts.contact,
    organization: state.organizations.parties
  };
};

export default injectIntl(connect(mapStateToProps, { getSingleContact, getParties })(View));
