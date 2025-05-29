"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function isJsonString(str) {
  if (typeof str !== "string") return false;
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object";
  } catch {
    return false;
  }
}

function parseEmbeddedJson(data) {
  if (typeof data === "string" && isJsonString(data)) {
    return parseEmbeddedJson(JSON.parse(data));
  } else if (Array.isArray(data)) {
    return data.map(parseEmbeddedJson);
  } else if (typeof data === "object" && data !== null) {
    const newObj = {};
    for (const [key, value] of Object.entries(data)) {
      newObj[key] = parseEmbeddedJson(value);
    }
    return newObj;
  }
  return data;
}

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, null, 4);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "text-gray-400";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-blue-500";
        } else {
          cls = "text-green-600";
        }
      } else if (/true|false/.test(match)) {
        cls = "text-purple-500";
      } else if (/null/.test(match)) {
        cls = "text-gray-400";
      } else {
        cls = "text-orange-500";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

const translations = {
  zh: {
    title: "JSON 字符串展开器",
    placeholder: "在此粘贴你的 JSON...",
    expandButton: "展开 JSON",
    error: "无效的 JSON 输入。",
    language: "语言",
    description: "在线 JSON 嵌套字符串解析工具，快速格式化嵌套 JSON 内容。",
    about: "关于我们",
    privacy: "隐私政策",
    home: "首页",
    sampleTitle: "样例输入",
    sampleNote: "粘贴嵌套 JSON，我们会自动展开。",
    copyButton: "复制结果"
  },
  en: {
    title: "JSON String Expander",
    placeholder: "Paste your JSON here...",
    expandButton: "Expand JSON",
    error: "Invalid JSON input.",
    language: "Language",
    description: "Online tool to expand nested JSON strings into readable format.",
    about: "About",
    privacy: "Privacy",
    home: "Home",
    sampleTitle: "Sample Input",
    sampleNote: "Paste nested JSON and we will expand it automatically.",
    copyButton: "Copy Output"
  },
  ja: {
    title: "JSON文字列展開ツール",
    placeholder: "ここにJSONを貼り付けてください...",
    expandButton: "JSONを展開する",
    error: "無効なJSON入力です。",
    language: "言語",
    description: "入れ子になったJSON文字列を展開・整形するオンラインツールです。",
    about: "私たちについて",
    privacy: "プライバシー",
    home: "ホーム",
    sampleTitle: "サンプル入力",
    sampleNote: "ネストされたJSONを貼り付けると、自動的に展開されます。",
    copyButton: "出力をコピー"
  }
};

function detectDefaultLang() {
  const lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ja")) return "ja";
  return "en";
}

export default function JsonExpander() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState("");
  const [lang, setLang] = useState("zh");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLang(detectDefaultLang());
  }, []);

  const t = translations[lang];

  const handleExpand = () => {
    setError("");
    try {
      const parsed = JSON.parse(inputJson);
      const expanded = parseEmbeddedJson(parsed);
      setOutputJson(JSON.stringify(expanded, null, 4));
    } catch (e) {
      setError(t.error);
    }
  };

  const handleCopy = async () => {
    if (!outputJson) return;
    try {
      await navigator.clipboard.writeText(outputJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://json-expander-web.vercel.app" />
        <meta property="og:image" content="https://json-expander-web.vercel.app/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.title} />
        <meta name="twitter:description" content={t.description} />
        <meta name="twitter:image" content="https://json-expander-web.vercel.app/og-image.png" />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8872858650284677"
     crossOrigin="anonymous"></script>
      </Head>

      <div className="p-6 max-w-4xl mx-auto">
        <nav className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex gap-4 text-sm">
            <Link href="/" className="hover:underline">{t.home}</Link>
            <Link href="/about" className="hover:underline">{t.about}</Link>
            <Link href="/privacy" className="hover:underline">{t.privacy}</Link>
          </div>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </nav>

        <h1 className="text-2xl font-bold mb-4">{t.title}</h1>

        <div className="bg-gray-50 p-4 rounded shadow mt-8">
          <h2 className="text-lg font-semibold mb-2">{t.sampleTitle}</h2>
          <pre className="text-sm bg-white p-2 rounded border overflow-x-auto">
            {`{"user": "Tom","profile": "{\\"age\\":25,\\"city\\":\\"Tokyo\\"}"}`}
          </pre>
          <p className="mt-2 text-gray-600">{t.sampleNote}</p>
        </div>

        <div className="grid gap-6 mt-6">
          <Textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            rows={10}
            placeholder={t.placeholder}
          />
          <Button onClick={handleExpand}>{t.expandButton}</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {outputJson && (
            <Card>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="text-xs"
                  >
                    {copied ? "✓" : "📋"} {t.copyButton}
                  </Button>
                </div>
                <pre
                  className="whitespace-pre-wrap break-words text-sm"
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(outputJson) }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
