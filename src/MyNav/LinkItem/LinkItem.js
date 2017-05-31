import React, { Component } from 'react';
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

class LinkItem extends Component {
    render() {

        
        const name = this.props.link.name;
        const url = this.props.link.url;
        const clicked = this.props.handleClick;
        const activeItem = this.props.activeItem;
        
        return (
            <Menu.Item
                as={Link}
                to={url}
                name={name}
                active={activeItem === name}
                onClick={clicked}
                
            >
                {name}
            </Menu.Item>
        );
    }
}

export default LinkItem;