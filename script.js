// Questions data
const questions = [
    { text: "How often do you feel sad?", options: ["I do not feel sad.", "I feel sad much of the time.", "I am sad all the time.", "I am so sad or unhappy that I can't stand it."] },
    { text: "How do you feel about your future?", options: ["I am not discouraged about my future.", "I feel more discouraged than before.", "I do not expect things to work out for me.", "I feel my future is hopeless."] },
    { text: "How do you view your past achievements?", options: ["I do not feel like a failure.", "I have failed more than I should have.", "I see a lot of failures in my past.", "I feel like a total failure."] },
    { text: "How much pleasure do you get from activities you enjoy?", options: ["I enjoy activities as much as before.", "I enjoy them less than before.", "I get very little pleasure.", "I can't enjoy anything."] },
    { text: "How often do you feel guilty?", options: ["I do not feel guilty.", "I feel guilty over many things.", "I feel guilty most of the time.", "I feel guilty all the time."] },
    { text: "How do you feel about yourself?", options: ["I feel the same as ever.", "I have lost confidence in myself.", "I am disappointed in myself.", "I dislike myself."] },
    { text: "Do you have thoughts of self-harm or suicide?", options: ["I do not have any thoughts.", "I have thoughts but wouldn’t act on them.", "I would like to harm myself.", "I would harm myself if I had the chance."] },
    { text: "How often do you cry?", options: ["I do not cry more than usual.", "I cry more than I used to.", "I cry over many things.", "My crying is uncontrollable."] },
    { text: "How well do you sleep?", options: ["I sleep well.", "I have trouble falling asleep.", "I wake up frequently at night.", "I wake early and can't get back to sleep."] },
    { text: "How is your appetite?", options: ["I have a good appetite.", "I don't feel like eating often.", "I eat much less than before.", "I have no appetite at all."] },
    { text: "How well can you concentrate?", options: ["I can concentrate well.", "I find it difficult to concentrate.", "I find it very difficult to concentrate.", "I cannot concentrate on anything."] },
    { text: "How often do you feel tired?", options: ["I am no more tired than usual.", "I get tired more quickly than before.", "I am too tired to do anything.", "I am too tired to even get out of bed."] },
    { text: "How much do you enjoy your hobbies and interests?", options: ["I still enjoy them.", "I enjoy them less.", "I have lost interest.", "I have no interest at all."] },
    { text: "How much effort do you put into work?", options: ["I put in the same effort as before.", "I put in less effort.", "I put in very little effort.", "I can't put in any effort."] },
    { text: "How do you feel about your self-esteem?", options: ["I feel good about myself.", "I feel less confident.", "I feel worthless.", "I feel worthless and unlovable."] },
    { text: "How hopeless do you feel about the future?", options: ["I feel hopeful.", "I feel slightly hopeless.", "I feel hopeless.", "I feel completely hopeless."] },
    { text: "How valuable do you feel?", options: ["I feel valuable.", "I feel slightly less valuable.", "I feel worthless.", "I feel completely worthless."] },
    { text: "How energetic do you feel?", options: ["I have plenty of energy.", "I feel less energetic.", "I feel very low on energy.", "I feel completely drained."] },
    { text: "How often do you experience mood swings?", options: ["I do not experience them.", "I experience mild mood swings.", "I experience frequent mood swings.", "I experience severe mood swings."] },
    { text: "How often do you avoid social interactions?", options: ["I enjoy social interactions.", "I avoid them sometimes.", "I avoid them often.", "I avoid them completely."] },
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("questions-container");

    questions.forEach((question, index) => {
        const div = document.createElement("div");
        div.classList.add("question-card");
        div.innerHTML = `
            <label for="q${index}">${question.text}</label>
            <select id="q${index}">
                ${question.options.map((opt, i) => `<option value="${i}">${opt}</option>`).join("")}
            </select>
        `;
        container.appendChild(div);
    });

    // Attach event listener to submit button
    document.getElementById("submit-btn").addEventListener("click", calculateScore);
});

// Function to calculate score
function calculateScore() {
    let score = 0;

    questions.forEach((_, i) => {
        const selectedOption = document.querySelector(`#q${i}`);
        if (selectedOption) {
            score += parseInt(selectedOption.value);
        }
    });

    const scoreText = document.getElementById("scoreText");
    const scoreBox = document.getElementById("scoreBox");

    // Reset previous styles
    scoreBox.classList.remove("low-score", "moderate-score", "high-score", "critical-score");

    if (score <= 9) {
        scoreText.innerText = "Your mental health appears to be good!";
        scoreBox.classList.add("low-score");
    } else if (score <= 18) {
        scoreText.innerText = "You may be experiencing mild stress.";
        scoreBox.classList.add("moderate-score");
    } else if (score <= 29) {
        scoreText.innerText = "You may be experiencing moderate stress.";
        scoreBox.classList.add("high-score");
    } else {
        scoreText.innerText = "You may be experiencing significant stress. Consider seeking professional support.";
        scoreBox.classList.add("critical-score");
    }

    document.getElementById("questions-container").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
}

// Restart test function
function restartTest() {
    // Show the questions again
    document.getElementById("questions-container").classList.remove("hidden");
    document.getElementById("questions-container").style.display = "block"; // Ensure it's visible

    // Hide the result section
    document.getElementById("result").classList.add("hidden");
    document.getElementById("result").style.display = "none"; // Fully hide result

    // Reset all dropdowns to default value (first option, value = "0")
    questions.forEach((_, i) => {
        document.querySelector(`#q${i}`).value = "0";
    });

    // Clear the result text
    document.getElementById("scoreText").innerText = "Your score will be shown here.";
}
