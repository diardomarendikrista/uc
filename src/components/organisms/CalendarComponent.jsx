import { useEffect, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { dayPropGetter, eventStyleGetter } from "lib/utils";
import { dataLibur, dataMataKuliah } from "lib/dataEvents";
import moment from "moment";
import { useAtom } from "jotai";
import {
  calendarDateAtom,
  calendarViewAtom,
  modalDetailDataAtom,
  showModalDetailAtom,
} from "store";
import CustomToolbar from "components/molecules/CustomToolbar";

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const [view, setView] = useAtom(calendarViewAtom);
  const [date, setDate] = useAtom(calendarDateAtom);
  const [, setShowModalDetail] = useAtom(showModalDetailAtom);
  const [, setModalDetailData] = useAtom(modalDetailDataAtom);

  const calendarRef = useRef(null);
  // Gabungkan dataMataKuliah dan dataLibur
  const allEvents = [...dataMataKuliah, ...dataLibur];

  const handleNavigate = (newDate, viewAction) => {
    setDate(newDate);
  };

  // Create proper component functions for custom formatting
  const calendarComponents = {
    month: {
      header: ({ date, label }) => {
        const dayOfWeek = date.getDay();
        const style = {
          color: dayOfWeek === 0 || dayOfWeek === 6 ? "red" : "black",
        };
        return <span style={style}>{label}</span>;
      },
    },
    toolbar: CustomToolbar,
  };

  useEffect(() => {
    if ((view === "day" || view === "week") && calendarRef.current) {
      // Cari event-event untuk tanggal ini
      const eventsToday = allEvents.filter((event) => {
        const eventDate = new Date(event.start);
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      });

      // Cek kalau ADA event yang tidak allDay
      const hasTimedEvent = eventsToday.some((event) => !event.allDay);

      if (!hasTimedEvent) {
        // Kalau tidak ada event waktu tertentu, jangan scroll
        return;
      }

      // Kalau ada, baru scroll
      setTimeout(() => {
        const timeContent =
          calendarRef.current.querySelector(".rbc-time-content");
        if (timeContent) {
          timeContent.scrollTo({
            top: timeContent.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 0);
    }
  }, [view, date, allEvents]);

  return (
    <div ref={calendarRef}>
      <Calendar
        localizer={localizer}
        events={allEvents}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        view={view}
        onView={setView}
        onNavigate={handleNavigate}
        date={date}
        components={calendarComponents}
        onSelectEvent={(event) => {
          setShowModalDetail(true);
          setModalDetailData(event);
        }}
        style={{ height: 650, width: 800 }}
      />
    </div>
  );
}
