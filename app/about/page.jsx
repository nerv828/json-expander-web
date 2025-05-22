"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";

const translations = {
  zh: "我们是一个致力于提供高质量 JSON 工具的团队，帮助开发者更高效地处理嵌套 JSON 数据。",
  en: "We are a team dedicated to providing high-quality JSON tools to help developers process nested JSON data more efficiently.",
  ja: "私たちは、ネストされたJSONデータをより効率的に処理するための高品質なJSONツールを提供することに専念するチームです。"
};

function detectLang() {
  const lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ja")) return "ja";
  return "en";
}

export default function AboutPage() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(detectLang());
  }, []);

  const t = {
    title: {
      zh: "关于我们",
      en: "About Us",
      ja: "私たちについて"
    },
    description: {
      zh: "关于我们的信息和项目背景。",
      en: "Information about our team and project background.",
      ja: "私たちのチームとプロジェクトの背景についての情報です。"
    }
  };

  return (
    <>
      <Head>
        <title>{t.title[lang]}</title>
        <meta name="description" content={t.description[lang]} />
      </Head>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 border-b pb-2">{t.title[lang]}</h1>
        <p className="text-base text-gray-700 leading-relaxed">{translations[lang]}</p>
      </div>
    </>
  );
}