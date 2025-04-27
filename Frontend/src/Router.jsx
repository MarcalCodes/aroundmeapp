import {Route, Routes} from "react-router";
import {Home} from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import {SignUp} from "./pages/SignUp.jsx";
import {Events} from "./pages/Events.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import {EventCreate} from "./pages/EventCreate.jsx";
import {EventDetails} from "./pages/EventDetails.jsx";
import {EventUpdate} from "./pages/EventUpdate.jsx";
import {Areas} from "./pages/Areas.jsx";
import {AreaEvents} from "./pages/AreaEvents.jsx";
import {Subscriptions} from "./pages/Subscriptions.jsx";
import {ForgotPassword} from "./pages/ForgotPassword.jsx";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home/>}/>

      {/* Session management */}
      <Route path="login" element={<Login/>}/>
      <Route path="sign-up" element={<SignUp/>}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>

      {/* Events management */}
      <Route path="events" element={<Events/>}/>
      <Route path="events/new" element={<EventCreate/>}/>
      <Route path="events/:id" element={<EventDetails/>}/>
      <Route path="events/:id/edit" element={<EventUpdate/>}/>

      {/* Areas management */}
      <Route path="areas" element={<Areas/>}/>
      <Route path="areas/events" element={<Subscriptions/>}/>
      <Route path="areas/:id/events" element={<AreaEvents/>}/>

      {/* Subscriptions management */}
      <Route path="subscriptions" element={<Subscriptions/>}/>

      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}