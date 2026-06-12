import { useState, useEffect, useCallback, type CSSProperties } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WORLD CUP 2026 DATA — Groups & Schedule
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const GROUPS = {
  A: ["Brazil", "Germany", "Japan", "Morocco"],
  B: ["France", "Argentina", "USA", "Senegal"],
  C: ["England", "Spain", "Mexico", "Cameroon"],
  D: ["Portugal", "Netherlands", "Ecuador", "Canada"],
  E: ["Belgium", "Croatia", "Saudi Arabia", "Tunisia"],
  F: ["Uruguay", "Colombia", "South Korea", "Australia"],
  G: ["Denmark", "Poland", "Switzerland", "Ghana"],
  H: ["Italy", "Serbia", "Ivory Coast", "New Zealand"],
};

const FLAGS = {
  Brazil: "🇧🇷", Germany: "🇩🇪", Japan: "🇯🇵", Morocco: "🇲🇦",
  France: "🇫🇷", Argentina: "🇦🇷", USA: "🇺🇸", Senegal: "🇸🇳",
  England: "🏴󠁧󠁢󠁥󠁯󠁧󠁿", Spain: "🇪🇸", Mexico: "🇲🇽", Cameroon: "🇨🇲",
  Portugal: "🇵🇹", Netherlands: "🇳🇱", Ecuador: "🇪🇨", Canada: "🇨🇦",
  Belgium: "🇧🇪", Croatia: "🇭🇷", "Saudi Arabia": "🇸🇦", Tunisia: "🇹🇳",
  Uruguay: "🇺🇾", Colombia: "🇨🇴", "South Korea": "🇰🇷", Australia: "🇦🇺",
  Denmark: "🇩🇰", Poland: "🇵🇱", Switzerland: "🇨🇭", Ghana: "🇬🇭",
  Italy: "🇮🇹", Serbia: "🇷🇸", "Ivory Coast": "🇨🇮", "New Zealand": "🇳🇿",
};

const VENUES = {
  "New York": "MetLife Stadium", "Los Angeles": "SoFi Stadium",
  "Dallas": "AT&T Stadium", "San Francisco": "Levi's Stadium",
  "Miami": "Hard Rock Stadium", "Seattle": "Lumen Field",
  "Boston": "Gillette Stadium", "Philadelphia": "Lincoln Financial",
  "Kansas City": "Arrowhead Stadium", "Houston": "NRG Stadium",
  "Atlanta": "Mercedes-Benz", "Guadalajara": "Estadio Akron",
  "Mexico City": "Estadio Azteca", "Monterrey": "Estadio BBVA",
  "Toronto": "BMO Field", "Vancouver": "BC Place",
};

const TEAM_AR = {
  Brazil: "البرازيل", Germany: "ألمانيا", Japan: "اليابان", Morocco: "المغرب",
  France: "فرنسا", Argentina: "الأرجنتين", USA: "الولايات المتحدة", Senegal: "السنغال",
  England: "إنجلترا", Spain: "إسبانيا", Mexico: "المكسيك", Cameroon: "الكاميرون",
  Portugal: "البرتغال", Netherlands: "هولندا", Ecuador: "الإكوادور", Canada: "كندا",
  Belgium: "بلجيكا", Croatia: "كرواتيا", "Saudi Arabia": "السعودية", Tunisia: "تونس",
  Uruguay: "أوروغواي", Colombia: "كولومبيا", "South Korea": "كوريا الجنوبية", Australia: "أستراليا",
  Denmark: "الدنمارك", Poland: "بولندا", Switzerland: "سويسرا", Ghana: "غانا",
  Italy: "إيطاليا", Serbia: "صربيا", "Ivory Coast": "ساحل العاج", "New Zealand": "نيوزيلندا",
};

const PLAYER_STATS = [
];

const STAGE_EN = {
  "مرحلة المجموعات": "Group Stage", "دور الـ 32": "Round of 32", "دور الـ 16": "Round of 16",
  "ربع النهائي": "Quarter-finals", "نصف النهائي": "Semi-finals", "نهائي": "Final",
};

