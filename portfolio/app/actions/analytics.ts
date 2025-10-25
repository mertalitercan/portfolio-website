"use server"

import { createClient } from "@/lib/supabase/server"

type PageView = {
  path: string
  timestamp: number
  referrer: string
  userAgent: string
  country?: string
}

export async function trackPageView(data: PageView) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("page_views").insert({
      path: data.path,
      referrer: data.referrer,
      user_agent: data.userAgent,
      country: data.country,
    })

    if (error) {
      console.error("Error tracking page view:", error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error("Error tracking page view:", error)
    return { success: false, error }
  }
}

export async function trackResumeDownload(userAgent: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("resume_downloads").insert({
      user_agent: userAgent,
    })

    if (error) {
      console.error("Error tracking resume download:", error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error("Error tracking resume download:", error)
    return { success: false, error }
  }
}

export async function getAnalytics() {
  try {
    const supabase = await createClient()

    const { count: totalViews, error: viewsError } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })

    if (viewsError) throw viewsError

    const { count: resumeDownloads, error: downloadsError } = await supabase
      .from("resume_downloads")
      .select("*", { count: "exact", head: true })

    if (downloadsError) throw downloadsError

    const sections = ["", "about", "skills", "projects", "experience", "contact"]
    const sectionViewsPromises = sections.map(async (section) => {
      const path = section ? `/${section}` : "/"
      const { count } = await supabase.from("page_views").select("*", { count: "exact", head: true }).eq("path", path)

      return { path: section || "home", views: count || 0 }
    })

    const sectionViews = await Promise.all(sectionViewsPromises)

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    })

    const dailyVisitorsPromises = last7Days.map(async (day) => {
      const startOfDay = new Date(day)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(day)
      endOfDay.setHours(23, 59, 59, 999)

      const { data, error } = await supabase
        .from("page_views")
        .select("user_agent")
        .gte("created_at", startOfDay.toISOString())
        .lte("created_at", endOfDay.toISOString())

      if (error) throw error

      // Count unique visitors by user agent
      const uniqueVisitors = new Set(data?.map((v) => v.user_agent) || [])
      return { day, count: uniqueVisitors.size }
    })

    const dailyVisitors = (await Promise.all(dailyVisitorsPromises)).reverse()

    return {
      totalViews: totalViews || 0,
      resumeDownloads: resumeDownloads || 0,
      sectionViews,
      dailyVisitors,
    }
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return {
      totalViews: 0,
      resumeDownloads: 0,
      sectionViews: [],
      dailyVisitors: [],
    }
  }
}
