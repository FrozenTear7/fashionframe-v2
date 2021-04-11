import * as React from 'react';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { ColorPickers } from '../../types/WarframeData';

interface SetupDialogColorsProps {
  colorPickers: ColorPickers;
}

const SetupDialogColors: React.VFC<SetupDialogColorsProps> = ({
  colorPickers,
}) => {
  const [currentColorPicker, setCurrentColorPicker] = React.useState(
    Object.keys(colorPickers)[0]
  );

  console.log(colorPickers);
  console.log(Object.keys(colorPickers));

  return (
    // <Grid container justify="center">
    //   <Grid item>
    <List component="ul" aria-label="secondary mailbox folder">
      {Object.keys(colorPickers).map((colorPicker) => (
        <ListItem
          key={colorPicker}
          button
          selected={colorPicker === currentColorPicker}
          // onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary={colorPicker} />
        </ListItem>
      ))}
    </List>
    //   </Grid>
    //   <Grid item>color scheme</Grid>
    // </Grid>
  );
};

export default SetupDialogColors;
