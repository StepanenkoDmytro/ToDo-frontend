import { Observable } from "rxjs";
import { Stat } from "src/app/model/Stat";

export interface StatDAO {
    getOverallStat(): Observable<Stat>;
}