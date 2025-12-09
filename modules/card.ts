export class Card {
    id: number;
    image: string;
    isFlipped: boolean = false;
    isMatched: boolean = false;

    constructor(id: number, image: string) {
        this.id = id;
        this.image = image;
    }
}
