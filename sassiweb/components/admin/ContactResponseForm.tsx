"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

interface ContactResponseFormProps {
  submissionId: string;
  recipientName: string;
  recipientEmail: string;
  originalSubject: string;
  originalMessage: string;
  onResponseSent: () => void;
}

export default function ContactResponseForm({
  submissionId,
  recipientName,
  recipientEmail,
  originalSubject,
  originalMessage,
  onResponseSent,
}: ContactResponseFormProps) {
  const [subject, setSubject] = useState(`Re: ${originalSubject}`);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/contact/${submissionId}/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          message,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send response");
      }

      toast.success("Response sent successfully!");
      onResponseSent();
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send response");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="mb-4 p-4 bg-gray-50 rounded-md">
          <div className="text-sm text-gray-600 mb-2">
            <strong>From:</strong> {recipientName} &lt;{recipientEmail}&gt;
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <strong>Subject:</strong> {originalSubject}
          </div>
          <div className="text-sm text-gray-700 whitespace-pre-line">
            {originalMessage}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Your Response
        </label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          required
          placeholder="Type your response here..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onResponseSent}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Response
            </>
          )}
        </Button>
      </div>
    </form>
  );
}