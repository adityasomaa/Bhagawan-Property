"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/lib/site";
import { useLocale } from "@/lib/i18n/provider";
import type { Lang } from "@/lib/i18n/dict";

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const HEAD: Record<Lang, { eyebrow: string; title: string; updated: string }> = {
  en: { eyebrow: "Legal", title: "Terms of Use", updated: "Last updated: 1 July 2026" },
  id: { eyebrow: "Legal", title: "Ketentuan Penggunaan", updated: "Terakhir diperbarui: 1 Juli 2026" },
  zh: { eyebrow: "法律", title: "使用条款", updated: "最后更新：2026 年 7 月 1 日" },
  ja: { eyebrow: "法律", title: "利用規約", updated: "最終更新：2026年7月1日" },
};

const BODY: Record<Lang, ReactNode> = {
  en: (
    <>
      <p>
        Welcome to {site.url}, operated by {site.legalName} (&ldquo;Bhagawan Property&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using this website you agree to these terms. If you
        do not agree, please do not use the site.
      </p>
      <h2>1. What this website is</h2>
      <p>
        This website presents property listings, area guides, educational articles, and tools (such
        as our ROI calculator) relating to real estate in Bali, Indonesia. It exists to inform and to
        start conversations — not to complete transactions online.
      </p>
      <h2>2. No offer, no advice</h2>
      <ul>
        <li>
          Listings are invitations to enquire, not offers capable of acceptance. Prices,
          availability, lease terms, and specifications may change or contain errors and are only
          confirmed in a signed agreement.
        </li>
        <li>
          Articles, guides, and calculators are general information, not legal, tax, financial, or
          investment advice. Bali property transactions require independent professional advice
          specific to your situation — we will happily help you engage it.
        </li>
        <li>
          The ROI calculator produces illustrative projections from assumptions you control. Actual
          returns will differ. Past or projected performance is no guarantee of future results.
        </li>
      </ul>
      <h2>3. Accuracy of information</h2>
      <p>
        We curate carefully and verify what we publish, but we cannot warrant that every detail is
        complete, current, or error-free. Property details are supplied in part by sellers and third
        parties. Always verify independently — we insist on this even for our own clients.
      </p>
      <h2>4. Intellectual property</h2>
      <p>
        The website&apos;s content — text, design, branding, and imagery — belongs to Bhagawan
        Property or its licensors. You may view and share it for personal, non-commercial purposes
        with attribution; any other reproduction requires our written permission.
      </p>
      <h2>5. Acceptable use</h2>
      <ul>
        <li>Do not misuse the site: no scraping at scale, no attempts to breach security, no unlawful use.</li>
        <li>Do not submit false, defamatory, or infringing content through our forms.</li>
      </ul>
      <h2>6. Third-party links and services</h2>
      <p>
        The site links to third-party services (for example WhatsApp, email clients, and embedded
        maps). Those services operate under their own terms and privacy policies, which we do not
        control.
      </p>
      <h2>7. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Bhagawan Property is not liable for losses arising
        from reliance on website content or from inability to use the site. Nothing in these terms
        limits liability that cannot lawfully be limited.
      </p>
      <h2>8. Governing law</h2>
      <p>
        These terms are governed by the laws of the Republic of Indonesia. Disputes will be resolved
        in the courts of Denpasar, Bali, unless mandatory law provides otherwise.
      </p>
      <h2>9. Changes</h2>
      <p>
        We may revise these terms from time to time. Continued use of the site after changes take
        effect constitutes acceptance of the revised terms.
      </p>
      <h2>10. Contact</h2>
      <p>Questions about these terms? Write to {mail}.</p>
    </>
  ),
  id: (
    <>
      <p>
        Selamat datang di {site.url}, yang dioperasikan oleh {site.legalName} (&ldquo;Bhagawan
        Property&rdquo;, &ldquo;kami&rdquo;). Dengan memakai situs ini, Anda menyetujui ketentuan ini.
        Bila tidak setuju, mohon jangan memakai situs.
      </p>
      <h2>1. Apa itu situs ini</h2>
      <p>
        Situs ini menyajikan listing properti, panduan area, artikel edukatif, dan alat (seperti
        kalkulator ROI kami) terkait real estate di Bali, Indonesia. Ia ada untuk memberi informasi
        dan memulai percakapan — bukan untuk menuntaskan transaksi secara online.
      </p>
      <h2>2. Bukan penawaran, bukan nasihat</h2>
      <ul>
        <li>
          Listing adalah undangan untuk bertanya, bukan penawaran yang bisa langsung diterima. Harga,
          ketersediaan, masa sewa, dan spesifikasi bisa berubah atau memuat kekeliruan, dan hanya
          dipastikan dalam perjanjian yang ditandatangani.
        </li>
        <li>
          Artikel, panduan, dan kalkulator adalah informasi umum, bukan nasihat hukum, pajak,
          keuangan, atau investasi. Transaksi properti Bali membutuhkan nasihat profesional
          independen yang sesuai situasi Anda — dengan senang hati kami bantu menghubungkannya.
        </li>
        <li>
          Kalkulator ROI menghasilkan proyeksi ilustratif dari asumsi yang Anda kendalikan. Imbal
          hasil sebenarnya akan berbeda. Kinerja masa lalu atau yang diproyeksikan bukan jaminan
          hasil di masa depan.
        </li>
      </ul>
      <h2>3. Akurasi informasi</h2>
      <p>
        Kami mengurasi dengan cermat dan memverifikasi apa yang kami publikasikan, tetapi kami tak
        bisa menjamin setiap detail lengkap, terkini, atau bebas kesalahan. Detail properti sebagian
        dipasok oleh penjual dan pihak ketiga. Selalu verifikasi secara independen — kami
        mengharuskannya bahkan untuk klien kami sendiri.
      </p>
      <h2>4. Kekayaan intelektual</h2>
      <p>
        Konten situs — teks, desain, branding, dan gambar — milik Bhagawan Property atau pemberi
        lisensinya. Anda boleh melihat dan membagikannya untuk keperluan pribadi non-komersial dengan
        atribusi; reproduksi lain membutuhkan izin tertulis kami.
      </p>
      <h2>5. Penggunaan yang wajar</h2>
      <ul>
        <li>Jangan menyalahgunakan situs: tanpa scraping massal, tanpa upaya menembus keamanan, tanpa penggunaan melawan hukum.</li>
        <li>Jangan mengirim konten palsu, memfitnah, atau melanggar hak melalui formulir kami.</li>
      </ul>
      <h2>6. Tautan dan layanan pihak ketiga</h2>
      <p>
        Situs menautkan ke layanan pihak ketiga (misalnya WhatsApp, klien email, dan peta tertanam).
        Layanan tersebut beroperasi di bawah ketentuan dan kebijakan privasinya sendiri, yang tidak
        kami kendalikan.
      </p>
      <h2>7. Pembatasan tanggung jawab</h2>
      <p>
        Sejauh diizinkan hukum, Bhagawan Property tidak bertanggung jawab atas kerugian yang timbul
        dari mengandalkan konten situs atau dari ketidakmampuan memakai situs. Tidak ada dalam
        ketentuan ini yang membatasi tanggung jawab yang secara hukum tidak bisa dibatasi.
      </p>
      <h2>8. Hukum yang berlaku</h2>
      <p>
        Ketentuan ini diatur oleh hukum Republik Indonesia. Sengketa akan diselesaikan di pengadilan
        Denpasar, Bali, kecuali hukum yang bersifat memaksa menentukan lain.
      </p>
      <h2>9. Perubahan</h2>
      <p>
        Kami dapat merevisi ketentuan ini dari waktu ke waktu. Penggunaan situs yang berlanjut setelah
        perubahan berlaku merupakan penerimaan atas ketentuan yang direvisi.
      </p>
      <h2>10. Kontak</h2>
      <p>Ada pertanyaan soal ketentuan ini? Kirim surel ke {mail}.</p>
    </>
  ),
  zh: (
    <>
      <p>
        欢迎来到 {site.url}，由 {site.legalName}（『Bhagawan Property』『我们』）运营。使用本网站即表示您同意这些条款。若不同意，请勿使用本站。
      </p>
      <h2>1. 本网站是什么</h2>
      <p>
        本网站呈现与印尼巴厘岛房地产相关的房源、区域指南、科普文章及工具（如我们的 ROI 计算器）。它旨在提供信息、开启对话——而非在线完成交易。
      </p>
      <h2>2. 非要约、非建议</h2>
      <ul>
        <li>
          房源是邀请咨询，而非可径行承诺的要约。价格、可售状态、租赁条款与规格可能变动或存在错误，仅在已签署的协议中方予确认。
        </li>
        <li>
          文章、指南与计算器为一般信息，而非法律、税务、财务或投资建议。巴厘岛房产交易需要针对您具体情况的独立专业建议——我们乐于协助您对接。
        </li>
        <li>
          ROI 计算器依据您掌控的假设生成示意性预测。实际回报会有所不同。过往或预测的表现并不保证未来结果。
        </li>
      </ul>
      <h2>3. 信息准确性</h2>
      <p>
        我们精心甄选并核实所发布的内容，但无法保证每一处细节都完整、最新或毫无差错。房产细节部分由卖家及第三方提供。请务必独立核实——即便对我们自己的客户，我们也坚持如此。
      </p>
      <h2>4. 知识产权</h2>
      <p>
        本站内容——文字、设计、品牌与图像——归 Bhagawan Property 或其许可方所有。您可在署名的前提下，为个人非商业目的浏览与分享；任何其他复制须经我们书面许可。
      </p>
      <h2>5. 可接受的使用</h2>
      <ul>
        <li>请勿滥用本站：不得大规模抓取、不得试图破坏安全、不得作非法用途。</li>
        <li>请勿通过我们的表单提交虚假、诽谤或侵权的内容。</li>
      </ul>
      <h2>6. 第三方链接与服务</h2>
      <p>
        本站链接至第三方服务（例如 WhatsApp、邮件客户端与嵌入式地图）。这些服务在其各自的条款与隐私政策下运作，非我们所能控制。
      </p>
      <h2>7. 责任限制</h2>
      <p>
        在法律允许的最大范围内，Bhagawan Property 对因依赖网站内容或因无法使用本站而产生的损失不承担责任。本条款中的任何内容，均不限制依法不可限制的责任。
      </p>
      <h2>8. 适用法律</h2>
      <p>
        本条款受印度尼西亚共和国法律管辖。除强制性法律另有规定外，争议将在印尼巴厘岛登巴萨（Denpasar）法院解决。
      </p>
      <h2>9. 变更</h2>
      <p>
        我们可能不时修订本条款。变更生效后继续使用本站，即构成对修订后条款的接受。
      </p>
      <h2>10. 联系</h2>
      <p>对本条款有疑问？请写信至 {mail}。</p>
    </>
  ),
  ja: (
    <>
      <p>
        {site.legalName}（『Bhagawan Property』『当社』）が運営する {site.url} へようこそ。本サイトを利用することで、これらの規約に同意したものとみなされます。同意されない場合は、本サイトをご利用にならないでください。
      </p>
      <h2>1. 本サイトについて</h2>
      <p>
        本サイトは、インドネシア・バリの不動産に関する物件情報、エリアガイド、解説記事、ツール（当社の ROI 計算機など）を提供します。情報提供と対話の開始のために存在し、オンラインで取引を完結させるためのものではありません。
      </p>
      <h2>2. 申込みでも助言でもありません</h2>
      <ul>
        <li>
          掲載物件はお問い合わせへの誘引であり、承諾可能な申込みではありません。価格、販売可否、リース条件、仕様は変更や誤りを含むことがあり、署名済みの契約においてのみ確定します。
        </li>
        <li>
          記事、ガイド、計算機は一般的な情報であり、法務・税務・財務・投資の助言ではありません。バリの不動産取引には、あなたの状況に即した独立した専門家の助言が必要です——喜んで手配をお手伝いします。
        </li>
        <li>
          ROI 計算機は、あなたが管理する前提から例示的な予測を生成します。実際のリターンは異なります。過去または予測上の実績は、将来の結果を保証しません。
        </li>
      </ul>
      <h2>3. 情報の正確性</h2>
      <p>
        当社は慎重に精選し、公開する内容を検証しますが、すべての詳細が完全・最新・誤りなしであることは保証できません。物件の詳細は一部、売主や第三者から提供されます。必ず独立して確認してください——これは当社のお客様に対してさえ、私たちが徹底していることです。
      </p>
      <h2>4. 知的財産</h2>
      <p>
        本サイトのコンテンツ——文章、デザイン、ブランディング、画像——は Bhagawan Property またはそのライセンサーに帰属します。出所を明示のうえ、個人的・非商業的な目的で閲覧・共有できます。それ以外の複製には当社の書面による許可が必要です。
      </p>
      <h2>5. 許容される利用</h2>
      <ul>
        <li>サイトを悪用しないでください：大規模なスクレイピング、セキュリティ侵害の試み、違法な利用は禁止です。</li>
        <li>当社のフォームを通じて、虚偽・名誉毀損・権利侵害となる内容を送信しないでください。</li>
      </ul>
      <h2>6. 第三者のリンクとサービス</h2>
      <p>
        本サイトは第三者サービス（例：WhatsApp、メールクライアント、埋め込み地図）へリンクします。これらのサービスは、当社が管理しない各自の規約とプライバシーポリシーのもとで運営されています。
      </p>
      <h2>7. 責任の制限</h2>
      <p>
        法律で認められる最大限の範囲で、Bhagawan Property は、ウェブサイトのコンテンツへの依拠や、サイトを利用できないことから生じる損害について責任を負いません。本規約のいかなる条項も、法的に制限できない責任を制限するものではありません。
      </p>
      <h2>8. 準拠法</h2>
      <p>
        本規約はインドネシア共和国の法律に準拠します。強行法規が別途定める場合を除き、紛争はインドネシア・バリのデンパサール（Denpasar）裁判所で解決されます。
      </p>
      <h2>9. 変更</h2>
      <p>
        当社は本規約を随時改定することがあります。変更の発効後もサイトの利用を続けることは、改定後の規約への同意を構成します。
      </p>
      <h2>10. お問い合わせ</h2>
      <p>本規約に関するご質問は、{mail} までお寄せください。</p>
    </>
  ),
};

export default function TermsBody() {
  const { lang } = useLocale();
  const head = HEAD[lang] ?? HEAD.en;
  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        <p className="eyebrow">{head.eyebrow}</p>
        <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-ink md:text-5xl">
          {head.title}
        </h1>
        <p className="mt-4 text-sm text-muted">{head.updated}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="prose-editorial mt-12">{BODY[lang] ?? BODY.en}</div>
      </Reveal>
    </div>
  );
}
