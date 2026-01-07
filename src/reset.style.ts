import { css } from "lit";

export default css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  :where(button) {
    font: inherit;
    margin: 0;
    text-transform: none;
    -webkit-appearance: button;
    border-style: none;
    padding: 0;
  }
  :where(button)::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  :where(button)::-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  [hidden]{
    display: none !important;
  }
`;