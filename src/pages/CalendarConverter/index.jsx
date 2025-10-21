import Layout from "layout/Layout";
import { useState } from "react";
import { parseSchedule } from "./CalendarConverter";

export default function CalendarConverter() {
  // State untuk menyimpan teks dari textarea
  const [inputText, setInputText] = useState("");
  // State untuk menyimpan hasil output (sebagai string)
  const [outputText, setOutputText] = useState("");

  // Fungsi yang dipanggil saat tombol di-klik
  const handleProsesData = () => {
    // 1. Panggil fungsi parsing
    console.log(inputText);

    const data = parseSchedule(inputText);

    // 2. Ubah hasil array objek menjadi string JSON yang rapi
    const dataString = JSON.stringify(data, null, 2);

    // 3. Simpan string ke state untuk ditampilkan
    setOutputText(dataString);

    // 4. (Opsional) Tampilkan juga di console
    console.log("Data yang diparsing:", data);
  };

  return (
    <Layout
      title={"UC Calendar Converter"}
      backTo="/"
    >
      <div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste data Anda di sini..."
          style={{
            width: "100%",
            height: "250px",
            marginBottom: "10px",
            fontFamily: "monospace",
          }}
        />
        <button onClick={handleProsesData}>Proses Data</button>

        {/* Tampilkan hasil output jika ada */}
        {outputText && (
          <div className="mt-5">
            <h2>Output:</h2>
            <pre className="bg-[#f4f4f4] p-3 rounded-sm whitespace-pre-wrap text-black">
              {outputText}
            </pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
