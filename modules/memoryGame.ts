import { Card } from "./card.js";
import { Preview } from "./preview.js";

export class MemoryGame {
    cards: Card[] = [];
    firstPick: Card | null = null;
    secondPick: Card | null = null;
    matchesFound: number = 0;
    preview: Preview;
    isLocked: boolean = false;  

constructor(images: string[], backImage: string) {
    this.preview = new Preview(backImage);

    const duplicated = [...images, ...images];
    this.cards = duplicated
        .map((img, index) => new Card(index, img))
        .sort(() => Math.random() - 0.5);

    this.preview.playBackgroundMusic();
}


flipCard(card: Card) {
    if (this.isLocked || card.isFlipped || card.isMatched) return;

    if (this.matchesFound === 0 && !this.firstPick) {
        this.preview.playBackgroundMusic();
    }

    card.isFlipped = true;
    this.preview.playSound("flip");

    if (!this.firstPick) {
        this.firstPick = card;
    } else if (!this.secondPick) {
        this.secondPick = card;
        this.checkMatch();
    }

    this.render();
}

    checkMatch() {
        if (!this.firstPick || !this.secondPick) return;

        if (this.firstPick.image === this.secondPick.image) {
            this.firstPick.isMatched = true;
            this.secondPick.isMatched = true;
            this.matchesFound++;
            this.preview.playSound("success");
            this.preview.updateProgress(this.matchesFound, this.cards.length / 2);

            if (this.matchesFound === this.cards.length / 2) {
                this.preview.playSound("win");
                this.showWinCard();
                return;
            }

            this.firstPick = null;
            this.secondPick = null;
        } else {
            this.preview.playSound("fail");
            this.isLocked = true; 

            setTimeout(() => {
                this.firstPick!.isFlipped = false;
                this.secondPick!.isFlipped = false;
                this.firstPick = null;
                this.secondPick = null;
                this.isLocked = false; 
                this.render();
            }, 1000);
        }

        this.render();
    }

showWinCard() {
const gameCard = document.querySelector(".game-card") as HTMLElement;

gameCard.innerHTML = `
    <div class="win-card text-center p-5">
    <h2 class="fw-bold text-success">🎉 Congratulations, You Won! 🎉</h2>
    <p class="mt-3 fs-5 text-muted">You matched all the cards.</p>
    </div>
`;
this.preview.playSound("success");
}

    render() {
        this.preview.render(this.cards, (card) => this.flipCard(card));
    }
}
