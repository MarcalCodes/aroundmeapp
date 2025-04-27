import {Button, Container, Flex, Group, MultiSelect, Title} from "@mantine/core";
import {useNavigate} from "react-router";
import {EventsCarousel} from "../components/EventsCarousel.jsx";
import {useSet} from "@mantine/hooks";

const allAreas = [
  "Forster",
  "Boomerang Beach",
  "Blueys Beach",
  "Smith Lakes"
]

export const Events = () => {
  const navigate = useNavigate();
  const selectedAreas = useSet([])
  const shouldFilterArea = selectedAreas.size !== 0
  const displayedArea =
    shouldFilterArea
      ? allAreas.filter((area) => selectedAreas.has(area))
      : allAreas

  const addSelectArea = (areas) => {
    selectedAreas.clear()
    areas.map(area => selectedAreas.add(area))
  }

  return (
    <>
      <Container fluid my={10} mx={20}>
        <Group grow mb={20}>
          <Flex align="flex-start">
            <Title order={1}>My Events</Title>
          </Flex>

          <Flex justify="flex-end">
            <Button
              size="lg"
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
            w={"30%"}
            data={allAreas}
            onChange={addSelectArea}
          />
        </Group>
      </Container>
      {
        displayedArea.map((area, index) =>
          <EventsCarousel key={index} suburb={area}/>
        )
      }
    </>
  )
}