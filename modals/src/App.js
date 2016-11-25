import React, { Component } from 'react';
import Modal from './components/modal';
import modalsData from './datasource/modals.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modals: [],
        }
    }
    componentDidMount() {
        this.setState({
            modals: modalsData.modals,
        })
    }

    render() {
        return (
          <div className="App">
          <div className="modalcontainer">
            {
                this.state.modals.map((modal, index) => {
                return (
                    <Modal
                        color="red"
                        key={modal.id}
                        index={index}
                        swipeCallback={
                            () => this.onModalSwipe()
                        }
                        data={modal}>
                    </Modal>
                )})
            }
            </div>
          </div>
        );
    }

    onModalSwipe() {
        const firstModal = Object.assign({}, this.state.modals[0]);
        const newState = Object.assign([], this.state.modals);
        newState.shift();
        newState.push(firstModal);
        this.setState({
            modals: newState,
        });
    }
}

export default App;
