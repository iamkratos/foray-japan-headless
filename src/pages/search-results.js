import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";

import Layout from "../components/layout";
import SEO from "../components/seo";
import ProductFilter from "../components/Filter/filter";
import CollectionProductGridItem from "../components/Product/collection-product-grid-item";
import Wrapper from "../components/org/Wrapper";

import { useAllProductsQuery } from "../queries/all-products";

const CollectionContainer = styled.section`
  .current-filter {
    .title-container {
      h1 {
        border-bottom: 0px;
      }
    }
  }
`;

const Spacer = styled.div`
  height: 40px;
`;

const ProductGridContainer = styled.section`
  flex: 5;

  .no-results {
    font-size: 18px;
    text-align: center;
  }
`;

const SearchResults = ({ location }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterColor, setFilterColor] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterFeature, setFilterFeature] = useState("");
  const [currentColorTooltip, setCurrentColorTooltip] = useState("");
  const [tooltipColor, setTootipColor] = useState("");
  const [collectionMetaImage, setCollectionMetaImage] = useState([]);

  const [currentFilters, setCurrentFilters] = useState({
    color: null,
    size: null,
    feature: null,
  });

  const [collection, setCollection] = useState({
    title: "Search Results",
    products: [],
  });

  const { edges } = useAllProductsQuery();
  useEffect(() => {
    let results = JSON.parse(localStorage.getItem("searchItems"));
    let searchTerm = localStorage.getItem("searchTerm");
    let searchResultsArray = [];
    results.map(result => {
      edges.map(productNode => {
        if (result.handle === productNode.node.handle) {
          searchResultsArray.push(productNode.node);
        }
      });
    });

    let searchObject = {
      title: `Search Results: ${searchTerm}`,
      products: searchResultsArray,
    };

    setCollection({ ...collection, ...searchObject });
    setCurrentFilters({ color: null, size: null, feature: null });
  }, []);
  return (
    <Layout>
      <SEO title="Search Results" />
      <Spacer />
      <CollectionContainer>
        <Wrapper flex>
          <ProductFilter
            location={location}
            currentFilters={currentFilters}
            setCurrentFilters={setCurrentFilters}
            setFilterColor={setFilterColor}
            filterColor={filterColor}
            filterSize={filterSize}
            setFilterSize={setFilterSize}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            collection={collection}
            products={collection.products}
            tooltipColor={tooltipColor}
            setTootipColor={setTootipColor}
            currentColorTooltip={currentColorTooltip}
            setCurrentColorTooltip={setCurrentColorTooltip}
            filterFeature={filterFeature}
            setFilterFeature={setFilterFeature}
          />

          <ProductGridContainer>
            {filteredProducts.length === 0 && (
              <h2 className="no-results">No products found.</h2>
            )}
            <Wrapper flex>
              {filteredProducts.map((product, index) => {
                let isProductAddon = product.title.includes("Add On")
                  ? true
                  : false;
                if (isProductAddon) {
                  return;
                }
                return (
                  <LazyLoad key={index} height={200}>
                    <CollectionProductGridItem
                      currentFilters={currentFilters}
                      product={product}
                      filterColor={filterColor}
                      setFilterColor={setFilterColor}
                      filteredProducts={filteredProducts}
                    />
                  </LazyLoad>
                );
              })}
            </Wrapper>
          </ProductGridContainer>
        </Wrapper>
      </CollectionContainer>
    </Layout>
  );
};

export default SearchResults;
