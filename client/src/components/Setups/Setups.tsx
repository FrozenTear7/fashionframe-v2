import axios from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { SetupItem } from '../../types/Setup';
import Error from '../Utils/Error';
import Loading from '../Utils/Loading';
import SetupList from './SetupList';

interface SetupFilters {
  frameFilter: string | null;
  sortByFilter: string;
}

const Setups: React.VFC = () => {
  const [frames, setFrames] = React.useState<string[]>([]);
  const [framesLoading, setFramesLoading] = React.useState(false);
  const [framesError, setFramesError] = React.useState<string>();

  const [setups, setSetups] = React.useState<SetupItem[]>([]);
  const [setupsLoading, setSetupsLoading] = React.useState(true);
  const [setupsError, setSetupsError] = React.useState<string>();

  const [filters, setFilters] = React.useState<SetupFilters>({
    frameFilter: null,
    sortByFilter: 'Score (descending)',
  });

  React.useEffect(() => {
    const fetchFrames = async (): Promise<void> => {
      setFramesError(undefined);
      setFramesLoading(true);

      try {
        const { data } = await axios.get('/api/data/frames');
        setFrames(data.frames);
      } catch ({ response }) {
        setFramesError(response.data.message);
      } finally {
        setFramesLoading(false);
      }
    };

    void fetchFrames();
  }, []);

  React.useEffect(() => {
    const fetchSetups = async (): Promise<void> => {
      const { frameFilter, sortByFilter } = filters;

      setSetupsError(undefined);
      setSetupsLoading(true);

      let sortBy = 'score';
      let order = '-1';
      if (['Date (descending)', 'Date (ascending)'].includes(sortByFilter))
        sortBy = 'createdAt';
      if (['Score (ascending)', 'Date (ascending)'].includes(sortByFilter))
        order = '1';

      try {
        const { data } = await axios.get('/api/setups', {
          params: {
            frameFilter,
            sortByFilter: sortBy,
            orderFilter: order,
          },
        });
        setSetups(data);
      } catch ({ response }) {
        setSetupsError(response.data.message);
      } finally {
        setSetupsLoading(false);
      }
    };

    void fetchSetups();
  }, [filters]);

  if (setupsLoading || framesLoading) return <Loading />;
  if (setupsError) return <Error error={setupsError} />;
  if (framesError) return <Error error={framesError} />;
  return (
    <Container component="main" maxWidth="xl">
      <Helmet>
        <title>Fashion setups | Fashionframe</title>
        <meta
          name="description"
          content="Search for fashion setups created by other players, filter by frames or popularity."
        />
      </Helmet>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <Autocomplete
            id="frame-filter"
            value={filters.frameFilter}
            onChange={async (_event, newValue): Promise<void> => {
              setFilters({
                ...filters,
                frameFilter: newValue,
              });
            }}
            style={{ width: 200 }}
            options={frames}
            renderInput={(params): JSX.Element => (
              <TextField
                {...params}
                label="Filter by frame"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="setup-sort"
            value={filters.sortByFilter}
            onChange={(_event, newValue): void => {
              setFilters({
                ...filters,
                sortByFilter: newValue,
              });
            }}
            style={{ width: 200 }}
            options={[
              'Score (descending)',
              'Score (ascending)',
              'Date (descending)',
              'Date (ascending)',
            ]}
            renderInput={(params): JSX.Element => (
              <TextField {...params} label="Sort by" variant="outlined" />
            )}
            disableClearable
          />
        </Grid>
      </Grid>
      <SetupList setups={setups} />
    </Container>
  );
};

export default Setups;
