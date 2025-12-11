const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const word = form.querySelector("input").value.trim();
  if (word) {
    getWordInfo(word);
  }
});

const getWordInfo = async (word) => {
  resultDiv.innerHTML = "<p>Loading...</p>";
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    const entry = data[0];
    const meaning = entry.meanings[0].definitions[0].definition;
    const phoneticText = entry.phonetics[0]?.text || "Not available";
    const audioSrc = entry.phonetics[0]?.audio || "";

    resultDiv.innerHTML = `
      <h2>${entry.word}</h2>
      <p><strong>Meaning:</strong> ${meaning}</p>
      <p><strong>Phonetic:</strong> ${phoneticText}</p>
      ${
        audioSrc
          ? `<audio controls src="${audioSrc}"></audio>`
          : `<p>No pronunciation audio available</p>`
      }
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
};
