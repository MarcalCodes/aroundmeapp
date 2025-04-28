import {EventForm} from "../components/EventForm.jsx";


export const EventCreate = () => {

  const initialValues = {
    title: '',
    addressLine1: '',
    addressLine2: '',
    addressPostcode: '',
    addressCity: '',
    addressState: '',
    startAt: undefined,
    endsAt: undefined,
    image: undefined
  }

  const handleFormSubmit = (values) => {
    console.log(values)
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