import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

const kotobaList = [
  { hiragana: "ひと", kanji: "人", arti: "Orang" },
  { hiragana: "いえ", kanji: "家", arti: "Rumah" },
  { hiragana: "くるま", kanji: "車", arti: "Mobil" },
  { hiragana: "がっこう", kanji: "学校", arti: "Sekolah" },
  { hiragana: "せんせい", kanji: "先生", arti: "Guru" },
  { hiragana: "がくせい", kanji: "学生", arti: "Murid / Mahasiswa" },
  { hiragana: "ともだち", kanji: "友達", arti: "Teman" },
  { hiragana: "ほん", kanji: "本", arti: "Buku" },
  { hiragana: "えき", kanji: "駅", arti: "Stasiun" },
  { hiragana: "おかね", kanji: "お金", arti: "Uang" },
  // ... bisa lanjutkan sesuai daftar lengkap Anda
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function KanaKotobaQuiz() {
  const [mode, setMode] = useState("hiragana");
  const [usedKeys, setUsedKeys] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [kotoba, setKotoba] = useState(null);
  const [kotobaOptions, setKotobaOptions] = useState([]);
  const [kotobaResult, setKotobaResult] = useState("");

  const data = mode === "hiragana" ? hiraganaData : mode === "katakana" ? katakanaData : null;
  const allKeys = data ? Object.keys(data) : [];

  useEffect(() => {
    if (mode === "kotoba") generateKotoba();
    else {
      setUsedKeys([]);
      generateKana();
    }
  }, [mode]);

  const generateKana = () => {
    const availableKeys = allKeys.filter(k => !usedKeys.includes(k));
    if (availableKeys.length === 0) {
      setQuestion("");
      return;
    }
    const randKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
    const correctAnswer = randKey;
    const optionsSet = new Set([correctAnswer]);
    while (optionsSet.size < 4) {
      const opt = allKeys[Math.floor(Math.random() * allKeys.length)];
      optionsSet.add(opt);
    }
    setQuestion(data[randKey]);
    setOptions(shuffle(Array.from(optionsSet)));
  };

  const handleKanaAnswer = (answer) => {
    const correctRomaji = Object.keys(data).find(key => data[key] === question);
    if (answer === correctRomaji) {
      setFeedback("✅ Benar!");
      setUsedKeys([...usedKeys, correctRomaji]);
      setTimeout(() => {
        setFeedback("");
        generateKana();
      }, 1000);
    } else {
      setFeedback(`❌ Salah. Jawaban: ${correctRomaji}`);
      setTimeout(() => setFeedback(""), 1500);
    }
  };

  const generateKotoba = () => {
    const shuffled = shuffle([...kotobaList]);
    const q = shuffled[0];
    const choices = shuffle([
      q.arti,
      shuffled[1].arti,
      shuffled[2].arti,
      shuffled[3].arti
    ]);
    setKotoba(q);
    setKotobaOptions(choices);
    setKotobaResult("");
  };

  const checkKotobaAnswer = (selected) => {
    if (selected === kotoba.arti) {
      setKotobaResult("✅ Benar!");
    } else {
      setKotobaResult(`❌ Salah. Jawaban benar: ${kotoba.arti}`);
    }
    setTimeout(generateKotoba, 1500);
  };

  return (
    <div className="p-6 text-center font-sans">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Tebak {mode === "hiragana" ? "Hiragana" : mode === "katakana" ? "Katakana" : "Kotoba"}
      </h1>
      <div className="mb-6 space-x-2">
        <Button onClick={() => setMode("hiragana")} variant={mode === "hiragana" ? "default" : "outline"}>Hiragana</Button>
        <Button onClick={() => setMode("katakana")} variant={mode === "katakana" ? "default" : "outline"}>Katakana</Button>
        <Button onClick={() => setMode("kotoba")} variant={mode === "kotoba" ? "default" : "outline"}>Tebak Kotoba</Button>
      </div>

      {mode !== "kotoba" && question && (
        <>
          <div className="text-6xl text-gray-800 mb-4">{question}</div>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {options.map((opt, idx) => (
              <Button key={idx} onClick={() => handleKanaAnswer(opt)}>{opt}</Button>
            ))}
          </div>
          <div className="mt-4 text-lg">{feedback}</div>
        </>
      )}

      {mode === "kotoba" && kotoba && (
        <>
          <Card className="w-full max-w-md mb-4 mx-auto">
            <CardContent className="text-center p-6 text-4xl">
              {kotoba.hiragana}（{kotoba.kanji}）
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {kotobaOptions.map((option, index) => (
              <Button key={index} onClick={() => checkKotobaAnswer(option)}>
                {option}
              </Button>
            ))}
          </div>
          <div className="mt-4 text-lg font-semibold">{kotobaResult}</div>
        </>
      )}

      {!question && mode !== "kotoba" && (
        <div className="text-green-600 text-xl mt-6">🎉 Semua pertanyaan selesai!</div>
      )}
    </div>
  );
}
