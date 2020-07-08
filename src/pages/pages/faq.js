import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { window } from "browser-monads";
import SEO from "../../components/seo";

import returnsImg from "../../images/packing-slip.jpg";
import shippingImg from "../../images/shipping.png";
import Wrapper from "../../components/org/Wrapper";
import Layout from "../../components/layout";
import X from "../../images/x.inline.svg";
import { TransitionMixin, media } from "../../components/helpers";

const returns = [
  {
    question: "What is your Return Policy?",
    answer: `   
            <ul>
                <li>If you're having second thoughts about your gear— don’t worry—we’ll take it back. You have 30 days from the delivery date to return your items.</li>
                <li>All returns must be unworn, intact merchandise with all tags in its original packaging. If returning a multi-item set, all pieces must be received in good condition to be considered for a full return.</li>
                <li>Once a return is requested, the return item(s) must be shipped within SEVEN (7) DAYS. If you do not ship your return item(s) within this time period, your order may be eligible for store credit only.</li>
                <li>Domestic (United States) flat rate return shipping fee of $7.50 will be deducted from your refund amount. </li>
                <li>FINAL SALE ITEMS CANNOT BE RETURNED OR EXCHANGED. Please note all items discounted over 40% are considered final sale and are labeled as “Final Sale” on their product page. </li>
                <li>Please keep this in mind BEFORE making a purchase—if you have questions about the product selection or sizing please reach out to customer service for assistance prior to finalizing your order.</li>
                <li>Returns that are damaged or tampered with may not be accepted and returned to the customer. Unidentified returns may also be returned to sender. We reserve the right to refuse any item that does not comply with our stated policy.</li>
            </ul>

        `,
  },
  {
    question: "Do you offer Exchanges?",
    answer: `   
            <ul>
                <li>Unfortunately, due to the Limited-Edition nature of our product, we cannot offer exchanges.</li>
                <li>If you would like to exchange, please place a new order for new item before returning your original purchase. This will ensure that the new item is in stock. </li>
                <li>Once we receive your return, we will process a refund for the cost of the returned product.</li>
                <li>Please note you CANNOT request an EXCHANGE in the “notes section” of your return—any exchange requests made outside of the above process will not be actioned.</li>
                <li>If you received a gift and need an exchange or return, please reach out to us directly at <a href="mailto:contact@foraygolf.com">contact@foraygolf.com</a> and we will assist you right away!</li>
            </ul>

        `,
  },
  {
    question: "How do I request a Return? (Domestic U.S. Orders)?",
    answer: `   
            <ul>
            <li><strong>STEP 1:</strong> To make a return, please navigate to <a href="https://returns.foraygolf.com">returns.foraygolf.com </a></li>
            <li><strong>STEP 2:</strong> Locate both of the following in order to start the return: <br/>
            – Your 4-digit Order Number, found at the top of your email confirmation or on your packing slip<br/>
            – The email address that was used to place the order <br/>
            <img style="max-width: 650px;display: block; width: 100%;" src="${returnsImg}" alt=""/>
            In the case of gift orders or if you are unable to locate the above, please reach out to <a href="mailto:contact@foraygolf.com">contact@foraygolf.com</a></li>
            <li><strong>STEP 3:</strong> Follow the brief instructions, identifying which pieces you would like to send back, as well as reason codes for return. 
            Please note you CANNOT request an EXCHANGE in the “notes section” of your return; unfortunately, due to the limited-edition nature of our product, exchanges are not possible; please see our exchange policy above.</li>
            <li><strong>STEP 4:</strong> After completion, you will be provided with both an RMA number and shipping label—these will be sent to the email address on file.</li>
            <li><strong>STEP 5:</strong> Please print and tape the shipping label to the outside of our packaging (or your own), making sure that the barcode portion of the label is visible. </li>
            <li><strong>STEP 6:</strong> Drop the package off at the nearest US Post Office. We will refund your original form of payment within ten business days of receiving your package. You will receive an email notification that your return has been processed.</li>
            </ul>

        `,
  },
  {
    question: "How do I request a Return? (International Orders)?",
    answer: `   
            <ul>
                <li>For return requests that originate outside the United States, it is the customer’s financial responsibility to ship back the items. </li>
                <li>Items should be marked “Returns of no commercial value” for entry to the USA. Returns will not be accepted if shipped COD (cash on delivery). </li>
                <li>It is recommended that packages are shipped insured and with signature required as the package and its contents are the responsibility of the customer until it reaches our returns department.</li>
                <li>Please be sure all items being sent back are unworn, intact and with all tags in original packaging, as is stated in our Return Policy.</li>
                <li>Credit will not be issued on any shipping, customs, or duty fees incurred for either the outgoing shipment or incoming shipment. This is the financial responsibility of the customer. However, you may be able to recover these by contacting your local customs bureau directly.</li>
                <li>Please reach out to customer service (<a href="mailto:contact@foraygolf.com">contact@foraygolf.com</a>) with any questions relating to the above.</li>
            </ul>

        `,
  },
  {
    question: "How long does it take to process a Return?",
    answer: `   
            <ul>
                <li>Once your return has been posted, please allow 5-10 business days for your product to be shipped to our warehouse, inspected and added back to inventory. Please note that international orders may take additional time due to shipping distances.</li>
                <li>You will then be notified via email that your return has been processed back to your original form of payment. In the case of credit card payment, please allow up to 5 business days for the refund to appear on your statement due to variations among each bank. Store Credit and Gift Card Returns will be processed and sent via email same-day.</li>
                <li>PLEASE NOTE: delays in shipping may occur due to unforeseen disruptions in global supply chains. These are out of our control and we appreciate your patience should any arise!</li>
            </ul>

        `,
  },
  {
    question: "How do I return a Gift?",
    answer: `   
            <ul>
                <li>If you received a gift and need to return any merchandise, we would be happy to accept the items back so long as they meet the full return criteria. We will also issue a new gift card for returned products, as is stipulated in our policy and process above. </li>
                <li>Please send us a message at <a href="mailto:contact@foraygolf.com">contact@foraygolf.com</a> with the details of the transaction and merchandise being returned. A customer service representative will respond to your inquiry within 24-48 hours.</li>
            </ul>

        `,
  },
  {
    question: "What is your Final Sale Policy?",
    answer: `   
            <ul>
                <li>All discounts over 40% are considered FINAL SALE and will be labeled so on the product page. </li>
                <li><strong>FINAL SALE ITEMS CANNOT BE RETURNED OR EXCHANGED. </strong></li>
                <li>Please keep this in mind BEFORE making a purchase—if you have questions about the product selection or sizing please reach out to customer service for assistance prior to finalizing your order.</li>
            </ul>

        `,
  },
];

