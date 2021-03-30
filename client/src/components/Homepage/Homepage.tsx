import * as React from 'react';
import { Helmet } from 'react-helmet-async';

const Homepage: React.VFC = () => {
  return (
    <div className="Homepage">
      <Helmet>
        <title>Fashionframe</title>
        <meta
          name="description"
          content="Fashionframe is a social hub for Warframe players, where they can share their fashion setups and use those, created by others. These fashion setups include attachments, syandanas, colors and skins for all available frames in the game."
        />
      </Helmet>
      Homepage
    </div>
  );
};

export default Homepage;
