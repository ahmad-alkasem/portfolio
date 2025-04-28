"use server"

import emailjs from "@emailjs/browser"

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_lyge5hc"
const EMAILJS_TEMPLATE_ID = "template_gq71ajj"
const EMAILJS_PUBLIC_KEY = "_7XYFxWLpFqAwsupE"

// Initialize EmailJS on the server
const initEmailJS = () => {
  if (!EMAILJS_PUBLIC_KEY) {
    console.error("EmailJS public key is not defined. Please check your environment variables.")
    return false
  }

  try {
    emailjs.init(EMAILJS_PUBLIC_KEY)
    return true
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error)
    return false
  }
}

// Server action to send email
export async function sendContactEmail(formData: {
  name: string
  email: string
  message: string
}) {
  try {
    // Initialize EmailJS
    initEmailJS()

    // Send email
    const response = await emailjs.send("service_lyge5hc","template_gq71ajj",{
      name: formData.name,
      email: formData.email,
      message: formData.message,
    })
    
    return {
      success: true,
      status: response.status,
      text: response.text,
    }
  } catch (error: any) {
    console.error("Error sending email:", error)
    return {
      success: false,
      status: error.status || 500,
      text: error.text || "Failed to send email",
    }
  }
}