const shipping = [
  {
    question: "How quickly will my order ship? When will it arrive?",
    answer: `   
              <p>All orders guaranteed to ship within two business days of being placed, unless otherwise notified.</p>
              <ul>
                <li>
                    <strong>Domestic Shipping:</strong><br/>
                    <ul>
                        <li>The majority of Ground orders deliver within 3-4 days of ship date— please reference the below map for a more detailed estimate. Expedited shipping options are available. <br/> <br/> <img src="${shippingImg}" alt=""/></li>
                    </ul>
                </li>
                <li>
                    <strong>International Shipping:</strong><br/>
                    <ul>
                        <li>Orders outside the US will be dispatched using FedEx Ground and can take 5-10 business days depending on final package destination (prices vary based on delivery location). Tracking information will be emailed to you once your order has been dispatched.</li>
                        <li>Upgrades on international delivery options will be shown on our checkout pages and will ship using international mail options provided by FedEx. Please note that surcharges may be incurred on heavy items.</li>
                    </ul>
                </li>

              </ul>
          `,
  },
  {
    question: "How much does shipping cost?",
    answer: `   
              <ul>
                <li><strong>Standard US Domestic Shipping:</strong>  Flat rate of $7.50.</li>
                <li><strong>Expedited US Domestic FedEx 2-Day Shipping:</strong> flat rate of $15.00.</li>
                <li><strong>Overnight US Domestic shipping is available;</strong> please select this option at checkout to view posted rates based on your location</li>
                <li>
                    <strong>International Shipping Rates vary upon delivery location;</strong> please select from available options at checkout.
                    <ul>
                        <li>CUSTOMS POLICY: Foray Golf is not responsible for brokerage fees, import taxes or duties applied when the package enters the destination country. Customers should consult the customs legislation of their country. Courier fees for returns and exchanges are the responsibility of the recipient. If orders are refused by customers at point of delivery or if there is a charge back to Foray Golf for return shipping or duties, the customer is financially responsible, and it will be deducted from their credit.</li>
                    </ul>
                </li>
              </ul>
          `,
  },
];

