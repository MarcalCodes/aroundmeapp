import {EventForm} from "../components/EventForm.jsx";
import axios from "axios";
import {errorNotification, successNotification} from "../utils/notifications.js";
import {useNavigate} from "react-router";


export const EventCreate = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    addressLine1: '',
    addressLine2: '',
    addressPostcode: '',
    addressCity: '',
    addressState: '',
    startsAt: undefined,
    endsAt: undefined,
    image: undefined
  }

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/events", values, {withCredentials: true})
      successNotification("Event created")
      navigate(`/events/${response.data.id}`)
    } catch (e) {
      errorNotification("An error happened", e.message)
    }
  }

  return (
    <EventForm
      title={"Create a new event"}
      buttonText={"Create"}
      initialValues={initialValues}
      handleFormSubmit={handleFormSubmit}
    />
  )
}