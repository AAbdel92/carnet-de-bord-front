import React, { Component } from 'react';

class PromoManagementPage extends Component {

    componentWillMount() {
        if (!this.props.loggedIn) {
           this.props.redirect();
        }
    }

    render() {
        return (
            <div>
                PromoManagementPage
            </div>
        );
    }
}

export default PromoManagementPage;