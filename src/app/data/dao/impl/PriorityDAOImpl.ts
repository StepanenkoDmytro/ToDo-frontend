import { Observable, of } from "rxjs";
import { Priority } from "src/app/model/Priority";
import { PriorityDAO } from "../interface/PriorityDAO";
import { TestData } from "../../TestData";

export class PriorityDAOImpl implements PriorityDAO {

    static priorities = TestData.priorities;

    public add(priority: Priority): Observable<Priority> {
        if (priority.id === null || priority.id === 0) {
            priority.id = this.getLastIdPriority();
        }

        PriorityDAOImpl.priorities.push(priority);
        return of(priority);
    }

    public get(id: number): Observable<Priority> {
        const el = PriorityDAOImpl.priorities.find(priority => priority.id === id);
        if (el) {
            return of(el);
        }
        throw new Error("Priority not found, id is null",);
    }

    public delete(id: number | null): Observable<Priority> {
        TestData.tasks.forEach(task => {
            if (task.priority && task.priority.id === id) {
                task.priority = null;
            }
        });

        const tmpPriority = PriorityDAOImpl.priorities.find(t => t.id === id);
        if (tmpPriority) {
            PriorityDAOImpl.priorities.splice(PriorityDAOImpl.priorities.indexOf(tmpPriority))
        }
        throw new Error("Priority not found, id is null",);
    }

    public update(priority: Priority): Observable<Priority> {
        const tmpPriority = PriorityDAOImpl.priorities.find(t => t.id === priority.id);
        if (tmpPriority) {
            PriorityDAOImpl.priorities.splice(PriorityDAOImpl.priorities.indexOf(tmpPriority), 1, priority);
        }
        throw new Error("Priority not found, id is null",);
    }

    public getAll(): Observable<Priority[]> {
        return of(TestData.priorities);
    }

    private getLastIdPriority(): number | null {
        return Math.max.apply(Math, PriorityDAOImpl.priorities.map(c => c.id!)) + 1;
    }
}
