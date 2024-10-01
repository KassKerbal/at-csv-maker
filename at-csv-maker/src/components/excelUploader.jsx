import React, { useState } from "react";
import * as XLSX from "xlsx";

function ExcelUploader() {
  const [csvData, setCsvData] = useState("");
  const [blob, setBlob] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]; 
      const csv = XLSX.utils.sheet_to_csv(firstSheet, {strip: true, skipHidden: true});
      setCsvData(csv);

      const newBlob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      setBlob(URL.createObjectURL(newBlob))
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      ></input>
      <label>Carga tu EXCEL Aquí</label>
     {csvData && <p>CSV Generado: <a href={blob} download="archivo.csv" id="downloadLink">Descarga aquí</a></p>}
      {csvData && (
                <div>
                    <h2>CSV Generado:</h2>
                    <textarea rows="30" cols="200" value={csvData} readOnly></textarea>
                </div>
            )}

    </>
  );
}

export default ExcelUploader;
