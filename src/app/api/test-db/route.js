import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'missing_url';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'missing_key';
  
  const supabase = createClient(supabaseUrl, serviceKey);

  const { data, error } = await supabase.from("fuel_records").select("*").limit(5);

  return NextResponse.json({ 
    status: "Diagnostics",
    env_keys_check: {
      url_prefix: supabaseUrl.substring(0, 25) + '...',
      service_key_prefix: serviceKey.substring(0, 15) + '...'
    },
    database_response: {
      total_records_visible_to_server: data ? data.length : 0,
      error_message: error ? error : "No errors",
      sample_data: data
    }
  });
}
