import React from 'react'

type SignUpFields = {
    // firstName: string,
    // lastName: string,
    username: string,
    password: string,

}

type SignUpProps = {
    isLogin: boolean,
    isLoginHandler: () => void,
    updateToken: (newToken: string) => void
}

export default class SignUp extends React.Component<SignUpProps, SignUpFields>{
    constructor(props: SignUpProps) {
        super(props);
        this.state = {
            // firstName: '',
            // lastName: '',
            username: '',
            password: '',

        }
    }

    onChange(e: any) {
        this.setState(e.target.value)
    }

    validateForm = () => {

    }



    handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(this.state.username)

        const url = 'http://localhost:5000/auth/signup'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({user: {
                 username: this.state.username, password: this.state.password, }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" value={this.state.username} onChange={(e: React.FormEvent<HTMLInputElement>) => this.setState({ username: e.currentTarget.value })} placeholder="username" />
                    <br />
                    <input type="text" value={this.state.password} onChange={(e: React.FormEvent<HTMLInputElement>) => this.setState({ password: e.currentTarget.value })} placeholder="password" /><br />


                    <button id="button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}