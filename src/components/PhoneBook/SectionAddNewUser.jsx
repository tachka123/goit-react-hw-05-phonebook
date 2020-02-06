import React, { Component } from 'react';
import T from 'prop-types';
import getID from 'uuid/v4';
import style from './sectionAddNew.module.css';

const nameId = getID();
const numberId = getID();

class SectionAddNewUser extends Component {
  static propTypes = {
    addUser: T.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    if (name === 'number' && isNaN(value)) {
      return;
    }
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { addUser } = this.props;
    const { name, number } = this.state;
    const resultOfAdd = addUser(name, number);
    if (!resultOfAdd) return;
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.onSubmit} className={style.container}>
        <label htmlFor={nameId}>
          <h2>Name</h2>
          <input
            value={name}
            name="name"
            onChange={this.handleOnChange}
            type="text"
          />
        </label>
        <label htmlFor={numberId}>
          <h2>Number</h2>
          <input
            className={style.inputNumber}
            value={number}
            name="number"
            onChange={this.handleOnChange}
            type="text"
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default SectionAddNewUser;
