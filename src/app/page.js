"use client";

import { useState } from "react";
import EmployeeForm from "@/components/EmployeeForm";
import AdminExportForm from "@/components/AdminExportForm";
import { Fuel, FileSpreadsheet } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("employee");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white text-center">
          <h1 className="text-2xl font-bold tracking-wide">ระบบจัดการน้ำมัน</h1>
          <p className="text-blue-100 text-sm mt-1">บันทึกข้อมูลและออกรายงาน</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("employee")}
            className={`flex-1 py-4 text-sm font-semibold flex flex-col items-center gap-1 transition-colors ${
              activeTab === "employee" 
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Fuel size={20} />
            บันทึกข้อมูล
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex-1 py-4 text-sm font-semibold flex flex-col items-center gap-1 transition-colors ${
              activeTab === "admin" 
                ? "text-gray-900 border-b-2 border-gray-900 bg-gray-50" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FileSpreadsheet size={20} />
            ดึงรายงาน
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "employee" ? <EmployeeForm /> : <AdminExportForm />}
        </div>
        
      </div>
      
      {/* Footer text */}
      <div className="mt-8 text-center text-xs text-gray-400">
        © 2026 Fuel Record System
      </div>
    </div>
  );
}
