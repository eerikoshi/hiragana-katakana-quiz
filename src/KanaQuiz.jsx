import React, { useState, useEffect } from "react";

const hiraganaData = {
  "A": "あ", "I": "い", "U": "う", "E": "え", "O": "お",
  "Ka": "か", "Ki": "き", "Ku": "く", "Ke": "け", "Ko": "こ",
  "Sa": "さ", "Shi": "し", "Su": "す", "Se": "せ", "So": "そ",
  "Ta": "た", "Chi": "ち", "Tsu": "つ", "Te": "て", "To": "と",
  "Na": "な", "Ni": "に", "Nu": "ぬ", "Ne": "ね", "No": "の",
  "Ha": "は", "Hi": "ひ", "Fu": "ふ", "He": "へ", "Ho": "ほ",
  "Ma": "ま", "Mi": "み", "Mu": "む", "Me": "め", "Mo": "も",
  "Ya": "や", "Yu": "ゆ", "Yo": "よ",
  "Ra": "ら", "Ri": "り", "Ru": "る", "Re": "れ", "Ro": "ろ",
  "Wa": "わ", "Wo": "を", "N": "ん",
  // Yoon
  "Kya": "きゃ", "Kyu": "きゅ", "Kyo": "きょ",
  "Sha": "しゃ", "Shu": "しゅ", "Sho": "しょ",
  "Cha": "ちゃ", "Chu": "ちゅ", "Cho": "ちょ",
  "Nya": "にゃ", "Nyu": "にゅ", "Nyo": "にょ",
  "Hya": "ひゃ", "Hyu": "ひゅ", "Hyo": "ひょ",
  "Mya": "みゃ", "Myu": "みゅ", "Myo": "みょ",
  "Rya": "りゃ", "Ryu": "りゅ", "Ryo": "りょ",
  "Gya": "ぎゃ", "Gyu": "ぎゅ", "Gyo": "ぎょ",
  "Ja": "じゃ", "Ju": "じゅ", "Jo": "じょ",
  "Bya": "びゃ", "Byu": "びゅ", "Byo": "びょ",
  "Pya": "ぴゃ", "Pyu": "ぴゅ", "Pyo": "ぴょ"
};

const katakanaData = {
  "A": "ア", "I": "イ", "U": "ウ", "E": "エ", "O": "オ",
  "Ka": "カ", "Ki": "キ", "Ku": "ク", "Ke": "ケ", "Ko": "コ",
  "Sa": "サ", "Shi": "シ", "Su": "ス", "Se": "セ", "So": "ソ",
  "Ta": "タ", "Chi": "チ", "Tsu": "ツ", "Te": "テ", "To": "ト",
  "Na": "ナ", "Ni": "ニ", "Nu": "ヌ", "Ne": "ネ", "No": "ノ",
  "Ha": "ハ", "Hi": "ヒ", "Fu": "フ", "He": "ヘ", "Ho": "ホ",
  "Ma": "マ", "Mi": "ミ", "Mu": "ム", "Me": "メ", "Mo": "モ",
  "Ya": "ヤ", "Yu": "ユ", "Yo": "ヨ",
  "Ra": "ラ", "Ri": "リ", "Ru": "ル", "Re": "レ", "Ro": "ロ",
  "Wa": "ワ", "Wo": "ヲ", "N": "ン",
  // Yoon
  "Kya": "キャ", "Kyu": "キュ", "Kyo": "キョ",
  "Sha": "シャ", "Shu": "シュ", "Sho": "ショ",
  "Cha": "チャ", "Chu": "チュ", "Cho": "チョ",
  "Nya": "ニャ", "Nyu": "ニュ", "Nyo": "ニョ",
  "Hya": "ヒャ", "Hyu": "ヒュ", "Hyo": "ヒョ",
  "Mya": "ミャ", "Myu": "ミュ", "Myo": "ミョ",
  "Rya": "リャ", "Ryu": "リュ", "Ryo": "リョ",
  "Gya": "ギャ", "Gyu": "ギュ", "Gyo": "ギョ",
  "Ja": "ジャ", "Ju": "ジュ", "Jo": "ジョ",
  "Bya": "ビャ", "Byu": "ビュ", "Byo": "ビョ",
  "Pya": "ピャ", "Pyu": "ピュ", "Pyo": "ピョ",
  // Katakana asing
  "Fa": "ファ", "Fi": "フィ", "Fe": "フェ", "Fo": "フォ",
  "Ti": "ティ", "Di": "ディ", "Du": "ドゥ",
  "Che": "チェ", "She": "シェ", "Je": "ジェ",
  "Va": "ヴァ", "Vi": "ヴィ", "Ve": "ヴェ", "Vo": "ヴォ"
};

export default function KanaQuiz() {
  const [mode, setMode] = useState("hiragana");
  const [usedKeys, setUsedKeys] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");

  const data = mode === "hiragana" ? hiraganaData : katakanaData;
  const allKeys = Object.keys(data);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const generateQuestion = () => {
    const availableKeys = allKeys.filter(k => !usedKeys.includes(k));
    if (availableKeys.length === 0) {
      setQuestion("");
      return;
    }

    const randKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
    const correctAnswer = randKey;

    const newOptions = [correctAnswer];
    while (newOptions.length < 4) {
      const opt = allKeys[Math.floor(Math.random() * allKeys.length)];
      if (!newOptions.includes(opt)) newOptions.push(opt);
    }

    setQuestion(data[randKey]);
    setOptions(shuffleArray(newOptions));
  };

  const handleAnswer = (answer) => {
    const correctRomaji = Object.keys(data).find(k => data[k] === question);
    if (answer === correctRomaji) {
      setFeedback("Benar!");
      setUsedKeys([...usedKeys, correctRomaji]);
      setTimeout(() => {
        setFeedback("");
        generateQuestion();
      }, 1000);
    } else {
      setFeedback(`Salah. Jawaban: ${correctRomaji}`);
      setTimeout(() => setFeedback(""), 1500);
    }
  };

  useEffect(() => {
    setUsedKeys([]);
    generateQuestion();
  }, [mode]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Tebak {mode === "hiragana" ? "Hiragana" : "Katakana"}</h1>
      <div>
        <button onClick={() => setMode("hiragana")}>Hiragana</button>
        <button onClick={() => setMode("katakana")}>Katakana</button>
      </div>
      {question ? (
        <>
          <div style={{ fontSize: "4rem" }}>{question}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)}>{opt}</button>
            ))}
          </div>
          <div>{feedback}</div>
        </>
      ) : (
        <div>Semua pertanyaan selesai 🎉</div>
      )}
    </div>
  );
}
