import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DataDisplay from './components/DataDisplay';

function App() {
  const [displayMode, setDisplayMode] = useState('group-by-status');
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={`${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Navbar displayMode={displayMode} setDisplayMode={setDisplayMode} />
      <DataDisplay displayMode={displayMode} />
    </div>
  );
}

export default App;
