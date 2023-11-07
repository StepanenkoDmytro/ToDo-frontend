import { Task } from "src/app/model/Task";
import { CommonDAO } from "./CommonDAO";
import { Category } from "src/app/model/Category";
import { Observable } from "rxjs";
import { Priority } from "src/app/model/Priority";

export interface TaskDAO extends CommonDAO<Task> {
    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;
    
    getCompletedCountInCategory(category: Category): Observable<number>;

    getUncompletedCountInCategory(category: Category): Observable<number>;

    getTotalCountInCategory(category: Category): Observable<number>;

    getTotalCount(): Observable<number>;
}