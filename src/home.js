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
        gap: 0px 5vw;
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

      .logo {
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
        border: 3px solid #313131;
        background: #212121;
        border-radius: 10px;
        cursor: pointer;
      }
    `;
  }

  firstUpdated(){
    /* get camera */
    var stream, bg;
    var elements = this.shadowRoot.children[0].children;
    async function getCamera() {
      navigator.mediaDevices.getUserMedia({ video: true, facingMode: { exact: "environment" } }).then((stream) => {
        for(var i = 0; i < elements.length; i++){
          if(elements[i].id === "left"){
            bg = elements[i].children[0].children[0];
            bg.srcObject = stream;
          }
        }
      });
    }

    getCamera();

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
              <latt-link to="/settings">
                <div class="settings">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"0>
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                </div>
              </latt-link>
            </div>
            <div id="secondary">
            </div>
          </div>
        </div>
        <div class="logo">
          <svg viewBox="0 0 426 426" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.5 213C25.5 109.447 109.447 25.5 213 25.5C316.553 25.5 400.5 109.447 400.5 213C400.5 316.553 316.553 400.5 213 400.5C109.447 400.5 25.5 316.553 25.5 213Z" stroke="#E0E0E0" stroke-width="50"/>
            <path d="M13 262.999L152.367 228.158C192.176 218.206 233.824 218.206 273.633 228.158L413 262.999" stroke="#E0E0E0" stroke-width="50"/>
          </svg>
        </div>
      </div>
    `;
    } else {
      return undefined;
    }
  }
}
customElements.get("app-lander") || customElements.define("app-lander", Lander);
