import { IProgram } from "../models/Program";

export const getProgramsForDate = (data: IProgram[], date: Date) => {
  const currentDate = date.toISOString().split("T")[0];

  let temp = data.filter((program) => program.date === currentDate);
  let temp2 = temp.sort(function (program) {
    return new Date(program.date + "T" + program.startTime).getTime();
  });
  return temp2;
};

export const getCurrentProgram = (dataP: IProgram[]) => {
  let now = new Date();
  const currentDate = now.toISOString().split("T")[0];

  let findProgram = dataP.find((item) => {
    let start = new Date(item.date + "T" + item.startTime);

    return now.getTime() >= start.getTime() && item.date === currentDate;
  });
  return findProgram;
};

export const getWeekDay = (day: number) => {
  switch (day) {
    case 1:
      return "Пн";
    case 2:
      return "Вт";
    case 3:
      return "Ср";
    case 4:
      return "Чт";
    case 5:
      return "Пт";
    case 6:
      return "Сб";
    case 0:
      return "Вс";
  }
};
