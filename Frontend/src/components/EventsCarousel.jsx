import {EventCard} from "./EventCard.jsx";
import {Carousel} from "@mantine/carousel";
import {Box, Center, Group, Title, Text, useMantineTheme, Flex} from "@mantine/core";
import classes from "./EventsCarousel.module.css";
import {useMediaQuery} from "@mantine/hooks";
import {Button} from "@mantine/core";

const data = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best forests to visit in North America',
    category: 'nature',
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Hawaii beaches review: better than you think',
    category: 'beach',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Mountains at night: 12 best locations to enjoy the view',
    category: 'nature',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Aurora in Norway: when to visit for best experience',
    category: 'nature',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best places to visit this winter',
    category: 'tourism',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Active volcanos reviews: travel at your own risk',
    category: 'nature',
  },
];

/**
 * See Carousel doc: https://mantine.dev/x/carousel/
 *
 * Carousel copied from example: https://mantine.dev/x/carousel/#example-cards-carousel
 */
export const EventsCarousel = ({suburb}) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);


  const slides = data.map((item, index) => (
    <Carousel.Slide key={index}>
      <EventCard {...item} editable={true} />
    </Carousel.Slide>
  ));

  return (
    <Box my={20}>
      <Center>
        <Group >
          <Title order={2} mb={10}>
            What's on in{' '}
            <Text component="span" inherit className={classes.highlight}>
              {suburb ? suburb : "<area>"}
            </Text>
          </Title>
        </Group>
      </Center>
      <Carousel
        slideSize={{base: '100%', sm: '30%'}}
        slideGap={{base: 'xl', sm: "lg"}}
        align="start"
        slidesToScroll={mobile ? 1 : 2}
        controlSize={42}
        loop
        mx={mobile ? 10 : 40}
      >
        {slides}
      </Carousel>
    </Box>
  )
}