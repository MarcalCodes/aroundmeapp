import {useNavigate, useParams} from "react-router";
import {Button, Container, Flex, Group, Stack, Text, Title, useMantineTheme} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {Map} from "../components/Map.jsx";
import {formatDate} from "../utils/dates.js";

const fakeData = {
  id: 0,
  image:
    'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
  title: 'Best forests to visit in North America',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  startsAt: new Date(),
  endsAt: new Date(),
  address: {
    line1: "24-26 Queensland Ave",
    line2: 'Unit 2',
    postcode: '4218',
    city: 'Gold Coast City',
    state: 'QLD',
  },
  category: 'nature',
}

// TODO:
//  - Show the image in an appealing way
export const EventDetails = () => {
  const {id} = useParams();
  const event = fakeData
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const showEditButton = true // TODO

  return (
    <>
      <Container fluid my={10} mx={20} h={500}>
        <Group grow mb={20}>
          <Flex align="flex-start">
            <Title order={mobile ? 2 : 1}>{event.title}</Title>
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
            <Title order={mobile ? 4 : 3}>{event.description}</Title>
          </Flex>
          <Flex justify={mobile ? "flex-start" : "center"}>
            <Stack gap={1}>
              <Text td="underline">Starts at:</Text>
              <Text fw={700} size="md">{formatDate(event.startsAt)}</Text>
              <Text td="underline">Ends at:</Text>
              <Text fw={700} size="md">{formatDate(event.endsAt)}</Text>
              <Text td="underline">Address:</Text>
              <Stack gap={0}>
                <Text fw={700} size="md">{event.address.line1}</Text>
                <Text fw={700} size="sm">{event.address.line2}</Text>
                <Text fw={700} size="md">{event.address.city}</Text>
                <Text fw={700} size="md">{event.address.state} {event.address.postcode}</Text>
              </Stack>
            </Stack>
          </Flex>
        </Group>
        <Map address={event.address}/>
      </Container>
    </>
  )
}