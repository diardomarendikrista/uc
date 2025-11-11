import React, { useEffect } from "react";
import { cn } from "lib/utils";
import { calendarDateAtom, dataLiburAtom } from "store";
import { useAtom } from "jotai";
import { dataLibur } from "lib/dataHoliday";

export default function HolidayList() {
  const [date] = useAtom(calendarDateAtom);
  const [libur, setLibur] = useAtom(dataLiburAtom);

  const selectedMonth = date.getMonth(); // 0-indexed (0 = January, 11 = December)
  const selectedYear = date.getFullYear();

  useEffect(() => {
    if (dataLibur?.length > 0) {
      const filteredHolidays = dataLibur?.filter((item) => {
        const holidayDate = new Date(item.start); // assuming start is a Date object or string

        return (
          holidayDate.getMonth() === selectedMonth &&
          holidayDate.getFullYear() === selectedYear
        );
      });
      setLibur(filteredHolidays);
    }
  }, [dataLibur, date]);

  return (
    <div
      className={cn(
        "w-full bg-white rounded-bl-lg rounded-br-lg text-black",
        "p-2 mb-5",
        { hidden: libur?.length <= 0 }
      )}
    >
      <div class="grid grid-cols-[auto_1fr] gap-x-3">
        {libur?.map((item, i) => (
          <React.Fragment key={i}>
            <div className="font-semibold text-right text-red-500">
              {item.end.getDate()}
            </div>
            <div className="ml-2 text-sm text-black">{item.desc}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
