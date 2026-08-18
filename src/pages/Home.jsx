import Layout from "layout/Layout";
import { cn } from "lib/utils";
import { Link } from "react-router-dom";
import { FiCalendar, FiBookOpen, FiClock } from "react-icons/fi";

export default function Home() {
  const menuData = [
    { 
      url: "/calendar", 
      title: "UC Calendar", 
      description: "Lihat dan kelola jadwal kalender kegiatan.",
      icon: <FiCalendar className="w-8 h-8 mb-4 text-blue-500" /> 
    },
    { 
      url: "/mata-kuliah", 
      title: "Mata Kuliah", 
      description: "Informasi lengkap mengenai jadwal mata kuliah.",
      icon: <FiBookOpen className="w-8 h-8 mb-4 text-green-500" /> 
    },
    { 
      url: "/kalendar-akademik", 
      title: "Kalendar Akademik", 
      description: "Lihat agenda dan timeline akademik kampus.",
      icon: <FiClock className="w-8 h-8 mb-4 text-purple-500" /> 
    },
  ];

  return (
    <Layout title="Quick Menu">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuData.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              className={cn(
                "group relative bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden",
                "flex flex-col items-start justify-between",
                "transition-all duration-300 ease-in-out",
                "hover:shadow-xl hover:-translate-y-1 hover:border-transparent"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              <div className="z-10">
                {item.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
