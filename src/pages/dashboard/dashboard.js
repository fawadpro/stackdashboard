import React, {Component} from 'react'
import {Segment, Grid} from 'semantic-ui-react'
import IntlMessages from '../../util/intlMessages'

// components
import TopMenu from '../../components/topMenu/topMenu'
import LeftMenu from '../../components/leftMenu/leftMenu'
import MainContainer from '../../pages/mainContainer'
// Style Components
import {PageWrapperStyle} from '../../components/appStyles/appStyles'

class Dashboard extends Component {
    render() {
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
                                <h2>
                                    <IntlMessages id="dashboard.title" />
                                </h2>
                                <p>
                                    <IntlMessages id="dashboard.paragraph" />
                                </p>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </PageWrapperStyle>
            </MainContainer>
            </div>
        )
    }
}

export default Dashboard
