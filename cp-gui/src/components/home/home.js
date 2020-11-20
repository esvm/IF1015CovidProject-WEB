import React from 'react'
import Kefir from 'kefir'

import HomeModule from './home.module.js'

import FromStream from "../fromStream/fromStream"

const stream = Kefir.interval(1000).map(() => new Date().toString());

const Home = () => (
  <FromStream stream={stream}>
    {(data) =>
      <HomeModule data={data} />
    }
  </FromStream>
);

export default Home;
