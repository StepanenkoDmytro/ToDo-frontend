export class Priority {
    id: number | null;
    title: string;
    color: string;

    constructor(id: number | null, title: string, color: string) {
        this.id = id;
        this.title = title;
        this.color = color;
    }
}
