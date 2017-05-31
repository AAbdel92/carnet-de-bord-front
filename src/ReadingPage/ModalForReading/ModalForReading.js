import React, { Component } from 'react';
import {Modal, Card, Popup, Label, Header, Divider, Select} from "semantic-ui-react";

class ModalForReading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            conclusionToShow : ""
        }
    }
    

    setConclusionsByRole = (diary) => {
        if (this.props.role === "formateur") {
            let options = [];
            diary.conclusions.map(
                (conclusion, index) => (
                    options.push({key:conclusion.user.id, text:conclusion.user.firstname, value:conclusion.user.firstname})                        
                )
            )
            let content =   <Modal.Description>
                                <Header>Conclusion</Header>
                                <Select
                                    placeholder='Selectionner un apprenant'
                                    options={options}
                                    onChange={this.handleChange}
                                />
                                <Divider hidden />
                                {this.state.conclusionToShow}
                            </Modal.Description>
            return  content;
        } else {           
            let content =   <Modal.Description>
                                <Header>Conclusion</Header>
                                {diary.conclusions[0].content}
                            </Modal.Description>

            return content; 
        }
    }

    handleChange = (event, select) => {
        this.props.diary.conclusions.map(
            conclusion => {
                if (select.value === conclusion.user.firstname) {
                    this.setState({
                        conclusionToShow : conclusion.content
                    })
                }
            }
        )
        
    }

    render() {

        const diary = this.props.diary;
        return (
            <Modal dimmer="blurring" trigger={

                <Card as="article" color="red">
                    <Popup trigger={
                        <Card.Content>
                            <Label color='red' ribbon>{diary.name}</Label>
                            <Card.Meta>
                                Du {new Date(diary.startDate).toLocaleDateString()} au {new Date(diary.endDate).toLocaleDateString()}
                            </Card.Meta>
                        </Card.Content>
                    }
                        content="blabla"
                    />
                </Card>
            }>

                <Label tag size="big" color='red'>{diary.name}</Label>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Introduction</Header>
                        {diary.introduction}
                    </Modal.Description>
                    <Divider section />                    
                    {this.setConclusionsByRole(diary)}
                </Modal.Content>
            </Modal>
        );
    }
}

export default ModalForReading;