import Hero from "./Hero";
import WhatWeDo from "./What-We-Do";
import { createClient } from "../../utils/supabase/server";
// import SignOutButton from "../src/components/SignOutButton";
import { loadSectionUrl } from "../../utils/supabase/loadSectionUrl";
import Showroom from "./Showroom";
import ContactUs from "../src/components/Contact";
import PricingPlans from "../src/components/Pricing";
// import Navbar from "./Navbar";
import TalkToUsSection from "../src/components/letsTalk";
import Testimonials from "../src/components/Testimonials";
import NavbarContainer from "./NavbarContainer";

export default async function Home() {
  const supabase = await createClient();

  const { data: user_page } = await supabase.auth.getUser();

  const url = await loadSectionUrl("section2_1");
  const url2 = await loadSectionUrl("section2_2");
  const url3 = await loadSectionUrl("section2_3");
  const url4 = await loadSectionUrl("section2_4");

  let videography_page_main;
  let storageMain;

  try {
    const { data: storageData } = await supabase.storage
      .from("videography")
      .getPublicUrl("section2/17039.jpg");

    if (!storageData) {
      console.error("Error fetching videography data");
      // storageData_main = storageData;
      return;
    }

    // Handle the fetched data (e.g., update state)
    storageMain = storageData;
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const { data: videography_page, error: videography_error_page } =
      await supabase.from("videography").select("*");

    if (videography_error_page) {
      console.error("Error fetching videography data:", videography_error_page);
      // videography_error_page_main = videography_error_page;
      return;
    }

    // Handle the fetched data (e.g., update state)
    videography_page_main = videography_page;
    // setvideographyValue(videography);
  } catch (error) {
    console.error("Error:", error);
  }

  return (
    <div className="w-full">
      {/* <ToastContainer /> */}
      {/* <Navbar /> */}
      <NavbarContainer />
      <Hero
        user_hero={user_page}
        videography={videography_page_main}
        // videographyError={videography_error_page_main}
      />
      <WhatWeDo
        user_hero={user_page}
        videography={videography_page_main}
        // videographyError={videography_error_page_main}
        storageMain={storageMain}
        url={url}
        url2={url2}
        url3={url3}
        url4={url4}
      />
      <Showroom />
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
      {/* <SignOutButton user={user_page?.user} /> */}
    </div>
  );
}
