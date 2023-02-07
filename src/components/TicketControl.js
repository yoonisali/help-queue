import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import Debugger from './Debugger';
import Pair from './Pair';
import ProblemDocument from './ProblemDocument';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: 0
        };
    }

    handleClick = () => {
        if (this.state.formVisibleOnPage === 4) {
            this.setState({formVisibleOnPage: 0})
        } else {
            this.setState(prevState => ({
                formVisibleOnPage: prevState.formVisibleOnPage + 1
            }));
        }
        
    }

    render() {
        let currentlyVisibleState = null;
        let buttonText = null;
        if (this.state.formVisibleOnPage === 1) {
            currentlyVisibleState = <p><strong>Have you gone through all the steps on the Learn How to Program debugging lesson?</strong></p>
            buttonText = "Yes"
        } else if (this.state.formVisibleOnPage === 2) {
            currentlyVisibleState = <p><strong>Have you asked another pair for help?</strong></p>
            buttonText = "Yes"
        } else if (this.state.formVisibleOnPage === 3) {
            currentlyVisibleState =  <p><strong>Have you spent 15 minutes going through through the problem documenting every step?</strong></p>
            buttonText = "Yes"
        }
        else if (this.state.formVisibleOnPage === 4) {
            currentlyVisibleState = <NewTicketForm />
            buttonText = "Return to Ticket List";
        } else {
            currentlyVisibleState = <TicketList />
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