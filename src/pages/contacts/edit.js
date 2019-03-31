import React, { Component } from 'react';
import { Segment, Grid, Form, Input, Dropdown, Select, Button, TextArea, Message } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import IntlMessages from '../../util/intlMessages';
import { connect } from 'react-redux';
import { getParties, getSingleContact } from '../../actions';
import TopMenu from '../../components/topMenu/topMenu';
import LeftMenu from '../../components/leftMenu/leftMenu';
import MainContainer from '../mainContainer';
// Style Components
import { PageWrapperStyle } from '../../components/appStyles/appStyles';

const statusOptions = [ { key: 'di', value: false, text: 'Disable' }, { key: 'en', value: true, text: 'Enable' } ];
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: '',
      firstName: '',
      firstNameError: '',
      lastNameError: '',
      lastName: '',
      status: '',
      title: '',
      department: '',
      emailAddress: '',
      mobilePhone: '',
      officePhone: '',
      description: '',
      tenantId: null,
      parties: [],
      partyOptions: [],
      loading: false
    };
  }
  componentDidMount() {
    this.getOrganizations();
    this.getContact();
  }
  getContact = () => {
    let filter = {
      where: {
        id: this.props.params.id
      }
    };
    this.props.getSingleContact(filter);
  };
  getOrganizations = () => {
    let filter = {
      where: {
        parentId: null
      }
    };
    this.props.getParties(filter);
  };
  componentWillReceiveProps(nextProps) {
    this.handlePartyOptions(nextProps.parties);
    if (nextProps.contact.length > 0) {
      console.log(nextProps.contact);

      this.setState({
        organization: nextProps.contact[0].parentId,
        firstName: nextProps.contact[0].firstName,
        lastName: nextProps.contact[0].lastName,
        status: nextProps.contact[0].active,
        title: nextProps.contact[0].title,
        department: nextProps.contact[0].department,
        mobilePhone: nextProps.contact[0].mobilePhone,
        emailAddress: nextProps.contact[0].emailAddress,
        officePhone: nextProps.contact[0].officePhone,
        description: nextProps.contact[0].description
        // tenantId: nextProps.contact[0].tenantId
      });
    }
  }
  handlePartyOptions = (parties) => {
    let partyOptions = [];
    this.setState({ parties: parties });
    partyOptions = parties.map((party, index) => {
      return {
        value: party.id,
        text: party.companyName,
        key: index
      };
    });

    this.setState({ partyOptions });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSelect = (value, key) => {
    this.setState({ [key]: value });
    if (key === 'organization') {
      const selectedParty = this.state.parties.find((item) => item.id === value);
      if (selectedParty) {
        this.setState({ tenantId: selectedParty.tenantId });
      }
    }
  };
  handleDismiss = () => {
    this.props.notificationRemover();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      parentId: this.state.organization,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      active: this.state.status,
      title: this.state.title,
      department: this.state.department,
      mobilePhone: this.state.mobilePhone,
      emailAddressAddress: this.state.emailAddress,
      officePhone: this.state.officePhone,
      description: this.state.description,
      tenantId: this.state.tenantId
    };
  };
  render() {
    const { messages } = this.props.intl;
    const { contact } = this.props;

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
                    <Form onSubmit={this.handleSubmit}>
                      <Grid stackable>
                        <Grid.Row centered>
                          <Grid.Column textAlign="center">
                            <Form.Field inline>
                              <label>
                                <IntlMessages id="contacts.organization-name" />
                              </label>
                              <Dropdown
                                search
                                clearable
                                selection
                                placeholder={messages['placeholder.organization-name']}
                                options={this.state.partyOptions}
                                value={this.state.organization}
                                onChange={(e, { value }) => this.handleSelect(value, 'organization')}
                              />
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <Form.Field required>
                              <label>
                                <IntlMessages id="contacts.first-name" />
                              </label>

                              <Input
                                type="text"
                                onChange={this.handleChange}
                                placeholder={messages['placeholder.first-name']}
                                name="firstName"
                                value={this.state.firstName}
                              />
                            </Form.Field>
                            <Form.Field required>
                              <label>
                                <IntlMessages id="contacts.last-name" />
                              </label>
                              <Input
                                type="text"
                                onChange={this.handleChange}
                                placeholder={messages['placeholder.last-name']}
                                name="lastName"
                                value={this.state.lastName}
                              />
                            </Form.Field>

                            <Form.Field>
                              <label>
                                <IntlMessages id="contacts.office#" />
                              </label>
                              <Input
                                type="text"
                                onChange={this.handleChange}
                                placeholder={messages['placeholder.office#']}
                                name="officePhone"
                                value={this.state.officePhone}
                              />
                            </Form.Field>
                            <Form.Field>
                              <label>
                                <IntlMessages id="contacts.mobile#" />
                              </label>
                              <Input
                                type="text"
                                onChange={this.handleChange}
                                placeholder={messages['placeholder.mobile#']}
                                name="mobilePhone"
                                value={this.state.mobilePhone}
                              />
                            </Form.Field>
                            <Form.Field>
                              <label>
                                <IntlMessages id="contacts.email" />
                              </label>
                              <Input
                                type="text"
                                onChange={this.handleChange}
                                placeholder={messages['placeholder.email']}
                                name="emailAddress"
                                value={this.state.emailAddress}
                                required
                              />
                            </Form.Field>
                          </Grid.Column>

                          <Grid.Column width={8}>
                            <Form.Field>
                              <label>
                                <IntlMessages id="contacts.status" />
                              </label>
                              <Select
                                options={statusOptions}
                                value={this.state.status}
                                placeholder={messages['placeholder.status']}
                                name="status"
                                onChange={(e, { value }) => this.handleSelect(value, 'status')}
                              />
                            </Form.Field>
                            <Form.Field>
                              <label>
                                <IntlMessages id="contacts.title" />
                              </label>
                              <Input
                                type="text"
                                onChange={this.handleChange}
                                placeholder={messages['placeholder.title']}
                                name="title"
                                value={this.state.title}
                              />
                            </Form.Field>
                            <Form.Field>
                              <label>
                                <IntlMessages id="contacts.department" />
                              </label>
                              <Input
                                type="text"
                                onChange={this.handleChange}
                                placeholder={messages['placeholder.department']}
                                name="department"
                                value={this.state.department}
                              />
                            </Form.Field>

                            <Form.Field>
                              <label>
                                <IntlMessages id="contacts.description" />
                              </label>

                              <TextArea
                                type="text"
                                onChange={this.handleChange}
                                placeholder={messages['placeholder.description']}
                                name="description"
                                value={this.state.description}
                              />
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row textAlign="center">
                          <Grid.Column>
                            <Button type="submit" positive disabled={this.state.organization === '' ? true : false}>
                              <IntlMessages id="contacts.update" />
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Form>
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
    parties: state.organizations.parties,
    contact: state.contacts.contact
  };
};
export default injectIntl(connect(mapStateToProps, { getParties, getSingleContact })(Edit));
