import Song from './components/song'
import Movie from './components/movie'
import PlayList from './components/playlist'

const list = document.getElementById('list')

const playList = new PlayList();
const s1 = new Song('Yellow submarine', "05.12", "The Beatles");
const s2 = new Song('The feeling', "04.12", "Justin Baber");
const s3 = new Song('There must be an angel', "05.20", "Eurythmics",);
const m1 = new Movie("Man of steel", 2012, "02:10:15");

playList.add(s1)
playList.add(s2)
playList.add(s3)
playList.add(m1)

playList.render(list);


document.addEventListener('click', e => {
    const btn = e.target;
    if (btn.dataset.el !== "btn") return;
    if (btn.dataset.el !== "btn") return;
    switch (btn.id) {
        case 'btn-play':
            playList.play(); break;
        case 'btn-next':
            playList.next(); break;
        case 'btn-stop':
            playList.stop(); break;
    }
    playList.render(list)
})