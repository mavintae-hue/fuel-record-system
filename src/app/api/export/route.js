import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/server";
import * as xlsx from "xlsx";

export async function POST(request) {
  try {
    const { monthYear, password } = await request.json();

    // Verify Password
    if (password !== process.env.ADMIN_EXPORT_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!monthYear) {
      return NextResponse.json({ error: "Month/Year is required" }, { status: 400 });
    }

    // Parse monthYear (e.g., "2026-03")
    const [year, month] = monthYear.split("-");
    
    // Calculate start and end dates for the selected month
    const startDate = new Date(year, parseInt(month) - 1, 1).toISOString();
    const endDate = new Date(year, parseInt(month), 0, 23, 59, 59, 999).toISOString();

    const supabase = createServiceRoleClient();

    const { data: records, error } = await supabase
      .from("fuel_records")
      .select("*")
      .gte("created_at", startDate)
      .lte("created_at", endDate)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (!records || records.length === 0) {
      return NextResponse.json({ error: "ไม่พบข้อมูลสำหรับเดือนที่เลือก" }, { status: 404 });
    }

    // Format data for Excel
    const formattedData = records.map((record) => {
      // Format date
      const date = new Date(record.created_at);
      const formattedDate = date.toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });

      return {
        "วันที่เวลา": formattedDate,
        "สายวิ่ง": record.route,
        "ประเภทน้ำมัน": record.fuel_type,
        "จำนวนที่เติม (ลิตร/บาท)": record.amount,
      };
    });

    // Create workbook and worksheet
    const worksheet = xlsx.utils.json_to_sheet(formattedData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Fuel Records");

    // Write buffer 
    const buf = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Return the excel file
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="fuel-export-${monthYear}.xlsx"`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

  } catch (err) {
    console.error("Export Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
