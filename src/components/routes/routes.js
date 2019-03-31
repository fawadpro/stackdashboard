import React, {Component} from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Components
import Dashboard from './../../pages/dashboard/dashboard'
import Organization from './../../pages/organizations/organizations'
import OrganizationForm from './../../pages/organizations/organizationForm'
import Products from './../../pages/products/products'
import SalesOrder from './../../pages/salesOrders/salesOrders'
import Purchase from './../../pages/purchaseOrders/purchaseOrders'
import Shipments from './../../pages/shipments/shipments'
import Everything from './../../pages/everything/everything'
import Contacts from '../../pages/contacts/contacts'
import ContactForm from '../../pages/contacts/contactForm'
import Report from './../../pages/reports/reports'
import Logout from './../../pages/logout/logout'
import App from './../../../src/App'
import {IntlProvider} from 'react-intl'
import AppLocale from '../../lang'
import {connect} from 'react-redux'
// Routing for pages
class Routes extends Component {
    render() {
        const {locale} = this.props
        const currentAppLocale = AppLocale[locale]
        console.log(currentAppLocale)
        return (
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}
            >
                <Router history={createBrowserHistory}>
                    <Route exact={true} path="/" component={App}/>
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/organizations" exact component={Organization}/>
                        <Route path="/products" exact component={Products} />
                        <Route path="/sales" exact component={SalesOrder} />
                        <Route path="/purchases" exact component={Purchase} />
                        <Route path="/contacts" exact component={Contacts} />
                        <Route path="/shipments" exact component={Shipments} />
                        <Route path="/everything" exact component={Everything} />
                        <Route path="/reports" exact component={Report} />
                        <Route path="/logout" exact component={Logout} />

                    <Route exact path="/organizations/new" component={OrganizationForm}/>
                    <Route exact path="contacts/new" component={ContactForm} />
                </Router>
            </IntlProvider>
        )
    }
}

const mapStateToProps = ({settings}) => {
    const {locale} = settings
    return {locale}
}

export default connect(
    mapStateToProps,
    {}
)(Routes)