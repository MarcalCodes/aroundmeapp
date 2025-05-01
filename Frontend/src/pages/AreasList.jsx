import {
  Center,
  Checkbox,
  Container,
  Group,
  keys,
  Pagination,
  ScrollArea,
  Table,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  useMantineTheme
} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {useState, useContext, useEffect} from "react";
import {AreasContext} from "../context/AreasContext.jsx";
import cx from 'clsx';
import classes from './AreasList.module.css'
import {IconChevronDown, IconChevronUp, IconSearch, IconSelector} from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";




function filterData(areas, search) {
  const query = search.trim().toLowerCase();

  if (!areas || areas.length === 0) return [];

  return areas.filter((area) =>
    keys(areas[0]).some((key) => area[key].toString().toLowerCase().includes(query))
  );
}

function sortAndFilterData(data, sortBy, search, reversed) {
  if (!data || data.length === 0) return [];

  const noNeedForSorting = !sortBy

  if (noNeedForSorting) return filterData(data, search);
  else {
    const sortedData = data.toSorted((a, b) => {
      if (reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
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
  const areas = useContext(AreasContext);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  // Subscriptions management
  // Copied from "Table with selection" example in https://ui.mantine.dev/category/tables/
  const [subscriptions, setSubscriptions] = useState([]);
  const subscribe = (postcode) =>
    setSubscriptions((current) =>
      current.includes(postcode) ? current.filter((item) => item !== postcode) : [...current, postcode]
    );

  // Sorting and filtering management
  // Copied from "Table with search and sort" example in https://ui.mantine.dev/category/tables/
  const [searchParams] = useSearchParams();
  const defaultSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(defaultSearch);
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  // Pagination management
  // See:
  //  - https://mantine.dev/core/pagination
  const numberOfElementPerPage = 10 // Could be configurable by the user
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    setFilteredAndSortedData(sortAndFilterData(areas, sortBy, search, reverseSortDirection));
  }, [areas]);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setFilteredAndSortedData(sortAndFilterData(areas, field, search, reversed));
  }

  const handleSearchChange = (event) => {
    const {value} = event.currentTarget;
    setSearch(value);
    setFilteredAndSortedData(sortAndFilterData(areas, sortBy, value, reverseSortDirection));
  }

  const rows = (filteredAndSortedData || []).map((area, index) => {
    const selected = subscriptions.includes(area.postcode);

    return (
      <Table.Tr key={index} className={cx({[classes.rowSelected]: selected})}>
        <Table.Td>
          <Checkbox checked={selected} onChange={() => subscribe(area.postcode)}/>
        </Table.Td>
        <Table.Td>{area.suburb}</Table.Td>
        <Table.Td>{area.postcode}</Table.Td>
        <Table.Td>{area.state}</Table.Td>
      </Table.Tr>
    );
  });

  const paginatedRows = () => {
    const start = (activePage - 1) * numberOfElementPerPage
    const end = start + numberOfElementPerPage

    return rows.slice(start, end)
  }

  const numberOfPages = () => {
    if (rows.length <= 0) return 0
    else {
      const isEvenNumberOfRows = rows.length % numberOfElementPerPage === 0
      const numberOfPages = rows.length / numberOfElementPerPage
      return isEvenNumberOfRows ? numberOfPages : (numberOfPages + 1)
    }
  }

  return (
    <Container fluid my={10} mx={20}>
      <Title order={mobile ? 2 : 1} mb={50}>My Areas</Title>

      <ScrollArea mb={20}>
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
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {
              rows.length > 0 ? (
                paginatedRows()
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
      <Pagination
        total={numberOfPages()}
        value={activePage}
        onChange={setPage}
      />
    </Container>
  )
}