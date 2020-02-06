import React from 'react';
import variableCSS from './variables.module.css';

import PhoneBook from './PhoneBook/PhoneBook';

const App = () => (
  <div className={variableCSS.container}>
    <PhoneBook />
  </div>
);

export default App;
