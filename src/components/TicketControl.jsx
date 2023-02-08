import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketDetail from './TicketDetail';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: 0,
            mainTicketList: [],
            selectedTicket: null,
            editing: false
        };
    }

    handleClick = () => {
        if (this.state.selectedTicket != null) {
            this.setState({
                formVisibleOnPage: false,
                selectedTicket: null
            });
        } else if (this.state.formVisibleOnPage === 4) {
            this.setState({ formVisibleOnPage: 0 })
        } else {
            this.setState(prevState => ({
                formVisibleOnPage: prevState.formVisibleOnPage + 1
            }));
        }
    }

    handleAddingNewTicketToList = (newTicket) => {
        const newMainTicketList = this.state.mainTicketList.concat(newTicket);
        this.setState({
            mainTicketList: newMainTicketList,
            formVisibleOnPage: false
        });
    }

    handleChangingSelectedTicket = (id) => {
        const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
        this.setState({selectedTicket: selectedTicket});
    }

    handleDeletingTicket = (id) => {
        const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
        this.setState({
            mainTicketList: newMainTicketList,
            selectedTicket: null
        });
    }

    handleEditClick = () => {
        this.setState({editing: true});
    }

    render() {
        let currentlyVisibleState = null;
        let buttonText = null;
        if (this.state.editing) {
            currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} />
            buttonText = "Return to Ticket List";
        } else if (this.state.selectedTicket != null) {
            currentlyVisibleState = 
            <TicketDetail 
                ticket = {this.state.selectedTicket} 
                onClickingDelete = {this.handleDeletingTicket} 
                onClickingEdit = {this.handleEditClick} />
            buttonText = "Return to Ticket List"
        } else if (this.state.formVisibleOnPage === 1) {
            currentlyVisibleState = <p><strong>Have you gone through all the steps on the Learn How to Program debugging lesson?</strong></p>
            buttonText = "Yes"
        } else if (this.state.formVisibleOnPage === 2) {
            currentlyVisibleState = <p><strong>Have you asked another pair for help?</strong></p>
            buttonText = "Yes"
        } else if (this.state.formVisibleOnPage === 3) {
            currentlyVisibleState = <p><strong>Have you spent 15 minutes going through through the problem documenting every step?</strong></p>
            buttonText = "Yes"
        }
        else if (this.state.formVisibleOnPage === 4) {
            currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />
            buttonText = "Return to Ticket List";
        } else {
            currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />
            buttonText = "Add Ticket";

        }
        return (
            <React.Fragment>
                {currentlyVisibleState}
                <button onClick={this.handleClick}>{buttonText}</button>
            </React.Fragment>
        );
    }

}

export default TicketControl;