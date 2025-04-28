import {Button, Group, Paper, Text, Title} from '@mantine/core';
import classes from './EventCard.module.css';
import {useNavigate} from "react-router";

/**
 * Card element copied from: https://mantine.dev/x/carousel/#example-cards-carousel
 */
export const EventCard = ({id, image, title, category, editable}) => {
  const navigate = useNavigate();

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
      <Group>
        <Button variant="white" color="dark" onClick={() => navigate(`/events/${id}`)}>
          See event details
        </Button>
        {
          editable &&
            <Button variant="outline" color="white" onClick={() => navigate(`/events/${id}/edit`)}>
              Edit
            </Button>
        }
      </Group>
    </Paper>
  );
}