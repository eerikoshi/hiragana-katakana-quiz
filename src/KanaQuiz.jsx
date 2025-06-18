"use client";
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
  { hiragana: "でんわ", kanji: "電話", arti: "Telepon" },
  { hiragana: "いぬ", kanji: "犬", arti: "Anjing" },
  { hiragana: "ねこ", kanji: "猫", arti: "Kucing" },
  { hiragana: "ごはん", kanji: "ご飯", arti: "Nasi / Makanan" },
  { hiragana: "みず", kanji: "水", arti: "Air" },
  { hiragana: "にほん", kanji: "日本", arti: "Jepang" },
  { hiragana: "じかん", kanji: "時間", arti: "Waktu" },
  { hiragana: "ひる", kanji: "昼", arti: "Siang" },
  { hiragana: "よる", kanji: "夜", arti: "Malam" },
  { hiragana: "あさ", kanji: "朝", arti: "Pagi" },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function GameGabungan() {
  const [gameMode, setGameMode] = useState("kana");
  const [kanaMode, setKanaMode] = useState("hiragana");
  const [kanaQueue, setKanaQueue] = useState([]);
  const [kanaQuestion, setKanaQuestion] = useState("");
  const [kanaOptions, setKanaOptions] = useState([]);
  const [kanaFeedback, setKanaFeedback] = useState("");

  const [kotobaQueue, setKotobaQueue] = useState([]);
  const [kotobaQuestion, setKotobaQuestion] = useState(null);
  const [kotobaOptions, setKotobaOptions] = useState([]);
  const [kotobaFeedback, setKotobaFeedback] = useState("");

  const kanaData = kanaMode === "hiragana" ? hiraganaData : katakanaData;
  const kanaKeys = Object.keys(kanaData);

  useEffect(() => {
    if (gameMode === "kana") {
      const shuffled = shuffle(kanaKeys);
      setKanaQueue(shuffled);
      setKanaFeedback("");
    }
    if (gameMode === "kotoba") {
      const shuffled = shuffle(kotobaList);
      setKotobaQueue(shuffled);
      setKotobaFeedback("");
    }
  }, [kanaMode, gameMode]);

  useEffect(() => {
    if (gameMode === "kana" && kanaQueue.length > 0) {
      const answer = kanaQueue[0];
      const options = shuffle([
        answer,
        ...shuffle(kanaKeys.filter(k => k !== answer)).slice(0, 3),
      ]);
      setKanaQuestion(kanaData[answer]);
      setKanaOptions(options);
    }
  }, [kanaQueue]);

  useEffect(() => {
    if (gameMode === "kotoba" && kotobaQueue.length > 0) {
      const q = kotobaQueue[0];
      const options = shuffle([
        q.arti,
        ...shuffle(kotobaList.filter(k => k.arti !== q.arti)).slice(0, 3).map(k => k.arti),
      ]);
      setKotobaQuestion(q);
      setKotobaOptions(options);
    }
  }, [kotobaQueue]);

  const handleKanaAnswer = (ans) => {
    const correct = kanaQueue[0];
    if (ans === correct) {
      setKanaFeedback("✅ Benar!");
      setKanaQueue(kanaQueue.slice(1));
    } else {
      setKanaFeedback(`❌ Salah. Jawaban: ${correct}`);
    }
  };

  const handleKotobaAnswer = (ans) => {
    const correct = kotobaQueue[0].arti;
    if (ans === correct) {
      setKotobaFeedback("✅ Benar!");
      setKotobaQueue(kotobaQueue.slice(1));
    } else {
      setKotobaFeedback(`❌ Salah. Jawaban: ${correct}`);
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-4">🎌 Belajar Jepang</h1>

      {/* Mode */}
      <div className="mb-4 flex gap-2">
        <Button onClick={() => setGameMode("kana")} variant={gameMode === "kana" ? "default" : "outline"}>
          Tebak Kana
        </Button>
        <Button onClick={() => setGameMode("kotoba")} variant={gameMode === "kotoba" ? "default" : "outline"}>
          Tebak Kotoba
        </Button>
      </div>

      {gameMode === "kana" && (
        <>
          <div className="mb-4 flex gap-2">
            <Button onClick={() => setKanaMode("hiragana")} variant={kanaMode === "hiragana" ? "default" : "outline"}>
              Hiragana
            </Button>
            <Button onClick={() => setKanaMode("katakana")} variant={kanaMode === "katakana" ? "default" : "outline"}>
              Katakana
            </Button>
          </div>

          {kanaQueue.length > 0 ? (
            <>
              <div className="text-6xl my-4">{kanaQuestion}</div>
              <div className="grid grid-cols-2 gap-4 max-w-xs">
                {kanaOptions.map((o, i) => (
                  <Button key={i} onClick={() => handleKanaAnswer(o)}>{o}</Button>
                ))}
              </div>
              {kanaFeedback && <p className="mt-4 text-xl">{kanaFeedback}</p>}
            </>
          ) : (
            <p className="text-green-600 mt-4">🎉 Semua soal selesai!</p>
          )}
        </>
      )}

      {gameMode === "kotoba" && (
        <>
          {kotobaQueue.length > 0 && kotobaQuestion ? (
            <>
              <Card className="w-full max-w-md mb-4">
                <CardContent className="text-center p-6 text-4xl">
                  {kotobaQuestion.hiragana}（{kotobaQuestion.kanji}）
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                {kotobaOptions.map((o, i) => (
                  <Button key={i} onClick={() => handleKotobaAnswer(o)}>{o}</Button>
                ))}
              </div>
              {kotobaFeedback && <p className="mt-6 text-xl">{kotobaFeedback}</p>}
            </>
          ) : (
            <p className="text-green-600 mt-4">🎉 Semua soal selesai!</p>
          )}
        </>
      )}
    </div>
  );
}
