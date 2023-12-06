import { Observable } from "rxjs";

export interface CommonDAO<T> {
    getAll(): Observable<T[]>;

    get(id: number): Observable<T>;

    add(element: T): Observable<T>;

    update(element: T): Observable<T>;

    delete(id: number): Observable<T>;
}
