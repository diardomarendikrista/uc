import { modalDetailDataAtom, showModalDetailAtom } from "store";
import Modal from "../atoms/Modal";
import { useAtom } from "jotai";
import { CgDetailsMore } from "react-icons/cg";
import { FaCalendarDay, FaSquare } from "react-icons/fa";
import moment from "moment";

export default function ModalDetail() {
  const [showModal, setShowModal] = useAtom(showModalDetailAtom);
  const [data] = useAtom(modalDetailDataAtom);

  console.log(data, "data");

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title="Detail"
      className={"md:w-[500px]"}
    >
      <div class="grid grid-cols-[auto_1fr] gap-y-2 gap-x-4">
        <div className="mt-[6px] w-6">
          <FaSquare />
        </div>
        <div className="mb-2">
          <div className="text-lg font-bold">{data.title}</div>
          <div className="text-sm">
            {moment(new Date(data.start)).format("dddd, DD MMM")}
          </div>
        </div>
        {data.title !== data.desc && (
          <>
            <div className="mt-1">
              <CgDetailsMore />
            </div>
            <div>{data.desc}</div>
          </>
        )}
        {data.type && (
          <>
            <div className="mt-1">
              <FaCalendarDay />
            </div>
            <div>{data.type}</div>
          </>
        )}

        {!data.type && data?.desc?.includes("Sesi") && (
          <>
            <div className="mt-1">
              <FaCalendarDay />
            </div>
            <div>
              UC {data?.desc?.includes("Async") ? "Asynchronus" : "Synchronus"}{" "}
              Class
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
