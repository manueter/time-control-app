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

export const daysOfWeekTitles = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

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
}

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


export const isSameDate = (date1: Date | null , date2: Date | null): boolean => {
  if (!date1 || !date2) return false; // Ensure both dates are defined
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};