const orderQuestions = [
  {
    question: "I forgot to use my promo code?",
    answer: `   
                <p>No worries! We forget a lot of things—please email <a href="mailto:contact@foraygolf.com">contact@foraygolf.com</a> right away and someone will respond with 24-48 hours. As long as the product is eligible for the discount, we will refund the difference to your original form of payment </p>
            `,
  },
  {
    question: "Can I update my shipping address?",
    answer: `   
                <p>To change your shipping address, please reach out to us at <a href="mailto:contact@foraygolf.com">contact@foraygolf.com</a> within 15 minutes of placing your order. We will do our best to make an update before shipment leaves our distribution center.</p>
            `,
  },
  {
    question: "Can I cancel my order?",
    answer: `   
                <p>To cancel your order, please reach out to us at <a href="mailto:contact@foraygolf.com">contact@foraygolf.com</a> within 15 minutes of placing your order. We will do our best to address immediately.</p>
            `,
  },
  {
    question: "There is a mistake with my order, or it arrived damaged.",
    answer: `   
                <p>Yikes—this doesn’t happen often, but if it does please send us an email right away at contact@foraygolf.com. In the body of the email please include your order number and a short description of the issue. An associate will respond within 24-48 hours with next steps to resolve the issue.</p>
            `,
  },
  {
    question: "Do you offer any discounts?",
    answer: `   
                <ul>
                    <li>We do from time to time—please sign up for our email list for notifications and take a look at our social media accounts (@foraygolfusa) for the latest info!</li>
  <li>If you’re a student, teacher or pro, join our “Friends of Foray” program for exclusive benefits <a href="/pages/friends-of-foray">(details here).</a></li>
                </ul>
            `,
  },
  {
    question: "Do you offer Gift Wrapping?",
    answer: `   
                <p>Not currently but check back with us around the holidays!</p>
            `,
  },
];

const productQuestions = [
  {
    question: "Do you restock any of your sold-out items?",
    answer: `   
                <ul>
                    <li><strong>YES</strong> — any “CORE” designated product is considered evergreen and will be back in stock as soon as possible. </li>
                    <li><strong>NO</strong> — our FASHION items are created in small limited-edition numbers, from as few as 25 to as many as 250 units sold globally. Unfortunately, when these products are gone, they’re gone… so we suggest you act fast!</li>
                </ul>
              `,
  },
  {
    question: "Do you offer Gift Cards?",
    answer: `   
    <p>Yes! We offer digital gift cards from $50-500; purchase one at the following <a href="/products/gift-card-1">link</a> and it will emailed directly to you. Please note that gift cards are non-refundable</p>
        `,
  },
  {
    question: "A Free Tote Bag?",
    answer: `   
    <p style="margin-bottom: 10px;"><strong>TO REDEEM OFFER:</strong></p>
    <ul>
      <li>Add qualifying, in-stock merchandise totaling $77.17 or more (after all discounts are applied) to your shopping cart.</li>
      <li>A button will appear in the cart for qualifying orders that will allow you to add a free Foray Golf tote (limit one free tote per order).</li>
      <li>Valid July 7, 2020 through July 14, 2020 at 11:59pm PT. While supplies last.</li>
    </ul>
    
    <br/>
    
    <p><strong>OFFER EXCLUDES THE FOLLOWING:</strong></p>

    <ul>
      <li>Gift cards, shipping and handling, sales taxes, and previous online and in-store purchases do not qualify toward offer eligibility.</li>
      <li>Presentation of multiple offers will result in the best offer being applied.</li>
    </ul>

    <br/>

    <p style="margin-bottom: 10px;"><strong>ADDITIONAL OFFER DETAILS:</strong></p>

    <ul>
      <li>No substitutions.</li>
      <li>Offer subject to adjustment due to returns, cancellations and exchanges.</li>
      <li>Orders shipping outside the US may not be eligible; additional taxes and duties may apply.</li>
      <li>Shipping and handling applies to free product.</li>
      <li>Offer may be modified or discontinued at any time without notice.</li>
    </ul>


        `,
  },
];

