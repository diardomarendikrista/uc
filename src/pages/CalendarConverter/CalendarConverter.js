// --- made by gemini AI ---

import moment from "moment";

function getAbbreviation(subject) {
  switch (subject.trim()) {
    case "Ethics for the Information Age":
      return "EIA";
    case "Civics":
      return "CIV";
    default:
      return "UNK";
  }
}

function getSyncType(typeChar) {
  return typeChar === "S" ? "Sync" : "Async";
}

/**
 * @param {string} textData Teks mentah dari textarea
 * @returns {Array<Object>} Array berisi objek jadwal
 */
export function parseSchedule(textData) {
  const lines = textData.split("\n").filter((line) => line.trim() !== "");
  const results = [];

  // Regex diperbarui untuk menangani \s+ (satu atau lebih spasi/tab)

  // Pola 1: Mencari baris tanggal
  // Menambahkan \s+ untuk menangani tab setelah nomor baris (misal: "1<tab>15 January...")
  const dateLinePattern = /^\d+\s+(\d{1,2}\s+\w+\s+\d{4})/;

  // Pola 2: Mencari baris mata kuliah
  // Menambahkan \s+ untuk menangani tab setelah kurung (misal: "(Thursday)<tab>Ethics...")
  const subjectLinePattern = /^\(.*\)\s+(.*)\s* - BA/;

  // Pola 3: Mencari baris sesi (Ini masalah utamanya)
  // Menggunakan \s+ untuk menangani tab di sekitar nomor sesi (misal: "...Sesi<tab>16<tab>A...")
  const sessionLinePattern = /Sesi\s+(\d+)\s+([AS])/;
  // --- [AKHIR PERUBAHAN] ---

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Cari baris yang menandakan awal entri baru (baris tanggal)
    const dateMatch = line.match(dateLinePattern);

    if (dateMatch) {
      try {
        const dateString = dateMatch[1]; // "15 January 2026"
        const subjectLine = lines[i + 1]; // Baris berikutnya
        const sessionLine = lines[i + 2]; // Baris setelahnya

        const subjectMatch = subjectLine.match(subjectLinePattern);
        if (!subjectMatch) continue;
        const subject = subjectMatch[1].trim();

        const sessionMatch = sessionLine.match(sessionLinePattern);
        if (!sessionMatch) {
          // Jika tidak cocok, log baris mana yang gagal
          console.warn("Regex sesi gagal di baris:", sessionLine);
          continue;
        }
        const sessionNum = sessionMatch[1]; // "16"
        const sessionTypeChar = sessionMatch[2]; // "A"

        // 4. Format data (ini tetap sama)
        const abbreviation = getAbbreviation(subject);
        const syncType = getSyncType(sessionTypeChar);

        const isoDate = moment(dateString, "DD MMMM YYYY").format("YYYY-MM-DD");

        const newEntry = {
          title: `${abbreviation} - ${sessionNum} - ${syncType}`,
          desc: `${subject} - BA - ${syncType} - Sesi ${sessionNum}`,
          start: moment(`${isoDate}T17:00:00`).toDate(),
          end: moment(`${isoDate}T20:00:00`).toDate(),
        };

        results.push(newEntry);
      } catch (e) {
        console.warn("Skipping record due to error:", e, lines[i]);
      }
    }
  }
  return results;
}
