import React from 'react'
import Button from '@material-ui/core/Button';
import './Navbar.css'

type Props = {
    clearToken: () => void;
}

export default class NavBar extends React.Component<Props> {




    render() {
        return (
            <div>
                <nav id="nav">
                    <h3>MashUp</h3>
                    <Button className='nav-button' id="nav-button" onClick={this.props.clearToken} >Logout</Button>
                </nav>

            </div>
        );
    }
}
