import React from 'react'
import Signup from './SignUp'
import SignIn from './SignIn'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';




interface AuthState {
    isLogin: boolean
}

type AuthProps = {
    updateToken: (newToken: string) => void
}

export default class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = {
            isLogin: true
        }
    }

    isLoginHandler() {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }

    // toggle = (e: React.SyntheticEvent) => {
    //     e.preventDefault();
    //     if (this.state.isLogin === false) {
    //         return this.setState({
    //             isLogin: true
    //         })
    //     }
    // }

    render() {


        return (
            <div id="register-form">
                <Dialog open={true} id="register-form">
                    <DialogTitle id="form-dialog-title">
                        MashUp
                </DialogTitle>
                    <DialogContent>
                        <SignIn
                            isLogin={this.state.isLogin}
                            isLoginHandler={this.isLoginHandler.bind(this)}
                            updateToken={this.props.updateToken}
                        />
                    </DialogContent>
                    <br />
                    <br />
                    <DialogContent>
                        <Signup
                            isLogin={this.state.isLogin}
                            isLoginHandler={this.isLoginHandler.bind(this)}
                            updateToken={this.props.updateToken}
                        />
                    </DialogContent>
                    <br />
                    <br />
                </Dialog>
            </div>
        )
    }

}