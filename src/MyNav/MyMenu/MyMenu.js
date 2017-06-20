import React, { Component } from 'react';
import { Menu } from "semantic-ui-react";
import LinkItem from "../LinkItem/LinkItem.js";
import axios from "axios";

class MyMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: ""
        }
    }
    componentWillMount() {
        this.setState({
            linksCount: this.props.items.length
        })
    }


    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    loggingOut = (e, { name }) => {
        const self = this;
        this.handleItemClick(e, { name });
        axios.get("/logout")
            .then(function (response) {
                self.props.deleteUser();
            })
    }

    render() {

        const links = this.props.items;
        console.log("My menu links : " + links)
        console.log(Math.floor(16 / (this.state.linksCount + 1)))
        const activeItem = this.state.activeItem;
        return (
            <Menu stackable as="menu" pointing color="red" widths={this.state.linksCount + 1}>
                {links.map(
                    (link, index) => (
                        <LinkItem key={index} link={link} activeItem={activeItem} handleClick={this.handleItemClick} />
                    )
                )}
                <Menu.Item position="right" name='logout' active={activeItem === 'logout'} onClick={this.loggingOut}>
                    Se déconnecter
                    </Menu.Item>
            </Menu>
        );
    }
}

export default MyMenu;