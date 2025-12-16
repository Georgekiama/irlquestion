import React, { useState } from 'react';

const questions = [
  // SECTION 1: Name the Thing (Documents vs Files vs Pages)
  {
    section: "Name the Thing",
    question: "You receive an email with a ZIP attachment. Inside are 3 PDFs: an email chain, a contract, and an exhibit. How many FILES are you working with?",
    options: ["1 (the ZIP)", "3 (the PDFs)", "4 (ZIP + 3 PDFs)", "Depends on how you count"],
    correct: 1,
    explanation: "You have 3 files to process — the 3 PDFs. The ZIP was just the delivery container. When intake asks 'how many files,' they mean the actual PDFs you'll be working with."
  },
  {
    section: "Name the Thing",
    question: "A paralegal sends you a 200-page deposition transcript as a single PDF. How many DOCUMENTS is this?",
    options: ["1 document", "200 documents", "Depends on the witness count", "Depends on the exhibit count"],
    correct: 0,
    explanation: "One deposition = one document, regardless of page count. A 'document' is a logical unit of content (a depo, a contract, an email chain) — not a count of pages."
  },
  {
    section: "Name the Thing",
    question: "An attorney says 'I need 500 pages printed.' Before anything is printed, what actually EXISTS right now?",
    options: ["500 pages, 500 impressions", "500 pages only", "500 impressions only", "500 sheets"],
    correct: 1,
    explanation: "Before printing, only PAGES exist (as content in files). Impressions, sheets, and printed sides don't exist until ink hits paper. This distinction matters for quoting jobs."
  },
  {
    section: "Name the Thing",
    question: "You have 4 PDFs: Exhibit A (10 pages), Exhibit B (25 pages), Exhibit C (5 pages), and a cover letter (1 page). What's the correct count?",
    options: ["4 documents, 4 files, 41 pages", "41 documents, 4 files, 41 pages", "4 documents, 1 file, 41 pages", "1 document, 4 files, 41 pages"],
    correct: 0,
    explanation: "4 separate PDFs = 4 files. Each is a distinct document (exhibit or letter). Total page count across all = 41. Documents, files, and pages are three different counts."
  },

  // SECTION 2: What the Printer Sees (Page vs Page Image)
  {
    section: "What the Printer Sees",
    question: "A paralegal highlights a sentence in yellow in Word, then saves as PDF. When the print room checks for color, what are they actually analyzing?",
    options: ["The original Word file", "The PDF file properties", "The visual image of each page after rendering", "The document metadata"],
    correct: 2,
    explanation: "Color detection analyzes the PAGE IMAGE — what the page actually looks like after rendering. The highlight that exists in Word becomes visible color in the rendered image."
  },
  {
    section: "What the Printer Sees",
    question: "Why might a PDF that 'looks black and white' on screen still get billed as color?",
    options: ["Billing software has bugs", "The PDF contains color data even if you can't easily see it", "Printers always overcharge", "Screen settings affect billing"],
    correct: 1,
    explanation: "A PDF can contain color data (like a faint logo, colored underline, or chart element) that doesn't jump out visually but still triggers color toner when printed. The rendered image is what matters."
  },
  {
    section: "What the Printer Sees",
    question: "An exhibit is scanned from a physical document that originally had yellow highlights. The scan comes out looking gray/black. Will this be billed as color?",
    options: ["Yes — the original had color", "No — the scan shows no color", "Depends on scanner settings", "Depends on the original intent"],
    correct: 1,
    explanation: "Billing is based on the PAGE IMAGE as it exists now. If the scan shows no color, there's no color to bill. Original intent doesn't matter — only what's actually in the rendered image."
  },
  {
    section: "What the Printer Sees",
    question: "A 'page' in Adobe Acrobat and a 'page image' for billing purposes — are these the same thing?",
    options: ["Yes, identical concepts", "No — page image includes how it renders visually", "Only for PDFs", "Only for scanned documents"],
    correct: 1,
    explanation: "A 'page' is the logical unit (Page 1, Page 2). A 'page image' is that page after rendering — including all colors, highlights, graphics as they'll actually appear. Billing sees the image."
  },

  // SECTION 3: Count Like a Copier (Impressions Math)
  {
    section: "Count Like a Copier",
    question: "A 100-page exhibit needs to be printed double-sided (duplex). How many pieces of paper will you have?",
    options: ["100 sheets", "50 sheets", "200 sheets", "Depends on the printer"],
    correct: 1,
    explanation: "Duplex = 2 pages per sheet. 100 pages ÷ 2 = 50 sheets of paper. This is simple paper math."
  },
  {
    section: "Count Like a Copier",
    question: "Same 100-page exhibit, printed duplex. How many IMPRESSIONS will appear on the copier invoice?",
    options: ["50 impressions", "100 impressions", "200 impressions", "Depends on color"],
    correct: 1,
    explanation: "1 impression = 1 side of paper with toner on it. 100 pages = 100 printed sides = 100 impressions. Duplex reduces SHEETS but not IMPRESSIONS. This is why 'double-sided is cheaper' is a myth."
  },
  {
    section: "Count Like a Copier",
    question: "A single word is highlighted yellow on page 47 of a 200-page document. How is page 47 billed?",
    options: ["Black & white — one word doesn't count", "Color impression", "Depends on the highlight shade", "Black & white — highlights are ignored"],
    correct: 1,
    explanation: "ANY color toner on a page = color impression. One highlighted word means yellow toner fires. The printer doesn't evaluate importance — just toner presence."
  },
  {
    section: "Count Like a Copier",
    question: "A law firm's letterhead has a small blue logo in the corner. Every page with that letterhead is billed as:",
    options: ["Black & white — logos don't count", "Color — blue toner is used", "Depends on logo size", "Black & white — it's just branding"],
    correct: 1,
    explanation: "Blue logo = blue (cyan) toner = color impression. Size and purpose don't matter. Every page with that letterhead triggers color billing."
  },
  {
    section: "Count Like a Copier",
    question: "150-page brief, printed duplex. 30 pages have color exhibits. How many total impressions, and how many are color?",
    options: ["75 total, 15 color", "150 total, 30 color", "150 total, 15 color", "75 total, 30 color"],
    correct: 1,
    explanation: "150 pages = 150 impressions (duplex doesn't change this). 30 pages with color = 30 color impressions. The other 120 are B&W impressions."
  },

  // SECTION 4: Translate the Chaos (Clear Communication)
  {
    section: "Translate the Chaos",
    question: "A paralegal says: 'It's just one page, should be quick.' What information is MISSING for an accurate quote?",
    options: ["Nothing — one page is clear", "Color or B&W? Simplex or duplex?", "The page size", "The file format"],
    correct: 1,
    explanation: "'One page' could be 1 or 2 impressions (if printed on both sides of a sheet for a set). And color vs B&W determines the per-impression rate. 'One page' alone isn't enough to quote."
  },
  {
    section: "Translate the Chaos",
    question: "Attorney emails: 'Only a few pages are color.' What's the problem with this statement?",
    options: ["Nothing — it's helpful context", "'A few' is vague — could mean 3 or 30", "Color pages can't be mixed with B&W", "Email isn't the right format for this"],
    correct: 1,
    explanation: "'A few' means different things to different people. For accurate billing, you need a specific count: '12 pages contain color' is actionable. 'A few' will cause disputes."
  },
  {
    section: "Translate the Chaos",
    question: "Client insists: 'The PDF is black and white, I checked.' What should the print room do?",
    options: ["Trust the client and bill as B&W", "Run color detection on the actual file", "Ask the client to check again", "Bill as color to be safe"],
    correct: 1,
    explanation: "Always verify with color detection on the rendered page images. PDFs can contain color data that isn't obvious on screen. The file itself is the truth, not the client's visual check."
  },
  {
    section: "Translate the Chaos",
    question: "Which intake note is CLEAREST for the print room?",
    options: ["'Mostly B&W with some color'", "'Large document, needs duplex'", "'847 pages, 43 color impressions, duplex, 3-hole punch'", "'Standard trial binder, the usual'"],
    correct: 2,
    explanation: "Specific counts eliminate ambiguity. Page count, color impression count, and finishing specs give the print room everything needed. The other options require follow-up questions."
  },
  {
    section: "Translate the Chaos",
    question: "A paralegal asks: 'Can you make it double-sided to save money?' What's the accurate response?",
    options: ["'Yes, duplex cuts the cost in half'", "'Duplex uses less paper but the same number of impressions — cost is similar'", "'Duplex is actually more expensive'", "'We always print duplex anyway'"],
    correct: 1,
    explanation: "Duplex saves PAPER (sheets) but not IMPRESSIONS. Since billing is based on impressions, not sheets, duplex doesn't significantly reduce cost. This is one of the most common misconceptions."
  }
];

