import { Navigate, Route, Routes } from "react-router-dom";
import SessionTimer from "./components/SessionTimer";

import { DashboarPage, HomePage, Login } from "./pages";

import useAuthContext from "./store/useAuthContext";

function App() {
  const {
    state: { isAuthenticated },
  } = useAuthContext();
  console.log(isAuthenticated);

  return (
    <>
      {isAuthenticated && <SessionTimer />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboarPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