const TEXT = {
  ar: {
    title: "كأس العالم 2026", liveUpcoming: "⚡ مباشر والقادمة", schedule: "📅 الجدول الكامل",
    standings: "🏆 الترتيب", alerts: "🔔 تنبيهاتي", stats: "📊 إحصائيات اللاعبين",
    calculator: "🧮 حاسبة التأهل", all: "الكل", live: "🔴 مباشر", upcoming: "⏰ القادمة",
    finished: "✓ انتهت", noMatches: "لا توجد مباريات في هذا التصنيف", group: "المجموعة",
    team: "المنتخب", played: "لعب", win: "ف", draw: "ت", loss: "خ", gf: "له", ga: "عليه",
    points: "نقاط", qualifies: "يتأهل للدور التالي", groupMatches: "مباريات المجموعة",
    fullScreen: "ملء الشاشة", exitFullScreen: "الخروج", notificationsOn: "التنبيهات مفعّلة",
    enableNotifications: "فعّل التنبيهات", venue: "الملعب", city: "المدينة", notify: "تنبيه",
    liveNow: "مباشر الآن:", commentary: "التعليق المباشر", topScorers: "إحصائيات اللاعبين",
    player: "اللاعب", goals: "أهداف", assists: "تمريرات حاسمة", yellow: "أصفر", red: "أحمر",
    calculatorHint: "اختر نتائج المباريات المتبقية لمعرفة المتأهلين المحتملين.",
    chooseResult: "اختر النتيجة", homeWin: "فوز صاحب الأرض", drawResult: "تعادل", awayWin: "فوز الضيف",
    projected: "الترتيب المتوقع", current: "بدون تغيير", liveCommentaryEmpty: "لا توجد أحداث مباشرة الآن",
    alertSystem: "نظام التنبيهات الذكي", alertDesc: "تنبيهات قبل المباريات وعند الانطلاق وتحديثات مباشرة.",
    browserAlerts: "فعّل إشعارات المتصفح", activeAlerts: "تنبيهاتي المُفعّلة", addAlert: "إضافة تنبيه لمباراة",
    kickoffAlert: "تنبيه الانطلاق", advanceReminder: "تذكير مسبق", beforeHour: "قبل ساعة", atKickoff: "عند الانطلاق",
    install: "تثبيت التطبيق", installed: "التطبيق مثبت",
    dataNoticeTitle: "البيانات المباشرة غير متصلة بعد",
    dataNotice: "تمت إزالة النتائج والمباريات التجريبية. لن يعرض التطبيق أي نتيجة أو موعد إلا بعد ربطه بمصدر بيانات موثوق.",
    openCommentary: "عرض تفاصيل المباراة", closeCommentary: "إغلاق التفاصيل",
  },
  en: {
    title: "World Cup 2026", liveUpcoming: "⚡ Live & Upcoming", schedule: "📅 Full Schedule",
    standings: "🏆 Standings", alerts: "🔔 My Alerts", stats: "📊 Player Stats",
    calculator: "🧮 Qualification Calculator", all: "All", live: "🔴 Live", upcoming: "⏰ Upcoming",
    finished: "✓ Finished", noMatches: "No matches in this category", group: "Group",
    team: "Team", played: "MP", win: "W", draw: "D", loss: "L", gf: "GF", ga: "GA",
    points: "Pts", qualifies: "Qualifies for the next round", groupMatches: "Group matches",
    fullScreen: "Full screen", exitFullScreen: "Exit", notificationsOn: "Alerts enabled",
    enableNotifications: "Enable alerts", venue: "Venue", city: "City", notify: "Alert",
    liveNow: "Live now:", commentary: "Live commentary", topScorers: "Player statistics",
    player: "Player", goals: "Goals", assists: "Assists", yellow: "Yellow", red: "Red",
    calculatorHint: "Choose the remaining match results to see the projected qualifiers.",
    chooseResult: "Choose result", homeWin: "Home win", drawResult: "Draw", awayWin: "Away win",
    projected: "Projected standings", current: "No change", liveCommentaryEmpty: "No live events right now",
    alertSystem: "Smart alert system", alertDesc: "Get pre-match, kickoff, and live match updates.",
    browserAlerts: "Enable browser notifications", activeAlerts: "Active alerts", addAlert: "Add a match alert",
    kickoffAlert: "Kickoff alert", advanceReminder: "Advance reminder", beforeHour: "One hour before", atKickoff: "At kickoff",
    install: "Install app", installed: "App installed",
    dataNoticeTitle: "Live data is not connected yet",
    dataNotice: "Demo results and fixtures were removed. The app will not show scores or match times until a verified data source is connected.",
    openCommentary: "View match details", closeCommentary: "Close details",
  },
};

// Generate realistic schedule (Group Stage)
const generateSchedule = () => {
  const matches = [];
  let id = 1;
  const cities = Object.keys(VENUES);
  const startDate = new Date("2026-06-11T18:00:00+03:00");

  Object.entries(GROUPS).forEach(([group, teams], gi) => {
    // Round 1
    matches.push({
      id: id++, group, round: 1, stage: "مرحلة المجموعات",
      home: teams[0], away: teams[1],
      homeScore: null, awayScore: null,
      date: new Date(startDate.getTime() + (gi * 2 + 0) * 86400000 * 0.5),
      city: cities[(gi * 2) % cities.length],
      status: "scheduled",
    });
    matches.push({
      id: id++, group, round: 1, stage: "مرحلة المجموعات",
      home: teams[2], away: teams[3],
      homeScore: null, awayScore: null,
      date: new Date(startDate.getTime() + (gi * 2 + 1) * 86400000 * 0.5),
      city: cities[(gi * 2 + 1) % cities.length],
      status: "scheduled",
    });
    // Round 2
    matches.push({
      id: id++, group, round: 2, stage: "مرحلة المجموعات",
      home: teams[0], away: teams[2],
      homeScore: null, awayScore: null,
      date: new Date(startDate.getTime() + (16 + gi) * 86400000 * 0.6),
      city: cities[(gi + 4) % cities.length],
      status: "scheduled",
    });
    matches.push({
      id: id++, group, round: 2, stage: "مرحلة المجموعات",
      home: teams[1], away: teams[3],
      homeScore: null, awayScore: null,
      date: new Date(startDate.getTime() + (17 + gi) * 86400000 * 0.6),
      city: cities[(gi + 5) % cities.length],
      status: "scheduled",
    });
    // Round 3
    matches.push({
      id: id++, group, round: 3, stage: "مرحلة المجموعات",
      home: teams[0], away: teams[3],
      homeScore: null, awayScore: null,
      date: new Date(startDate.getTime() + (32 + gi) * 86400000 * 0.55),
      city: cities[(gi + 8) % cities.length],
      status: "scheduled",
    });
    matches.push({
      id: id++, group, round: 3, stage: "مرحلة المجموعات",
      home: teams[1], away: teams[2],
      homeScore: null, awayScore: null,
      date: new Date(startDate.getTime() + (32 + gi) * 86400000 * 0.55),
      city: cities[(gi + 9) % cities.length],
      status: "scheduled",
    });
  });

  // Knockout stubs
  const knockoutStages = [
    { stage: "دور الـ 32", count: 16 },
    { stage: "دور الـ 16", count: 8 },
    { stage: "ربع النهائي", count: 4 },
    { stage: "نصف النهائي", count: 2 },
    { stage: "نهائي", count: 1 },
  ];
  knockoutStages.forEach(({ stage, count }) => {
    for (let i = 0; i < count; i++) {
      matches.push({
        id: id++, group: null, round: null, stage,
        home: "منتخب أ", away: "منتخب ب",
        homeScore: null, awayScore: null,
        date: new Date("2026-07-10T21:00:00+03:00"),
        city: cities[i % cities.length],
        status: "tbd",
      });
    }
  });

  return matches;
};

