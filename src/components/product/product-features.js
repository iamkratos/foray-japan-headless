import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

const ProductFeaturesContainer = styled.div`
  .icon-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    max-width: 400px;

    .image-container {
      flex: 0 0 25%;
      margin-bottom: 10px;
      .gatsby-image-wrapper {
        max-width: 80px;
        margin: 0 auto;
      }
    }
  }
`;

const ProductFeatures = () => {
  const data = useStaticQuery(graphql`
    query {
      fourWayStretch: file(
        relativePath: { eq: "product-icons/four-way-stretch.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      absorbsMoisture: file(
        relativePath: { eq: "product-icons/absorbs-moisture.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      easyCare: file(relativePath: { eq: "product-icons/easy-care.png" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      increasedMobility: file(
        relativePath: { eq: "product-icons/increased-mobility.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      noPilling: file(relativePath: { eq: "product-icons/no-pilling.png" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      quickDry: file(relativePath: { eq: "product-icons/quick-dry.png" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sunUVA: file(relativePath: { eq: "product-icons/sun-uva.png" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      wrinkleResistant: file(
        relativePath: { eq: "product-icons/wrinkle-resistant.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <ProductFeaturesContainer>
      <div className="icon-wrapper">
        <div className="image-container">
          <Img fluid={data.fourWayStretch.childImageSharp.fluid} />
        </div>
        <div className="image-container">
          <Img fluid={data.wrinkleResistant.childImageSharp.fluid} />
        </div>
        <div className="image-container">
          <Img fluid={data.sunUVA.childImageSharp.fluid} />
        </div>
        <div className="image-container">
          <Img fluid={data.quickDry.childImageSharp.fluid} />
        </div>
        <div className="image-container">
          <Img fluid={data.noPilling.childImageSharp.fluid} />
        </div>
        <div className="image-container">
          <Img fluid={data.increasedMobility.childImageSharp.fluid} />
        </div>
        <div className="image-container">
          <Img fluid={data.easyCare.childImageSharp.fluid} />
        </div>
        <div className="image-container">
          <Img fluid={data.absorbsMoisture.childImageSharp.fluid} />
        </div>
      </div>
    </ProductFeaturesContainer>
  );
};

export default ProductFeatures;
