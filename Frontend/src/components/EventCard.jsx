import {Button, Paper, Text, Title} from '@mantine/core';
import classes from './EventCard.module.css';

/**
 * Card element copied from: https://mantine.dev/x/carousel/#example-cards-carousel
 */
export const EventCard = ({image, title, category}) => {
  return (
    <Paper
      shadow="xl"
      p="xl"
      radius="md"
      style={{backgroundImage: `url(${image})`}}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}