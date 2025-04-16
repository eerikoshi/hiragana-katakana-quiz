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
    "Wa": "わ", "Wo": "を", "N": "ん"
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
    "Wa": "ワ", "Wo": "ヲ", "N": "ン"
};

export default function KanaQuiz() {
    const [mode, setMode] = useState("hiragana");
    const [usedKeys, setUsedKeys] = useState([]);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState("");

    const data = mode === "hiragana" ? hiraganaData : katakanaData;
    const allKeys = Object.keys(data);

    const generateQuestion = () => {
        const availableKeys = allKeys.filter((k) => !usedKeys.includes(k));
        if (availableKeys.length === 0) return;
        const randKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
        const correctAnswer = randKey;

        const options = [correctAnswer];
        while (options.length < 4) {
            const option = allKeys[Math.floor(Math.random() * allKeys.length)];
            if (!options.includes(option)) {
                options.push(option);
            }
        }

        setQuestion(data[randKey]);
        setOptions(shuffleArray(options));
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleAnswer = (answer) => {
        const correctRomaji = Object.keys(data).find(key => data[key] === question);
        if (answer === correctRomaji) {
            setFeedback("Benar!");
            setUsedKeys([...usedKeys, correctRomaji]);
            setTimeout(() => {
                setFeedback("");
                generateQuestion();
            }, 1000);
        } else {
            setFeedback(`Salah. Jawaban yang benar: ${correctRomaji}`);
            setTimeout(() => setFeedback(""), 2000);
        }
    };

    useEffect(() => {
        generateQuestion();
    }, [mode]);

    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", textAlign: "center", fontFamily: "sans-serif" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#1f2937" }}>
                Tebak {mode === "hiragana" ? "Hiragana" : "Katakana"}
            </h1>

            <div style={{ marginBottom: "1rem" }}>
                <button
                    onClick={() => setMode("hiragana")}
                    style={{
                        padding: "0.5rem 1rem",
                        margin: "0 0.5rem",
                        borderRadius: "0.5rem",
                        backgroundColor: mode === "hiragana" ? "#3b82f6" : "#e5e7eb",
                        color: mode === "hiragana" ? "white" : "#1f2937",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Hiragana
                </button>
                <button
                    onClick={() => setMode("katakana")}
                    style={{
                        padding: "0.5rem 1rem",
                        margin: "0 0.5rem",
                        borderRadius: "0.5rem",
                        backgroundColor: mode === "katakana" ? "#3b82f6" : "#e5e7eb",
                        color: mode === "katakana" ? "white" : "#1f2937",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Katakana
                </button>
            </div>

            {question && (
                <>
                    <div style={{ fontSize: "5rem", fontWeight: "bold", marginBottom: "1rem", color: "#111827" }}>
                        {question}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        {options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(opt)}
                                style={{
                                    padding: "0.75rem",
                                    backgroundColor: "#bfdbfe",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    transition: "0.3s",
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#60a5fa"}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#bfdbfe"}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>

                    {feedback && <div style={{ fontSize: "1.1rem", color: "#10b981", marginTop: "0.5rem" }}>{feedback}</div>}
                </>
            )}

            {!question && (
                <div style={{ fontSize: "1.1rem", marginTop: "1rem", color: "#22c55e" }}>
                    Semua pertanyaan sudah dijawab! 🎉
                </div>
            )}
        </div>
    );
    // return (
    //     <div className="p-4 max-w-xl mx-auto text-center">
    //         <h1 className="text-2xl font-bold mb-4">Tebak {mode === "hiragana" ? "Hiragana" : "Katakana"}</h1>
    //         <div className="mb-4">
    //             <button
    //                 className={`px-4 py-2 m-2 rounded ${mode === "hiragana" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
    //                 onClick={() => setMode("hiragana")}
    //             >
    //                 Hiragana
    //             </button>
    //             <button
    //                 className={`px-4 py-2 m-2 rounded ${mode === "katakana" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
    //                 onClick={() => setMode("katakana")}
    //             >
    //                 Katakana
    //             </button>
    //         </div>
    //         {question && (
    //             <>
    //                 <div className="text-6xl font-bold mb-4">{question}</div>
    //                 <div className="grid grid-cols-2 gap-4 mb-4">
    //                     {options.map((opt, idx) => (
    //                         <button
    //                             key={idx}
    //                             onClick={() => handleAnswer(opt)}
    //                             className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-300"
    //                         >
    //                             {opt}
    //                         </button>
    //                     ))}
    //                 </div>
    //                 {feedback && <div className="text-lg mt-2">{feedback}</div>}
    //             </>
    //         )}
    //         {!question && (
    //             <div className="text-lg mt-4 text-green-600">Semua pertanyaan sudah dijawab! 🎉</div>
    //         )}
    //     </div>
    // );
}