const initialMatches = [];

const LIVE_STATUSES = new Set(["1H", "HT", "2H", "ET", "BT", "P", "INT", "LIVE"]);
const COUNTING_STATUSES = new Set(["1H", "2H", "ET", "LIVE"]);
const FINISHED_STATUSES = new Set(["FT", "AET", "PEN"]);

const mapFixture = (item) => {
  const shortStatus = item.fixture.status.short;
  const groupMatch = item.league.round?.match(/Group\s+([A-L])/i);

  return {
    id: item.fixture.id,
    group: groupMatch?.[1] || null,
    round: item.league.round,
    stage: item.league.round || "World Cup 2026",
    home: item.teams.home.name,
    away: item.teams.away.name,
    homeLogo: item.teams.home.logo,
    awayLogo: item.teams.away.logo,
    homeScore: item.goals.home,
    awayScore: item.goals.away,
    date: new Date(item.fixture.date),
    city: item.fixture.venue?.city || "",
    venue: item.fixture.venue?.name || "",
    status: LIVE_STATUSES.has(shortStatus) ? "live" : FINISHED_STATUSES.has(shortStatus) ? "final" : "scheduled",
    statusShort: shortStatus,
    liveMinute: item.fixture.status.elapsed,
    events: (item.events || []).map(mapEvent),
  };
};

