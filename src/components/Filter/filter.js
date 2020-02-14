import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import styled from "styled-components";

const FilterContainer = styled.div`
  flex: 1;
`;

const ProductFilter = ({
  products,
  filteredProducts,
  setFilteredProducts,
  setFilterColor,
}) => {
  console.log("products here", products);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const { colorHandlize, colorHandlizeAndReplaceSimilarColors } = useContext(
    StoreContext
  );

  //   1. Find All Unique Values of Color Variant

  let finalColors = [];
  products.map(product => {
    product.variants.map(variants => {
      // -- Filter Duplicate Colors
      variants.selectedOptions.map(option => {
        if (option.name === "Color") {
          finalColors.push(option.value);
        }
      });
    });
  });

  finalColors = finalColors.filter(onlyUnique);
  console.log(finalColors);

  function filterByColor(handlelizedFilterColor) {
    setFilterColor(handlelizedFilterColor);
    let filteredProducts = [];
    products.map(product => {
      let filteredProductValues = [];
      product.options.map(option => {
        if (option.name === "Color") {
          option.values.map(value => {
            console.log(value);
            let handlizedValue = colorHandlizeAndReplaceSimilarColors(value);
            if (handlizedValue === handlelizedFilterColor) {
              filteredProductValues.push(value);
            }
          });
        }
      });

      if (filteredProductValues.length > 0) {
        filteredProducts.push(product);
      }
    });
    console.log("the filtered products are", filteredProducts.length);
    setFilteredProducts(filteredProducts);
  }

  return (
    <FilterContainer>
      <h4>color filter</h4>
      <div className="color-container">
        <ul className="colors">
          {finalColors.map(regularCaseColor => {
            let color = colorHandlize(regularCaseColor);
            return (
              <li>
                <button
                  onClick={() => filterByColor(color)}
                  value={color}
                  className={"color-btn-container " + color}
                ></button>
              </li>
            );
          })}
        </ul>
      </div>
    </FilterContainer>
  );
};

export default ProductFilter;
