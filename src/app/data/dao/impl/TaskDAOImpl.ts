import { Observable, of } from "rxjs";
import { Category } from "src/app/model/Category";
import { Priority } from "src/app/model/Priority";
import { Task } from "src/app/model/Task";
import { TaskDAO } from "../interface/TaskDAO";
import { TestData } from "../../TestData";

export class TaskDAOImpl implements TaskDAO {

    public search(category: Category | null, searchText: string, status: boolean | null, priority: Priority | null): Observable<Task[]> {
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

    public add(task: Task): Observable<Task> {
        if(task.id === null || task.id === 0) {
            task.id = this.getLastIdTask();
        }
        TestData.tasks.push(task);
        return of(task);
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
        const taskTmp = TestData.tasks.find(t => t.id === id);
        if(taskTmp) {
            TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
            return of(taskTmp);
        } else {
            throw new Error("Task not found");
        }
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

    private searchTasks(category: Category | null, searchText: string, status: boolean | null, priority: Priority | null): Task[] {
        let allTasks = TestData.tasks;

        if(status != null) {
            allTasks = allTasks.filter(todo => todo.completed === status);
        }

        if (category != null) {
            allTasks = allTasks.filter(todo => todo.category === category);
        }

        if(priority != null) {
            allTasks = allTasks.filter(todo => todo.priority === priority);
        }
        
        if(searchText) {
            allTasks = allTasks.filter(todo => {
                return todo.title.toUpperCase().includes(searchText.toUpperCase())
            });
        }

        return allTasks;
    }

    private getLastIdTask(): number {
        return Math.max.apply(Math, TestData.tasks.map(task => task.id!)) + 1;
    }
}
