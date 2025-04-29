import {useContext} from "react";
import {AreasContext} from "../context/AreasContext.jsx";
import {HomePageHero} from "../components/HomePageHero.jsx";
import {EventsCarousel} from "../components/EventsCarousel.jsx";
import {Box, Paper, Stack, Text, Title} from "@mantine/core";


export const Home = () => {

  const areas = useContext(AreasContext);
  const featuredSuburbs = ["Forster", "Boomerang Beach", "Tuncurry"];

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
        {areas.length > 0 ? (
          featuredSuburbs.map((suburbName, index) => (
            <EventsCarousel key={index} suburb={suburbName}/>
        ))
        ) : (
          <div>Loading areas...</div>
        )}
      </Stack>
    </>
  );
};