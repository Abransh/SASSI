import { Metadata } from "next";
import { getEvent } from "@/lib/event-service";
import { notFound } from "next/navigation";
import EventDetail from "@/components/EventDetail";

type PageParams = {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const event = await getEvent(resolvedParams.id);

    if (!event) {
      return {
        title: "Event Not Found - SASSI Milan",
      };
    }

    return {
      title: `${event.title} - SASSI Milan Events`,
      description: event.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Event - SASSI Milan",
    };
  }
}

export default async function EventPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  try {
    const resolvedParams = await params;
    const event = await getEvent(resolvedParams.id);

    if (!event) {
      notFound();
    }

    return <EventDetail event={event} />;
  } catch (error) {
    console.error("Error in EventPage:", error);
    notFound();
  }
}