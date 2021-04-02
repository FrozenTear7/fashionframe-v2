/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SetupListItem from './SetupListItem';
import Loading from '../Utils/Loading';
import Error from '../Utils/Error';
import { SetupItem } from '../../types/Setup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
);

const Setups: React.VFC = () => {
  const classes = useStyles();

  const [setups, setSetups] = React.useState<SetupItem[]>([]);
  const [setupsLoading, setSetupsLoading] = React.useState(true);
  const [setupsError, setSetupsError] = React.useState<string>();

  React.useEffect(() => {
    const fetchSetups = async (): Promise<void> => {
      setSetupsError(undefined);
      setSetupsLoading(true);

      try {
        const { data } = await axios.get('/api/setups');
        setSetups(data);
      } catch ({ response }) {
        setSetupsError(response.data.message);
      } finally {
        setSetupsLoading(false);
      }
    };

    void fetchSetups();
  }, []);

  if (setupsLoading) return <Loading />;
  if (setupsError) return <Error error={setupsError} />;
  return (
    <div className="Setups">
      <Helmet>
        <title>Fashion setups | Fashionframe</title>
        <meta
          name="description"
          content="Search for fashion setups created by other players, filter by frames or popularity."
        />
      </Helmet>
      Setups
      <List className={classes.root}>
        {setups.length > 0 &&
          setups.map((setup) => (
            <SetupListItem key={setup._id} setup={setup} />
          ))}
      </List>
    </div>
  );
};

export default Setups;
