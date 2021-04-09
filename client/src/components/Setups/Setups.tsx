import { AxiosRequestConfig } from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Grid, TextField } from '@material-ui/core';
import { Autocomplete, Pagination } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { SetupItem } from '../../types/Setup';
import Error from '../Utils/Error';
import Loading from '../Utils/Loading';
import SetupList from './SetupList';
import useQuery from '../../utils/useQuery';

interface SetupFilters {
  frameFilter: string | null;
  sortByFilter: string;
  pageFilter: number;
}

const fixFrameFilter = (frame: string | null): string | null => {
  if (!frame) return null;

  return `${frame[0].toUpperCase()}${frame
    .substr(1, frame.length - 1)
    .toLowerCase()}`;
};

const Setups: React.VFC = () => {
  const query = useQuery();
  const history = useHistory();

  const [filters, setFilters] = React.useState<SetupFilters>({
    frameFilter: fixFrameFilter(query.get('frame')),
    sortByFilter: 'Score (descending)',
    pageFilter: 1,
  });

  const [
    { data: frames, loading: framesLoading, error: framesError },
  ] = useAxios<{ frames: string[] }, string>('/api/data/frames');

  const constructSetupsQueryConfig = (): AxiosRequestConfig => {
    const { frameFilter, sortByFilter, pageFilter } = filters;

    let sortBy = 'score';
    let order = '-1';
    if (['Date (descending)', 'Date (ascending)'].includes(sortByFilter))
      sortBy = 'createdAt';
    if (['Score (ascending)', 'Date (ascending)'].includes(sortByFilter))
      order = '1';

    return {
      url: '/api/setups',
      params: {
        frameFilter,
        sortByFilter: sortBy,
        orderFilter: order,
        pageFilter: pageFilter - 1, // Show normal people values, but send IT smart guy values from 0
      },
    };
  };

  const [
    { data: setupsData, loading: setupsLoading, error: setupsError },
    fetchSetups,
  ] = useAxios<{ setups: SetupItem[]; pages: number }, string>(
    constructSetupsQueryConfig()
  );

  React.useEffect(() => {
    if (filters.frameFilter) {
      const queryParams = new URLSearchParams();
      queryParams.append('frame', filters.frameFilter);
      history.push({ search: queryParams.toString() });
    } else {
      history.push({ search: '' });
    }
  }, [filters.frameFilter]);

  React.useEffect(() => {
    void fetchSetups();
  }, [filters]);

  const helmetTitle = (): string => {
    let result = 'Fashion setups | Fashionframe';
    if (filters.frameFilter)
      result = `${String(filters.frameFilter)} | ${result}`;

    return result;
  };

  if (setupsLoading || framesLoading) return <Loading />;
  if (setupsError) return <Error error={setupsError.message} />;
  if (framesError) return <Error error={framesError.message} />;
  if (!setupsData || !frames) return <Error error="Something went wrong" />;
  return (
    <Container component="main" maxWidth="xl">
      <Helmet>
        <title>{helmetTitle()}</title>
        <meta
          name="description"
          content="Search for fashion setups created by other players, filter by frames or popularity."
        />
      </Helmet>
      <Grid container spacing={3}>
        <Grid container item spacing={3} justify="center">
          <Grid item>
            <Autocomplete
              id="frame-filter"
              value={filters.frameFilter}
              onChange={async (_event, newValue): Promise<void> => {
                setFilters({
                  ...filters,
                  frameFilter: newValue,
                  pageFilter: 1,
                });
              }}
              style={{ width: 200 }}
              options={frames.frames}
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
                  pageFilter: 1,
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
        <Grid container item justify="center">
          <Pagination
            count={setupsData ? setupsData.pages : 1}
            page={filters.pageFilter}
            onChange={async (_event, newValue): Promise<void> => {
              setFilters({
                ...filters,
                pageFilter: newValue,
              });
            }}
            disabled={setupsData.pages === 0}
          />
        </Grid>
      </Grid>
      <SetupList setups={setupsData.setups} />
    </Container>
  );
};

export default Setups;
