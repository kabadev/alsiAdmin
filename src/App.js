import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import AddEvent from "./pages/events/AddEvent";
import Events from "./pages/events/Events";
import { EventContextProvider } from "./context/events/context";
import EditEvent from "./pages/events/EditEvent";
import AddNews from "./pages/news/AddNews";
import { NewsContextProvider } from "./context/news/context";
import News from "./pages/news/News";
import EditNews from "./pages/news/EditNews";
import AddTeam from "./pages/team/AddTeam";
import { TeamContextProvider } from "./context/team/context";
import Team from "./pages/team/Team";
import EditTeam from "./pages/team/EditTeam";
import Members from "./pages/members/Members";
import Gallery from "./pages/gallery/Gallery";
import Member from "./pages/members/Member";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import { AppContextProvider } from "./context/AppContext";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import Settings from "./pages/settings/Setting";
function App() {
  const { mode } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={`App ${mode === "true" ? "dark" : ""}`}>
      <AppContextProvider>
        <NewsContextProvider>
          <TeamContextProvider>
            <EventContextProvider>
              <Routes>
                <Route
                  path="/"
                  element={!user ? <Navigate to="/login" /> : <Home />}
                />

                <Route
                  path="/login"
                  element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/events"
                  element={!user ? <Navigate to="/login" /> : <Events />}
                />
                <Route
                  path="/events/addEvent"
                  element={!user ? <Navigate to="/login" /> : <AddEvent />}
                />
                <Route
                  path="/events/editEvent/:id"
                  element={!user ? <Navigate to="/login" /> : <EditEvent />}
                />
                <Route
                  path="/news"
                  element={!user ? <Navigate to="/login" /> : <News />}
                />
                <Route
                  path="/news/AddNews"
                  element={!user ? <Navigate to="/login" /> : <AddNews />}
                />
                <Route
                  path="/news/editNews/:id"
                  element={!user ? <Navigate to="/login" /> : <EditNews />}
                />
                <Route
                  path="/team"
                  element={!user ? <Navigate to="/login" /> : <Team />}
                />
                <Route
                  path="/team/addTeam"
                  element={!user ? <Navigate to="/login" /> : <AddTeam />}
                />
                <Route
                  path="/team/editTeam/:id"
                  element={!user ? <Navigate to="/login" /> : <EditTeam />}
                />
                <Route
                  path="/members"
                  element={!user ? <Navigate to="/login" /> : <Members />}
                />
                <Route
                  path="/members/:id"
                  element={!user ? <Navigate to="/login" /> : <Member />}
                />
                <Route
                  path="/gallery"
                  element={!user ? <Navigate to="/login" /> : <Gallery />}
                />
                <Route
                  path="/setting"
                  element={!user ? <Navigate to="/login" /> : <Settings />}
                />
                <Route
                  path="*"
                  element={!user ? <Navigate to="/login" /> : <NotFound />}
                />
              </Routes>
            </EventContextProvider>
          </TeamContextProvider>
        </NewsContextProvider>
      </AppContextProvider>
    </div>
  );
}

export default App;
