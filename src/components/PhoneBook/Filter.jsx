import React from 'react';
import T, { string } from 'prop-types';

const Filter = ({ OnFilterUsers, filter }) => {
  return (
    <input
      value={filter}
      onChange={OnFilterUsers}
      placeholder="Find contact"
      type="text"
    />
  );
};

Filter.propTypes = {
  OnFilterUsers: T.func.isRequired,
  filter: string.isRequired,
};

export default Filter;
