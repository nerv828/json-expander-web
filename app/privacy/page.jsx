"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";

const translationsPrivacy = {
  zh: "我们尊重您的隐私。我们不会收集或存储您粘贴的 JSON 数据。所有操作均在您的浏览器中本地完成。",
  en: "We respect your privacy. We do not collect or store any JSON data you paste. All operations are done locally in your browser.",
  ja: "私たちはあなたのプライバシーを尊重します。貼り付けられたJSONデータは収集または保存されません。すべての操作はブラウザ内でローカルに行われます。"
};

function detectLang() {
  const lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ja")) return "ja";
  return "en";
}

export default function PrivacyPage() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(detectLang());
  }, []);

  const t = {
    title: {
      zh: "隐私政策",
      en: "Privacy Policy",
      ja: "プライバシーポリシー"
    },
    description: {
      zh: "了解我们如何处理您的数据和隐私。",
      en: "Understand how we handle your data and privacy.",
      ja: "あなたのデータとプライバシーの取り扱いについて。"
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
        <p className="text-base text-gray-700 leading-relaxed">{translationsPrivacy[lang]}</p>
      </div>
    </>
  );
}
