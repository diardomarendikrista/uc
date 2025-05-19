import { cn } from "lib/utils";
import { Link } from "react-router-dom";

export default function Home() {
  const menuData = [
    { url: "/calendar", title: "UC Calendar" },
    { url: "/mata-kuliah", title: "Mata Kuliah" },
    { url: "/kalendar-akademik", title: "Kalendar Akademik" },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className={"text-center text-2xl md:text-4xl font-bold"}>
        <h1>Ciputra University - IMT batch 6</h1>
      </div>
      <div className="text-center text-xl md:text-xl font-bold">Quick Menu</div>

      <div className="flex flex-col gap-2 px-2 md:px-4 w-full">
        {menuData.map((item, index) => (
          <Link
            to={item.url}
            target="_blank"
            className={cn(
              "w-full border border-gray-300 py-2",
              "flex items-center justify-center",
              "cursor-pointer hover:bg-gray-600 rounded-md"
            )}
          >
            <div key={index}>{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
