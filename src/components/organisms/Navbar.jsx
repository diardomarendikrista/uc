import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function Navbar({ backTo, title }) {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 flex items-center justify-between px-2 md:px-4 h-12 z-5">
      <Link
        to="/"
        className={
          "text-center text-xl md:text-2xl font-bold flex gap-2 w-full"
        }
      >
        <img
          src="/icon.png"
          alt="Ciputra University"
          className="w-8 h-8"
        />
        <h1>Ciputra University</h1>
      </Link>
      {title && (
        <div className="flex items-center justify-end gap-5 w-[150px] md:w-[50%]">
          {backTo && (
            <div className="hidden md:flex items-center gap-5">
              <Link to={backTo || "/"}>
                <div className="flex items-center gap-1">
                  <IoMdArrowBack /> Back
                </div>
              </Link>
              <div>|</div>
            </div>
          )}
          <div className={"text-center text-md md:text-xl font-bold"}>
            {title}
          </div>
        </div>
      )}
    </div>
  );
}
