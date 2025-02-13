const songsGrid = document.querySelector<HTMLDivElement>("#songs-grid")!;

const newMusicCard = (song: Song): HTMLDivElement => {
    let musicCard = document.createElement("div");

    musicCard.className = "song-card";


    const titleElement = document.createElement("h3");
    titleElement.textContent = song.title;

    const artistElement = document.createElement("p");
    artistElement.textContent = song.artist;

    const genreElement = document.createElement("p");
    genreElement.textContent = song.genre;

    const imageElement = document.createElement("img");
    imageElement.src = song.imagePath;
    imageElement.alt = song.title;

    musicCard.append(imageElement);
    musicCard.append(titleElement);
    musicCard.append(artistElement);
    musicCard.append(genreElement);

    return musicCard;
}

onload = () => {
    songs.forEach(song => {
        const songsCard = newMusicCard(song);
        songsGrid.append(songsCard);
    });
}
