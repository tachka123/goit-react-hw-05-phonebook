import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { CSSTransition } from 'react-transition-group';
import AddNew from './SectionAddNewUser';
import ListOfUsers from './ListOfUsers';
import style from './sectionAddNew.module.css';
import STYLE from './phoneBook.module.css';
import Error from './Error';
import ErrorStyle from './error.module.css';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
    text: '',
    openError: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  filter = e => {
    this.setState({ filter: e.target.value });
  };

  filteredUsers = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  addUser = (name, number) => {
    const { contacts } = this.state;
    if (!name || !number) {
      this.setState({
        text: 'One of fields is empty! Please fill all inputs!',
        openError: true,
      });
      return false;
    }
    if (contacts.find(item => item.name === name)) {
      this.setState({
        text: 'User with this name already created! Try another one',
        openError: true,
      });
      return false;
    }
    this.setState(prev => {
      return {
        contacts: [...prev.contacts, { name, number, id: uuid() }],
        filter: '',
      };
    });
    return true;
  };

  deleteUser = id => {
    this.setState(prev => {
      return {
        contacts: prev.contacts.filter(item => item.id !== id),
      };
    });
  };

  render() {
    const filtered = this.filteredUsers();
    const { filter, contacts, text, openError } = this.state;
    return (
      <div className={style.center}>
        <CSSTransition
          in={openError}
          timeout={1000}
          classNames={ErrorStyle}
          onEntered={() =>
            setTimeout(() => {
              this.setState({ openError: false });
            }, 3000)
          }
          unmountOnExit
        >
          <Error text={text} />
        </CSSTransition>
        <CSSTransition in appear timeout={500} classNames={STYLE}>
          <div className={STYLE.logo}>
            <span>Phonebook</span>
          </div>
        </CSSTransition>
        <AddNew addUser={this.addUser} />
        <ListOfUsers
          filter={filter}
          notFiltered={contacts}
          OnFilterUsers={this.filter}
          contacts={filtered}
          deleteUser={this.deleteUser}
        />
      </div>
    );
  }
}

export default PhoneBook;
