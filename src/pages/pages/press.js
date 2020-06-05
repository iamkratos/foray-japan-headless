import React from "react";
import Layout from "../../components/layout";
import styled from "styled-components";

import SEO from "../../components/seo";
import Wrapper from "../../components/org/Wrapper";
import { media } from "../../components/helpers";

const PressPageContainer = styled.section`
  .title-container {
    padding-top: 40px;
    text-align: center;

    h1 {
      font-size: 24px;
    }
  }

  .logo-grid {
    ${media.medium`display: flex;flex-wrap: wrap;`}
    .logo {
      flex: 0 0 25%;
      align-self: center;
      text-align: center;
      ${media.medium`flex: 0 0 25%;`}

      img {
        max-width: 200px;
        margin: 0 auto;
      }
    }
  }
`;

const PressPage = () => {
  return (
    <Layout>
      <SEO title="Press" />
      <PressPageContainer>
        <div className="title-container">
          <h1>Press</h1>
        </div>
        <Wrapper>
          <div className="logo-grid">
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/holiday-golf-gifts-2018-for-golfers-who-travel"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/90.jpeg?14155454799027317405"
                  alt="Golf Digest"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/trendy-new-golf-apparel-on-display-in-las-vegas"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/Golf_Channel_Logo.png?14155454799027317405"
                  alt="Golf Channel"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/coolest-things-at-the-pga-fashion-show-and-project-golf"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/90.jpeg?14155454799027317405"
                  alt="Golf Digest"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/nightly-business-report-june-15-2018"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/t/7/assets/nbr-logo.png?v=3173820925035347953"
                  alt="Nightly Business Report"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.golfdigest.com/story/6-up-and-coming-golf-clothing-brands-you-havent-heard-of-yet-but-should"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/90.jpeg?14155454799027317405"
                  alt="Golf Digest"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="http://www.nylon.com.sg/2017/10/fashion-spread-helter-skelter.html"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/nylonlogo_preview.png?14414102274415376899"
                  alt="Nylon"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/finally-something-truly-new-in-women-s-golf-fashion"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/LPGA-Womens-Network-Brandmark-black.png?8168855883151096177"
                  alt="LPGA"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="http://www.golfchannel.com/video/shocking-sassy-morning-drive-product-picks/"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/Golf_Channel_Logo.png?14155454799027317405"
                  alt="Golf Channel"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="http://www.refinery29.com/trendy-holiday-gift-guide#slide-23"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/Refinery29_logo.svg_1a4d623f-38cd-4cbf-b68a-3a89996ade89.png?14155454799027317405"
                  alt="Refinery 29"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/articles?preview_key=70871bd2c595f176d3d5f1a4e663b6d0"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/GottaGoGolf-logo-2018-1.jpg?14155454799027317405"
                  alt="Gotta Go Golf"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/episode-7-megan-lamothe-itsallforay"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/1511842725992.jpeg?14155454799027317405"
                  alt="What We Do"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/golf-digest-former-victorias-secret-employees-started-their-own-golf-clothing-company"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/90.jpeg?14155454799027317405"
                  alt="Golf Digest"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/millennials-breathing-new-life-into-the-stodgy-game-of-golf-and-heres-how-the-industry-is-responding"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/CNBC-Logo.png?14155454799027317405"
                  alt="CNBC"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/foray-golfs-functional-meets-fashionable-womens-performance-apparel-tees-up-at-two-local-shops"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/2000px-Los_Angeles_Times_logo.svg_8ebe228c-1f89-4789-92a1-ec502d894547.png?14155454799027317405"
                  alt="LA Times"
                  className="img-responsive"
                />
              </a>
            </div>
            <div className="logo">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.foraygolf.com/blogs/teamforaygolf/former-victoria-s-secret-executive-starts-foray-golf-to-sell-direct-to-consumers"
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/2119/7099/files/WWD_logo.png?14155454799027317405"
                  alt="WWD"
                  className="img-responsive"
                />
              </a>
            </div>
          </div>
        </Wrapper>
      </PressPageContainer>
    </Layout>
  );
};

export default PressPage;
