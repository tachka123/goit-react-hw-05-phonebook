import React from 'react';
import T from 'prop-types';
import style from './sectionAddNew.module.css';

const User = ({ name, number, deleteUser, id }) => {
  return (
    <div className={style.user}>
      <span>
        {name} : {number}
      </span>
      <button
        onClick={() => {
          deleteUser(id);
        }}
        type="button"
      >
        Delete
      </button>
    </div>
  );
};

User.defaultProps = {
  name: 'noname',
  number: '000',
  id: '0',
};

User.propTypes = {
  name: T.string,
  number: T.string,
  deleteUser: T.func.isRequired,
  id: T.string,
};
export default User;
