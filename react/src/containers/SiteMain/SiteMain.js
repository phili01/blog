import React, { Component } from 'react';
import { withRouter, Switch,Route } from 'react-router-dom';

import Blog from './Blog/Blog';
import Create from './Create/Create';

class SiteMain extends Component {

    render() {

        return (
            <div className="site-main">
            <div className="wrapper">
               <Switch>
                   <Route path="/create" exact component={Create}/>
                   <Route path="/category/:id" exact component={Blog}/>
                   <Blog path="/" component={Blog} />
               </Switch>
            </div>
        </div>
        )
    }
}

export default withRouter(SiteMain); 