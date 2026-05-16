/* Marina Bodywork. Shared client logic
   i18n, language toggle, nav scroll state, mobile drawer,
   FAQ accordion, diagnostic widget, PT plan selector.
*/

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
      'nav.book': 'Book Now',
      'nav.langEn': 'EN',
      'nav.langPt': 'PT',
      'nav.menu': 'Menu',

      // Footer
      'footer.tag': 'Release your body. Live an extraordinary life.',
      'footer.col.links': 'Explore',
      'footer.col.contact': 'Contact',
      'footer.col.book': 'Book',
      'footer.faq': 'FAQ',
      'footer.bookMassage': 'Book Massage',
      'footer.bookPt': 'Book PT',
      'footer.address': 'Randwick, NSW',
      'footer.copy': '© 2026 Marina Bodywork. Sydney, Australia.',

      // Sticky CTA
      'sticky.massage': 'Book Massage',
      'sticky.pt': 'Book PT',
      'wa.float': 'Message Marina on WhatsApp',

      // ─── Home: hero ───
      'home.hero.label': 'Marina Ribeiro · Fascia release specialist · Sydney',
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
      'home.combo.h2': 'Most therapists treat the symptom. Most trainers work around the restriction. Marina removes it and builds on cleared ground.',
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
      'home.svc.s1.name': 'Somatic Massage',
      'home.svc.s1.meta': '60 min · From A$125',
      'home.svc.s1.p': 'Hands on the tissue that holds everything. For chronic neck, back, hip, and shoulder tension that keeps returning.',
      'home.svc.s1.cta': 'Book this session',
      'home.svc.s2.name': 'Sensory Energetics',
      'home.svc.s2.meta': '90 min · A$305',
      'home.svc.s2.p': 'For what standard massage has never reached. Nervous-system release. Marina\'s signature work.',
      'home.svc.s2.cta': 'Book this session',
      'home.svc.s2.badge': 'Signature',
      'home.svc.s3.name': 'Conscious Movement PT',
      'home.svc.s3.meta': '60 min · From A$75/session on plan',
      'home.svc.s3.p': 'Strength built on a body that can actually move. Snap Fitness Maroubra. Plans from A$75/session.',
      'home.svc.s3.cta': 'See training plans',

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
      'diag.neck.cta': 'Book this session',
      'diag.jaw.name': 'Somatic Massage Facial',
      'diag.jaw.why': 'TMJ tension and jaw clenching are held in the fascia of the face, neck, and throat. Marina is one of the few Sydney practitioners trained in buccal (inside-mouth) massage and TMJ Mastery. Clients typically report deeper sleep and reduced jaw tension within 24 hours.',
      'diag.jaw.tags': 'TMJ Mastery · Buccal Massage · Myofascial Release',
      'diag.jaw.cta': 'Book this session',
      'diag.back.name': 'Somatic Massage Corporal',
      'diag.back.why': 'Lower-back and hip tension is usually a fascial chain problem, not an isolated muscle problem. The restriction is often in the hip flexors, the thoracolumbar fascia, or the connection between them. Marina maps the chain and releases it at the source.',
      'diag.back.tags': 'Myofascial Release · Myo Aponeurosis · Somatic Release',
      'diag.back.cta': 'Book this session',
      'diag.stress.name': 'Sensory Energetics (90 min)',
      'diag.stress.why': 'When the body cannot switch off, the nervous system is the problem, not just the muscle. Sensory Energetics combines trigger-point work, guided breath, and somatic release to reach tension stored by the nervous system for months or years. Clients leave looser and most sleep deeper that night.',
      'diag.stress.tags': 'Nervous System Release · Breathwork · Trigger-Point',
      'diag.stress.cta': 'Book Sensory Energetics',
      'diag.training.name': 'Conscious Movement Personal Training',
      'diag.training.why': 'A training plateau that does not respond to programming changes is usually a tissue problem. Fascial restriction limits the range you can train in, which caps strength gains. Marina brings her bodywork qualifications into every PT session, addressing the restriction and training the cleared range in the same hour.',
      'diag.training.tags': 'Fascial Chain Training · Mobility · Breathwork in Session',
      'diag.training.cta': 'See training plans',

      // ─── Social proof ───
      'home.proof.label': 'What clients say',
      'home.proof.h2': 'Specific outcomes. Real bodies.',
      'home.proof.t1.h': 'Chronic neck tension gone. Three sessions.',
      'home.proof.t1.q': '"I had seen a physio and two different remedial massage therapists. The tension always came back within a week. After three sessions with Marina it has not returned."',
      'home.proof.t1.name': 'Sofia, 38',
      'home.proof.t2.h': 'Deeper sleep within 24 hours.',
      'home.proof.t2.q': '"I was sceptical about the Sensory Energetics. I slept eight hours straight that night. I had not done that in two years."',
      'home.proof.t2.name': 'Renata, 42',
      'home.proof.t3.h': 'Training plateau broken after six weeks.',
      'home.proof.t3.q': '"My squat had been stuck at the same weight for eight months. Marina found the restriction in my hip flexors in the first session. We trained around it and then through it. The numbers moved the following week."',
      'home.proof.t3.name': 'Helena, 35',
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
      'method.why.h2': 'Four symptoms. One source.',
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
      'method.mod.h2': 'Four tools. One body. Chosen for what your tissue needs that day.',
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
      'method.cta.book': 'Book a session',
      'method.cta.talk': 'Talk to Marina first →',

      // ─── Massage page ───
      'mas.hero.label': 'Massage services',
      'mas.hero.h1': 'This is not a standard massage.',
      'mas.hero.sub': 'Five specialist techniques. Marina chooses the combination your body responds to that day. There is no fixed protocol because no two bodies arrive in the same state. The hour is built around what she finds.',

      'mas.svc.label': 'The services',
      'mas.svc.h2': 'Three sessions. Five techniques.',

      // Service: Corporal
      'mas.c.name': 'Somatic Massage Corporal',
      'mas.c.meta': '60 minutes · A$125',
      'mas.c.p1': 'Marina-developed methodology integrating Brazilian lymphatic drainage, myofascial release, breathwork, and deep-relaxation work into one continuous hour.',
      'mas.c.p2': 'It addresses muscular tension, fluid retention, accumulated physical stress, and fascial rigidity. As the fascia releases, circulation, mobility, and body awareness improve and a sense of lightness returns.',
      'mas.c.p3': 'The breathwork and deep-relaxation layer regulates the central nervous system and lowers cortisol. This is integrative bodywork. It reconnects body and mind.',
      'mas.c.b1': 'Release of muscular and fascial tension',
      'mas.c.b2': 'Reduced fluid retention',
      'mas.c.b3': 'Better circulation and mobility',
      'mas.c.b4': 'Body awareness and sense of lightness',
      'mas.c.b5': 'Nervous-system regulation and lower cortisol',
      'mas.c.b6': 'Reduced accumulated physical and emotional stress',
      'mas.c.b7': 'Deep relaxation and improved well-being',
      'mas.c.b8': 'Integrative body-mind reconnection',
      'mas.c.cta': 'Book this session',

      // Service: Facial
      'mas.f.name': 'Somatic Massage Facial',
      'mas.f.meta': '60 minutes · A$125',
      'mas.f.p1': 'For TMJ, jaw tension, tension headaches, and disturbed sleep. The fascia of the face, jaw, and throat is rarely reachable from the outside. Marina is one of the few Sydney practitioners trained in buccal (inside-mouth) work and TMJ Mastery.',
      'mas.f.p2': 'The session combines intraoral fascial release with external face, neck, and throat work. Clients typically report deeper sleep and reduced jaw tension within 24 hours of the first session.',
      'mas.f.b1': 'Release of jaw and facial tension',
      'mas.f.b2': 'Relief from tension headaches',
      'mas.f.b3': 'Reduced bruxism and jaw clenching',
      'mas.f.b4': 'Improved sleep quality within 24 hours',
      'mas.f.b5': 'Better posture through neck and shoulders',
      'mas.f.b6': 'Lifted facial tone',
      'mas.f.b7': 'Stress and emotional load softened',
      'mas.f.b8': 'Released TMJ patterns held for years',
      'mas.f.cta': 'Book this session',

      // Service: Sensory Energetics
      'mas.s.name': 'Sensory Energetics',
      'mas.s.meta': '90 minutes · A$305 · Signature',
      'mas.s.badge': 'Signature',
      'mas.s.p1': 'A 90-minute integrative session focused on the deep release of physical and emotional patterns stored in the nervous system. Inspired by ancient Eastern techniques, breathwork, body stimuli, and somatic awareness. The work activates the central nervous system directly.',
      'mas.s.p2': 'Involuntary tremors and natural neuromuscular reactions are normal during the session. They help the body discharge tension, regulate stress, and lower cortisol. The technique also supports neurotransmitters tied to well-being, focus, motivation, and pleasure (including dopamine).',
      'mas.s.p3': 'More than a body experience. The work crosses the connection between body, emotion, and mind. Clients leave with lightness, mental clarity, emotional balance, and a body that finally remembers what it feels like to switch off.',
      'mas.s.b1': 'Nervous-system regulation',
      'mas.s.b2': 'Reduced physical and emotional stress',
      'mas.s.b3': 'Release of fascial and muscular tension',
      'mas.s.b4': 'Mental clarity and decision-making',
      'mas.s.b5': 'Deeper well-being and relaxation',
      'mas.s.b6': 'Creativity and bodily presence',
      'mas.s.b7': 'Emotional balance and sleep quality',
      'mas.s.b8': 'Expansion, lightness, reconnection with self',
      'mas.s.cta': 'Book Sensory Energetics',

      'mas.combo.h': 'Book Somatic Facial and Somatic Corporal on the same day',
      'mas.combo.p': '5% off your total. Two hours. A lot less tension. Apply at checkout, or message Marina to coordinate timing.',

      'mas.choose.label': 'How to choose',
      'mas.choose.h2': 'Three questions. One session.',
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
      'mas.price.book': 'Book a single session',
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
      'tr.hero.loc': 'Snap Fitness Maroubra · Tue + Thu 8am–6pm · Mon/Wed/Fri 8am–11am · Active Snap Fitness membership required',

      'tr.diff.label': 'What makes this different',
      'tr.diff.h2': 'Most trainers cannot see what is holding you back. Marina can.',
      'tr.diff.p1': 'A standard trainer programs around a body they cannot fully assess. They see the lift. They cannot see the fascial chain that is shortening your range, capping your strength, or shifting load into the joint you are protecting without knowing it.',
      'tr.diff.p2': 'Marina trained in bodywork for ten years before she started taking PT clients. She sees restriction patterns no standard trainer sees. And she can address them inside the session, with hands-on release before the lift, mobility before the load, and breathwork before the next set.',
      'tr.diff.p3': 'The result is training that compounds. You are not lifting through restriction. You are building strength in the range your body actually has.',

      'tr.struct.label': 'The 60-minute session',
      'tr.struct.h2': 'Five phases. Built around your body that day.',
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
      'tr.plans.h2': 'Lock in your slot. Lock in the result.',
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

      'tr.plan.book': 'Book this plan',

      'tr.single.name': 'Single session',
      'tr.single.sub': 'No commitment. Try the work, see if it is what your body has been asking for.',
      'tr.single.price': 'A$99',
      'tr.single.cta': 'Book a single session',

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

      'about.partner.label': 'Partnership',
      'about.partner.p': 'Marina runs workshops at Be Bold Sydney, a women\'s wellness collective founded by Paula Tomazetti. Somatic bodywork and nervous-system release, in person.',
      'about.partner.link': 'bebold.au →',

      'about.insta.h': 'Follow Marina\'s work.',
      'about.insta.p': 'Sessions, behind-the-scenes, and the methodology in motion.',
      'about.insta.cta': '@marinaribeiropersonal →',

      'about.cta.h': 'Ready to work with Marina?',
      'about.cta.p': 'Book a session, or message Marina first if you want her to recommend where to start.',
      'about.cta.book': 'Book a session',
      'about.cta.talk': 'Talk to Marina →'
    },

    pt: {
      // Nav
      'nav.method': 'Método',
      'nav.massage': 'Massagem',
      'nav.training': 'Treino',
      'nav.about': 'Sobre',
      'nav.book': 'Agendar',
      'nav.langEn': 'EN',
      'nav.langPt': 'PT',
      'nav.menu': 'Menu',

      // Footer
      'footer.tag': 'Libere seu corpo. Viva uma vida extraordinária.',
      'footer.col.links': 'Navegar',
      'footer.col.contact': 'Contato',
      'footer.col.book': 'Agendar',
      'footer.faq': 'Perguntas frequentes',
      'footer.bookMassage': 'Agendar Massagem',
      'footer.bookPt': 'Agendar PT',
      'footer.address': 'Randwick, NSW',
      'footer.copy': '© 2026 Marina Bodywork. Sydney, Austrália.',

      // Sticky CTA
      'sticky.massage': 'Massagem',
      'sticky.pt': 'Treino',
      'wa.float': 'Falar com a Marina no WhatsApp',

      // Home: hero
      'home.hero.label': 'Marina Ribeiro · Especialista em liberação fascial · Sydney',
      'home.hero.h1.a': 'Libere a restrição.',
      'home.hero.h1.b': 'Construa a força.',
      'home.hero.h1.c': 'Uma especialista.',
      'home.hero.h1.d': 'Um sistema.',
      'home.hero.sub': 'Liberação fascial, Sensory Energetics e treino de movimento consciente.',
      'home.hero.cta.massage': 'Agendar Massagem',
      'home.hero.cta.training': 'Agendar Treino',
      'home.hero.cta.talk': 'Não sabe por onde começar? Fala com a Marina primeiro →',

      // Home: combination
      'home.combo.label': 'O sistema',
      'home.combo.h2': 'A maioria dos terapeutas trata o sintoma. A maioria dos trainers trabalha em volta da restrição. A Marina remove e constrói em cima do que foi liberado.',
      'home.combo.intro': 'Tem um motivo para a tensão voltar depois de uma boa massagem. E um motivo para o treino bater num teto, não importa a dedicação. Os dois motivos são o mesmo. E não é culpa sua.',
      'home.combo.c1.label': 'Só massagem',
      'home.combo.c1.h': 'A tensão alivia. Depois volta.',
      'home.combo.c1.p': 'A massagem convencional trabalha o músculo. A fáscia por baixo, o tecido que mantém o padrão no lugar, raramente é alcançada. O corpo melhora por alguns dias. Depois volta exatamente para onde estava. Porque nada na forma como você se move mudou.',
      'home.combo.c2.label': 'Só treino',
      'home.combo.c2.h': 'Você fortalece em cima da restrição.',
      'home.combo.c2.p': 'Quando a fáscia está tensionada, os padrões de movimento compensam. Você treina essas compensações. A tensão fica mais forte porque o corpo se adapta ao redor dela, não através dela. O platô não é um problema de condicionamento. É um problema de tecido.',
      'home.combo.c3.label': 'O sistema Marina',
      'home.combo.c3.h': 'A liberação prepara o terreno. O treino constrói o que fica.',
      'home.combo.c3.p': 'A Marina trabalha a fáscia primeiro. A restrição libera. Depois o treino constrói força na amplitude que o seu corpo consegue realmente usar. Sessão a sessão os dois se potencializam. A tensão não volta porque não há mais padrão para voltar. A força fica porque foi construída num corpo que conseguia se mover.',
      'home.combo.close': 'Você não precisa de uma terapeuta e de uma personal. Você precisa de uma especialista que entenda que os dois são o mesmo trabalho.',
      'home.combo.cta': 'Veja como as sessões funcionam →',

      // Home: services
      'home.svc.label': 'Serviços',
      'home.svc.h2': 'Três formas de o trabalho aparecer.',
      'home.svc.s1.name': 'Massagem Somática',
      'home.svc.s1.meta': '60 min · A partir de A$125',
      'home.svc.s1.p': 'Mãos no tecido que sustenta tudo. Para tensão crônica em pescoço, costas, quadril e ombros que sempre volta.',
      'home.svc.s1.cta': 'Agendar essa sessão',
      'home.svc.s2.name': 'Sensory Energetics',
      'home.svc.s2.meta': '90 min · A$305',
      'home.svc.s2.p': 'Para o que a massagem convencional nunca alcançou. Liberação do sistema nervoso. O trabalho assinatura da Marina.',
      'home.svc.s2.cta': 'Agendar essa sessão',
      'home.svc.s2.badge': 'Assinatura',
      'home.svc.s3.name': 'Treino de Movimento Consciente',
      'home.svc.s3.meta': '60 min · A partir de A$75/sessão no plano',
      'home.svc.s3.p': 'Força construída num corpo que consegue realmente se mover. Snap Fitness Maroubra. Planos a partir de A$75/sessão.',
      'home.svc.s3.cta': 'Ver planos de treino',

      // Diagnostic
      'diag.label': 'Diagnóstico',
      'diag.h2': 'Onde seu corpo está pedindo ajuda?',
      'diag.sub': 'Escolha o que se encaixa. A Marina te conta como seria o trabalho.',
      'diag.tile.neck': 'Pescoço, ombros, parte superior das costas',
      'diag.tile.jaw': 'Mandíbula, ATM, dores de cabeça tensionais',
      'diag.tile.back': 'Lombar e quadril',
      'diag.tile.stress': 'Estresse, sono, não consegue desligar',
      'diag.tile.training': 'Platô no treino, mobilidade travada',

      'diag.neck.name': 'Somatic Massage Corporal',
      'diag.neck.why': 'Tensão crônica na parte superior do corpo é quase sempre fascial, não muscular. A massagem convencional trabalha a superfície. A Marina alcança o tecido conectivo por baixo, onde o padrão está guardado. A maioria das clientes sente a diferença na primeira sessão.',
      'diag.neck.tags': 'Liberação Miofascial · Liberação Somática · Blend personalizado',
      'diag.neck.cta': 'Agendar essa sessão',
      'diag.jaw.name': 'Somatic Massage Facial',
      'diag.jaw.why': 'A tensão na mandíbula e o bruxismo ficam guardados na fáscia do rosto, pescoço e garganta. A Marina é uma das poucas profissionais em Sydney com formação em massagem bucal e TMJ Mastery. A maioria das clientes relata sono mais profundo e menos tensão na mandíbula em 24 horas.',
      'diag.jaw.tags': 'TMJ Mastery · Massagem Bucal · Liberação Miofascial',
      'diag.jaw.cta': 'Agendar essa sessão',
      'diag.back.name': 'Somatic Massage Corporal',
      'diag.back.why': 'Tensão lombar e no quadril é quase sempre um problema de cadeia fascial, não de músculo isolado. A restrição costuma estar nos flexores do quadril, na fáscia toracolombar ou na conexão entre eles. A Marina mapeia a cadeia e libera na origem.',
      'diag.back.tags': 'Liberação Miofascial · Mio Aponeurose · Liberação Somática',
      'diag.back.cta': 'Agendar essa sessão',
      'diag.stress.name': 'Sensory Energetics (90 min)',
      'diag.stress.why': 'Quando o corpo não consegue desligar, o sistema nervoso é o problema, não só o músculo. O Sensory Energetics combina trigger-point, respiração guiada e liberação somática para alcançar a tensão guardada pelo sistema nervoso há meses ou anos. As clientes saem mais soltas e a maioria dorme melhor naquela noite.',
      'diag.stress.tags': 'Regulação do Sistema Nervoso · Respiração · Trigger-Point',
      'diag.stress.cta': 'Agendar Sensory Energetics',
      'diag.training.name': 'Treino de Movimento Consciente',
      'diag.training.why': 'Um platô que não responde a mudanças de programação geralmente é um problema de tecido. A restrição fascial limita a amplitude disponível para treinar, o que limita o ganho de força. A Marina traz suas qualificações em terapia corporal para cada sessão de PT, trabalhando a restrição e treinando a amplitude liberada na mesma hora.',
      'diag.training.tags': 'Treino em Cadeias Fasciais · Mobilidade · Respiração na Sessão',
      'diag.training.cta': 'Ver planos de treino',

      // Social proof
      'home.proof.label': 'O que dizem as clientes',
      'home.proof.h2': 'Resultados específicos. Corpos reais.',
      'home.proof.t1.h': 'Tensão crônica no pescoço foi embora. Três sessões.',
      'home.proof.t1.q': '"Eu já tinha passado por fisio e dois terapeutas diferentes de massagem. A tensão sempre voltava em uma semana. Depois de três sessões com a Marina ela não voltou mais."',
      'home.proof.t1.name': 'Sofia, 38',
      'home.proof.t2.h': 'Sono mais profundo em 24 horas.',
      'home.proof.t2.q': '"Estava cética sobre o Sensory Energetics. Dormi oito horas direto naquela noite. Não conseguia isso há dois anos."',
      'home.proof.t2.name': 'Renata, 42',
      'home.proof.t3.h': 'Platô no treino resolvido em seis semanas.',
      'home.proof.t3.q': '"Meu agachamento estava parado no mesmo peso havia oito meses. A Marina achou a restrição nos meus flexores do quadril na primeira sessão. Trabalhamos em volta e depois através dela. Os números mudaram na semana seguinte."',
      'home.proof.t3.name': 'Helena, 35',
      'home.proof.reviews': 'avaliações · Sydney →',

      // Disqualifiers
      'home.dq.label': 'Honesto',
      'home.dq.h2': 'Esse trabalho não é para todo mundo.',
      'home.dq.d1.h': 'Procura uma massagem de relaxamento.',
      'home.dq.d1.p': 'A Marina trabalha o tecido que segura o padrão. Você vai sentir coisas mudando. Se você queria uma hora de spa, agenda em outro lugar e aproveita.',
      'home.dq.d2.h': 'Precisa de reembolso de plano de saúde.',
      'home.dq.d2.p': 'A Marina é especialista em terapia corporal e personal trainer, não terapeuta remedial registrada. Sem cobertura. Procura uma terapeuta registrada se isso é prioridade.',
      'home.dq.d3.h': 'Quer um protocolo fixo a cada visita.',
      'home.dq.d3.p': 'Cada sessão é construída em torno do que a Marina encontra no seu corpo naquele dia. Semana diferente, trabalho diferente. Esse é o ponto.',
      'home.dq.d4.h': 'Quer uma personal que trate fitness isolado de tudo.',
      'home.dq.d4.p': 'A Marina treina o corpo inteiro, não só estética isolada. Se sua única métrica é o espelho, não é aqui.',

      // Consult
      'home.consult.h2': 'Não sabe qual sessão é certa para você?',
      'home.consult.p': 'Uma sessão de A$125 não é uma decisão para tomar a partir de uma página inicial. Manda mensagem para a Marina no WhatsApp. Ela vai perguntar com o que você está lidando, o que já tentou, e dizer honestamente se ela é a pessoa certa.',
      'home.consult.cta': 'Falar com a Marina no WhatsApp →',

      // FAQ
      'home.faq.label': 'Perguntas frequentes',
      'home.faq.h2': 'As perguntas que a Marina escuta toda semana.',
      'home.faq.q1': 'Por que a Marina combina terapia corporal com treino personalizado?',
      'home.faq.a1': 'Porque os dois trabalham no mesmo sistema. A restrição fascial limita o movimento. Movimento limitado limita resultados de treino. As qualificações da Marina permitem que ela trabalhe os dois em uma sessão, sem ter que marcar dois atendimentos separados.',
      'home.faq.q2': 'Preciso ter uma lesão ou diagnóstico específico para agendar?',
      'home.faq.a2': 'Não. Algumas clientes chegam com dor crônica. Outras chegam porque querem mais energia, melhor postura ou resultados de treino mais sólidos. A Marina trabalha com tudo isso.',
      'home.faq.q3': 'O que acontece na primeira sessão?',
      'home.faq.a3': 'A Marina avalia como o seu corpo está se movendo e onde segura tensão. Pergunta o que te trouxe ali e o que você já tentou antes. A sessão é construída a partir do que ela encontra, não um protocolo fixo aplicado em todas.',
      'home.faq.q4': 'Em quanto tempo vou sentir diferença?',
      'home.faq.a4': 'A maioria das clientes sente o corpo mais solto e o sono mais profundo nas 24 horas seguintes à primeira sessão. Tensão crônica acumulada por anos muda de forma significativa em 3 a 5 sessões. Depois da primeira a Marina te conta com honestidade quantas sessões ela acha que seu corpo vai precisar.',
      'home.faq.q5': 'A$125 é mais caro que uma massagem comum. Por quê?',
      'home.faq.a5': 'Sim, porque não é uma massagem comum. Cada sessão combina cinco técnicas especializadas que a maioria dos terapeutas nunca junta. Quem antes agendava fisio, massagem remedial e avaliação de movimento separados recebe o mesmo trabalho em uma hora. Se você precisa de uma única sessão de relaxamento, a Marina não é a escolha certa. Se precisa de tensão que realmente se solta, é.',
      'home.faq.q6': 'As sessões têm cobertura de plano de saúde?',
      'home.faq.a6': 'Não. A Marina é especialista em terapia corporal e personal trainer, não terapeuta remedial registrada nem fisioterapeuta. Se reembolso de plano é prioridade, agenda com uma terapeuta registrada. Honestidade pesa mais que o agendamento.',
      'home.faq.q7': 'E se não funcionar para mim?',
      'home.faq.a7': 'Se a primeira sessão não for o que você esperava, manda mensagem para a Marina no WhatsApp em até 24 horas. Ela vai resolver: refaz a próxima sessão, encaminha para outra especialista mais adequada ou devolve o valor. Sem formulários. Sem rodeios.',
      'home.faq.q8': 'Posso fazer tanto massagem quanto treino com a Marina?',
      'home.faq.a8': 'Sim, e os resultados costumam vir mais rápido. A terapia corporal remove restrições e o treino constrói em cima. Muitas clientes começam com massagem e adicionam treino quando sentem o que muda com a fáscia liberada.',

      // Method page
      'method.hero.label': 'O método',
      'method.hero.h1': 'É tudo fáscia.',
      'method.hero.sub': 'Fáscia é o tecido em volta de cada músculo, órgão e nervo do corpo. Pense em filme plástico, em camadas, cobrindo tudo. Quando uma parte tensiona, tudo que está conectado tensiona junto. A maioria dos terapeutas trabalha o músculo e ignora a fáscia. Por isso a tensão volta.',

      'method.why.label': 'Por que a fáscia importa',
      'method.why.h2': 'Quatro sintomas. Uma só origem.',
      'method.why.p1.label': 'Pescoço + Costas superiores',
      'method.why.p1.h': 'Dor que volta em poucos dias.',
      'method.why.p1.p1': '<strong>Como aparece.</strong> Aperto no trapézio, rotação do pescoço limitada, dor de cabeça que sobe ao longo do dia.',
      'method.why.p1.p2': '<strong>Por que volta.</strong> A fáscia da parte superior das costas é uma lâmina contínua. Trabalhar só o músculo deixa a lâmina contraída. O músculo tensiona de novo para acompanhar.',
      'method.why.p1.p3': '<strong>O que a Marina faz.</strong> Libera a fáscia toracolombar e cervical juntas. O sistema relaxa como uma peça única.',
      'method.why.p2.label': 'Mandíbula + ATM',
      'method.why.p2.h': 'Tensão que te acompanha até o sono.',
      'method.why.p2.p1': '<strong>Como aparece.</strong> Bruxismo, dor de cabeça tensional, sono ruim, dor ao acordar.',
      'method.why.p2.p2': '<strong>Por que volta.</strong> A mandíbula é sustentada por fáscia dentro da boca e ao longo da garganta. A massagem externa não chega lá.',
      'method.why.p2.p3': '<strong>O que a Marina faz.</strong> Formação em TMJ Mastery e massagem bucal (intraoral). Ela alcança a fáscia por dentro, onde o padrão realmente está guardado.',
      'method.why.p3.label': 'Restrição de movimento',
      'method.why.p3.h': 'Uma amplitude que encolhe sem você notar.',
      'method.why.p3.p1': '<strong>Como aparece.</strong> Levantar o braço acima da cabeça fica difícil. O agachamento parece raso. O corpo trava de manhã e só melhora depois do aquecimento.',
      'method.why.p3.p2': '<strong>Por que volta.</strong> Aderências fasciais limitam o comprimento que o músculo consegue produzir. Alongamento sozinho não quebra aderência.',
      'method.why.p3.p3': '<strong>O que a Marina faz.</strong> Liberação miofascial na sessão de terapia. Depois treina a amplitude liberada no PT para o corpo manter.',
      'method.why.p4.label': 'Platô no treino',
      'method.why.p4.h': 'Números que não andam.',
      'method.why.p4.p1': '<strong>Como aparece.</strong> Agachamento, levantamento terra ou supino travados na mesma carga há meses. Mudanças de programação pararam de ajudar.',
      'method.why.p4.p2': '<strong>Por que volta.</strong> O corpo se adapta em volta da restrição, compensando. Você treina a compensação, não a amplitude que falta.',
      'method.why.p4.p3': '<strong>O que a Marina faz.</strong> Identifica a cadeia fascial que segura a compensação. Libera. Treina a nova amplitude com carga.',

      'method.mod.label': 'As modalidades',
      'method.mod.h2': 'Quatro ferramentas. Um corpo. Escolhidas pelo que o seu tecido precisa naquele dia.',
      'method.mod.m1.h': 'Massagem Somática',
      'method.mod.m1.meta': '60 min · A$125',
      'method.mod.m1.p': 'Metodologia desenvolvida pela Marina, combinando liberação miofascial, drenagem linfática brasileira, respiração e relaxamento profundo. Resolve: tensão muscular crônica, retenção de líquidos, rigidez fascial, estresse físico acumulado.',
      'method.mod.m2.h': 'KSE Sensory Energetics',
      'method.mod.m2.meta': '90 min · A$305 · Assinatura',
      'method.mod.m2.p': 'Método integrativo que ativa o sistema nervoso central por meio de técnicas ancestrais, respiração e estímulos somáticos. Resolve: desregulação do sistema nervoso, tensão guardada pelo corpo há meses ou anos, padrões de ansiedade armazenados no tecido.',
      'method.mod.m3.h': 'Movimento Consciente',
      'method.mod.m3.meta': 'Em todas as sessões',
      'method.mod.m3.p': 'Respiração, consciência somática e mobilidade integradas em cada sessão de terapia corporal e treino. Resolve: o espaço entre se sentir mais solta na maca e se mover diferente depois.',
      'method.mod.m4.h': 'Personal Training',
      'method.mod.m4.meta': '60 min · A partir de A$75/sessão no plano',
      'method.mod.m4.p': 'Treino especializado 1-a-1 na Snap Fitness Maroubra, construído a partir do que as suas sessões de terapia revelam. Resolve: platôs no treino, limites de mobilidade, força e energia na perimenopausa e menopausa, consciência corporal.',

      'method.combo.label': 'A combinação',
      'method.combo.h2': 'Duas metades de uma só prática.',
      'method.combo.p1': 'A maioria dos profissionais escolhe um lado. Terapeutas liberam tensão e mandam você para casa. Trainers constroem força e supõem que o tecido se resolve sozinho.',
      'method.combo.p2': 'A Marina se formou nos dois porque são o mesmo trabalho. A terapia corporal remove a restrição. O treino constrói força na amplitude que a liberação acabou de abrir. Sem a terapia, o treino cristaliza a compensação. Sem o treino, a terapia libera um corpo que tensiona de novo em torno dos hábitos antigos.',
      'method.combo.p3': 'A maioria das clientes começa com massagem. Depois de duas ou três sessões, quando sentem o que o corpo realmente consegue fazer, adicionam o treino. Os dois se somam. O trabalho fica.',
      'method.combo.cta.massage': 'Ver serviços de massagem',
      'method.combo.cta.training': 'Ver planos de treino',

      'method.res.label': 'A pesquisa',
      'method.res.h2': 'Por que o corpo guarda o que guarda.',
      'method.res.s1.num': '8 / 10',
      'method.res.s1.l': 'Australianos adultos terão tensão crônica no pescoço ou nas costas este ano.',
      'method.res.s1.src': 'Australian Institute of Health and Welfare',
      'method.res.s2.num': '15%',
      'method.res.s2.l': 'dos adultos têm disfunção da ATM. A maioria nunca recebe tratamento direto.',
      'method.res.s2.src': 'National Institute of Dental and Craniofacial Research',
      'method.res.s3.num': '85%',
      'method.res.s3.l': 'da dor musculoesquelética crônica envolve pontos-gatilho miofasciais.',
      'method.res.s3.src': 'Journal of Bodywork and Movement Therapies',
      'method.res.s4.num': '1 / 3',
      'method.res.s4.l': 'dos australianos relata sintomas de estresse guardados fisicamente no corpo.',
      'method.res.s4.src': 'Australian Psychological Society',

      'method.cta.h2': 'Pronta para sentir a diferença?',
      'method.cta.p': 'Comece com uma sessão. Em uma hora você vai saber se esse é o trabalho certo.',
      'method.cta.book': 'Agendar sessão',
      'method.cta.talk': 'Falar com a Marina primeiro →',

      // Massage page
      'mas.hero.label': 'Serviços de massagem',
      'mas.hero.h1': 'Isto não é uma massagem comum.',
      'mas.hero.sub': 'Cinco técnicas especializadas. A Marina escolhe a combinação que o seu corpo responde naquele dia. Não tem protocolo fixo porque nenhum corpo chega no mesmo estado. A hora é construída a partir do que ela encontra.',

      'mas.svc.label': 'Os serviços',
      'mas.svc.h2': 'Três sessões. Cinco técnicas.',

      'mas.c.name': 'Somatic Massage Corporal',
      'mas.c.meta': '60 minutos · A$125',
      'mas.c.p1': 'Metodologia desenvolvida pela Marina integrando drenagem linfática brasileira, liberação miofascial, respiração e relaxamento profundo em uma hora contínua.',
      'mas.c.p2': 'Trabalha tensão muscular, retenção de líquidos, estresse físico acumulado e rigidez fascial. Conforme a fáscia libera, circulação, mobilidade e consciência corporal melhoram e volta a sensação de leveza.',
      'mas.c.p3': 'A camada de respiração e relaxamento profundo regula o sistema nervoso central e reduz o cortisol. É terapia corporal integrativa. Reconecta corpo e mente.',
      'mas.c.b1': 'Liberação de tensão muscular e fascial',
      'mas.c.b2': 'Redução de retenção de líquidos',
      'mas.c.b3': 'Melhor circulação e mobilidade',
      'mas.c.b4': 'Consciência corporal e sensação de leveza',
      'mas.c.b5': 'Regulação do sistema nervoso e redução de cortisol',
      'mas.c.b6': 'Redução de estresse físico e emocional acumulado',
      'mas.c.b7': 'Relaxamento profundo e bem-estar',
      'mas.c.b8': 'Reconexão integrativa corpo-mente',
      'mas.c.cta': 'Agendar essa sessão',

      'mas.f.name': 'Somatic Massage Facial',
      'mas.f.meta': '60 minutos · A$125',
      'mas.f.p1': 'Para ATM, tensão na mandíbula, dor de cabeça tensional e sono ruim. A fáscia do rosto, mandíbula e garganta raramente é alcançada externamente. A Marina é uma das poucas profissionais em Sydney com formação em massagem bucal (intraoral) e TMJ Mastery.',
      'mas.f.p2': 'A sessão combina liberação fascial intraoral com trabalho externo de rosto, pescoço e garganta. A maioria das clientes relata sono mais profundo e menos tensão na mandíbula em 24 horas após a primeira sessão.',
      'mas.f.b1': 'Liberação de tensão na mandíbula e no rosto',
      'mas.f.b2': 'Alívio de dor de cabeça tensional',
      'mas.f.b3': 'Redução de bruxismo',
      'mas.f.b4': 'Sono mais profundo em 24 horas',
      'mas.f.b5': 'Postura melhor no pescoço e ombros',
      'mas.f.b6': 'Rosto mais firme e tonificado',
      'mas.f.b7': 'Carga emocional aliviada',
      'mas.f.b8': 'Padrões de ATM guardados há anos finalmente liberados',
      'mas.f.cta': 'Agendar essa sessão',

      'mas.s.name': 'Sensory Energetics',
      'mas.s.meta': '90 minutos · A$305 · Assinatura',
      'mas.s.badge': 'Assinatura',
      'mas.s.p1': 'Sessão integrativa de 90 minutos focada na liberação profunda de padrões físicos e emocionais armazenados no sistema nervoso. Inspirado em técnicas ancestrais do Oriente, respiração, estímulos corporais e consciência somática. Ativa o sistema nervoso central diretamente.',
      'mas.s.p2': 'Tremores involuntários e reações neuromusculares naturais são normais durante a sessão. Eles ajudam o corpo a descarregar a tensão, regular o estresse e reduzir o cortisol. A técnica também apoia neurotransmissores ligados ao bem-estar, foco, motivação e prazer (incluindo a dopamina).',
      'mas.s.p3': 'Mais do que uma experiência corporal. O trabalho atravessa a conexão entre corpo, emoção e mente. As clientes saem com leveza, clareza mental, equilíbrio emocional e um corpo que finalmente lembra como é desligar.',
      'mas.s.b1': 'Regulação do sistema nervoso',
      'mas.s.b2': 'Redução de estresse físico e emocional',
      'mas.s.b3': 'Liberação de tensão fascial e muscular',
      'mas.s.b4': 'Clareza mental e tomada de decisão',
      'mas.s.b5': 'Bem-estar profundo e relaxamento',
      'mas.s.b6': 'Criatividade e presença corporal',
      'mas.s.b7': 'Equilíbrio emocional e qualidade do sono',
      'mas.s.b8': 'Expansão, leveza, reconexão consigo mesma',
      'mas.s.cta': 'Agendar Sensory Energetics',

      'mas.combo.h': 'Agende Somatic Facial e Somatic Corporal no mesmo dia',
      'mas.combo.p': '5% de desconto no total. Duas horas. Bem menos tensão. Aplica no checkout, ou manda mensagem para a Marina coordenar o horário.',

      'mas.choose.label': 'Como escolher',
      'mas.choose.h2': 'Três perguntas. Uma sessão.',
      'mas.choose.c1.if': 'Se a massagem remedial comum não está segurando',
      'mas.choose.c1.h': 'Somatic Corporal',
      'mas.choose.c1.p': 'A Marina trabalha a fáscia por baixo do músculo. O padrão libera na origem, não na superfície.',
      'mas.choose.c2.if': 'Se mandíbula, ATM ou dor de cabeça',
      'mas.choose.c2.h': 'Somatic Facial',
      'mas.choose.c2.p': 'Trabalho intraoral e formação em TMJ. Alcança a fáscia que a massagem externa não consegue.',
      'mas.choose.c3.if': 'Se a tensão volta sempre, não importa o quê',
      'mas.choose.c3.h': 'Sensory Energetics',
      'mas.choose.c3.p': 'Feito para tensão guardada pelo sistema nervoso por meses ou anos. O trabalho assinatura de 90 minutos.',

      'mas.price.label': 'Preços',
      'mas.price.h2': 'Sessões avulsas e plano.',
      'mas.price.r1.name': 'Sessão avulsa',
      'mas.price.r1.sub': 'Corporal ou Facial · 60 min',
      'mas.price.r1.price': 'A$125',
      'mas.price.r2.name': 'Sensory Energetics',
      'mas.price.r2.sub': 'Assinatura · 90 min',
      'mas.price.r2.price': 'A$305',
      'mas.price.r3.name': 'Plano semanal',
      'mas.price.r3.sub': 'Horário fixo, mesmo dia e hora, toda semana · mínimo de 2 meses · cancela com 1 semana de aviso · renovação automática',
      'mas.price.r3.price': 'A$100/semana',
      'mas.price.book': 'Agendar sessão avulsa',
      'mas.price.mship': 'Falar com a Marina sobre o plano',
      'mas.price.mship.note': 'O plano é por convite, confirmado depois da primeira sessão. O horário fixo é reservado pessoalmente pela Marina, por isso não passa pela Acuity. Manda mensagem no WhatsApp que ela confirma disponibilidade e o seu horário.',

      'mas.faq.h2': 'Perguntas específicas sobre massagem.',
      'mas.faq.q1': 'O que devo vestir?',
      'mas.faq.a1': 'Corporal: roupa íntima. A Marina usa lençóis e trabalha por baixo deles quando apropriado. Facial: chega como estiver, o trabalho é no rosto, pescoço, mandíbula e dentro da boca. Sensory Energetics: roupa solta e confortável que permita se mover e respirar.',
      'mas.faq.q2': 'Posso usar plano de saúde?',
      'mas.faq.a2': 'Não. A Marina é especialista em terapia corporal, não terapeuta remedial registrada. Sem reembolso. Se isso pesa mais que o trabalho, agenda com uma terapeuta registrada.',
      'mas.faq.q3': 'Quantas sessões vou precisar?',
      'mas.faq.a3': 'A maioria sente uma diferença grande depois da primeira sessão e mudança consistente em padrões crônicos em 3 a 5 sessões. Depois da primeira a Marina te diz honestamente o que ela acha que seu corpo precisa.',

      // Training page
      'tr.hero.label': 'Personal training',
      'tr.hero.h1': 'Treino que entende o seu corpo.',
      'tr.hero.sub': 'Personal training especializado 1-a-1 na Snap Fitness Maroubra. Cada sessão de 60 minutos é construída a partir do que a Marina vê no seu movimento e do que as qualificações em terapia corporal dela permitem trabalhar na mesma hora.',
      'tr.hero.loc': 'Snap Fitness Maroubra · Ter + Qui 8h–18h · Seg/Qua/Sex 8h–11h · Necessário ter matrícula ativa na Snap Fitness',

      'tr.diff.label': 'O que muda aqui',
      'tr.diff.h2': 'A maioria dos trainers não enxerga o que está te travando. A Marina enxerga.',
      'tr.diff.p1': 'Um trainer comum programa em cima de um corpo que ele não consegue avaliar por completo. Ele vê o levantamento. Não vê a cadeia fascial que está encurtando a sua amplitude, limitando a força, ou jogando carga numa articulação que você protege sem perceber.',
      'tr.diff.p2': 'A Marina se formou em terapia corporal por dez anos antes de começar a atender em PT. Ela enxerga padrões de restrição que um trainer comum não vê. E consegue trabalhá-los dentro da sessão, com liberação manual antes do levantamento, mobilidade antes da carga, e respiração antes da próxima série.',
      'tr.diff.p3': 'O resultado é treino que se acumula. Você não está levantando contra a restrição. Você está construindo força na amplitude que o seu corpo realmente tem.',

      'tr.struct.label': 'A sessão de 60 minutos',
      'tr.struct.h2': 'Cinco fases. Construídas em torno do seu corpo naquele dia.',
      'tr.struct.s1': 'Alongamento, ativação muscular, liberação miofascial',
      'tr.struct.s2': 'Fundamentos de mobilidade e consciência corporal',
      'tr.struct.s3': 'Treino específico para o seu objetivo',
      'tr.struct.s4': 'Fortalecimento, estabilidade, condicionamento',
      'tr.struct.s5': 'Relaxamento muscular e respiração',

      'tr.spec.label': 'Áreas de especialidade',
      'tr.spec.h2': 'Onde a Marina trabalha mais a fundo.',
      'tr.spec.s1': 'Hipertrofia',
      'tr.spec.s2': 'Condicionamento físico',
      'tr.spec.s3': 'Mobilidade e postura',
      'tr.spec.s4': 'Força e estabilidade',
      'tr.spec.s5': 'Perimenopausa e menopausa',
      'tr.spec.s6': 'Bem-estar mente-corpo',

      'tr.plans.label': 'Planos e preços',
      'tr.plans.h2': 'Reserve o seu horário. Reserve o seu resultado.',
      'tr.plans.sub': 'Cada plano é agendado direto na Acuity. Após o pagamento, o seu horário fica reservado para o ciclo inteiro.',

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

      'tr.plan.book': 'Agendar esse plano',

      'tr.single.name': 'Sessão avulsa',
      'tr.single.sub': 'Sem compromisso. Experimente o trabalho, veja se é o que o seu corpo está pedindo.',
      'tr.single.price': 'A$99',
      'tr.single.cta': 'Agendar sessão avulsa',

      'tr.outcomes.label': 'O que as clientes conquistam',
      'tr.outcomes.h2': 'Específico, não abstrato.',
      'tr.outcomes.o1.l': 'Mobilidade',
      'tr.outcomes.o1.p': 'Amplitude que tinha sido dada como perdida volta.',
      'tr.outcomes.o2.l': 'Platô',
      'tr.outcomes.o2.p': 'Os números do treino voltam a andar.',
      'tr.outcomes.o3.l': 'Perimenopausa',
      'tr.outcomes.o3.p': 'Força e energia atravessam a transição.',

      'tr.snap.h': 'Sobre a Snap Fitness Maroubra.',
      'tr.snap.p': 'Todas as sessões presenciais são na Snap Fitness Maroubra. É necessário ter matrícula ativa na Snap Fitness antes da primeira sessão. A Marina é trainer independente. A academia não tem responsabilidade pelos serviços de PT.',

      // About page
      'about.hero.title': 'Profissional de Educação Física · Especialista em Terapia Corporal',
      'about.hero.meta': '18+ anos · Sydney',
      'about.bio.label': 'A história',
      'about.bio.h2': 'Dezoito anos, dois continentes, uma prática.',
      'about.bio.p1': 'Marina Ribeiro da Silva é profissional de Educação Física com mais de dezoito anos dedicados ao movimento, à saúde e ao bem-estar das mulheres. Movimento e terapia corporal não são duas carreiras. São dois lados de como um corpo muda.',
      'about.bio.p2': 'Começou pela dança, dando aulas desde os quinze anos. Estudou Educação Física para profissionalizar o que já fazia intuitivamente desde criança. No Brasil trabalhou com o governo de Minas Gerais no Movimenta Contagem, o maior programa gratuito de atividade física ao ar livre do país.',
      'about.bio.p3': 'Depois da pandemia fundou o Mulheres Ativas, um programa para mulheres: especialmente mulheres acima dos quarenta, mães, e as que nunca se sentiram em casa numa academia tradicional. Essa frase é o coração do trabalho dela. A maioria dos espaços de fitness não é feita para os corpos e as vidas que a maioria das mulheres realmente tem.',
      'about.bio.p4': 'Em Sydney ela é especialista em treino feminino em todas as fases da vida, incluindo perimenopausa: condicionamento, hipertrofia, mobilidade, postura, consciência corporal, qualidade de vida. Em mais de dez anos de terapia corporal desenvolveu a própria técnica de liberação fascial combinando respiração, consciência somática e liberação miofascial. É a base de cada sessão que ela conduz.',

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

      'about.partner.label': 'Parceria',
      'about.partner.p': 'A Marina conduz workshops no Be Bold Sydney, um coletivo de bem-estar feminino fundado pela Paula Tomazetti. Terapia corporal somática e liberação do sistema nervoso, presencialmente.',
      'about.partner.link': 'bebold.au →',

      'about.insta.h': 'Acompanhe o trabalho da Marina.',
      'about.insta.p': 'Sessões, bastidores e a metodologia em movimento.',
      'about.insta.cta': '@marinaribeiropersonal →',

      'about.cta.h': 'Pronta para trabalhar com a Marina?',
      'about.cta.p': 'Agende uma sessão, ou manda mensagem primeiro se quiser que ela recomende por onde começar.',
      'about.cta.book': 'Agendar sessão',
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
  // Boot
  // ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initNav();
    initFaq();
    initDiag();
    initReveal();
  });
})();
