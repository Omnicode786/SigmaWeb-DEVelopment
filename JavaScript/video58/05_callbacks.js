// ✅ Callback Functions
// Aise functions jo kisi aur function ko argument ke tor pe diye jate hain aur baad me call hote hain.

function askQuestion(question, callback) {
    console.log(question);
    const answer = "Muzammil ka jawab";
    callback(answer);
}

askQuestion("Tumhara naam kya hai?", function(response) {
    console.log("Callback ne bola: " + response);
});
