import { Category } from "../model/Category";
import { Priority } from "../model/Priority";
import { Task } from "../model/Task";


export class TestData {

    static categories: Category[] = [
        { id: 1, title: 'Робота' },
        { id: 2, title: 'Сімʼя' },
        { id: 3, title: 'Навчання' },
        { id: 4, title: 'Відпочинок' },
        { id: 5, title: 'Спорт' },
        { id: 6, title: 'Їжа' },
        { id: 7, title: 'Фінанси' },
        { id: 8, title: 'Гаджети' },
        { id: 9, title: 'Здоровʼя' },
        { id: 10, title: 'Автомобіль' },
        { id: 11, title: 'Ремонт' },
    ];

    static priorities: Priority[] = [
        { id: 1, title: 'Низький', color: '#e5e5e5' },
        { id: 2, title: 'Середний', color: '#85D1B2' },
        { id: 3, title: 'Високий', color: '#F1828D' },
        { id: 4, title: 'Дуже срочно!!', color: '#F1128D' }
    ];

    static tasks: Task[] = [
        {
            id: 1,
            title: 'Залити бензину повний бак',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[9],
            date: new Date('2022-04-10')
        },

        {
            id: 2,
            title: 'Передати звіт начальнику управління',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[0],
            date: new Date('2022-04-11')
        },

        {
            id: 3,
            title: 'Прибрати у себе в комнаті, полити рослини',
            priority: TestData.priorities[2],
            completed: true,
            category: TestData.categories[1]
        },

        {
            id: 4,
            title: 'Сходити до парку з сімʼєю, запросити друзів',
            priority: TestData.priorities[1],
            completed: false,
            category: TestData.categories[1],
            date: new Date('2022-08-17')
        },
        
        {
            id: 5,
            title: 'Знайти та вивчити підручник з квантової фізики',
            completed: false,
            category: TestData.categories[2]
        },

        {
            id: 6,
            title: 'Семінар з программування',
            priority: TestData.priorities[1],
            completed: true,
            category: TestData.categories[2],
            date: new Date('2022-06-11')
        },

        {
            id: 7,
            title: 'Знайти квитки в Турцію, вибрати готель',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[3]
        },

        {
            id: 8,
            title: 'Приготувати вечерю для всієї сімʼї',
            completed: false,
            category: TestData.categories[5]
        },

        {
            id: 9,
            title: 'Підтягнутись 10 раз',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[4],
            date: new Date('2022-03-12')
        },

        {
            id: 10,
            title: 'Пробіжати 100 м',
            priority: TestData.priorities[0],
            completed: true,
            category: TestData.categories[4]
        },

        {
            id: 11,
            title: 'Организувати дитяче свято',
            completed: false
        },

        {
            id: 12,
            title: 'Сходити на лекцію "Як научнавчитись програмувати на Java"',
            priority: TestData.priorities[1],
            completed: false,
            category: TestData.categories[2]
        },
        {
            id: 13,
            title: 'Купити продукти на тиждень',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[5],
            date: new Date('2022-05-11')
        },

        {
            id: 14,
            title: 'Провести зібрання з приводу всіх проектів',
            completed: true,
            category: TestData.categories[0]
        },

        {
            id: 15,
            title: 'Здати екзамен з Java',
            priority: TestData.priorities[2],
            completed: true
        },


        {
            id: 16,
            title: 'Покласти 100 000 грн до банку на депозит',
            priority: TestData.priorities[3],
            completed: false,
            category: TestData.categories[6]
        },

        {
            id: 17,
            title: 'Попросити аванс на работі',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[6]
        },

        {
            id: 18,
            title: 'Сдати анализи, перевірити гемоглобін',
            priority: TestData.priorities[3],
            completed: false,
            category: TestData.categories[8],
            date: new Date('2023-12-11')

        },

        {
            id: 19,
            title: 'Порівняти новий айпад з самсунгом',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[7],
            date: new Date('2022-10-11')

        },

        {
            id: 20,
            title: 'Футбол з співробітниками',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[4],
            date: new Date('2022-03-17')

        }
    ];
}
