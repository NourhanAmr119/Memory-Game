export class Preview {
    constructor(backImage) {
        this.backImage = backImage;
    }
    render(cards, flipHandler) {
        const board = document.getElementById("game-board");
        board.innerHTML = "";
        cards.forEach((card) => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";
            cardDiv.innerHTML = `
                <img src="${card.isFlipped || card.isMatched ? card.image : this.backImage}" />
            `;
            cardDiv.addEventListener("click", () => flipHandler(card));
            board.appendChild(cardDiv);
        });
    }
    updateProgress(matchesFound, totalPairs) {
        const progress = document.getElementById("progress-bar");
        const percentage = (matchesFound / totalPairs) * 100;
        progress.style.width = `${percentage}%`;
    }
    playSound(type) {
        const audio = document.getElementById(`sound-${type}`);
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
    playBackgroundMusic() {
        const bg = document.getElementById("sound-bg");
        if (bg) {
            bg.loop = true;
            bg.volume = 0.5;
            bg.play().catch(err => {
                console.warn("Autoplay blocked by browser:", err);
            });
        }
    }
}
