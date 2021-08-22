import { LitElement, html, css } from "lit";
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
      #frame {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
      }

      #page {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        display: grid;
        grid-auto-columns: 1fr 1fr;
        grid-template-columns: 1fr 14fr 1fr;
        grid-template-rows: 1fr;
        gap: 0px 0px;
        grid-template-areas:
          "music time maps";
        z-index: 1;
      }

      .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      #background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        min-height: 100%;
        object-fit: fill;
        z-index: 0;
      }

      #music {
        grid-area: music;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 100%;
        height: 75%;
        background-color: rgba(240, 240, 240, 0.5);
        border-top: 5px solid #f0f0f0;
        border-right: 5px solid #f0f0f0;
        border-bottom: 5px solid #f0f0f0;
        border-radius: 0px 25px 25px 0px;
        box-shadow: 0 0 15px #212121;
      }

      #time {
        grid-area: time;
        position: absolute;
        width: 100%;
        height: 100%;
        display: none;
      }

      #maps {
        grid-area: maps;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 100%;
        height: 75%;
        background-color: rgba(240, 240, 240, 0.5);
        border-top: 5px solid #f0f0f0;
        border-left: 5px solid #f0f0f0;
        border-bottom: 5px solid #f0f0f0;
        border-radius: 25px 0px 0px 25px;
        box-shadow: 0 0 15px #212121;
      }

      /*#left {
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
        border: 5px solid #313131;
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
      }*/

      .time {
        font-family: JetBrains Mono;
        font-size: 25vw;
        font-weight: 700;
        color: #f0f0f0;
        text-shadow: 0 0 25px #000;
        text-align: center;
        user-select: none;
      }

      .date {
        font-family: Jetbrains Mono;
        font-size: 5vw;
        font-weight: 700;
        color: #f0f0f0;
        text-shadow: 0 0 15px #000;
        text-align: center;
        user-select: none;
      }

      /*.logo {
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translateX(-50%);
        width: 5vw;
      }

      .settings {
        position: absolute;
        top: 0;
        right: 0;
        width: 4vw;
        cursor: pointer;
      }

      .settings svg {
        fill: #515151;
      }

      #secondary {
        grid-area: secondary;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 100%;
        width: 100%;
        border: 5px solid #313131;
        background: #212121;
        border-radius: 10px;
        cursor: pointer;
      }*/
    `;
  }

  constructor() {
    super();
    this.startX = 0;
    this.endX = 0;
  }

  firstUpdated() {
    var elements = this.shadowRoot.children[0].children;

    var stream;
    var bg = elements[0];
    var music = elements[1].children[0];
    var maps = elements[1].children[2];
    function getCamera() {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
          bg.srcObject = stream;
      }).catch(function(error) {
          console.error("Oops. Something is broken.", error);
      });
    }

    window.addEventListener("load", getCamera(), false);

    music.addEventListener('touchstart', e => {
      this.startX = e.changedTouches[0].screenX;
    });

    music.addEventListener('touchend', e => {
      this.endX = e.changedTouches[0].screenX;
      this.handleGesture("music");
    });

    maps.addEventListener('touchstart', e => {
      this.startX = e.changedTouches[0].screenX;
    });

    maps.addEventListener('touchend', e => {
      this.endX = e.changedTouches[0].screenX;
      this.handleGesture("maps");
    });


    /* clock */
    let ls = window.localStorage;

    if(!ls.getItem("method")) {
      ls.setItem("method", "12");
    }

    let timeDiv = elements[1].children[1].children[0].children;
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

  handleGesture(div) {
    var elements = this.shadowRoot.children[0].children;

    var page = elements[1];
    var time = elements[1].children[1].children[0];
    var music = elements[1].children[0];
    var maps = elements[1].children[2];

    if(div === "music") {
      if(this.startX < this.endX) {
        /*time.style.transition = "opacity 150ms";
        time.style.opacity = "0%";
        time.style.display = "none";*/
        page.style.transition = "grid-template-columns 150ms";
        page.style.gridTemplateColumns = "14fr 1fr 1fr";
        page.style.gridTemplateAreas = "music maps";
      }

      if(this.startX > this.endX) {
        page.style.transition = "grid-template-columns 150ms";
        page.style.gridTemplateColumns = "1fr 14fr 1fr";
        page.style.gridTemplateAreas = "music time maps";
        /*time.style.transitionDelay = "500ms";
        time.style.display = "block";
        time.style.transition = "opacity 150ms";
        time.style.opacity = "100%";*/
      }
    } else if (div === "maps") {
      if(this.startX > this.endX) {
        page.style.transition = "grid-template-columns 150ms";
        page.style.gridTemplateColumns = "1fr 1fr 14fr";
        page.style.gridTemplateAreas = "music maps";
      }

      if(this.startX < this.endX) {
        page.style.transition = "grid-template-columns 150ms";
        page.style.gridTemplateColumns = "1fr 14fr 1fr";
        page.style.gridTemplateAreas = "music time maps";
      }
    }
  }

  render() {
    if (window.location.pathname === "/") {
      return html`
      <div id="frame">
        <video id="background" autoplay="true" playsinline="true"></video>
        <div id="page">
          <div id="music"></div>
          <div id="time">
            <div class="center">
              <div class="time"></div>
              <div class="date"></div>
            </div>
          </div>
          <div id="maps"></div>
        </div>
      </div>
    `;
    } else {
      return undefined;
    }
  }
}
customElements.get("app-lander") || customElements.define("app-lander", Lander);
