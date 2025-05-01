import {Button, Center, Container, Flex, Group, Loader, MultiSelect, Title, useMantineTheme} from "@mantine/core";
import {useNavigate} from "react-router";
import {EventsCarousel} from "../components/EventsCarousel.jsx";
import {useMediaQuery, useSet} from "@mantine/hooks";
import {useEffect, useState} from "react";
import axios from "axios";


export const EventsList = ({user}) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const navigate = useNavigate();
  const selectedAreas = useSet([])
  const [userAreas, setUserAreas] = useState(undefined)
  const isLoadingUserAreas = userAreas === undefined

  useEffect(() => {
    async function fetchUserEvents() {
      try {
        const response = await axios.get(`http://localhost:3000/users/${user.id}/areas`, {withCredentials: true})
        console.log("user areas", response.data)
        setUserAreas(response.data)
      } catch (e) {
        console.log(`Error fetching your events details: ${e}`)
      }
    }

    fetchUserEvents();
  }, [user])

  const shouldFilterArea = selectedAreas.size !== 0
  const displayedArea =
    shouldFilterArea
      ? userAreas.filter((area) => selectedAreas.has(area))
      : userAreas

  const addSelectedArea = (areas) => {
    selectedAreas.clear()
    areas.map(area => selectedAreas.add(area))
  }

  return (
    isLoadingUserAreas
      ? <Center mt={200}><Loader color="blue"/></Center>
      : <>
        <Container fluid my={10} mx={20}>
          <Group grow mb={20}>
            <Flex align="flex-start">
              <Title order={mobile ? 2 : 1}>My Events</Title>
            </Flex>

            <Flex justify="flex-end">
              <Button
                size={mobile ? "md" : "lg"}
                variant="gradient"
                gradient={{from: 'blue', to: 'orange', deg: 135}}
                onClick={() => navigate("/events/new")}
              >
                Create an event
              </Button>
            </Flex>
          </Group>
          <Group>
            <MultiSelect
              placeholder="Filter by area"
              w={mobile ? "100%" : "30%"}
              data={Array.from(new Set(userAreas.map((area) => area.suburb)))}
              onChange={addSelectedArea}
            />
          </Group>
        </Container>
        {
          displayedArea.map((area, index) =>
            <EventsCarousel key={index} suburb={area.suburb}/>
          )
        }
      </>
  )
}