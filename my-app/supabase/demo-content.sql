-- Demo copy for the "Ifiok's Gallery" brand.
-- Run once in the Supabase SQL editor of the DEMO project (never the client's).
-- Only updates rows that already exist; nothing is inserted or deleted.

begin;

-- Photography
update "photography" set content = $$Moments worth keeping, captured with care.$$ where element = 'photography_hero_text1';
update "photography" set content = $$We photograph weddings, families, portraits and brands across Nigeria, with a calm, unhurried approach that lets real moments happen.$$ where element = 'photography_about_text1';
update "photography" set content = $$From the first call to the final gallery, you work with one small team that plans every detail, so on the day you can simply enjoy it.$$ where element = 'photography_about_text2';
update "photography" set content = $$Plan$$ where element = 'photography_workflow_h3_1';
update "photography" set content = $$We start with a conversation about you, your day and the story you want to tell, then plan locations, timings and shot lists together.$$ where element = 'photography_workflow_text_1';
update "photography" set content = $$Shoot$$ where element = 'photography_workflow_h3_2';
update "photography" set content = $$On the day we work quietly in the background, guiding where it helps and stepping back so the moments stay natural.$$ where element = 'photography_workflow_text_2';
update "photography" set content = $$Deliver$$ where element = 'photography_workflow_h3_3';
update "photography" set content = $$Within three weeks you receive a hand-edited online gallery, ready to download, share and print.$$ where element = 'photography_workflow_text_3';

-- Videography
update "videography" set content = $$Ifiok's Gallery Films$$ where element = 'videography_section1_h1';
update "videography" set content = $$Stories in motion$$ where element = 'videography_section1_h3';
update "videography" set content = $$Wedding films, brand videos and event coverage, shot and edited by a team that cares about every frame.$$ where element = 'videography_section1_paragraph';
update "videography" set content = $$What we do$$ where element = 'videography_section2_h1';
update "videography" set content = $$Every project starts with your story. Here is how we help you tell it.$$ where element = 'videography_section2_paragraph';
update "videography" set content = $$Wedding films$$ where element = 'videography_section2_2_h1';
update "videography" set content = $$Cinematic films of your day, from getting ready to the last dance, edited into a story you will want to rewatch.$$ where element = 'videography_section2_2_paragraph';
update "videography" set content = $$Brand videos$$ where element = 'videography_section2_3_h1';
update "videography" set content = $$Short, polished videos that show what your business does and why people should care.$$ where element = 'videography_section2_3_paragraph';
update "videography" set content = $$Event coverage$$ where element = 'videography_section2_4_h1';
update "videography" set content = $$Conferences, launches and concerts, captured live with same-week highlight reels.$$ where element = 'videography_section2_4_paragraph';
update "videography" set content = $$Music videos$$ where element = 'videography_section2_5_h1';
update "videography" set content = $$Concept, lighting and colour grading for artists who want visuals as strong as their sound.$$ where element = 'videography_section2_5_paragraph';
update "videography" set content = $$Colour grading$$ where element = 'videography_section2_6_h1';
update "videography" set content = $$Already have footage? We grade and finish it so every shot feels like part of the same film.$$ where element = 'videography_section2_6_paragraph';

-- Broadcast integration (multimedia)
update "multimedia" set content = $$Live production, done properly$$ where element = 'multimedia_hero_text1';
update "multimedia" set content = $$Multi-camera livestreams and broadcast setups for churches, conferences and concerts.$$ where element = 'multimedia_hero_text2';
update "multimedia" set content = $$Ifiok's Gallery started with one camera and a love for telling people's stories. Today we run full photo, film and live-broadcast productions, and we still treat every client like our first.$$ where element = 'multimedia_aboutArtist';
update "multimedia" set content = $$14 Feb 2027$$ where element = 'multimedia_eventsScheduleDate1';
update "multimedia" set content = $$Portraits of Lagos: exhibition opening night$$ where element = 'multimedia_eventsScheduleText1';
update "multimedia" set content = $$22 Mar 2027$$ where element = 'multimedia_eventsScheduleDate2';
update "multimedia" set content = $$Behind the lens: a free workshop on event photography$$ where element = 'multimedia_eventsScheduleText2';

-- Podcast
update "podcast-engineering" set content = $$Get new episodes in your inbox every week.$$ where element = 'subscribe_h1';

-- Digital marketing
update "digital-marketing" set content = $$Content that gets noticed$$ where element = 'digitalMarketing_hero_h1_1';
update "digital-marketing" set content = $$We plan, shoot and manage social content for brands that want to grow without losing their voice.$$ where element = 'digitalMarketing_hero_paragraph';
update "digital-marketing" set content = $$Strategy first, then the camera$$ where element = 'digitalMarketing_section2_h3';
update "digital-marketing" set content = $$Before we shoot anything, we learn your audience, your goals and what your competitors are doing.$$ where element = 'digitalMarketing_section2_text1';
update "digital-marketing" set content = $$Then we create a monthly content plan, produce it in-house and report on what worked.$$ where element = 'digitalMarketing_section2_text2';
update "digital-marketing" set content = $$How we help brands grow$$ where element = 'digitalMarketing_section4_h1';
update "digital-marketing" set content = $$Four services, one team, and clear reporting every month.$$ where element = 'digitalMarketing_section4_text1';
update "digital-marketing" set content = $$Brand strategy$$ where element = 'digitalMarketing_section4_title1';
update "digital-marketing" set content = $$Positioning and messaging that make your brand easy to remember.$$ where element = 'digitalMarketing_section4_text2';
update "digital-marketing" set content = $$Content production$$ where element = 'digitalMarketing_section4_title2';
update "digital-marketing" set content = $$Photos, short videos and graphics made for each platform.$$ where element = 'digitalMarketing_section4_text3';
update "digital-marketing" set content = $$Social media management$$ where element = 'digitalMarketing_section4_title3';
update "digital-marketing" set content = $$Scheduling, community replies and steady, consistent posting.$$ where element = 'digitalMarketing_section4_text4';
update "digital-marketing" set content = $$Paid campaigns$$ where element = 'digitalMarketing_section4_title4';
update "digital-marketing" set content = $$Targeted ads with clear budgets and monthly results you can read.$$ where element = 'digitalMarketing_section4_text5';

commit;
