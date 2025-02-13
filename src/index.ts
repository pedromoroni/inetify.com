let iframeDiv = document.querySelector<HTMLDivElement>("#iframe-div")!;
let iframeTag = document.querySelector<HTMLIFrameElement>("#iframe-tag")!;
let homeAnchor = document.querySelector<HTMLAnchorElement>("#home")!;
let playlistAnchor = document.querySelector<HTMLAnchorElement>("#playlist")!;
let musicasAnchor = document.querySelector<HTMLAnchorElement>("#musicas")!;

const showIFrame = (src: string): void => {
    iframeDiv.style.height = "650px"
    iframeDiv.style.marginTop = "50px"
    iframeDiv.style.paddingTop = "10px"
    iframeDiv.style.visibility = "visible";

    iframeTag.src = src;
}
const hideIFrame = (): void => {
    iframeDiv.style.height = "0px"
    iframeDiv.style.marginTop = "0px"
    iframeDiv.style.visibility = "hidden";
}

homeAnchor.addEventListener("click", () => {
    hideIFrame();
});

playlistAnchor.addEventListener("click", () => {
    showIFrame("./html/playlist.html");
});

musicasAnchor.addEventListener("click", () => {
    showIFrame("./html/musicas.html");
});
