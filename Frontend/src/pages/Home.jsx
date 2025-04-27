import {HomePageHero} from "../components/HomePageHero.jsx";
import {EventsCarousel} from "../components/EventsCarousel.jsx";
import {Box, Paper, Stack} from "@mantine/core";

export const Home = () => {
  return (
    <>
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="flex-start"
        gap="lg"
      >
        <HomePageHero/>
        <EventsCarousel/>
        <EventsCarousel/>
        <EventsCarousel/>
        <EventsCarousel/>
      </Stack>
    </>
  )
}