"use client";

import { useState } from "react";
import { Download, AlertCircle } from "lucide-react";

export default function AdminExportForm() {
  const [monthYear, setMonthYear] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleExport = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ monthYear, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error("รหัสผ่านไม่ถูกต้อง");
        }
        throw new Error(errorData.error || "เกิดข้อผิดพลาดในการดาวน์โหลด");
      }

      // Convert response to blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fuel-export-${monthYear}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleExport} className="flex flex-col gap-4">
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center gap-2 mb-2">
          <AlertCircle size={20} />
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">เลือกเดือน/ปี <span className="text-red-500">*</span></label>
        <input 
          type="month" 
          required 
          value={monthYear}
          onChange={(e) => setMonthYear(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">รหัสผ่าน <span className="text-red-500">*</span></label>
        <input 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="กรอกรหัสผ่าน Admin"
          className="border border-gray-300 p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="mt-4 bg-gray-800 hover:bg-black text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        <Download size={20} />
        {isLoading ? "กำลังสร้างไฟล์ Excel..." : "ดาวน์โหลดรายงาน Excel"}
      </button>
    </form>
  );
}
