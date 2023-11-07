import { Observable, of } from "rxjs";
import { Category } from "src/app/model/Category";
import { CategoryDAO } from "../interface/CategoryDAO";
import { TestData } from "../../TestData";

export class CategoryDAOImpl implements CategoryDAO {

    public search(title: string): Observable<Category[]> {
        throw new Error("Method not implemented.");
    }

    public add(T: Category): Observable<Category> {
        throw new Error("Method not implemented.");
    }

    public get(id: number): Observable<Category> {
        throw new Error("Method not implemented.");
    }

    public delete(id: number): Observable<Category> {
        throw new Error("Method not implemented.");
    }

    public update(T: Category): Observable<Category> {
        throw new Error("Method not implemented.");
    }

    public getAll(): Observable<Category[]> {
        return of(TestData.categories);
    }
    
}
