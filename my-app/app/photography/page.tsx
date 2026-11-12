// import Hero from "./Hero";
// import About from "./About"
// import Workflow from "./Workflow"
import ProjectsContainer from "./ProjectsContainer";
import ContactUs from "../src/components/Contact";
import PricingPlans from "../src/components/Pricing";
// import Navbar from "./Navbar";
import AboutContainer from "./AboutContainer";
import WorkflowContainer from "./WorkflowContainer";
import TalkToUsSection from "../src/components/letsTalk";
import HeroContainer from "./HeroContainer";
import Testimonials from "../src/components/Testimonials";
import NavbarContainer from "./NavbarContainer";

export default function Photography() {
  return (
    <>
      {/* <Navbar /> */}
      <NavbarContainer />
      <HeroContainer />
      <AboutContainer />
      <WorkflowContainer />
      <ProjectsContainer />
      <Testimonials />
      <PricingPlans />
      <TalkToUsSection
        contacts={{
          email: "hello@example.com",
          phone: "+12025550147",
          whatsapp: "http://wa.me/12025550147",
          calendly: "https://calendly.com/mysite/demo",
          twitterDM: "https://x.com/messages/compose?recipient_id=123456",
          instagram: "https://instagram.com/",
          telegram: "https://t.me/mysite",
          discord: "https://discord.gg/abc123",
          liveChat: "+12025550147",
          location: "https://maps.google.com/?q=My%20Studio",
          website: "https://mysite.com/help",
        }}
      />
      <ContactUs />
    </>
  );
}
