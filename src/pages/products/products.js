import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import IntlMessages from '../../util/intlMessages'

// Style Components
import {PageWrapperStyle} from '../../components/appStyles/appStyles'

class Products extends Component {
  render() {
    return (
      <PageWrapperStyle>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
            <h2><IntlMessages id="products.title"/></h2>
              <p><IntlMessages id="products.paragraph"/></p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </PageWrapperStyle>
    );
  }
}

export default Products;
