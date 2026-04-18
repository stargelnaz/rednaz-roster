import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AppShell } from './components/AppShell'
import { HomePage } from './pages/HomePage'
import { ProgramChooserPage } from './pages/ProgramChooserPage'
import { PrayerPage } from './pages/PrayerPage'
import { RosterPage } from './pages/RosterPage'
import { PeoplePage } from './pages/PeoplePage'
import { RolesPage } from './pages/RolesPage'
import { CalendarPage } from './pages/CalendarPage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingsPage } from './pages/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppShell>
                  <Routes>
                    <Route path="/chooser"  element={<ProgramChooserPage />} />
                    <Route path="/prayer"   element={<PrayerPage />} />
                    <Route path="/roster"   element={<RosterPage />} />
                    <Route path="/people"   element={<PeoplePage />} />
                    <Route path="/people/:id" element={<PeoplePage />} />
                    <Route path="/roles"    element={<RolesPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/profile"   element={<ProfilePage />} />
                    <Route path="/settings"  element={<SettingsPage />} />
                    <Route path="*"          element={<Navigate to="/chooser" replace />} />
                  </Routes>
                </AppShell>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
