import ModalDetail from "../components/organisms/ModalDetail";
import CalendarComponent from "../components/organisms/CalendarComponent";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div children={""}>
        <h1>Kalendar UC - IMT batch 6</h1>
      </div>
      <div>
        <CalendarComponent />
      </div>

      <ModalDetail />
    </div>
  );
}
