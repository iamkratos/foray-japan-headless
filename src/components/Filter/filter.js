import React, { useContext, useState, useEffect } from "react";
import { window } from "browser-monads";
import { StoreContext } from "../../context/StoreContext";
import FilterStyles from "./filter-styles";
import X from "../../images/x.inline.svg";

const ProductFilter = ({
  setCurrentFilters,
  currentFilters,
  products,
  filterColor,
  setFilterColor,
  filterSize,
  setFilterSize,
  filteredProducts,
  setFilteredProducts,
  setTootipColor,
  tooltipColor,
  collection,
  currentColorTooltip,
  setCurrentColorTooltip,
  filterFeature,
  setFilterFeature,
  location,
}) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const { colorHandlize, reverseColorHandlize } = useContext(StoreContext);

  // Mobile Fitler
  const [toggleMobileFilter, setToggleMobileFilter] = useState(false);

  function handleMobileFilterToggle() {
    setToggleMobileFilter(!toggleMobileFilter);
  }

  //   1. Find All Unique Values of Color Variant

  let finalColors = [];
  products.map(product => {
    let isProductAddon = product.title.includes("Add On") ? true : false;
    if (isProductAddon) {
      return null;
    }
    product.variants.map(variants => {
      // -- Filter Duplicate Colors
      variants.selectedOptions.map(option => {
        if (option.name === "Color") {
          finalColors.push(option.value);
        }
        return null;
      });
      return null;
    });
    return null;
  });

  finalColors = finalColors.filter(onlyUnique);
  finalColors = finalColors.filter(
    item =>
      item !== "Rosso Red" &&
      item !== "Nero Black" &&
      item !== "Left" &&
      item !== "Right"
  );

  // console.log(finalColors);

  // 2. Find all unique sizes
  let finalSizes = [];

  products.map(product => {
    product.variants.map(variants => {
      // -- Filter Duplicate Colors
      variants.selectedOptions.map(option => {
        if (option.name === "Size") {
          finalSizes.push(option.value);
        }
        return null;
      });
      return null;
    });
    return null;
  });
  finalSizes = finalSizes.filter(onlyUnique);
  finalSizes = finalSizes.filter(
    item =>
      item !== "$50 Foray Golf Gift Card" &&
      item !== "$100 Foray Golf Gift Card" &&
      item !== "$250 Foray Golf Gift Card" &&
      item !== "$500 Foray Golf Gift Card"
  );

  // 2. Find all unique feature tags
  let finalFeatureTags = [];

  products.map(product => {
    product.tags.map(tag => {
      if (tag.includes("Features")) {
        finalFeatureTags.push(tag);
      }
    });
  });

  finalFeatureTags = finalFeatureTags.filter(onlyUnique);

  function filterByParams(filters) {
    const { color, size, feature } = filters;
    // console.log("params", color, size, feature);

    // If no params are selected, show all products as no filters are selected
    if (color === null && size === null && feature === null) {
      console.log("this is tripping");
      setFilteredProducts(products);
      return;
    }

    // The golden array
    let paramsFilteredProducts = [];

    // other arrays
    let paramsFilteredProductsColorStage = [];
    let paramsFilteredProductsSizeStage = [];
    let paramsFilteredProductsFeatureStage = [];

    // 1. Color
    if (color !== null) {
      products.map(product => {
        let doesProductHaveColor;
        let doesProductHaveFilterColor = false;

        // 1a. Check if products has a color variant, only check first variant of product
        product.variants.map((variant, index) => {
          if (index === 0) {
            doesProductHaveColor = variant.selectedOptions.length > 1;
          }

          // 1b. If the product has a color, check if it has the same as the filter condition
          if (doesProductHaveColor && doesProductHaveFilterColor !== true) {
            doesProductHaveFilterColor =
              colorHandlize(variant.selectedOptions[0].value) === color;
          }
        });

        // 1e. Search tags for Color_ to include in color
        // we should check that the color variant has it, and is available
        let doesProductHaveColorTag = false;
        product.tags.map(tag => {
          let updatedTag = tag.replace("Color_", "");
          updatedTag = colorHandlize(updatedTag);
          if (tag.toLowerCase() === color) {
            doesProductHaveColorTag = true;
          }
        });

        // 1c. If there is a size,
        // we should check that the color variant has it, and is available
        let doesProductHaveColorAndSizeAvailable = false;
        if (
          (doesProductHaveFilterColor === true ||
            doesProductHaveColorTag === true) &&
          size !== null
        ) {
          product.variants.map(variant => {
            if (
              (colorHandlize(variant.selectedOptions[0].value) === color ||
                doesProductHaveColorTag) &&
              (colorHandlize(variant.selectedOptions[0].value) === size ||
                (variant.selectedOptions[1] &&
                  colorHandlize(variant.selectedOptions[1].value) === size)) &&
              variant.availableForSale
            ) {
              doesProductHaveColorAndSizeAvailable = true;
            }
          });
        }

        // 1d. If there is a feature,
        // we should check that the color variant has it, and is available
        let doesProductHaveColorAndFeatureAvailable = false;
        if (
          (doesProductHaveFilterColor === true ||
            doesProductHaveColorTag === true) &&
          feature !== null
        ) {
          product.tags.map(tag => {
            if (tag.toLowerCase() === feature) {
              doesProductHaveColorAndFeatureAvailable = true;
            }
          });
        }

        if (size === null && feature === null) {
          if (doesProductHaveFilterColor || doesProductHaveColorTag) {
            paramsFilteredProductsColorStage.push(product);
          }
        } else if (size !== null) {
          if (
            (doesProductHaveFilterColor || doesProductHaveColorTag) &&
            doesProductHaveColorAndSizeAvailable
          ) {
            paramsFilteredProductsColorStage.push(product);
          }
        } else if (feature !== null) {
          if (
            (doesProductHaveFilterColor || doesProductHaveColorTag) &&
            doesProductHaveColorAndFeatureAvailable
          ) {
            paramsFilteredProductsColorStage.push(product);
          }
        }
      });
    }

    // console.log(
    //   "paramsFilteredProductsColorStage",
    //   paramsFilteredProductsColorStage
    // );

    // 2. Size
    if (size !== null) {
      // 2a. If no color filter has been set, set filteredProducts to all collection products.
      // Also make a new array to push new products to: new

      let startingArray = [];

      startingArray =
        paramsFilteredProductsColorStage.length === 0
          ? products
          : paramsFilteredProductsColorStage;

      startingArray.map(product => {
        let sizeVariant;
        let doesProductHaveFilterSize = false;
        let doesProductHaveColor = false;
        product.variants.map((variant, index) => {
          // check if product has color to understand the selectedOptions target
          if (index === 0) {
            sizeVariant = variant.selectedOptions.length > 1 ? 1 : 0;
          }

          // then check if the variant size matches the filter size and is available

          if (
            colorHandlize(variant.selectedOptions[sizeVariant].value) ===
              size &&
            variant.availableForSale &&
            doesProductHaveFilterSize !== true
          ) {
            doesProductHaveFilterSize = true;
          }
        });

        // 2c. If there is a color,
        // we should check that the color variant has it, and is available
        let doesProductHaveColorAndSizeAvailable = false;
        if (doesProductHaveFilterSize === true && color !== null) {
          product.variants.map(variant => {
            if (
              colorHandlize(variant.selectedOptions[0].value) === color &&
              variant.selectedOptions[1].value.toLowerCase() === size &&
              variant.availableForSale
            ) {
              doesProductHaveColorAndSizeAvailable = true;
            }
          });

          // check tags for color
          product.tags.map(tag => {
            let updatedTag = tag.replace("Color_", "");
            updatedTag = colorHandlize(updatedTag);
            if (tag.toLowerCase() === color) {
              doesProductHaveColorAndSizeAvailable = true;
            }
          });
        }

        // 2d. If there is a feature,
        // we should check that the color variant has it, and is available
        let doesProductHaveSizeAndFeatureAvailable = false;
        if (doesProductHaveFilterSize === true && feature !== null) {
          product.tags.map(tag => {
            if (tag.toLowerCase() === feature) {
              doesProductHaveSizeAndFeatureAvailable = true;
            }
          });
        }

        // Final if statement to check for color and feature
        if (color === null && feature === null) {
          // console.log("case 1", product.title);
          if (doesProductHaveFilterSize) {
            paramsFilteredProductsSizeStage.push(product);
          }
        } else if (color !== null) {
          // console.log("case 2", product.title);
          if (
            doesProductHaveFilterSize &&
            doesProductHaveColorAndSizeAvailable
          ) {
            paramsFilteredProductsSizeStage.push(product);
          }
        } else if (feature !== null) {
          // console.log("case 3", product.title);
          if (
            doesProductHaveFilterSize &&
            doesProductHaveSizeAndFeatureAvailable
          ) {
            paramsFilteredProductsSizeStage.push(product);
          }
        }
      });
    }

    // console.log(
    //   "paramsFilteredProductsSizeStage",
    //   paramsFilteredProductsSizeStage
    // );

    if (feature !== null) {
      // 3a. If no color or size filter has been set, set filteredProducts to all collection products.
      // Also make a new array to push new products to

      let startingArray = [];

      if (paramsFilteredProductsSizeStage.length > 0 || size != null) {
        startingArray = paramsFilteredProductsSizeStage;
      } else if (paramsFilteredProductsColorStage.length > 0 || color != null) {
        startingArray = paramsFilteredProductsColorStage;
      } else {
        startingArray = products;
      }

      startingArray.map(product => {
        let doesProductHaveTag = false;

        // check tag
        product.tags.map(tag => {
          if (tag.toLowerCase() === feature) {
            doesProductHaveTag = true;
          }
        });

        // check size
        let doesProductHaveFilterSize = false;
        if (size !== null) {
          let sizeVariant;
          product.variants.map((variant, index) => {
            // check if product has color to understand the selectedOptions target
            if (index === 0) {
              sizeVariant = variant.selectedOptions.length > 1 ? 1 : 0;
            }

            // then check if the variant size matches the filter size and is available

            if (
              colorHandlize(variant.selectedOptions[sizeVariant].value) ===
                size &&
              variant.availableForSale &&
              doesProductHaveFilterSize !== true
            ) {
              doesProductHaveFilterSize = true;
            }
          });
        }

        // check color

        let doesProductHaveColorAvailable = false;
        if (color !== null) {
          product.variants.map(variant => {
            if (
              colorHandlize(variant.selectedOptions[0].value) === color &&
              variant.availableForSale
            ) {
              doesProductHaveColorAvailable = true;
            }
          });
          // --- check color tags
          product.tags.map(tag => {
            let updatedTag = tag.replace("Color_", "");
            updatedTag = colorHandlize(updatedTag);
            if (tag.toLowerCase() === color) {
              doesProductHaveColorAvailable = true;
            }
          });
        }

        // Final if statement to check for color and size
        if (color === null && size === null) {
          // console.log("case 1", product.title);
          if (doesProductHaveTag) {
            paramsFilteredProductsFeatureStage.push(product);
          }
        } else if (color !== null) {
          // console.log("case 2", product.title);
          if (doesProductHaveTag && doesProductHaveColorAvailable) {
            paramsFilteredProductsFeatureStage.push(product);
          }
        } else if (size !== null) {
          // console.log("case 3", product.title);
          if (doesProductHaveTag && doesProductHaveFilterSize) {
            paramsFilteredProductsFeatureStage.push(product);
          }
        }
      });
    }

    // TODO: setup trigger based on whether there is one or more null value
    let filtersActive = 0;
    let filtersNameActive = [];
    Object.entries(currentFilters).map(([key, value]) => {
      if (value !== null) {
        filtersActive = filtersActive + 1;
        filtersNameActive.push(key);
      }
    });

    // console.log("filters active", filtersActive, filtersNameActive);
    // handles one filter being active
    if (filtersActive === 1) {
      if (filtersNameActive[0] === "color") {
        console.log("color only");
        setFilteredProducts(paramsFilteredProductsColorStage);
      } else if (filtersNameActive[0] === "size") {
        console.log("size only", paramsFilteredProductsSizeStage);
        setFilteredProducts(paramsFilteredProductsSizeStage);
      } else if (filtersNameActive[0] === "feature") {
        console.log("feature only", paramsFilteredProductsFeatureStage);
        setFilteredProducts(paramsFilteredProductsFeatureStage);
      }
    } else {
      // console.log(
      //   "multi values",
      //   paramsFilteredProductsColorStage,
      //   paramsFilteredProductsSizeStage,
      //   paramsFilteredProductsFeatureStage
      // );

      function crossCheck() {
        // see which products have duplicates
        let superArray = [
          ...paramsFilteredProductsColorStage,
          ...paramsFilteredProductsSizeStage,
          ...paramsFilteredProductsFeatureStage,
        ];

        if (superArray.length === 0) {
          setFilteredProducts([]);
        } else if (superArray.length === 1) {
          setFilteredProducts(superArray);
        } else {
          superArray.map(product => {
            // 1. Find duplicates, they should match the amount of filter conditions
            // console.log("super", superArray);
            let duplicates = superArray.filter(
              arrayProduct => arrayProduct.handle === product.handle
            );

            // console.log("unique", duplicates);

            if (duplicates.length === filtersActive) {
              paramsFilteredProducts.push(product);
            }
          });

          const uniqueProducts = Array.from(
            new Set(paramsFilteredProducts.map(a => a.handle))
          ).map(handle => {
            return paramsFilteredProducts.find(a => a.handle === handle);
          });

          setFilteredProducts(uniqueProducts);
        }
      }

      crossCheck();
    }
  }

  function filterByColor(handlelizedFilterColor) {
    setCurrentFilters({ ...currentFilters, color: handlelizedFilterColor });
  }

  function filterBySize(handlelizedFilterSize, colorFilter) {
    setCurrentFilters({
      ...currentFilters,
      size: handlelizedFilterSize.split(" ")[0],
    });
  }

  function filterBytag(tagName) {
    setCurrentFilters({
      ...currentFilters,
      feature: tagName.toLowerCase(),
    });
  }

  function handleColorFilterHover(color) {
    if (color === "BW") {
      setTootipColor("B&W");
    } else if (color === "NB") {
      setTootipColor("N&B");
    } else {
      setTootipColor(color);
    }
  }

  // this for monitoring the tooltip
  function handleColorFilterReset() {
    if (currentColorTooltip !== tooltipColor) {
      setTootipColor(currentColorTooltip);
    }
  }

  // remove filter condition

  function removeFilterCondition(condition, key) {
    setCurrentFilters({
      ...currentFilters,
      [key]: null,
    });
  }

  // reset button
  function handleResetFilters() {
    setCurrentFilters({
      ...currentFilters,
      color: null,
      size: null,
      feature: null,
    });
    setFilteredProducts(collection.products);
  }

  function setFilterURL(params) {
    let urlArray = [];
    Object.entries(params).map(([key, value]) => {
      if (value !== null) {
        let newValue = value;

        if (value.includes("features_")) {
          newValue = value.replace("features_", "");
        }

        urlArray.push(key + "=" + newValue);
      }
    });

    if (urlArray.length > 0) {
      let finalURL;
      urlArray.map((param, index) => {
        if (index === 0) {
          finalURL = "?" + param;
        } else {
          finalURL = finalURL + "&" + param;
        }

        window.history.replaceState("page2", "Title", finalURL);
      });
    } else {
      window.history.replaceState("page2", "Title", location.pathname);
    }
  }

  useEffect(() => {
    // When we update the filters, we update the products + the url
    filterByParams(currentFilters);
    setFilterURL(currentFilters);
    // console.log("current filters updated");
  }, [currentFilters]);

  return (
    <FilterStyles className={toggleMobileFilter ? "active" : ""}>
      <div className="filter-mobile-trigger">
        <button onClick={handleMobileFilterToggle}>
          {toggleMobileFilter ? "Close" : "Filter"}
        </button>
      </div>
      <div className="inner-wrap">
        <div className="scroll-container">
          <div className="current-filter">
            <div className="title-container">
              <h1>{collection.title}</h1>
            </div>
            <div className="inner-wrap">
              <ul>
                {Object.entries(currentFilters).map(([key, value]) => {
                  let isThereAValue = value !== null;
                  let updatedTerm =
                    isThereAValue && reverseColorHandlize(value);
                  updatedTerm =
                    isThereAValue && updatedTerm.replace("Features_", "");

                  return (
                    isThereAValue && (
                      <li key={value}>
                        <button
                          onClick={() => removeFilterCondition(value, key)}
                        >
                          {updatedTerm}
                          <span>
                            <X />
                          </span>
                        </button>
                      </li>
                    )
                  );
                })}
              </ul>
              <button className="clear" onClick={handleResetFilters}>
                Remove All Filters
              </button>
            </div>
          </div>
          {finalColors.length > 0 && (
            <div className="color-filter-container">
              <h4 className="filter-title">Colors</h4>
              <div className="color-container">
                <ul className="colors" onMouseLeave={handleColorFilterReset}>
                  {finalColors.map((regularCaseColor, index) => {
                    let color = colorHandlize(regularCaseColor);
                    return (
                      <li key={index} className={color}>
                        <button
                          onMouseEnter={() =>
                            handleColorFilterHover(regularCaseColor)
                          }
                          onClick={() => filterByColor(color, regularCaseColor)}
                          value={color}
                          className={"color-btn-container " + color}
                        ></button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                className={
                  tooltipColor.length > 0
                    ? "tooltip-container active"
                    : "tooltip-container hide"
                }
              >
                <div className="inner-wrap">{tooltipColor}</div>
              </div>
            </div>
          )}

          <div className="size-filter-container">
            <h4 className="filter-title">Sizes</h4>
            <div className="size-container">
              <ul className="sizes">
                {finalSizes.map((regularCaseSize, index) => {
                  let size = colorHandlize(regularCaseSize);
                  return (
                    <li
                      key={index}
                      prop={filterSize}
                      className={"size-" + size}
                    >
                      <button
                        onClick={() => filterBySize(size, filterColor)}
                        value={size}
                        className={
                          currentFilters.size === size
                            ? "size-btn-container active " + size
                            : "size-btn-container " + size
                        }
                      >
                        {regularCaseSize}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {finalFeatureTags.length > 0 && (
            <div className="tags-container features">
              <h4 className="filter-title">Features</h4>

              <div className="features-container">
                <ul className="features">
                  {finalFeatureTags.map((regularCaseFeature, index) => {
                    let feature = regularCaseFeature.replace("Features_", "");
                    return (
                      <li key={index} className={"feature-" + feature}>
                        <button
                          onClick={() => filterBytag(regularCaseFeature)}
                          value={feature}
                          className={
                            currentFilters.feature &&
                            currentFilters.feature.replace("features_", "") ===
                              feature.toLowerCase()
                              ? "tag-btn-container active"
                              : "tag-btn-container"
                          }
                        >
                          {feature}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </FilterStyles>
  );
};

export default ProductFilter;
