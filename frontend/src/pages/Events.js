import { Await, defer, useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  //   if (data.isError) {
  //     return <p>{data.message}</p>;
  //   }

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {
    //   isError: true,
    //   message: "Could not retrieve events...",
    // };
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    const responseData = await response.json();
    return responseData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
