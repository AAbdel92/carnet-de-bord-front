import React, { Component } from 'react';
import { Grid, Modal, Card, Divider, Label, Header, Button, Form, TextArea, Container, Segment } from "semantic-ui-react";
import axios from "axios";

class ModalForEditingConclusion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            open: false
        }
    }

    // componentDidUpdate() {
    //     this.state.send &&
    //         this.close();
    // }


    sendConclusion = () => {
        const self = this;
        let conclusion = {
            content: this.state.value,
            diary: {
                id: this.props.diary.id
            },
            user: {
                id: this.props.user.id
            }
        };
        axios.post("/api/v1/conclusions", conclusion)
            .then((response) => {
                self.props.update(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    // open = () => {
    //     this.setState({
    //         open: true
    //     }), () => {
    //         console.log("open()")
    //     }
    // }

    // close = () => {
    //     this.setState({
    //         open: false
    //     }), () => {
    //         console.log("close()")
    //     }
    // }

    render() {
        const diary = this.props.diary;
        const answers = this.props.answers;
        return (
            <Modal
                
                closeIcon
                dimmer="blurring"
                trigger={

                    <Card className="clickable" as="article" color="red">
                        <Card.Content>
                            <Label color='red' ribbon>{diary.name}</Label>
                            <Card.Meta>
                                Du {new Date(diary.startDate).toLocaleDateString()} au {new Date(diary.endDate).toLocaleDateString()}
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                }
            >

                <Label tag size="big" color='red'>{diary.name}</Label>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Introduction</Header>
                        {diary.introduction}
                    </Modal.Description>
                    <Divider section />
                    <Modal.Description>
                        <Grid centered columns={2}>
                            {diary.questions.map(
                                (question, index) => (
                                    <Grid.Row key={index}>
                                        <Grid.Column textAlign="justified">
                                            {question.content}
                                        </Grid.Column>
                                        <Grid.Column textAlign="justified">
                                            {answers[index].content}
                                        </Grid.Column>
                                    </Grid.Row>
                                )
                            )}
                        </Grid>
                        <Divider />

                        <Container textAlign="center">
                            <Segment>
                                <Label attached='top'>Conclusion</Label>
                                <TextArea
                                    autoHeight
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                            </Segment>
                            <Divider hidden />
                            <Button
                                content="Valider"
                                onClick={this.sendConclusion}
                                positive
                            />
                        </Container>



                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default ModalForEditingConclusion;