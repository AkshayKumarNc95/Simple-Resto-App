import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import {withRouter } from 'react-router-dom';
import './Header.css';


class NavBar extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => {
     
        this.setState({ activeItem: name })
        
        if (name  === 'home'){
            this.props.history.push('/')
        }else
        if (name === 'About'){
            this.props.history.push('/About')
        }else{
            this.props.history.push('/help')
        }
    }

    render() {
        const { activeItem } = this.state

        return (
            <div className = 'hdr-seg-out'>
            <Segment inverted >
                <Menu inverted  secondary stackable>
                <Menu.Item>
                    <img src='/logo512.png' alt=""/>
                </Menu.Item>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='About'
                        active={activeItem === 'About'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Help'
                        active={activeItem === 'Help'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </Segment>
            </div>
        )
    }
}


export default withRouter(NavBar); 