import { LitElement, html, css } from "lit-element";
import "latt";
import { until } from "lit-html/directives/until.js";

class Lander extends LitElement {

  static get styles() {
    return css`
      /* app css */
      ::selection {
        color: #000;
        background: #f0f0f0;
      }

      ::-webkit-scrollbar {
        width: 5px;
      }

      ::-webkit-scrollbar-track {
        background: #a4a4a4;
      }

      ::-webkit-scrollbar-thumb {
        background: #888888;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #555555;
      }

      /* page css */
      #page {
        background-color: #101010;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        display: grid;
        grid-auto-columns: 1fr 1fr;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        gap: 0px 0px;
        grid-template-areas:
          "left right";
        width: 100%;
        height: 100%;
      }

      #left {
        grid-area: left;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      #right {
        grid-area: right;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      #main {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 90%;
        width: 90%;
        border: 3px solid #313131;
        background: #212121;
        border-radius: 10px;
        cursor: pointer;
      }

      #right-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        grid-auto-columns: 1fr 1fr;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr;
        gap: 10% 0px;
        grid-template-areas:
          "time"
          "secondary";
        width: 90%;
        height: 90%;
      }

      #time {
        grid-area: time;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 100%;
        width: 100%;
      }

      #time-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .time {
        font-family: Inter;
        font-size: 10vw;
        font-weight: 600;
        color: #e0e0e0;
        text-align: center;
        user-select: none;
      }

      .date {
        font-family: Inter;
        font-size: 2.5vw;
        font-weight: 600;
        color: #e0e0e0;
        text-align: center;
        user-select: none;
      }

      #secondary {
        grid-area: secondary;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 100%;
        width: 100%;
        border: 3px solid #313131;
        background: #212121;
        border-radius: 10px;
        cursor: pointer;
      }
    `;
  }

  firstUpdated(){
    /* animations */
    var main, secondary, time;
    var left, right;
    var elements = this.shadowRoot.children[0].children;
    for(var i = 0; i < elements.length; i++){
      if(elements[i].id === "left"){
        left = elements[i];
        for(var j = 0; j < left.children.length; j++){
          main = left.children[0];
        }
      }
      if(elements[i].id === "right"){
        right = elements[i];
        for(var k = 0; k < right.children.length; k++){
          time = right.children[0].children[0];
          secondary = right.children[0].children[1];
        }
      }
    }

    main.addEventListener("click", e => {
      /*time.style.display = "none";
      main.style.position = "fixed";
      main.style.height = "calc(100% - 9.15%)";
      main.style.width = "100%";
      main.style.top = "4.5%";
      main.style.left = "2.15%";
      main.style.right = "2.15%";
      main.style.bottom = "4.5%";
      main.style.transform = "none";*/
      window.location.href = "/music";
    })

    secondary.addEventListener("click", e => {
      /*time.style.display = "none";*/
      window.location.href = "/maps";
    })

    /* /animations */

    /* clock */
    let ls = window.localStorage;

    if(!ls.getItem("method")) {
      ls.setItem("method", "12");
    }

    let timeDiv = this.shadowRoot.children[0].children[1].children[0].children[0].children[0].children;
    let timeDisplay = timeDiv[0];
    let dateDisplay = timeDiv[1];

    function getTime(method) {
      let date = new Date();
      let hours, minutes;
      if(method === "12"){
        hours = ((date.getHours() + 11) % 12 + 1);
      }
      else if (method === "24"){
        hours = date.getHours();
      }
      if(date.getMinutes() >= 10) {
        minutes = date.getMinutes();
      } else {
        minutes = "0" + date.getMinutes();
      };
      let time = hours + ":" + minutes;
      timeDisplay.innerHTML = time;
    }

    function getDate() {
      let date = new Date();
      dateDisplay.innerHTML = date.toDateString();
    }

    getTime(ls.getItem("method"));
    getDate();
    setInterval(() => { getTime(ls.getItem("method")); getDate(); }, 1000);
    /* /clock */
  }

  render() {
    if (window.location.pathname === "/") {
      return html`
      <div id="page">
        <div id="left">
          <div id="main">
          </div>
        </div>
        <div id="right">
          <div id="right-content">
            <div id="time">
              <div id="time-content">
                <div class="time"></div>
                <div class="date"></div>
              </div>
            </div>
            <div id="secondary">
            </div>
          </div>
        </div>
      </div>
    `;
    } else {
      return undefined;
    }
  }
}
customElements.get("app-lander") || customElements.define("app-lander", Lander);
