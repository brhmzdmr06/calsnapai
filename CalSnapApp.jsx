"use client";
import { useState, useRef, useCallback, useEffect } from "react";

const LANGUAGES = {
  en: { name: "English", flag: "🇬🇧", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Snap your food · Instant nutrition",uploadTitle:"Upload a food photo",uploadSub:"Tap to choose or drag & drop",retake:"← Retake",analyze:"✨ Analyze Food",scanning:"Scanning...",analyzing:"Analyzing nutrition...",health:"Health",totalCal:"total calories",protein:"Protein",carbs:"Carbs",fat:"Fat",detected:"Detected Items",tip:"💡",dailyGoal:"Daily Goal",consumed:"Consumed",remaining:"Remaining",history:"Meal History",noHistory:"No meals logged yet",settings:"Settings",setGoals:"Set Daily Goals",saveGoals:"Save Goals",calories:"Calories",tab_today:"Today",tab_history:"History",tab_settings:"Settings",tab_snap:"Snap",logMeal:"Log This Meal",mealLogged:"Meal logged!",dismiss:"Dismiss",changeKey:"Change API Key" }},
  tr: { name: "Türkçe", flag: "🇹🇷", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Yemeğini çek · Anında besin analizi",uploadTitle:"Yemek fotoğrafı yükle",uploadSub:"Seçmek için dokun veya sürükle bırak",retake:"← Yeniden Çek",analyze:"✨ Analiz Et",scanning:"Taranıyor...",analyzing:"Besin analizi yapılıyor...",health:"Sağlık",totalCal:"toplam kalori",protein:"Protein",carbs:"Karbonhidrat",fat:"Yağ",detected:"Tespit Edilen Yiyecekler",tip:"💡",dailyGoal:"Günlük Hedef",consumed:"Tüketilen",remaining:"Kalan",history:"Öğün Geçmişi",noHistory:"Henüz öğün kaydedilmedi",settings:"Ayarlar",setGoals:"Günlük Hedefleri Ayarla",saveGoals:"Hedefleri Kaydet",calories:"Kalori",tab_today:"Bugün",tab_history:"Geçmiş",tab_settings:"Ayarlar",tab_snap:"Tara",logMeal:"Öğünü Kaydet",mealLogged:"Öğün kaydedildi!",dismiss:"Kapat",changeKey:"API Anahtarını Değiştir" }},
  es: { name: "Español", flag: "🇪🇸", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Fotografía tu comida · Nutrición al instante",uploadTitle:"Sube una foto de tu comida",uploadSub:"Toca para elegir o arrastra",retake:"← Repetir",analyze:"✨ Analizar Comida",scanning:"Analizando...",analyzing:"Analizando nutrición...",health:"Salud",totalCal:"calorías totales",protein:"Proteína",carbs:"Carbos",fat:"Grasa",detected:"Alimentos detectados",tip:"💡",dailyGoal:"Meta Diaria",consumed:"Consumido",remaining:"Restante",history:"Historial",noHistory:"Sin comidas registradas",settings:"Ajustes",setGoals:"Establecer metas",saveGoals:"Guardar metas",calories:"Calorías",tab_today:"Hoy",tab_history:"Historial",tab_settings:"Ajustes",tab_snap:"Foto",logMeal:"Registrar comida",mealLogged:"¡Registrado!",dismiss:"Cerrar",changeKey:"Cambiar clave API" }},
  fr: { name: "Français", flag: "🇫🇷", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Photographiez vos repas · Nutrition instantanée",uploadTitle:"Téléchargez une photo",uploadSub:"Appuyez ou faites glisser",retake:"← Reprendre",analyze:"✨ Analyser",scanning:"Analyse...",analyzing:"Analyse nutritionnelle...",health:"Santé",totalCal:"calories totales",protein:"Protéines",carbs:"Glucides",fat:"Lipides",detected:"Aliments détectés",tip:"💡",dailyGoal:"Objectif Quotidien",consumed:"Consommé",remaining:"Restant",history:"Historique",noHistory:"Aucun repas enregistré",settings:"Paramètres",setGoals:"Définir les objectifs",saveGoals:"Sauvegarder",calories:"Calories",tab_today:"Aujourd'hui",tab_history:"Historique",tab_settings:"Réglages",tab_snap:"Photo",logMeal:"Enregistrer le repas",mealLogged:"Enregistré!",dismiss:"Fermer",changeKey:"Changer la clé API" }},
  de: { name: "Deutsch", flag: "🇩🇪", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Foto machen · Sofortige Nährwertanalyse",uploadTitle:"Lebensmittelfoto hochladen",uploadSub:"Tippen oder ziehen",retake:"← Wiederholen",analyze:"✨ Analysieren",scanning:"Scannt...",analyzing:"Nährwerte werden analysiert...",health:"Gesundheit",totalCal:"Gesamtkalorien",protein:"Eiweiß",carbs:"Kohlenhydrate",fat:"Fett",detected:"Erkannte Lebensmittel",tip:"💡",dailyGoal:"Tagesziel",consumed:"Verbraucht",remaining:"Verbleibend",history:"Mahlzeitenverlauf",noHistory:"Noch keine Mahlzeiten",settings:"Einstellungen",setGoals:"Tagesziele festlegen",saveGoals:"Ziele speichern",calories:"Kalorien",tab_today:"Heute",tab_history:"Verlauf",tab_settings:"Einstellungen",tab_snap:"Foto",logMeal:"Mahlzeit speichern",mealLogged:"Gespeichert!",dismiss:"Schließen",changeKey:"API-Schlüssel ändern" }},
  pt: { name: "Português", flag: "🇧🇷", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Fotografe sua comida · Nutrição instantânea",uploadTitle:"Envie uma foto da comida",uploadSub:"Toque para escolher ou arraste",retake:"← Refazer",analyze:"✨ Analisar Comida",scanning:"Analisando...",analyzing:"Analisando nutrição...",health:"Saúde",totalCal:"calorias totais",protein:"Proteína",carbs:"Carboidratos",fat:"Gordura",detected:"Alimentos detectados",tip:"💡",dailyGoal:"Meta Diária",consumed:"Consumido",remaining:"Restante",history:"Histórico",noHistory:"Nenhuma refeição registrada",settings:"Configurações",setGoals:"Definir metas",saveGoals:"Salvar metas",calories:"Calorias",tab_today:"Hoje",tab_history:"Histórico",tab_settings:"Configurações",tab_snap:"Foto",logMeal:"Registrar refeição",mealLogged:"Registrado!",dismiss:"Fechar",changeKey:"Mudar chave API" }},
  it: { name: "Italiano", flag: "🇮🇹", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Fotografa il cibo · Nutrizione istantanea",uploadTitle:"Carica una foto del cibo",uploadSub:"Tocca per scegliere o trascina",retake:"← Riprendi",analyze:"✨ Analizza Cibo",scanning:"Scansione...",analyzing:"Analisi nutrizionale...",health:"Salute",totalCal:"calorie totali",protein:"Proteine",carbs:"Carboidrati",fat:"Grassi",detected:"Alimenti rilevati",tip:"💡",dailyGoal:"Obiettivo Giornaliero",consumed:"Consumato",remaining:"Rimanente",history:"Storico pasti",noHistory:"Nessun pasto registrato",settings:"Impostazioni",setGoals:"Imposta obiettivi",saveGoals:"Salva obiettivi",calories:"Calorie",tab_today:"Oggi",tab_history:"Storico",tab_settings:"Impostazioni",tab_snap:"Foto",logMeal:"Registra pasto",mealLogged:"Registrato!",dismiss:"Chiudi",changeKey:"Cambia chiave API" }},
  ja: { name: "日本語", flag: "🇯🇵", dir: "ltr", t: { appName:"CalSnap AI",tagline:"食事を撮影・即時栄養分析",uploadTitle:"食事の写真をアップロード",uploadSub:"タップまたはドラッグ＆ドロップ",retake:"← 撮り直す",analyze:"✨ 食事を分析",scanning:"スキャン中...",analyzing:"栄養分析中...",health:"健康",totalCal:"総カロリー",protein:"タンパク質",carbs:"炭水化物",fat:"脂質",detected:"検出された食品",tip:"💡",dailyGoal:"1日の目標",consumed:"摂取済み",remaining:"残り",history:"食事履歴",noHistory:"まだ記録なし",settings:"設定",setGoals:"1日の目標を設定",saveGoals:"目標を保存",calories:"カロリー",tab_today:"今日",tab_history:"履歴",tab_settings:"設定",tab_snap:"撮影",logMeal:"食事を記録",mealLogged:"記録しました！",dismiss:"閉じる",changeKey:"APIキーを変更" }},
  ko: { name: "한국어", flag: "🇰🇷", dir: "ltr", t: { appName:"CalSnap AI",tagline:"음식 촬영 · 즉시 영양 분석",uploadTitle:"음식 사진 업로드",uploadSub:"탭하거나 드래그 앤 드롭",retake:"← 다시 찍기",analyze:"✨ 음식 분석",scanning:"스캔 중...",analyzing:"영양 분석 중...",health:"건강",totalCal:"총 칼로리",protein:"단백질",carbs:"탄수화물",fat:"지방",detected:"감지된 음식",tip:"💡",dailyGoal:"일일 목표",consumed:"섭취량",remaining:"남은량",history:"식사 기록",noHistory:"아직 기록 없음",settings:"설정",setGoals:"일일 목표 설정",saveGoals:"목표 저장",calories:"칼로리",tab_today:"오늘",tab_history:"기록",tab_settings:"설정",tab_snap:"촬영",logMeal:"식사 기록",mealLogged:"기록되었습니다!",dismiss:"닫기",changeKey:"API 키 변경" }},
  zh: { name: "中文", flag: "🇨🇳", dir: "ltr", t: { appName:"CalSnap AI",tagline:"拍摄食物 · 即时营养分析",uploadTitle:"上传食物照片",uploadSub:"点击选择或拖放",retake:"← 重拍",analyze:"✨ 分析食物",scanning:"扫描中...",analyzing:"正在分析营养...",health:"健康",totalCal:"总卡路里",protein:"蛋白质",carbs:"碳水化合物",fat:"脂肪",detected:"检测到的食物",tip:"💡",dailyGoal:"每日目标",consumed:"已摄入",remaining:"剩余",history:"饮食记录",noHistory:"尚无记录",settings:"设置",setGoals:"设置每日目标",saveGoals:"保存目标",calories:"卡路里",tab_today:"今天",tab_history:"记录",tab_settings:"设置",tab_snap:"拍摄",logMeal:"记录餐食",mealLogged:"已记录！",dismiss:"关闭",changeKey:"更换API密钥" }},
  ar: { name: "العربية", flag: "🇸🇦", dir: "rtl", t: { appName:"CalSnap AI",tagline:"صوّر طعامك · تحليل غذائي فوري",uploadTitle:"ارفع صورة الطعام",uploadSub:"اضغط للاختيار أو اسحب وأفلت",retake:"إعادة التصوير",analyze:"✨ تحليل الطعام",scanning:"جارٍ الفحص...",analyzing:"تحليل القيم الغذائية...",health:"الصحة",totalCal:"إجمالي السعرات",protein:"بروتين",carbs:"كربوهيدرات",fat:"دهون",detected:"الأطعمة المكتشفة",tip:"💡",dailyGoal:"الهدف اليومي",consumed:"المستهلك",remaining:"المتبقي",history:"سجل الوجبات",noHistory:"لا توجد وجبات بعد",settings:"الإعدادات",setGoals:"تحديد الأهداف",saveGoals:"حفظ الأهداف",calories:"سعرات",tab_today:"اليوم",tab_history:"السجل",tab_settings:"الإعدادات",tab_snap:"التقط",logMeal:"تسجيل الوجبة",mealLogged:"تم التسجيل!",dismiss:"إغلاق",changeKey:"تغيير مفتاح API" }},
  ru: { name: "Русский", flag: "🇷🇺", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Фотографируйте еду · Мгновенный анализ",uploadTitle:"Загрузите фото еды",uploadSub:"Нажмите или перетащите",retake:"← Переснять",analyze:"✨ Анализировать",scanning:"Сканирование...",analyzing:"Анализ питательности...",health:"Здоровье",totalCal:"всего калорий",protein:"Белки",carbs:"Углеводы",fat:"Жиры",detected:"Обнаруженные продукты",tip:"💡",dailyGoal:"Дневная норма",consumed:"Потреблено",remaining:"Осталось",history:"История питания",noHistory:"Нет записей",settings:"Настройки",setGoals:"Установить цели",saveGoals:"Сохранить цели",calories:"Калории",tab_today:"Сегодня",tab_history:"История",tab_settings:"Настройки",tab_snap:"Фото",logMeal:"Записать приём пищи",mealLogged:"Записано!",dismiss:"Закрыть",changeKey:"Изменить ключ API" }},
  hi: { name: "हिंदी", flag: "🇮🇳", dir: "ltr", t: { appName:"CalSnap AI",tagline:"खाना फोटो खींचें · तुरंत पोषण विश्लेषण",uploadTitle:"खाने की फोटो अपलोड करें",uploadSub:"चुनने के लिए टैप करें या खींचें",retake:"← दोबारा लें",analyze:"✨ खाना विश्लेषण करें",scanning:"स्कैन हो रहा है...",analyzing:"पोषण विश्लेषण हो रहा है...",health:"स्वास्थ्य",totalCal:"कुल कैलोरी",protein:"प्रोटीन",carbs:"कार्बोहाइड्रेट",fat:"वसा",detected:"पहचाने गए खाद्य पदार्थ",tip:"💡",dailyGoal:"दैनिक लक्ष्य",consumed:"खाया गया",remaining:"शेष",history:"भोजन इतिहास",noHistory:"अभी तक कोई रिकॉर्ड नहीं",settings:"सेटिंग्स",setGoals:"दैनिक लक्ष्य निर्धारित करें",saveGoals:"लक्ष्य सहेजें",calories:"कैलोरी",tab_today:"आज",tab_history:"इतिहास",tab_settings:"सेटिंग्स",tab_snap:"फोटो",logMeal:"भोजन दर्ज करें",mealLogged:"दर्ज हो गया!",dismiss:"बंद करें",changeKey:"API कुंजी बदलें" }},
  id: { name: "Indonesia", flag: "🇮🇩", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Foto makananmu · Analisis gizi instan",uploadTitle:"Unggah foto makanan",uploadSub:"Ketuk untuk memilih atau seret",retake:"← Ulangi",analyze:"✨ Analisis Makanan",scanning:"Memindai...",analyzing:"Menganalisis gizi...",health:"Kesehatan",totalCal:"total kalori",protein:"Protein",carbs:"Karbohidrat",fat:"Lemak",detected:"Makanan Terdeteksi",tip:"💡",dailyGoal:"Target Harian",consumed:"Dikonsumsi",remaining:"Sisa",history:"Riwayat Makan",noHistory:"Belum ada catatan",settings:"Pengaturan",setGoals:"Tetapkan target",saveGoals:"Simpan target",calories:"Kalori",tab_today:"Hari Ini",tab_history:"Riwayat",tab_settings:"Pengaturan",tab_snap:"Foto",logMeal:"Catat makanan",mealLogged:"Dicatat!",dismiss:"Tutup",changeKey:"Ganti kunci API" }},
  nl: { name: "Nederlands", flag: "🇳🇱", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Foto je eten · Directe voedingsanalyse",uploadTitle:"Upload een voedingsfoto",uploadSub:"Tik om te kiezen of sleep",retake:"← Opnieuw",analyze:"✨ Analyseer eten",scanning:"Scannen...",analyzing:"Voeding analyseren...",health:"Gezondheid",totalCal:"totale calorieën",protein:"Eiwit",carbs:"Koolhydraten",fat:"Vet",detected:"Gedetecteerd voedsel",tip:"💡",dailyGoal:"Dagelijks doel",consumed:"Geconsumeerd",remaining:"Resterend",history:"Maaltijdgeschiedenis",noHistory:"Nog geen maaltijden",settings:"Instellingen",setGoals:"Doelen instellen",saveGoals:"Doelen opslaan",calories:"Calorieën",tab_today:"Vandaag",tab_history:"Geschiedenis",tab_settings:"Instellingen",tab_snap:"Foto",logMeal:"Maaltijd registreren",mealLogged:"Geregistreerd!",dismiss:"Sluiten",changeKey:"API-sleutel wijzigen" }},
  pl: { name: "Polski", flag: "🇵🇱", dir: "ltr", t: { appName:"CalSnap AI",tagline:"Fotografuj jedzenie · Natychmiastowa analiza",uploadTitle:"Prześlij zdjęcie jedzenia",uploadSub:"Dotknij lub przeciągnij",retake:"← Powtórz",analyze:"✨ Analizuj jedzenie",scanning:"Skanowanie...",analyzing:"Analiza odżywcza...",health:"Zdrowie",totalCal:"łączne kalorie",protein:"Białko",carbs:"Węglowodany",fat:"Tłuszcze",detected:"Wykryte produkty",tip:"💡",dailyGoal:"Dzienny cel",consumed:"Spożyte",remaining:"Pozostałe",history:"Historia posiłków",noHistory:"Brak zapisanych posiłków",settings:"Ustawienia",setGoals:"Ustaw cele",saveGoals:"Zapisz cele",calories:"Kalorie",tab_today:"Dziś",tab_history:"Historia",tab_settings:"Ustawienia",tab_snap:"Zdjęcie",logMeal:"Zapisz posiłek",mealLogged:"Zapisano!",dismiss:"Zamknij",changeKey:"Zmień klucz API" }}
};

const TODAY = new Date().toDateString();

function ls(key, def) { try { return JSON.parse(localStorage.getItem(key)) ?? def; } catch { return def; } }
function ss(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

const MacroBar = ({ label, value, max, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
        <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>{value}g</span>
      </div>
      <div style={{ height: 5, background: "#1a1a1a", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 1s ease" }} />
      </div>
    </div>
  );
};

const FoodItem = ({ name, calories, protein, carbs, fat, emoji }) => (
  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ fontSize: 26 }}>{emoji || "🍽️"}</div>
    <div style={{ flex: 1 }}>
      <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{name}</div>
      <div style={{ display: "flex", gap: 8 }}>
        <span style={{ fontSize: 11, color: "#f9ca24" }}>{protein}g</span>
        <span style={{ fontSize: 11, color: "#a29bfe" }}>{carbs}g</span>
        <span style={{ fontSize: 11, color: "#fd79a8" }}>{fat}g</span>
      </div>
    </div>
    <div style={{ textAlign: "right" }}>
      <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>{calories}</div>
      <div style={{ fontSize: 10, color: "#555" }}>kcal</div>
    </div>
  </div>
);

const CircleProgress = ({ value, goal, color, label, unit = "kcal" }) => {
  const p = Math.min(Math.round((value / goal) * 100), 100);
  const r = 28; const circ = 2 * Math.PI * r; const dash = (p / 100) * circ;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="72" height="72" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1a1a1a" strokeWidth="5" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 1s ease" }} />
      </svg>
      <div style={{ marginTop: -56, height: 72, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{value}</div>
        <div style={{ fontSize: 9, color: "#555" }}>{unit}</div>
      </div>
      <div style={{ fontSize: 10, color: "#666", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</div>
    </div>
  );
};

export default function CalSnapApp() {
  const [lang, setLang] = useState(() => ls("cs_lang", "en"));
  const [showLang, setShowLang] = useState(false);
  const [tab, setTab] = useState("snap");
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMime, setImageMime] = useState("image/jpeg");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState(null);
  const [goals, setGoals] = useState(() => ls("cs_goals", { calories: 2000, protein: 150, carbs: 250, fat: 65 }));
  const [goalEdit, setGoalEdit] = useState(null);
  const [allHistory, setAllHistory] = useState(() => ls("cs_history", []));
  const fileRef = useRef();

  const t = LANGUAGES[lang]?.t || LANGUAGES.en.t;
  const dir = LANGUAGES[lang]?.dir || "ltr";
  const todayHistory = allHistory.filter(m => m.date === TODAY);
  const todayTotals = todayHistory.reduce((a, m) => ({ calories: a.calories + m.calories, protein: a.protein + m.protein, carbs: a.carbs + m.carbs, fat: a.fat + m.fat }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  useEffect(() => { ss("cs_lang", lang); }, [lang]);
  useEffect(() => { ss("cs_goals", goals); }, [goals]);
  useEffect(() => { ss("cs_history", allHistory); }, [allHistory]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setResult(null); setError(null);
    setImageMime(file.type || "image/jpeg");
    const reader = new FileReader();
    reader.onload = (e) => { setImageDataUrl(e.target.result); setImageBase64(e.target.result.split(",")[1]); };
    reader.readAsDataURL(file);
  }, []);

  const analyzeImage = async () => {
    if (!imageBase64) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, imageMime })
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResult(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const logMeal = () => {
    if (!result) return;
    const entry = { id: Date.now(), date: TODAY, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), name: result.meal_name, calories: result.total_calories, protein: result.total_protein, carbs: result.total_carbs, fat: result.total_fat, emoji: result.items?.[0]?.emoji || "🍽️", thumb: imageDataUrl };
    setAllHistory(prev => [entry, ...prev]);
    showToast(t.mealLogged);
    setResult(null); setImageDataUrl(null); setImageBase64(null);
    setTab("today");
  };

  const reset = () => { setImageDataUrl(null); setImageBase64(null); setResult(null); setError(null); };
  const healthColor = (s) => s >= 8 ? "#00b894" : s >= 5 ? "#f9ca24" : "#fd79a8";

  return (
    <div dir={dir} style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a0f 0%, #12122a 60%, #0f1a2e 100%)", fontFamily: "system-ui, sans-serif", paddingBottom: 90 }}>
      <style>{`* { box-sizing:border-box; margin:0; padding:0; } @keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}} @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}} input:focus{outline:none} ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-thumb{background:#333;border-radius:99px}`}</style>

      {toast && <div style={{ position:"fixed", bottom:110, left:"50%", transform:"translateX(-50%)", background:"#00b894", color:"#fff", padding:"10px 20px", borderRadius:99, fontSize:13, fontWeight:600, zIndex:999, animation:"toastIn 0.3s ease", whiteSpace:"nowrap" }}>{toast}</div>}

      <div style={{ maxWidth: 430, margin: "0 auto", padding: "0 18px" }}>

        {/* Header */}
        <div style={{ paddingTop: 52, paddingBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>{t.appName}</h1>
            <p style={{ color: "#444", fontSize: 12 }}>{t.tagline}</p>
          </div>
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowLang(!showLang)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "6px 10px", color: "#fff", cursor: "pointer", fontSize: 20 }}>
              {LANGUAGES[lang]?.flag}
            </button>
            {showLang && (
              <div style={{ position: "absolute", top: 44, right: 0, background: "#15152a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 8, zIndex: 100, width: 190, maxHeight: 300, overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}>
                {Object.entries(LANGUAGES).map(([code, l]) => (
                  <button key={code} onClick={() => { setLang(code); setShowLang(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px", background: lang === code ? "rgba(108,92,231,0.2)" : "none", border: "none", borderRadius: 8, cursor: "pointer", color: lang === code ? "#a29bfe" : "#bbb", fontSize: 13, textAlign: "left" }}>
                    <span style={{ fontSize: 18 }}>{l.flag}</span><span>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SNAP TAB */}
        {tab === "snap" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            {!imageDataUrl && (
              <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => fileRef.current.click()}
                style={{ border: `2px dashed ${dragOver ? "rgba(108,92,231,0.7)" : "rgba(255,255,255,0.1)"}`, borderRadius: 22, padding: "50px 24px", textAlign: "center", cursor: "pointer", background: "rgba(255,255,255,0.015)" }}>
                <div style={{ fontSize: 50, marginBottom: 14, animation: "float 3s ease-in-out infinite" }}>📸</div>
                <p style={{ color: "#fff", fontWeight: 600, fontSize: 15, marginBottom: 5 }}>{t.uploadTitle}</p>
                <p style={{ color: "#444", fontSize: 12 }}>{t.uploadSub}</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />

            {imageDataUrl && !result && (
              <div>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", marginBottom: 12 }}>
                  <img src={imageDataUrl} alt="food" style={{ width: "100%", maxHeight: 300, objectFit: "cover", display: "block" }} />
                  {loading && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                    <div style={{ width: 42, height: 42, border: "3px solid rgba(108,92,231,0.3)", borderTop: "3px solid #a29bfe", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    <p style={{ color: "#fff", fontSize: 13 }}>{t.analyzing}</p>
                  </div>}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={reset} style={{ flex: 1, padding: 13, borderRadius: 13, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#888", fontSize: 13, cursor: "pointer" }}>{t.retake}</button>
                  <button onClick={analyzeImage} disabled={loading} style={{ flex: 2, padding: 13, borderRadius: 13, border: "none", background: loading ? "#1e1e1e" : "linear-gradient(135deg, #6c5ce7, #a29bfe)", color: loading ? "#555" : "#fff", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
                    {loading ? t.scanning : t.analyze}
                  </button>
                </div>
              </div>
            )}

            {error && <div style={{ background: "rgba(253,121,168,0.07)", border: "1px solid rgba(253,121,168,0.2)", borderRadius: 14, padding: 14, marginTop: 14, textAlign: "center" }}>
              <p style={{ color: "#fd79a8", fontSize: 12, marginBottom: 8 }}>{error}</p>
              <button onClick={() => setError(null)} style={{ color: "#fd79a8", background: "none", border: "none", cursor: "pointer", fontSize: 11, textDecoration: "underline" }}>{t.dismiss}</button>
            </div>}

            {result && (
              <div style={{ animation: "fadeUp 0.4s ease" }}>
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <img src={imageDataUrl} alt="meal" style={{ width: 72, height: 72, borderRadius: 18, objectFit: "cover", border: "2px solid rgba(108,92,231,0.4)", marginBottom: 10 }} />
                  <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 5 }}>{result.meal_name}</h2>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.04)", borderRadius: 99, padding: "3px 12px", fontSize: 11, color: healthColor(result.health_score), fontWeight: 600 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: healthColor(result.health_score), display: "inline-block" }} />
                    {t.health} {result.health_score}/10
                  </span>
                </div>

                <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 22, padding: 20, marginBottom: 12 }}>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{result.total_calories}</div>
                    <div style={{ color: "#444", fontSize: 11, marginTop: 3 }}>{t.totalCal}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                    {[{l:t.protein,v:result.total_protein,c:"#f9ca24",i:"💪"},{l:t.carbs,v:result.total_carbs,c:"#a29bfe",i:"⚡"},{l:t.fat,v:result.total_fat,c:"#fd79a8",i:"🔥"}].map(m => (
                      <div key={m.l} style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "10px 4px", border: `1px solid ${m.c}22` }}>
                        <div style={{ fontSize: 16, marginBottom: 2 }}>{m.i}</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: m.c }}>{m.v}<span style={{ fontSize: 9, color: "#555" }}>g</span></div>
                        <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase" }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <MacroBar label={t.protein} value={result.total_protein} max={goals.protein} color="#f9ca24" />
                  <MacroBar label={t.carbs} value={result.total_carbs} max={goals.carbs} color="#a29bfe" />
                  <MacroBar label={t.fat} value={result.total_fat} max={goals.fat} color="#fd79a8" />
                </div>

                <p style={{ color: "#333", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{t.detected}</p>
                {result.items?.map((item, i) => <FoodItem key={i} {...item} />)}

                {result.tip && <div style={{ background: "rgba(108,92,231,0.07)", border: "1px solid rgba(108,92,231,0.18)", borderRadius: 14, padding: 14, marginTop: 4, marginBottom: 14, display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{t.tip}</span>
                  <p style={{ color: "#a29bfe", fontSize: 12, lineHeight: 1.5 }}>{result.tip}</p>
                </div>}

                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <button onClick={reset} style={{ flex: 1, padding: 13, borderRadius: 13, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#888", fontSize: 13, cursor: "pointer" }}>{t.retake}</button>
                  <button onClick={logMeal} style={{ flex: 2, padding: 13, borderRadius: 13, border: "none", background: "linear-gradient(135deg, #00b894, #00cec9)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{t.logMeal}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TODAY TAB */}
        {tab === "today" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 22, padding: 20, marginBottom: 16 }}>
              <p style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{t.dailyGoal}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                <CircleProgress value={todayTotals.calories} goal={goals.calories} color="#6c5ce7" label={t.calories} unit="kcal" />
                <CircleProgress value={todayTotals.protein} goal={goals.protein} color="#f9ca24" label={t.protein} unit="g" />
                <CircleProgress value={todayTotals.carbs} goal={goals.carbs} color="#a29bfe" label={t.carbs} unit="g" />
                <CircleProgress value={todayTotals.fat} goal={goals.fat} color="#fd79a8" label={t.fat} unit="g" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {[{l:t.consumed,v:todayTotals.calories,c:"#6c5ce7"},{l:t.remaining,v:Math.max(0,goals.calories-todayTotals.calories),c:"#00b894"},{l:t.dailyGoal,v:goals.calories,c:"#fff"}].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div>
                    <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ color: "#333", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{t.history}</p>
            {todayHistory.length === 0 ? <div style={{ textAlign: "center", padding: "40px 0", color: "#333", fontSize: 13 }}>{t.noHistory}</div>
              : todayHistory.map(m => (
                <div key={m.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                  {m.thumb ? <img src={m.thumb} alt="" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover" }} /> : <div style={{ fontSize: 26 }}>{m.emoji}</div>}
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{m.name}</div>
                    <div style={{ color: "#555", fontSize: 11 }}>{m.time}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{m.calories}</div>
                    <div style={{ fontSize: 10, color: "#555" }}>kcal</div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* HISTORY TAB */}
        {tab === "history" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <p style={{ color: "#333", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>{t.history}</p>
            {allHistory.length === 0 ? <div style={{ textAlign: "center", padding: "50px 0", color: "#333", fontSize: 13 }}>{t.noHistory}</div>
              : allHistory.map(m => (
                <div key={m.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                  {m.thumb ? <img src={m.thumb} alt="" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover" }} /> : <div style={{ fontSize: 26 }}>{m.emoji}</div>}
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{m.name}</div>
                    <div style={{ color: "#555", fontSize: 11 }}>{m.date} · {m.time}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{m.calories}</div>
                    <div style={{ fontSize: 10, color: "#555" }}>kcal</div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === "settings" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 20, marginBottom: 14 }}>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>🎯 {t.setGoals}</p>
              {goalEdit === null ? (
                <>
                  {[{l:t.calories,k:"calories",c:"#6c5ce7",i:"🔥",u:"kcal"},{l:t.protein,k:"protein",c:"#f9ca24",i:"💪",u:"g"},{l:t.carbs,k:"carbs",c:"#a29bfe",i:"⚡",u:"g"},{l:t.fat,k:"fat",c:"#fd79a8",i:"🧈",u:"g"}].map(g => (
                    <div key={g.k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>{g.i}</span>
                        <span style={{ color: "#ccc", fontSize: 13 }}>{g.l}</span>
                      </div>
                      <span style={{ color: g.c, fontWeight: 700, fontSize: 14 }}>{goals[g.k]} {g.u}</span>
                    </div>
                  ))}
                  <button onClick={() => setGoalEdit({...goals})} style={{ width: "100%", marginTop: 14, padding: 12, borderRadius: 12, border: "1px solid rgba(108,92,231,0.3)", background: "rgba(108,92,231,0.1)", color: "#a29bfe", fontSize: 13, cursor: "pointer" }}>✏️ {t.setGoals}</button>
                </>
              ) : (
                <>
                  {[{l:t.calories,k:"calories",u:"kcal"},{l:t.protein,k:"protein",u:"g"},{l:t.carbs,k:"carbs",u:"g"},{l:t.fat,k:"fat",u:"g"}].map(g => (
                    <div key={g.k} style={{ marginBottom: 14 }}>
                      <label style={{ color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>{g.l} ({g.u})</label>
                      <input type="number" value={goalEdit[g.k]} onChange={(e) => setGoalEdit({...goalEdit, [g.k]: parseInt(e.target.value) || 0})}
                        style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 15, fontWeight: 600 }} />
                    </div>
                  ))}
                  <button onClick={() => { setGoals(goalEdit); setGoalEdit(null); showToast("✅ " + t.saveGoals); }} style={{ width: "100%", padding: 13, borderRadius: 13, border: "none", background: "linear-gradient(135deg, #6c5ce7, #a29bfe)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{t.saveGoals}</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(10,10,15,0.96)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-around", padding: "10px 0 20px" }}>
        {[{k:"snap",i:"📸",l:t.tab_snap},{k:"today",i:"📊",l:t.tab_today},{k:"history",i:"📋",l:t.tab_history},{k:"settings",i:"⚙️",l:t.tab_settings}].map(tb => (
          <button key={tb.k} onClick={() => setTab(tb.k)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "2px 16px" }}>
            <span style={{ fontSize: 20 }}>{tb.i}</span>
            <span style={{ fontSize: 10, color: tab === tb.k ? "#a29bfe" : "#444", fontWeight: tab === tb.k ? 700 : 400 }}>{tb.l}</span>
            {tab === tb.k && <div style={{ width: 18, height: 2, background: "#6c5ce7", borderRadius: 99 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
