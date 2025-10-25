import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    const supabase = await createClient()

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      message,
    })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
