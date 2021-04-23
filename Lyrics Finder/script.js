const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const api = 'https://api.lyrics.ovh';

async function searchSong(searchFor){
    const res = await fetch(`${api}/suggest/${searchFor}`);
    const data = await res.json();
    showData(data);
/*  fetch(`${api}/suggest/${searchFor}`)
    .then(res => res.json())
    .then(data => console.log(data));   */
}

function showData(data){
    result.innerHTML = `
        <ul class="songs">
            ${data.data.map(song => `
            <li>
                <span><strong>${song.title}</strong> - ${song.artist.name}</span>
                <button class="btn" data-songTitle="${song.title}" data-artist="${song.artist.name}">Show</button>
            </li>
            `)
            .join('')
        }
        </ul>
     `;

     if(data.prev || data.next){
         more.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ``}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ``}
         `;
     }else{
         more.innerHTML = ``;
     }
/*     let songs = '';
     data.data.forEach(song => {
         songs += `
            <li>
                <span><strong>${song.title}</strong> - ${song.artist.name}</span>
                <button class="btn" data-songTitle="${song.title}" data-artist="${song.artist.name}">Show Lyrics</button>
            </li>
         `;
     });
     result.innerHTML = `
        <ul class="songs">
            ${songs}
        </ul>
     `; */ 
}

async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);
    // Use a proxy (Heroku cors anywhere) for CORS error at console - https://github.com/Rob--W/cors-anywhere
}

async function getLyrics(artist, songTitle){
    const res = await fetch(`${api}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r|\n)/g, '<br>');
    result.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <div class="lyrics">${lyrics}</div>
    `;
    more.innerHTML = ``;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchFor = search.value.trim();
    if(!searchFor){
        alert('Type song name or artist name before search...');
    }else{
        searchSong(searchFor);
    }
});

result.addEventListener('click', e => {
    const targeted = e.target;
    if(targeted.tagName === 'BUTTON'){
        const songTitle = targeted.getAttribute('data-songTitle');
        const artist = targeted.getAttribute('data-artist');
        getLyrics(artist, songTitle);
    }    
});