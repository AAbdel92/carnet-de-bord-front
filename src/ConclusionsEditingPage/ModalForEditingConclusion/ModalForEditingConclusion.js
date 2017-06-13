import React, { Component } from 'react';
import {Grid, Modal, Card, Divider, Label, Header} from "semantic-ui-react";

class ModalForEditingConclusion extends Component {
    render() {
        const diary = this.props.diary;
        const answers = this.props.answers;
        return (
            <Modal closeIcon dimmer="blurring" trigger={

                <Card as="article" color="red">
                        <Card.Content>
                            <Label color='red' ribbon>{diary.name}</Label>
                            <Card.Meta>
                                Du {new Date(diary.startDate).toLocaleDateString()} au {new Date(diary.endDate).toLocaleDateString()}
                            </Card.Meta>
                        </Card.Content>
                </Card>
            }>

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
                    </Modal.Description>  
                </Modal.Content>
            </Modal>
        );
    }
}

export default ModalForEditingConclusion;