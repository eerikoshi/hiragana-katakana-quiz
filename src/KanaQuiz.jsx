import React, { useState, useEffect } from "react";

const hiraganaData = {
  A: "あ", I: "い", U: "う", E: "え", O: "お",
  Ka: "か", Ki: "き", Ku: "く", Ke: "け", Ko: "こ",
  Sa: "さ", Shi: "し", Su: "す", Se: "せ", So: "そ",
  Ta: "た", Chi: "ち", Tsu: "つ", Te: "て", To: "と",
  Na: "な", Ni: "に", Nu: "ぬ", Ne: "ね", No: "の",
  Ha: "は", Hi: "ひ", Fu: "ふ", He: "へ", Ho: "ほ",
  Ma: "ま", Mi: "み", Mu: "む", Me: "め", Mo: "も",
  Ya: "や", Yu: "ゆ", Yo: "よ",
  Ra: "ら", Ri: "り", Ru: "る", Re: "れ", Ro: "ろ",
  Wa: "わ", Wo: "を", N: "ん",
  Kya: "きゃ", Kyu: "きゅ", Kyo: "きょ",
  Sha: "しゃ", Shu: "しゅ", Sho: "しょ",
  Cha: "ちゃ", Chu: "ちゅ", Cho: "ちょ",
  Pya: "ぴゃ", Pyu: "ぴゅ", Pyo: "ぴょ",
  Gya: "ぎゃ", Gyu: "ぎゅ", Gyo: "ぎょ",
  Bya: "びゃ", Byu: "びゅ", Byo: "びょ"
};

const katakanaData = {
  A: "ア", I: "イ", U: "ウ", E: "エ", O: "オ",
  Ka: "カ", Ki: "キ", Ku: "ク", Ke: "ケ", Ko: "コ",
  Sa: "サ", Shi: "シ", Su: "ス", Se: "セ", So: "ソ",
  Ta: "タ", Chi: "チ", Tsu: "ツ", Te: "テ", To: "ト",
  Na: "ナ", Ni: "ニ", Nu: "ヌ", Ne: "ネ", No: "ノ",
  Ha: "ハ", Hi: "ヒ", Fu: "フ", He: "ヘ", Ho: "ホ",
  Ma: "マ", Mi: "ミ", Mu: "ム", Me: "メ", Mo: "モ",
  Ya: "ヤ", Yu: "ユ", Yo: "ヨ",
  Ra: "ラ", Ri: "リ", Ru: "ル", Re: "レ", Ro: "ロ",
  Wa: "ワ", Wo: "ヲ", N: "ン",
  Kya: "キャ", Kyu: "キュ", Kyo: "キョ",
  Sha: "シャ", Shu: "シュ", Sho: "ショ",
  Cha: "チャ", Chu: "チュ", Cho: "チョ",
  Pya: "ピャ", Pyu: "ピュ", Pyo: "ピョ",
  Gya: "ギャ", Gyu: "ギュ", Gyo: "ギョ",
  Bya: "ビャ", Byu: "ビュ", Byo: "ビョ"
};

const kotobaData = {
  "ひと": "Orang", "いえ / うち": "Rumah", "くるま": "Mobil", "がっこう": "Sekolah", "せんせい": "Guru",
  "がくせい": "Murid / Mahasiswa", "ともだち": "Teman", "ほん": "Buku", "えき": "Stasiun", "おかね": "Uang",
  "でんわ": "Telepon", "いぬ": "Anjing", "ねこ": "Kucing", "ごはん": "Nasi / Makanan", "みず": "Air",
  "にほん": "Jepang", "じかん": "Waktu", "ひる": "Siang", "よる": "Malam", "あさ": "Pagi",
  "ちち": "Ayah", "はは": "Ibu", "あに": "Kakak laki-laki", "あね": "Kakak perempuan", "おとうと": "Adik laki-laki",
  "いもうと": "Adik perempuan", "そふ": "Kakek", "そぼ": "Nenek",
  "きょうしつ": "Ruang kelas", "つくえ": "Meja", "いす": "Kursi", "じしょ": "Kamus", "しけん": "Ujian",
  "べんきょう": "Belajar", "きょうかしょ": "Buku pelajaran", "もんだい": "Soal / Masalah",
  "いしゃ": "Dokter", "かいしゃいん": "Pegawai kantor", "こうむいん": "Pegawai negeri",
  "ぎんこういん": "Pegawai bank", "せいと": "Murid", "えいぎょう": "Marketing",
  "まど": "Jendela", "と": "Pintu", "かがみ": "Cermin", "でんき": "Listrik / lampu",
  "かさ": "Payung", "たな": "Rak", "いえ": "Rumah",
  "そら": "Langit", "やま": "Gunung", "かわ": "Sungai", "うみ": "Laut",
  "てんき": "Cuaca", "あめ": "Hujan", "ゆき": "Salju", "かぜ": "Angin"
};

