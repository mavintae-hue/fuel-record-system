"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Save, CheckCircle2 } from "lucide-react";

const ROUTES = ["KA11", "KA12", "KA14", "CT21", "CT22", "CT23", "CT24", "CT25", "CT26", "CT27", "CT28", "CT33", "CT34", "CT35", "CT36", "CT37", "CT38", "CT39", "CT40", "CT41", "SUP"];
const FUEL_TYPES = ["แก๊สโซฮอล์ 95", "แก๊สโซฮอล์ E20", "แก๊สโซฮอล์ E85", "แก๊สโซฮอล์ 91", "เบนซิน 95", "แก๊ส NGV", "ดีเซล B7", "ดีเซล"];

export default function EmployeeForm() {
  const [route, setRoute] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg("");

    try {
      const { error } = await supabase
        .from("fuel_records")
        .insert([{ route, fuel_type: fuelType, amount: parseFloat(amount) }]);

      if (error) throw error;

      setSuccessMsg("บันทึกสำเร็จ");
      setRoute("");
      setFuelType("");
      setAmount("");
      
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Error inserting data:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {successMsg && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg flex items-center gap-2 mb-2">
          <CheckCircle2 size={20} />
          {successMsg}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">สายวิ่ง <span className="text-red-500">*</span></label>
        <select 
          required 
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>เลือกสายวิ่ง</option>
          {ROUTES.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">ประเภทน้ำมัน <span className="text-red-500">*</span></label>
        <select 
          required 
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>เลือกประเภทน้ำมัน</option>
          {FUEL_TYPES.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">จำนวนที่เติม (ลิตร/บาท) <span className="text-red-500">*</span></label>
        <input 
          type="number" 
          required 
          step="0.01" 
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="border border-gray-300 p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        <Save size={20} />
        {isLoading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
      </button>
    </form>
  );
}
