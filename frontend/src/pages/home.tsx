import React from 'react';
import { Helmet } from 'react-helmet-async';

const HomePage: React.FC<{}> = () => {
  return (
    <>
      {/* Meta section */}
      <Helmet>
        <title>VicaSpace - Chill lounge</title>
        <meta name="Let's chill in this McHouse Lounge" content="VicaSpace" />
      </Helmet>
      {/* Page Body */}
      <div>HomePage</div>
    </>
  );
};

export default HomePage;
