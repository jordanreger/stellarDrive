import { LitElement, html } from "lit-element";
import "latt";

window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../serviceWorker.js");
  }
};

class App extends LitElement {
  render() {
    return html`
      <latt-router>
        <latt-route path="/">
          <app-lander />
        </latt-route>
        <latt-catch to="/" />
      </latt-router>
    `;
  }
}

customElements.get("app-root") || customElements.define("app-root", App);
