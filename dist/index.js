"use strict";
let iframeDiv = document.querySelector("#iframe-div");
let iframeTag = document.querySelector("#iframe-tag");
let homeAnchor = document.querySelector("#home");
let playlistAnchor = document.querySelector("#playlist");
let musicasAnchor = document.querySelector("#musicas");
const showIFrame = (src) => {
    iframeDiv.style.height = "650px";
    iframeDiv.style.marginTop = "50px";
    iframeDiv.style.paddingTop = "10px";
    iframeDiv.style.visibility = "visible";
    iframeTag.src = src;
};
const hideIFrame = () => {
    iframeDiv.style.height = "0px";
    iframeDiv.style.marginTop = "0px";
    iframeDiv.style.visibility = "hidden";
};
homeAnchor.addEventListener("click", () => {
    hideIFrame();
});
playlistAnchor.addEventListener("click", () => {
    showIFrame("./html/playlist.html");
});
musicasAnchor.addEventListener("click", () => {
    showIFrame("./html/musicas.html");
});
