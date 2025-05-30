import {EventForm} from "../components/EventForm.jsx";

const fakeEvent = {
  title: 'Fake event',
  addressLine1: '24-26 Queensland Ave',
  addressLine2: 'Unit 2',
  addressPostcode: '4218',
  addressCity: 'Gold Coast City',
  addressState: 'QLD',
  startsAt: new Date(),
  endsAt: new Date(),
  image: undefined
}

export const EventUpdate = () => {

  const handleFormSubmit = (values) => {
    console.log(values)
  }

  return (
    <EventForm
      title={"Update event"}
      buttonText={"Update"}
      initialValues={fakeEvent}
      handleFormSubmit={handleFormSubmit}
    />
  )
}