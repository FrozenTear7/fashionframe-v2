import axios from 'axios';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@material-ui/core';
import { SetupItem } from '../../types/Setup';
import Error from '../Utils/Error';
import Loading from '../Utils/Loading';
import SetupList from './SetupList';
// import SetupListItem from './SetupListItem';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     // root: {
//     //   width: '100%',
//     //   backgroundColor: theme.palette.background.paper,
//     // },
//     // inline: {
//     //   display: 'inline',
//     // },
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       justifyContent: 'space-around',
//       overflow: 'hidden',
//       backgroundColor: theme.palette.background.paper,
//     },
//     icon: {
//       color: 'rgba(255, 255, 255, 0.54)',
//     },
//   })
// );

const Setups: React.VFC = () => {
  // const classes = useStyles();

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
    <Container maxWidth="xl">
      <Helmet>
        <title>Fashion setups | Fashionframe</title>
        <meta
          name="description"
          content="Search for fashion setups created by other players, filter by frames or popularity."
        />
      </Helmet>
      <SetupList setups={setups} />
    </Container>
  );
};

export default Setups;
