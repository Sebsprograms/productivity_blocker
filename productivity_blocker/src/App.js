import { useState } from 'react';
import BlockedSite from './components/BlockedSite';
import './App.css';

function App() {
  const [blockedSites, setBlockedSites] = useState(['www.google.com']);

  function addToBlockedSites() {
    setBlockedSites(prev => [...prev, window.location.href])
  }

  return (
    <div className="App">
      <h1>Blocked Websites</h1>
      <div id='blocked-websites'>
        {blockedSites.map((site) => <BlockedSite title={site} />)}
      </div>

      <button onClick={addToBlockedSites}>
        Block Current Site
      </button>
    </div>
  );
}

export default App;
