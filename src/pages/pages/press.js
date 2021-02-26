// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useStaticQuery, graphql, navigate } from "gatsby";

// import { TransitionMixin, media } from "../../components/helpers";
// import SEO from "../../components/seo";
// import Layout from "../../components/layout";
// import Wrapper from "../../components/org/Wrapper";
// import PressItem from "../../components/Press/press-item";
// import PressSidebar from "../../components/Press/press-sidebar";

// const PressContainer = styled.div`
//   .title-container {
//     padding: 40px 0 0;
//     h1 {
//       margin-bottom: 0px;
//       font-weight: 100;
//       font-size: 36px;
//     }
//   }
//   .feed-index-wrapper {
//     ${media.medium`display: flex; `}

//     .feed-container {
//       flex: 3;
//       margin-bottom: 30px;
//       ${media.medium`margin-bottom: 0px;`}

//       .btn-load-more {
//         background-color: #2a2a2a;
//         border: 1px solid #2a2a2a;
//         color: #fff;
//         font-weight: bold;
//         text-transform: uppercase;
//         font-size: 13px;
//         letter-spacing: 1px;
//         width: 100%;
//         padding: 10px;
//         border-radius: 5px;

//         ${TransitionMixin(".25s")}

//         &:hover {
//           background-color: #fff;
//           color: #2a2a2a;
//         }
//       }
//     }
//     .sidebar-container {
//       flex: 1;
//       ${media.medium`padding-left: 50px;`}
//     }
//   }
// `;

// const PressV2 = () => {
//   const [postsShowing, setPostsShowing] = useState(4);
//   const data = useStaticQuery(graphql`
//     query {
//       allWordpressPage(filter: { title: { eq: "Press" } }) {
//         edges {
//           node {
//             acf {
//               press_items {
//                 article_link
//                 excerpt
//                 press_link
//                 press_logo {
//                   localFile {
//                     childImageSharp {
//                       fluid(maxWidth: 300) {
//                         ...GatsbyImageSharpFluid
//                       }
//                     }
//                   }
//                 }
//                 thumbnail {
//                   localFile {
//                     childImageSharp {
//                       fluid(maxWidth: 600, quality: 95) {
//                         ...GatsbyImageSharpFluid
//                       }
//                     }
//                   }
//                 }
//                 title
//               }
//             }
//           }
//         }
//       }
//     }
//   `);

//   let press_items = data.allWordpressPage.edges[0].node.acf.press_items;

//   function loadMorePosts() {
//     setPostsShowing(postsShowing + 3);
//   }

//   return (
//     <Layout>
//       <SEO title="Press" />
//       <PressContainer>
//         <Wrapper>
//           <div className="title-container">
//             <h1>Press</h1>
//           </div>
//         </Wrapper>
//         <Wrapper className="feed-index-wrapper">
//           <div className="feed-container">
//             {press_items.slice(0, postsShowing).map((item, index) => {
//               return <PressItem key={index} item={item} />;
//             })}

//             {postsShowing < press_items.length && (
//               <button className="btn-load-more" onClick={() => loadMorePosts()}>
//                 Load More Press Posts
//               </button>
//             )}
//           </div>
//           <div className="sidebar-container">
//             <PressSidebar />
//           </div>
//         </Wrapper>
//       </PressContainer>
//     </Layout>
//   );
// };

// export default PressV2;
