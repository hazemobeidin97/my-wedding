import Navigation  from "@/components/Navigation";
import Hero        from "@/components/Hero";
import Countdown   from "@/components/Countdown";
import OurStory    from "@/components/OurStory";
import EventDetails from "@/components/EventDetails";
import Venue       from "@/components/Venue";
import Gallery     from "@/components/Gallery";
import VideoMoment from "@/components/VideoMoment";
import RSVP        from "@/components/RSVP";
import Footer      from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Countdown />
      <OurStory />
      <EventDetails />
      <Venue />
      <Gallery />
      <VideoMoment />
      <RSVP />
      <Footer />
    </main>
  );
}
