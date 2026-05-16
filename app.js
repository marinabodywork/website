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
      'nav.menu': 'Menu',

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
      'home.hero.h1.b': 'Build the strength.',
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
      'home.svc.h2': 'Three ways the work shows up.',
      'home.svc.s1.name': 'Single massage sessions',
      'home.svc.s1.meta': '60-90 min · From A$125',
      'home.svc.s1.p': 'Somatic Massage Corporal or Facial, or the 90-minute Sensory Energetics signature work. One-off bookings, no commitment.',
      'home.svc.s1.cta': 'Book Massage',
      'home.svc.s2.name': 'Memberships',
      'home.svc.s2.meta': 'From A$100/week · Fixed weekly slot',
      'home.svc.s2.p': 'A recurring weekly slot held personally by Marina. Invitation plan confirmed after your first session. Minimum 2 months.',
      'home.svc.s2.cta': 'Talk to Marina',
      'home.svc.s2.badge': 'Signature',
      'home.svc.s3.name': 'Training',
      'home.svc.s3.meta': '60 min · From A$75/session on plan',
      'home.svc.s3.p': 'Conscious-movement personal training. Strength built on a body that can actually move. Snap Fitness Maroubra.',
      'home.svc.s3.cta': 'Book Training',

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
      'diag.training.cta': 'Book Training',

      // ─── Social proof ───
      'home.proof.label': 'What clients say',
      'home.proof.h2': 'In her clients’ own words.',
      'home.proof.t1.h': 'She really cares.',
      'home.proof.t1.q': 'Excellent PT. She has been integral to my journey in building confidence and strength in the gym. I love training with her and she really cares. I highly recommend Marina!',
      'home.proof.t1.name': 'Jean',
      'home.proof.t2.h': 'It feels like a whole experience.',
      'home.proof.t2.q': 'Marina is honestly so thoughtful and talented at what she does. You can really tell she puts her whole heart into her work. And being at her space is always such a nice experience — the essential oils, the atmosphere, every little detail. It never feels like you’re just paying for a service, it feels like a whole experience. Highly recommend!',
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
      'about.bio.pullquote': 'Most fitness spaces are not built for the bodies and lives most women actually have.',
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
      'method.hero.sub': 'Fascia is the tissue around every muscle, organ, and nerve in your body. Think cling wrap, layered over everything. When one part of it tightens, everything attached to it tightens too. Most therapists work on the muscle and miss the fascia. That is why the tension keeps coming back.',

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
      'method.mod.m4.meta': '60 min · From A$75/session on plan',
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

      // Service: Facial
      'mas.f.name': 'Somatic Massage Facial',
      'mas.f.meta': '60 minutes · A$125',
      'mas.f.p1': 'For TMJ, jaw tension, tension headaches, and disturbed sleep. The fascia of the face, jaw, and throat is rarely reachable from the outside. Marina is one of the few Sydney practitioners trained in buccal (inside-mouth) work and TMJ Mastery.',
      'mas.f.p2': 'The session combines intraoral fascial release with external face, neck, and throat work. Clients typically report deeper sleep and reduced jaw tension within 24 hours of the first session.',

      'mas.f.cta': 'Book Massage',

      // Service: Sensory Energetics
      'mas.s.name': 'Sensory Energetics',
      'mas.s.meta': '90 minutes · A$305 · Signature',
      'mas.s.badge': 'Signature',
      'mas.s.p1': 'A 90-minute integrative session focused on the deep release of physical and emotional patterns stored in the nervous system. Inspired by ancient Eastern techniques, breathwork, body stimuli, and somatic awareness. The work activates the central nervous system directly.',
      'mas.s.p2': 'Involuntary tremors and natural neuromuscular reactions are normal during the session. They help the body discharge tension, regulate stress, and lower cortisol. The technique also supports neurotransmitters tied to well-being, focus, motivation, and pleasure (including dopamine).',
      'mas.s.p3': 'More than a body experience. The work crosses the connection between body, emotion, and mind. Clients leave with lightness, mental clarity, emotional balance, and a body that finally remembers what it feels like to switch off.',

      'mas.s.cta': 'Book Massage',

      'mas.combo.h': 'Book Somatic Facial and Somatic Corporal on the same day',
      'mas.combo.p': '5% off your total. Two hours. A lot less tension. Apply at checkout, or message Marina to coordinate timing.',

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
      'mas.price.h2': 'Single sessions and membership.',
      'mas.price.r1.name': 'Single session',
      'mas.price.r1.sub': 'Corporal or Facial · 60 min',
      'mas.price.r1.price': 'A$125',
      'mas.price.r2.name': 'Sensory Energetics',
      'mas.price.r2.sub': 'Signature · 90 min',
      'mas.price.r2.price': 'A$305',
      'mas.price.r3.name': 'Weekly membership',
      'mas.price.r3.sub': 'Fixed slot, same day and time, every week · min 2 months · cancel with 1 week notice · auto-renews',
      'mas.price.r3.price': 'A$100/week',
      'mas.price.book': 'Book Massage',
      'mas.price.mship': 'Talk to Marina about membership',
      'mas.price.mship.note': 'Membership is an invitation plan confirmed after your first session. The recurring slot is held by Marina personally, which is why it cannot be booked through Acuity. Message her on WhatsApp and she will confirm availability and your slot.',

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

      'tr.diff.label': 'What makes this different',
      'tr.diff.h2': 'Most trainers cannot see what is holding you back.<br>Marina can.',
      'tr.diff.p1': 'A standard trainer programs around a body they cannot fully assess. They see the lift. They cannot see the fascial chain that is shortening your range, capping your strength, or shifting load into the joint you are protecting without knowing it.',
      'tr.diff.p2': 'Marina trained in bodywork for ten years before she started taking PT clients. She sees restriction patterns no standard trainer sees. And she can address them inside the session, with hands-on release before the lift, mobility before the load, and breathwork before the next set.',
      'tr.diff.p3': 'The result is training that compounds. You are not lifting through restriction. You are building strength in the range your body actually has.',

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

      'tr.plans.label': 'Plans and pricing',
      'tr.plans.h2': 'Lock in your slot.<br>Lock in the result.',
      'tr.plans.sub': 'Each plan books direct on Acuity. Once paid, your slot is held for the full cycle.',

      'tr.plan.basic.name': 'Basic',
      'tr.plan.basic.price': 'A$570',
      'tr.plan.basic.per': 'A$95/session · 6 sessions',
      'tr.plan.basic.f1': '1x per week',
      'tr.plan.basic.f2': '45-day cycle',
      'tr.plan.basic.f3': 'Freeze 1 week (once per cycle)',
      'tr.plan.basic.f4': 'MFIT app programming included',

      'tr.plan.golden.name': 'Golden',
      'tr.plan.golden.price': 'A$1,020',
      'tr.plan.golden.per': 'A$85/session · 12 sessions',
      'tr.plan.golden.badge': 'Most popular',
      'tr.plan.golden.f1': '2x per week',
      'tr.plan.golden.f2': '2-month cycle',
      'tr.plan.golden.f3': 'Freeze 2 weeks',
      'tr.plan.golden.f4': 'MFIT app programming included',

      'tr.plan.diamond.name': 'Diamond',
      'tr.plan.diamond.price': 'A$1,800',
      'tr.plan.diamond.per': 'A$75/session · 24 sessions',
      'tr.plan.diamond.badge': 'Best value',
      'tr.plan.diamond.f1': '3x per week',
      'tr.plan.diamond.f2': '3-month cycle',
      'tr.plan.diamond.f3': 'Freeze 3 weeks',
      'tr.plan.diamond.f4': 'MFIT app programming included',

      'tr.plan.book': 'Book Training',
      'tr.plan.note': 'After booking, Marina will reach out within 24 hours to confirm your recurring schedule for the full plan period.',

      'tr.single.name': 'Single session',
      'tr.single.sub': 'No commitment. Try the work, see if it is what your body has been asking for.',
      'tr.single.price': 'A$99',
      'tr.single.cta': 'Book Training',

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
      'about.hero.meta': '18+ Years · Sydney',
      'about.bio.label': 'The story',
      'about.bio.h2': 'Eighteen years, two continents, one practice.',
      'about.bio.p1': 'Marina Ribeiro da Silva is a Physical Education professional with more than eighteen years dedicated to movement, health, and women\'s well-being. Movement and bodywork are not two careers. They are two sides of how a body changes.',
      'about.bio.p2': 'She started through dance, teaching from age fifteen. She studied Physical Education to professionalise what she had been doing intuitively since childhood. In Brazil she worked with the Minas Gerais government on Movimenta Contagem, the largest free outdoor physical-activity programme in the country.',
      'about.bio.p3': 'After the pandemic she founded Mulheres Ativas, a programme for women: particularly women over forty, mothers, and those who had never felt at home in a traditional gym. That line is the heart of her work. Most fitness spaces are not built for the bodies and lives most women actually have.',
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
      'about.letter.quote': '"I believe every woman deserves to feel at home in her own body. That is the work I do. With my hands, with breath, and with care. Whatever brings you here, you do not have to arrive ready. You only have to arrive."',
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
      'nav.menu': 'Menu',

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
      'home.hero.h1.b': 'Ganhe a força que fica.',
      'home.hero.h1.c': 'Uma especialista.',
      'home.hero.h1.d': 'Um sistema.',
      'home.hero.sub': 'Massagem somática, Sensory Energetics e personal training. Tudo conectado, com uma especialista só, pra um corpo que solta e ganha força ao mesmo tempo.',
      'home.hero.cta.massage': 'Agendar Massagem',
      'home.hero.cta.training': 'Agendar Treino',
      'home.hero.cta.talk': 'Não sabe por onde começar? Fala com a Marina primeiro →',

      // Home: combination
      'home.combo.label': 'O sistema',
      'home.combo.h2': 'A maioria dos terapeutas trata só o sintoma.<br>A maioria dos personal trainers treina por cima do que está travado.<br>A Marina solta o que está travado primeiro. Depois constrói força em cima de um corpo livre.',
      'home.combo.intro': 'Existe um motivo pra sua tensão voltar dias depois de uma boa massagem. E existe um motivo pro seu treino parar de evoluir, por mais que você se dedique. É o mesmo motivo. E a culpa não é sua.',
      'home.combo.c1.label': 'Só massagem',
      'home.combo.c1.h': 'A tensão alivia. Depois volta.',
      'home.combo.c1.p': 'A massagem comum trabalha o músculo. Mas por baixo do músculo tem a fáscia — o tecido fino que envolve tudo e segura o padrão de tensão no lugar. A massagem comum quase nunca chega lá. O corpo melhora por alguns dias. Depois trava de novo, no mesmo ponto. Porque nada mudou na forma como você se move.',
      'home.combo.c2.label': 'Só treino',
      'home.combo.c2.h': 'Você ganha força em cima de um corpo travado.',
      'home.combo.c2.p': 'Quando a fáscia está travada, o seu corpo dá um jeitinho — encontra outro caminho pra fazer o movimento. Você acaba treinando esses atalhos, em vez de ganhar força de verdade. A tensão fica ainda mais forte, porque o corpo se acomoda em volta dela. O platô não é problema de treino. É problema de tecido.',
      'home.combo.c3.label': 'O sistema Marina',
      'home.combo.c3.h': 'A liberação prepara o terreno. O treino constrói o que fica.',
      'home.combo.c3.p': 'A Marina solta a fáscia primeiro. O que estava travado vai embora. Depois, o treino constrói força no movimento que o seu corpo finalmente consegue fazer de verdade. Sessão após sessão, os dois se somam. A tensão não volta, porque não tem mais pra onde voltar. E a força fica, porque foi construída num corpo que finalmente se move.',
      'home.combo.close': 'Não é massagem de um lado e treino do outro. É o mesmo trabalho, feito por uma especialista que enxerga a conexão.',
      'home.combo.cta': 'Veja como as sessões funcionam →',

      // Home: services
      'home.svc.label': 'Serviços',
      'home.svc.h2': 'Três formas de começar.',
      'home.svc.s1.name': 'Sessões avulsas de massagem',
      'home.svc.s1.meta': '60-90 min · A partir de A$125',
      'home.svc.s1.p': 'Massagem Somática Corporal, Facial, ou a sessão assinatura Sensory Energetics de 90 minutos. Você marca quando precisar. Sem compromisso de continuar.',
      'home.svc.s1.cta': 'Agendar Massagem',
      'home.svc.s2.name': 'Plano semanal',
      'home.svc.s2.meta': 'A partir de A$100/semana · horário fixo toda semana',
      'home.svc.s2.p': 'O mesmo horário, toda semana, reservado direto pela Marina pra você. Plano por convite — depois da sua primeira sessão, ela confirma. Mínimo de 2 meses.',
      'home.svc.s2.cta': 'Falar com a Marina',
      'home.svc.s2.badge': 'Assinatura',
      'home.svc.s3.name': 'Treino',
      'home.svc.s3.meta': '60 min · A partir de A$75/sessão no plano',
      'home.svc.s3.p': 'Personal training com foco em movimento consciente. A Marina constrói força no corpo que você tem, respeitando o jeito como ele se move. Snap Fitness Maroubra.',
      'home.svc.s3.cta': 'Agendar Treino',

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
      'diag.stress.why': 'Quando o corpo não consegue desligar, o problema é o sistema nervoso — não só o músculo. O Sensory Energetics combina pressão em pontos-gatilho, respiração guiada e liberação somática pra alcançar a tensão que o seu sistema nervoso guarda há meses ou anos. As clientes saem mais soltas. E a maioria dorme bem melhor naquela noite.',
      'diag.stress.tags': 'Regulação do Sistema Nervoso · Respiração · Pontos-Gatilho',
      'diag.stress.cta': 'Agendar Massagem',
      'diag.training.name': 'Treino de Movimento Consciente',
      'diag.training.why': 'Quando o platô não muda nem mudando o treino, geralmente é problema de tecido. A fáscia travada reduz a amplitude que o seu corpo tem disponível, e isso trava o ganho de força. A Marina traz toda a formação dela em terapia corporal pra cada sessão de PT — solta o que está travado e já treina a amplitude liberada, na mesma hora.',
      'diag.training.tags': 'Treino em Cadeias Fasciais · Mobilidade · Respiração na Sessão',
      'diag.training.cta': 'Agendar Treino',

      // Social proof
      'home.proof.label': 'O que dizem as clientes',
      'home.proof.h2': 'Nas palavras delas.',
      'home.proof.t1.h': 'Ela se importa de verdade.',
      'home.proof.t1.q': 'Excelente personal trainer. Foi fundamental na minha jornada de construir confiança e força na academia. Adoro treinar com ela, e ela se importa de verdade. Recomendo muito a Marina!',
      'home.proof.t1.name': 'Jean',
      'home.proof.t2.h': 'Parece uma experiência completa.',
      'home.proof.t2.q': 'A Marina é genuinamente atenciosa e talentosa no que faz. Dá pra sentir que ela coloca o coração no trabalho. Estar no espaço dela é sempre uma experiência boa — os óleos essenciais, o ambiente, cada detalhe. Nunca parece que você está só pagando por um serviço, parece uma experiência completa. Recomendo muito!',
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
      'home.dq.d1.p': 'A Marina trabalha o tecido bem fundo, onde a tensão fica guardada. Você vai sentir coisas se mexendo no seu corpo. Se o que você quer é uma horinha de spa pra desligar, agenda em outro lugar e aproveita — sem julgamento nenhum.',
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
      'about.bio.pullquote': 'A maioria dos espaços de treino não foi feita pros corpos e pras vidas que as mulheres realmente têm.',
      'nf.label': 'Página não encontrada',
      'nf.h1': 'Esta página foi por outro caminho.',
      'nf.sub': 'Pode ter mudado de lugar, ou pode nunca ter existido. De qualquer forma, o trabalho continua aqui.',
      'nf.cta.home': 'Voltar para o início',
      'nf.cta.book': 'Agendar Massagem',
      'nf.next': 'Para onde agora?',
      'home.faq.h2': 'As perguntas que a Marina escuta toda semana.',
      'home.faq.q1': 'Por que a Marina combina terapia corporal com personal training?',
      'home.faq.a1': 'Porque os dois mexem com o mesmo sistema. A fáscia travada limita o seu movimento. Movimento limitado limita o seu resultado no treino. A formação da Marina permite trabalhar os dois lados na mesma sessão — sem você precisar marcar dois atendimentos separados.',
      'home.faq.q2': 'Preciso ter uma lesão ou diagnóstico específico pra agendar?',
      'home.faq.a2': 'Não. Algumas clientes chegam com dor crônica. Outras chegam porque querem mais energia, melhor postura, ou um resultado de treino mais firme. A Marina trabalha com tudo isso.',
      'home.faq.q3': 'O que acontece na primeira sessão?',
      'home.faq.a3': 'A Marina olha como o seu corpo está se movendo e onde está segurando tensão. Pergunta o que te trouxe ali e o que você já tentou antes. A sessão é montada a partir do que ela encontra em você — não é um protocolo igual pra todo mundo.',
      'home.faq.q4': 'Em quanto tempo vou sentir diferença?',
      'home.faq.a4': 'A maioria das clientes sente o corpo mais solto e o sono mais profundo nas 24 horas depois da primeira sessão. Tensão crônica de anos vai mudando de forma consistente em 3 a 5 sessões. Depois da primeira, a Marina te diz com honestidade quantas ela acha que o seu corpo vai precisar.',
      'home.faq.q5': 'A$125 é mais caro que uma massagem comum. Por quê?',
      'home.faq.a5': 'Sim, porque não é uma massagem comum. Cada sessão combina cinco técnicas especializadas que a maioria dos terapeutas nunca junta numa coisa só. Quem antes pagava fisio, massagem remedial e avaliação de movimento separados recebe o mesmo trabalho numa hora só. Se o que você quer é uma única sessão de relaxamento, a Marina não é a escolha certa. Se você quer tensão que realmente vai embora, ela é.',
      'home.faq.q6': 'As sessões têm cobertura de plano de saúde?',
      'home.faq.a6': 'Não. A Marina é especialista em terapia corporal e personal trainer — mas não é terapeuta remedial registrada nem fisioterapeuta. Se reembolso é prioridade pra você, agenda com uma terapeuta registrada. Honestidade pesa mais que o agendamento.',
      'home.faq.q7': 'E se não funcionar pra mim?',
      'home.faq.a7': 'Se a sua primeira sessão não for o que você esperava, manda mensagem pra Marina no WhatsApp em até 24 horas. Ela vai resolver: refaz a próxima sessão, te indica outra especialista mais adequada, ou devolve o valor. Sem formulários. Sem rodeios.',
      'home.faq.q8': 'Posso fazer massagem e treino com a Marina?',
      'home.faq.a8': 'Pode, e os resultados costumam vir mais rápido assim. A terapia corporal solta o que está travado, e o treino constrói força em cima. Muitas clientes começam com massagem e adicionam treino quando sentem o que muda no corpo com a fáscia liberada.',

      // Method page
      'method.hero.label': 'O método',
      'method.hero.h1': 'É tudo fáscia.',
      'method.hero.sub': 'A fáscia é o tecido fino que envolve cada músculo, órgão e nervo do seu corpo. Imagine um filme plástico em várias camadas, cobrindo tudo por dentro. Quando uma parte aperta, tudo que está conectado aperta junto. A maioria dos terapeutas trabalha o músculo e ignora a fáscia. Por isso a tensão sempre volta.',

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
      'method.why.p2.p3': '<strong>O que a Marina faz.</strong> É formada em TMJ Mastery e massagem bucal (por dentro da boca). Ela alcança a fáscia por dentro — onde o padrão de tensão fica realmente guardado.',
      'method.why.p3.label': 'Movimento travado',
      'method.why.p3.h': 'Uma amplitude que encolhe sem você notar.',
      'method.why.p3.p1': '<strong>Como aparece.</strong> Levantar o braço acima da cabeça fica difícil. O agachamento parece raso. O corpo trava de manhã e só solta depois do aquecimento.',
      'method.why.p3.p2': '<strong>Por que volta.</strong> Pontos colados na fáscia (aderências) limitam o quanto o músculo consegue se alongar. Alongamento sozinho não desfaz essas colagens.',
      'method.why.p3.p3': '<strong>O que a Marina faz.</strong> Liberação miofascial na sessão de terapia. Depois, treina a amplitude liberada no PT pra o seu corpo manter o ganho.',
      'method.why.p4.label': 'Platô no treino',
      'method.why.p4.h': 'Números que não andam.',
      'method.why.p4.p1': '<strong>Como aparece.</strong> Agachamento, levantamento terra ou supino travados na mesma carga há meses. Mudar a programação parou de ajudar.',
      'method.why.p4.p2': '<strong>Por que volta.</strong> O corpo se adapta em volta do bloqueio. Ele encontra outro caminho — e você acaba treinando esse atalho, não o movimento que está faltando de verdade.',
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
      'method.mod.m4.meta': '60 min · A partir de A$75/sessão no plano',
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
      'mas.hero.sub': 'Cinco técnicas especializadas. A Marina escolhe a combinação certa pro que o seu corpo está pedindo naquele dia. Não existe protocolo fixo — porque nenhum corpo chega no mesmo estado. A hora é construída a partir do que ela encontra em você.',

      'mas.svc.label': 'Os serviços',
      'mas.svc.h2': 'Três sessões.<br>Cinco técnicas.',

      'mas.c.name': 'Somatic Massage Corporal',
      'mas.c.meta': '60 minutos · A$125',
      'mas.c.p1': 'Metodologia desenvolvida pela Marina, juntando drenagem linfática brasileira, liberação miofascial, respiração guiada e relaxamento profundo numa única hora.',
      'mas.c.p2': 'Trabalha tensão muscular, retenção de líquidos, estresse físico acumulado e fáscia travada. À medida que a fáscia vai soltando, a circulação melhora, a mobilidade volta, a consciência do corpo cresce — e aquela sensação de leveza retorna.',
      'mas.c.p3': 'A camada de respiração guiada e relaxamento profundo regula o seu sistema nervoso e reduz o cortisol (o hormônio do estresse). É terapia corporal integrativa. Reconecta corpo e mente.',

      'mas.c.cta': 'Agendar Massagem',

      'mas.f.name': 'Somatic Massage Facial',
      'mas.f.meta': '60 minutos · A$125',
      'mas.f.p1': 'Pra disfunção da ATM, tensão na mandíbula, dor de cabeça tensional e sono ruim. A fáscia do rosto, da mandíbula e da garganta quase nunca é alcançada por fora. A Marina é uma das poucas profissionais em Sydney formada em massagem bucal (por dentro da boca) e TMJ Mastery.',
      'mas.f.p2': 'A sessão combina liberação fascial por dentro da boca com trabalho externo no rosto, pescoço e garganta. A maioria das clientes dorme melhor e sente a mandíbula bem mais solta em 24 horas depois da primeira sessão.',

      'mas.f.cta': 'Agendar Massagem',

      'mas.s.name': 'Sensory Energetics',
      'mas.s.meta': '90 minutos · A$305 · Assinatura',
      'mas.s.badge': 'Assinatura',
      'mas.s.p1': 'Sessão integrativa de 90 minutos focada em soltar, lá no fundo, os padrões físicos e emocionais que ficam guardados no sistema nervoso. Inspirada em técnicas ancestrais do Oriente, respiração guiada, estímulos no corpo e consciência somática. Ativa o sistema nervoso central de forma direta.',
      'mas.s.p2': 'Tremores involuntários e reações naturais no corpo podem aparecer durante a sessão — não se assuste se isso acontecer com você. Eles ajudam o corpo a descarregar tensão, regular o estresse e reduzir o cortisol. A técnica também ativa neurotransmissores ligados a bem-estar, foco, motivação e prazer (incluindo a dopamina).',
      'mas.s.p3': 'Mais do que uma experiência só corporal. O trabalho atravessa a conexão entre corpo, emoção e mente. As clientes saem com leveza, clareza mental, equilíbrio emocional, e um corpo que finalmente lembra como é desligar.',

      'mas.s.cta': 'Agendar Massagem',

      'mas.combo.h': 'Agende Somatic Facial e Somatic Corporal no mesmo dia',
      'mas.combo.p': '5% de desconto no total. Duas horas. Bem menos tensão. O desconto entra direto no checkout — ou manda mensagem pra Marina pra ela combinar os horários certinho com você.',

      'mas.choose.label': 'Como escolher',
      'mas.choose.h2': 'Três perguntas.<br>Uma sessão.',
      'mas.choose.c1.if': 'Se a massagem comum não está segurando o resultado',
      'mas.choose.c1.h': 'Somatic Corporal',
      'mas.choose.c1.p': 'A Marina trabalha a fáscia que está por baixo do músculo. O padrão de tensão se solta na origem — não só na superfície.',
      'mas.choose.c2.if': 'Se o problema é mandíbula, ATM ou dor de cabeça',
      'mas.choose.c2.h': 'Somatic Facial',
      'mas.choose.c2.p': 'Trabalho por dentro da boca e formação em TMJ. Alcança a fáscia onde a massagem externa não chega.',
      'mas.choose.c3.if': 'Se a tensão volta sempre, não importa o que você tente',
      'mas.choose.c3.h': 'Sensory Energetics',
      'mas.choose.c3.p': 'Feito pra tensão que o seu sistema nervoso guarda há meses ou anos. O trabalho assinatura de 90 minutos.',

      'mas.price.label': 'Preços',
      'mas.price.h2': 'Sessões avulsas e plano.',
      'mas.price.r1.name': 'Sessão avulsa',
      'mas.price.r1.sub': 'Corporal ou Facial · 60 min',
      'mas.price.r1.price': 'A$125',
      'mas.price.r2.name': 'Sensory Energetics',
      'mas.price.r2.sub': 'Assinatura · 90 min',
      'mas.price.r2.price': 'A$305',
      'mas.price.r3.name': 'Plano semanal',
      'mas.price.r3.sub': 'Mesmo dia e hora, toda semana · mínimo de 2 meses · cancela com 1 semana de aviso · renovação automática',
      'mas.price.r3.price': 'A$100/semana',
      'mas.price.book': 'Agendar Massagem',
      'mas.price.mship': 'Falar com a Marina sobre o plano',
      'mas.price.mship.note': 'O plano é por convite — é confirmado depois da sua primeira sessão. O horário fixo é reservado direto pela Marina, por isso não dá pra agendar pela Acuity. Manda mensagem pra ela no WhatsApp que ela confirma a disponibilidade e o seu horário.',

      'mas.faq.h2': 'Perguntas específicas sobre massagem.',
      'mas.faq.q1': 'O que eu devo vestir?',
      'mas.faq.a1': 'Pra Corporal: roupa íntima. A Marina usa lençóis e descobre só a parte do corpo que está trabalhando no momento. Pra Facial: chega como estiver, o trabalho é no rosto, pescoço, mandíbula e por dentro da boca. Pra Sensory Energetics: roupa solta e confortável, que te deixe se mover e respirar à vontade.',
      'mas.faq.q2': 'Posso usar plano de saúde?',
      'mas.faq.a2': 'Não. A Marina é especialista em terapia corporal — não é terapeuta remedial registrada. Por isso não tem reembolso. Se isso pesa mais que o trabalho pra você, agenda com uma terapeuta registrada.',
      'mas.faq.q3': 'Quantas sessões eu vou precisar?',
      'mas.faq.a3': 'A maioria das clientes sente uma diferença grande já depois da primeira sessão. Mudanças firmes em padrões crônicos costumam acontecer em 3 a 5 sessões. Depois da primeira, a Marina te diz com honestidade o que ela acha que o seu corpo precisa.',

      // Training page
      'tr.hero.label': 'Personal training',
      'tr.hero.h1': 'Treino que entende o seu corpo.',
      'tr.hero.sub': 'Personal training individual e especializado na Snap Fitness Maroubra. Cada sessão de 60 minutos é construída a partir do que a Marina vê no seu movimento — e do que a formação dela em terapia corporal permite trabalhar dentro da mesma hora.',
      'tr.hero.loc': 'Snap Fitness Maroubra · Ter + Qui 8h-18h · Seg/Qua/Sex 8h-11h · Você precisa ter matrícula ativa na Snap Fitness',

      'tr.diff.label': 'O que muda aqui',
      'tr.diff.h2': 'A maioria dos personal trainers não enxerga o que está te travando.<br>A Marina enxerga.',
      'tr.diff.p1': 'Um personal comum monta o treino em cima de um corpo que ele não consegue avaliar por completo. Ele vê você levantando o peso. Mas não enxerga a corrente de fáscia que está encurtando o seu movimento, limitando a sua força, ou jogando peso numa articulação que você está protegendo sem nem perceber.',
      'tr.diff.p2': 'A Marina passou dez anos estudando e trabalhando com terapia corporal antes de começar a atender em PT. Ela enxerga padrões de bloqueio que um personal comum não vê. E consegue trabalhar esses padrões dentro da sessão — liberação manual antes do levantamento, mobilidade antes da carga, e respiração antes da próxima série.',
      'tr.diff.p3': 'O resultado é treino que vai somando de verdade. Você não está levantando peso contra um bloqueio do seu corpo. Você está construindo força dentro do movimento que ele realmente tem.',

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

      'tr.plans.label': 'Planos e preços',
      'tr.plans.h2': 'Garante o seu horário.<br>Garante o seu resultado.',
      'tr.plans.sub': 'Cada plano é agendado direto na Acuity. Depois do pagamento, o seu horário fica reservado pra você pelo ciclo inteiro.',

      'tr.plan.basic.name': 'Basic',
      'tr.plan.basic.price': 'A$570',
      'tr.plan.basic.per': 'A$95/sessão · 6 sessões',
      'tr.plan.basic.f1': '1x por semana',
      'tr.plan.basic.f2': 'Ciclo de 45 dias',
      'tr.plan.basic.f3': 'Congela 1 semana (uma vez por ciclo)',
      'tr.plan.basic.f4': 'Programação no app MFIT incluída',

      'tr.plan.golden.name': 'Golden',
      'tr.plan.golden.price': 'A$1.020',
      'tr.plan.golden.per': 'A$85/sessão · 12 sessões',
      'tr.plan.golden.badge': 'Mais popular',
      'tr.plan.golden.f1': '2x por semana',
      'tr.plan.golden.f2': 'Ciclo de 2 meses',
      'tr.plan.golden.f3': 'Congela 2 semanas',
      'tr.plan.golden.f4': 'Programação no app MFIT incluída',

      'tr.plan.diamond.name': 'Diamond',
      'tr.plan.diamond.price': 'A$1.800',
      'tr.plan.diamond.per': 'A$75/sessão · 24 sessões',
      'tr.plan.diamond.badge': 'Melhor custo-benefício',
      'tr.plan.diamond.f1': '3x por semana',
      'tr.plan.diamond.f2': 'Ciclo de 3 meses',
      'tr.plan.diamond.f3': 'Congela 3 semanas',
      'tr.plan.diamond.f4': 'Programação no app MFIT incluída',

      'tr.plan.book': 'Agendar Treino',
      'tr.plan.note': 'Depois do agendamento, a Marina entra em contato em 24 horas pra confirmar o seu horário fixo durante o plano inteiro.',

      'tr.single.name': 'Sessão avulsa',
      'tr.single.sub': 'Sem compromisso. Experimenta o trabalho, sente se é o que o seu corpo está pedindo.',
      'tr.single.price': 'A$99',
      'tr.single.cta': 'Agendar Treino',

      'tr.outcomes.label': 'O que as clientes conquistam',
      'tr.outcomes.h2': 'Específico, não abstrato.',
      'tr.outcomes.o1.l': 'Mobilidade',
      'tr.outcomes.o1.p': 'Movimento que tinha sido dado como perdido volta.',
      'tr.outcomes.o2.l': 'Platô',
      'tr.outcomes.o2.p': 'Os números do treino voltam a andar.',
      'tr.outcomes.o3.l': 'Perimenopausa',
      'tr.outcomes.o3.p': 'Força e energia pra atravessar essa fase.',

      'tr.snap.h': 'Sobre a Snap Fitness Maroubra.',
      'tr.snap.p': 'Todas as sessões presenciais são na Snap Fitness Maroubra. Você precisa ter matrícula ativa na Snap Fitness antes da primeira sessão. A Marina é personal trainer independente — a academia não tem responsabilidade pelos serviços de PT.',

      // About page
      'about.hero.title': 'Profissional de Educação Física · Especialista em Terapia Corporal',
      'about.hero.meta': '18+ anos · Sydney',
      'about.bio.label': 'A história',
      'about.bio.h2': 'Dezoito anos, dois continentes, uma prática.',
      'about.bio.p1': 'Marina Ribeiro da Silva é profissional de Educação Física, com mais de dezoito anos dedicados ao movimento, à saúde e ao bem-estar das mulheres. Pra ela, movimento e terapia corporal não são duas carreiras. São dois lados de como um corpo muda.',
      'about.bio.p2': 'Começou pela dança, dando aulas desde os quinze anos. Estudou Educação Física pra profissionalizar o que já fazia intuitivamente desde criança. No Brasil, trabalhou com o governo de Minas Gerais no Movimenta Contagem — o maior programa gratuito de atividade física ao ar livre do país.',
      'about.bio.p3': 'Depois da pandemia fundou o Mulheres Ativas, um programa para mulheres — especialmente mulheres acima dos quarenta, mães, e as que nunca se sentiram em casa numa academia tradicional. Essa ideia é o coração do trabalho dela: a maioria dos espaços de fitness não foi feita pros corpos e pras vidas que a maioria das mulheres realmente tem.',
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
      'about.letter.quote': '"Acredito que toda mulher merece se sentir em casa no próprio corpo. É esse o meu trabalho. Com as minhas mãos, com a respiração e com cuidado. Seja o que for que te trouxe até aqui, você não precisa chegar pronta. Só precisa chegar."',
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
    if (!i18n[lang]) return;
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
    training: 'training.html'
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
      '<a class="btn btn--primary" href="' + ctaUrl + '"' +
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
