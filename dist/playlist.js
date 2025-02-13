"use strict";
const playlist = document.querySelector("#playlist");
const progressBar = document.querySelector("#progress-bar");
const nextButton = document.querySelector("#next-button");
const prevButton = document.querySelector("#prev-button");
const randomModeButton = document.querySelector("#random-mode-button");
const playButton = document.querySelector("#play-button");
const songAudio = document.querySelector("#song");
const songCurrentTime = document.querySelector("#song-current-time");
const songDurationTime = document.querySelector("#song-duration-time");
const editPlaylistButton = document.querySelector("#edit-playlist");
let currentSong = songs[0];
const lastElementOfArray = (arr) => arr[arr.length - 1];
const refreshPlaylist = () => {
    playlist.querySelectorAll("li").forEach((li) => {
        const title = li.textContent.split("-")[1].trim();
        li.className = title == currentSong.title ? "is-selected" : "";
    });
};
const formatDuration = (duration) => {
    const h = Math.floor(duration / 3600);
    const m = Math.floor((duration % 3600) / 60);
    const s = Math.floor(duration % 60);
    let time = h > 0 ? h.toString() + ":" : "";
    time += h > 0 ?
        m < 10 ? "0" + m.toString() : m.toString()
        : m.toString();
    time += ":";
    time += s < 10 ? "0" + s.toString() : s.toString();
    return time;
};
const setSong = (song) => {
    progressBar.value = "0";
    currentSong = song;
    songAudio.src = currentSong.songPath;
    isPaused = false;
    playButton.textContent = "▴";
    songAudio.play();
    setTimeout(() => {
        progressBar.max = songAudio.duration.toString();
        songDurationTime.textContent = formatDuration(songAudio.duration);
    }, 500);
};
onload = () => {
    songAudio.src = currentSong.songPath;
    progressBar.max = songAudio.duration.toString();
    songs.forEach((song) => {
        const title = document.createElement("li");
        title.textContent = song.artist + " - " + song.title;
        title.className = song.songPath == currentSong.songPath ? "is-selected" : "";
        playlist.appendChild(title);
    });
    setTimeout(() => {
        progressBar.max = songAudio.duration.toString();
        songDurationTime.textContent = formatDuration(songAudio.duration);
    }, 100);
};
let songsHistory = [currentSong];
let isRandomModeActive = false;
let isPaused = true;
randomModeButton.addEventListener("click", (e) => {
    e.preventDefault();
    isRandomModeActive = !isRandomModeActive;
    randomModeButton.style.color = isRandomModeActive ? "#437008" : "";
});
nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    const currentIndex = songs.indexOf(currentSong);
    let nextSong;
    if (isRandomModeActive) {
        do {
            nextSong = songs[Math.floor(Math.random() * songs.length)];
        } while (nextSong == currentSong && songs.length > 1);
    }
    else {
        nextSong = songs[(currentIndex + 1) % songs.length];
    }
    if (songs.length > 1) {
        songsHistory.push(currentSong);
    }
    setSong(nextSong);
    refreshPlaylist();
});
prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (songsHistory.length == 0) {
        return;
    }
    setSong(lastElementOfArray(songsHistory));
    if (songsHistory.length > 1) {
        songsHistory.pop();
    }
    refreshPlaylist();
});
playButton.addEventListener("click", (e) => {
    e.preventDefault();
    isPaused = !isPaused;
    if (isPaused) {
        songAudio.pause();
    }
    else {
        songAudio.play();
    }
    playButton.textContent = isPaused ? "▸" : "▴";
});
let isChangingTime = false;
progressBar.addEventListener("change", (e) => {
    e.preventDefault();
    songAudio.currentTime = Number.parseInt(progressBar.value);
    isPaused = false;
    playButton.textContent = isPaused ? "▸" : "▴";
});
progressBar.addEventListener("mousedown", () => {
    isChangingTime = true;
    songAudio.pause();
});
progressBar.addEventListener("mouseup", () => {
    isChangingTime = false;
    songAudio.play();
});
setInterval(() => {
    if (isChangingTime) {
        return;
    }
    progressBar.value = songAudio.currentTime.toString();
    songCurrentTime.textContent = formatDuration(songAudio.currentTime);
    if (songAudio.currentTime >= Number.parseFloat(progressBar.max)) {
        nextButton.click();
    }
}, 100);
editPlaylistButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../html/criar-playlist.html";
    //window.open("../html/criar-playlist.html");
});
