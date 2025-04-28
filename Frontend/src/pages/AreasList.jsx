import {
  Center,
  Checkbox,
  Container,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  useMantineTheme
} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {useState} from "react";
import cx from 'clsx';
import classes from './AreasList.module.css'
import {IconChevronDown, IconChevronUp, IconSearch, IconSelector} from "@tabler/icons-react";

const fakeAllAreas = [
  {suburb: "Forster", postcode: "2428", state: "NSW", subscribed: 10},
  {suburb: "St Kilda", postcode: "3182", state: "VIC", subscribed: 10},
  {suburb: "New Farm", postcode: "4005", state: "QLD", subscribed: 12},
  {suburb: "Glenelg", postcode: "5045", state: "SA", subscribed: 10},
  {suburb: "Fremantle", postcode: "6160", state: "WA", subscribed: 10},
  {suburb: "Battery Point", postcode: "7004", state: "TAS", subscribed: 20},
  {suburb: "Nightcliff", postcode: "0810", state: "NT", subscribed: 10},
  {suburb: "Kingston", postcode: "2604", state: "ACT", subscribed: 10},
  {suburb: "Byron Bay", postcode: "2481", state: "NSW", subscribed: 10},
  {suburb: "South Yarra", postcode: "3141", state: "VIC", subscribed: 10},
  {suburb: "Paddington", postcode: "4064", state: "QLD", subscribed: 8},
  {suburb: "Henley Beach", postcode: "5022", state: "SA", subscribed: 10},
  {suburb: "Cottesloe", postcode: "6011", state: "WA", subscribed: 10},
  {suburb: "Sandy Bay", postcode: "7005", state: "TAS", subscribed: 2},
  {suburb: "Palmerston", postcode: "0830", state: "NT", subscribed: 10},
  {suburb: "Braddon", postcode: "2612", state: "ACT", subscribed: 10},
  {suburb: "Manly", postcode: "2095", state: "NSW", subscribed: 1},
  {suburb: "Richmond", postcode: "3121", state: "VIC", subscribed: 0},
  {suburb: "Toowong", postcode: "4066", state: "QLD", subscribed: 10},
  {suburb: "Norwood", postcode: "5067", state: "SA", subscribed: 10}
]

const fakeSubscribedAreas = [
  "2428",
  "2095",
  "5067"
]

function filterData(areas, search) {
  const query = search.trim().toLowerCase();

  return areas.filter((area) =>
    keys(areas[0]).some((key) => area[key].toString().toLowerCase().includes(query))
  );
}

const compareStrings = (a, b) => a.localeCompare(b)

/**
 * Comes from https://stackoverflow.com/a/1063027/29476271
 */
const compareNumbers = (a, b) => a - b

function sortData(data, sortBy, search, reversed) {
  const type = typeof data[0][sortBy]
  const compare = type === "number" ? compareNumbers : compareStrings
  const noNeedForSorting = !sortBy

  if (noNeedForSorting) return filterData(data, search);
  else {
    const sortedData = data.toSorted((a, b) => {
      if (reversed) {
        return compare(b[sortBy], a[sortBy]);
      }

      return compare(a[sortBy], b[sortBy]);
    })

    return filterData(sortedData, search);
  }
}

const SortingTh = ({children, reversed, sorted, onSort}) => {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5}/>
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

/**
 * Basic table copied from "Table with selection" example in https://ui.mantine.dev/category/tables/
 * Table sorting and filtering mechanism copied from "Table with search and sort" example in https://ui.mantine.dev/category/tables/
 */
export const AreasList = () => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const [subscriptions, setSubscriptions] = useState(fakeSubscribedAreas);
  const subscribe = (postcode) =>
    setSubscriptions((current) =>
      current.includes(postcode) ? current.filter((item) => item !== postcode) : [...current, postcode]
    );

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(fakeAllAreas);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(fakeAllAreas, field, search, reversed));
  }

  const handleSearchChange = (event) => {
    const {value} = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(fakeAllAreas, sortBy, value, reverseSortDirection));
  }

  const rows = sortedData.map((area, index) => {
    const selected = subscriptions.includes(area.postcode);

    return (
      <Table.Tr key={index} className={cx({[classes.rowSelected]: selected})}>
        <Table.Td>
          <Checkbox checked={selected} onChange={() => subscribe(area.postcode)}/>
        </Table.Td>
        <Table.Td>{area.suburb}</Table.Td>
        <Table.Td>{area.postcode}</Table.Td>
        <Table.Td>{area.state}</Table.Td>
        <Table.Td>{area.subscribed}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Container fluid my={10} mx={20}>
      <Title order={mobile ? 2 : 1} mb={50}>My Areas</Title>

      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch size={16} stroke={1.5}/>}
          value={search}
          onChange={handleSearchChange}
        />
        <Table highlightOnHover miw={300} verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={40}></Table.Th>
              <SortingTh
                sorted={sortBy === 'suburb'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('suburb')}
              >
                Suburb
              </SortingTh>
              <SortingTh
                sorted={sortBy === 'postcode'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('postcode')}
              >
                Postcode
              </SortingTh>
              <SortingTh
                sorted={sortBy === 'state'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('state')}
              >
                State
              </SortingTh>
              <SortingTh
                sorted={sortBy === 'subscribed'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('subscribed')}
              >
                # of Subscribers
              </SortingTh>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {
              rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td>
                    <Text fw={500} ta="center">Nothing found</Text>
                  </Table.Td>
                </Table.Tr>
              )
            }
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
  )
}