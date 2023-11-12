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
        TestData.tasks.forEach(task => {
            if (task.category && task.category.id === id) {
                task.category = null;
            }
        });

        const tmpCategory = TestData.categories.find(t => t.id === id);
        if (tmpCategory) {
            TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
            return of(tmpCategory);
        }
        throw Error("Category not found")
    }

    public update(category: Category): Observable<Category> {
        const tmpCategory = TestData.categories.find(t => t.id === category.id);
        if (tmpCategory) {
            TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);
            return of(tmpCategory);
        }
        throw Error("Category not found")
    }

    public getAll(): Observable<Category[]> {
        return of(TestData.categories);
    }

}
