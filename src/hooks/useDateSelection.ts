import { useEffect, useState } from "react";
import { getDatesInRange, isSameDate } from "../utils/dateUtils";

export const useDateSelection = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [shiftPressed, setShiftPressed] = useState(false);
  const [ctrlPressed, setCtrlPressed] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift") setShiftPressed(true);
      if (event.key === "Control") setCtrlPressed(true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") setShiftPressed(false);
      if (event.key === "Control") setCtrlPressed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const toggleDate = (date: Date) => {
    const dateStr = date.toLocaleDateString();
    setSelectedDates((prev) =>
      prev.some((d) => d.toLocaleDateString() === dateStr)
        ? prev.filter((d) => d.toLocaleDateString() !== dateStr)
        : [...prev, date]
    );
  };

  const handleDateClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    date: Date,
    shiftPressed: boolean,
    ctrlPressed: boolean
  ) => {
    if (event.detail === 1) {
      if (shiftPressed && selectedDates.length > 0) {
        const lastSelected = new Date(selectedDates[selectedDates.length - 1]);
        const start = lastSelected < date ? lastSelected : date;
        const end = lastSelected < date ? date : lastSelected;
        const newDates = getDatesInRange(start, end);

        const uniqueNewDates = newDates.filter(
          (d) => !selectedDates.some((selected) => isSameDate(selected, d))
        );
        setSelectedDates((prev) => [...new Set([...prev, ...uniqueNewDates])]);

      
      } else if (ctrlPressed) {
        toggleDate(date);
      } else {
        toggleDate(date);
      }
    } else if (event.detail === 2) {
      setSelectedDates((prev) =>
        prev.some((d) => isSameDate(d,date))
          ? prev
          : [...prev, date]
      );
      setIsModalOpen(true);
    }
    console.log(selectedDates);
  };

  const deselectAll = () => {
    setSelectedDates([]);
  };

  return {
    selectedDates,
    currentDate,
    setCurrentDate,

    shiftPressed,
    ctrlPressed,
    handleDateClick,
    deselectAll,

    isModalOpen,
    setIsModalOpen,
    currentNote,
    setCurrentNote,

  };
};
