import {Route, Routes} from "react-router";
import {Home} from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import {SignUp} from "./pages/SignUp.jsx";
import {EventsList} from "./pages/EventsList.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import {EventCreate} from "./pages/EventCreate.jsx";
import {EventDetails} from "./pages/EventDetails.jsx";
import {EventUpdate} from "./pages/EventUpdate.jsx";
import {AreasList} from "./pages/AreasList.jsx";
import {ForgotPassword} from "./pages/ForgotPassword.jsx";

export const Router = ({isLoggedIn, user, setUser}) => {
  return (
    <Routes>
      <Route index element={<Home/>}/>

      {/* Session management */}
      <Route path="login" element={<Login setUser={setUser}/>}/>
      <Route path="sign-up" element={<SignUp/>}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>

      {/* Events management */}
      <Route path="events" element={<EventsList user={user}/>}/>
      <Route path="events/new" element={<EventCreate/>}/>
      <Route path="events/:id" element={<EventDetails user={user}/>}/>
      <Route path="events/:id/edit" element={<EventUpdate/>}/>

      {/* Areas management */}
      <Route path="areas" element={<AreasList/>}/>

      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}