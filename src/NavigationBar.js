import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import logo from './static/img/logo.png'
import AxiosInstance from './AxiosInstance';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      username: '',
    };

  }

  toggleDropdownOpen = () => {
    this.setState((prevState => (
        {isOpen: !prevState.isOpen})
    ))
  };

  handleLogout = () => {
    this.props.setAuthenticated(false);
  };

  componentDidMount() {
    this._isMounted = true;
    AxiosInstance.get('auth/login')
      .then(
        res => {
          if (this._isMounted) {
            let username = res.data.name ? res.data.name : res.data.preferred_username;
            this.setState({ username: username });
          }
        })
      .catch(
        error => { console.log(error.response) }
      );
  };
  componentWillUnmount() {
    this._isMounted = false;
  };

  render() {
    return (
      <Navbar expand='md'>
        <NavbarBrand href='/'>
          <img
            className='mirantis-logo'
            src={logo}
            alt='Mirantis'
          />
          <h1>TryMCP</h1>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleDropdownOpen}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <svg viewBox='0 0 24 24'>
                  <path
                    d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'
                  />
                </svg>
                {this.state.username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.handleLogout}>
                  <svg
                    viewBox='0 0 24 24'
                    className='logout-icon'
                  >
                    <path
                      d='M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z'
                    />
                  </svg>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
