import React from 'react';
import {Menu} from 'semantic-ui-react';

const Header = (props) => <div><span>Welcome {props.username}</span><button onClick={props.handleSignOut}>Signout</button></div>

export default Header;