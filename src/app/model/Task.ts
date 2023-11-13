import { Category } from "./Category";
import { Priority } from "./Priority";

export class Task {
    id: number | null;
    title: string;
    completed: boolean;
    priority?: Priority | null;
    category?: Category | null;
    date?: Date;

    constructor(id: number | null, title: string, completed: boolean, priority?: Priority | null, category?: Category | null, date?: Date) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.priority = priority;
        this.category = category;
        this.date = date;
    }
}
