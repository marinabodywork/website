/* Marina Bodywork. Shared client logic
   i18n, language toggle, nav scroll state, mobile drawer,
   FAQ accordion, diagnostic widget, PT plan selector.
*/

document.documentElement.classList.add('js-on');

(function () {
  'use strict';

  // ─────────────────────────────────────────────
  // i18n dictionary. Every translatable string.
  // ─────────────────────────────────────────────
  const i18n = {
    en: {
      // Nav
      'nav.method': 'Method',
      'nav.massage': 'Massage',
      'nav.training': 'Training',
      'nav.about': 'About',
      'nav.bookMassage': 'Book Massage',
      'nav.bookTraining': 'Book Training',
      'nav.menu': 'Open menu',

      // Footer
      'footer.tag': 'Release your body. Live an extraordinary life.',
      'footer.col.links': 'Explore',
      'footer.col.contact': 'Contact',
      'footer.col.book': 'Book',
      'footer.faq': 'FAQ',
      'footer.bookMassage': 'Book Massage',
      'footer.bookPt': 'Book Training',
      'footer.address': 'Randwick, NSW',
      'footer.copy': '© 2026 Marina Bodywork. Sydney, Australia.',

      // Sticky CTA
      'sticky.massage': 'Book Massage',
      'sticky.pt': 'Book Training',
      'wa.float': 'Message Marina on WhatsApp',

      // ─── Home: hero ───
      'home.hero.label': '<strong>Marina Ribeiro</strong> · Fascia release specialist · Sydney',
      'home.hero.h1.a': 'Release the restriction.',
      'home.hero.h1.b': 'Build physical strength and mental balance.',
      'home.hero.h1.c': 'One specialist.',
      'home.hero.h1.d': 'One system.',
      'home.hero.sub': 'Fascia release, Sensory Energetics, and conscious-movement personal training.',
      'home.hero.cta.massage': 'Book Massage',
      'home.hero.cta.training': 'Book Training',
      'home.hero.cta.talk': 'Not sure where to start? Talk to Marina first →',

      // ─── Home: combination ───
      'home.combo.label': 'The system',
      'home.combo.h2': 'Most therapists treat the symptom.<br>Most trainers work around the restriction.<br>Marina removes it and builds on cleared ground.',
      'home.combo.intro': 'There is a reason the tension keeps coming back after a good massage. And a reason your training hits a ceiling no matter how consistent you are. They are the same reason. And it is not your fault.',
      'home.combo.c1.label': 'Massage alone',
      'home.combo.c1.h': 'The tension releases. Then returns.',
      'home.combo.c1.p': 'Standard massage works on the muscle. The fascia underneath it, the connective tissue holding the pattern in place, is rarely reached. Your body feels better for days. Then it tightens back to exactly where it was. Because nothing in the way you move has changed.',
      'home.combo.c2.label': 'Training alone',
      'home.combo.c2.h': 'You build strength on top of restriction.',
      'home.combo.c2.p': 'When the fascia is tight, your movement patterns compensate. You train those compensations. The tension gets stronger because the body adapts around it, not through it. The plateau is not a fitness problem. It is a tissue problem.',
      'home.combo.c3.label': 'The Marina system',
      'home.combo.c3.h': 'Release clears the ground. Training builds what stays.',
      'home.combo.c3.p': 'Marina works on the fascia first. The restriction releases. Then training builds strength in the range your body can actually use. Session by session the two compound each other. The tension does not come back because there is no pattern left to return to. The strength holds because it was built on a body that could actually move.',
      'home.combo.close': 'You do not need a massage therapist and a personal trainer. You need one specialist who understands they are the same work.',
      'home.combo.cta': 'See how the sessions work →',

      // ─── Home: services overview ───
      'home.svc.label': 'Services',
      'home.svc.h2': 'Two services. Two ways to start.',
      'home.svc.sub': 'Massage or personal training. Then choose between a single session or an ongoing membership.',
      'home.svc.massage.h': 'Massage',
      'home.svc.massage.p': 'Somatic Massage Corporal, Facial, or the 90-minute Sensory Energetics signature work. Marina-developed fascial release combined with breathwork and somatic awareness.',
      'home.svc.massage.single.name': 'Single session',
      'home.svc.massage.single.meta': '60-90 min · From A$125 · No commitment',
      'home.svc.massage.mship.name': 'Weekly membership',
      'home.svc.massage.mship.badge': 'Signature',
      'home.svc.massage.mship.meta': 'From A$100/week · Fixed weekly slot · 2-month minimum',
      'home.svc.pt.h': 'Personal Training',
      'home.svc.pt.p': 'Conscious-movement 1-on-1 training at Snap Fitness Maroubra. Marina integrates myofascial release, mobility work, and breathwork into every 60-minute session.',
      'home.svc.pt.single.name': 'Single session',
      'home.svc.pt.single.meta': '60 min · A$99 · Test the work first',
      'home.svc.pt.plan.name': 'Monthly plan',
      'home.svc.pt.plan.meta': 'From A$380/4 weeks · 1-3x per week · 2-month minimum',

      // ─── Diagnostic ───
      'diag.label': 'Diagnostic',
      'diag.h2': 'Where is your body asking for help?',
      'diag.sub': 'Pick what fits. Marina will tell you what the work would look like.',
      'diag.tile.neck': 'Neck, shoulders, upper back',
      'diag.tile.jaw': 'Jaw, TMJ, tension headaches',
      'diag.tile.back': 'Lower back and hips',
      'diag.tile.stress': 'Stress, sleep, cannot switch off',
      'diag.tile.training': 'Training plateau, mobility stuck',

      'diag.neck.name': 'Somatic Massage Corporal',
      'diag.neck.why': 'Chronic upper-body tension is almost always fascial, not muscular. Standard remedial massage works the surface. Marina reaches the connective tissue underneath it, where the pattern is held. Most clients feel the difference in the first session.',
      'diag.neck.tags': 'Myofascial Release · Somatic Release · Custom blend',
      'diag.neck.cta': 'Book Massage',
      'diag.jaw.name': 'Somatic Massage Facial',
      'diag.jaw.why': 'TMJ tension and jaw clenching are held in the fascia of the face, neck, and throat. Marina is one of the few Sydney practitioners trained in buccal (inside-mouth) massage and TMJ Mastery. Clients typically report deeper sleep and reduced jaw tension within 24 hours.',
      'diag.jaw.tags': 'TMJ Mastery · Buccal Massage · Myofascial Release',
      'diag.jaw.cta': 'Book Massage',
      'diag.back.name': 'Somatic Massage Corporal',
      'diag.back.why': 'Lower-back and hip tension is usually a fascial chain problem, not an isolated muscle problem. The restriction is often in the hip flexors, the thoracolumbar fascia, or the connection between them. Marina maps the chain and releases it at the source.',
      'diag.back.tags': 'Myofascial Release · Myo Aponeurosis · Somatic Release',
      'diag.back.cta': 'Book Massage',
      'diag.stress.name': 'Sensory Energetics (90 min)',
      'diag.stress.why': 'When the body cannot switch off, the nervous system is the problem, not just the muscle. Sensory Energetics combines trigger-point work, guided breath, and somatic release to reach tension stored by the nervous system for months or years. Clients leave looser and most sleep deeper that night.',
      'diag.stress.tags': 'Nervous System Release · Breathwork · Trigger-Point',
      'diag.stress.cta': 'Book Massage',
      'diag.training.name': 'Conscious Movement Personal Training',
      'diag.training.why': 'A training plateau that does not respond to programming changes is usually a tissue problem. Fascial restriction limits the range you can train in, which caps strength gains. Marina brings her bodywork qualifications into every PT session, addressing the restriction and training the cleared range in the same hour.',
      'diag.training.tags': 'Fascial Chain Training · Mobility · Breathwork in Session',
      'diag.training.cta': 'See training plans →',

      // ─── Social proof ───
      'home.proof.label': 'What clients say',
      'home.proof.h2': 'In her clients’ own words.',
      'home.proof.t1.h': 'She really cares.',
      'home.proof.t1.q': 'Excellent PT. She has been integral to my journey in building confidence and strength in the gym. I love training with her and she really cares. I highly recommend Marina!',
      'home.proof.t1.name': 'Jean',
      'home.proof.t2.h': 'It feels like a whole experience.',
      'home.proof.t2.q': 'Marina is honestly so thoughtful and talented at what she does. You can really tell she puts her whole heart into her work. And being at her space is always such a nice experience: the essential oils, the atmosphere, every little detail. It never feels like you’re just paying for a service, it feels like a whole experience. Highly recommend!',
      'home.proof.t2.name': 'Yumi',
      'home.proof.t3.h': 'She knows what works.',
      'home.proof.t3.q': 'Really satisfied with Marina works! She knows what works the best for our body.',
      'home.proof.t3.name': 'Alya',
      'home.proof.viaGoogle': 'via Google',
      'home.proof.reviews': 'reviews · Sydney →',

      // ─── Not for everyone ───
      'home.dq.label': 'Honest',
      'home.dq.h2': 'This work is not for everyone.',
      'home.dq.d1.h': 'Looking for a relaxation massage.',
      'home.dq.d1.p': 'Marina works on tissue that holds pattern. You will feel things shift. If you wanted a spa hour, book somewhere else and enjoy it.',
      'home.dq.d2.h': 'Need a private health rebate.',
      'home.dq.d2.p': 'Marina is a bodywork specialist and personal trainer, not a registered remedial therapist. No insurance claim. Book a registered therapist if that matters.',
      'home.dq.d3.h': 'Want a fixed protocol every visit.',
      'home.dq.d3.p': 'Each session is built around what Marina finds in your body that day. Different week, different work. That is the point.',
      'home.dq.d4.h': 'Want a trainer who treats fitness as a goal in isolation.',
      'home.dq.d4.p': 'Marina trains the whole body, not aesthetics in isolation. If your only metric is the mirror, this is not it.',

      // ─── Consult ───
      'home.consult.h2': 'Not sure which session is right for you?',
      'home.consult.p': 'A A$125 session is not a decision you should make from a homepage. Message Marina on WhatsApp. She will ask what you have been dealing with, what you have already tried, and tell you honestly whether she is the right person.',
      'home.consult.cta': 'Message Marina on WhatsApp →',

      // ─── FAQ ───
      'home.faq.label': 'FAQ',
      'faq.search.placeholder': 'Search the questions',
      'faq.search.empty': 'No questions match. Try a different term.',
      'a11y.skip': 'Skip to main content',
      'about.bio.pullquote': 'Physical exercise goes beyond aesthetics. It is the building of a strong, functional, conscious body, one that sustains autonomy, longevity, and quality of life at every stage.',
      'nf.label': 'Page not found',
      'nf.h1': 'This page took a different route.',
      'nf.sub': 'It might have moved, or never existed. Either way, the work is still here.',
      'nf.cta.home': 'Back to home',
      'nf.cta.book': 'Book Massage',
      'nf.next': 'Where to next?',
      'home.faq.h2': 'The questions Marina hears every week.',
      'home.faq.q1': 'Why does Marina combine bodywork with personal training?',
      'home.faq.a1': 'Because they work on the same system. Fascial restriction limits movement. Limited movement caps training results. Marina\'s qualifications mean she addresses both in one session, without a separate appointment for each.',
      'home.faq.q2': 'Do I need a specific injury or diagnosis to book?',
      'home.faq.a2': 'No. Some clients come with chronic pain. Others come because they want more energy, better posture, or stronger training results. Marina works with all of it.',
      'home.faq.q3': 'What happens in the first session?',
      'home.faq.a3': 'Marina assesses how your body is moving and holding tension. She asks what brought you in and what you have tried before. The session is built around what she finds, not a fixed protocol applied to every client.',
      'home.faq.q4': 'How soon will I feel a difference?',
      'home.faq.a4': 'Most clients notice looser movement and deeper sleep within 24 hours of the first session. Chronic tension that has been building for years shifts meaningfully across 3 to 5 sessions. After session one Marina will tell you honestly how many she expects your body to need.',
      'home.faq.q5': 'Is A$125 more than a standard remedial massage?',
      'home.faq.a5': 'Yes, because this is not a standard remedial massage. Each session draws from five specialist techniques most therapists never combine. Clients who used to book physio, remedial massage, and a movement assessment separately get the same work in one hour. If you need a single relaxation massage, Marina is not the right choice. If you need tension that actually shifts, she is.',
      'home.faq.q6': 'Are sessions claimable through private health insurance?',
      'home.faq.a6': 'No. Marina is a bodywork specialist and personal trainer, not a registered remedial therapist or physiotherapist. If insurance rebate is your priority, book with a registered remedial therapist instead. Honesty matters more than the booking.',
      'home.faq.q7': 'What if it does not work for me?',
      'home.faq.a7': 'If your first session is not what you expected, message Marina on WhatsApp within 24 hours. She will make it right: rework the next session, refer you to a more appropriate specialist, or refund. No forms. No back-and-forth.',
      'home.faq.q8': 'Can I do both massage and personal training with Marina?',
      'home.faq.a8': 'Yes, and the results are usually faster. The bodywork removes restrictions that the training then builds on. Many clients start with massage and add training once they feel what changes when the fascia is clear.',

      // ─── Method page ───
      'method.hero.label': 'The method',
      'method.hero.h1': 'It is all fascia.',
      'method.hero.sub': 'Fascia is the thin tissue that surrounds muscles, organs, and nerves, connecting the entire body as one continuous internal network. Picture a flexible film in many layers covering everything inside. When one region tenses, other parts are affected too. What sets Marina’s approach apart is releasing fascial tension, improving mobility, circulation, neural function, and the communication between body and nervous system.',
      'method.hero.img.alt': 'Anatomical illustration of the body’s fascial network, showing the continuous web of connective tissue across the back, shoulders, arms, and legs.',

      'method.why.label': 'Why fascia matters',
      'method.why.h2': 'Four symptoms.<br>One source.',
      'method.why.p1.label': 'Neck + Upper Back',
      'method.why.p1.h': 'Pain that returns within days.',
      'method.why.p1.p1': '<strong>What it looks like.</strong> Tightness across the trapezius, restricted neck rotation, headaches that build through the day.',
      'method.why.p1.p2': '<strong>Why it returns.</strong> The fascia of the upper back is one continuous sheet. Working only the muscle leaves the underlying sheet contracted. The muscle re-tightens to match.',
      'method.why.p1.p3': '<strong>What Marina does.</strong> Releases the thoracolumbar and cervical fascia together. The system relaxes as one piece.',
      'method.why.p2.label': 'Jaw + TMJ',
      'method.why.p2.h': 'Tension that follows you to sleep.',
      'method.why.p2.p1': '<strong>What it looks like.</strong> Jaw clenching, tension headaches, disturbed sleep, sore on waking.',
      'method.why.p2.p2': '<strong>Why it returns.</strong> The jaw is held by fascia inside the mouth and along the throat. External massage cannot reach it.',
      'method.why.p2.p3': '<strong>What Marina does.</strong> Trained in TMJ Mastery and buccal (intraoral) work. She reaches the fascia from the inside, where the pattern is actually stored.',
      'method.why.p3.label': 'Movement Restriction',
      'method.why.p3.h': 'A range that quietly shrinks.',
      'method.why.p3.p1': '<strong>What it looks like.</strong> Reaching overhead is harder. Squats feel shallow. The body is stiff in the morning and improves only after warm-up.',
      'method.why.p3.p2': '<strong>Why it returns.</strong> Fascial adhesions limit how much length the muscle can produce. Stretching alone does not break adhesions.',
      'method.why.p3.p3': '<strong>What Marina does.</strong> Myofascial release in the bodywork session. Then trains the cleared range in PT so the body keeps it.',
      'method.why.p4.label': 'Training Plateau',
      'method.why.p4.h': 'Numbers that will not move.',
      'method.why.p4.p1': '<strong>What it looks like.</strong> Squat, deadlift, or press stuck at the same load for months. Programming changes have stopped helping.',
      'method.why.p4.p2': '<strong>Why it returns.</strong> The body adapts around a restriction by compensating. You train the compensation, not the missing range.',
      'method.why.p4.p3': '<strong>What Marina does.</strong> Identifies the fascial chain holding the compensation. Releases it. Trains the new range under load.',

      'method.mod.label': 'The modalities',
      'method.mod.h2': 'Four tools. One body.<br>Chosen for what your tissue needs that day.',
      'method.mod.m1.h': 'Somatic Massage',
      'method.mod.m1.meta': '60 min · A$125',
      'method.mod.m1.p': 'Marina-developed methodology combining myofascial release, Brazilian lymphatic drainage, breathwork, and deep-relaxation work. Solves: chronic muscular tension, fluid retention, fascial rigidity, accumulated physical stress.',
      'method.mod.m2.h': 'KSE Sensory Energetics',
      'method.mod.m2.meta': '90 min · A$305 · Signature',
      'method.mod.m2.p': 'Integrative method that activates the central nervous system through ancient techniques, breath, and somatic stimuli. Solves: nervous-system dysregulation, tension stored by the body for months or years, anxiety patterns held in tissue.',
      'method.mod.m3.h': 'Conscious Movement',
      'method.mod.m3.meta': 'In every session',
      'method.mod.m3.p': 'Breathwork, somatic awareness, and mobility work woven through every bodywork and training session. Solves: the gap between feeling looser on the table and moving differently afterward.',
      'method.mod.m4.h': 'Personal Training',
      'method.mod.m4.meta': '60 min · Monthly plans · From A$75/session',
      'method.mod.m4.p': 'Specialist 1-on-1 training at Snap Fitness Maroubra, built around what your bodywork sessions reveal. Solves: training plateaus, mobility limits, perimenopause and menopause strength needs, body awareness.',

      'method.combo.label': 'The combination',
      'method.combo.h2': 'Two halves of one practice.',
      'method.combo.p1': 'Most therapists pick one. Massage therapists release tension and send you home. Trainers build strength and assume the tissue will sort itself out.',
      'method.combo.p2': 'Marina trained in both because they are the same work. Bodywork removes the restriction. Training builds strength in the range the release just opened. Without the bodywork, training calcifies compensation. Without the training, bodywork releases a body that then re-tightens around its old habits.',
      'method.combo.p3': 'Most clients start with massage. After two or three sessions, when they feel what the body can actually do, they add training. The two compound. The work holds.',
      'method.combo.cta.massage': 'See massage services',
      'method.combo.cta.training': 'See training plans',

      'method.res.label': 'The research',
      'method.res.h2': 'Why the body holds what it holds.',
      'method.res.s1.num': '8 / 10',
      'method.res.s1.l': 'Australian adults will experience chronic neck or back tension this year.',
      'method.res.s1.src': 'Australian Institute of Health and Welfare',
      'method.res.s2.num': '15%',
      'method.res.s2.l': 'of adults experience TMJ disorders. Most never receive direct treatment.',
      'method.res.s2.src': 'National Institute of Dental and Craniofacial Research',
      'method.res.s3.num': '85%',
      'method.res.s3.l': 'of chronic musculoskeletal pain involves myofascial trigger points.',
      'method.res.s3.src': 'Journal of Bodywork and Movement Therapies',
      'method.res.s4.num': '1 / 3',
      'method.res.s4.l': 'of Australians report stress symptoms held physically in the body.',
      'method.res.s4.src': 'Australian Psychological Society',

      'method.cta.h2': 'Ready to feel the difference?',
      'method.cta.p': 'Start with one session. After the first hour you will know whether this is the right work.',
      'method.cta.book': 'Book Massage',
      'method.cta.talk': 'Talk to Marina first →',

      // ─── Massage page ───
      'mas.hero.label': 'Massage services',
      'mas.hero.h1': 'This is not a standard massage.',
      'mas.hero.sub': 'Five specialist techniques. Marina chooses the combination your body responds to that day. There is no fixed protocol because no two bodies arrive in the same state. The hour is built around what she finds.',

      'mas.svc.label': 'The services',
      'mas.svc.h2': 'Three sessions.<br>Five techniques.',

      // Service: Corporal
      'mas.c.name': 'Somatic Massage Corporal',
      'mas.c.meta': '60 minutes · A$125',
      'mas.c.p1': 'Marina-developed methodology integrating Brazilian lymphatic drainage, myofascial release, breathwork, and deep-relaxation work into one continuous hour.',
      'mas.c.p2': 'It addresses muscular tension, fluid retention, accumulated physical stress, and fascial rigidity. As the fascia releases, circulation, mobility, and body awareness improve and a sense of lightness returns.',
      'mas.c.p3': 'The breathwork and deep-relaxation layer regulates the central nervous system and lowers cortisol. This is integrative bodywork. It reconnects body and mind.',

      'mas.c.cta': 'Book Massage',
      'mas.c.mship.cta': 'Make it weekly →',

      // Service: Facial
      'mas.f.name': 'Somatic Massage Facial',
      'mas.f.meta': '60 minutes · A$125',
      'mas.f.p1': 'For TMJ, jaw tension, tension headaches, and disturbed sleep. The fascia of the face, jaw, and throat is rarely reachable from the outside. Marina is one of the few Sydney practitioners trained in buccal (inside-mouth) work and TMJ Mastery.',
      'mas.f.p2': 'The session combines intraoral fascial release with external face, neck, and throat work. Clients typically report deeper sleep and reduced jaw tension within 24 hours of the first session.',

      'mas.f.cta': 'Book Massage',
      'mas.f.mship.cta': 'Make it weekly →',

      // Service: Sensory Energetics
      'mas.s.name': 'Sensory Energetics',
      'mas.s.meta': '90 minutes · A$305 · Signature',
      'mas.s.badge': 'Signature',
      'mas.s.p1': 'A 90-minute integrative session focused on the deep release of physical and emotional patterns stored in the nervous system. Inspired by ancient Eastern techniques, breathwork, body stimuli, and somatic awareness. The work activates the central nervous system directly.',
      'mas.s.p2': 'During the session, involuntary tremors in the body can occur and are natural responses of the nervous system. These stimuli help release accumulated tension, regulate stress, and lower cortisol levels. The technique also supports the activation of neurotransmitters tied to well-being, focus, motivation, relaxation, and pleasure, including dopamine.',
      'mas.s.p3': 'More than a body experience. The work crosses the connection between body, emotion, and mind. Clients leave with lightness, mental clarity, emotional balance, and a body that finally remembers what it feels like to switch off.',

      'mas.s.cta': 'Book Massage',
      'mas.s.mship.cta': 'Make it weekly →',


      'mas.choose.label': 'How to choose',
      'mas.choose.h2': 'Three questions.<br>One session.',
      'mas.choose.c1.if': 'If standard remedial has not held',
      'mas.choose.c1.h': 'Somatic Corporal',
      'mas.choose.c1.p': 'Marina works the fascia under the muscle. The pattern releases at the source, not the surface.',
      'mas.choose.c2.if': 'If jaw, TMJ, or headaches',
      'mas.choose.c2.h': 'Somatic Facial',
      'mas.choose.c2.p': 'Intraoral and TMJ-trained work. Reaches the fascia external massage cannot.',
      'mas.choose.c3.if': 'If the tension keeps coming back no matter what',
      'mas.choose.c3.h': 'Sensory Energetics',
      'mas.choose.c3.p': 'Built for tension held by the nervous system for months or years. The 90-minute signature work.',

      'mas.price.label': 'Pricing',
      'mas.price.h2': 'Single sessions and memberships.',
      'mas.price.r1.name': 'Single session',
      'mas.price.r1.sub': 'Corporal or Facial · 60 min',
      'mas.price.r1.price': 'A$125',
      'mas.price.r2.name': 'Sensory Energetics',
      'mas.price.r2.sub': 'Signature · 90 min',
      'mas.price.r2.price': 'A$305',
      'mas.price.book': 'Book single session',
      'mas.price.mship.h': 'Weekly memberships',
      'mas.price.mship.note': 'Same day and time every week, locked at checkout and held for you until you cancel. Minimum 2 months · auto-renews · cancel with 1 week notice.',
      'mas.price.mship.corporal': 'Weekly Corporal',
      'mas.price.mship.facial': 'Weekly Facial',
      'mas.price.mship.sensory': 'Weekly Sensory Energetics',

      'mas.faq.h2': 'Massage-specific questions.',
      'mas.faq.q1': 'What do I wear?',
      'mas.faq.a1': 'For Corporal: underwear. Marina uses sheets and works through them where appropriate. For Facial: come as you are, the work is on face, neck, jaw, and inside the mouth. For Sensory Energetics: loose comfortable clothing you can move and breathe in.',
      'mas.faq.q2': 'Can I claim through health insurance?',
      'mas.faq.a2': 'No. Marina is a bodywork specialist, not a registered remedial therapist. There is no insurance rebate. If that matters more than the work, book a registered therapist.',
      'mas.faq.q3': 'How many sessions will I need?',
      'mas.faq.a3': 'Most clients feel a significant difference after the first session and meaningful change in chronic patterns across 3 to 5 sessions. After session one Marina will tell you honestly what she thinks your body needs.',

      // ─── Training page ───
      'tr.hero.label': 'Personal training',
      'tr.hero.h1': 'Training that understands your body.',
      'tr.hero.sub': 'Specialist 1-on-1 personal training at Snap Fitness Maroubra. Each 60-minute session is built around what Marina sees in your movement, and what her bodywork qualifications let her address in the same hour.',
      'tr.hero.loc': 'Snap Fitness Maroubra · Tue + Thu 8am-6pm · Mon/Wed/Fri 8am-11am · Active Snap Fitness membership required',
      'tr.hero.cta.plans': 'See training plans →',
      'tr.hero.cta.talk': 'Talk to Marina first →',

      'tr.diff.label': 'What makes this different',
      'tr.diff.h2': 'Most trainers cannot see what is holding you back.<br>Marina can.',
      'tr.diff.p1': 'A standard trainer programs around a body they cannot fully assess. They see the lift. They cannot see the fascial chain that is shortening your range, capping your strength, or shifting load into the joint you are protecting without knowing it.',
      'tr.diff.p2': 'With more than ten years studying and working in body therapy before she ever practiced as a personal trainer, she developed a way of seeing that goes beyond traditional training. She reads patterns of tension, compensation, and restriction that often pass unnoticed in a standard approach, and she works those patterns directly during the session.<br><br>Hands-on release before the lift, mobility before the load, and breathwork before the next set. This process stimulates the central nervous system, making more energy available to the body, sharpening focus on each movement, and deepening body awareness.',
      'tr.diff.p3': 'The result is training that genuinely builds the body from the inside out. It is not just about lifting weight. It is about developing strength with presence, control, mobility, and bodily intelligence in every movement.',

      'tr.struct.label': 'The 60-minute session',
      'tr.struct.h2': 'Five phases.<br>Built around your body that day.',
      'tr.struct.s1': 'Stretching, muscle activation, myofascial release',
      'tr.struct.s2': 'Mobility fundamentals and body awareness',
      'tr.struct.s3': 'Specific training shaped to your goals',
      'tr.struct.s4': 'Strengthening, stability, conditioning',
      'tr.struct.s5': 'Muscle relaxation and breathwork',

      'tr.spec.label': 'Specialty areas',
      'tr.spec.h2': 'Where Marina works deepest.',
      'tr.spec.s1': 'Hypertrophy',
      'tr.spec.s2': 'Physical conditioning',
      'tr.spec.s3': 'Mobility and posture',
      'tr.spec.s4': 'Strength and stability',
      'tr.spec.s5': 'Perimenopause and menopause',
      'tr.spec.s6': 'Mind-body well-being',

      'tr.plans.label': 'Plans and memberships',
      'tr.plans.h2': 'Choose your rhythm.<br>Lock in your slot.',
      'tr.plans.sub': 'Monthly memberships, billed every 4 weeks. Pick 1, 2, or 3 sessions a week. Your weekday and time are locked for the length of your membership. Minimum 2 months on Basic and Golden, 3 months on Diamond. The work needs that long to land.',

      'tr.plan.basic.name': 'Basic',
      'tr.plan.basic.price': 'A$380',
      'tr.plan.basic.per': 'per month · A$95/session · 4 sessions',
      'tr.plan.basic.f1': '1x per week, same weekday + time',
      'tr.plan.basic.f2': '<strong>2-month minimum</strong>, then cancel anytime',
      'tr.plan.basic.f3': 'Live sessions only (no app, no physical assessment)',

      'tr.plan.golden.name': 'Golden',
      'tr.plan.golden.price': 'A$680',
      'tr.plan.golden.per': 'per month · A$85/session · 8 sessions',
      'tr.plan.golden.badge': 'Most popular',
      'tr.plan.golden.f1': '2x per week, same weekdays + times',
      'tr.plan.golden.f2': '<strong>2-month minimum</strong>, then cancel anytime',
      'tr.plan.golden.f3': 'MFIT app programming included (no physical assessment)',

      'tr.plan.diamond.name': 'Diamond',
      'tr.plan.diamond.price': 'A$900',
      'tr.plan.diamond.per': 'per month · A$75/session · 12 sessions',
      'tr.plan.diamond.badge': 'Best value',
      'tr.plan.diamond.f1': '3x per week, same weekdays + times',
      'tr.plan.diamond.f2': '<strong>3-month minimum</strong>, then cancel anytime',
      'tr.plan.diamond.f3': '<strong>Physical assessment</strong> + MFIT app programming included',

      'tr.plan.book': 'Start membership',
      'tr.plan.note': 'How it works: book your first session in Acuity and choose <strong>Select and make recurring</strong> so your weekday and time lock in for the membership. Golden clients repeat the action once per training day (2x). Diamond clients repeat it for each of their 3 weekdays. Your card is charged every 4 weeks. Cancel through the portal anytime after your minimum (2 months on Basic and Golden, 3 months on Diamond). Cancel inside the minimum and your remaining membership transfers to a friend of your choice. No refunds.',

      'tr.single.name': 'Single session: test the work first',
      'tr.single.sub': 'One 60-minute session, no membership, no commitment. The way to feel how Marina trains before locking into a monthly plan.',
      'tr.single.price': 'A$99',
      'tr.single.cta': 'Book single session',

      'tr.assess.name': 'Physical assessment',
      'tr.assess.sub': 'Movement, posture, and strength assessment with Marina. Included with the Diamond plan. Optional one-off for everyone else.',
      'tr.assess.price': 'A$99',
      'tr.assess.cta': 'Book assessment',

      'tr.consult.name': 'Online consultancy',
      'tr.consult.sub': 'For clients training remotely, away from Snap Fitness Maroubra. Video call with Marina every 6 weeks to review your body, swap exercises that have done their work, and adjust your program. Auto-renews.',
      'tr.consult.price': 'A$100',
      'tr.consult.cta': 'Start consultancy',

      'tr.pol.label': 'Membership policy',
      'tr.pol.h2': 'Billing, slot, minimum, and transfer.',
      'tr.pol.intro': 'Everything below runs through your Acuity client portal. You manage your slot, reschedule, freeze, transfer, or cancel renewal yourself. No message to Marina required.',
      'tr.pol.slot.h': 'Your weekly slot',
      'tr.pol.slot.p': 'You set your weekly slot yourself in Acuity. When you book your first session, choose <strong>Select and make recurring</strong> so the same weekday and time repeat for the length of your membership. Basic = 1 weekly series. Golden = 2 weekly series (one for each training day). Diamond = 3 weekly series. To change a slot later, reschedule individual sessions through your Acuity portal (72-hour rule below).',
      'tr.pol.resched.h': 'Rescheduling',
      'tr.pol.resched.p1': 'Reschedule any session yourself through your Acuity portal with at least <strong>72 hours notice</strong>. Pick a new time from Marina\'s open availability.',
      'tr.pol.resched.l1': 'Reschedule with less than 72 hours notice. The session counts as used.',
      'tr.pol.resched.l2': 'No-show without notice. The session counts as used.',
      'tr.pol.resched.l3': 'If Marina\'s calendar has no room left in your current month, the session rolls into the next one automatically.',
      'tr.pol.resched.l4': 'If Marina has to cancel (illness, public holiday, travel), the session is rescheduled into a future week. You never lose a session because of her.',
      'tr.pol.bill.h': 'Monthly billing',
      'tr.pol.bill.p1': 'Your card is charged <strong>every 4 weeks</strong>, automatically, from the day your membership starts. Same amount each cycle. No big upfront package, no surprise renewals.',
      'tr.pol.bill.p2': 'After your minimum, cancel anytime through the Acuity portal at least <strong>7 days before your next billing date</strong>. No message to Marina required. Unused sessions inside a paid month do not roll over.',
      'tr.pol.commit.h': 'Minimum commitment and transfer',
      'tr.pol.commit.p1': 'Each membership has a minimum so the work has time to land: <strong>2 months on Basic and Golden, 3 months on Diamond</strong>.',
      'tr.pol.commit.p2': 'Bodies do not change in two sessions. Two months is when strength patterns, mobility, and posture actually start holding. Marina commits to that floor and asks you to commit to it with her, so you both can do the full work and see the result together.',
      'tr.pol.commit.p3': 'If life changes inside the minimum (pregnancy, injury, a move, anything), your remaining membership transfers to a friend of your choice. No refunds, because the lock-in is the work. But the value never disappears.',
      'tr.pol.freeze.h': 'Emergency freeze',
      'tr.pol.freeze.p1': 'Life happens. You can freeze your membership once per minimum period, through the portal, with no proof needed: <strong>1 week on Basic, 2 weeks on Golden, 3 weeks on Diamond</strong>. The membership pauses and resumes from where you stopped.',
      'tr.pol.single.h': 'Single sessions',
      'tr.pol.single.p': 'No membership, no fixed slot. Same 72-hour rule for rescheduling. No freeze, no transfer. Single sessions are how you test the work before committing.',

      'tr.outcomes.label': 'What clients achieve',
      'tr.outcomes.h2': 'Specific, not abstract.',
      'tr.outcomes.o1.l': 'Mobility',
      'tr.outcomes.o1.p': 'Range they had written off comes back.',
      'tr.outcomes.o2.l': 'Plateau',
      'tr.outcomes.o2.p': 'Training numbers move again.',
      'tr.outcomes.o3.l': 'Perimenopause',
      'tr.outcomes.o3.p': 'Strength and energy through the transition.',

      'tr.snap.h': 'About Snap Fitness Maroubra.',
      'tr.snap.p': 'All in-person sessions are at Snap Fitness Maroubra. An active Snap Fitness membership is required before your first session. Marina is an independent trainer. The gym carries no responsibility for PT services.',

      // ─── About page ───
      'about.hero.title': 'Physical Education Professional · Bodywork Specialist',
      'about.hero.meta': '18+ years of practice · Sydney',
      'about.bio.label': 'The story',
      'about.bio.h2': 'Eighteen years, two continents, one practice.',
      'about.bio.p1': 'Marina Ribeiro da Silva is a Physical Education professional with more than eighteen years dedicated to movement, health, and women\'s well-being. Movement and bodywork are not two careers. They are two sides of how a body changes.',
      'about.bio.p2': 'She started through dance, teaching from age fifteen. She studied Physical Education to professionalise what she had been doing intuitively since childhood. In Brazil she worked with the Minas Gerais government on Movimenta Contagem, the largest free outdoor physical-activity programme in the country.',
      'about.bio.p3': 'After the pandemic she founded Mulheres Ativas, a programme for women: particularly women over forty, mothers, and those who had never felt at home in a traditional gym.',
      'about.bio.p4': 'In Sydney she specialises in women\'s training across every stage of life, including perimenopause: conditioning, hypertrophy, mobility, posture, body awareness, quality of life. Across ten plus years of bodywork she developed her own fascial-release technique combining breath, somatic awareness, and myofascial release. It is the foundation of every session she runs.',

      'about.creds.label': 'Credentials',
      'about.creds.h2': 'Training that took eighteen years to assemble.',
      'about.cred.1': 'EQF Level 4 Personal Trainer',
      'about.cred.2': 'Vanoni Institute · Myo Aponeurosis (40 hours · Italy)',
      'about.cred.3': 'Sensory Energetics Certified',
      'about.cred.4': 'TMJ Mastery',
      'about.cred.5': 'Buccal Massage Specialist',
      'about.cred.6': '18+ years working with women\'s bodies',
      'about.cred.7': 'Bilingual EN + PT',
      'about.cred.8': 'Founder, Mulheres Ativas',

      'about.letter.label': 'A note from Marina',
      'about.letter.quote': '"I believe everyone deserves to feel at home in their own body. That is my work: through my hands, my breath, and conscious movement. Whatever brought you here, you do not need to arrive ready. You only need to arrive."',
      'about.letter.sign': 'Marina',
      'about.perks.label': 'Partner perks',
      'about.perks.h': 'Deals from Marina\'s partners.',
      'about.partner.label': 'Be Bold Sydney',
      'about.partner.p': 'Marina\'s clients get <strong>2 months of free exclusive access to the Be Bold app</strong>, plus <strong>10% off any Be Bold work</strong>.',
      'about.partner.link': 'bebold.au →',

      'about.insta.h': 'Follow Marina\'s work.',
      'about.insta.p': 'Sessions, behind-the-scenes, and the methodology in motion.',
      'about.insta.cta': '@marinaribeiropersonal →',

      'about.cta.h': 'Ready to work with Marina?',
      'about.cta.p': 'Book a massage, book a PT lesson, or message Marina first if you want her to recommend where to start.',
      'about.cta.book': 'Book Massage',
      'about.cta.bookPt': 'Book Training',
      'about.cta.talk': 'Talk to Marina →'
    },

    pt: {
      // Nav
      'nav.method': 'Método',
      'nav.massage': 'Massagem',
      'nav.training': 'Treino',
      'nav.about': 'Sobre',
      'nav.bookMassage': 'Agendar Massagem',
      'nav.bookTraining': 'Agendar Treino',
      'nav.menu': 'Abrir menu',

      // Footer
      'footer.tag': 'Libere seu corpo. Viva uma vida extraordinária.',
      'footer.col.links': 'Navegar',
      'footer.col.contact': 'Contato',
      'footer.col.book': 'Agendar',
      'footer.faq': 'Perguntas frequentes',
      'footer.bookMassage': 'Agendar Massagem',
      'footer.bookPt': 'Agendar Treino',
      'footer.address': 'Randwick, NSW',
      'footer.copy': '© 2026 Marina Bodywork. Sydney, Austrália.',

      // Sticky CTA
      'sticky.massage': 'Agendar Massagem',
      'sticky.pt': 'Agendar Treino',
      'wa.float': 'Falar com a Marina no WhatsApp',

      // Home: hero
      'home.hero.label': '<strong>Marina Ribeiro</strong> · Especialista em liberação fascial · Sydney',
      'home.hero.h1.a': 'Solte o que trava.',
      'home.hero.h1.b': 'Ganhe força física e equilíbrio mental.',
      'home.hero.h1.c': 'Uma especialista.',
      'home.hero.h1.d': 'Um sistema.',
      'home.hero.sub': 'Massagem somática, Sensory Energetics e personal training. Tudo conectado, com uma especialista só, pra um corpo que solta e ganha força ao mesmo tempo.',
      'home.hero.cta.massage': 'Agendar Massagem',
      'home.hero.cta.training': 'Agendar Treino',
      'home.hero.cta.talk': 'Não sabe por onde começar? Fala com a Marina primeiro →',

      // Home: combination
      'home.combo.label': 'O sistema',
      'home.combo.h2': 'A maioria dos terapeutas trata o sintoma.<br>A maioria dos treinadores trabalha em torno da restrição.<br>Marina remove a origem e constrói sobre terreno limpo.',
      'home.combo.intro': 'Existe um motivo para a tensão continuar voltando depois de uma boa massagem. E um motivo para o seu treino ter um teto, por mais consistente que você seja. É o mesmo motivo. E não é culpa sua.',
      'home.combo.c1.label': 'Só massagem',
      'home.combo.c1.h': 'A tensão alivia. Depois volta.',
      'home.combo.c1.p': 'A massagem comum trabalha o músculo. Mas por baixo do músculo tem a fáscia. É o tecido fino que envolve tudo e segura o padrão de tensão no lugar. A massagem comum quase nunca chega lá. O corpo melhora por alguns dias. Depois trava de novo, no mesmo ponto. Porque nada mudou na forma como você se move.',
      'home.combo.c2.label': 'Só treino',
      'home.combo.c2.h': 'Você ganha força em cima de um corpo travado.',
      'home.combo.c2.p': 'Quando a fáscia está travada, o seu corpo dá um jeitinho. Encontra outro caminho pra fazer o movimento. Você acaba treinando esses atalhos, em vez de ganhar força de verdade. A tensão fica ainda mais forte, porque o corpo se acomoda em volta dela. O platô não é problema de treino. É problema de tecido.',
      'home.combo.c3.label': 'O sistema Marina',
      'home.combo.c3.h': 'A liberação prepara o terreno. O treino constrói o que fica.',
      'home.combo.c3.p': 'A Marina solta a fáscia primeiro. O que estava travado vai embora. Depois, o treino constrói força no movimento que o seu corpo finalmente consegue fazer de verdade. Sessão após sessão, os dois se somam. A tensão não volta, porque não tem mais pra onde voltar. E a força fica, porque foi construída num corpo que finalmente se move.',
      'home.combo.close': 'Não é massagem de um lado e treino do outro. É o mesmo trabalho, feito por uma especialista que enxerga a conexão.',
      'home.combo.cta': 'Veja como as sessões funcionam →',

      // Home: services
      'home.svc.label': 'Serviços',
      'home.svc.h2': 'Dois serviços. Duas formas de começar.',
      'home.svc.sub': 'Massagem ou personal training. Depois você escolhe entre uma sessão avulsa ou uma mensalidade contínua.',
      'home.svc.massage.h': 'Massagem',
      'home.svc.massage.p': 'Massagem Somática Corporal, Facial, ou a sessão assinatura Sensory Energetics de 90 minutos. Liberação fascial desenvolvida pela Marina, combinada com respiração e consciência somática.',
      'home.svc.massage.single.name': 'Sessão avulsa',
      'home.svc.massage.single.meta': '60-90 min · A partir de A$125 · Sem compromisso',
      'home.svc.massage.mship.name': 'Plano semanal',
      'home.svc.massage.mship.badge': 'Assinatura',
      'home.svc.massage.mship.meta': 'A partir de A$100/semana · horário fixo · mínimo 2 meses',
      'home.svc.pt.h': 'Personal Training',
      'home.svc.pt.p': 'Personal training individual com foco em movimento consciente, na Snap Fitness Maroubra. A Marina integra liberação miofascial, mobilidade e respiração em cada sessão de 60 minutos.',
      'home.svc.pt.single.name': 'Sessão avulsa',
      'home.svc.pt.single.meta': '60 min · A$99 · Teste o trabalho primeiro',
      'home.svc.pt.plan.name': 'Mensalidade',
      'home.svc.pt.plan.meta': 'A partir de A$380 a cada 4 semanas · 1 a 3x por semana · mínimo 2 meses',

      // Diagnostic
      'diag.label': 'Diagnóstico',
      'diag.h2': 'Onde seu corpo está pedindo ajuda?',
      'diag.sub': 'Escolha o que se encaixa. A Marina te conta como seria o trabalho.',
      'diag.tile.neck': 'Pescoço, ombros, parte superior das costas',
      'diag.tile.jaw': 'Mandíbula, ATM, dor de cabeça por tensão',
      'diag.tile.back': 'Lombar e quadril',
      'diag.tile.stress': 'Estresse, sono, não consegue desligar',
      'diag.tile.training': 'Platô no treino, mobilidade travada',

      'diag.neck.name': 'Somatic Massage Corporal',
      'diag.neck.why': 'A tensão crônica na parte de cima do corpo quase sempre vem da fáscia, não do músculo. A massagem comum só trabalha na superfície. A Marina chega no tecido por baixo, onde a tensão está guardada de verdade. A maioria das clientes sente a diferença já na primeira sessão.',
      'diag.neck.tags': 'Liberação Miofascial · Liberação Somática · Combinação personalizada',
      'diag.neck.cta': 'Agendar Massagem',
      'diag.jaw.name': 'Somatic Massage Facial',
      'diag.jaw.why': 'A tensão na mandíbula e o bruxismo ficam guardados na fáscia do rosto, do pescoço e da garganta. A Marina é uma das poucas profissionais em Sydney formada em massagem bucal (por dentro da boca) e TMJ Mastery. A maioria das clientes dorme melhor e sente a mandíbula bem mais solta em 24 horas.',
      'diag.jaw.tags': 'TMJ Mastery · Massagem Bucal · Liberação Miofascial',
      'diag.jaw.cta': 'Agendar Massagem',
      'diag.back.name': 'Somatic Massage Corporal',
      'diag.back.why': 'Dor lombar e no quadril quase sempre é uma corrente de tensão conectada, não um músculo isolado. O bloqueio costuma estar nos flexores do quadril, na fáscia das costas, ou na conexão entre os dois. A Marina mapeia a corrente inteira e solta direto na origem.',
      'diag.back.tags': 'Liberação Miofascial · Mio Aponeurose · Liberação Somática',
      'diag.back.cta': 'Agendar Massagem',
      'diag.stress.name': 'Sensory Energetics (90 min)',
      'diag.stress.why': 'Quando o corpo não consegue desligar, o problema é o sistema nervoso. Não só o músculo. O Sensory Energetics combina pressão em pontos-gatilho, respiração guiada e liberação somática pra alcançar a tensão que o seu sistema nervoso guarda há meses ou anos. As clientes saem mais soltas. E a maioria dorme bem melhor naquela noite.',
      'diag.stress.tags': 'Regulação do Sistema Nervoso · Respiração · Pontos-Gatilho',
      'diag.stress.cta': 'Agendar Massagem',
      'diag.training.name': 'Treino de Movimento Consciente',
      'diag.training.why': 'Quando o platô não muda nem mudando o treino, geralmente é problema de tecido. A fáscia travada reduz a amplitude que o seu corpo tem disponível, e isso trava o ganho de força. A Marina traz toda a formação dela em terapia corporal pra cada sessão de PT. Solta o que está travado e já treina a amplitude liberada, na mesma hora.',
      'diag.training.tags': 'Treino em Cadeias Fasciais · Mobilidade · Respiração na Sessão',
      'diag.training.cta': 'Ver planos de treino →',

      // Social proof
      'home.proof.label': 'O que dizem as clientes',
      'home.proof.h2': 'Nas palavras delas.',
      'home.proof.t1.h': 'Ela se importa de verdade.',
      'home.proof.t1.q': 'Excelente personal trainer. Foi fundamental na minha jornada de construir confiança e força na academia. Adoro treinar com ela, e ela se importa de verdade. Recomendo muito a Marina!',
      'home.proof.t1.name': 'Jean',
      'home.proof.t2.h': 'Parece uma experiência completa.',
      'home.proof.t2.q': 'A Marina é genuinamente atenciosa e talentosa no que faz. Dá pra sentir que ela coloca o coração no trabalho. Estar no espaço dela é sempre uma experiência boa: os óleos essenciais, o ambiente, cada detalhe. Nunca parece que você está só pagando por um serviço, parece uma experiência completa. Recomendo muito!',
      'home.proof.t2.name': 'Yumi',
      'home.proof.t3.h': 'Ela sabe o que funciona.',
      'home.proof.t3.q': 'Muito satisfeita com o trabalho da Marina! Ela sabe o que funciona melhor para o nosso corpo.',
      'home.proof.t3.name': 'Alya',
      'home.proof.viaGoogle': 'via Google',
      'home.proof.reviews': 'avaliações · Sydney →',

      // Disqualifiers
      'home.dq.label': 'Honesto',
      'home.dq.h2': 'Esse trabalho não é para todo mundo.',
      'home.dq.d1.h': 'Você quer uma massagem só pra relaxar.',
      'home.dq.d1.p': 'A Marina trabalha o tecido bem fundo, onde a tensão fica guardada. Você vai sentir coisas se mexendo no seu corpo. Se o que você quer é uma horinha de spa pra desligar, agenda em outro lugar e aproveita. Sem julgamento nenhum.',
      'home.dq.d2.h': 'Você precisa de reembolso de plano de saúde.',
      'home.dq.d2.p': 'A Marina é especialista em terapia corporal e personal trainer, mas não é terapeuta remedial registrada. Por isso o plano de saúde não cobre. Se reembolso é prioridade pra você, melhor procurar uma terapeuta registrada.',
      'home.dq.d3.h': 'Você quer um protocolo fixo a cada visita.',
      'home.dq.d3.p': 'Cada sessão é montada em cima do que a Marina sente no seu corpo naquele dia. Semana diferente, trabalho diferente. É exatamente esse o ponto.',
      'home.dq.d4.h': 'Você quer uma personal que trate fitness como objetivo isolado.',
      'home.dq.d4.p': 'A Marina treina o seu corpo inteiro, não só estética. Se a sua única medida de sucesso é o espelho, não é aqui.',

      // Consult
      'home.consult.h2': 'Não sabe qual sessão é certa para você?',
      'home.consult.p': 'Uma sessão de A$125 não é uma decisão pra tomar lendo uma página de site. Manda uma mensagem pra Marina no WhatsApp. Ela vai te perguntar o que está acontecendo no seu corpo, o que você já tentou, e te dizer com honestidade se ela é a pessoa certa pra te atender.',
      'home.consult.cta': 'Falar com a Marina no WhatsApp →',

      // FAQ
      'home.faq.label': 'Perguntas frequentes',
      'faq.search.placeholder': 'Buscar nas perguntas',
      'faq.search.empty': 'Nenhuma pergunta corresponde. Tente outro termo.',
      'a11y.skip': 'Ir para o conteúdo principal',
      'about.bio.pullquote': 'O exercício físico vai além da estética. É a construção de um corpo forte, funcional e consciente, que sustenta autonomia, longevidade e qualidade de vida em cada fase da vida.',
      'nf.label': 'Página não encontrada',
      'nf.h1': 'Esta página foi por outro caminho.',
      'nf.sub': 'Pode ter mudado de lugar, ou pode nunca ter existido. De qualquer forma, o trabalho continua aqui.',
      'nf.cta.home': 'Voltar para o início',
      'nf.cta.book': 'Agendar Massagem',
      'nf.next': 'Para onde agora?',
      'home.faq.h2': 'As perguntas que a Marina escuta toda semana.',
      'home.faq.q1': 'Por que a Marina combina terapia corporal com personal training?',
      'home.faq.a1': 'Porque os dois mexem com o mesmo sistema. A fáscia travada limita o seu movimento. Movimento limitado limita o seu resultado no treino. A formação da Marina permite trabalhar os dois lados na mesma sessão. Sem você precisar marcar dois atendimentos separados.',
      'home.faq.q2': 'Preciso ter uma lesão ou diagnóstico específico pra agendar?',
      'home.faq.a2': 'Não. Algumas clientes chegam com dor crônica. Outras chegam porque querem mais energia, melhor postura, ou um resultado de treino mais firme. A Marina trabalha com tudo isso.',
      'home.faq.q3': 'O que acontece na primeira sessão?',
      'home.faq.a3': 'A Marina olha como o seu corpo está se movendo e onde está segurando tensão. Pergunta o que te trouxe ali e o que você já tentou antes. A sessão é montada a partir do que ela encontra em você. Não é um protocolo igual pra todo mundo.',
      'home.faq.q4': 'Em quanto tempo vou sentir diferença?',
      'home.faq.a4': 'A maioria das clientes sente o corpo mais solto e o sono mais profundo nas 24 horas depois da primeira sessão. Tensão crônica de anos vai mudando de forma consistente em 3 a 5 sessões. Depois da primeira, a Marina te diz com honestidade quantas ela acha que o seu corpo vai precisar.',
      'home.faq.q5': 'A$125 é mais caro que uma massagem comum. Por quê?',
      'home.faq.a5': 'Sim, porque não é uma massagem comum. Cada sessão combina cinco técnicas especializadas que a maioria dos terapeutas nunca junta numa coisa só. Quem antes pagava fisio, massagem remedial e avaliação de movimento separados recebe o mesmo trabalho numa hora só. Se o que você quer é uma única sessão de relaxamento, a Marina não é a escolha certa. Se você quer tensão que realmente vai embora, ela é.',
      'home.faq.q6': 'As sessões têm cobertura de plano de saúde?',
      'home.faq.a6': 'Não. A Marina é especialista em terapia corporal e personal trainer. Mas não é terapeuta remedial registrada nem fisioterapeuta. Se reembolso é prioridade pra você, agenda com uma terapeuta registrada. Honestidade pesa mais que o agendamento.',
      'home.faq.q7': 'E se não funcionar pra mim?',
      'home.faq.a7': 'Se a sua primeira sessão não for o que você esperava, manda mensagem pra Marina no WhatsApp em até 24 horas. Ela vai resolver: refaz a próxima sessão, te indica outra especialista mais adequada, ou devolve o valor. Sem formulários. Sem rodeios.',
      'home.faq.q8': 'Posso fazer massagem e treino com a Marina?',
      'home.faq.a8': 'Pode, e os resultados costumam vir mais rápido assim. A terapia corporal solta o que está travado, e o treino constrói força em cima. Muitas clientes começam com massagem e adicionam treino quando sentem o que muda no corpo com a fáscia liberada.',

      // Method page
      'method.hero.label': 'O método',
      'method.hero.h1': 'É tudo fáscia.',
      'method.hero.sub': 'A fáscia é o tecido fino que envolve músculos, órgãos e nervos, conectando todo o corpo como uma grande rede interna. Imagine um filme flexível em várias camadas cobrindo tudo por dentro. Quando uma região fica tensionada, outras partes também são afetadas. O diferencial da abordagem da Marina é destensionar a fáscia, promovendo melhora da mobilidade, circulação, funções neurais e da comunicação entre corpo e sistema nervoso.',
      'method.hero.img.alt': 'Ilustração anatômica da rede fascial do corpo, mostrando a teia contínua de tecido conjuntivo nas costas, ombros, braços e pernas.',

      'method.why.label': 'Por que a fáscia importa',
      'method.why.h2': 'Quatro sintomas.<br>Uma só origem.',
      'method.why.p1.label': 'Pescoço + Costas superiores',
      'method.why.p1.h': 'Dor que volta em poucos dias.',
      'method.why.p1.p1': '<strong>Como aparece.</strong> Aperto no trapézio, pescoço com pouca rotação, dor de cabeça que vai subindo ao longo do dia.',
      'method.why.p1.p2': '<strong>Por que volta.</strong> A fáscia da parte de cima das costas é uma camada contínua. Trabalhar só o músculo deixa essa camada contraída. O músculo tensiona de novo para acompanhar.',
      'method.why.p1.p3': '<strong>O que a Marina faz.</strong> Solta a fáscia das costas e do pescoço juntas. O sistema todo relaxa como uma peça só.',
      'method.why.p2.label': 'Mandíbula + ATM',
      'method.why.p2.h': 'Tensão que te acompanha até o sono.',
      'method.why.p2.p1': '<strong>Como aparece.</strong> Bruxismo, dor de cabeça tensional, sono ruim, dor ao acordar.',
      'method.why.p2.p2': '<strong>Por que volta.</strong> A mandíbula é sustentada por fáscia dentro da boca e ao longo da garganta. A massagem externa não chega lá.',
      'method.why.p2.p3': '<strong>O que a Marina faz.</strong> É formada em TMJ Mastery e massagem bucal (por dentro da boca). Ela alcança a fáscia por dentro. Onde o padrão de tensão fica realmente guardado.',
      'method.why.p3.label': 'Movimento travado',
      'method.why.p3.h': 'Uma amplitude que encolhe sem você notar.',
      'method.why.p3.p1': '<strong>Como aparece.</strong> Levantar o braço acima da cabeça fica difícil. O agachamento parece raso. O corpo trava de manhã e só solta depois do aquecimento.',
      'method.why.p3.p2': '<strong>Por que volta.</strong> Pontos colados na fáscia (aderências) limitam o quanto o músculo consegue se alongar. Alongamento sozinho não desfaz essas colagens.',
      'method.why.p3.p3': '<strong>O que a Marina faz.</strong> Liberação miofascial na sessão de terapia. Depois, treina a amplitude liberada no PT pra o seu corpo manter o ganho.',
      'method.why.p4.label': 'Platô no treino',
      'method.why.p4.h': 'Números que não andam.',
      'method.why.p4.p1': '<strong>Como aparece.</strong> Agachamento, levantamento terra ou supino travados na mesma carga há meses. Mudar a programação parou de ajudar.',
      'method.why.p4.p2': '<strong>Por que volta.</strong> O corpo se adapta em volta do bloqueio. Ele encontra outro caminho. E você acaba treinando esse atalho, não o movimento que está faltando de verdade.',
      'method.why.p4.p3': '<strong>O que a Marina faz.</strong> Identifica a corrente de fáscia que segura o atalho. Solta. Treina a nova amplitude com carga.',

      'method.mod.label': 'As modalidades',
      'method.mod.h2': 'Quatro ferramentas. Um corpo.<br>Escolhidas pelo que o seu tecido precisa naquele dia.',
      'method.mod.m1.h': 'Massagem Somática',
      'method.mod.m1.meta': '60 min · A$125',
      'method.mod.m1.p': 'Metodologia desenvolvida pela Marina, juntando liberação miofascial, drenagem linfática brasileira, respiração guiada e relaxamento profundo. Resolve: tensão muscular crônica, retenção de líquidos, fáscia travada, estresse físico acumulado.',
      'method.mod.m2.h': 'KSE Sensory Energetics',
      'method.mod.m2.meta': '90 min · A$305 · Assinatura',
      'method.mod.m2.p': 'Método integrativo que ativa o sistema nervoso central com técnicas ancestrais, respiração guiada e estímulos no corpo. Resolve: sistema nervoso desregulado, tensão acumulada no corpo há meses ou anos, padrões de ansiedade guardados no tecido.',
      'method.mod.m3.h': 'Movimento Consciente',
      'method.mod.m3.meta': 'Em todas as sessões',
      'method.mod.m3.p': 'Respiração, consciência do corpo e mobilidade entram em toda sessão de massagem e treino. Resolve: a distância entre sair mais solta da maca hoje, e realmente se mover diferente no resto da semana.',
      'method.mod.m4.h': 'Personal Training',
      'method.mod.m4.meta': '60 min · Planos mensais · A partir de A$75/sessão',
      'method.mod.m4.p': 'Personal training individual na Snap Fitness Maroubra, montado a partir do que as suas sessões de terapia revelam sobre o seu corpo. Resolve: platôs no treino, limites de mobilidade, força e energia na perimenopausa e menopausa, consciência corporal.',

      'method.combo.label': 'A combinação',
      'method.combo.h2': 'Duas metades de uma só prática.',
      'method.combo.p1': 'A maioria dos profissionais escolhe um lado só. Terapeutas soltam a tensão e te mandam pra casa. Personal trainers constroem força e torcem pra que o tecido se resolva sozinho.',
      'method.combo.p2': 'A Marina se formou nos dois lados porque, pra ela, são o mesmo trabalho. A terapia corporal solta o que está travado. O treino constrói força na amplitude que a liberação acabou de abrir. Sem a terapia, o treino fixa o atalho que o corpo aprendeu. Sem o treino, a terapia solta um corpo que vai tensionar de novo em volta dos hábitos antigos.',
      'method.combo.p3': 'A maioria das clientes começa pela massagem. Depois de duas ou três sessões, quando sentem o que o corpo realmente consegue fazer, adicionam o treino. Os dois se somam. O trabalho fica.',
      'method.combo.cta.massage': 'Ver serviços de massagem',
      'method.combo.cta.training': 'Ver planos de treino',

      'method.res.label': 'A pesquisa',
      'method.res.h2': 'Por que o corpo guarda o que guarda.',
      'method.res.s1.num': '8 / 10',
      'method.res.s1.l': 'dos adultos australianos vão ter tensão crônica no pescoço ou nas costas este ano.',
      'method.res.s1.src': 'Australian Institute of Health and Welfare',
      'method.res.s2.num': '15%',
      'method.res.s2.l': 'dos adultos têm disfunção da ATM (mandíbula). A maioria nunca recebe tratamento direto.',
      'method.res.s2.src': 'National Institute of Dental and Craniofacial Research',
      'method.res.s3.num': '85%',
      'method.res.s3.l': 'da dor crônica nos músculos e ossos envolve pontos-gatilho na fáscia.',
      'method.res.s3.src': 'Journal of Bodywork and Movement Therapies',
      'method.res.s4.num': '1 / 3',
      'method.res.s4.l': 'dos australianos sente sintomas de estresse guardados fisicamente no corpo.',
      'method.res.s4.src': 'Australian Psychological Society',

      'method.cta.h2': 'Pronta pra sentir a diferença?',
      'method.cta.p': 'Comece com uma sessão. Em uma hora você já vai saber se esse é o trabalho certo pra você.',
      'method.cta.book': 'Agendar Massagem',
      'method.cta.talk': 'Falar com a Marina primeiro →',

      // Massage page
      'mas.hero.label': 'Serviços de massagem',
      'mas.hero.h1': 'Isto não é uma massagem comum.',
      'mas.hero.sub': 'Cinco técnicas especializadas. A Marina escolhe a combinação certa pro que o seu corpo está pedindo naquele dia. Não existe protocolo fixo. Porque nenhum corpo chega no mesmo estado. A hora é construída a partir do que ela encontra em você.',

      'mas.svc.label': 'Os serviços',
      'mas.svc.h2': 'Três sessões.<br>Cinco técnicas.',

      'mas.c.name': 'Somatic Massage Corporal',
      'mas.c.meta': '60 minutos · A$125',
      'mas.c.p1': 'Metodologia desenvolvida pela Marina, juntando drenagem linfática brasileira, liberação miofascial, respiração guiada e relaxamento profundo numa única hora.',
      'mas.c.p2': 'Trabalha tensão muscular, retenção de líquidos, estresse físico acumulado e fáscia travada. À medida que a fáscia vai soltando, a circulação melhora, a mobilidade volta, a consciência do corpo cresce. E aquela sensação de leveza retorna.',
      'mas.c.p3': 'A camada de respiração guiada e relaxamento profundo regula o seu sistema nervoso e reduz o cortisol (o hormônio do estresse). É terapia corporal integrativa. Reconecta corpo e mente.',

      'mas.c.cta': 'Agendar Massagem',
      'mas.c.mship.cta': 'Tornar semanal →',

      'mas.f.name': 'Somatic Massage Facial',
      'mas.f.meta': '60 minutos · A$125',
      'mas.f.p1': 'Pra disfunção da ATM, tensão na mandíbula, dor de cabeça tensional e sono ruim. A fáscia do rosto, da mandíbula e da garganta quase nunca é alcançada por fora. A Marina é uma das poucas profissionais em Sydney formada em massagem bucal (por dentro da boca) e TMJ Mastery.',
      'mas.f.p2': 'A sessão combina liberação fascial por dentro da boca com trabalho externo no rosto, pescoço e garganta. A maioria das clientes dorme melhor e sente a mandíbula bem mais solta em 24 horas depois da primeira sessão.',

      'mas.f.cta': 'Agendar Massagem',
      'mas.f.mship.cta': 'Tornar semanal →',

      'mas.s.name': 'Sensory Energetics',
      'mas.s.meta': '90 minutos · A$305 · Assinatura',
      'mas.s.badge': 'Assinatura',
      'mas.s.p1': 'Sessão integrativa de 90 minutos focada em soltar, lá no fundo, os padrões físicos e emocionais que ficam guardados no sistema nervoso. Inspirada em técnicas ancestrais do Oriente, respiração guiada, estímulos no corpo e consciência somática. Ativa o sistema nervoso central de forma direta.',
      'mas.s.p2': 'Durante a sessão, tremores involuntários no corpo podem acontecer e são respostas naturais do sistema nervoso. Esses estímulos auxiliam na liberação de tensões acumuladas, na regulação do estresse e na redução dos níveis de cortisol. A técnica também favorece a ativação de neurotransmissores ligados ao bem-estar, foco, motivação, relaxamento e prazer, incluindo a dopamina.',
      'mas.s.p3': 'Mais do que uma experiência só corporal. O trabalho atravessa a conexão entre corpo, emoção e mente. As clientes saem com leveza, clareza mental, equilíbrio emocional, e um corpo que finalmente lembra como é desligar.',

      'mas.s.cta': 'Agendar Massagem',
      'mas.s.mship.cta': 'Tornar semanal →',


      'mas.choose.label': 'Como escolher',
      'mas.choose.h2': 'Três perguntas.<br>Uma sessão.',
      'mas.choose.c1.if': 'Se a massagem comum não está segurando o resultado',
      'mas.choose.c1.h': 'Somatic Corporal',
      'mas.choose.c1.p': 'A Marina trabalha a fáscia que está por baixo do músculo. O padrão de tensão se solta na origem. Não só na superfície.',
      'mas.choose.c2.if': 'Se o problema é mandíbula, ATM ou dor de cabeça',
      'mas.choose.c2.h': 'Somatic Facial',
      'mas.choose.c2.p': 'Trabalho por dentro da boca e formação em TMJ. Alcança a fáscia onde a massagem externa não chega.',
      'mas.choose.c3.if': 'Se a tensão volta sempre, não importa o que você tente',
      'mas.choose.c3.h': 'Sensory Energetics',
      'mas.choose.c3.p': 'Feito pra tensão que o seu sistema nervoso guarda há meses ou anos. O trabalho assinatura de 90 minutos.',

      'mas.price.label': 'Preços',
      'mas.price.h2': 'Sessões avulsas e planos semanais.',
      'mas.price.r1.name': 'Sessão avulsa',
      'mas.price.r1.sub': 'Corporal ou Facial · 60 min',
      'mas.price.r1.price': 'A$125',
      'mas.price.r2.name': 'Sensory Energetics',
      'mas.price.r2.sub': 'Assinatura · 90 min',
      'mas.price.r2.price': 'A$305',
      'mas.price.book': 'Reservar sessão avulsa',
      'mas.price.mship.h': 'Planos semanais',
      'mas.price.mship.note': 'Mesmo dia e mesma hora toda semana, reservado no checkout e mantido pra você até você cancelar. Mínimo de 2 meses · renovação automática · cancelamento com 1 semana de aviso.',
      'mas.price.mship.corporal': 'Corporal semanal',
      'mas.price.mship.facial': 'Facial semanal',
      'mas.price.mship.sensory': 'Sensory Energetics semanal',

      'mas.faq.h2': 'Perguntas específicas sobre massagem.',
      'mas.faq.q1': 'O que eu devo vestir?',
      'mas.faq.a1': 'Pra Corporal: roupa íntima. A Marina usa lençóis e descobre só a parte do corpo que está trabalhando no momento. Pra Facial: chega como estiver, o trabalho é no rosto, pescoço, mandíbula e por dentro da boca. Pra Sensory Energetics: roupa solta e confortável, que te deixe se mover e respirar à vontade.',
      'mas.faq.q2': 'Posso usar plano de saúde?',
      'mas.faq.a2': 'Não. A Marina é especialista em terapia corporal. Não é terapeuta remedial registrada. Por isso não tem reembolso. Se isso pesa mais que o trabalho pra você, agenda com uma terapeuta registrada.',
      'mas.faq.q3': 'Quantas sessões eu vou precisar?',
      'mas.faq.a3': 'A maioria das clientes sente uma diferença grande já depois da primeira sessão. Mudanças firmes em padrões crônicos costumam acontecer em 3 a 5 sessões. Depois da primeira, a Marina te diz com honestidade o que ela acha que o seu corpo precisa.',

      // Training page
      'tr.hero.label': 'Personal training',
      'tr.hero.h1': 'Treino que entende o seu corpo.',
      'tr.hero.sub': 'Personal training individual e especializado na Snap Fitness Maroubra. Cada sessão de 60 minutos é construída a partir do que a Marina vê no seu movimento. E do que a formação dela em terapia corporal permite trabalhar dentro da mesma hora.',
      'tr.hero.loc': 'Snap Fitness Maroubra · Ter + Qui 8h-18h · Seg/Qua/Sex 8h-11h · Você precisa ter matrícula ativa na Snap Fitness',
      'tr.hero.cta.plans': 'Ver planos de treino →',
      'tr.hero.cta.talk': 'Falar com a Marina primeiro →',

      'tr.diff.label': 'O que muda aqui',
      'tr.diff.h2': 'A maioria dos personal trainers não enxerga o que está te travando.<br>A Marina enxerga.',
      'tr.diff.p1': 'Um personal comum monta o treino em cima de um corpo que ele não consegue avaliar por completo. Ele vê você levantando o peso. Mas não enxerga a corrente de fáscia que está encurtando o seu movimento, limitando a sua força, ou jogando peso numa articulação que você está protegendo sem nem perceber.',
      'tr.diff.p2': 'Há mais de dez anos estudando e trabalhando com terapia corporal antes mesmo de atuar como personal trainer, ela desenvolveu um olhar que vai além do treino tradicional. Enxerga padrões de tensão, compensação e bloqueios que muitas vezes passam despercebidos em uma abordagem comum e trabalha esses padrões diretamente durante a sessão.<br><br>Liberação manual antes do levantamento, mobilidade antes da carga e respiração antes da próxima série. Esse processo estimula o sistema nervoso central, favorecendo maior disponibilidade de energia para o corpo, mais concentração na execução dos movimentos e uma consciência corporal mais profunda.',
      'tr.diff.p3': 'O resultado é um treino que realmente constrói o corpo de dentro para fora. Não se trata apenas de levantar peso. É sobre desenvolver força com presença, controle, mobilidade e inteligência corporal em cada movimento.',

      'tr.struct.label': 'A sessão de 60 minutos',
      'tr.struct.h2': 'Cinco fases.<br>Construídas em torno do seu corpo naquele dia.',
      'tr.struct.s1': 'Alongamento, ativação dos músculos e liberação miofascial',
      'tr.struct.s2': 'O básico de mobilidade e consciência do seu corpo',
      'tr.struct.s3': 'Treino específico pro seu objetivo',
      'tr.struct.s4': 'Fortalecimento, estabilidade e condicionamento',
      'tr.struct.s5': 'Relaxamento muscular e respiração guiada',

      'tr.spec.label': 'Áreas de especialidade',
      'tr.spec.h2': 'Onde a Marina trabalha mais a fundo.',
      'tr.spec.s1': 'Hipertrofia',
      'tr.spec.s2': 'Condicionamento físico',
      'tr.spec.s3': 'Mobilidade e postura',
      'tr.spec.s4': 'Força e estabilidade',
      'tr.spec.s5': 'Perimenopausa e menopausa',
      'tr.spec.s6': 'Bem-estar da mente e do corpo',

      'tr.plans.label': 'Planos e mensalidades',
      'tr.plans.h2': 'Escolha o seu ritmo.<br>Garante o seu horário.',
      'tr.plans.sub': 'Mensalidades cobradas a cada 4 semanas. Você escolhe 1, 2 ou 3 sessões por semana. Seu dia e horário ficam travados durante toda a mensalidade. Mínimo de 2 meses no Basic e no Golden, 3 meses no Diamond. O trabalho precisa desse tempo pra entrar de verdade.',

      'tr.plan.basic.name': 'Basic',
      'tr.plan.basic.price': 'A$380',
      'tr.plan.basic.per': 'por mês · A$95/sessão · 4 sessões',
      'tr.plan.basic.f1': '1x por semana, mesmo dia e horário',
      'tr.plan.basic.f2': '<strong>Mínimo de 2 meses</strong>, depois cancela quando quiser',
      'tr.plan.basic.f3': 'Apenas sessões presenciais (sem app, sem avaliação física)',

      'tr.plan.golden.name': 'Golden',
      'tr.plan.golden.price': 'A$680',
      'tr.plan.golden.per': 'por mês · A$85/sessão · 8 sessões',
      'tr.plan.golden.badge': 'Mais popular',
      'tr.plan.golden.f1': '2x por semana, mesmos dias e horários',
      'tr.plan.golden.f2': '<strong>Mínimo de 2 meses</strong>, depois cancela quando quiser',
      'tr.plan.golden.f3': 'Programação no app MFIT incluída (sem avaliação física)',

      'tr.plan.diamond.name': 'Diamond',
      'tr.plan.diamond.price': 'A$900',
      'tr.plan.diamond.per': 'por mês · A$75/sessão · 12 sessões',
      'tr.plan.diamond.badge': 'Melhor custo-benefício',
      'tr.plan.diamond.f1': '3x por semana, mesmos dias e horários',
      'tr.plan.diamond.f2': '<strong>Mínimo de 3 meses</strong>, depois cancela quando quiser',
      'tr.plan.diamond.f3': '<strong>Avaliação física</strong> + programação no app MFIT incluídas',

      'tr.plan.book': 'Iniciar mensalidade',
      'tr.plan.note': 'Como funciona: você agenda a primeira sessão na Acuity e seleciona <strong>Select and make recurring</strong> (tornar recorrente) para o seu dia e horário ficarem travados durante toda a mensalidade. Clientes Golden repetem o processo uma vez por dia de treino (2x). Clientes Diamond repetem para cada um dos 3 dias. O seu cartão é cobrado a cada 4 semanas. Cancele pelo portal a qualquer momento depois do período mínimo (2 meses no Basic e Golden, 3 meses no Diamond). Se cancelar dentro do mínimo, o restante da mensalidade transfere para uma amiga da sua escolha. Sem reembolso.',

      'tr.single.name': 'Sessão avulsa: teste o trabalho primeiro',
      'tr.single.sub': 'Uma sessão de 60 minutos, sem mensalidade, sem compromisso. A maneira de sentir como a Marina treina antes de entrar num plano mensal.',
      'tr.single.price': 'A$99',
      'tr.single.cta': 'Agendar sessão avulsa',

      'tr.assess.name': 'Avaliação física',
      'tr.assess.sub': 'Avaliação de movimento, postura e força com a Marina. Incluída no plano Diamond. Opcional avulsa para quem está em outro plano ou ainda decidindo.',
      'tr.assess.price': 'A$99',
      'tr.assess.cta': 'Agendar avaliação',

      'tr.consult.name': 'Consultoria on-line',
      'tr.consult.sub': 'Para clientes que treinam à distância, longe da Snap Fitness Maroubra. Vídeo-chamada com a Marina a cada 6 semanas para revisar o seu corpo, trocar exercícios que já cumpriram o papel e ajustar o programa. Renovação automática.',
      'tr.consult.price': 'A$100',
      'tr.consult.cta': 'Iniciar consultoria',

      'tr.pol.label': 'Política da mensalidade',
      'tr.pol.h2': 'Cobrança, horário, mínimo e transferência.',
      'tr.pol.intro': 'Tudo abaixo você faz sozinha pelo seu portal da Acuity. Você gerencia seu horário, reagenda, congela, transfere ou cancela a renovação. Sem precisar mandar mensagem para a Marina.',
      'tr.pol.slot.h': 'Seu horário semanal',
      'tr.pol.slot.p': 'Você define seu horário semanal sozinha na Acuity. Ao agendar a primeira sessão, escolhe <strong>Select and make recurring</strong> (tornar recorrente) para o mesmo dia e horário se repetir durante toda a mensalidade. Basic = 1 série semanal. Golden = 2 séries semanais (uma para cada dia de treino). Diamond = 3 séries semanais. Para mudar um horário depois, reagende as sessões individualmente pelo portal da Acuity (regra das 72 horas logo abaixo).',
      'tr.pol.resched.h': 'Reagendamento',
      'tr.pol.resched.p1': 'Você reagenda qualquer sessão sozinha pelo portal da Acuity com no mínimo <strong>72 horas de antecedência</strong>. Escolhe um novo horário entre os que a Marina deixou disponíveis.',
      'tr.pol.resched.l1': 'Reagendou com menos de 72 horas de antecedência. A sessão conta como utilizada.',
      'tr.pol.resched.l2': 'Faltou sem avisar. A sessão conta como utilizada.',
      'tr.pol.resched.l3': 'Se a agenda da Marina não tiver vaga no seu mês atual, a sessão passa automaticamente para o mês seguinte.',
      'tr.pol.resched.l4': 'Se a Marina precisar cancelar (doença, feriado, viagem), a sessão é remarcada para uma semana futura. Você nunca perde sessão por causa dela.',
      'tr.pol.bill.h': 'Cobrança mensal',
      'tr.pol.bill.p1': 'Seu cartão é cobrado <strong>a cada 4 semanas</strong>, automaticamente, a partir do dia em que a mensalidade começa. Mesmo valor todo ciclo. Sem pacote grande no começo, sem surpresa de renovação.',
      'tr.pol.bill.p2': 'Depois do mínimo, você cancela quando quiser pelo portal da Acuity, com no mínimo <strong>7 dias de antecedência</strong> antes da próxima cobrança. Sem precisar avisar a Marina. Sessões não utilizadas dentro de um mês pago não acumulam para o seguinte.',
      'tr.pol.commit.h': 'Mínimo e transferência',
      'tr.pol.commit.p1': 'Cada mensalidade tem um tempo mínimo pra o trabalho conseguir entrar: <strong>2 meses no Basic e no Golden, 3 meses no Diamond</strong>.',
      'tr.pol.commit.p2': 'O corpo não muda em duas sessões. Dois meses é quando força, mobilidade e postura começam a se firmar de verdade. A Marina se compromete com esse tempo e pede que você se comprometa também, pra que vocês duas façam o trabalho completo e vejam o resultado juntas.',
      'tr.pol.commit.p3': 'Se a vida mudar dentro do mínimo (gravidez, lesão, mudança de cidade, qualquer coisa), o restante da mensalidade transfere para uma amiga da sua escolha. Sem reembolso, porque o tempo travado é parte do trabalho. Mas o valor nunca se perde.',
      'tr.pol.freeze.h': 'Pausa por emergência',
      'tr.pol.freeze.p1': 'A vida acontece. Você pode congelar a mensalidade uma vez por período mínimo, pelo portal, sem precisar comprovar nada: <strong>1 semana no Basic, 2 semanas no Golden, 3 semanas no Diamond</strong>. A mensalidade pausa e retoma do ponto onde parou.',
      'tr.pol.single.h': 'Sessão avulsa',
      'tr.pol.single.p': 'Sem mensalidade, sem horário fixo. Mesma regra de 72 horas para reagendar. Sem congelamento e sem transferência. A sessão avulsa serve para você testar o trabalho antes de se comprometer.',

      'tr.outcomes.label': 'O que as clientes conquistam',
      'tr.outcomes.h2': 'Específico, não abstrato.',
      'tr.outcomes.o1.l': 'Mobilidade',
      'tr.outcomes.o1.p': 'Movimento que tinha sido dado como perdido volta.',
      'tr.outcomes.o2.l': 'Platô',
      'tr.outcomes.o2.p': 'Os números do treino voltam a andar.',
      'tr.outcomes.o3.l': 'Perimenopausa',
      'tr.outcomes.o3.p': 'Força e energia pra atravessar essa fase.',

      'tr.snap.h': 'Sobre a Snap Fitness Maroubra.',
      'tr.snap.p': 'Todas as sessões presenciais são na Snap Fitness Maroubra. Você precisa ter matrícula ativa na Snap Fitness antes da primeira sessão. A Marina é personal trainer independente. A academia não tem responsabilidade pelos serviços de PT.',

      // About page
      'about.hero.title': 'Profissional de Educação Física · Especialista em Terapia Corporal',
      'about.hero.meta': '18+ anos de prática · Sydney',
      'about.bio.label': 'A história',
      'about.bio.h2': 'Dezoito anos, dois continentes, uma prática.',
      'about.bio.p1': 'Marina Ribeiro da Silva é profissional de Educação Física, com mais de dezoito anos dedicados ao movimento, à saúde e ao bem-estar das mulheres. Pra ela, movimento e terapia corporal não são duas carreiras. São dois lados de como um corpo muda.',
      'about.bio.p2': 'Começou pela dança, dando aulas desde os quinze anos. Estudou Educação Física pra profissionalizar o que já fazia intuitivamente desde criança. No Brasil, trabalhou com o governo de Minas Gerais no Movimenta Contagem. O maior programa gratuito de atividade física ao ar livre do país.',
      'about.bio.p3': 'Depois da pandemia fundou o Mulheres Ativas, um programa para mulheres. Especialmente mulheres acima dos quarenta, mães, e as que nunca se sentiram em casa numa academia tradicional.',
      'about.bio.p4': 'Em Sydney, ela é especialista em treino feminino em todas as fases da vida, incluindo perimenopausa: condicionamento, hipertrofia, mobilidade, postura, consciência corporal, qualidade de vida. Em mais de dez anos de terapia corporal, ela desenvolveu a própria técnica de liberação fascial, combinando respiração, consciência somática e liberação miofascial. É a base de cada sessão que ela conduz.',

      'about.creds.label': 'Credenciais',
      'about.creds.h2': 'Formação que levou dezoito anos para reunir.',
      'about.cred.1': 'EQF Level 4 Personal Trainer',
      'about.cred.2': 'Instituto Vanoni · Mio Aponeurose (40 horas · Itália)',
      'about.cred.3': 'Sensory Energetics Certificada',
      'about.cred.4': 'TMJ Mastery',
      'about.cred.5': 'Especialista em Massagem Bucal',
      'about.cred.6': '18+ anos trabalhando com o corpo feminino',
      'about.cred.7': 'Bilíngue EN + PT',
      'about.cred.8': 'Fundadora, Mulheres Ativas',

      'about.letter.label': 'Um recado da Marina',
      'about.letter.quote': '"Acredito que todos merecem se sentir em casa no próprio corpo. É esse o meu trabalho: através das minhas mãos, da respiração e do movimento consciente. Seja o que for que te trouxe até aqui, você não precisa chegar pronto. Só precisa chegar."',
      'about.letter.sign': 'Marina',
      'about.perks.label': 'Vantagens com parceiros',
      'about.perks.h': 'Benefícios dos parceiros da Marina.',
      'about.partner.label': 'Be Bold Sydney',
      'about.partner.p': 'As clientes da Marina ganham <strong>2 meses de acesso exclusivo gratuito ao app do Be Bold</strong> e ainda <strong>10% de desconto em qualquer serviço do Be Bold</strong>.',
      'about.partner.link': 'bebold.au →',

      'about.insta.h': 'Acompanhe o trabalho da Marina.',
      'about.insta.p': 'Sessões, bastidores e a metodologia em movimento.',
      'about.insta.cta': '@marinaribeiropersonal →',

      'about.cta.h': 'Pronta pra trabalhar com a Marina?',
      'about.cta.p': 'Agenda uma massagem, agenda uma aula de PT, ou manda uma mensagem primeiro se quiser que ela te indique por onde começar.',
      'about.cta.book': 'Agendar Massagem',
      'about.cta.bookPt': 'Agendar Treino',
      'about.cta.talk': 'Falar com a Marina →'
    }
  };

  // ─────────────────────────────────────────────
  // Language toggle
  // ─────────────────────────────────────────────
  const LANG_KEY = 'marinaLang';
  let currentLang = localStorage.getItem(LANG_KEY) || 'en';
  if (!i18n[currentLang]) currentLang = 'en';

  function t(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || (i18n.en && i18n.en[key]) || '';
  }

  function applyLang(lang) {
    if (!i18n[lang]) {
      document.documentElement.classList.remove('lang-pending');
      return;
    }
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const v = t(key);
      if (v) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      // format: "attr:key,attr:key"
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(function (pair) {
        const parts = pair.trim().split(':');
        if (parts.length === 2) {
          const v = t(parts[1].trim());
          if (v) el.setAttribute(parts[0].trim(), v);
        }
      });
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-lang') === lang);
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    // Refresh diagnostic if open
    const result = document.getElementById('diagResult');
    if (result && result.classList.contains('is-open') && result.dataset.area) {
      renderDiag(result.dataset.area);
    }

    // Recompute open FAQ heights since translated text may be a different length
    requestAnimationFrame(function () {
      document.querySelectorAll('.faq__item.is-open .faq__a').forEach(function (a) {
        a.style.maxHeight = a.scrollHeight + 'px';
      });
    });

    document.documentElement.classList.remove('lang-pending');
  }

  function initLang() {
    document.querySelectorAll('.lang button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.getAttribute('data-lang'));
      });
    });
    applyLang(currentLang);
  }

  // ─────────────────────────────────────────────
  // Nav scroll + drawer
  // ─────────────────────────────────────────────
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const hamburger = document.querySelector('.hamburger');
    const drawer = document.getElementById('drawer');
    if (hamburger && drawer) {
      hamburger.addEventListener('click', function () {
        const open = !drawer.classList.contains('is-open');
        drawer.classList.toggle('is-open', open);
        hamburger.classList.toggle('is-open', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          drawer.classList.remove('is-open');
          hamburger.classList.remove('is-open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // ─────────────────────────────────────────────
  // Reveal on scroll
  // ─────────────────────────────────────────────
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('is-visible'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(function (e) { io.observe(e); });

    // Force-show anything above the fold immediately
    requestAnimationFrame(function () {
      els.forEach(function (e) {
        if (e.getBoundingClientRect().top < window.innerHeight * 0.9) {
          e.classList.add('is-visible');
        }
      });
    });
  }

  // ─────────────────────────────────────────────
  // FAQ accordion
  // ─────────────────────────────────────────────
  function initFaq() {
    document.querySelectorAll('.faq__item').forEach(function (item) {
      const q = item.querySelector('.faq__q');
      const a = item.querySelector('.faq__a');
      if (!q || !a) return;
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('click', function () {
        const isOpen = item.classList.contains('is-open');
        // Close all
        document.querySelectorAll('.faq__item.is-open').forEach(function (other) {
          other.classList.remove('is-open');
          const oa = other.querySelector('.faq__a');
          const oq = other.querySelector('.faq__q');
          if (oa) oa.style.maxHeight = '0px';
          if (oq) oq.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          a.style.maxHeight = a.scrollHeight + 'px';
          q.setAttribute('aria-expanded', 'true');
        }
      });
    });
    // Recompute open item on resize
    window.addEventListener('resize', function () {
      document.querySelectorAll('.faq__item.is-open .faq__a').forEach(function (a) {
        a.style.maxHeight = a.scrollHeight + 'px';
      });
    });
  }

  // ─────────────────────────────────────────────
  // Diagnostic widget (home + method)
  // ─────────────────────────────────────────────
  const DIAG_AREAS = ['neck', 'jaw', 'back', 'stress', 'training'];
  const DIAG_URLS = {
    neck: 'https://marinaribeirobodywork.as.me/SomaticMassageCorporal',
    jaw: 'https://marinaribeirobodywork.as.me/SomaticMassageFacial',
    back: 'https://marinaribeirobodywork.as.me/SomaticMassageCorporal',
    stress: 'https://marinaribeirobodywork.as.me/SensoryEnergetics',
    training: 'training.html#plans'
  };

  function renderDiag(area) {
    const result = document.getElementById('diagResult');
    if (!result) return;
    result.dataset.area = area;
    const name = t('diag.' + area + '.name');
    const why = t('diag.' + area + '.why');
    const tags = (t('diag.' + area + '.tags') || '').split('·').map(function (s) { return s.trim(); }).filter(Boolean);
    const cta = t('diag.' + area + '.cta');
    const ctaUrl = DIAG_URLS[area];
    const isInternal = area === 'training';
    const tagsHtml = tags.map(function (tg) { return '<span class="diag__tag">' + tg + '</span>'; }).join('');
    result.innerHTML =
      '<h3>' + name + '</h3>' +
      '<p>' + why + '</p>' +
      '<div class="diag__tags">' + tagsHtml + '</div>' +
      '<a class="btn btn--primary' + (isInternal ? '' : ' acuity-embed-button') + '" href="' + ctaUrl + '"' +
      (isInternal ? '' : ' target="_blank" rel="noopener"') + '>' + cta + '</a>';
    result.classList.add('is-open');
  }

  function initDiag() {
    const tiles = document.querySelectorAll('.diag__tile');
    if (!tiles.length) return;
    tiles.forEach(function (tile) {
      tile.addEventListener('click', function () {
        const area = tile.getAttribute('data-area');
        if (!DIAG_AREAS.includes(area)) return;
        tiles.forEach(function (other) {
          const isOn = other === tile;
          other.classList.toggle('is-on', isOn);
          other.setAttribute('aria-selected', isOn ? 'true' : 'false');
        });
        renderDiag(area);
      });
    });
  }

  // ─────────────────────────────────────────────
  // Hero parallax + service-block image reveal
  // ─────────────────────────────────────────────
  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('.hero__media');
    if (!targets.length) return;
    let ticking = false;
    function update() {
      targets.forEach(function (el) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const y = rect.top * -0.08;
        el.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  function initMediaReveal() {
    if (!('IntersectionObserver' in window)) return;
    const blocks = document.querySelectorAll('.service-block');
    if (!blocks.length) return;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18 });
    blocks.forEach(function (b) { io.observe(b); });
  }

  // ─────────────────────────────────────────────
  // FAQ search filter
  // ─────────────────────────────────────────────
  function initFaqSearch() {
    document.querySelectorAll('.faq').forEach(function (faq) {
      const input = faq.querySelector('.faq__search input');
      if (!input) return;
      const items = faq.querySelectorAll('.faq__item');
      input.addEventListener('input', function () {
        const q = input.value.trim().toLowerCase();
        let visible = 0;
        items.forEach(function (item) {
          const text = item.textContent.toLowerCase();
          const match = !q || text.indexOf(q) !== -1;
          item.style.display = match ? '' : 'none';
          if (match) visible++;
        });
        faq.classList.toggle('is-empty', visible === 0 && q.length > 0);
      });
    });
  }

  // ─────────────────────────────────────────────
  // Boot
  // ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initNav();
    initFaq();
    initFaqSearch();
    initDiag();
    initReveal();
    initParallax();
    initMediaReveal();
  });
})();
