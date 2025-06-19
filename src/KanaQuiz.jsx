"use client";

import React, { useState, useEffect } from "react";

// Hiragana data
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

// Katakana data
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

// Kotoba data
const kotobaData = {
  "Kaki": { hiragana: "あし", kanji: "足" },
  "Bermain": { hiragana: "あそびます", kanji: "遊びます" },
  "Kepala": { hiragana: "あたま", kanji: "頭" },
  "Bahaya / Awas": { hiragana: "あぶない", kanji: "危ない" },
  "Berjalan": { hiragana: "あるきます", kanji: "歩きます" },
  "Tidak / Bukan": { hiragana: "いいえ", kanji: "いいえ (kana)" },
  "Saya makan suguhannya": { hiragana: "いただきます", kanji: "頂きます" },
  "Satu": { hiragana: "いち", kanji: "一" },
  "Memasukkan": { hiragana: "いれます", kanji: "入れます" },
  "Indonesia": { hiragana: "インドネシア", kanji: "—" },
  "Bahasa Indonesia": { hiragana: "インドネシアご", kanji: "インドネシア語" },
  "Orang Indonesia": { hiragana: "インドネシアじん", kanji: "インドネシア人" },
  "Menyanyi": { hiragana: "うたいます", kanji: "歌います" },
  "Lahir": { hiragana: "うまれます", kanji: "生まれます" },
  "Menjual": { hiragana: "うります", kanji: "売ります" },
  "Meletakkan": { hiragana: "おきます", kanji: "置きます" },
  "Mendorong": { hiragana: "おします", kanji: "押します" },
  "Perut": { hiragana: "おなか", kanji: "お腹" },
  "Selamat pagi": { hiragana: "おはようございます", kanji: "お早うございます" },
  "Selamat tidur": { hiragana: "おやすみなさい", kanji: "お休みなさい" },
  "Berenang": { hiragana: "およぎます", kanji: "泳ぎます" },
  "Mengembalikan": { hiragana: "かえします", kanji: "返します" },
  "Keluarga": { hiragana: "かぞく", kanji: "家族" },
  "Badan": { hiragana: "からだ", kanji: "体" },
  "Semangat! / Berusahalah": { hiragana: "がんばってください", kanji: "頑張ってください" },
  "Memakai (pakaian)": { hiragana: "きます", kanji: "着ます" },
  "Sembilan": { hiragana: "きゅう", kanji: "九" },
  "Sembilan puluh": { hiragana: "きゅうじゅう", kanji: "九十" },
  "IM JAPAN": { hiragana: "アイム・ジャパン", kanji: "—" },
  "Obat": { hiragana: "くすり", kanji: "薬" },
  "Mulut": { hiragana: "くち", kanji: "口" },
  "Kaos kaki": { hiragana: "くつした", kanji: "靴下" },
  "Menikah": { hiragana: "けっこんします", kanji: "結婚します" },
  "Peserta magang": { hiragana: "けんしゅうせい", kanji: "研修生" },
  "Lima": { hiragana: "ご", kanji: "五" },
  "Lima puluh": { hiragana: "ごじゅう", kanji: "五十" },
  "Menjawab": { hiragana: "こたえます", kanji: "答えます" },
  "Terima kasih sudah makan": { hiragana: "ごちそうさまでした", kanji: "ご馳走様でした" },
  "Mengfotokopi (copy)": { hiragana: "コピーします", kanji: "—" },
  "Susah": { hiragana: "こまります", kanji: "困ります" },
  "Permisi / permintaan izin": { hiragana: "ごめんください", kanji: "御免ください" },
  "Maaf": { hiragana: "ごめんなさい", kanji: "御免なさい" },
  "Selamat siang": { hiragana: "こんにちは", kanji: "今日は" },
  "Selamat malam": { hiragana: "こんばんは", kanji: "今晩は" },
  "Dompet": { hiragana: "さいふ", kanji: "財布" },
  "Selamat tinggal": { hiragana: "さよなら／さようなら", kanji: "左様なら／然様なら" },
  "Tiga": { hiragana: "さん", kanji: "三" },
  "Tiga puluh": { hiragana: "さんじゅう", kanji: "三十" },
  "Berjalan-jalan": { hiragana: "さんぽします", kanji: "散歩します" },
  "Pekerjaan": { hiragana: "しごと", kanji: "仕事" },
  "Permisi / Maaf mengganggu": { hiragana: "しつれいします", kanji: "失礼します" },
  "Meninggal dunia": { hiragana: "しにます", kanji: "死にます" },
  "Diri sendiri": { hiragana: "じぶん", kanji: "自分" },
  "Melakukan": { hiragana: "します", kanji: "—（為ます secara kanji）" },
  "Sepuluh": { hiragana: "じゅう", kanji: "十" },
  "Sebelas": { hiragana: "じゅういち", kanji: "十一" },
  "Sembilan belas": { hiragana: "じゅうきゅう", kanji: "十九" },
  "Lima belas": { hiragana: "じゅうご", kanji: "十五" },
  "Sampai jumpa": { hiragana: "では、また", kanji: "—" },
  "Terima kasih kembali": { hiragana: "（いいえ）どういたしまして", kanji: "—" },
  "Silakan": { hiragana: "どうぞ", kanji: "—" },
  "Terima kasih": { hiragana: "（どうも）ありがとうございます", kanji: "有難うございます" },
  "Berhenti": { hiragana: "とまります", kanji: "止まります" },
  "Teman": { hiragana: "ともだち", kanji: "友達" },
  "Hilang": { hiragana: "なくします", kanji: "無くします" },
  "Korek api": { hiragana: "マッチ", kanji: "—" },
  "Asbak": { hiragana: "はいざら", kanji: "灰皿" },
  "Korek gas": { hiragana: "ライター", kanji: "—" },
  "Meja": { hiragana: "つくえ", kanji: "机" },
  "Kursi": { hiragana: "いす", kanji: "椅子" },
  "Jendela": { hiragana: "まど", kanji: "窓" },
  "Listrik / lampu": { hiragana: "でんき", kanji: "電気" },
  "Saklar": { hiragana: "スイッチ", kanji: "—" },
  "Pintu": { hiragana: "ドア", kanji: "—" },
  "Televisi": { hiragana: "テレビ", kanji: "—" },
  "Radio": { hiragana: "ラジオ", kanji: "—" },
  "Jam": { hiragana: "とけい", kanji: "時計" },
  "Kamera": { hiragana: "カメラ", kanji: "—" },
  "Mobil": { hiragana: "じどうしゃ", kanji: "自動車" },
  "Rumah": { hiragana: "いえ", kanji: "家" },
  "Halaman": { hiragana: "にわ", kanji: "庭" },
  "Perusahaan": { hiragana: "かいしゃ", kanji: "会社" },
  "Kantor": { hiragana: "じむしょ", kanji: "事務所" },
  "Resepsionis": { hiragana: "うけつけ", kanji: "受付" },
  "Lobi": { hiragana: "ロビー", kanji: "—" },
  "Kamar": { hiragana: "へや", kanji: "部屋" },
  "Toilet": { hiragana: "おてあらい", kanji: "お手洗い" },
  "Ruang kelas": { hiragana: "きょうしつ", kanji: "教室" },
  "Kantin": { hiragana: "しょくどう", kanji: "食堂" },
  "Keahlian / Jurusan": { hiragana: "せんもん", kanji: "専門" },
  "Mesin": { hiragana: "きかい", kanji: "機械" },
  "Komputer": { hiragana: "コンピュータ", kanji: "—" },
  "Pagi": { hiragana: "あさ", kanji: "朝" },
  "Siang": { hiragana: "ひる", kanji: "昼" },
  "Malam": { hiragana: "ばん", kanji: "晩" },
  "Jam 00–12 (a.m.)": { hiragana: "ごぜん", kanji: "午前" },
  "Jam 12–24 (p.m.)": { hiragana: "ごご", kanji: "午後" },
  "Stasiun": { hiragana: "えき", kanji: "駅" },
  "Pabrik": { hiragana: "こうじょう", kanji: "工場" },
  "Bank": { hiragana: "ぎんこう", kanji: "銀行" },
  "Rumah sakit": { hiragana: "びょういん", kanji: "病院" },
  "Department store": { hiragana: "デパート", kanji: "—" },
  "Toko buku": { hiragana: "ほんや", kanji: "本屋" },
  "Tempat pangkas rambut": { hiragana: "とこや", kanji: "床屋" },
  "Dunia": { hiragana: "せかい", kanji: "世界" },
  "Asia": { hiragana: "アジア", kanji: "—" },
  "Eropa": { hiragana: "ヨーロッパ", kanji: "—" },
  "Afrika": { hiragana: "アフリカ", kanji: "—" },
  "Jepang": { hiragana: "にほん", kanji: "日本" },
  "Indonesia": { hiragana: "インドネシア", kanji: "—" },
  "China": { hiragana: "ちゅうごく", kanji: "中国" },
  "Korea Selatan": { hiragana: "かんこく", kanji: "韓国" },
  "Malaysia": { hiragana: "マレーシア", kanji: "—" },
  "Thailand": { hiragana: "タイ", kanji: "—" },
  "Filipina": { hiragana: "フィリピン", kanji: "—" },
  "Vietnam": { hiragana: "ベトナム", kanji: "—" },
  "Singapura": { hiragana: "シンガポール", kanji: "—" },
  "Brunei": { hiragana: "ブルネイ", kanji: "—" },
  "Hongkong": { hiragana: "ホンコン", kanji: "香港" },
  "India": { hiragana: "インド", kanji: "—" },
  "Saudi Arabia": { hiragana: "サウジアラビア", kanji: "—" },
  "Australia": { hiragana: "オーストラリア", kanji: "—" },
  "Inggris": { hiragana: "イギリス", kanji: "—" },
  "Jerman": { hiragana: "ドイツ", kanji: "—" },
  "Prancis": { hiragana: "フランス", kanji: "—" },
  "Italia": { hiragana: "イタリア", kanji: "—" },
  "Belanda": { hiragana: "オランダ", kanji: "—" },
  "Spanyol": { hiragana: "スペイン", kanji: "—" },
  "Rusia": { hiragana: "ロシア", kanji: "—" },
  "Amerika": { hiragana: "アメリカ", kanji: "—" },
  "Kanada": { hiragana: "カナダ", kanji: "—" },
  "Buku": { hiragana: "ほん", kanji: "本" },
  "Kamus": { hiragana: "じしょ", kanji: "辞書" },
  "Koran": { hiragana: "しんぶん", kanji: "新聞" },
  "Majalah": { hiragana: "ざっし", kanji: "雑誌" },
  "Kotak": { hiragana: "はこ", kanji: "箱" },
  "Tas": { hiragana: "かばん", kanji: "鞄" },
  "Kunci": { hiragana: "かぎ", kanji: "鍵" },
  "Pensil": { hiragana: "えんぴつ", kanji: "鉛筆" },
  "Bolpoin": { hiragana: "ボールペン", kanji: "—" },
  "Pena": { hiragana: "ペン", kanji: "—" },
  "Buku Catatan": { hiragana: "ノート", kanji: "—" },
  "Kertas": { hiragana: "かみ", kanji: "紙" },
  "Rokok": { hiragana: "たばこ", kanji: "煙草" }
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
    const optionsSet = new Set([randKey]);
    while (optionsSet.size < 4 && optionsSet.size < allKeys.length) {
      optionsSet.add(allKeys[Math.floor(Math.random() * allKeys.length)]);
    }

    setQuestion(mode === "kotoba" ? randKey : data[randKey]);
    setOptions(shuffleArray([...optionsSet]));
  };

  const handleAnswer = (answer) => {
    let correctKey;
    if (mode === "kotoba") {
      correctKey = question;
    } else {
      correctKey = Object.keys(data).find(k => data[k] === question);
    }

    if (answer === correctKey) {
      setFeedback("✅ Benar!");
      setUsedKeys([...usedKeys, correctKey]);
      setTimeout(() => {
        setFeedback("");
        generateQuestion();
      }, 1000);
    } else {
      if (mode === "kotoba") {
        const correct = kotobaData[correctKey];
        setFeedback(`❌ Salah. Jawaban: ${correct.kanji} (${correct.hiragana})`);
      } else {
        setFeedback(`❌ Salah. Jawaban: ${correctKey}`);
      }
      setTimeout(() => setFeedback(""), 1500);
    }
  };

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    setUsedKeys([]);
    generateQuestion();
  }, [mode]);

  return (
    <div style={{ backgroundColor: "#d1d5db", minHeight: "100vh", padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", color: "#3b82f6" }}>
        Tebak {mode === "hiragana" ? "Hiragana" : mode === "katakana" ? "Katakana" : "Kotoba"}
      </h1>

      <div style={{ margin: "1rem" }}>
        {["hiragana", "katakana", "kotoba"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              backgroundColor: mode === m ? "#3b82f6" : "#e5e7eb",
              color: mode === m ? "white" : "#1f2937",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              marginRight: "0.5rem",
              border: "none"
            }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {question ? (
        <>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{question}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                style={{
                  padding: "1rem",
                  fontSize: "1.2rem",
                  backgroundColor: "#f0f9ff",
                  border: "2px solid #3b82f6",
                  borderRadius: "0.5rem",
                  cursor: "pointer"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#dbeafe"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f0f9ff"}
              >
                {mode === "kotoba" ? (
                  <>
                    <div style={{ fontSize: "1.5rem" }}>{kotobaData[opt]?.kanji ?? "?"}</div>
                    <div style={{ fontSize: "1rem", color: "#555" }}>{kotobaData[opt]?.hiragana ?? "?"}</div>
                  </>
                ) : (
                  data[opt]
                )}
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
