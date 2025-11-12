// --- made by gemini AI ---

import moment from "moment";
function getAbbreviation(subject) {
  const trimmedSubject = subject.trim();
  const words = trimmedSubject.split(/\s+/); // Memecah berdasarkan spasi atau tab

  // 1. Logika untuk satu kata (misal: "Civics" -> "CIV")
  if (words.length === 1) {
    const word = words[0];
    // Ambil 3 huruf pertama, jadikan huruf besar.
    // .substring(0, 3) aman meski katanya lebih pendek (misal "Go" -> "GO")
    return word.substring(0, 3).toUpperCase();
  }

  // 2. Logika untuk banyak kata (misal: "Web Programming" -> "WP")

  // Filter hanya kata yang diawali huruf besar (A-Z)
  // Ini akan mengambil "Ethics", "Information", "Age", tapi mengabaikan "for", "the"
  const capitalWords = words.filter((word) => {
    if (word.length === 0) return false;
    const firstChar = word[0];
    return firstChar >= "A" && firstChar <= "Z";
  });

  // Ambil huruf pertama dari setiap kata yang lolos filter
  let abbreviation = capitalWords.map((word) => word[0]).join("");

  // 3. Batasi maksimal 3 huruf (aturan "jika lebih, biarkan 3 pertama")
  if (abbreviation.length > 3) {
    abbreviation = abbreviation.substring(0, 3);
  }

  // 4. Fallback jika tidak ada hasil (misal jika inputnya "mata kuliah")
  if (abbreviation.length === 0) {
    if (words.length > 0) {
      // Ambil 3 huruf pertama dari kata pertama saja
      return words[0].substring(0, 3).toUpperCase();
    }
    return "UNK"; // Fallback terakhir
  }

  return abbreviation;
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
