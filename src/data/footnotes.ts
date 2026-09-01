export const footnotes = {
  P01: {
    source: '公開報導',
    title: '《看雜誌》第 276 期：從紙本到數位化',
    description:
      '2026 年 5 月報導。約八成健檢預約轉為線上、電話值機由三人減為一人；數字限定於該報導描述的導入現場與期間。',
    href: '/resume#ref-p01',
  },
  E14: {
    source: '本人履歷',
    title: '旗立資訊（旗標出版集團）',
    description: '2007–2010 年擔任責任編輯，編撰國、高中計算機概論教科書。',
    href: '/resume#ref-e14',
  },
  E10: {
    source: '本人履歷',
    title: '網絡行動科技（NETivism）',
    description:
      '2010–2015 年擔任專案經理與全端工程師，參與開源社群、非營利組織網站與 Drupal 專案。',
    href: '/resume#ref-e10',
  },
  P03: {
    source: '公開報導',
    title: '從 AR 繪本到 ESG 專案',
    description:
      '《看雜誌》第 275 期，2026 年 4 月。報導記錄 FANSEE 從教師與家長市場遇挫，轉向文化館舍合作的過程。',
    href: '/resume#ref-p03',
  },
  'O01–O08': {
    source: '公開紀錄',
    title: '開源貢獻與 RikaiDev',
    description:
      'Drupal.org 維護模組、issue credits、React 繁體中文文件，以及 RikaiDev 的公開工具與套件；完整條目列於 Resume。',
    href: '/resume#opensource-records',
  },
} as const

export type FootnoteCode = keyof typeof footnotes
