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
          email: "femi@thefjfilms.com",
          phone: "+13018511352",
          whatsapp: "http://wa.me/13018511352",
          calendly: "https://calendly.com/mysite/demo",
          twitterDM: "https://x.com/messages/compose?recipient_id=123456",
          instagram: "https://instagram.com/fjfilmz",
          telegram: "https://t.me/mysite",
          discord: "https://discord.gg/abc123",
          liveChat: "+13018511352",
          location: "https://maps.google.com/?q=My%20Studio",
          website: "https://mysite.com/help",
        }}
      />
      <ContactUs />
    </>
  );
}
