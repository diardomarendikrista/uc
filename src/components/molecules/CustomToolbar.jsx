import React from "react";
import { useAtom } from "jotai";
import { calendarViewAtom } from "store";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Tooltip from "components/atoms/Tooltip";

export default function CustomToolbar({ date, view, onView, onNavigate }) {
  const [currentView, setCurrentView] = useAtom(calendarViewAtom);

  // Helper function to format the date based on current view
  const getFormattedDate = () => {
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    if (view === "month") {
      return `${month} ${year}`;
    } else if (view === "day") {
      return `${date.getDate()} ${month} ${year}`;
    } else if (view === "week") {
      // Calculate start and end of week
      const startOfWeek = new Date(date);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
      startOfWeek.setDate(diff);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      const startMonth = startOfWeek.toLocaleString("default", {
        month: "short",
      });
      const endMonth = endOfWeek.toLocaleString("default", { month: "short" });

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${startMonth} ${year}`;
      } else {
        return `${startOfWeek.getDate()} ${startMonth} - ${endOfWeek.getDate()} ${endMonth} ${year}`;
      }
    }

    return `${month} ${year}`;
  };

  // Navigate to today
  const navigateToToday = () => {
    onNavigate("TODAY");
    setCurrentView("month");
  };

  // Navigate to previous period (based on current view)
  const navigateToPrev = () => {
    onNavigate("PREV");
  };

  // Navigate to next period (based on current view)
  const navigateToNext = () => {
    onNavigate("NEXT");
  };

  return (
    <div className="flex justify-center sm:justify-between items-center p-2 mb-2 rounded flex-wrap gap-3 gap-y-2">
      <div className="flex space-x-2">
        <Tooltip text="To Today">
          <button
            onClick={navigateToToday}
            className="px-7 py-2 border-1 rounded-3xl hover:bg-gray-200 cursor-pointer"
          >
            Today
          </button>
        </Tooltip>
        <Tooltip
          text={<span className="capitalize">Previous {currentView}</span>}
        >
          <button
            onClick={navigateToPrev}
            className="px-2 my-1 ml-2 py-1 rounded-2xl  hover:bg-gray-200 cursor-pointer"
          >
            <FaChevronLeft />
          </button>
        </Tooltip>
        <Tooltip text={<span className="capitalize">Next {currentView}</span>}>
          <button
            onClick={navigateToNext}
            className="px-2 my-1 py-1 rounded-2xl  hover:bg-gray-200 cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </Tooltip>
      </div>

      <div className="font-bold flex text-lg">{getFormattedDate()}</div>

      <div className="flex space-x-2 items-end">
        <div className="flex">
          <button
            onClick={() => {
              onView("month");
              setCurrentView("month");
            }}
            className={`px-3 py-1 rounded ${currentView === "month" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Month
          </button>
          <button
            onClick={() => {
              onView("week");
              setCurrentView("week");
            }}
            className={`px-3 py-1 rounded ${currentView === "week" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Week
          </button>
          <button
            onClick={() => {
              onView("day");
              setCurrentView("day");
            }}
            className={`px-3 py-1 rounded ${currentView === "day" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Day
          </button>
        </div>
      </div>
    </div>
  );
}
