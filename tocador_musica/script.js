// Referências que buscamos do HTML
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');

// Variáveis criadas para apresentação da música
const dustToDust = {
    songName: 'Dust to Dust',
    artist: 'Misfits',
    file: 'misfits-album',
};

const dontStay = {
    songName: "Don't Stay",
    artist: 'Linkin Park',
    file: "linkin-park-meteora",
};

const waitAndBleed = {
    songName: 'Wait and Bleed',
    artist: 'Slipknot',
    file: 'Slipknot_capa',
};

let isPlaying = false;
let isShuffled = false;

const orginalPlaylist = [dustToDust, dontStay, waitAndBleed];
let sortedPlaylist = [...orginalPlaylist]
let index = 0;

// FUNÇÕES !!

// função empenhada para tocar a música
function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

// função empenhada para pausar a música
function pauseSong() {
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isPlaying = false;
}

// função "duas em uma"
// cada condição correspondente a valor booleano
function playPauseDecider(){
    if(isPlaying === true) {
        pauseSong();
    }
    else {
        playSong();
    }
}

// função responsável por apresentar cada card/música com suas respectivas características
function initializeSong(){
    cover.src = `images/covers/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].songName}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}

function previousSong() {
    if(index === 0){
        index = sortedPlaylist.length -1;
    }
    else{
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if(index === sortedPlaylist.length -1) {
        index = 0;
    }
    else{
        index += 1;
    }
    initializeSong();
    playSong();
}

// função para barra de progresso
function updateProgressBar() {
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
    let size = preShuffleArray.length;
    let currentIndex = size - 1
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked () {
    if(isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else {
        isShuffled = false;
        sortedPlaylist = [...orginalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

initializeSong();

// ação dos botões
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong)
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
