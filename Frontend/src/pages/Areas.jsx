import {Button, Title} from "@mantine/core";
import {useNavigate} from "react-router";

export const Areas = () => {
  const navigate = useNavigate();

  return (
    <>
      <Title order={1}>Areas</Title>

      <Button onClick={() => navigate("/areas/2/events")}>Area 2 events</Button>
    </>
  )
}