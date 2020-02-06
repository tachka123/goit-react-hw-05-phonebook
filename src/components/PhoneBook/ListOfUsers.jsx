import React from 'react';
import T from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import User from './User';
import Filter from './Filter';
import Style from './listOfUsers.module.css';
import animFilter from './animFilter.module.css';

const ListOfUsers = ({
  contacts,
  deleteUser,
  OnFilterUsers,
  filter,
  notFiltered,
}) => {
  return (
    <div className={Style.container}>
      <h2>Contacts</h2>
      <CSSTransition
        in={notFiltered.length > 1}
        timeout={250}
        classNames={animFilter}
        unmountOnExit
      >
        <Filter filter={filter} OnFilterUsers={OnFilterUsers} />
      </CSSTransition>

      <TransitionGroup className={Style.list}>
        {notFiltered.length > 0 &&
          contacts.map(({ name, number, id }) => {
            return (
              <CSSTransition
                key={id}
                timeout={400}
                classNames={Style}
                unmountOnExit
              >
                <User
                  deleteUser={deleteUser}
                  name={name}
                  id={id}
                  number={number}
                />
              </CSSTransition>
            );
          })}
      </TransitionGroup>
      <CSSTransition
        in={!notFiltered.length}
        timeout={400}
        classNames={Style}
        unmountOnExit
      >
        <span>The list is empty</span>
      </CSSTransition>
    </div>
  );
};

ListOfUsers.defaultProps = {
  contacts: [],
};

ListOfUsers.propTypes = {
  contacts: T.arrayOf(
    T.shape({
      name: T.string,
      number: T.string,
    }),
  ),
  deleteUser: T.func.isRequired,
  OnFilterUsers: T.func.isRequired,
  filter: T.string.isRequired,
  notFiltered: T.arrayOf(T.shape({ name: T.string, number: T.string }))
    .isRequired,
};

export default ListOfUsers;
