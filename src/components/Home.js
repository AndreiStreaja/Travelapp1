import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Carousel from './Carousel';
import Destinations from './Destinations';
import Selections from './Selections';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Carousel />
      <Destinations />
      <Selections />
    </>
  );
};

export default Home;
