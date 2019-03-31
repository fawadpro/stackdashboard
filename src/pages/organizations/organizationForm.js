import React, {Component, Fragment} from 'react'
import {
    createOrganization,
    getCountries,
    getStates,
    getPartyRoleTypes,
} from '../../actions'
import {TypesStyles, Error} from '../../components/appStyles/appStyles'
import {connect} from 'react-redux'
import {
    Grid,
    Button,
    Input,
    Form,
    Card,
    CardContent,
    FormTextArea,
    Dropdown,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import IntlMessages from '../../util/intlMessages';
import TopMenu from '../../components/topMenu/topMenu'
import LeftMenu from '../../components/leftMenu/leftMenu'
import MainContainer from '../../pages/mainContainer'

class NewOrganization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            primary_phone: '',
            primary_email: '',
            website: '',
            address_line1: '',
            address_line2: '',
            city: '',
            states: null,
            country: null,
            postal_code: '',
            attention: '',
            notes: '',
            venue_code: '',
            description: '',
            account_no: '',
            types: null,
            nameError: '',
            typesError: '',
            countryId: '',
            selectedStates: null,
            statesOptions: null,
            countryOptions: null,
            partyRoleTypesOptions: null,
        }
    }
    validate = () => {
        const {name, types} = this.state
        this.setState({
            nameError:
                name.length > 0
                    ? null
                    : 'Name is required please enter you name',
            typesError: types === null ? 'Select atleas one type' : null,
        })
    }
    componentDidMount() {
        this.props.getCountries()
        this.props.getStates()
        this.props.getPartyRoleTypes()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.handleCountryOptions(nextProps.countries.countries)
            this.handlePartyRoleTypesOtions(
                nextProps.organization.partyRoleTypes
            )
            this.setState({states: nextProps.states.states})
        }
    }
    handlePartyRoleTypesOtions = partyRoleTypes => {
        let partyRoleTypesOptions = []
        if (partyRoleTypes) {
            partyRoleTypesOptions = partyRoleTypes.map((type, index) => {
                return {
                    value: type.id,
                    text: type.name,
                    key: index,
                }
            })
        }
        this.setState({partyRoleTypesOptions})
    }
    handleCountryOptions = countries => {
        let countryOptions = []
        if (countries) {
            countryOptions = countries.map((country, index) => {
                return {
                    value: country.id,
                    text: country.name,
                    key: index,
                }
            })
        }
        this.setState({countryOptions})
    }

    handleStateOptions = selectedStates => {
        let statesOptions = []
        if (selectedStates) {
            statesOptions = selectedStates.map((state, index) => {
                return {
                    value: state.id,
                    text: state.name,
                    key: index,
                }
            })
        }
        this.setState({statesOptions: statesOptions})
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
        this.validate()
    }
    handleStates = countryId => {
        const selectedStates = this.state.states.filter(
            item => item.countryId === countryId
        )
        this.setState({selectedStates})
        this.handleStateOptions(selectedStates)
    }

    handleSelect = (value, key) => {
        this.setState({[key]: value})
        this.validate()
    }
    handleCountry = (value, key) => {
        this.setState({[key]: value})
        this.handleStates(value)
    }

    cancelHandler(){
        window.location.href='/organizations'
    }

    handleSubmit = e => {
        e.preventDefault()
        const data = {
            name: this.state.name,
            primary_phone: this.state.primary_phone,
            primary_email: this.state.primary_email,
            website: this.state.website,
            address_line1: this.state.address_line1,
            address_line2: this.state.address_line2,
            city: this.state.city,
            state: this.state.state,
            postal_code: this.state.postal_code,
            attention: this.state.attention,
            notes: this.state.notes,
            venue_code: this.state.venue_code,
            description: this.state.description,
            account_no: this.state.account_no,
        }
        this.props.createOrganization(data)
    }

    render() {
        const {
            statesOptions,
            countryOptions,
            partyRoleTypesOptions,
        } = this.state

        return (
            <div>
                <TopMenu/>
                <LeftMenu/>
                <MainContainer>
            <Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <Card style={{width: '100%', borderRadius: '0px'}}>
                        <CardContent>
                            <Card.Header className="ui center aligned grid">
                                <IntlMessages id="organizations.create-organization" />
                            </Card.Header>
                        </CardContent>
                        <CardContent>
                            <Grid>
                                <Grid.Row
                                    centered
                                    className="ui middle aligned"
                                >
                                    <Grid.Column width={6}>
                                        <TypesStyles>
                                            <label>
                                                Types
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <div className="types-dropdown">
                                                <Dropdown
                                                    placeholder="Type.."
                                                    fluid
                                                    clearable
                                                    multiple
                                                    selection
                                                    options={
                                                        partyRoleTypesOptions
                                                    }
                                                    onBlur={this.validate}
                                                    onChange={(e, {value}) =>
                                                        this.handleSelect(
                                                            value,
                                                            'types'
                                                        )
                                                    }
                                                />
                                                <Error>
                                                    {this.state.typesError}
                                                </Error>
                                            </div>
                                        </TypesStyles>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Form.Field required>
                                            <label>
                                                <IntlMessages id="organizations.name" />
                                            </label>
                                            <Input
                                                type="text"
                                                onChange={this.handleChange}
                                                placeholder="Name"
                                                name="name"
                                                value={this.state.name}
                                                required
                                                onBlur={this.validate}
                                                // pattern="[A-Za-z]"
                                            />
                                            <Error>
                                                {this.state.nameError}
                                            </Error>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.primary-phone" />
                                            </label>
                                            <Input
                                                placeholder="+92 313 6925118"
                                                name="phone"
                                                // pattern="[789][0-9]{9}"
                                                type="text"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.primary-email" />
                                            </label>
                                            <Input
                                                placeholder="ali@aztekcomputers.com"
                                                name="primary_email"
                                                type="email"
                                                value={this.state.primary_email}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.website" />
                                            </label>
                                            <Input
                                                placeholder=""
                                                type="text"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        {/* Address */}
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.address-line-1" />
                                            </label>
                                            <Input
                                                placeholder="address line 1"
                                                type="text"
                                                name="address_line1"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.address-line-2" />
                                            </label>
                                            <Input
                                                placeholder="address line 2"
                                                type="text"
                                                name="address_line2"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Group>
                                            <Form.Input
                                                placeholder="City"
                                                width={4}
                                                name="city"
                                                value={this.state.city}
                                                required
                                                onChange={this.handleChange}
                                            />
                                            <Dropdown
                                                placeholder="State"
                                                options={statesOptions}
                                                search
                                                selection
                                                onChange={(e, {value}) =>
                                                    this.handleSelect(
                                                        value,
                                                        'state'
                                                    )
                                                }
                                            />
                                            <Form.Input
                                                placeholder="Postal Code"
                                                width={4}
                                                required
                                                type="text"
                                                name="postal_code"
                                                value={this.state.postal_code}
                                                onChange={this.handleChange}
                                            />
                                            <div style={{width: '50%'}}>
                                                <Dropdown
                                                    placeholder="Select Country"
                                                    fluid
                                                    selection
                                                    search
                                                    options={countryOptions}
                                                    onChange={(e, {value}) =>
                                                        this.handleCountry(
                                                            value,
                                                            'country'
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Form.Group>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.attention" />
                                            </label>
                                            <Input
                                                placeholder="Attention"
                                                required
                                                type="text"
                                                name="attention"
                                                value={this.state.attention}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.notes" />
                                            </label>
                                            <Input
                                                placeholder="Notes"
                                                type="text"
                                                name="notes"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Grid.Column>

                                    <Grid.Column width={8}>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.account-number" />
                                            </label>
                                            <Input
                                                placeholder=""
                                                type="text"
                                                pattern="[a-zA-Z0-9 \s]"
                                                name="account_no"
                                                value={this.state.account_no}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.venue-code" />
                                            </label>
                                            <Input
                                                placeholder=""
                                                pattern="[A-Za-z]{3}"
                                                type="text"
                                                name="venue_code"
                                                value={this.state.vanue_code}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.open-date" />
                                            </label>
                                            <Input
                                                placeholder=""
                                                type="date"
                                                name="date"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.website" />
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <Input
                                                placeholder=""
                                                type="text"
                                                name="website"
                                                value={this.state.website}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            {/* <LabelStyle> */}
                                            <label>
                                                <IntlMessages id="organizations.description" />
                                            </label>
                                            {/* </LabelStyle> */}
                                            <FormTextArea
                                                placeholder="Description"
                                                type="text"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.address-line-1" />
                                            </label>
                                            <Input
                                                placeholder="address line 1"
                                                type="text"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.address-line-2" />
                                            </label>
                                            <Input
                                                placeholder="address line 2"
                                                type="text"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Group>
                                            <Form.Input
                                                placeholder="City"
                                                width={4}
                                                type="text"
                                                name="city"
                                                value={this.state.city}
                                                onChange={this.handleChange}
                                            />
                                            <Dropdown
                                                placeholder="State"
                                                options={statesOptions}
                                                selection
                                                search
                                                onChange={(e, {value}) =>
                                                    this.handleSelect(
                                                        value,
                                                        'state'
                                                    )
                                                }
                                            />

                                            <Form.Input
                                                placeholder="Postal Code"
                                                width={4}
                                                type="text"
                                                value={this.state.postal_code}
                                                name="postal_code"
                                                onChange={this.handleChange}
                                            />

                                            <div style={{width: '50%'}}>
                                                <Dropdown
                                                    placeholder="Select Country"
                                                    fluid
                                                    search
                                                    selection
                                                    options={countryOptions}
                                                    onChange={(e, {value}) =>
                                                        this.handleCountry(
                                                            value,
                                                            'country'
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Form.Group>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.attention" />
                                            </label>
                                            <Input
                                                placeholder="Attention"
                                                type="text"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>
                                                <IntlMessages id="organizations.notes" />
                                            </label>
                                            <Input
                                                placeholder=""
                                                type="text"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </CardContent>
                        <CardContent className="ui center aligned grid">
                            <Button type="submit" positive>
                            <IntlMessages id="organizations.create-button" />
                            </Button>
                            <Button type="cancel" onClick={()=>{this.cancelHandler()}}>
                            <IntlMessages id="organizations.cancel-button" />
                            </Button>
                        </CardContent>
                    </Card>
                </Form>
            </Fragment>
            </MainContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        organization: state.organizations,
        countries: state.countries,
        states: state.states,
    }
}
export default connect(
    mapStateToProps,
    {createOrganization, getCountries, getStates, getPartyRoleTypes}
)(NewOrganization)
