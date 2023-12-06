export class CategorySearchValues {
    title: string | null = null;
}

export class PrioritySearchValues {
    title: string | null = null;
}

export class TaskSearchValues {
    title: string = '';
    completed: number | null = null;
    priorityId: number | null = null;
    categoryId: number | null = null;
    pageNumber: number = 0;
    pageSize: number = 5;

    sortColumn: string = 'title';
    sortDirection: string = 'asc';
}
