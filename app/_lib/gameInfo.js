export default async function createGame(artistID) {
    const result = await fetch(`api/toptracks/${artistID}`)
    const data = await result.json();
    const randomInd = Math.floor(10 * Math.random())
    const track = data.tracks[randomInd].name;
    return {
        getAnswer: function () {
            return track;
        },
        testAnswer: function (guess) {
            return guess === track;
        },
    }
}