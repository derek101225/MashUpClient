import React from 'react'
import {Button, TextField, Card, CardContent} from '@material-ui/core';


type Props = {
    updateToken: (newToken: string) => void,
    clearToken: () => void,
    token: string,
    comment: any,
    
}

type State = {
    comment1: [],
    content: string,
    commentUpdated: any,
    updateActive: boolean,
    fetchItems: any,
    editComment: any | null,
    isUpdated: boolean,
    deleteComment: any | null,
    editBody: string
}

export default class CommentsCreate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            comment1: [],
            content: '',
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
    
        console.log(this.props.comment)
        const url = `http://localhost:5000/comments/comment`

        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }),
            body: JSON.stringify({
                comment: {
                    content: this.state.content,
                    postId: this.props.comment.id
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
            const url = 'http://localhost:5000/auth/bycomment'
    
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
                        comment1: data,
                        
                        // id: data.posts.id
                        
                    })
                    
                })
                
        }
    
        componentDidMount() {
            this.callComments()
        }


         ///Delete Post

    deletePost = (comment1: any) => { 
        const url = `http://localhost:5000/comments/${comment1.id}`
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



    handleCommentUpdate = (comment1: any) => { 
        const url = `http://localhost:5000/posts/${comment1.id}`
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

        render(){
            return(
                <div>
                    <form onSubmit={this.handleSubmit}>
                    <TextField  type="text" value={this.state.content} onChange={(e) => this.setState({ content: e.currentTarget.value })} placeholder="Body" />
                    <Button id="button" type="submit">Submit Your other Post</Button>
                    
                    
                    
                    {this.state.comment1.map((comment1: any) => (
                    <Card id="card-comment">  
                    <CardContent><p>Post: </p>{comment1.content}</CardContent>

                    <CardContent>
                        <TextField type="text" value={this.state.editBody} onChange={(e) => this.setState({editBody: e.currentTarget.value })} /> 
                        <Button id="button" onClick={() => {this.handleCommentUpdate(comment1)}}>Edit Comments</Button>
                    </CardContent>
                    

                    
                    <Button id="button" variant="outlined" onClick={() => { this.deletePost(comment1) }}> Delete</Button>
                    </Card>

                    
                    
                    
                ))}
                </form>

                </div>
            )
        }



}