import React, { Component } from 'react';
import { Grid, TextArea} from "semantic-ui-react";

class QuestionRow extends Component {

constructor(props) {
    super(props);
    this.state = {        
        content : ""        
    }
}

handleChange = (event) => {
    this.setState({
            content : event.target.value            
        }, () => {
            this.props.getAnswer(this.state.content, this.props.input)
        })  
}

sendAnswers = () => {
    this.props.getAnswer()
}


    render() {
        const question = this.props.question;
        return (            
            <Grid.Row>                                                                                                        
                <Grid.Column textAlign="justified">
                    {question.content}                                                        
                </Grid.Column>                                                   
                <Grid.Column stretched>
                    <TextArea
                        name={"response" + question.id}                                                            
                        key={question.id}
                        autoHeight
                        value={this.state.answer}
                        onChange={this.handleChange}                                                
                    />                                                        
                </Grid.Column>                                                        
            </Grid.Row>
        );
    }
}

export default QuestionRow;