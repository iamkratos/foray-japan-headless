import React, { useState, useEffect, useRef } from "react";
import algoliasearch from "algoliasearch/lite";
import styled from "styled-components";
import {
  InstantSearch,
  SearchBox,
  connectHits,
  RefinementList,
  Configure,
} from "react-instantsearch-dom";

import Wrapper from "../org/Wrapper";
import ProductSearchResult from "../Product/product-search-result";
import { TransitionMixin, media } from "../helpers";

import { animated } from "react-spring";

const searchClient = algoliasearch(
  "H1KL5G36DN",
  "8ed58e18920009652f19c5c5e3de1331"
);

const SearchContainer = styled(animated.div)`
  position: fixed;
  width: 100%;
  top: 83px;
  padding-top: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  z-index: 400;
  ${media.medium`top: 129px;`}
  .ais-SearchBox {
    max-width: 100%;

    form {
      width: 100%;
      display: flex;
      input {
        flex: 1;
        padding: 15px 20px;
        line-height: 1;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 13px;
        letter-spacing: 1px;
        ${TransitionMixin(".25s")}
        &:active,
        &:focus {
          border-color: #000;
          outline: 0;
        }
      }

      button {
        background-color: #fff;
        border: 1px solid #fff;
        color: #fff;
        padding: 10px;
        line-height: 1;

        svg {
          fill: #000;
        }
      }
    }
  }
`;

const HitsContainer = styled.div`
  padding-bottom: 30px;
`;
const SearchMessageContainer = styled.div`
  h4 {
    font-size: 14px;
    margin: 0px 0 20px;
    text-align: center;
  }
`;

const Hits = ({ hits }) => {
  console.log("all hits", hits);
  // Filter out duplicates
  function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  let filteredHits = removeDuplicates(hits, "title");

  return (
    <HitsContainer>
      <Wrapper flex>
        {filteredHits.slice(0, 8).map(hit => {
          return <ProductSearchResult product={hit} />;
        })}
      </Wrapper>
    </HitsContainer>
  );
};
const CustomHits = connectHits(Hits);

const Search = ({ style, isSearchOpen }) => {
  const [searchActive, setSearchActive] = useState(false);
  const inputEl = useRef(null);
  console.log("search is ", isSearchOpen);

  useEffect(() => {
    isSearchOpen === true
      ? inputEl.current.querySelector("input").focus()
      : console.log("not open");
  }, []);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="shopify_products"
      onSearchStateChange={searchState => {
        // use the searchState
        // console.log("estate", searchState.query.length);
        if (searchState.query && searchState.query.length > 0) {
          setSearchActive(true);
        } else {
          setSearchActive(false);
        }
      }}
    >
      <Configure distinct />
      <SearchContainer ref={inputEl} style={{ ...style }}>
        <Wrapper>
          <SearchBox />
        </Wrapper>

        {searchActive ? (
          <CustomHits transformItems={items => console.log("yooo", items)} />
        ) : (
          <SearchMessageContainer>
            <h4>Start typing to make your golf dreams come true</h4>
          </SearchMessageContainer>
        )}
      </SearchContainer>
    </InstantSearch>
  );
};

export default Search;
