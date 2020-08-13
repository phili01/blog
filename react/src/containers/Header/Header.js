import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../store/actions/index';

class Header extends Component {
    state = {
    show: false
}
    showCategHandler = () => {
        this.props.onFetchCateg();
        this.setState({show: true})
    }

    categHandler = (categ) => {
        this.props.history.push(`/category/${categ}`)
        this.setState({show: false})
    }

    render() {
       return (
           <header className="site-header">
                <div className="site-header__top">
                   <div className="wrapper">
                        <div className="site-header__top--title">Our blog...</div>
                        <ul className="site-header__top--social">
                            <li>
                                <FontAwesomeIcon 
                                    icon={['fab', 'facebook']} 
                                    className="icon icon__site-header--facebook" />
                            </li>
                            <li>
                                <FontAwesomeIcon 
                                    icon={['fab', 'twitter']} 
                                    className="icon icon__site-header--twitter" />
                            </li>
                            <li>
                                <FontAwesomeIcon 
                                    icon={['fab', 'instagram']} 
                                    className="icon icon__site-header--inst" />
                            </li>
                            <li>
                                <FontAwesomeIcon 
                                    icon={['fas', 'phone']} 
                                    className="icon icon__site-header--git" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="site-header__middle">
                    <div className="wrapper">
                        <div className="site-header__middle--logo">
                                BLOGGERR
                        </div>
                        <input disabled className="site-header__middle--input" type="text" placeholder="search ... "/>
                    </div>
                </div>
                <nav className="site-header__nav">
                   <div className="wrapper">
                       <ul className="site-header__nav--wrapper">
                           <li>
                                <NavLink 
                                    to="/"
                                    activeClassName="site-header__nav--active"
                                    exact>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'home']} />
                                        Home
                                </NavLink>
                           </li>
                           <li>
                                <NavLink 
                                    to="/create"
                                    activeClassName="site-header__nav--active"
                                    exact>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'pen']}/>
                                        Create
                                </NavLink>
                           </li>
                           <li>
                                <NavLink 
                                    to="/category"
                                    activeClassName="site-header__nav--active"
                                    onClick={this.showCategHandler}>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'list']}/>
                                        Category
                                </NavLink>
                                {this.state.show ?(
                                <ul className="site-header__nav--categ">
                                        {this.props.categs && this.props.categs.length > 0  ? this.props.categs.map((categ,index) => (
                                           <li key={index} onClick={this.categHandler.bind(this, categ)}>{categ}</li>
                                        )) : this.props.categErr ? <li>Newtwork Error</li> : <li>Loading .......</li>}
                                </ul>) : null}
                           </li>
                       </ul>
                       </div>
                </nav>
           </header>
       )
    }
}

const mapStateToProps = state => {
    return {
        categs: state.form.categ,
        categErr: state.form.categErr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCateg: () => dispatch(actions.fetchCategInit()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));