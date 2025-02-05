export const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Deciembre",
];

export const daysOfWeekTitles = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

export const ViewTypeEnum = {
  Month: "mes",
  Week: "semana",
  Year: "año",
} as const;
export type ViewType = (typeof ViewTypeEnum)[keyof typeof ViewTypeEnum];



export const getWeekDays = (date: Date): (Date | null)[] => {
  const days: (Date | null)[] = [];

  const currentDay = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(monday);
    weekDay.setDate(monday.getDate() + i);
    days.push(weekDay);
  }

  return days;
};

export const getDaysInMonth = (date: Date): (Date | null)[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: (Date | null)[] = [];

  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  return days;
};

export const getDatesInRange = (start: Date, end: Date) => {
  const newDates: Date[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    newDates.push(new Date(d));
  }
  return newDates;
};

export const isSameDate = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;

  if(date1.getFullYear()!=date2.getFullYear()) return false;
  if(date1.getMonth()!=date2.getMonth()) return false;
  if(date1.getDate()!=date2.getDate()) return false;

  return true;
};

export const selectedDatesToString = (selectedDates: Date[]): string => {
  return selectedDates
    .map((date) => {
      return dateToString_DDMMYYYY(date);
    })
    .join(" - ");
};

export const dateToString_DDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0"); // Pad single digit days
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad single digit months (note: months are 0-based)
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// export const dateToString_YYYYMMDD = (date: Date): string => {
//   return date.toISOString().split("T")[0];
// };
