import EventDetails from "@/components/EventDetails";
import { Suspense } from "react";

const EventDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails slug={slug} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;
