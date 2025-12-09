import { Card } from "./card.js";

export class Preview {
    backImage: string;

    constructor(backImage: string) {
        this.backImage = backImage;
    }

    render(cards: Card[], flipHandler: (card: Card) => void) {
        const board = document.getElementById("game-board")!;
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

    updateProgress(matchesFound: number, totalPairs: number) {
        const progress = document.getElementById("progress-bar") as HTMLDivElement;
        const percentage = (matchesFound / totalPairs) * 100;
        progress.style.width = `${percentage}%`;
    }

    playSound(type: "flip" | "success" | "fail" | "win") {
        const audio = document.getElementById(`sound-${type}`) as HTMLAudioElement;
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
playBackgroundMusic() {
    const bg = document.getElementById("sound-bg") as HTMLAudioElement;
    if (bg) {
        bg.loop = true;
        bg.volume = 0.5;
        bg.play().catch(err => {
            console.warn("Autoplay blocked by browser:", err);
        });
    }
}

}
