import {Button, Title} from "@mantine/core";
import {useNavigate} from "react-router";

export const EventDetails = () => {
  const navigate = useNavigate();

  return (
    <>
      <Title order={1}>Event {"<name>"}</Title>

      <Button onClick={() => navigate("/events/:id/edit")}>Edit</Button>
    </>
  )
}