const misc = [
  {
    question:
      "Do you offer a discount for students, teachers or professional players?",
    answer: `   
            <p>Yes! We love supporting our “Friends of Foray” crew—please apply for a professional discount <a href="https://foraygolf.com/pages/friends-of-foray">here</a> with your name, email and school/organization. Once you’re verified, we will issue you a unique discount 20% off code for use anytime!</p>
              `,
  },
  {
    question: "How do I become a brand ambassador?",
    answer: `   
            <p>Great question—shoot us an email at <a href="mailto:contact@foraygolf.com">contact@foraygolf.com</a> and let us know your story and why you would like to be part of our team.</p>
        `,
  },
  {
    question: "Do you stock a pro-shop in my area?",
    answer: `   
            <p>Most likely! We’ve grown our reach significantly over the last several years. Give us a shout and we will advise the closest location to you!</p>
        `,
  },
  {
    question: "I want my pro-shop to carry Foray. How do I get started?",
    answer: `   
    <p>We love meeting new people! We have no-minimum opening order and a fantastic B2B platform that makes ordering a breeze! Please fill out our form <a href="https://foraygolf.com/pages/corporate">here</a> and a specialist will get back to you within 24-48 hours</p>
        `,
  },
  {
    question: "Do you service corporate dressing, gifting or events?",
    answer: `   
        <ul>
            <li>Yes! We offer corporate uniforming, on location shopping experiences and much more, including low minimums and the ability to customize beyond logo embroidery</li>
            <li>Volume discounts available as well as coordinating points of view for both women & men</li>
            <li>Please fill out our form <a href="/pages/corporate">here</a> or contact our corporate liaison directly at <a href="mailto:brand@foraygolf.com">brand@foraygolf.com</a></li>
        </ul>
        `,
  },
  {
    question: "Do you donate product/funds to charitable causes?",
    answer: `   
    <p>Yes — we love giving back as much as is humanly possible! And while business constraints dictate that we cannot participate in every event or cause, it is an important part of our mission. Please email us details to <a href="mailto:contact@foraygolf.com">contact@foraygolf.com</a> and we will reach back out to you where appropriate. </p>
        `,
  },
];

const contact = [
  {
    question: "Want to get in touch?",
    answer: `   
              <p>Want to get in touch? Our team is currently working remotely due to the ongoing situation in New York City. Email us <a href="mailto:contact@foraygolf.com">contact@foraygolf.com</a> anytime and we will do our best get back to you right away. For urgent matters, someone from our customer care team will respond within 24-48 hours. Please give us a little extra time around holidays—it’s rare, but sometimes we need a break. </p>
                `,
  },
];

