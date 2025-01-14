import { IProgram } from "../models/Program";

export const getProgramsForDate = (data: IProgram[], date: Date) => {
  const currentDate = date.toISOString().split("T")[0];

  let temp = data.filter((program) => program.date === currentDate);
  let temp2 = temp.sort(function (program) {
    return new Date(program.date + "T" + program.startTime).getTime();
  });
  return temp2;
};

export const yakutiaTime = () => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Yakutsk' }));
  return now;
}

export const getCurrentProgram = (dataP: IProgram[]) => {

  // Создаем объект Date с часовым поясом Якутии
  let now = yakutiaTime();


  // // Получаем текущую дату в формате ISO
  const currentDate = now.toISOString().split("T")[0];

  // // Ищем программу, учитывая часовой пояс Якутии
  // let findProgram = dataP.find((item, index) => {
  //   let start = new Date(item.date + "T" + item.startTime);    
  //   // Сравниваем вреия в часовом поясе Якутии
  //   console.log({now, start});
  //   return now.getTime() <= start.getTime() && item.date === currentDate;
  // });  

  let findPreviousProgram = null;
  for (let index = 0; index < dataP.length; index++) {
    let item = dataP[index];

    let start = new Date(item.date + "T" + item.startTime);
    
    // Сравниваем время в часовом поясе Якутии
    if (now.getTime() <= start.getTime()) {
  
      findPreviousProgram = dataP[index - 1];
      break;
    }
  }

  


  return findPreviousProgram;
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
