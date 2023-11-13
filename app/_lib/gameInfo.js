export default async function createGame(userID) {
    const result = await fetch(`api/toptracks/${userID}`)
    const data = await result.json();
    const randomInd = Math.floor(10 * Math.random())
    const track = data.toptracks[randomInd];
    return {
        getAnswer: function () {
            return track.title
        },
        testAnswer: function (guess) {
            return track.title === guess
        },
    }
}