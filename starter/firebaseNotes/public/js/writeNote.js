let googleUser;
const notesRef = firebase.database().ref();


window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = (event) => {
    console.log("note submission function called");
    // 1. Capture the form data
    const noteTitle = document.querySelector("#noteTitle");
    const noteLabel = document.querySelector("#noteLabel");
    const noteText = document.querySelector("#noteText");
    // 2. Format the data
    note = {
        title: noteTitle.value,
        label: noteLabel.value,
        text: noteText.value
    };
    // 3. Clear the form so that we can write a new note
    noteTitle.value = "";
    noteLabel.value = "";
    noteText.value = "";
    // 4. Write it to the firebase
    //notesRef.push(googleUser.uid);
    const dbRef = firebase.database().ref(`users/${googleUser.uid}`)
    dbRef.push(note);
    //notesRef.push(note);
}