const mapEvent = (event) => ({
  minute: event.time.elapsed,
  type: event.type === "Goal" ? "goal" : event.type === "Card" ? (event.detail === "Red Card" ? "red" : "yellow") : event.type === "subst" ? "sub" : "info",
  player: event.player?.name || event.detail,
  team: event.team?.name || "",
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPUTE STANDINGS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const computeStandings = (matches) => {
  const standings = {};
  Object.entries(GROUPS).forEach(([group, teams]) => {
    standings[group] = teams.map((t) => ({
      team: t, mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0,
    }));
  });

  matches.forEach((m) => {
    if (!m.group || m.homeScore === null || m.status === "tbd") return;
    const gs = standings[m.group];
    if (!gs) return;
    const h = gs.find((x) => x.team === m.home);
    const a = gs.find((x) => x.team === m.away);
    if (!h || !a) return;
    h.mp++; a.mp++;
    h.gf += m.homeScore; h.ga += m.awayScore;
    a.gf += m.awayScore; a.ga += m.homeScore;
    h.gd = h.gf - h.ga; a.gd = a.gf - a.ga;
    if (m.homeScore > m.awayScore) { h.w++; h.pts += 3; a.l++; }
    else if (m.homeScore < m.awayScore) { a.w++; a.pts += 3; h.l++; }
    else { h.d++; h.pts++; a.d++; a.pts++; }
  });

  Object.keys(standings).forEach((g) => {
    standings[g].sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  });
  return standings;
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NOTIFICATION SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const requestNotifPermission = async () => {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  const perm = await Notification.requestPermission();
  return perm === "granted";
};

const sendNotif = (title, body, icon = "⚽") => {
  if (Notification.permission === "granted") {
    new Notification(`${icon} ${title}`, { body, icon: "/favicon.ico" });
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const eventIcon = (type) => ({ goal: "⚽", yellow: "🟨", red: "🟥", sub: "🔄" }[type] || "•");

const panelStyle: CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
};

const headerButtonStyle: CSSProperties = {
  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
  color: "#cbd5e1", borderRadius: 20, padding: "6px 12px", fontSize: 12,
  cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
};

const smallButtonStyle: CSSProperties = {
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer",
};

const selectStyle: CSSProperties = {
  background: "#14233d", border: "1px solid rgba(96,165,250,0.35)", color: "#e2e8f0",
  borderRadius: 8, padding: "7px 10px", minWidth: 170,
};

const statsRowStyle: CSSProperties = {
  display: "grid", gridTemplateColumns: "2fr 1.5fr repeat(4, 0.7fr)",
  gap: 10, padding: "12px 16px", alignItems: "center", fontSize: 13,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function WorldCupTracker() {
  const [matches, setMatches] = useState(initialMatches);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState("");
  const [tab, setTab] = useState("live"); // live | schedule | standings | alerts
  const [selectedGroup, setSelectedGroup] = useState("A");
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [notifGranted, setNotifGranted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [lang, setLang] = useState("ar");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [calcGroup, setCalcGroup] = useState("E");
  const [predictions, setPredictions] = useState({});
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(
    () => window.matchMedia?.("(display-mode: standalone)").matches || Boolean((window.navigator as any).standalone),
  );
  const t = TEXT[lang];
  const teamName = (team) => lang === "ar" ? (TEAM_AR[team] || team) : team;

  const loadMatches = useCallback(async () => {
    try {
      const response = await fetch("/.netlify/functions/world-cup");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load matches");
      const freshMatches = data.fixtures.map(mapFixture).sort((a, b) => a.date.getTime() - b.date.getTime());
      setMatches((current) => freshMatches.map((fresh) => ({
        ...fresh,
        events: fresh.events.length ? fresh.events : (current.find((match) => match.id === fresh.id)?.events || []),
      })));
      setDataError("");
    } catch (error) {
      setDataError(error instanceof Error ? error.message : "Could not load matches");
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMatches();
    const timer = window.setInterval(loadMatches, 15 * 60_000);
    return () => window.clearInterval(timer);
  }, [loadMatches]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMatches((current) => current.map((match) => {
        if (!COUNTING_STATUSES.has(match.statusShort) || match.liveMinute === null) return match;
        const phaseLimit = match.statusShort === "1H" ? 45 : match.statusShort === "2H" ? 90 : match.statusShort === "ET" ? 120 : Infinity;
        return { ...match, liveMinute: Math.min(match.liveMinute + 1, phaseLimit) };
      }));
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const standings = computeStandings(matches);
  const projectedMatches = matches.map((m) => {
    const prediction = predictions[m.id];
    if (!prediction) return m;
    const scores = prediction === "home" ? [1, 0] : prediction === "away" ? [0, 1] : [0, 0];
    return { ...m, homeScore: scores[0], awayScore: scores[1], status: "final" };
  });
  const projectedStandings = computeStandings(projectedMatches);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const onBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  };

  const installApp = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") setInstallPrompt(null);
      return;
    }
    addToast(
      lang === "ar"
        ? "على iPhone: اضغط مشاركة ثم إضافة إلى الشاشة الرئيسية"
        : "On iPhone: tap Share, then Add to Home Screen",
      "info",
    );
  };

  const addToast = useCallback((msg, type = "info") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  }, []);

  const handleNotifToggle = async () => {
    const ok = await requestNotifPermission();
    setNotifGranted(ok);
    if (ok) {
      addToast("✅ التنبيهات مفعّلة! ستصلك إشعارات قبل كل مباراة بساعة", "success");
      sendNotif("كأس العالم 2026", "تم تفعيل التنبيهات بنجاح! ⚽");
    } else {
      addToast("⚠️ لم يتم السماح بالتنبيهات من المتصفح", "warn");
    }
  };

  const liveMatches = matches.filter((m) => m.status === "live");
  const upcomingMatches = matches.filter((m) => m.status === "scheduled").slice(0, 20);
  const finishedMatches = matches.filter((m) => m.status === "final");
  const selectedMatch = matches.find((m) => m.id === selectedMatchId) || null;

  const displayMatches =
    filter === "live" ? liveMatches :
    filter === "upcoming" ? upcomingMatches :
    filter === "finished" ? finishedMatches :
    [...liveMatches, ...upcomingMatches, ...finishedMatches.slice(0, 5)];
  const scheduleStages = [...new Set(matches.map((match) => match.stage))];

  return (
    <div className="app-shell" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 50%, #0a0f1e 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e2e8f0",
      direction: lang === "ar" ? "rtl" : "ltr",
    }}>
      {/* TOASTS */}
      <div style={{ position: "fixed", top: 16, left: 16, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
        {toasts.map((t) => (
          <div key={t.id} style={{
            background: t.type === "success" ? "#065f46" : t.type === "warn" ? "#78350f" : "#1e3a5f",
            border: `1px solid ${t.type === "success" ? "#10b981" : t.type === "warn" ? "#f59e0b" : "#3b82f6"}`,
            borderRadius: 10, padding: "10px 16px", fontSize: 13, maxWidth: 280,
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            animation: "slideIn 0.3s ease",
          }}>{t.msg}</div>
        ))}
      </div>

      {/* HEADER */}
      <div className="top-header" style={{
        background: "linear-gradient(135deg, #1a3a6b 0%, #0f2d5a 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0 20px",
      }}>
        <div style={{ maxWidth: isFullscreen ? 1500 : 900, margin: "0 auto" }}>
          <div className="header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, background: "linear-gradient(135deg, #c8a84b, #f0d060)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, boxShadow: "0 0 20px rgba(200,168,75,0.4)",
              }}>⚽</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: "#f0d060", letterSpacing: 0.5 }}>{t.title}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>USA · Canada · Mexico</div>
              </div>
            </div>
            <div className="header-actions" style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={headerButtonStyle}>
                🌐 {lang === "ar" ? "English" : "العربية"}
              </button>
              <button onClick={toggleFullscreen} style={headerButtonStyle}>
                ⛶ {isFullscreen ? t.exitFullScreen : t.fullScreen}
              </button>
              <button onClick={installApp} disabled={isInstalled} style={{
                ...headerButtonStyle,
                opacity: isInstalled ? 0.6 : 1,
                cursor: isInstalled ? "default" : "pointer",
                color: "#f0d060",
              }}>
                {isInstalled ? `✓ ${t.installed}` : `⬇ ${t.install}`}
              </button>
            </div>
          </div>

          {/* LIVE TICKER */}
          {liveMatches.length > 0 && (
            <div style={{
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 8, padding: "8px 14px", margin: "12px 0",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 8, height: 8, background: "#ef4444", borderRadius: "50%",
                animation: "pulse 1s infinite",
              }} />
              <span style={{ fontSize: 12, color: "#fca5a5" }}>{t.liveNow}</span>
              {liveMatches.map((m) => (
                <button key={m.id} onClick={() => {
                  setSelectedMatchId(m.id);
                  setTab("live");
                }} style={{
                  background: "none", border: 0, color: "#fff", cursor: "pointer",
                  fontSize: 13, fontWeight: 600, padding: 0,
                }}>
                  {FLAGS[m.home]} {teamName(m.home)} {m.homeScore} - {m.awayScore} {teamName(m.away)} {FLAGS[m.away]}
                  <span style={{ color: "#ef4444", marginRight: 4 }}> • {m.liveMinute}'</span>
                </button>
              ))}
            </div>
          )}

          {/* TABS */}
          <div className="app-tabs" style={{ display: "flex", gap: 0, marginTop: 4, overflowX: "auto" }}>
            {[
              { key: "live", label: t.liveUpcoming },
              { key: "schedule", label: t.schedule },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                background: "none", border: "none", color: tab === t.key ? "#f0d060" : "#94a3b8",
                padding: "12px 16px", fontSize: 13, cursor: "pointer", fontWeight: tab === t.key ? 700 : 400,
                borderBottom: tab === t.key ? "2px solid #f0d060" : "2px solid transparent",
                transition: "all 0.2s",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="app-content" style={{ maxWidth: isFullscreen ? 1500 : 900, margin: "0 auto", padding: "20px 20px" }}>
        {dataError && <div style={{
          background: "rgba(245,158,11,0.09)", border: "1px solid rgba(245,158,11,0.35)",
          borderRadius: 12, padding: 16, marginBottom: 20,
        }}>
          <div style={{ color: "#fbbf24", fontWeight: 700, marginBottom: 5 }}>{t.dataNoticeTitle}</div>
          <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7 }}>{dataError}</div>
        </div>}

        {/* ── LIVE & UPCOMING ── */}
        {tab === "live" && (
          <div>
            {/* Filter pills */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { key: "all", label: t.all },
                { key: "live", label: t.live },
                { key: "upcoming", label: t.upcoming },
                { key: "finished", label: t.finished },
              ].map((f) => (
                <button key={f.key} onClick={() => setFilter(f.key)} style={{
                  background: filter === f.key ? "#1e3a6b" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${filter === f.key ? "#3b82f6" : "rgba(255,255,255,0.1)"}`,
                  color: filter === f.key ? "#60a5fa" : "#94a3b8",
                  borderRadius: 20, padding: "6px 16px", fontSize: 12, cursor: "pointer",
                }}>{f.label}</button>
              ))}
            </div>

            {selectedMatch && (
              <MatchDetails
                match={selectedMatch}
                t={t}
                teamName={teamName}
                onClose={() => setSelectedMatchId(null)}
              />
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {displayMatches.map((m) => (
                <MatchCard
                  key={m.id}
                  match={m}
                  lang={lang}
                  t={t}
                  teamName={teamName}
                  selected={m.id === selectedMatchId}
                  onSelect={() => setSelectedMatchId(m.id)}
                  onNotify={() => addToast(`🔔 سيتم تذكيرك بمباراة ${m.home} × ${m.away}`, "success")}
                />
              ))}
              {displayMatches.length === 0 && (
                <div style={{ textAlign: "center", color: "#4b5563", padding: 40, fontSize: 14 }}>
                  {dataLoading ? (lang === "ar" ? "جارٍ تحميل البيانات الرسمية..." : "Loading official data...") : t.noMatches}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── FULL SCHEDULE ── */}
        {tab === "schedule" && (
          <div>
            {scheduleStages.map((stage) => {
              const stageMatches = matches.filter((m) => m.stage === stage && m.status !== "tbd");
              if (stageMatches.length === 0) return null;
              return (
                <div key={stage} style={{ marginBottom: 28 }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
                  }}>
                    <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.08)" }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#f0d060", whiteSpace: "nowrap" }}>{lang === "ar" ? (STAGE_EN[stage] || stage) : (STAGE_EN[stage] || stage)}</span>
                    <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.08)" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {stageMatches.map((m) => <MatchCard key={m.id} match={m} compact lang={lang} t={t} teamName={teamName} onSelect={() => {
                      setSelectedMatchId(m.id);
                      setTab("live");
                    }} />)}
                  </div>
                </div>
              );
            })}
            {!dataLoading && scheduleStages.length === 0 && (
              <div style={{ textAlign: "center", color: "#4b5563", padding: 40, fontSize: 14 }}>{t.noMatches}</div>
            )}
          </div>
        )}

        {/* ── STANDINGS ── */}
        {tab === "standings" && (
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {Object.keys(GROUPS).map((g) => (
                <button key={g} onClick={() => setSelectedGroup(g)} style={{
                  background: selectedGroup === g ? "#1e3a6b" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${selectedGroup === g ? "#3b82f6" : "rgba(255,255,255,0.1)"}`,
                  color: selectedGroup === g ? "#60a5fa" : "#94a3b8",
                  borderRadius: 8, padding: "8px 18px", fontSize: 13,
                  cursor: "pointer", fontWeight: selectedGroup === g ? 700 : 400,
                }}>{t.group} {g}</button>
              ))}
            </div>

            <div className="standings-table" style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14, overflow: "hidden",
            }}>
              {/* Header */}
              <div style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                padding: "10px 16px", background: "rgba(255,255,255,0.04)",
                fontSize: 11, color: "#6b7280", fontWeight: 700, textAlign: "center",
              }}>
                <div style={{ textAlign: lang === "ar" ? "right" : "left" }}>{t.team}</div>
                <div>{t.played}</div><div>{t.win}</div><div>{t.draw}</div><div>{t.loss}</div>
                <div>{t.gf}</div><div>{t.ga}</div><div>{t.points}</div>
              </div>
              {(standings[selectedGroup] || []).map((row, i) => (
                <div key={row.team} style={{
                  display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                  padding: "12px 16px", textAlign: "center",
                  background: i < 2 ? "rgba(59,130,246,0.06)" : "transparent",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  alignItems: "center",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, textAlign: "right" }}>
                    <span style={{
                      width: 20, height: 20, background: i < 2 ? "#1e40af" : "rgba(255,255,255,0.08)",
                      borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700, color: i < 2 ? "#93c5fd" : "#6b7280",
                      flexShrink: 0,
                    }}>{i + 1}</span>
                    <span style={{ fontSize: 16 }}>{FLAGS[row.team]}</span>
                    <span style={{ fontSize: 13, fontWeight: i < 2 ? 600 : 400 }}>{teamName(row.team)}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#94a3b8" }}>{row.mp}</div>
                  <div style={{ fontSize: 13, color: "#10b981" }}>{row.w}</div>
                  <div style={{ fontSize: 13, color: "#f59e0b" }}>{row.d}</div>
                  <div style={{ fontSize: 13, color: "#ef4444" }}>{row.l}</div>
                  <div style={{ fontSize: 13 }}>{row.gf}</div>
                  <div style={{ fontSize: 13 }}>{row.ga}</div>
                  <div style={{
                    fontSize: 14, fontWeight: 700,
                    color: i < 2 ? "#60a5fa" : "#e2e8f0",
                  }}>{row.pts}</div>
                </div>
              ))}
              <div style={{
                padding: "8px 16px", background: "rgba(59,130,246,0.04)",
                fontSize: 11, color: "#4b5563", display: "flex", gap: 16,
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 8, height: 8, background: "#1e40af", borderRadius: "50%", display: "inline-block" }} />
                  {t.qualifies}
                </span>
              </div>
            </div>

            {/* Group matches */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>{t.groupMatches} {selectedGroup}</div>
              {matches.filter((m) => m.group === selectedGroup && m.status !== "tbd").map((m) => (
                <MatchCard key={m.id} match={m} compact lang={lang} t={t} teamName={teamName} />
              ))}
            </div>
          </div>
        )}

        {/* ── PLAYER STATS ── */}
        {tab === "stats" && (
          <div>
            <SectionTitle>{t.topScorers}</SectionTitle>
            <div style={{ ...panelStyle, overflowX: "auto" }}>
              <div style={{ minWidth: 650 }}>
                <div style={statsRowStyle}>
                  <strong>{t.player}</strong><strong>{t.team}</strong><strong>{t.goals}</strong>
                  <strong>{t.assists}</strong><strong>{t.yellow}</strong><strong>{t.red}</strong>
                </div>
                {PLAYER_STATS.map((p, index) => (
                  <div key={p.player} style={{ ...statsRowStyle, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ fontWeight: 600, color: index === 0 ? "#f0d060" : "#e2e8f0" }}>{index + 1}. {p.player}</span>
                    <span>{FLAGS[p.team]} {teamName(p.team)}</span>
                    <strong style={{ color: "#10b981" }}>{p.goals}</strong>
                    <strong style={{ color: "#60a5fa" }}>{p.assists}</strong>
                    <strong style={{ color: "#facc15" }}>{p.yellow}</strong>
                    <strong style={{ color: "#ef4444" }}>{p.red}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── QUALIFICATION CALCULATOR ── */}
        {tab === "calculator" && (
          <div>
            <SectionTitle>{t.calculator}</SectionTitle>
            <p style={{ color: "#94a3b8", fontSize: 13 }}>{t.calculatorHint}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "18px 0" }}>
              {Object.keys(GROUPS).map((g) => (
                <button key={g} onClick={() => setCalcGroup(g)} style={{
                  ...smallButtonStyle,
                  borderColor: calcGroup === g ? "#3b82f6" : "rgba(255,255,255,0.1)",
                  color: calcGroup === g ? "#60a5fa" : "#94a3b8",
                }}>{t.group} {g}</button>
              ))}
            </div>
            <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
              {matches.filter((m) => m.group === calcGroup && m.status === "scheduled").map((m) => (
                <div key={m.id} style={{ ...panelStyle, padding: 14, display: "flex", gap: 14, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <span>{FLAGS[m.home]} {teamName(m.home)} × {teamName(m.away)} {FLAGS[m.away]}</span>
                  <select value={predictions[m.id] || ""} onChange={(e) => setPredictions((p) => ({ ...p, [m.id]: e.target.value }))} style={selectStyle}>
                    <option value="">{t.current}</option>
                    <option value="home">{t.homeWin}</option>
                    <option value="draw">{t.drawResult}</option>
                    <option value="away">{t.awayWin}</option>
                  </select>
                </div>
              ))}
            </div>
            <SectionTitle>{t.projected}</SectionTitle>
            <StandingsMini rows={projectedStandings[calcGroup]} t={t} teamName={teamName} />
          </div>
        )}

        {/* ── ALERTS ── */}
        {tab === "alerts" && (
          <div>
            <div style={{
              background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 12, padding: 16, marginBottom: 20,
              display: "flex", gap: 14, alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 24 }}>🔔</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.alertSystem}</div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                  {t.alertDesc}
                </div>
              </div>
            </div>

            {!notifGranted && (
              <button onClick={handleNotifToggle} style={{
                width: "100%", background: "linear-gradient(135deg, #1e40af, #1e3a8a)",
                border: "none", color: "#fff", borderRadius: 12,
                padding: "14px", fontSize: 14, cursor: "pointer", fontWeight: 600,
                marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                🔔 {t.browserAlerts}
              </button>
            )}

            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>{t.activeAlerts}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {notifications.map((n) => (
                <div key={n.id} style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, padding: "14px 16px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{teamName(n.home)} × {teamName(n.away)}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      {n.type === "kickoff" ? `⚡ ${t.kickoffAlert}` : `🕐 ${t.advanceReminder}`} · {t[n.time]}
                    </div>
                  </div>
                  <div
                    onClick={() => setNotifications((prev) =>
                      prev.map((x) => x.id === n.id ? { ...x, active: !x.active } : x)
                    )}
                    style={{
                      width: 44, height: 24, borderRadius: 12,
                      background: n.active ? "#1e40af" : "rgba(255,255,255,0.1)",
                      position: "relative", cursor: "pointer", transition: "background 0.2s",
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", background: "#fff",
                      position: "absolute", top: 3, transition: "right 0.2s",
                      right: n.active ? 3 : 23,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>{t.addAlert}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {upcomingMatches.slice(0, 6).map((m) => (
                  <div key={m.id} style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10, padding: "10px 14px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <span style={{ fontSize: 13 }}>
                      {FLAGS[m.home]} {teamName(m.home)} × {teamName(m.away)} {FLAGS[m.away]}
                    </span>
                    <button onClick={() => {
                      setNotifications((p) => [...p, {
                        id: Date.now(), home: m.home, away: m.away,
                        type: "kickoff", time: "beforeHour", active: true,
                      }]);
                      addToast(`✅ تم إضافة تنبيه لمباراة ${m.home} × ${m.away}`, "success");
                    }} style={{
                      background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)",
                      color: "#60a5fa", borderRadius: 8, padding: "4px 12px", fontSize: 12, cursor: "pointer",
                    }}>+ {t.notify}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes slideIn { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
}

function SectionTitle({ children }) {
  return <div style={{ color: "#f0d060", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{children}</div>;
}

function MatchDetails({ match, t, teamName, onClose }) {
  const events = match.events || [];

  return (
    <div style={{ ...panelStyle, padding: 16, marginBottom: 18, borderColor: "rgba(59,130,246,0.35)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
        <div>
          <strong style={{ color: "#f0d060", fontSize: 14 }}>
            {teamName(match.home)} × {teamName(match.away)}
          </strong>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>{t.commentary}</div>
        </div>
        <button onClick={onClose} style={{ ...smallButtonStyle, color: "#94a3b8" }}>{t.closeCommentary}</button>
      </div>
      {events.length === 0 ? <span style={{ color: "#6b7280", fontSize: 12 }}>{t.liveCommentaryEmpty}</span> : (
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 3 }}>
          {events.map((event, index) => (
            <div key={`${event.minute}-${index}`} style={{
              minWidth: 180, background: "rgba(255,255,255,0.035)", borderRadius: 9,
              padding: "9px 11px", border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{ fontSize: 12, color: "#f0d060", marginBottom: 4 }}>{event.minute}' {eventIcon(event.type)}</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{event.player}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>{teamName(event.team)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StandingsMini({ rows, t, teamName }) {
  return (
    <div style={{ ...panelStyle, overflow: "hidden" }}>
      {rows.map((row, index) => (
        <div key={row.team} style={{
          display: "grid", gridTemplateColumns: "32px 1fr 60px 60px", gap: 8,
          alignItems: "center", padding: "12px 14px", borderTop: index ? "1px solid rgba(255,255,255,0.06)" : "none",
          background: index < 2 ? "rgba(59,130,246,0.07)" : "transparent",
        }}>
          <strong style={{ color: index < 2 ? "#60a5fa" : "#6b7280" }}>{index + 1}</strong>
          <span>{FLAGS[row.team]} {teamName(row.team)}</span>
          <span style={{ color: "#94a3b8", fontSize: 12 }}>{t.gf}: {row.gf}</span>
          <strong>{row.pts} {t.points}</strong>
        </div>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MATCH CARD COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function MatchCard({
  match: m, compact = false, onNotify = null, onSelect = null, selected = false,
  lang = "ar", t = TEXT.ar, teamName = (team) => team,
}) {
  const isLive = m.status === "live";
  const isDone = m.status === "final";
  const isTbd = m.status === "tbd";

  if (isTbd) return null;

  return (
    <div
      className="match-card"
      onClick={onSelect || undefined}
      onKeyDown={onSelect ? (event) => {
        if (event.key === "Enter" || event.key === " ") onSelect();
      } : undefined}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={onSelect ? `${t.openCommentary}: ${teamName(m.home)} × ${teamName(m.away)}` : undefined}
      style={{
      background: isLive
        ? "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.03))"
        : "rgba(255,255,255,0.03)",
      border: `1px solid ${selected ? "#3b82f6" : isLive ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 12,
      padding: compact ? "10px 14px" : "14px 18px",
      transition: "border-color 0.2s",
      cursor: onSelect ? "pointer" : "default",
      boxShadow: selected ? "0 0 0 2px rgba(59,130,246,0.15)" : "none",
    }}>
      <div className="match-row" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Status badge */}
        <div style={{ textAlign: "center", minWidth: 54 }}>
          {isLive ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                <div style={{ width: 6, height: 6, background: "#ef4444", borderRadius: "50%", animation: "pulse 1s infinite" }} />
                <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 700 }}>LIVE</span>
              </div>
              <div style={{ fontSize: 13, color: "#fca5a5", fontWeight: 700 }}>{m.liveMinute}'</div>
            </div>
          ) : isDone ? (
            <div style={{ fontSize: 11, color: "#6b7280" }}>FT</div>
          ) : (
            <div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>{new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en", { month: "short", day: "numeric" }).format(m.date)}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en", { hour: "2-digit", minute: "2-digit", hour12: true }).format(m.date)}</div>
            </div>
          )}
        </div>

        {/* Teams & Score */}
        <div className="match-teams" style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
          {/* Home */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
            <span style={{ fontSize: compact ? 13 : 14, fontWeight: isDone || isLive ? 600 : 400 }}>{teamName(m.home)}</span>
            {m.homeLogo ? <img src={m.homeLogo} alt="" style={{ width: compact ? 20 : 24, height: compact ? 20 : 24, objectFit: "contain" }} /> : <span style={{ fontSize: compact ? 18 : 22 }}>{FLAGS[m.home] || "🏳"}</span>}
          </div>

          {/* Score */}
          <div style={{
            minWidth: 60, textAlign: "center",
            background: isLive ? "rgba(239,68,68,0.15)" : isDone ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
            borderRadius: 8, padding: "4px 10px",
          }}>
            {m.homeScore !== null ? (
              <span style={{ fontSize: compact ? 16 : 18, fontWeight: 700, color: isLive ? "#fca5a5" : "#e2e8f0" }}>
                {m.homeScore} - {m.awayScore}
              </span>
            ) : (
              <span style={{ fontSize: 11, color: "#4b5563" }}>vs</span>
            )}
          </div>

          {/* Away */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-start" }}>
            {m.awayLogo ? <img src={m.awayLogo} alt="" style={{ width: compact ? 20 : 24, height: compact ? 20 : 24, objectFit: "contain" }} /> : <span style={{ fontSize: compact ? 18 : 22 }}>{FLAGS[m.away] || "🏳"}</span>}
            <span style={{ fontSize: compact ? 13 : 14, fontWeight: isDone || isLive ? 600 : 400 }}>{teamName(m.away)}</span>
          </div>
        </div>

        {/* Meta */}
        <div className="match-meta" style={{ textAlign: "left", minWidth: 80 }}>
          {m.group && <div style={{ fontSize: 11, color: "#4b5563" }}>{t.group} {m.group}</div>}
          {(m.venue || m.city) && <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${m.venue || VENUES[m.city] || ""}, ${m.city}`)}`}
            onClick={(event) => event.stopPropagation()}
            target="_blank" rel="noreferrer" title={`${t.venue}: ${m.venue || VENUES[m.city] || ""}`}
            style={{ display: "block", fontSize: 11, color: "#94a3b8", textDecoration: "none" }}
          >📍 {m.venue || VENUES[m.city] || m.city}</a>}
          {m.city && <div style={{ fontSize: 10, color: "#4b5563" }}>{m.city}</div>}
          {!compact && m.status === "scheduled" && onNotify && (
            <button onClick={(event) => {
              event.stopPropagation();
              onNotify();
            }} style={{
              marginTop: 4, background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.25)", color: "#60a5fa",
              borderRadius: 6, padding: "2px 8px", fontSize: 10, cursor: "pointer",
            }}>🔔 {t.notify}</button>
          )}
        </div>
      </div>
    </div>
  );
}
