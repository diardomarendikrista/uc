import ModalDetail from "components/organisms/ModalDetail";
import CalendarComponent from "components/organisms/CalendarComponent";
import HolidayList from "components/organisms/HolidayList";
import Layout from "layout/Layout";

export default function Calendar() {
  return (
    <Layout
      title={"UC Calendar"}
      backTo="/"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div>
          <CalendarComponent />

          <div className="mt-2 md:mt-3">
            <HolidayList />
          </div>
        </div>

        <ModalDetail />
      </div>
    </Layout>
  );
}
