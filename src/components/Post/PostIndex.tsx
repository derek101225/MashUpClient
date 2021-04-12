import React from 'react'
import CommentsIndex from '../Comments/CommentsIndex'
import {Button, TextField, Card, CardContent} from '@material-ui/core';
import '../Post/PostIndex.css'



type Props = {
    updateToken: (newToken: string) => void,
    clearToken: () => void,
    token: string,
    
    
    
}


type State = {
    comment: [],
    commentUpdated: any,
    updateActive: boolean,
    fetchItems: any,
    editComment: any | null,
    isUpdated: boolean,
    deleteComment: any | null,
    content: string,
    editBody: string
}


export default class PostCreate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            content: '',
            comment: [],
            editComment: null,
            commentUpdated: {},
            updateActive: false,
            fetchItems: {},
            isUpdated: false,
            deleteComment: null,
            editBody: ''
        }
        
    }

    onChange(e: any) {
        this.setState(e.target.value)
    }
    // post comments fetch
    handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(this.state)
        
        const url = 'http://localhost:5000/posts/post'

        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }),
            body: JSON.stringify({
                post: {
                    content: this.state.content
                }
            })

        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
            })

        }


        //Call comments to be displayed
        callComments() {
            const url = 'http://localhost:5000/auth/bypost'
    
            fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        comment: data,
                        
                        // id: data.posts.id
                        
                    })
                    
                })
                
        }
    
        componentDidMount() {
            this.callComments()
        }
    //     editComment = (comment: any) => {
    //     this.setState({
    //         editComment: comment.content,
    //         isUpdated: true
    //     })
    // }
    



    ///Delete Post

    deletePost = (comment: any) => { 
        const url = `http://localhost:5000/posts/${comment.id}`
        fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.callComments())
    }

    updateOff = () => {
        this.setState({
            updateActive: false
        })
    }


    //// Edit Post 
    handleCommentUpdate = (comment: any) => { 
            const url = `http://localhost:5000/posts/${comment.id}`
        console.log(this.state.editBody) 
        fetch(url, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }),
            body: JSON.stringify({post: {
                content: this.state.content
            } })
        })
            .then(() => {
                this.updateOff();
                this.callComments();
            })
            
    }

    componentDidUpdate(prevProps: any, editBody:any) {
        if (this.props !== prevProps) {
            this.setState({
                content: this.state.editBody
                
            })
        } console.log(editBody)
    }
   

    
    

    render() {
        return(
            <div className='post'>
                <form onSubmit={this.handleSubmit}>
                    <TextField  type="text" value={this.state.content} onChange={(e) => this.setState({ content: e.currentTarget.value })} placeholder="Body" />
                    <Button id="button" type="submit">Submit Your First Post</Button>
                    
                    
                    
                    {this.state.comment.map((comment: any) => (
                    <Card id="card-comment">  
                    <CardContent><p>Post: </p>{comment.content}</CardContent>

                    <CardContent>
                        <TextField type="text" value={this.state.editBody} onChange={(e) => this.setState({editBody: e.currentTarget.value })} /> 
                    <Button id="button" onClick={() => {this.handleCommentUpdate(comment)}}>Edit Comments</Button>
                    </CardContent>
                    

                    
                    <Button id="button" variant="outlined" onClick={() => { this.deletePost(comment) }}> Delete</Button>
                    </Card>

                    
                    
                    
                ))}
                </form>
                <CommentsIndex comment={this.state.comment}  updateToken={this.props.updateToken} clearToken={this.props.clearToken} token={this.props.token} />
            </div>
            )
        }
        
}


