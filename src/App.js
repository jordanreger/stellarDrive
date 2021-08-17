import { LitElement, html } from "lit-element";
import "latt";

class App extends LitElement {
  render() {
    return html`
      <latt-router>
        <latt-route path="/">
          <app-lander />
        </latt-route>
        <latt-route path="/music">
          music
        </latt-route>
        <latt-route path="/maps">
          maps
        </latt-route>
        <latt-catch to="/" />
      </latt-router>
    `;
  }
}
customElements.get("app-root") || customElements.define("app-root", App);
