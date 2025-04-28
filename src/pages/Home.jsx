import ModalDetail from "../components/organisms/ModalDetail";
import CalendarComponent from "../components/organisms/CalendarComponent";
import HolidayList from "components/organisms/HolidayList";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className={"text-center text-2xl md:text-4xl font-bold"}>
        <h1>Kalendar UC - IMT batch 6</h1>
      </div>
      <div>
        <CalendarComponent />

        <div className="mt-2 md:mt-3">
          <HolidayList />
        </div>
      </div>

      <ModalDetail />
    </div>
  );
}
