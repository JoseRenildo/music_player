// Referências que buscamos do HTML
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

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

let isPlaying = false
const playlist = [dustToDust, dontStay, waitAndBleed];
let index = 0;

// FUNÇÕES !!

//
function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true) {
        pauseSong();
    }
    else {
        playSong();
    }
}

function initializeSong(){
    cover.src = `images/covers/${playlist[index].file}.jpg`;
    song.src = `songs/${playlist[index].songName}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

initializeSong();

// ação dos botões
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click',)