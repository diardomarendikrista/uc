import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function cn(...classes) {
  return twMerge(clsx(classes));
}

export const DisableConsole = () => {
  function noop() {}

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (!isLocalhost) {
    console.log = noop;
    console.warn = noop;
    console.error = noop;
  }
};

export const eventStyleGetter = (event) => {
  // Tentukan warna latar belakang berdasarkan event.title dan event.desc
  let backgroundColor = "";
  if (event.type === "holiday") {
    backgroundColor = "red"; // Libur menggunakan warna merah
  } else if (event.desc && event.desc.match(/sesi (4|8|12|16)/i)) {
    backgroundColor = "orange"; // Sesi ALP
  } else if (event.title.includes("Async")) {
    backgroundColor = "green";
  }

  const style = {
    backgroundColor: backgroundColor,
    color: "white", // Warna teks
  };

  return {
    style: style,
  };
};

export const dayPropGetter = (date) => {
  const dayOfWeek = date.getDay(); // Dapatkan hari dalam seminggu (0 = Minggu, 6 = Sabtu)
  const style = {
    color: dayOfWeek === 0 || dayOfWeek === 6 ? "red" : "black", // Merah untuk Minggu dan Sabtu, hitam untuk hari lainnya
  };
  return { style };
};
