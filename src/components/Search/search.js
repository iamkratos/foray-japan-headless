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

import { window } from "browser-monads";

import Wrapper from "../org/Wrapper";
import ProductSearchResult from "../product/product-search-result";
import { TransitionMixin, media } from "../helpers";

import { animated } from "react-spring";
import { navigate } from "gatsby";

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
  &.shrunk {
    ${media.medium`top: 100px;`}
  }
  &.instagram-styles {
    top: 123px;
  }
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
  min-height: 100vh;

  .hits-wrapper {
    max-height: 70vh;
    overflow: hidden;
    position: relative;
    overflow-y: scroll;
    ${media.medium`overflow-y: initial; max-height: 100%;`}
  }
`;
const SearchMessageContainer = styled.div`
  h4 {
    font-size: 14px;
    margin: 0px 0 20px;
    text-align: center;
  }
`;

const Hits = ({ hits }) => {
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

  localStorage.setItem("searchItems", JSON.stringify(filteredHits));

  return (
    <HitsContainer>
      <Wrapper className="hits-wrapper" flex>
        {filteredHits.slice(0, 8).map((hit, index) => {
          return <ProductSearchResult product={hit} key={index} />;
        })}
      </Wrapper>
    </HitsContainer>
  );
};
const CustomHits = connectHits(Hits);

const Search = ({
  style,
  isSearchOpen,
  isMenuShrunk,
  isInstagramBrowser,
  location,
}) => {
  const [searchActive, setSearchActive] = useState(false);
  const [results, setResults] = useState([]);
  const inputEl = useRef(null);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (window.location.href.includes("search-results")) {
      window.location.reload();
    } else {
      navigate("/search-results");
    }
  }

  useEffect(() => {
    isSearchOpen === true && inputEl.current.querySelector("input").focus();
    localStorage.removeItem("searchItems");
    localStorage.removeItem("searchTerm");
  }, []);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="shopify_products"
      onSearchStateChange={searchState => {
        // use the searchState
        if (searchState.query && searchState.query.length > 0) {
          setSearchActive(true);
        } else {
          setSearchActive(false);
        }
        localStorage.setItem("searchTerm", searchState.query);
      }}
    >
      <Configure distinct />
      <SearchContainer
        className={
          isMenuShrunk
            ? "shrunk "
            : "" && isInstagramBrowser
            ? "instagram-styles"
            : ""
        }
        ref={inputEl}
        style={{ ...style }}
      >
        <Wrapper>
          <SearchBox onSubmit={e => handleSearchSubmit(e)} />
        </Wrapper>

        {searchActive ? (
          <CustomHits setResults={setResults} />
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
