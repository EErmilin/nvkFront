import { IProgram } from "../../../../../models/Program";

const CURRENT_DATE = new Date();
const DAYS_OF_WEEK = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const DAYS_LENGHT = 7;

const format = (day: number) => (day < 10 ? `0${day}` : day);


export const TEST_DATE = new Date(CURRENT_DATE.getFullYear(), 7, 16, CURRENT_DATE.getHours(), CURRENT_DATE.getMinutes(), CURRENT_DATE.getSeconds());


export function generateDaysArray() {
    const DAYS: Array<{ label: string, date: string }> = [];

    for (let i = 0; i < DAYS_LENGHT; i++) {
        const targetDate = new Date(TEST_DATE);
        targetDate.setDate(TEST_DATE.getDate() + i);

        const formattedDate = `${format(targetDate.getDate())}.${format(targetDate.getMonth() + 1)}`;
        let dayLabel = '';

        if (i === 0) {
            dayLabel = "Сегодня";
        } else if (i === 1) {
            dayLabel = "Завтра";
        } else {
            dayLabel = DAYS_OF_WEEK[(TEST_DATE.getDay() + i - 1) % 7];
        }

        DAYS.push({ label: `${dayLabel}, ${formattedDate}`, date: new Date(targetDate).toISOString().slice(0, 10) });
    }

    return DAYS;
}

export function sortAndGroupProgramsByDay(programs: IProgram[]): Record<string, IProgram[]> {
    const groupedByDay: Record<string, IProgram[]> = {};

    for (const program of programs) {
        program.startTime = formatTimeToHHMM(program.startTime)
        const date = program.date;
        if (!groupedByDay[date]) {
            groupedByDay[date] = [];
        }
        groupedByDay[date].push(program);
    }



    return groupedByDay;
}


export function formatTimeToHHMM(time: string): string {
    const date = new Date(`1970-01-01T${time}`);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}