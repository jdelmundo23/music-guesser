export default async function createGame(userID) {
    const result = await fetch(`api/toptracks/${userID}`)
    const data = await result.json();
    const randomInd = Math.floor((data.toptracks.length) * Math.random())
    const track = data.toptracks[randomInd];
    return {
        getID: function () {
            const id = track.uri.split('/').pop();
            return id
        },
        testAnswer: function (guess) {
            return track.title === guess
        },
        getAllTracks: function () {
            return data.toptracks;
        },
    }
}