const FAQContainer = styled.div`
  padding: 0 0 40px;
  .faq-title-container {
    background-color: #000;
    text-align: center;
    padding: 20px 0;
    margin-bottom: 40px;
    h1 {
      color: #fff;
      margin: 0;
      text-transform: uppercase;
      font-size: 19px;
    }
  }

  .faq-container-wrapper {
    .faq-menu-container {
      ${media.medium`padding-right: 20px; border-right: 1px solid #efefef;`}

      select {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        ${media.medium`display: none;`}
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: none;
        ${media.medium`display: block;`}
        li {
          button {
            color: #000;
            background-color: transparent;
            border: none;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 13px;
            border-radius: 4px;
            line-height: 1;
            padding: 7px 10px;
            ${TransitionMixin(".25s")}

            &:hover, &.active {
              background-color: #000;
              color: #fff;
            }
          }
        }
      }
    }
    .faq-question-sections-container {
      flex: 1;
      ${media.medium`padding-left: 70px;`}

      .faq-question-section {
        display: none;
        &.active {
          display: block;
        }
        .acc-item {
          .acc-header {
            > button {
              border: 1px solid #efefef;
              width: 100%;
              text-align: left;
              display: flex;
              align-items: center;
              line-height: 1;
              font-weight: bold;
              color: #4a4a4a;
              background-color: transparent;
              border: none;
              border-bottom: 1px solid #efefef;
              padding: 20px 0;
              span {
                flex: 1;
                text-align: right;
                padding-left: 10px;

                svg {
                  transform: rotate(45deg);
                  border: 1px solid #4a4a4a;
                  height: 40px;
                  width: 40px;
                  padding: 10px;
                  stroke-width: 2px;
                  stroke: #4a4a4a;
                  border-radius: 50%;
                  ${TransitionMixin(".25s")}
                }
              }

              &:active,
              &:focus {
                border-bottom: 1px solid #000;
                outline: 0;
              }
            }
            &.active {
              button {
                span {
                  svg {
                    transform: rotate(90deg);
                  }
                }
              }
            }
          }

          .acc-body {
            padding-top: 20px;
            display: none;

            &.active {
              display: block;
            }

            .inner-wrap {
              p {
                font-size: 16px;
              }
              li {
                font-size: 16px;
              }

              a {
                font-weight: bold;
                color: #000;
              }
            }
          }
        }
      }
    }
  }
