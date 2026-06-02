import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email } = body;
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Save to Supabase if credentials are configured
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co" &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder-key"
    ) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        const record = {
          type: body.type || "general",
          full_name: body.full_name || null,
          email,
          phone: body.phone || null,
          message: body.message || body.notes || null,
          destination_interest:
            Array.isArray(body.destinations)
              ? body.destinations.join(", ")
              : body.destination_interest || body.tour_title || null,
          travel_date_from: body.travel_date_from || body.travel_date || null,
          group_size: body.group_size
            ? parseInt(body.group_size)
            : body.travelers
            ? parseInt(body.travelers)
            : null,
          budget_range: body.budget_range || body.budget || null,
          status: "new",
          extra_data: {
            tour_slug: body.tour_slug,
            total_price: body.total_price,
            travel_style: body.travel_style,
            duration: body.duration,
          },
        };

        const { error: dbError } = await supabase.from("inquiries").insert([record]);
        if (dbError) console.warn("Supabase insert warning:", dbError.message);
      } catch (supabaseErr) {
        console.warn("Supabase unavailable:", supabaseErr);
      }
    } else {
      // Log locally for development
      console.log("📩 New inquiry (Supabase not configured):", {
        type: body.type,
        email,
        name: body.full_name,
      });
    }

    return NextResponse.json({ success: true, message: "Inquiry received" });
  } catch (err) {
    console.error("Inquiry API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
