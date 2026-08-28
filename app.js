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
      'nav.massage': 'Services',
      'nav.membership': 'Membership',
      'nav.training': 'Smart Training',
      'nav.about': 'About Me',
      'nav.bookMassage': 'Book Membership',
      'nav.bookTraining': 'Book One Session',
      'nav.menu': 'Open menu',

      'mem.hero.label': 'Membership',
      'mem.hero.h1': 'Consistency changes the way your body feels.',
      'mem.hero.sub': 'Choose the level of ongoing care that works for you. Exclusive member rates, priority booking, and a body that keeps building on the last session.',
      'mem.compare.label': 'Two levels of care',
      'mem.compare.h2': 'Emerald and Diamond.',
      'mem.emerald.name': 'Emerald',
      'mem.emerald.sub': 'Membership',
      'mem.emerald.price': 'A$1,070 · 10 sessions',
      'mem.emerald.f1': '10 sessions',
      'mem.emerald.f2': 'Individual membership',
      'mem.emerald.f3': 'Choose up to 2 eligible services',
      'mem.emerald.f4': 'KSE Sensory Energetics is not included in the service selection',
      'mem.emerald.f5': 'Priority booking',
      'mem.emerald.f6': 'Exclusive member rate',
      'mem.emerald.f7': 'Personalised ongoing care',
      'mem.emerald.cta': 'Choose Emerald →',
      'mem.diamond.name': 'Diamond',
      'mem.diamond.sub': 'Membership',
      'mem.diamond.price': 'A$1,780 · 20 sessions',
      'mem.diamond.f1': '20 sessions',
      'mem.diamond.f2': 'Access to all eligible bodywork services',
      'mem.diamond.f3': 'Includes KSE Sensory Energetics',
      'mem.diamond.f4': 'Greater treatment flexibility',
      'mem.diamond.f5': 'Priority booking',
      'mem.diamond.f6': 'Exclusive member rate',
      'mem.diamond.f7': 'Can be shared by up to 2 people',
      'mem.diamond.cta': 'Choose Diamond →',
      'mem.terms.label': 'The details',
      'mem.terms.h2': 'Membership terms.',
      'mem.terms.t1.q': 'Payment',
      'mem.terms.t1.a': 'Payment is by bank transfer or cash, arranged directly with Marina on WhatsApp. The full membership is settled before your first session.',
      'mem.terms.t2.q': 'Validity',
      'mem.terms.t2.a': 'Each membership is valid for up to 12 weeks. Emerald is 10 sessions at 1 per week; Diamond is 20 sessions at 2 per week.',
      'mem.terms.t3.q': 'Booking',
      'mem.terms.t3.a': 'After you join, message Marina on WhatsApp to reserve your sessions. Priority booking is included for members, so your preferred times are held first.',
      'mem.terms.t4.q': 'Freeze',
      'mem.terms.t4.a': 'You can freeze your membership for up to 2 weeks. The freeze does not add extra sessions, it only extends your window to complete the 10 or 20 sessions.',
      'mem.terms.t5.q': 'Sharing',
      'mem.terms.t5.a': 'Emerald is for one person. Diamond can be shared by up to 2 people on the same plan.',
      'mem.terms.t6.q': 'Availability',
      'mem.terms.t6.a': 'Memberships are limited and subject to availability. Marina holds a small number of member places at a time.',
      'mem.support.h2': 'Not sure which membership is right for you?',
      'mem.support.p': 'Talk to Marina and find the option that fits your routine and goals. No pressure, just a straight answer.',
      'mem.support.cta': 'Chat on WhatsApp →',

      // Footer
      'footer.tag': 'Release your body. Live an extraordinary life.',
      'footer.col.links': 'Explore',
      'footer.col.contact': 'Contact',
      'footer.col.book': 'Book',
      'footer.faq': 'FAQ',
      'footer.bookMassage': 'Book Membership',
      'footer.bookPt': 'Book One Session',
      'footer.address': 'Randwick, NSW',
      'footer.copy': '© 2026 Marina Bodywork. Sydney, Australia.',

      // Sticky CTA
      'sticky.massage': 'Book Membership',
      'sticky.pt': 'Book One Session',
      'wa.float': 'Message Marina on WhatsApp',

      // ─── Home: hero ───
      'home.hero.label': '<strong>Marina Ribeiro</strong> · Fascia release specialist · Sydney',
      'home.hero.h1.a': 'Release the restriction.',
      'home.hero.h1.b': 'Build physical strength and mental balance.',

      'home.hero.sub': 'Bodywork, Sensory Energetics, and conscious movement designed around what your body needs.',
      'home.hero.cta.massage': 'Book Membership',
      'home.hero.cta.training': 'Book One Session',
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
      'home.svc.massage.h': 'Massage',
      'home.svc.massage.p': 'Five specialist bodywork treatments, Marina helps you choose the right one, or blends what your body responds to on the day.',
      'home.svc.massage.t1': 'Myofascial Release',
      'home.svc.massage.t2': 'Brazilian Lymphatic Drainage',
      'home.svc.massage.t3': 'Somatic Massage',
      'home.svc.massage.t4': 'Facial Massage',
      'home.svc.massage.t5': 'KSE Sensory Energetics',
      'home.svc.massage.single.name': 'Single session',
      'home.svc.massage.single.meta': '60 min · From A$125 · No commitment',
      'home.svc.massage.mship.name': 'Weekly membership',
      'home.svc.massage.mship.badge': 'Signature',
      'home.svc.massage.mship.meta': 'From A$107/week · Fixed weekly slot · 2-month minimum',
      'home.svc.pt.h': 'Smart Training',
      'home.svc.pt.p': 'An individualised training method that assesses your body, posture, movement and breathing to build a personalised protocol. Movement, strength, breath, balance, and mobility in every session.',
      'home.svc.pt.single.name': 'Single session',
      'home.svc.pt.single.meta': '60 min · A$125 · Test the work first',
      'home.svc.pt.plan.name': 'Training plan',
      'home.svc.pt.plan.meta': 'From A$107/session · 1-2x per week · billed every 4 weeks',

      'home.gem.label': 'Memberships',
      'home.gem.h2': 'Commit to a rhythm. Pay less every session.',
      'home.gem.sub': 'Prepaid bodywork memberships, Emerald for weekly consistency, Diamond for twice-weekly results and shareable with someone you love.',
      'home.gem.emerald.name': 'Emerald',
      'home.gem.emerald.meta': '10 sessions · 1×/week · A$107/session',
      'home.gem.emerald.price': 'A$1,070 · 10 sessions',
      'home.gem.diamond.name': 'Diamond',
      'home.gem.diamond.meta': '20 sessions · 2×/week · A$89/session · shareable',
      'home.gem.diamond.price': 'A$1,780 · 20 sessions',
      'home.gem.cta': 'See the memberships →',

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
      'diag.neck.cta': 'Book One Session',
      'diag.jaw.name': 'Somatic Massage Facial',
      'diag.jaw.why': 'TMJ tension and jaw clenching are held in the fascia of the face, neck, and throat. Marina is one of the few Sydney practitioners trained in buccal (inside-mouth) massage and TMJ Mastery. Clients typically report deeper sleep and reduced jaw tension within 24 hours.',
      'diag.jaw.tags': 'TMJ Mastery · Buccal Massage · Myofascial Release',
      'diag.jaw.cta': 'Book One Session',
      'diag.back.name': 'Somatic Massage Corporal',
      'diag.back.why': 'Lower-back and hip tension is usually a fascial chain problem, not an isolated muscle problem. The restriction is often in the hip flexors, the thoracolumbar fascia, or the connection between them. Marina maps the chain and releases it at the source.',
      'diag.back.tags': 'Myofascial Release · Myo Aponeurosis · Somatic Release',
      'diag.back.cta': 'Book One Session',
      'diag.stress.name': 'Sensory Energetics (60 min)',
      'diag.stress.why': 'When the body cannot switch off, the nervous system is the problem, not just the muscle. Sensory Energetics combines trigger-point work, guided breath, and somatic release to reach tension stored by the nervous system for months or years. Clients leave looser and most sleep deeper that night.',
      'diag.stress.tags': 'Nervous System Release · Breathwork · Trigger-Point',
      'diag.stress.cta': 'Book One Session',
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
      'nf.cta.book': 'Book One Session',
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
      'method.mod.m2.meta': '60 min · A$224',
      'method.mod.m2.p': 'Integrative method that activates the central nervous system through ancient techniques, breath, and somatic stimuli. Solves: nervous-system dysregulation, tension stored by the body for months or years, anxiety patterns held in tissue.',
      'method.mod.m3.h': 'Conscious Movement',
      'method.mod.m3.meta': 'In every session',
      'method.mod.m3.p': 'Breathwork, somatic awareness, and mobility work woven through every bodywork and training session. Solves: the gap between feeling looser on the table and moving differently afterward.',
      'method.mod.m4.h': 'Smart Training',
      'method.mod.m4.meta': '60 min · From A$107/session',
      'method.mod.m4.p': 'Individualised Smart Training, built around what your bodywork sessions reveal. Solves: training plateaus, mobility limits, perimenopause and menopause strength needs, body awareness.',

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
      'method.cta.book': 'Book One Session',
      'method.cta.talk': 'Talk to Marina first →',

      // ─── Massage page ───
      'mas.hero.label': 'Massage services',
      'mas.hero.h1': 'This is not a standard massage.',
      'mas.hero.sub': 'Five specialist techniques. Marina chooses the combination your body responds to that day. There is no fixed protocol because no two bodies arrive in the same state. The hour is built around what she finds.',

      'mas.svc.label': 'The treatments',
      'mas.svc.h2': 'Choose your treatment.',
      'mas.svc.sub': 'Five specialist bodywork treatments, each 60 minutes. Marina helps you choose the right one, or blends what your body responds to on the day.',

      // Shared treatment labels
      'mas.t.q.what': 'What is it?',
      'mas.t.q.who': 'Who is it for?',
      'mas.t.q.benefits': 'Benefits',
      'mas.t.book': 'Book One Session',
      'mas.t.more': 'Learn more',
      'mas.t.disclaimer': 'A complementary wellness practice; not a substitute for medical or psychological care.',
      'mas.t.lymph.short': 'Reduce fluid retention, swelling, and feel lighter.',
      'mas.t.myo.short': 'Release fascial restrictions and improve mobility.',
      'mas.t.somatic.short': 'Relax, reset, and reconnect with your body.',
      'mas.t.facial.sub': 'Natural Facial Botox',
      'mas.t.facial.short': 'Release facial tension and enhance your natural glow.',
      'mas.t.sensory.short': 'Regulate your nervous system and restore balance.',

      // Treatment: Myofascial Release
      'mas.t.myo.name': 'Myofascial Release',
      'mas.t.myo.meta': '60 minutes · A$125',
      'mas.t.myo.what': 'A therapeutic bodywork technique using sustained pressure and specific movements to release restrictions in the fascia, the connective tissue that surrounds and links muscles, joints, and other structures. The session finds areas of rigidity, overload, and limited movement and works with the body as one interconnected system.',
      'mas.t.myo.who': 'For stiffness, reduced mobility, muscular pain or tension, postural discomfort, physical overload, stress-related tension, or restricted movement. It also supports physically active people seeking better mobility, recovery, and movement quality.',
      'mas.t.myo.benefits': 'May help relieve muscular tension, improve mobility, and increase freedom of movement, supporting more comfortable posture, greater body awareness, less restricted breathing, and more efficient movement.',

      // Treatment: Brazilian Lymphatic Drainage
      'mas.t.lymph.name': 'Brazilian Lymphatic Drainage',
      'mas.t.lymph.meta': '60 minutes · A$125',
      'mas.t.lymph.what': 'A bodywork technique using gentle, rhythmic, directional movements to support lymphatic flow and the body\'s natural movement of fluids. The Brazilian approach also works carefully with body contour, without aggressive movements or excessive pressure.',
      'mas.t.lymph.who': 'For fluid retention, puffiness, heavy legs, or discomfort linked to fluid accumulation, and for anyone seeking a greater sense of lightness or lymphatic care as part of a regular routine. Post-operative treatment requires medical clearance.',
      'mas.t.lymph.benefits': 'May help reduce fluid retention and puffiness while supporting a greater sense of lightness and relaxation, the natural function of the lymphatic system, and awareness of body contour. Individual results may vary.',

      // Treatment: Somatic Massage
      'mas.t.somatic.name': 'Somatic Massage',
      'mas.t.somatic.meta': '60 minutes · A$125',
      'mas.t.somatic.what': 'A gentle, trauma-informed bodywork approach combining therapeutic touch, conscious breathing, presence, and body awareness. It helps identify protective patterns, tension, and disconnection that can build in response to difficult experiences, prolonged stress, or emotional overload. Safe, respectful touch supports reconnection with the body and nervous-system regulation.',
      'mas.t.somatic.who': 'For people experiencing stress, anxiety, insecurity, emotional blocks, mental fatigue, persistent muscular tension, difficulty relaxing, or disconnection from the body, including defensive responses, hypervigilance, or difficulty feeling safe and present.',
      'mas.t.somatic.benefits': 'May support a greater sense of safety, presence, and connection with the body, encouraging nervous-system regulation, deep relaxation, and gradual awareness of accumulated tension, emotional stability, and recognition of personal needs and boundaries.',

      // Treatment: Facial Massage
      'mas.t.facial.name': 'Facial Massage',
      'mas.t.facial.meta': '60 minutes · A$125',
      'mas.t.facial.what': 'A specialised manual treatment for the muscles and tissues of the face, jaw, neck, and scalp. Precise movements stimulate circulation, mobilise the tissues, and address tension that may affect facial comfort and expression. The technique combines relaxation, muscular care, and tissue stimulation.',
      'mas.t.facial.who': 'For facial tension, jaw tightness, bruxism, puffiness, a tired appearance, stress-related discomfort, or difficulty relaxing the facial muscles, and for anyone wishing to include focused facial care in a regular well-being routine.',
      'mas.t.facial.benefits': 'May help reduce puffiness, stimulate local circulation, and relieve tension across the face, jaw, neck, and scalp, promoting facial relaxation and a more rested, refreshed, firm, and naturally radiant appearance.',

      // Treatment: KSE Sensory Energetics
      'mas.t.sensory.name': 'KSE Sensory Energetics',
      'mas.t.sensory.meta': '60 minutes · A$224',
      'mas.t.sensory.what': 'A 60-minute integrative session that works directly with the nervous system, using breathwork, body stimuli, and somatic awareness to release physical and emotional patterns stored deep in the body. Inspired by ancient Eastern techniques.',
      'mas.t.sensory.who': 'For tension the body has held for months or years, high or prolonged stress, difficulty switching off, or anyone drawn to deep nervous-system work.',
      'mas.t.sensory.benefits': 'Involuntary tremors are a natural nervous-system response that help discharge accumulated tension, regulate stress, and lower cortisol, while supporting neurotransmitters tied to well-being, focus, and relaxation. Clients leave with lightness, mental clarity, and emotional balance.',

      'mas.price.label': 'Single session or membership',
      'mas.price.h2': 'Choose how you want to work together.',
      'mas.price.sub': 'Book a single treatment whenever you need it, or commit to a rhythm and every session costs less.',
      'mas.mtable.single.name': 'Single session',
      'mas.mtable.single.price': 'A$125',
      'mas.mtable.single.per': 'per session · 60 min · no commitment',
      'mas.mtable.single.f1': 'Any single treatment, chosen on the day',
      'mas.mtable.single.f2': 'KSE Sensory Energetics A$224',
      'mas.mtable.single.f3': 'No membership, no minimum',
      'mas.mtable.single.cta': 'Book single session',
      'mas.mtable.emerald.badge': 'Membership',
      'mas.mtable.emerald.price': 'A$107',
      'mas.mtable.emerald.per': 'per session · A$1,070 total · 10 weeks',
      'mas.mtable.diamond.badge': 'Most complete',
      'mas.mtable.diamond.price': 'A$89',
      'mas.mtable.diamond.per': 'per session · A$1,780 total · 10 weeks',
      'mas.mtable.book': 'Choose this membership',
      'mas.mtable.freechoice': 'Choose the care your body needs each week. At every session, you are free to select any of the treatments included in your Membership.',

      'mas.gem.emerald.name': 'Emerald',
      'mas.gem.emerald.dur': '10 weeks · 1 session per week',
      'mas.gem.emerald.sessions': '10 sessions total',
      'mas.gem.emerald.worth': 'Worth A$1,250 · save A$180 vs single sessions',
      'mas.gem.emerald.who': 'Individual only (1 person)',
      'mas.gem.emerald.services': 'Choose up to 2 techniques (Sensory Energetics not included)',
      'mas.gem.emerald.freeze': 'Freeze up to 2 weeks · valid up to 12 weeks',
      'mas.gem.diamond.name': 'Diamond',
      'mas.gem.diamond.dur': '10 weeks · 2 sessions per week',
      'mas.gem.diamond.sessions': '20 sessions total',
      'mas.gem.diamond.worth': 'Worth A$2,500 · save A$720 vs single sessions',
      'mas.gem.diamond.who': 'Up to 2 people on the same plan',
      'mas.gem.diamond.services': 'All 5 techniques, including Sensory Energetics',
      'mas.gem.diamond.freeze': 'Freeze up to 2 weeks · valid up to 12 weeks',
      'mas.gem.benefits.h': 'Member benefits',
      'mas.gem.benefits.b1': 'Priority booking',
      'mas.gem.benefits.b2': 'Exclusive member rates',
      'mas.gem.benefits.b3': 'Personalised treatment journey',
      'mas.gem.benefits.b4': 'Exclusive offers and gifts',
      'mas.gem.note.label': 'Important',
      'mas.gem.note.1': 'The 2-week freeze does not add extra sessions, it only extends your window to complete the 10 or 20 sessions.',
      'mas.gem.note.2': 'Each plan is valid for up to 12 weeks.',
      'mas.gem.scarcity': 'Limited memberships available.',

      'mas.faq.h2': 'Massage-specific questions.',
      'mas.faq.q1': 'What do I wear?',
      'mas.faq.a1': 'For Corporal: underwear. Marina uses sheets and works through them where appropriate. For Facial: come as you are, the work is on face, neck, jaw, and inside the mouth. For Sensory Energetics: loose comfortable clothing you can move and breathe in.',
      'mas.faq.q2': 'Can I claim through health insurance?',
      'mas.faq.a2': 'No. Marina is a bodywork specialist, not a registered remedial therapist. There is no insurance rebate. If that matters more than the work, book a registered therapist.',
      'mas.faq.q3': 'How many sessions will I need?',
      'mas.faq.a3': 'Most clients feel a significant difference after the first session and meaningful change in chronic patterns across 3 to 5 sessions. After session one Marina will tell you honestly what she thinks your body needs.',

      // ─── Training page ───
      'tr.hero.label': 'Smart Training',
      'tr.hero.h1': 'Smart Training.',
      'tr.hero.sub': 'Smart Training is an individualised training method that assesses body composition, posture, movement patterns and breathing to develop a personalised protocol for each person. The program combines mobility, strength, balance, endurance and exercises that support fascial mobility and hydration, promoting better body function, movement awareness and long term autonomy.',


      'tr.photo.alt': 'Smart Training infographic: balance, breath, strength, and mobility for autonomy and quality of life.',
      'tr.impact': 'Most personal trainers still do not see what is holding your body back. Marina does.',

      'tr.avail.p': 'Before purchasing any service or plan, please contact Marina directly to confirm availability for in person sessions and other Smart Training services.',
      'tr.avail.cta': 'Check availability on WhatsApp',

      'tr.plans.label': 'Sessions and plans',
      'tr.plans.h2': 'Choose how you want to train.',
      'tr.plans.sub': 'Start with a single session, or commit to a plan and every session costs less. Confirm availability with Marina before you begin.',

      'tr.plan.single.name': 'Single Session',
      'tr.plan.single.price': 'A$125',
      'tr.plan.single.per': 'per session · 60 min · no commitment',
      'tr.plan.single.f1': 'One 60-minute session',
      'tr.plan.single.f2': 'Use it for training, a physical assessment, or a consultation',
      'tr.plan.single.f3': 'No membership, no minimum',
      'tr.plan.single.cta': 'Book single session',

      'tr.plan.emerald.name': 'Emerald Plan',
      'tr.plan.emerald.badge': 'Plan',
      'tr.plan.emerald.price': 'A$107',
      'tr.plan.emerald.per': 'per session · A$428 every 4 weeks',
      'tr.plan.emerald.f1': '1x per week · 4 sessions every 4 weeks',
      'tr.plan.emerald.f2': 'Personalised training and individual plan',
      'tr.plan.emerald.f3': 'Physical assessment included',
      'tr.plan.emerald.f4': 'Training app access and personalised program',
      'tr.plan.emerald.cta': 'Choose Emerald Plan',

      'tr.plan.diamond.name': 'Diamond Plan',
      'tr.plan.diamond.badge': 'Most complete',
      'tr.plan.diamond.price': 'A$89',
      'tr.plan.diamond.per': 'per session · A$712 every 4 weeks',
      'tr.plan.diamond.f1': '2x per week · 8 sessions every 4 weeks',
      'tr.plan.diamond.f2': 'Personalised training and individual plan',
      'tr.plan.diamond.f3': 'Physical assessment included',
      'tr.plan.diamond.f4': 'Training app access and personalised program',
      'tr.plan.diamond.cta': 'Choose Diamond Plan',

      'tr.plan.note': 'Confirm availability with Marina on WhatsApp before you begin. Plans are billed every 4 weeks.',

      // ─── About page ───
      'about.hero.title': 'Physical Education Professional · Bodywork Specialist',
      'about.hero.meta': '15+ years of practice · Sydney',
      'about.bio.label': 'The story',
      'about.bio.h2': 'Fifteen years of practice, two continents, one goal.',
      'about.bio.p1': 'Marina Ribeiro da Silva is a Physical Education professional with more than fifteen years dedicated to movement, health, and women\'s well-being. Movement and bodywork are not two careers. They are two sides of how a body changes.',
      'about.bio.p2': 'She started through dance, teaching from age fifteen. She studied Physical Education to professionalise what she had been doing intuitively since childhood, earning a Bachelor\'s Degree in Physical Education from FUMEC University in Brazil.',
      'about.bio.p4': 'In Sydney she specialises in women\'s training across every stage of life, including perimenopause: conditioning, hypertrophy, mobility, posture, body awareness, quality of life. Across ten plus years of bodywork she developed her own fascial-release technique combining breath, somatic awareness, and myofascial release. It is the foundation of every session she runs.',

      'about.creds.label': 'Academic and professional qualifications',
      'about.creds.h2': 'More than fifteen years of training and study.',
      'about.creds.intro': 'With more than 15 years since graduating in Physical Education, Marina has dedicated her career to supporting integral human development, not only physical, but also mental. She believes true well-being comes from understanding the body and mind as interconnected.',
      'about.creds.g1': 'Education',
      'about.creds.g2': 'International EQF Level 4',
      'about.creds.g3': 'Professional training',
      'about.cred.edu': 'Bachelor\'s Degree in Physical Education · FUMEC University, Brazil',
      'about.cred.eqf1': 'Fitness Instructor',
      'about.cred.eqf2': 'Personal Trainer',
      'about.cred.eqf3': 'Group Fitness Instructor',
      'about.cred.pt1': 'Myo Aponeurosis Training',
      'about.cred.pt2': 'Body Psychotherapy and Bioenergetics',
      'about.cred.pt3': 'Bodywork Therapy',
      'about.cred.pt4': 'Massage Therapist',
      'about.cred.pt5': 'Reiki Master',
      'about.cred.pt6': 'Breathwork Facilitator',
      'about.cred.pt7': 'Dance Instructor',
      'about.cred.pt8': 'Sensory Energetics® Facilitator',

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
      'about.cta.p': 'Join a membership, book a single session, or message Marina first if you want her to recommend where to start.',
      'about.cta.book': 'Book Membership',
      'about.cta.bookPt': 'Book One Session',
      'about.cta.talk': 'Talk to Marina →',

      'about.borders.label': 'For trainers',
      'about.borders.h': 'Become a personal trainer without borders',
      'about.borders.p1': 'Turn your Physical Education experience into a career with opportunities beyond Brazil.',
      'about.borders.p2': 'Learn how to work as a Personal Trainer in Australia, validate your experience, win clients, position yourself professionally, and build an international career.',
      'about.borders.cta': 'Start your journey now'
    },

    pt: {
      // Nav
      'nav.method': 'Método',
      'nav.massage': 'Serviços',
      'nav.membership': 'Membership',
      'nav.training': 'Smart Training',
      'nav.about': 'Sobre mim',
      'nav.bookMassage': 'Assinar Membership',
      'nav.bookTraining': 'Sessão avulsa',
      'nav.menu': 'Abrir menu',

      'mem.hero.label': 'Membership',
      'mem.hero.h1': 'A consistência muda a forma como o seu corpo se sente.',
      'mem.hero.sub': 'Escolha o nível de cuidado contínuo que funciona pra você. Valores exclusivos de membro, reserva prioritária e um corpo que vai construindo em cima de cada sessão.',
      'mem.compare.label': 'Dois níveis de cuidado',
      'mem.compare.h2': 'Emerald e Diamond.',
      'mem.emerald.name': 'Emerald',
      'mem.emerald.sub': 'Membership',
      'mem.emerald.price': 'A$1.070 · 10 sessões',
      'mem.emerald.f1': '10 sessões',
      'mem.emerald.f2': 'Membership individual',
      'mem.emerald.f3': 'Escolha até 2 serviços elegíveis',
      'mem.emerald.f4': 'KSE Sensory Energetics não entra na seleção de serviços',
      'mem.emerald.f5': 'Reserva prioritária',
      'mem.emerald.f6': 'Valor exclusivo de membro',
      'mem.emerald.f7': 'Cuidado contínuo personalizado',
      'mem.emerald.cta': 'Escolher Emerald →',
      'mem.diamond.name': 'Diamond',
      'mem.diamond.sub': 'Membership',
      'mem.diamond.price': 'A$1.780 · 20 sessões',
      'mem.diamond.f1': '20 sessões',
      'mem.diamond.f2': 'Acesso a todos os serviços de bodywork elegíveis',
      'mem.diamond.f3': 'Inclui KSE Sensory Energetics',
      'mem.diamond.f4': 'Mais flexibilidade nos tratamentos',
      'mem.diamond.f5': 'Reserva prioritária',
      'mem.diamond.f6': 'Valor exclusivo de membro',
      'mem.diamond.f7': 'Pode ser dividido por até 2 pessoas',
      'mem.diamond.cta': 'Escolher Diamond →',
      'mem.terms.label': 'Os detalhes',
      'mem.terms.h2': 'Termos do membership.',
      'mem.terms.t1.q': 'Pagamento',
      'mem.terms.t1.a': 'O pagamento é por transferência bancária ou dinheiro, combinado direto com a Marina no WhatsApp. O membership é pago por inteiro antes da primeira sessão.',
      'mem.terms.t2.q': 'Validade',
      'mem.terms.t2.a': 'Cada membership é válido por até 12 semanas. O Emerald são 10 sessões, 1 por semana; o Diamond são 20 sessões, 2 por semana.',
      'mem.terms.t3.q': 'Reserva',
      'mem.terms.t3.a': 'Depois de entrar, fale com a Marina no WhatsApp pra reservar suas sessões. A reserva prioritária está inclusa pra membros, então os seus horários preferidos ficam guardados primeiro.',
      'mem.terms.t4.q': 'Congelamento',
      'mem.terms.t4.a': 'Você pode congelar o membership por até 2 semanas. O congelamento não adiciona sessões extras, ele só estende o prazo pra completar as 10 ou 20 sessões.',
      'mem.terms.t5.q': 'Compartilhamento',
      'mem.terms.t5.a': 'O Emerald é pra uma pessoa. O Diamond pode ser dividido por até 2 pessoas no mesmo plano.',
      'mem.terms.t6.q': 'Disponibilidade',
      'mem.terms.t6.a': 'Os memberships são limitados e sujeitos à disponibilidade. A Marina mantém um número reduzido de vagas de membro por vez.',
      'mem.support.h2': 'Não sabe qual membership é o certo pra você?',
      'mem.support.p': 'Fale com a Marina e encontre a opção que combina com a sua rotina e seus objetivos. Sem pressão, só uma resposta direta.',
      'mem.support.cta': 'Falar no WhatsApp →',

      // Footer
      'footer.tag': 'Libere seu corpo. Viva uma vida extraordinária.',
      'footer.col.links': 'Navegar',
      'footer.col.contact': 'Contato',
      'footer.col.book': 'Agendar',
      'footer.faq': 'Perguntas frequentes',
      'footer.bookMassage': 'Assinar Membership',
      'footer.bookPt': 'Sessão avulsa',
      'footer.address': 'Randwick, NSW',
      'footer.copy': '© 2026 Marina Bodywork. Sydney, Austrália.',

      // Sticky CTA
      'sticky.massage': 'Assinar Membership',
      'sticky.pt': 'Sessão avulsa',
      'wa.float': 'Falar com a Marina no WhatsApp',

      // Home: hero
      'home.hero.label': '<strong>Marina Ribeiro</strong> · Especialista em liberação fascial · Sydney',
      'home.hero.h1.a': 'Solte o que trava.',
      'home.hero.h1.b': 'Ganhe força física e equilíbrio mental.',

      'home.hero.sub': 'Bodywork, Sensory Energetics e movimento consciente, desenhados em volta do que o seu corpo precisa.',
      'home.hero.cta.massage': 'Assinar Membership',
      'home.hero.cta.training': 'Sessão avulsa',
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
      'home.svc.massage.h': 'Massagem',
      'home.svc.massage.p': 'Cinco tratamentos corporais especializados, a Marina te ajuda a escolher o certo, ou combina o que o seu corpo pede naquele dia.',
      'home.svc.massage.t1': 'Liberação Miofascial',
      'home.svc.massage.t2': 'Drenagem Linfática Brasileira',
      'home.svc.massage.t3': 'Massagem Somática',
      'home.svc.massage.t4': 'Massagem Facial',
      'home.svc.massage.t5': 'KSE Sensory Energetics',
      'home.svc.massage.single.name': 'Sessão avulsa',
      'home.svc.massage.single.meta': '60 min · A partir de A$125 · Sem compromisso',
      'home.svc.massage.mship.name': 'Plano semanal',
      'home.svc.massage.mship.badge': 'Assinatura',
      'home.svc.massage.mship.meta': 'A partir de A$107/semana · horário fixo · mínimo 2 meses',
      'home.svc.pt.h': 'Smart Training',
      'home.svc.pt.p': 'Um método de treino individualizado que avalia seu corpo, postura, movimento e respiração para montar um protocolo personalizado. Movimento, força, respiração, equilíbrio e mobilidade em cada sessão.',
      'home.svc.pt.single.name': 'Sessão avulsa',
      'home.svc.pt.single.meta': '60 min · A$125 · Teste o trabalho primeiro',
      'home.svc.pt.plan.name': 'Plano de treino',
      'home.svc.pt.plan.meta': 'A partir de A$107/sessão · 1 a 2x por semana · cobrado a cada 4 semanas',

      'home.gem.label': 'Memberships',
      'home.gem.h2': 'Assuma um ritmo. Pague menos por sessão.',
      'home.gem.sub': 'Memberships de bodywork pré-pagas, Emerald pra consistência semanal, Diamond pra resultado 2× na semana e que dá pra dividir com quem você ama.',
      'home.gem.emerald.name': 'Emerald',
      'home.gem.emerald.meta': '10 sessões · 1×/semana · A$107/sessão',
      'home.gem.emerald.price': 'A$1.070 · 10 sessões',
      'home.gem.diamond.name': 'Diamond',
      'home.gem.diamond.meta': '20 sessões · 2×/semana · A$89/sessão · compartilhável',
      'home.gem.diamond.price': 'A$1.780 · 20 sessões',
      'home.gem.cta': 'Ver as memberships →',

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
      'diag.neck.cta': 'Sessão avulsa',
      'diag.jaw.name': 'Somatic Massage Facial',
      'diag.jaw.why': 'A tensão na mandíbula e o bruxismo ficam guardados na fáscia do rosto, do pescoço e da garganta. A Marina é uma das poucas profissionais em Sydney formada em massagem bucal (por dentro da boca) e TMJ Mastery. A maioria das clientes dorme melhor e sente a mandíbula bem mais solta em 24 horas.',
      'diag.jaw.tags': 'TMJ Mastery · Massagem Bucal · Liberação Miofascial',
      'diag.jaw.cta': 'Sessão avulsa',
      'diag.back.name': 'Somatic Massage Corporal',
      'diag.back.why': 'Dor lombar e no quadril quase sempre é uma corrente de tensão conectada, não um músculo isolado. O bloqueio costuma estar nos flexores do quadril, na fáscia das costas, ou na conexão entre os dois. A Marina mapeia a corrente inteira e solta direto na origem.',
      'diag.back.tags': 'Liberação Miofascial · Mio Aponeurose · Liberação Somática',
      'diag.back.cta': 'Sessão avulsa',
      'diag.stress.name': 'Sensory Energetics (60 min)',
      'diag.stress.why': 'Quando o corpo não consegue desligar, o problema é o sistema nervoso. Não só o músculo. O Sensory Energetics combina pressão em pontos-gatilho, respiração guiada e liberação somática pra alcançar a tensão que o seu sistema nervoso guarda há meses ou anos. As clientes saem mais soltas. E a maioria dorme bem melhor naquela noite.',
      'diag.stress.tags': 'Regulação do Sistema Nervoso · Respiração · Pontos-Gatilho',
      'diag.stress.cta': 'Sessão avulsa',
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
      'nf.cta.book': 'Sessão avulsa',
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
      'method.mod.m2.meta': '60 min · A$224',
      'method.mod.m2.p': 'Método integrativo que ativa o sistema nervoso central com técnicas ancestrais, respiração guiada e estímulos no corpo. Resolve: sistema nervoso desregulado, tensão acumulada no corpo há meses ou anos, padrões de ansiedade guardados no tecido.',
      'method.mod.m3.h': 'Movimento Consciente',
      'method.mod.m3.meta': 'Em todas as sessões',
      'method.mod.m3.p': 'Respiração, consciência do corpo e mobilidade entram em toda sessão de massagem e treino. Resolve: a distância entre sair mais solta da maca hoje, e realmente se mover diferente no resto da semana.',
      'method.mod.m4.h': 'Smart Training',
      'method.mod.m4.meta': '60 min · A partir de A$107/sessão',
      'method.mod.m4.p': 'Smart Training individualizado, montado a partir do que as suas sessões de terapia revelam sobre o seu corpo. Resolve: platôs no treino, limites de mobilidade, força e energia na perimenopausa e menopausa, consciência corporal.',

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
      'method.cta.book': 'Sessão avulsa',
      'method.cta.talk': 'Falar com a Marina primeiro →',

      // Massage page
      'mas.hero.label': 'Serviços de massagem',
      'mas.hero.h1': 'Isto não é uma massagem comum.',
      'mas.hero.sub': 'Cinco técnicas especializadas. A Marina escolhe a combinação certa pro que o seu corpo está pedindo naquele dia. Não existe protocolo fixo. Porque nenhum corpo chega no mesmo estado. A hora é construída a partir do que ela encontra em você.',

      'mas.svc.label': 'Os tratamentos',
      'mas.svc.h2': 'Escolha seu tratamento.',
      'mas.svc.sub': 'Cinco tratamentos corporais especializados, cada um de 60 minutos. A Marina te ajuda a escolher o certo, ou combina o que o seu corpo pede naquele dia.',

      // Rótulos compartilhados dos tratamentos
      'mas.t.q.what': 'O que é?',
      'mas.t.q.who': 'Pra quem é?',
      'mas.t.q.benefits': 'Benefícios',
      'mas.t.book': 'Sessão avulsa',
      'mas.t.more': 'Saiba mais',
      'mas.t.disclaimer': 'Uma prática complementar de bem-estar; não substitui cuidado médico ou psicológico.',
      'mas.t.lymph.short': 'Reduz retenção de líquidos, inchaço, e traz leveza.',
      'mas.t.myo.short': 'Solta as restrições da fáscia e melhora a mobilidade.',
      'mas.t.somatic.short': 'Relaxa, reseta e reconecta com o seu corpo.',
      'mas.t.facial.sub': 'Natural Facial Botox',
      'mas.t.facial.short': 'Solta a tensão do rosto e realça o seu glow natural.',
      'mas.t.sensory.short': 'Regula o sistema nervoso e restaura o equilíbrio.',

      // Tratamento: Liberação Miofascial
      'mas.t.myo.name': 'Liberação Miofascial',
      'mas.t.myo.meta': '60 minutos · A$125',
      'mas.t.myo.what': 'Uma técnica terapêutica de terapia corporal que usa pressão sustentada e movimentos específicos pra soltar restrições na fáscia, o tecido conjuntivo que envolve e conecta músculos, articulações e outras estruturas. A sessão identifica áreas de rigidez, sobrecarga e movimento limitado, e trabalha o corpo como um sistema interligado.',
      'mas.t.myo.who': 'Pra rigidez, mobilidade reduzida, dor ou tensão muscular, desconforto postural, sobrecarga física, tensão ligada ao estresse ou movimento restrito. Também apoia pessoas ativas que buscam mais mobilidade, recuperação e qualidade de movimento.',
      'mas.t.myo.benefits': 'Pode ajudar a aliviar a tensão muscular, melhorar a mobilidade e aumentar a liberdade de movimento, apoiando uma postura mais confortável, mais consciência corporal, respiração menos travada e movimento mais eficiente.',

      // Tratamento: Drenagem Linfática Brasileira
      'mas.t.lymph.name': 'Drenagem Linfática Brasileira',
      'mas.t.lymph.meta': '60 minutos · A$125',
      'mas.t.lymph.what': 'Uma técnica de terapia corporal com movimentos suaves, rítmicos e direcionais pra apoiar o fluxo linfático e o movimento natural dos líquidos do corpo. A abordagem brasileira também trabalha o contorno corporal com cuidado, sem movimentos agressivos nem pressão excessiva.',
      'mas.t.lymph.who': 'Pra retenção de líquidos, inchaço, pernas pesadas ou desconforto ligado ao acúmulo de líquidos, e pra quem busca mais leveza ou quer incluir o cuidado linfático numa rotina de bem-estar. Tratamento pós-operatório precisa de liberação médica.',
      'mas.t.lymph.benefits': 'Pode ajudar a reduzir a retenção de líquidos e o inchaço, apoiando mais leveza e relaxamento, a função natural do sistema linfático e a consciência do contorno corporal. Os resultados variam de pessoa pra pessoa.',

      // Tratamento: Massagem Somática
      'mas.t.somatic.name': 'Massagem Somática',
      'mas.t.somatic.meta': '60 minutos · A$125',
      'mas.t.somatic.what': 'Uma abordagem gentil e sensível ao trauma que combina toque terapêutico, respiração consciente, presença e consciência corporal. Ajuda a identificar padrões de proteção, tensão e desconexão que podem surgir em resposta a experiências difíceis, estresse prolongado ou sobrecarga emocional. O toque seguro e respeitoso apoia a reconexão com o corpo e a regulação do sistema nervoso.',
      'mas.t.somatic.who': 'Pra quem vive estresse, ansiedade, insegurança, bloqueios emocionais, fadiga mental, tensão muscular persistente, dificuldade de relaxar ou desconexão do corpo, incluindo respostas defensivas, hipervigilância ou dificuldade de se sentir segura e presente.',
      'mas.t.somatic.benefits': 'Pode apoiar mais sensação de segurança, presença e conexão com o corpo, favorecendo a regulação do sistema nervoso, o relaxamento profundo e a consciência gradual dos padrões de tensão acumulada, estabilidade emocional e o reconhecimento de necessidades e limites pessoais.',

      // Tratamento: Massagem Facial
      'mas.t.facial.name': 'Massagem Facial',
      'mas.t.facial.meta': '60 minutos · A$125',
      'mas.t.facial.what': 'Um tratamento manual especializado pros músculos e tecidos do rosto, mandíbula, pescoço e couro cabeludo. Movimentos precisos estimulam a circulação, mobilizam os tecidos e trabalham a tensão que pode afetar o conforto e a expressão do rosto. A técnica combina relaxamento, cuidado muscular e estímulo dos tecidos.',
      'mas.t.facial.who': 'Pra tensão facial, mandíbula travada, bruxismo, inchaço, aparência cansada, desconforto ligado ao estresse ou dificuldade de relaxar os músculos do rosto, e pra quem quer incluir um cuidado facial focado na rotina de bem-estar.',
      'mas.t.facial.benefits': 'Pode ajudar a reduzir o inchaço, estimular a circulação local e aliviar a tensão no rosto, mandíbula, pescoço e couro cabeludo, promovendo relaxamento facial e uma aparência mais descansada, revigorada, firme e naturalmente radiante.',

      // Tratamento: KSE Sensory Energetics
      'mas.t.sensory.name': 'KSE Sensory Energetics',
      'mas.t.sensory.meta': '60 minutos · A$224',
      'mas.t.sensory.what': 'Sessão integrativa de 60 minutos que trabalha direto com o sistema nervoso, usando respiração guiada, estímulos no corpo e consciência somática pra soltar padrões físicos e emocionais guardados lá no fundo. Inspirada em técnicas ancestrais do Oriente.',
      'mas.t.sensory.who': 'Pra tensão que o corpo guarda há meses ou anos, estresse alto ou prolongado, dificuldade de desligar, ou pra quem se identifica com um trabalho profundo no sistema nervoso.',
      'mas.t.sensory.benefits': 'Tremores involuntários são uma resposta natural do sistema nervoso que ajuda a descarregar a tensão acumulada, regular o estresse e reduzir o cortisol, ao mesmo tempo em que favorece neurotransmissores ligados ao bem-estar, foco e relaxamento. As clientes saem com leveza, clareza mental e equilíbrio emocional.',

      'mas.price.label': 'Sessão avulsa ou membership',
      'mas.price.h2': 'Escolha como quer trabalhar com a Marina.',
      'mas.price.sub': 'Reserve um tratamento avulso quando precisar, ou assuma um ritmo e cada sessão sai por menos.',
      'mas.mtable.single.name': 'Sessão avulsa',
      'mas.mtable.single.price': 'A$125',
      'mas.mtable.single.per': 'por sessão · 60 min · sem compromisso',
      'mas.mtable.single.f1': 'Qualquer tratamento avulso, escolhido no dia',
      'mas.mtable.single.f2': 'KSE Sensory Energetics A$224',
      'mas.mtable.single.f3': 'Sem membership, sem mínimo',
      'mas.mtable.single.cta': 'Reservar sessão avulsa',
      'mas.mtable.emerald.badge': 'Membership',
      'mas.mtable.emerald.price': 'A$107',
      'mas.mtable.emerald.per': 'por sessão · A$1.070 no total · 10 semanas',
      'mas.mtable.diamond.badge': 'Mais completo',
      'mas.mtable.diamond.price': 'A$89',
      'mas.mtable.diamond.per': 'por sessão · A$1.780 no total · 10 semanas',
      'mas.mtable.book': 'Escolher esta membership',
      'mas.mtable.freechoice': 'Escolha o cuidado que o seu corpo precisa em cada semana. Em cada sessão, você pode selecionar livremente uma das técnicas incluídas no seu Membership.',

      'mas.gem.emerald.name': 'Emerald',
      'mas.gem.emerald.dur': '10 semanas · 1 sessão por semana',
      'mas.gem.emerald.sessions': '10 sessões no total',
      'mas.gem.emerald.worth': 'Equivale a A$1.250 · economia de A$180 vs sessões avulsas',
      'mas.gem.emerald.who': 'Individual (1 pessoa)',
      'mas.gem.emerald.services': 'Escolha até 2 técnicas (Sensory Energetics não incluído)',
      'mas.gem.emerald.freeze': 'Congele por até 2 semanas · válido por até 12 semanas',
      'mas.gem.diamond.name': 'Diamond',
      'mas.gem.diamond.dur': '10 semanas · 2 sessões por semana',
      'mas.gem.diamond.sessions': '20 sessões no total',
      'mas.gem.diamond.worth': 'Equivale a A$2.500 · economia de A$720 vs sessões avulsas',
      'mas.gem.diamond.who': 'Até 2 pessoas no mesmo plano',
      'mas.gem.diamond.services': 'Todas as 5 técnicas, incluindo Sensory Energetics',
      'mas.gem.diamond.freeze': 'Congele por até 2 semanas · válido por até 12 semanas',
      'mas.gem.benefits.h': 'Benefícios de membro',
      'mas.gem.benefits.b1': 'Reserva prioritária',
      'mas.gem.benefits.b2': 'Valores exclusivos de membro',
      'mas.gem.benefits.b3': 'Jornada de tratamento personalizada',
      'mas.gem.benefits.b4': 'Ofertas e presentes exclusivos',
      'mas.gem.note.label': 'Importante',
      'mas.gem.note.1': 'O congelamento de 2 semanas não adiciona sessões extras, ele só estende o prazo pra você completar as 10 ou 20 sessões.',
      'mas.gem.note.2': 'Cada plano é válido por até 12 semanas.',
      'mas.gem.scarcity': 'Vagas limitadas.',

      'mas.faq.h2': 'Perguntas específicas sobre massagem.',
      'mas.faq.q1': 'O que eu devo vestir?',
      'mas.faq.a1': 'Pra Corporal: roupa íntima. A Marina usa lençóis e descobre só a parte do corpo que está trabalhando no momento. Pra Facial: chega como estiver, o trabalho é no rosto, pescoço, mandíbula e por dentro da boca. Pra Sensory Energetics: roupa solta e confortável, que te deixe se mover e respirar à vontade.',
      'mas.faq.q2': 'Posso usar plano de saúde?',
      'mas.faq.a2': 'Não. A Marina é especialista em terapia corporal. Não é terapeuta remedial registrada. Por isso não tem reembolso. Se isso pesa mais que o trabalho pra você, agenda com uma terapeuta registrada.',
      'mas.faq.q3': 'Quantas sessões eu vou precisar?',
      'mas.faq.a3': 'A maioria das clientes sente uma diferença grande já depois da primeira sessão. Mudanças firmes em padrões crônicos costumam acontecer em 3 a 5 sessões. Depois da primeira, a Marina te diz com honestidade o que ela acha que o seu corpo precisa.',

      // Training page
      'tr.hero.label': 'Smart Training',
      'tr.hero.h1': 'Smart Training.',
      'tr.hero.sub': 'Smart Training é um método de treino individualizado que avalia composição corporal, postura, padrões de movimento e respiração para desenvolver um protocolo personalizado para cada pessoa. O programa combina mobilidade, força, equilíbrio, resistência e exercícios que favorecem a mobilidade e a hidratação da fáscia, promovendo melhor funcionamento do corpo, consciência de movimento e autonomia a longo prazo.',


      'tr.photo.alt': 'Infográfico do Smart Training: equilíbrio, respiração, força e mobilidade para autonomia e qualidade de vida.',
      'tr.impact': 'A maioria dos personal trainers ainda não enxerga o que está travando o seu corpo. A Marina enxerga.',

      'tr.avail.p': 'Antes de comprar qualquer serviço ou plano, fale diretamente com a Marina para confirmar a disponibilidade de sessões presenciais e dos demais serviços do Smart Training.',
      'tr.avail.cta': 'Consultar disponibilidade pelo WhatsApp',

      'tr.plans.label': 'Sessões e planos',
      'tr.plans.h2': 'Escolha como você quer treinar.',
      'tr.plans.sub': 'Comece com uma sessão avulsa, ou assuma um plano e cada sessão sai por menos. Confirme a disponibilidade com a Marina antes de começar.',

      'tr.plan.single.name': 'Sessão avulsa',
      'tr.plan.single.price': 'A$125',
      'tr.plan.single.per': 'por sessão · 60 min · sem compromisso',
      'tr.plan.single.f1': 'Uma sessão de 60 minutos',
      'tr.plan.single.f2': 'Use para treino, avaliação física ou consultoria',
      'tr.plan.single.f3': 'Sem mensalidade, sem mínimo',
      'tr.plan.single.cta': 'Agendar sessão avulsa',

      'tr.plan.emerald.name': 'Plano Emerald',
      'tr.plan.emerald.badge': 'Plano',
      'tr.plan.emerald.price': 'A$107',
      'tr.plan.emerald.per': 'por sessão · A$428 a cada 4 semanas',
      'tr.plan.emerald.f1': '1x por semana · 4 sessões a cada 4 semanas',
      'tr.plan.emerald.f2': 'Treino personalizado e plano individual',
      'tr.plan.emerald.f3': 'Avaliação física incluída',
      'tr.plan.emerald.f4': 'Acesso ao app de treino e programa personalizado',
      'tr.plan.emerald.cta': 'Escolher o Plano Emerald',

      'tr.plan.diamond.name': 'Plano Diamond',
      'tr.plan.diamond.badge': 'Mais completo',
      'tr.plan.diamond.price': 'A$89',
      'tr.plan.diamond.per': 'por sessão · A$712 a cada 4 semanas',
      'tr.plan.diamond.f1': '2x por semana · 8 sessões a cada 4 semanas',
      'tr.plan.diamond.f2': 'Treino personalizado e plano individual',
      'tr.plan.diamond.f3': 'Avaliação física incluída',
      'tr.plan.diamond.f4': 'Acesso ao app de treino e programa personalizado',
      'tr.plan.diamond.cta': 'Escolher o Plano Diamond',

      'tr.plan.note': 'Confirme a disponibilidade com a Marina no WhatsApp antes de começar. Os planos são cobrados a cada 4 semanas.',

      // About page
      'about.hero.title': 'Profissional de Educação Física · Especialista em Terapia Corporal',
      'about.hero.meta': '15+ anos de prática · Sydney',
      'about.bio.label': 'A história',
      'about.bio.h2': 'Quinze anos de prática, dois continentes, um objetivo.',
      'about.bio.p1': 'Marina Ribeiro da Silva é profissional de Educação Física, com mais de quinze anos dedicados ao movimento, à saúde e ao bem-estar das mulheres. Pra ela, movimento e terapia corporal não são duas carreiras. São dois lados de como um corpo muda.',
      'about.bio.p2': 'Começou pela dança, dando aulas desde os quinze anos. Estudou Educação Física pra profissionalizar o que já fazia intuitivamente desde criança, formando-se em Educação Física pela Universidade FUMEC, no Brasil.',
      'about.bio.p4': 'Em Sydney, ela é especialista em treino feminino em todas as fases da vida, incluindo perimenopausa: condicionamento, hipertrofia, mobilidade, postura, consciência corporal, qualidade de vida. Em mais de dez anos de terapia corporal, ela desenvolveu a própria técnica de liberação fascial, combinando respiração, consciência somática e liberação miofascial. É a base de cada sessão que ela conduz.',

      'about.creds.label': 'Qualificações acadêmicas e profissionais',
      'about.creds.h2': 'Mais de quinze anos de formação e estudo.',
      'about.creds.intro': 'Há mais de 15 anos desde a formação em Educação Física, a Marina dedica a carreira ao desenvolvimento humano integral, não só físico, mas também mental. Ela acredita que o bem-estar verdadeiro vem de entender corpo e mente como conectados.',
      'about.creds.g1': 'Formação',
      'about.creds.g2': 'EQF Nível 4 Internacional',
      'about.creds.g3': 'Formações profissionais',
      'about.cred.edu': 'Bacharelado em Educação Física · Universidade FUMEC, Brasil',
      'about.cred.eqf1': 'Instrutora de Fitness',
      'about.cred.eqf2': 'Personal Trainer',
      'about.cred.eqf3': 'Instrutora de Ginástica Coletiva',
      'about.cred.pt1': 'Formação em Mio Aponeurose',
      'about.cred.pt2': 'Psicoterapia Corporal e Bioenergética',
      'about.cred.pt3': 'Terapia Corporal (Bodywork)',
      'about.cred.pt4': 'Massoterapeuta',
      'about.cred.pt5': 'Mestre em Reiki',
      'about.cred.pt6': 'Facilitadora de Breathwork',
      'about.cred.pt7': 'Instrutora de Dança',
      'about.cred.pt8': 'Facilitadora de Sensory Energetics®',

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
      'about.cta.p': 'Assine um membership, agende uma sessão avulsa, ou manda uma mensagem primeiro se quiser que ela te indique por onde começar.',
      'about.cta.book': 'Assinar Membership',
      'about.cta.bookPt': 'Sessão avulsa',
      'about.cta.talk': 'Falar com a Marina →',

      'about.borders.label': 'Para profissionais',
      'about.borders.h': 'Se torne um personal sem fronteiras',
      'about.borders.p1': 'Transforme sua experiência em Educação Física em uma carreira com oportunidades além do Brasil.',
      'about.borders.p2': 'Aprenda os caminhos para atuar como Personal Trainer na Austrália, validar sua experiência, conquistar clientes, se posicionar profissionalmente e construir uma carreira internacional.',
      'about.borders.cta': 'Comece sua jornada agora'
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