`;

const FAQ = ({ location }) => {
  const [whichMenuIsActive, setWhichMenuIsActive] = useState(-1);

  function handleSectionChange(num, name) {
    // console.log(num, name.toString());
    setWhichMenuIsActive(parseFloat(num));
    window.history.pushState("page2", "Title", "#" + name);
  }

  let isFinalSaleOpen = location.hash.includes("#fs") === true ? true : false;
  let isRequestReturnOpen =
    location.hash.includes("#rr") === true ? true : false;
  let isToteOpen = location.hash.includes("#tote") === true ? true : false;

  useEffect(() => {
    if (location.hash !== "") {
      let menuName = location.hash
        .replace("#", "")
        .toLowerCase()
        .split("#")[0];
      if (menuName === "returns") {
        setWhichMenuIsActive(1);
      } else if (menuName === "shipping") {
        setWhichMenuIsActive(2);
      } else if (menuName === "order-questions") {
        setWhichMenuIsActive(3);
      } else if (menuName === "product-questions") {
        setWhichMenuIsActive(4);
      } else if (menuName === "misc") {
        setWhichMenuIsActive(5);
      } else if (menuName === "contact-us") {
        setWhichMenuIsActive(6);
      } else {
        setWhichMenuIsActive(1);
      }
    } else {
      setWhichMenuIsActive(1);
    }
  }, []);

  return (
    <Layout>
      <SEO title="Frequently Asked Questions" />
      <FAQContainer>
        <div className="faq-title-container">
          <h1>FAQs</h1>
        </div>
        <Wrapper blockFlex className="faq-container-wrapper">
          <div className="faq-menu-container">
            <div className="custom-select">
              <select
                value={whichMenuIsActive}
                onChange={e =>
                  handleSectionChange(
                    e.target.value,
                    e.target
                      .querySelectorAll("option")
                      [parseFloat(e.target.value) - 1].dataset.name.toString()
                  )
                }
              >
                <option data-name="returns" value="1">
                  Returns &amp; Exchanges
                </option>
                <option data-name="shipping" value="2">
                  Shipping
                </option>
                <option data-name="order-questions" value="3">
                  Order Questions
                </option>
                <option data-name="product-questions" value="4">
                  Product Questions
                </option>
                <option data-name="misc" value="5">
                  Teeing It Up (Misc.)
                </option>
                <option data-name="contact-us" value="6">
                  Contact us
                </option>
              </select>
            </div>
            <ul>
              <li>
                <button
                  onClick={() => handleSectionChange(1, "returns")}
                  className={whichMenuIsActive === 1 ? "active" : ""}
                >
                  Returns &amp; Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionChange(2, "shipping")}
                  className={whichMenuIsActive === 2 ? "active" : ""}
                >
                  Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionChange(3, "order-questions")}
                  className={whichMenuIsActive === 3 ? "active" : ""}
                >
                  Order Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionChange(4, "product-questions")}
                  className={whichMenuIsActive === 4 ? "active" : ""}
                >
                  Product Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionChange(5, "misc")}
                  className={whichMenuIsActive === 5 ? "active" : ""}
                >
                  Teeing It Up (Misc.)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionChange(6, "contact-us")}
                  className={whichMenuIsActive === 6 ? "active" : ""}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          <div className="faq-question-sections-container">
            {/* returns */}
            <div
              className={
                whichMenuIsActive === 1
                  ? "faq-question-section returns active"
                  : "faq-question-section returns"
              }
            >
              {returns.map((item, index) => {
                console.log("returns: ", returns.length, "index: ", index);
                return (
                  <AccItem
                    key={index}
                    item={item}
                    isFsOpen={returns.length === index + 1 && isFinalSaleOpen}
                    isRequestReturnOpen={index === 2 && isRequestReturnOpen}
                  />
                );
              })}
            </div>
            {/* shipping */}
            <div
              className={
                whichMenuIsActive === 2
                  ? "faq-question-section shipping active"
                  : "faq-question-section shipping"
              }
            >
              {shipping.map((item, index) => {
                return <AccItem key={index} item={item} />;
              })}
            </div>
            {/* order questions */}
            <div
              className={
                whichMenuIsActive === 3
                  ? "faq-question-section order-questions active"
                  : "faq-question-section order-questions"
              }
            >
              {orderQuestions.map((item, index) => {
                return <AccItem key={index} item={item} />;
              })}
            </div>
            {/* product questions */}
            <div
              className={
                whichMenuIsActive === 4
                  ? "faq-question-section product-questions active"
                  : "faq-question-section product-questions"
              }
            >
              {productQuestions.map((item, index) => {
                return (
                  <AccItem
                    key={index}
                    item={item}
                    isToteOpen={index === 2 && isToteOpen}
                  />
                );
              })}
            </div>

            {/* misc */}
            <div
              className={
                whichMenuIsActive === 5
                  ? "faq-question-section misc active"
                  : "faq-question-section misc"
              }
            >
              {misc.map((item, index) => {
                return <AccItem key={index} item={item} />;
              })}
            </div>

            {/* contact */}
            <div
              className={
                whichMenuIsActive === 6
                  ? "faq-question-section contact active"
                  : "faq-question-section contact"
              }
            >
              {contact.map((item, index) => {
                return <AccItem key={index} item={item} />;
              })}
            </div>
          </div>
        </Wrapper>
      </FAQContainer>
    </Layout>
  );
};

const AccItemContainer = styled.div``;

const AccItem = ({ item, isFsOpen, isRequestReturnOpen, isToteOpen }) => {
  const [isItemActive, setIsItemActive] = useState(false);
  const fsRef = useRef(null);
  const returnRef = useRef(null);
  const toteRef = useRef(null);

  function createBodyMarkup() {
    return { __html: item.answer };
  }

  useEffect(() => {
    if (isFsOpen === true) {
      setTimeout(() => {
        fsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 1000);
      setIsItemActive(true);
    } else if (isRequestReturnOpen) {
      console.log("return open");
      setTimeout(() => {
        returnRef.current.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }, 1000);
      setIsItemActive(true);
    } else if (isToteOpen) {
      console.log("return open");
      setTimeout(() => {
        toteRef.current.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }, 1000);
      setIsItemActive(true);
    }
  }, []);

  return (
    <AccItemContainer
      ref={
        isFsOpen === true
          ? fsRef
          : isRequestReturnOpen === true
          ? returnRef
          : isToteOpen === true
          ? toteRef
          : null
      }
    >
      <div className="acc-item">
        <div className={isItemActive ? "acc-header active" : "acc-header"}>
          <button onClick={() => setIsItemActive(!isItemActive)}>
            {item.question}
            <span>
              <X />
            </span>
          </button>
        </div>
        <div className={isItemActive ? "acc-body active" : "acc-body"}>
          <div
            className="inner-wrap"
            dangerouslySetInnerHTML={createBodyMarkup()}
          ></div>
        </div>
      </div>
    </AccItemContainer>
  );
};

export default FAQ;
