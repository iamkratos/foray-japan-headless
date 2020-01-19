import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, connectHits } from "react-instantsearch-dom";
import styled from "styled-components";

const searchClient = algoliasearch(
  "H1KL5G36DN",
  "8ed58e18920009652f19c5c5e3de1331"
);

const HitsContainer = styled.div``;

const Hits = ({ hits }) => {
  console.log(hits);
  return (
    <HitsContainer>
      <h1>Hits</h1>
    </HitsContainer>
  );
};
const CustomHits = connectHits(Hits);

const Search = () => (
  <InstantSearch searchClient={searchClient} indexName="shopify_products">
    <SearchBox />
    <CustomHits />
  </InstantSearch>
);

export default Search;
