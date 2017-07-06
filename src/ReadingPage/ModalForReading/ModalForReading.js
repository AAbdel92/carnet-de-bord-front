import React, { Component } from 'react';
import { Modal, Card, Popup, Label, Header, Divider, Select } from "semantic-ui-react";

class ModalForReading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            conclusionToShow: ""
        }
    }


    setConclusionsByRole = (diary) => {
        let content;
        if (this.props.role === "formateur") {
            let options = [];
            diary.conclusions.map(
                (conclusion, index) => (
                    options.push({
                        key: conclusion.user.id,
                        text: conclusion.user.firstname,
                        value: conclusion.user.firstname
                    })
                )
            )
            content = <Modal.Description>
                <Header>Conclusion</Header>
                <Select
                    placeholder='Selectionner un apprenant'
                    options={options}
                    onChange={this.handleChange}
                />
                <Divider hidden />
                {this.state.conclusionToShow}
            </Modal.Description>
        } else {
            content = <Modal.Description>
                <Header>Conclusion</Header>
                {diary.conclusions[0].content}
            </Modal.Description>
        }
        return content;
    }

    handleChange = (event, select) => {
        this.props.diary.conclusions.map(
            conclusion => {
                if (select.value === conclusion.user.firstname) {
                    this.setState({
                        conclusionToShow: conclusion.content
                    })
                }
            }
        )

    }

    render() {

        const diary = this.props.diary;
        const startDate = new Date(diary.startDate).toLocaleDateString();
        const endDate = new Date(diary.endDate).toLocaleDateString();
        return (
            <Modal closeIcon dimmer="blurring" trigger={

                <Card  className="clickable" as="article" color="red">

                    <Card.Content>
                        <Label color='red' ribbon>{diary.name}</Label>
                        <Card.Meta>
                            Du {startDate} au {endDate}
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
                    {this.setConclusionsByRole(diary)}
                </Modal.Content>
            </Modal>
        );
    }
}

export default ModalForReading;