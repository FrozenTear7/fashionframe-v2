import { Container, Divider, Link, Typography } from '@material-ui/core';
import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet-async';
import useAPIPageStyles from './useAPIPageStyles';

const APIPage: React.VFC = () => {
  const classes = useAPIPageStyles();

  const createData = (
    endpoint: string,
    updated: string,
    action: string,
    data: string,
    format: string
  ): {
    endpoint: string;
    updated: string;
    action: string;
    data: string;
    format: string;
  } => {
    return { endpoint, updated, action, data, format };
  };

  const rows = [
    createData('/frames', '2021-04-02', 'GET', 'Frames', 'JSON'),
    createData('/ephemeras', '2021-04-02', 'GET', 'Ephemeras', 'JSON'),
    createData('/helmets', '2021-04-02', 'GET', 'Helmets', 'JSON'),
    createData('/skins', '2021-04-02', 'GET', 'Skins', 'JSON'),
    createData('/colorPickers', '2021-04-02', 'GET', 'Color pickers', 'JSON'),
    createData(
      '/chestAttachments',
      '2021-04-02',
      'GET',
      'Chest attachments',
      'JSON'
    ),
    createData(
      '/armAttachments',
      '2021-04-02',
      'GET',
      'Arm attachments',
      'JSON'
    ),
    createData(
      '/legAttachments',
      '2021-04-02',
      'GET',
      'Leg attachments',
      'JSON'
    ),
    createData('/syandanas', '2021-04-02', 'GET', 'Syandanas', 'JSON'),
  ];

  return (
    <>
      <Helmet>
        <title>API | Fashionframe</title>
        <meta
          name="description"
          content="Check out Fashionframe's API, available endpoints and the type of data you can use for free."
        />
        <meta
          name="keywords"
          content="fashionframe, warframe, fashion, api, data, endpoints, free, social, hub, sharing"
        />
      </Helmet>
      <Container component="main" maxWidth="md">
        <Typography className={classes.title} component="h1">
          API
        </Typography>
        <Typography className={classes.subTitle} component="h1">
          Endpoints listed below are available for non-commercial and commercial
          use. <br />I do not own the data itself, it was taken from the
          official Warframe wiki and parsed into a json format for convenience.
        </Typography>
        <Divider className={classes.titleDivider} />
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Endpoint</TableCell>
                <TableCell align="right">Last update</TableCell>
                <TableCell align="right">Action</TableCell>
                <TableCell align="right">Data</TableCell>
                <TableCell align="right">Format</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.data}>
                  <TableCell component="th" scope="row">
                    <Link
                      href={`https://fashionframe.herokuapp.com/api/data${row.endpoint}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {row.endpoint}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.updated}</TableCell>
                  <TableCell align="right">{row.action}</TableCell>
                  <TableCell align="right">{row.data}</TableCell>
                  <TableCell align="right">{row.format}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider className={classes.titleDivider} />
        <Typography variant="body2" component="p">
          For more information, please refer to the{' '}
          <Link
            href="https://github.com/FrozenTear7/fashionframe/blob/master/README.md"
            target="_blank"
            rel="noopener"
          >
            README
          </Link>{' '}
          of the project.
        </Typography>
        <Divider className={classes.titleDivider} />
        <Typography variant="body1" component="p">
          Created and maintained by{' '}
          <Link
            href="https://github.com/FrozenTear7"
            target="_blank"
            rel="noopener"
          >
            FrozenTear7
          </Link>
          . If you enjoy Fashionframe, consider giving this project a star on
          Github, it means a lot.
        </Typography>
      </Container>
    </>
  );
};

export default APIPage;
