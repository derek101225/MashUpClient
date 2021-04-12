import React from 'react'
// import CommentsIndex from '../Comments/CommentsIndex'
import Postindex from '../Post/PostIndex'
import Navbar from '../NavBar/Navbar'


type Props = {
    updateToken: (newToken: string) => void,
    clearToken: () => void,
    token: string,
    
    
}

export default class Home extends React.Component<Props> {
    render() {
        return (
            <div>
                <Navbar clearToken={this.props.clearToken} />
                <Postindex updateToken={this.props.updateToken} clearToken={this.props.clearToken} token={this.props.token} />
                {/* <CommentsIndex comment={this.props.comment}  updateToken={this.props.updateToken} clearToken={this.props.clearToken} token={this.props.token} /> */}
            </div>
        )
    }
}