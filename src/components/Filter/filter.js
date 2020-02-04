import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const ProductFilter = ({ products, filteredProducts, setFilteredProducts }) => {
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
    <div>
      <p>color filter</p>
      {finalColors.map(regularCaseColor => {
        let color = colorHandlize(regularCaseColor);
        return (
          <button onClick={() => filterByColor(color)} value={color}>
            {color}
          </button>
        );
      })}
    </div>
  );
};

export default ProductFilter;
