"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mail, Clock, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Message {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export default function MessagesDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading messages:", error)
        return
      }

      setMessages(data || [])
    } catch (error) {
      console.error("Failed to load messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (messageId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("contact_messages").delete().eq("id", messageId)

      if (error) {
        console.error("Error deleting message:", error)
        return
      }

      setMessages(messages.filter((msg) => msg.id !== messageId))
    } catch (error) {
      console.error("Failed to delete message:", error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Contact Messages</h2>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Loading messages...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <Badge variant="secondary">{messages.length} total</Badge>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {new Date(message.created_at).toLocaleDateString()}{" "}
                    {new Date(message.created_at).toLocaleTimeString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {message.email}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 whitespace-pre-wrap">{message.message}</p>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={() => deleteMessage(message.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
