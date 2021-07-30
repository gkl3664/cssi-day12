let googleUser
const searchBar = document.querySelector("#searchBar");
window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userId) => {
    //1. get access to all current user's notes
    const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val());
    });
};

const search = (event) => {
    const dbRef = firebase.database().ref(`users/${googleUser.uid}`);
    const labelInput = document.querySelector("#labelInput").value;
    dbRef.on('value', (snapshot) => {
        data = snapshot.val();
        labelledData = [];
        for (let key in data)
        {
            const note = data[key];
            if(note.label == labelInput)
            {
                labelledData.push(note);
            }
        }
        renderData(labelledData);
    });
};

const renderData = (data) => {
    const destination = document.querySelector('#app');
    destination.innerHTML = "";
    for (let key in data)
    {
        const note = data[key];
        destination.innerHTML += createCard(note);
    }
}

const createCard = (note) => {
    return ` <div class = "column is one-quarter"> 
                <div class = "card"> 
                    <header class = "card-header-title"> 
                        <p> ${note.title} </p>
                    </header>
                    <header class = "card-header"> 
                        <p> ${note.label} </p>
                    </header>
                    <div class = "card-content"> 
                        <div class = "content">
                            ${note.text}
                        </div>
                    </div> 
                </div>
            </div>`;
}