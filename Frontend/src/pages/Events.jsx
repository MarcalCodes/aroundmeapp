import {Button, Title} from "@mantine/core";
import {useNavigate} from "react-router";

export const Events = () => {
  const navigate = useNavigate();

  return (
    <>
      <Title order={1}>Events</Title>

      <Button onClick={() => navigate("/events/new")}>Create an event</Button>
    </>
  )
}