export default function KanaQuiz() {
  const [mode, setMode] = useState("hiragana");
  const [usedKeys, setUsedKeys] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");

  const data = mode === "hiragana" ? hiraganaData : mode === "katakana" ? katakanaData : kotobaData;
  const allKeys = Object.keys(data);

  const generateQuestion = () => {
    const availableKeys = allKeys.filter(k => !usedKeys.includes(k));
    if (availableKeys.length === 0) {
      setQuestion("");
      return;
    }

    const randKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
    const correctAnswer = randKey;

    const optionsSet = new Set([correctAnswer]);
    while (optionsSet.size < 4 && optionsSet.size < allKeys.length) {
      const opt = allKeys[Math.floor(Math.random() * allKeys.length)];
      optionsSet.add(opt);
    }

    setQuestion(data[randKey]);
    setOptions(shuffleArray(Array.from(optionsSet)));
  };

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const handleAnswer = (answer) => {
    const correctRomaji = Object.keys(data).find(key => data[key] === question);
    if (answer === correctRomaji) {
      setFeedback("✅ Benar!");
      setUsedKeys([...usedKeys, correctRomaji]);
      setTimeout(() => {
        setFeedback("");
        generateQuestion();
      }, 1000);
    } else {
      setFeedback(`❌ Salah. Jawaban: ${correctRomaji}`);
      setTimeout(() => setFeedback(""), 1500);
    }
  };

  useEffect(() => {
    setUsedKeys([]);
    generateQuestion();
  }, [mode]);

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", color: "#3b82f6" }}>
        Tebak {mode === "hiragana" ? "Hiragana" : mode === "katakana" ? "Katakana" : "Kotoba (Kosa Kata)"}
      </h1>

      <div style={{ margin: "1rem" }}>
        <button onClick={() => setMode("hiragana")} style={{ backgroundColor: mode === "hiragana" ? "#3b82f6" : "#e5e7eb", color: mode === "hiragana" ? "white" : "#1f2937", padding: "0.5rem 1rem", borderRadius: "0.5rem", marginRight: "0.5rem", border: "none" }}>Hiragana</button>
        <button onClick={() => setMode("katakana")} style={{ backgroundColor: mode === "katakana" ? "#3b82f6" : "#e5e7eb", color: mode === "katakana" ? "white" : "#1f2937", padding: "0.5rem 1rem", borderRadius: "0.5rem", marginRight: "0.5rem", border: "none" }}>Katakana</button>
        <button onClick={() => setMode("kotoba")} style={{ backgroundColor: mode === "kotoba" ? "#3b82f6" : "#e5e7eb", color: mode === "kotoba" ? "white" : "#1f2937", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none" }}>Kotoba</button>
      </div>

      {question ? (
        <>
          <div style={{ fontSize: "3rem", color: "#333", margin: "1rem" }}>{question}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                style={{ padding: "1rem", fontSize: "1.2rem", backgroundColor: "#f0f9ff", border: "2px solid #3b82f6", borderRadius: "0.5rem", cursor: "pointer" }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = "#dbeafe"}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "#f0f9ff"}
              >
                {opt}
              </button>
            ))}
          </div>
          <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>{feedback}</div>
        </>
      ) : (
        <div style={{ fontSize: "1.2rem", color: "#10b981" }}>🎉 Semua pertanyaan selesai!</div>
      )}
    </div>
  );
}
