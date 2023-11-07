import { Observable, of } from "rxjs";
import { Category } from "src/app/model/Category";
import { Priority } from "src/app/model/Priority";
import { Task } from "src/app/model/Task";
import { TaskDAO } from "../interface/TaskDAO";
import { TestData } from "../../TestData";

export class TaskDAOImpl implements TaskDAO {

    public search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return of(this.searchTasks(category, searchText, status, priority));
    }

    public getCompletedCountInCategory(category: Category): Observable<number> {
        throw new Error("Method not implemented.");
    }

    public getUncompletedCountInCategory(category: Category): Observable<number> {
        throw new Error("Method not implemented.");
    }

    public getTotalCountInCategory(category: Category): Observable<number> {
        throw new Error("Method not implemented.");
    }

    public getTotalCount(): Observable<number> {
        throw new Error("Method not implemented.");
    }

    public add(T: Task): Observable<Task> {
        throw new Error("Method not implemented.");
    }

    public get(id: number): Observable<Task> {
        const foundTask = TestData.tasks.find(todo => todo.id === id);
        if (foundTask) {
            return of(foundTask);
        } else {
            throw new Error("Task not found");
        }
    }

    public delete(id: number): Observable<Task> {
        throw new Error("Method not implemented.");
    }

    public update(task: Task): Observable<Task> {
        const taskTmp = TestData.tasks.find(t => t.id === task.id);

        if (taskTmp) {
            TestData.tasks.splice(TestData.tasks.indexOf(taskTmp!), 1, task);
        }

        return of(task);
    }

    public getAll(): Observable<Task[]> {
        return of(TestData.tasks);
    }

    private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
        let allTasks = TestData.tasks;

        if (category != null) {
            allTasks = allTasks.filter(todo => todo.category === category);
        }

        return allTasks;
    }

}
