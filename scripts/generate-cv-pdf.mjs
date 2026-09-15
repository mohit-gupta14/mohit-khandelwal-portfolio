import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontBoldOblique = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

  const PAGE_WIDTH = 595.28; // A4
  const PAGE_HEIGHT = 841.89; // A4
  const MARGIN_X = 40;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

  // Colors
  const darkNavy = rgb(0.08, 0.12, 0.22);
  const textDark = rgb(0.15, 0.15, 0.18);
  const textMuted = rgb(0.35, 0.35, 0.4);
  const primaryBlue = rgb(0.05, 0.35, 0.7);

  function createNewPage() {
    return pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  }

  let currentPage = createNewPage();
  let cursorY = PAGE_HEIGHT - 38;

  function checkPageBreak(neededHeight) {
    if (cursorY - neededHeight < 40) {
      currentPage = createNewPage();
      cursorY = PAGE_HEIGHT - 40;
    }
  }

  function sanitize(str) {
    return str
      .replace(/[–—]/g, '-')
      .replace(/[→]/g, '->')
      .replace(/[•]/g, '-')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/~/g, '~');
  }

  function drawSectionHeader(title) {
    checkPageBreak(28);
    cursorY -= 8;
    currentPage.drawText(title.toUpperCase(), {
      x: MARGIN_X,
      y: cursorY,
      size: 10.2,
      font: fontBold,
      color: darkNavy,
    });
    cursorY -= 4;
    currentPage.drawLine({
      start: { x: MARGIN_X, y: cursorY },
      end: { x: PAGE_WIDTH - MARGIN_X, y: cursorY },
      thickness: 1,
      color: primaryBlue,
    });
    cursorY -= 10;
  }

  function drawWrappedText(rawText, fontSize = 8.8, font = fontRegular, color = textDark, indent = 0, lineHeight = 11.5) {
    const text = sanitize(rawText);
    const maxWidth = CONTENT_WIDTH - indent;
    const words = text.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > maxWidth && currentLine) {
        checkPageBreak(lineHeight);
        currentPage.drawText(currentLine, {
          x: MARGIN_X + indent,
          y: cursorY,
          size: fontSize,
          font,
          color,
        });
        cursorY -= lineHeight;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      checkPageBreak(lineHeight);
      currentPage.drawText(currentLine, {
        x: MARGIN_X + indent,
        y: cursorY,
        size: fontSize,
        font,
        color,
      });
      cursorY -= lineHeight;
    }
  }

  function drawBullet(rawText, boldPrefix = '') {
    checkPageBreak(18);
    // Draw subtle filled circle for bullet
    currentPage.drawCircle({
      x: MARGIN_X + 6,
      y: cursorY + 3,
      size: 2,
      color: primaryBlue,
    });

    const fullText = boldPrefix ? `${boldPrefix} ${rawText}` : rawText;
    drawWrappedText(fullText, 8.5, fontRegular, textDark, 14, 11);
    cursorY -= 2;
  }

  // --- HEADER ---
  currentPage.drawText('MOHIT KHANDELWAL', {
    x: MARGIN_X,
    y: cursorY,
    size: 18,
    font: fontBold,
    color: darkNavy,
  });
  cursorY -= 16;

  currentPage.drawText(
    sanitize('Senior Full-Stack & Mobile Software Engineer | React, React Native, Next.js, Node.js | AWS & AI-Integrated Products'),
    {
      x: MARGIN_X,
      y: cursorY,
      size: 9.2,
      font: fontBold,
      color: primaryBlue,
    }
  );
  cursorY -= 13;

  const contactLine = sanitize('+91 9509959909  |  mk14novm@gmail.com  |  Jaipur, Rajasthan, India  |  linkedin.com/in/mohit-khandelwal  |  github.com/mohit-khandelwal');
  currentPage.drawText(contactLine, {
    x: MARGIN_X,
    y: cursorY,
    size: 8.2,
    font: fontRegular,
    color: textMuted,
  });
  cursorY -= 6;

  // --- PROFESSIONAL SUMMARY ---
  drawSectionHeader('Professional Summary');
  const summary = 'Full-Stack & Mobile Software Engineer with 5+ years of experience architecting and shipping production web and mobile applications used by 200,000+ users across healthcare, gaming, ticketing, e-learning, logistics, and commerce platforms. Proficient across the full stack: React.js, Next.js, and React Native on the frontend; Node.js, Express.js, and Python/FastAPI on the backend; and PostgreSQL, Supabase, and MongoDB for data persistence. Independently architected and delivered a full-stack SaaS product end-to-end (React Native, Next.js, Supabase, AWS), including Stripe subscription billing, role-based access control, and a Gemini API-powered AI chatbot. Owns features end-to-end - from system architecture and API design through CI/CD and production support - with a consistent record of measurable performance, reliability, and scalability improvements.';
  drawWrappedText(summary, 8.5, fontRegular, textDark, 0, 11.5);
  cursorY -= 3;

  // --- CORE TECHNICAL SKILLS ---
  drawSectionHeader('Core Technical Skills');

  const skills = [
    { label: 'Languages', val: 'TypeScript, JavaScript (ES2022+), Python, Kotlin, Swift' },
    { label: 'Frontend & Web', val: 'React.js, Next.js, React Native (CLI & Expo), HTML5, CSS3, Component-Based Architecture, Responsive Web Design, Redux Toolkit, Zustand, React Query, Recoil' },
    { label: 'Backend & APIs', val: 'Node.js, Express.js, Python, FastAPI, RESTful API Design, GraphQL (Hasura, Hot Chocolate), Firebase (Auth, Firestore, FCM), Microservice-Style API Contracts' },
    { label: 'Databases', val: 'PostgreSQL, MySQL, MongoDB, Supabase (Postgres, Auth, Realtime), SQL, Relational & NoSQL Data Modeling' },
    { label: 'Cloud & DevOps', val: 'AWS (Hosting, Messaging, Email Services), CI/CD (Fastlane, GitHub Actions, GitLab CI, Azure DevOps), CodePush OTA Releases, Docker-Adjacent Release Pipelines, Environment & Release Management' },
    { label: 'Mobile Engineering', val: 'React Native New Architecture (Fabric, TurboModules), Native Modules (Kotlin/Swift), Reanimated 3, FlashList, Offline-First Architecture, Live GPS/Location Tracking, Push Notifications (APNs/FCM), Deep Linking' },
    { label: 'AI Integration', val: 'Google Gemini API, Conversational AI / Chatbot Integration, Generative AI Feature Development' },
    { label: 'Practices & Testing', val: 'Clean Architecture, Payment Gateway Integration (Stripe, Razorpay), Jest, React Native Testing Library, Agile/Scrum, Accessibility (a11y), Role-Based Access Control (RBAC)' },
  ];

  for (const sk of skills) {
    checkPageBreak(14);
    const prefix = `${sk.label}: `;
    const prefixWidth = fontBold.widthOfTextAtSize(prefix, 8.4);
    
    currentPage.drawText(prefix, {
      x: MARGIN_X,
      y: cursorY,
      size: 8.4,
      font: fontBold,
      color: darkNavy,
    });
    
    const words = sanitize(sk.val).split(' ');
    let currentLine = '';
    let isFirstLine = true;

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const currentIndent = isFirstLine ? prefixWidth : 0;
      const availableWidth = CONTENT_WIDTH - currentIndent;
      const testWidth = fontRegular.widthOfTextAtSize(testLine, 8.4);

      if (testWidth > availableWidth && currentLine) {
        currentPage.drawText(currentLine, {
          x: MARGIN_X + currentIndent,
          y: cursorY,
          size: 8.4,
          font: fontRegular,
          color: textDark,
        });
        cursorY -= 10.5;
        checkPageBreak(12);
        currentLine = word;
        isFirstLine = false;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      const currentIndent = isFirstLine ? prefixWidth : 0;
      currentPage.drawText(currentLine, {
        x: MARGIN_X + currentIndent,
        y: cursorY,
        size: 8.4,
        font: fontRegular,
        color: textDark,
      });
      cursorY -= 11;
    }
  }

  // --- PROFESSIONAL EXPERIENCE ---
  drawSectionHeader('Professional Experience');

  // Anktech Software
  checkPageBreak(25);
  currentPage.drawText(sanitize('Anktech Software Pvt. Ltd. - Jaipur, India'), {
    x: MARGIN_X,
    y: cursorY,
    size: 9.5,
    font: fontBold,
    color: darkNavy,
  });
  const dateAnktech = sanitize('Sep 2021 - Present');
  currentPage.drawText(dateAnktech, {
    x: PAGE_WIDTH - MARGIN_X - fontBold.widthOfTextAtSize(dateAnktech, 9),
    y: cursorY,
    size: 9,
    font: fontBold,
    color: primaryBlue,
  });
  cursorY -= 11;

  currentPage.drawText(sanitize('Software Engineer -> Senior Software Engineer (Full-Stack & Mobile)'), {
    x: MARGIN_X,
    y: cursorY,
    size: 8.8,
    font: fontBoldOblique,
    color: textDark,
  });
  cursorY -= 10;

  drawWrappedText(
    'Software engineering firm delivering production web, mobile, and full-stack solutions across client engagements spanning healthcare, gaming, ticketing, restaurant tech, e-learning, energy, digital publishing, and alumni networking.',
    8.2,
    fontOblique,
    textMuted,
    0,
    10.5
  );
  cursorY -= 4;

  const engagements = [
    {
      title: 'iLant Health - Senior Software Engineer | Healthcare',
      date: 'Feb 2026 - Present',
      bullets: [
        'Own end-to-end architecture of a cardiometabolic health platform serving 15,000+ patients, designing modular TypeScript components and scalable data layers for longitudinal health tracking.',
        'Engineered a Fastlane + CodePush CI/CD pipeline that cut iOS/Android release cycles from 3 days to 4 hours, enabling zero-downtime OTA deployments.',
        'Partnered with backend engineers on RESTful API contracts and HIPAA-aligned data handling; implemented deep-linked navigation flows that reduced patient onboarding drop-off by ~30% in UAT.',
      ]
    },
    {
      title: 'NESO - Software Engineer | Energy & Sustainability',
      date: 'Oct 2025 - Jan 2026',
      bullets: [
        'Built new screens and features for an energy-efficiency mobile application, collaborating on API integration and state management.',
        'Led a full React Native upgrade from version 0.69.5 to the latest release, migrating the codebase to React Native\'s New Architecture (Fabric, TurboModules) across multiple breaking-change versions.',
      ]
    },
    {
      title: 'mbm connect & Palliwal Jain Digital Patrika - Software Engineer | Alumni Networking & Digital Publishing',
      date: 'Apr 2025 - Nov 2025',
      bullets: [
        'Delivered mobile application features for mbm connect, an alumni networking application, as part of a client engagement.',
        'Built features for Palliwal Jain Digital Patrika, a community platform combining digital news/publication (e-patrika) content with matrimonial matchmaking services, as part of a separate concurrent client engagement.',
      ]
    },
    {
      title: 'Ticketsir & Ticketsir Scanner - Software Engineer | Global Ticketing & Event Check-In',
      date: 'Aug 2023 - Jun 2025',
      bullets: [
        'Architected core platform modules - multi-role switching, real-time seat tracking, and dynamic pricing - for a ticketing platform serving 120,000+ events and 500,000+ users.',
        'Optimized GraphQL subscriptions (Hasura + Hot Chocolate) with normalized caching, eliminating 70% of over-fetching and cutting average API latency by 45ms.',
        'Built a high-throughput QR/barcode event check-in application with offline-first fallback (AsyncStorage), sustaining 1,200+ scans/hour at 99.97% accuracy across 50+ live events.',
      ]
    },
    {
      title: 'Kocha - Software Engineer | Gaming & Fitness',
      date: 'Jul 2024 - Sep 2024',
      bullets: [
        'Maintained an existing production gaming/fitness application - resolved bug tickets and handled scoped maintenance work during a short-term engagement.',
      ]
    },
    {
      title: 'CokoBar - Software Engineer | Restaurant Tech & Events',
      date: 'Nov 2023 - Aug 2024',
      bullets: [
        'Led development of a restaurant super-app - multi-gateway payments (Razorpay, Stripe), real-time seat reservation via WebSockets, and dynamic navigation - reaching a 4.4-star App Store rating within 60 days.',
        'Resolved FlatList performance bottlenecks via getItemLayout, memoization, and a Redux Toolkit migration, cutting render time by 60% and crash rate from 2.1% to 0.4%.',
        'Architected a Clean Architecture TypeScript codebase (domain/data/presentation) and collaborated on Express-based API endpoints for seat availability and order management.',
      ]
    },
    {
      title: 'Activi - Software Engineer | E-Learning & Commerce',
      date: 'Feb 2022 - Sep 2023',
      bullets: [
        'Delivered a multi-role e-learning platform (learner, seller, instructor) with RESTful API integration and role-based navigation, cutting onboarding time by 40%.',
        'Integrated the Razorpay payment gateway and collaborated on Node.js backend logic for course enrollment, supporting 10,000+ monthly transactions within 3 months of launch.',
        'Built shared React.js UI components reused across web and mobile, cutting duplicate interface logic by 50%.',
      ]
    },
    {
      title: 'Almapod - Software Engineer | Alumni Networking',
      date: 'Nov 2021 - Feb 2022',
      bullets: [
        'Shipped an alumni networking app (Android + iOS) in 3 months, launching at a 4.3-star App Store rating; implemented Firebase Firestore feeds and FCM notifications driving 65% Day-7 retention.',
        'Built 4 shared React.js components reused across web and mobile surfaces, contributing to a consistent cross-platform design system.',
      ]
    },
  ];

  for (const item of engagements) {
    checkPageBreak(35);
    cursorY -= 4;
    currentPage.drawText(sanitize(item.title), {
      x: MARGIN_X,
      y: cursorY,
      size: 8.8,
      font: fontBold,
      color: darkNavy,
    });
    currentPage.drawText(sanitize(item.date), {
      x: PAGE_WIDTH - MARGIN_X - fontRegular.widthOfTextAtSize(sanitize(item.date), 8.3),
      y: cursorY,
      size: 8.3,
      font: fontRegular,
      color: textMuted,
    });
    cursorY -= 11;

    for (const b of item.bullets) {
      drawBullet(b);
    }
  }

  // --- PROJECTS ---
  drawSectionHeader('Projects');

  const projects = [
    {
      title: 'Contract OS - Freelance Full-Stack & Mobile Engineer',
      date: 'Mar 2026 - Jun 2026',
      bullets: [
        'Independently architected, built, and shipped a full-stack SaaS platform end-to-end - from requirements through production release - now live in Australia and New Zealand.',
        'Built a live GPS tracking system for heavy vehicles, streaming real-time location pings to an interactive map across a React Native mobile app and a Next.js web admin panel.',
        'Designed role-based access control for the web admin panel and implemented tiered subscription plans with Stripe billing.',
        'Integrated a conversational AI chatbot using the Google Gemini API as an in-app assistant feature.',
        'Owned the complete stack solo - Supabase (database, auth, real-time sync) and AWS (hosting, messaging, email services, CI/CD pipeline) - with full architectural and delivery responsibility and no engineering team.',
      ]
    },
    {
      title: 'Self-Directed Projects - Backend & Applied AI (Independent Learning)',
      date: '',
      bullets: [
        'Built a Python/FastAPI backend implementing core REST patterns (authentication, login/logout, GET/POST endpoints) and a separate Gemini API-powered chatbot, undertaken to deepen backend and applied-AI skills outside of client work.',
      ]
    }
  ];

  for (const p of projects) {
    checkPageBreak(30);
    cursorY -= 4;
    currentPage.drawText(sanitize(p.title), {
      x: MARGIN_X,
      y: cursorY,
      size: 8.8,
      font: fontBold,
      color: darkNavy,
    });
    if (p.date) {
      currentPage.drawText(sanitize(p.date), {
        x: PAGE_WIDTH - MARGIN_X - fontRegular.widthOfTextAtSize(sanitize(p.date), 8.3),
        y: cursorY,
        size: 8.3,
        font: fontRegular,
        color: textMuted,
      });
    }
    cursorY -= 11;

    for (const b of p.bullets) {
      drawBullet(b);
    }
  }

  // --- EDUCATION ---
  drawSectionHeader('Education');

  checkPageBreak(30);
  currentPage.drawText('Master of Computer Applications (MCA)', {
    x: MARGIN_X,
    y: cursorY,
    size: 9,
    font: fontBold,
    color: darkNavy,
  });
  const mcaDate = sanitize('2020 - 2021');
  currentPage.drawText(mcaDate, {
    x: PAGE_WIDTH - MARGIN_X - fontRegular.widthOfTextAtSize(mcaDate, 8.5),
    y: cursorY,
    size: 8.5,
    font: fontRegular,
    color: textMuted,
  });
  cursorY -= 11;

  currentPage.drawText(sanitize('Rajasthan Technical University, Kota - SGPA: 10.0/10.0, University Topper'), {
    x: MARGIN_X,
    y: cursorY,
    size: 8.5,
    font: fontBoldOblique,
    color: primaryBlue,
  });
  cursorY -= 14;

  checkPageBreak(25);
  currentPage.drawText('Bachelor of Computer Applications (BCA)', {
    x: MARGIN_X,
    y: cursorY,
    size: 9,
    font: fontBold,
    color: darkNavy,
  });
  const bcaDate = sanitize('2015 - 2018');
  currentPage.drawText(bcaDate, {
    x: PAGE_WIDTH - MARGIN_X - fontRegular.widthOfTextAtSize(bcaDate, 8.5),
    y: cursorY,
    size: 8.5,
    font: fontRegular,
    color: textMuted,
  });
  cursorY -= 11;

  currentPage.drawText(sanitize('S.S. Jain Subodh P.G. College, Jaipur'), {
    x: MARGIN_X,
    y: cursorY,
    size: 8.5,
    font: fontRegular,
    color: textDark,
  });
  cursorY -= 12;

  const pages = pdfDoc.getPages();
  pages.forEach((page, idx) => {
    const pageNumText = `Page ${idx + 1} of ${pages.length} - Mohit Khandelwal Resume`;
    page.drawText(pageNumText, {
      x: MARGIN_X,
      y: 20,
      size: 7.5,
      font: fontRegular,
      color: textMuted,
    });
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '../public/Mohit_Khandelwal_React_Native_Developer_CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('CV PDF generated successfully at:', outputPath);
}

generateCV().catch((err) => {
  console.error('Error generating CV PDF:', err);
  process.exit(1);
});
