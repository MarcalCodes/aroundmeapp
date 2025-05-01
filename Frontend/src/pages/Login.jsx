import {AuthenticationForm} from "../components/AuthenticationForm.jsx";

export const Login = ({setUser}) => {
  return (
    <>
      <AuthenticationForm setUser={setUser} />
    </>
  )
}