export default function TerminologyQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [mode, setMode] = useState('start'); // 'start', 'quiz', 'results'

  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    const isCorrect = selected === q.correct;
    if (isCorrect) setScore(score + 1);
    setAnswers([...answers, { question: currentQ, selected, correct: q.correct, isCorrect }]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      setMode('results');
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
    setMode('quiz');
  };

  const handleStart = () => {
    setMode('quiz');
  };

  const getScoreMessage = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 90) return { text: "Expert Level!", emoji: "🏆", color: "text-green-600", bg: "bg-green-50" };
    if (pct >= 75) return { text: "Solid Understanding", emoji: "👍", color: "text-blue-600", bg: "bg-blue-50" };
    if (pct >= 60) return { text: "Getting There", emoji: "📚", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { text: "Review Recommended", emoji: "🔄", color: "text-red-600", bg: "bg-red-50" };
  };

  // START SCREEN
  if (mode === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="max-w-xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-5xl mb-4">📄 → 🖨️</div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">IRL Terminology Quiz</h1>
            <p className="text-slate-600 mb-6">From Document to Impression</p>
            
            <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-slate-600 mb-3">This quiz covers:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Documents vs Files vs Pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>What the Printer Sees</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Counting Impressions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Clear Communication</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-6">
              <span>{questions.length} questions</span>
              <span>•</span>
              <span>~10 minutes</span>
            </div>
            
            <button
              onClick={handleStart}
              className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (mode === 'results') {
    const msg = getScoreMessage();
    const sections = [
      { name: "Name the Thing", color: "blue" },
      { name: "What the Printer Sees", color: "green" },
      { name: "Count Like a Copier", color: "yellow" },
      { name: "Translate the Chaos", color: "purple" }
    ];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">Quiz Complete!</h1>
            
            <div className={`text-center p-6 rounded-xl mb-6 ${msg.bg}`}>
              <div className="text-6xl mb-2">{msg.emoji}</div>
              <div className="text-5xl font-bold text-slate-800">{score}/{questions.length}</div>
              <div className={`text-xl font-semibold mt-2 ${msg.color}`}>{msg.text}</div>
              <div className="text-slate-500 text-sm mt-1">{Math.round((score/questions.length)*100)}% correct</div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-slate-700 mb-3">Results by Section:</h3>
              {sections.map(section => {
                const sectionQs = questions.map((q, i) => ({ ...q, idx: i })).filter(q => q.section === section.name);
                const sectionCorrect = answers.filter(a => sectionQs.some(sq => sq.idx === a.question) && a.isCorrect).length;
                const pct = (sectionCorrect / sectionQs.length) * 100;
                const barColor = pct >= 75 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500';
                return (
                  <div key={section.name} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{section.name}</span>
                      <span className={`font-semibold ${pct >= 75 ? 'text-green-600' : pct >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {sectionCorrect}/{sectionQs.length}
                      </span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {answers.filter(a => !a.isCorrect).length > 0 && (
              <div className="border-t pt-4 mb-6">
                <h3 className="font-semibold text-slate-700 mb-3">Review These:</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {answers.filter(a => !a.isCorrect).map((a, i) => (
                    <div key={i} className="bg-red-50 border border-red-100 p-4 rounded-lg">
                      <p className="font-medium text-slate-800 text-sm mb-2">{questions[a.question].question}</p>
                      <p className="text-red-600 text-sm">Your answer: {questions[a.question].options[a.selected]}</p>
                      <p className="text-green-600 text-sm">Correct: {questions[a.question].options[a.correct]}</p>
                      <p className="text-slate-500 text-xs mt-2 italic">{questions[a.question].explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {answers.filter(a => !a.isCorrect).length === 0 && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6 text-center">
                <p className="text-green-700 font-medium">🎉 Perfect Score! No missed questions.</p>
              </div>
            )}

            <button
              onClick={handleRestart}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // QUIZ SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-300 mb-2">
            <span className="bg-slate-700 px-3 py-1 rounded-full">{q.section}</span>
            <span>Question {currentQ + 1} of {questions.length}</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-5 leading-relaxed">{q.question}</h2>
          
          <div className="space-y-3 mb-6">
            {q.options.map((opt, idx) => {
              let btnClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ";
              if (showResult) {
                if (idx === q.correct) {
                  btnClass += "border-green-500 bg-green-50 text-green-800";
                } else if (idx === selected && idx !== q.correct) {
                  btnClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  btnClass += "border-slate-100 bg-slate-50 text-slate-400";
                }
              } else {
                if (idx === selected) {
                  btnClass += "border-blue-500 bg-blue-50 text-blue-800 shadow-md";
                } else {
                  btnClass += "border-slate-200 hover:border-blue-300 hover:bg-slate-50";
                }
              }
              return (
                <button key={idx} onClick={() => handleSelect(idx)} className={btnClass} disabled={showResult}>
                  <span className="font-semibold text-slate-400 mr-2">{String.fromCharCode(65 + idx)}.</span> 
                  {opt}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`p-4 rounded-xl mb-4 ${selected === q.correct ? 'bg-green-100 border border-green-200' : 'bg-amber-100 border border-amber-200'}`}>
              <p className={`font-semibold text-lg ${selected === q.correct ? 'text-green-800' : 'text-amber-800'}`}>
                {selected === q.correct ? '✓ Correct!' : '✗ Not quite'}
              </p>
              <p className="text-slate-700 mt-2 text-sm leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={`w-full py-4 font-semibold rounded-xl transition-all duration-200 ${
                selected === null 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg"
            >
              {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
          )}
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <span className="inline-block px-4 py-2 bg-slate-700 rounded-full text-sm text-slate-300">
            Score: {score}/{currentQ + (showResult ? 1 : 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
