// Translations of Knowledge Base articles. English lives in
// data/articles.ts and is the fallback. Titles + excerpts are filled first
// (they appear on cards and previews); full section bodies + FAQ follow.
import type { Lang } from "@/lib/i18n/dict";

export interface ArticleTr {
  title?: string;
  excerpt?: string;
}

export const articleTr: Record<string, Partial<Record<Lang, ArticleTr>>> = {
  "freehold-vs-leasehold-bali": {
    id: {
      title: "Hak Milik vs Sewa di Bali: Mana yang Tepat untuk Anda?",
      excerpt:
        "Keputusan terpenting dalam setiap pembelian di Bali. Kami uraikan kedua struktur secara jujur — biaya, risiko, dan siapa yang paling cocok untuk masing-masing.",
    },
    zh: {
      title: "巴厘岛永久产权 vs 租赁产权：哪种适合您？",
      excerpt: "任何巴厘岛置业中最重要的决定。我们如实拆解两种结构——成本、风险，以及各自真正适合谁。",
    },
    ja: {
      title: "バリのフリーホールド vs リースホールド：あなたに合うのはどっち？",
      excerpt:
        "バリでの購入で最も重要な決断。両方の仕組みを正直に——費用、リスク、そしてそれぞれが本当に合う人を——解き明かします。",
    },
  },
  "can-foreigners-buy-property-in-bali": {
    id: {
      title: "Bisakah Orang Asing Membeli Properti di Bali? Jawaban Lengkap 2026",
      excerpt:
        "Bisa — secara legal dan aman, jika Anda memakai struktur yang tepat. Inilah cara kepemilikan asing bekerja di Indonesia, tanpa mitos.",
    },
    zh: {
      title: "外国人能在巴厘岛买房吗？2026 完整解答",
      excerpt: "能——只要用对结构，就合法且安全。这就是外国人在印尼持有房产的真实方式，不含误传。",
    },
    ja: {
      title: "外国人はバリで不動産を買える？2026年 完全ガイド",
      excerpt:
        "買えます——正しいスキームを使えば、合法かつ安全に。神話を排し、インドネシアでの外国人所有の仕組みをそのままご説明します。",
    },
  },
  "bali-property-investment-guide-2026": {
    id: {
      title: "Panduan Investasi Properti Bali 2026",
      excerpt:
        "Yield, koridor pertumbuhan, dan strategi yang benar-benar berhasil — panduan jernih untuk berinvestasi di pulau paling dicintai dunia.",
    },
    zh: {
      title: "2026 巴厘岛房产投资指南",
      excerpt: "收益率、成长走廊，以及真正奏效的策略——一份清醒的指南，助您投资这座全球最受爱戴的岛屿。",
    },
    ja: {
      title: "バリ不動産 投資ガイド 2026",
      excerpt:
        "利回り、成長コリドー、そして実際に効く戦略——世界で最も愛される島への投資を、冷静に見据えるガイド。",
    },
  },
  "bali-property-taxes-explained": {
    id: {
      title: "Pajak Properti Bali Dijelaskan: Apa yang Dibayar Pembeli, Pemilik, dan Penjual",
      excerpt:
        "BPHTB, PPh, PBB tahunan, dan pajak penghasilan sewa — peta lengkap perpajakan properti Indonesia, dalam bahasa yang sederhana.",
    },
    zh: {
      title: "巴厘岛房产税详解：买家、业主与卖家各付什么",
      excerpt: "BPHTB、PPh、年度 PBB 与租金所得税——用通俗语言，绘出印尼房产税收的完整地图。",
    },
    ja: {
      title: "バリの不動産税を解説：買主・所有者・売主が払うもの",
      excerpt:
        "BPHTB、PPh、年次 PBB、賃貸所得税——インドネシアの不動産税を、わかりやすい言葉で一枚の地図に。",
    },
  },
  "bali-visa-guide-for-property-buyers": {
    id: {
      title: "Visa untuk Pembeli Properti Bali: KITAS, Second Home, dan Tinggal Lama",
      excerpt:
        "Anda tak butuh visa untuk membeli — tetapi visa yang tepat mengubah cara Anda menikmati apa yang Anda beli. Opsi 2026, dibandingkan.",
    },
    zh: {
      title: "巴厘岛购房者签证指南：KITAS、第二家园与长期居留",
      excerpt: "买房不需要签证——但对的签证会改变您享受所购之物的方式。2026 各选项，逐一对比。",
    },
    ja: {
      title: "バリ購入者のためのビザガイド：KITAS・セカンドホーム・長期滞在",
      excerpt:
        "購入にビザは不要——ですが、正しいビザは「買ったもの」との暮らし方を一変させます。2026年の選択肢を比較します。",
    },
  },
  "area-guide-uluwatu-investment": {
    id: {
      title: "Kupas Area: Kenapa Uluwatu Kisah Pertumbuhan Terkuat di Bali",
      excerpt:
        "Kelangkaan clifftop, infrastruktur yang menyusul, dan pasar mewah yang masih matang — anatomi investasi Semenanjung Bukit.",
    },
    zh: {
      title: "区域深读：为何 Uluwatu 是巴厘岛最强的成长故事",
      excerpt: "崖顶的稀缺、追赶中的基建，以及仍在成熟的高端市场——Bukit 半岛的投资解剖。",
    },
    ja: {
      title: "エリア深掘り：なぜ Uluwatu はバリ最強の成長ストーリーなのか",
      excerpt:
        "崖上の希少性、追いつくインフラ、そしてなお成熟途上の高級市場——Bukit 半島の投資アナトミー。",
    },
  },
  "bali-market-update-mid-2026": {
    id: {
      title: "Update Pasar Bali: Pertengahan 2026",
      excerpt:
        "Rekor kedatangan, pasar villa yang matang, penegakan zonasi yang mengetat, dan ke mana harga benar-benar bergerak di paruh pertama 2026.",
    },
    zh: {
      title: "巴厘岛市场速递：2026 年中",
      excerpt: "创纪录的到访、日趋成熟的别墅市场、收紧的分区执法，以及 2026 上半年价格真正的走向。",
    },
    ja: {
      title: "バリ市況アップデート：2026年半ば",
      excerpt:
        "過去最高の来訪、成熟するヴィラ市場、強化される区画規制、そして2026年前半に価格が実際に動いた先。",
    },
  },
  "due-diligence-checklist-bali": {
    id: {
      title: "Checklist Due Diligence Lengkap untuk Membeli di Bali",
      excerpt:
        "Pemeriksaan persis yang kami jalankan sebelum klien menandatangani apa pun — sertifikat, zonasi, akses, pajak, dan pertanyaan yang sering dilupakan pembeli.",
    },
    zh: {
      title: "巴厘岛购房完整尽职调查清单",
      excerpt: "在客户签署任何文件之前，我们逐项执行的核查——产权、分区、通路、税务，以及多数买家会忘的问题。",
    },
    ja: {
      title: "バリで買う前の 完全デューデリジェンス・チェックリスト",
      excerpt:
        "お客様が何かに署名する前に、私たちが必ず行うチェック——権利証、区画、アクセス、税金、そして多くの買主が忘れる問い。",
    },
  },
};
