import { unit, unitless } from "./utils/unit";
import parseUnit from "parse-unit";

const defaultFonts = ["Merriweather", "Georgia", "sans-serif"];
const baseFontSize = "16px"; // 16px converts to 100% at instantiation
const baseFontSizeDesktop = "18px";
const base = unitless(baseFontSize);
const baseDesktop = 112.5;
// different from Gutenberg because it treats leading differently with Typographyjs
const lineHeight = 1.625;
const lineHeightDesktop = 1.7;
// TODO: is it a good idea to introduce the semantic definition for leading?
const leading = Math.ceil(base * lineHeight);
const baseLineHeight = lineHeightDesktop;

const maxWidth = "35rem";

const colorFontBody = "#222";
const colorFontHeadings = colorFontBody;
const colorFontLight = "#888";
const colorFontFigcaption = colorFontBody;

let googleFonts = [
    {
      name: "Merriweather",
      styles: ["400", "400i", "700", "700i"]
    }
  ],
  headerFontFamily = [],
  bodyFontFamily = [];

bodyFontFamily.push(...defaultFonts);
headerFontFamily = bodyFontFamily;

const getHeadingSizes = (arr, ratio = 1) => ({
  fontSize: arr[0] * ratio * base + "px",
  lineHeight: arr[1] * ratio * leading + "px",
  marginTop: arr[2] * ratio * leading + "px",
  marginBottom: arr[3] * ratio * leading + "px"
});

const getHeadings = (ratio) /** used for desktop */ => ({
  h1: { ...getHeadingSizes([2.5, 2, 4, 1], ratio) },
  h2: { ...getHeadingSizes([1.6875, 1.5, 2.5, 0.5], ratio) },
  h3: { ...getHeadingSizes([1.375, 1, 2, 0.5], ratio) },
  h4: { ...getHeadingSizes([1.2, 1, 1.5, 0.5], ratio) },
  h5: { ...getHeadingSizes([1, 1, 2.5, 0.5], ratio) },
  h6: { ...getHeadingSizes([1, 1, 2.5, 0.5], ratio) }
});

const mediaString = `@media screen and (min-width: ${unitless(maxWidth) +
  5}rem)`;

const gutenbergMerriweather = {
  includeNormalize: true,
  title: "gutenberg-merriweather",

  googleFonts,

  headerFontFamily,
  bodyFontFamily,

  overrideStyles: (
    { adjustFontSizeTo, rhythm, establishBaseline },
    options
  ) => ({
    html: {
      // https://github.com/matejlatin/Gutenberg/blob/master/src/style/layout/_base.scss#L16
      fontSize: baseFontSize,
      fontFamily: defaultFonts.join(", "),
      color: colorFontBody,
      "-ms-text-size-adjust": "100%",
      "-webkit-text-size-adjust": "100%"
    },
    body: {
      boxSizing: "border-box"
    },
    "*": {
      lineHeight: rhythm(1),
      marginBottom: rhythm(1)
    },
    ...getHeadings(),
    a: {
      background: "transparent",
      color: colorFontBody,
      transition: "all .3s"
    },
    "a:active, a:hover": {
      outline: 0
    },
    "a:visited": {
      color: colorFontLight
    },
    "a:hover": {
      color: colorFontBody
    },
    "a:active": {
      color: "#f00"
    },
    ".attention-grabber": {
      ...adjustFontSizeTo("120%"),
      lineHeight: rhythm(1.2)
    },
    figure: {
      display: "block"
    },
    figcaption: {
      lineHeight: rhythm(1),
      color: colorFontFigcaption,
      display: "block",
      fontSize: ".8125rem",
      fontStyle: "italic",
      marginBottom: 0,
      textAlign: "center"
    },
    img: {
      border: 0,
      maxWidth: "100%",
      display: "block",
      margin: "inherit auto"
    },
    ".floatRight": {
      float: "right"
    },
    ".floatLeft": {
      float: "left"
    },

    // wip
    [mediaString]: {
      html: {
        fontSize: baseFontSizeDesktop
      },
      "article *": {
        maxWidth,
        marginLeft: "auto !important",
        marginRight: "auto !important",
        /**
         * TODO
         * this is not right likely due to rounding, need to fix
         * https://github.com/matejlatin/Gutenberg/blob/master/src/style/layout/_base.scss#L37
         */
        lineHeight: lineHeightDesktop
      },
      "figure.floatLeft, figure.floatRight": {
        // TODO: fix float left and right styling
        lineHeight: lineHeightDesktop,
        maxWidth: unitless(maxWidth) * 0.5 + "rem",
        padding: `0 ${rhythm(1)}`
      },
      article: {
        /** TODO: now post needs to render this in article */
        maxWidth: unitless(maxWidth) * 1.5 + "rem",
        marginLeft: "auto !important",
        marginRight: "auto !important"
      },
      ...getHeadings(baseDesktop / 100)
    },
    body: {
      padding: 0
    },
    ".anchor": {
      marginLeft: "-20px !important"
    },
    ".anchor svg": {
      marginBottom: ".1em"
    }
  })
};

export default gutenbergMerriweather;
