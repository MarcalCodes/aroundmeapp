import {useNavigate, useParams} from "react-router";
import {Button, Center, Container, Flex, Group, Loader, Stack, Text, Title, useMantineTheme} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {Map} from "../components/Map.jsx";
import {formatDate} from "../utils/dates.js";
import {useEffect, useState} from "react";
import axios from "axios";

// TODO:
//  - Show the image in an appealing way
export const EventDetails = ({user}) => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const {id} = useParams();
  const [event, setEvent] = useState(undefined)
  const showEditButton = event && user && event.creator_id === user.id

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get(`http://localhost:3000/events/${id}`, {withCredentials: true})
        setEvent(response.data)
      } catch (e) {
        console.log(`Error fetching the event ${id} details: ${e}`)
      }
    }

    fetchEvent();
  }, [id])


  return (
    !event
      ? <Center mt={200}><Loader color="blue"/></Center>
      : <>
        <Container fluid my={10} mx={20} h={500}>
          <Group grow mb={20}>
            <Flex align="flex-start">
              <Title order={mobile ? 2 : 1}>{event.name}</Title>
            </Flex>

            {
              showEditButton &&
              <Flex justify="flex-end">
                <Button
                  size={mobile ? "md" : "lg"}
                  variant="gradient"
                  gradient={{from: 'blue', to: 'orange', deg: 135}}
                  onClick={() => navigate(`/events/${id}/edit`)}
                >
                  Update event
                </Button>
              </Flex>
            }
          </Group>
          <Group grow preventGrowOverflow={false} mb={20}>
            <Flex justify="flex-start" w="80%">
              <Title order={mobile ? 4 : 3}>{event.description ? event.description : "Missing description"}</Title>
            </Flex>
            <Flex justify={mobile ? "flex-start" : "center"}>
              <Stack gap={1}>
                <Text td="underline">Starts at:</Text>
                <Text fw={700} size="md">{formatDate(event.starts_at)}</Text>
                <Text td="underline">Ends at:</Text>
                <Text fw={700} size="md">{formatDate(event.ends_at)}</Text>
                <Text td="underline">Address:</Text>
                <Stack gap={0}>
                  <Text fw={700} size="md">{event.address_line1}</Text>
                  <Text fw={700} size="sm">{event.address_line2}</Text>
                  <Text fw={700} size="md">{event.city}</Text>
                  <Text fw={700} size="md">{event.state} {event.postcode}</Text>
                </Stack>
              </Stack>
            </Flex>
          </Group>
          <Map line1={event.address_line1} city={event.city} state={event.state} postcode={event.postcode} />
        </Container>
      </>
  )
}