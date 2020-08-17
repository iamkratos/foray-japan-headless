import React, { useState } from "react";
import styled from "styled-components";

import SEO from "../components/seo";
import Layout from "../components/layout";
import Wrapper from "../components/org/Wrapper";
import Download from "../images/download.inline.svg";

import { media, TransitionMixin } from "../components/helpers";

const LineSheetContainer = styled.div`
  padding-top: 30px;

  .form-container {
    form {
      text-align: center;
      margin-bottom: 10px;
      .input-container {
        label {
          font-weight: bold;
          font-size: 13px;
          display: block;
        }
        input {
          padding-left: 10px;
          border: 1px solid #ccc;
        }
      }
      button {
        background-color: #000;
        color: #fff;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: bold;
        border: 1px solid #000;
        border-radius: 4px;
        height: 31px;
        margin-left: 6px;
        min-width: 110px;
        line-height: 1;
        ${TransitionMixin(".25s")};

        &:hover {
          background-color: #fff;
          color: #000;
        }
      }
    }
    .error {
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      color: red;
      margin: 0;
    }
  }

  .title-container {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 21px;
      margin: 0;
    }
  }

  .downloads-wrapper {
    ${media.medium`display: flex; flex-wrap: wrap;`}

    .item-container {
      flex: 0 0 33.33%;
      margin-bottom: 20px;

      .inner-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        .image-container {
          margin-right: 10px;
        }
        .content-container {
          h4 {
            margin: 0;
          }
        }
      }
    }
  }
`;

const LineSheet = () => {
  const [password, setPassword] = useState("");
  const [hasPasswordBeenEntered, setHasPasswordBeenEntered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let files = [
    {
      title: "2021 Spring/Summer Collection",
      url:
        "https://foray.wmgprojects.com/wp-content/uploads/2020/08/2021-FORAY-GOLF-WHOLESALE-LINESHEET-compressed.pdf",
    },
    {
      title: "2020-21 Cashmere Collection",
      url:
        "https://foray.wmgprojects.com/wp-content/uploads/2020/08/2021-FORAY-GOLF-CASHMERE-LINE-SHEET.pdf",
    },
    {
      title: "2021 Custom Collection",
      url:
        "https://foray.wmgprojects.com/wp-content/uploads/2020/08/2021-CUSTOM-Spring_Summer.pdf",
    },
    {
      title: "2021 Price List",
      url:
        "https://foray.wmgprojects.com/wp-content/uploads/2020/08/2021-PRICE-LIST-8.1.20.xlsx",
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (password === "foray2021") {
      setHasPasswordBeenEntered(true);
      setErrorMessage("");
    } else {
      setErrorMessage("That password is incorrect.");
    }
  }

  return (
    <Layout>
      <SEO title="2021 Line Sheet Materials">
        <meta name="robots" content="noindex" />
      </SEO>
      <LineSheetContainer>
        {!hasPasswordBeenEntered ? (
          <Wrapper className="form-container">
            <form onSubmit={e => handleSubmit(e)}>
              <div className="input-container">
                <label htmlFor="password">Enter Password</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
              </div>
            </form>
            {errorMessage != "" && <p className="error">{errorMessage}</p>}
          </Wrapper>
        ) : (
          <>
            <Wrapper>
              <div className="title-container">
                <h1>2021 Line Sheet Materials</h1>
              </div>
            </Wrapper>
            <Wrapper className="downloads-wrapper">
              {files.map(file => {
                return (
                  <div className="item-container">
                    <a target="_blank" download href={file.url}>
                      <div className="inner-wrap">
                        <div className="image-container">
                          <Download />
                        </div>
                        <div className="content-container">
                          <h4>{file.title}</h4>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </Wrapper>
          </>
        )}
      </LineSheetContainer>
    </Layout>
  );
};

export default LineSheet;
