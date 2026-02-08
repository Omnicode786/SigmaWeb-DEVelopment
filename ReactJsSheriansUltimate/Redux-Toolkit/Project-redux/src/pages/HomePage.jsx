import React from 'react'
import Tabs from './../components/Tabs';
import ResultGrid from '../components/ResultGrid';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  return (
    <>
            <SearchBar />

      {/* Tabs */}
      <Tabs />

      {/* Results */}
      <ResultGrid />
  </>

  )
}

export default HomePage