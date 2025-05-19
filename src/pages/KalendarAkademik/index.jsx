export default function KalendarAkademik() {
  const pdfUrl = "/assets/documents/kalendar-akademik-2024-2025.pdf";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-2xl md:text-4xl font-bold">
          Kalendar Akademik - IMT batch 6
        </h1>
      </div>

      {/* PDF Viewer */}
      <div className="flex justify-center">
        <div className="w-full max-w-[95%] bg-gray-50 rounded-lg shadow-lg p-1 border border-gray-300">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
            width="100%"
            height="900"
            title="Kalendar Akademik PDF"
            frameBorder="0"
            className="rounded"
            type="application/pdf"
            style={{ minHeight: "700px" }}
          ></iframe>
        </div>
      </div>

      {/* Backup Download Link */}
      <div className="text-center mt-4">
        <p className="text-gray-300">
          Jika viewer tidak berfungsi dengan baik, silakan{" "}
          <a
            href={pdfUrl}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            lihat PDF secara langsung
          </a>{" "}
          atau{" "}
          <a
            href={pdfUrl}
            className="text-blue-600 hover:underline"
            download="kalendar-akademik-2024-2025.pdf"
          >
            unduh file
          </a>
        </p>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-sm mt-6">
        <p>Updated: May 2025</p>
      </div>
    </div>
  );
}
