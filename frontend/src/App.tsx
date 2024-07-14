import { Route, Routes } from "react-router-dom";
import {
  AuthForm,
  Dashboard,
  Home,
  Profile,
  Services,
} from "./components/index";

function App() {
  return (
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<AuthForm />} />
      </Route>
    </Routes>
  );
}

export default App;
