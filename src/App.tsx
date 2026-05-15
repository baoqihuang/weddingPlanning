import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { RoleProvider, useRole } from './context/RoleContext';
import { AccessProvider } from './context/AccessContext';
import { Splash } from './components/Splash';
import { RoleSelect } from './components/RoleSelect';
import { Navbar } from './components/Navbar';
import { Overview } from './components/Overview';
import { Budget } from './components/Budget';
import { Checklist } from './components/Checklist';
import { RSVP } from './components/RSVP';
import { Guests } from './components/Guests';
import { Responsibilities } from './components/Responsibilities';
import { TravelGuide } from './components/TravelGuide';
import { FAQ } from './components/FAQ';
import { Schedule } from './components/Schedule';

function AppInner() {
  const [showSplash, setShowSplash] = useState(true);
  const { role } = useRole();

  if (showSplash) {
    return <Splash onEnter={() => setShowSplash(false)} />;
  }

  if (!role) {
    return <RoleSelect />;
  }

  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/travel" element={<TravelGuide />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/responsibilities" element={<Responsibilities />} />
      </Routes>
    </HashRouter>
  );
}

function App() {
  return (
    <LanguageProvider>
      <RoleProvider>
        <AccessProvider>
          <AppInner />
        </AccessProvider>
      </RoleProvider>
    </LanguageProvider>
  );
}

export default App;
