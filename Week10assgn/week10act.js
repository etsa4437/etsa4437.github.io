let triviabtn = document
  .querySelector("#js-new-quote")
  .addEventListener("click", newTrivia);

let answerBtn = document.querySelector("#js-tweet").addEventListener("click", newAnswer);


let current = {
    question: "",
    answer: "",
}

const endpoint = "https://opentdb.com/api.php?amount=10&category=15";
let cooldown = false;

async function newTrivia() {
  try {
    if (cooldown) {
      alert("Please wait a moment before requesting a new question.");
      return;
    }
    cooldown = true;
    setTimeout(() => {
      cooldown = false;
    }, 3500);

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    if (!json.results || json.results.length === 0) {
      displayTrivia("No question available at the moment.");
      current.answer = "";
      return;
    }

    const data = json.results[0];

    const question = decodeHTML(data.question);
    const answer = decodeHTML(data.correct_answer);
 //   console.log(json);
    displayTrivia(question);
    current.question = question;
    current.answer = answer;
    console.log("Quesiton:" , current.question);
    console.log("Answer:" , current.answer);
  } catch (err) {
    alert("Failed to fetch trivia. Please try again later.");
    console.error(err);
  }
}

function displayTrivia(question) {
    const questionText = document.querySelector("#js-quote-text");
    const answerText= document.querySelector("#js-answer-text");
    questionText.textContent = question;
    answerText.textContent = "";
    
    
}

function newAnswer() {
    // console.log("Success == answer!")
    const answerText= document.querySelector("#js-answer-text");
    answerText.textContent = current.answer || "No answer available.";
}
function decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}
