import {EventForm} from "../components/EventForm.jsx";
import axios from "axios";


export const EventCreate = () => {

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
    axios.post("http://localhost:3000/events", values)
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