import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Here you would typically send the email using a service
    // For now, we'll just return a success response

    // You can implement actual email sending here later
    // For example, using a service like SendGrid, Mailgun, etc.

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in contact API:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
