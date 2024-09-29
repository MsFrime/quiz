// database.js
window.onload = () => {
  const dbPromise = idb.open("animeQuiz", 1, (upgradeDb) => {
    if (upgradeDb.oldVersion < 1) {
      upgradeDb.createObjectStore("results", { keyPath: "id", autoIncrement: true });
    }
  });

  // Function to display the latest result on the page
  function displayLatestResult(result) {
    document.getElementById("latest-name").textContent = result.name;
    document.getElementById("latest-score").textContent = result.score;
  }

  // Function to save the result to the database
  function saveResult(name, score) {
    dbPromise.then(db => {
      const tx = db.transaction('results', 'readwrite');
      const store = tx.objectStore('results');
      const result = { name: name, score: score };
      return store.add(result);
    }).then(() => {
      console.log('Result saved!');
      // Update the displayed result after saving
      displayLatestResult({ name: name, score: score });
    });
  }

  // Get and display the latest results on page load
  dbPromise.then(db => {
    const tx = db.transaction('results', 'readonly');
    const store = tx.objectStore('results');
    return store.getAll();
  }).then(results => {
    if (results.length > 0) {
      const latestResult = results[results.length - 1];
      displayLatestResult(latestResult);
    }
  });

  // ... (ваш код викторины) ...

  // Example: After the quiz is finished
  // const playerName = ...; // Get player name
  // const playerScore = ...; // Calculate player's score
  // saveResult(playerName, playerScore); 
};
