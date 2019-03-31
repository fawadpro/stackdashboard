import React, {Component} from 'react'
import {
    Segment,
    Grid,
    Form,
    Input,
    Dropdown,
    Select,
    Button,
    TextArea,
    Message,
    Icon,
} from 'semantic-ui-react'
import {injectIntl} from 'react-intl'
import IntlMessages from '../../util/intlMessages'
import {connect} from 'react-redux'
import {getParties, addContact, notificationRemover} from '../../actions'
// Style Components
import {PageWrapperStyle, Error} from '../../components/appStyles/appStyles'

const statusOptions = [
    {key: 'di', value: false, text: 'Disable'},
    {key: 'en', value: true, text: 'Enable'},
]

class ContactForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            organization: '',
            first_name: '',
            firstNameError: '',
            lastNameError: '',
            last_name: '',
            status: '',
            title: '',
            department: '',
            email: '',
            mobile_no: '',
            office_no: '',
            description: '',
            tenantId: null,
            parties: [],
            partyOptions: [],
            loading: false,
        }
    }
    componentDidMount() {
        let filter = {
            where: {
                parentId: null,
            },
        }
        this.props.getParties(filter)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.handlePartyOptions(nextProps.parties.parties)
        }
    }
    handlePartyOptions = parties => {
        let partyOptions = []
        this.setState({parties: parties})
        partyOptions = parties.map((party, index) => {
            return {
                value: party.id,
                text: party.companyName,
                key: index,
            }
        })

        this.setState({partyOptions})
    }
    validate = () => {
        const {first_name, last_name} = this.state
        this.setState({
            firstNameError:
                first_name.length > 0
                    ? null
                    : this.props.intl.messages['contacts.first-name-required'],
            lastNameError:
                last_name.length > 0
                    ? null
                    : this.props.intl.messages['contacts.last-name-required'],
        })
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
        this.validate()
    }
    handleSelect = (value, key) => {
        this.setState({[key]: value})
        if (key === 'organization') {
            const selectedParty = this.state.parties.find(
                item => item.id === value
            )
            if (selectedParty) {
                this.setState({tenantId: selectedParty.tenantId})
            }
        }
        this.validate()
    }
    handleDismiss = () => {
        this.props.notificationRemover()
    }
    handleSubmit = e => {
        e.preventDefault()
        const data = {
            parentId: this.state.organization,
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            active: this.state.status,
            title: this.state.title,
            department: this.state.department,
            mobilePhone: this.state.mobile_no,
            emailAddress: this.state.email,
            officePhone: this.state.office_no,
            description: this.state.description,
            tenantId: this.state.tenantId,
        }
        this.props.addContact(data)
    }

    render() {
        const {notification, contact, parties} = this.props
        const {messages} = this.props.intl
        console.log(this.state)
        return (
            <PageWrapperStyle>
                <Grid columns="equal">
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment padded="very">
                                <Form onSubmit={this.handleSubmit}>
                                    <Grid stackable>
                                        <Grid.Row>
                                            <Grid.Column>
                                                {notification &&
                                                    parties &&
                                                    contact &&
                                                    (parties.loading ||
                                                    contact.loading === true ? (
                                                        <Message icon>
                                                            <Icon
                                                                name="circle notched"
                                                                loading
                                                            />
                                                            <Message.Content>
                                                                <Message.Header>
                                                                    Loading...
                                                                </Message.Header>
                                                            </Message.Content>
                                                        </Message>
                                                    ) : (
                                                        <Message
                                                            onDismiss={
                                                                this
                                                                    .handleDismiss
                                                            }
                                                            color={
                                                                notification.status ===
                                                                'error'
                                                                    ? 'red'
                                                                    : notification.status ===
                                                                      'success'
                                                                    ? 'green'
                                                                    : null
                                                            }
                                                            header={
                                                                notification.header
                                                            }
                                                            list={
                                                                notification.content
                                                            }
                                                        />
                                                    ))}
                                            </Grid.Column>
                                        </Grid.Row>
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
                                                        placeholder={
                                                            messages[
                                                                'placeholder.organization-name'
                                                            ]
                                                        }
                                                        options={
                                                            this.state
                                                                .partyOptions
                                                        }
                                                        onChange={(
                                                            e,
                                                            {value}
                                                        ) =>
                                                            this.handleSelect(
                                                                value,
                                                                'organization'
                                                            )
                                                        }
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
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        onBlur={this.validate}
                                                        placeholder={
                                                            messages[
                                                                'placeholder.first-name'
                                                            ]
                                                        }
                                                        name="first_name"
                                                        value={
                                                            this.state
                                                                .first_name
                                                        }
                                                    />
                                                    <Error>
                                                        {
                                                            this.state
                                                                .firstNameError
                                                        }
                                                    </Error>
                                                </Form.Field>
                                                <Form.Field required>
                                                    <label>
                                                        <IntlMessages id="contacts.last-name" />
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        placeholder={
                                                            messages[
                                                                'placeholder.last-name'
                                                            ]
                                                        }
                                                        name="last_name"
                                                        value={
                                                            this.state.last_name
                                                        }
                                                        onBlur={this.validate}
                                                    />
                                                    <Error>
                                                        {
                                                            this.state
                                                                .lastNameError
                                                        }
                                                    </Error>
                                                </Form.Field>

                                                <Form.Field>
                                                    <label>
                                                        <IntlMessages id="contacts.office#" />
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        placeholder={
                                                            messages[
                                                                'placeholder.office#'
                                                            ]
                                                        }
                                                        name="office_no"
                                                        value={
                                                            this.state.office_no
                                                        }
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>
                                                        <IntlMessages id="contacts.mobile#" />
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        placeholder={
                                                            messages[
                                                                'placeholder.mobile#'
                                                            ]
                                                        }
                                                        name="mobile_no"
                                                        value={
                                                            this.state.mobile_no
                                                        }
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>
                                                        <IntlMessages id="contacts.email" />
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        placeholder={
                                                            messages[
                                                                'placeholder.email'
                                                            ]
                                                        }
                                                        name="email"
                                                        value={this.state.email}
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
                                                        placeholder={
                                                            messages[
                                                                'placeholder.status'
                                                            ]
                                                        }
                                                        name="status"
                                                        onChange={(
                                                            e,
                                                            {value}
                                                        ) =>
                                                            this.handleSelect(
                                                                value,
                                                                'status'
                                                            )
                                                        }
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>
                                                        <IntlMessages id="contacts.title" />
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        placeholder={
                                                            messages[
                                                                'placeholder.title'
                                                            ]
                                                        }
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
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        placeholder={
                                                            messages[
                                                                'placeholder.department'
                                                            ]
                                                        }
                                                        name="department"
                                                        value={
                                                            this.state
                                                                .department
                                                        }
                                                    />
                                                </Form.Field>

                                                <Form.Field>
                                                    <label>
                                                        <IntlMessages id="contacts.description" />
                                                    </label>

                                                    <TextArea
                                                        type="text"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        placeholder={
                                                            messages[
                                                                'placeholder.description'
                                                            ]
                                                        }
                                                        name="description"
                                                        value={
                                                            this.state
                                                                .description
                                                        }
                                                    />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row textAlign="center">
                                            <Grid.Column>
                                                <Button
                                                    type="submit"
                                                    positive
                                                    disabled={
                                                        this.state
                                                            .organization === ''
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <IntlMessages id="contacts.add" />
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </PageWrapperStyle>
        )
    }
}
const mapStateToProps = state => {
    return {
        parties: state.organizations,
        notification: state.notifications.notification,
        contact: state.contacts,
    }
}
export default injectIntl(
    connect(
        mapStateToProps,
        {getParties, addContact, notificationRemover}
    )(ContactForm)
)
