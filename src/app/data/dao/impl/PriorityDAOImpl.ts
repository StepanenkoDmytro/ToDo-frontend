import { Observable } from "rxjs";
import { Priority } from "src/app/model/Priority";
import { PriorityDAO } from "../interface/PriorityDAO";

export class PriorityDAOImpl implements PriorityDAO {

    public add(T: Priority): Observable<Priority> {
        throw new Error("Method not implemented.");
    }

    public get(id: number): Observable<Priority> {
        throw new Error("Method not implemented.");
    }

    public delete(id: number): Observable<Priority> {
        throw new Error("Method not implemented.");
    }

    public update(T: Priority): Observable<Priority> {
        throw new Error("Method not implemented.");
    }

    public getAll(): Observable<Priority[]> {
        throw new Error("Method not implemented.");
    }
    
}
