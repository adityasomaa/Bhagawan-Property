"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/lib/site";
import { useLocale } from "@/lib/i18n/provider";
import type { Lang } from "@/lib/i18n/dict";

const mail = (
  <a href={`mailto:${site.email}`}>{site.email}</a>
);

const HEAD: Record<Lang, { eyebrow: string; title: string; updated: string }> = {
  en: { eyebrow: "Legal", title: "Privacy Policy", updated: "Last updated: 1 July 2026" },
  id: { eyebrow: "Legal", title: "Kebijakan Privasi", updated: "Terakhir diperbarui: 1 Juli 2026" },
  zh: { eyebrow: "法律", title: "隐私政策", updated: "最后更新：2026 年 7 月 1 日" },
  ja: { eyebrow: "法律", title: "プライバシーポリシー", updated: "最終更新：2026年7月1日" },
};

const BODY: Record<Lang, ReactNode> = {
  en: (
    <>
      <p>
        {site.legalName} (&ldquo;Bhagawan Property&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
        respects your privacy. This policy explains what personal information we collect through{" "}
        {site.url}, how we use it, and the choices you have. We keep it in plain language — the same
        way we give property advice.
      </p>
      <h2>1. Information we collect</h2>
      <p>We collect only what you choose to share and the minimum needed to operate the site:</p>
      <ul>
        <li>
          <strong>Enquiry details</strong> — name, email address, phone number, and the content of
          your message when you use our contact, enquiry, or property-submission forms. Our forms
          open a pre-filled message in WhatsApp or your email client; the conversation then continues
          on that platform under its own privacy terms.
        </li>
        <li>
          <strong>Usage data</strong> — standard technical logs (IP address, browser type, pages
          visited) collected by our hosting provider for security and performance.
        </li>
      </ul>
      <p>
        We do not run advertising trackers, we do not sell data, and we do not build marketing
        profiles.
      </p>
      <h2>2. How we use your information</h2>
      <ul>
        <li>To respond to your enquiries and provide property advisory services.</li>
        <li>To match you with suitable properties or buyers when you ask us to.</li>
        <li>To operate, secure, and improve the website.</li>
        <li>To meet legal obligations that apply to real estate transactions in Indonesia.</li>
      </ul>
      <h2>3. Sharing</h2>
      <p>
        We share personal information only when needed to serve you: with sellers or buyers you ask
        us to introduce, with notaries, lawyers, and other professionals engaged in your
        transaction, and with service providers who host our website. We never sell or rent your
        details to third parties.
      </p>
      <h2>4. Communication platforms</h2>
      <p>
        WhatsApp and email are our primary communication channels. Messages you send there are
        governed by those platforms&apos; own privacy policies in addition to ours.
      </p>
      <h2>5. Retention</h2>
      <p>
        We keep enquiry correspondence for as long as needed to serve you and to meet legal
        record-keeping duties connected to property transactions, then delete it.
      </p>
      <h2>6. Your rights</h2>
      <p>
        You may request a copy of the personal information we hold about you, ask us to correct it,
        or ask us to delete it (subject to legal retention duties). Write to {mail} and we will
        respond within a reasonable time.
      </p>
      <h2>7. Cookies</h2>
      <p>
        The site uses only technically necessary storage (for example, remembering that you&apos;ve
        already seen our loading animation this session). No advertising or cross-site tracking
        cookies are set.
      </p>
      <h2>8. Changes</h2>
      <p>
        We may update this policy as the website or the law evolves. The &ldquo;last updated&rdquo;
        date above always reflects the current version.
      </p>
      <h2>9. Contact</h2>
      <p>
        Questions about privacy? Contact us at {mail} or {site.address}.
      </p>
    </>
  ),
  id: (
    <>
      <p>
        {site.legalName} (&ldquo;Bhagawan Property&rdquo;, &ldquo;kami&rdquo;) menghormati privasi
        Anda. Kebijakan ini menjelaskan informasi pribadi apa yang kami kumpulkan melalui {site.url},
        bagaimana kami memakainya, dan pilihan yang Anda miliki. Kami menuliskannya dengan bahasa
        yang lugas — sama seperti cara kami memberi nasihat properti.
      </p>
      <h2>1. Informasi yang kami kumpulkan</h2>
      <p>Kami hanya mengumpulkan apa yang Anda pilih untuk dibagikan dan seminimal yang diperlukan untuk menjalankan situs:</p>
      <ul>
        <li>
          <strong>Detail pertanyaan</strong> — nama, alamat email, nomor telepon, dan isi pesan Anda
          saat memakai formulir kontak, pertanyaan, atau pengajuan properti. Formulir kami membuka
          pesan yang sudah terisi di WhatsApp atau klien email Anda; percakapan lalu berlanjut di
          platform itu di bawah ketentuan privasinya sendiri.
        </li>
        <li>
          <strong>Data penggunaan</strong> — log teknis standar (alamat IP, jenis browser, halaman
          yang dikunjungi) yang dikumpulkan penyedia hosting kami untuk keamanan dan performa.
        </li>
      </ul>
      <p>
        Kami tidak menjalankan pelacak iklan, tidak menjual data, dan tidak membangun profil
        pemasaran.
      </p>
      <h2>2. Bagaimana kami memakai informasi Anda</h2>
      <ul>
        <li>Untuk menanggapi pertanyaan Anda dan menyediakan layanan advisory properti.</li>
        <li>Untuk mempertemukan Anda dengan properti atau pembeli yang cocok bila Anda meminta.</li>
        <li>Untuk mengoperasikan, mengamankan, dan meningkatkan situs.</li>
        <li>Untuk memenuhi kewajiban hukum yang berlaku pada transaksi properti di Indonesia.</li>
      </ul>
      <h2>3. Pembagian</h2>
      <p>
        Kami membagikan informasi pribadi hanya bila diperlukan untuk melayani Anda: dengan penjual
        atau pembeli yang Anda minta kami perkenalkan, dengan notaris, pengacara, dan profesional
        lain yang terlibat dalam transaksi Anda, serta dengan penyedia layanan yang menghosting situs
        kami. Kami tidak pernah menjual atau menyewakan data Anda kepada pihak ketiga.
      </p>
      <h2>4. Platform komunikasi</h2>
      <p>
        WhatsApp dan email adalah saluran komunikasi utama kami. Pesan yang Anda kirim di sana diatur
        oleh kebijakan privasi platform tersebut selain kebijakan kami.
      </p>
      <h2>5. Penyimpanan</h2>
      <p>
        Kami menyimpan korespondensi pertanyaan selama diperlukan untuk melayani Anda dan memenuhi
        kewajiban pencatatan hukum terkait transaksi properti, lalu menghapusnya.
      </p>
      <h2>6. Hak Anda</h2>
      <p>
        Anda boleh meminta salinan informasi pribadi yang kami simpan tentang Anda, meminta kami
        memperbaikinya, atau meminta kami menghapusnya (tunduk pada kewajiban penyimpanan hukum).
        Kirim surel ke {mail} dan kami akan menanggapi dalam waktu yang wajar.
      </p>
      <h2>7. Cookie</h2>
      <p>
        Situs hanya memakai penyimpanan yang secara teknis diperlukan (misalnya, mengingat bahwa Anda
        sudah melihat animasi loading kami di sesi ini). Tidak ada cookie iklan atau pelacakan lintas
        situs yang dipasang.
      </p>
      <h2>8. Perubahan</h2>
      <p>
        Kami dapat memperbarui kebijakan ini seiring situs atau hukum berkembang. Tanggal
        &ldquo;terakhir diperbarui&rdquo; di atas selalu mencerminkan versi terkini.
      </p>
      <h2>9. Kontak</h2>
      <p>
        Ada pertanyaan soal privasi? Hubungi kami di {mail} atau {site.address}.
      </p>
    </>
  ),
  zh: (
    <>
      <p>
        {site.legalName}（『Bhagawan Property』『我们』）尊重您的隐私。本政策说明我们通过 {site.url}{" "}
        收集哪些个人信息、如何使用，以及您拥有的选择。我们以通俗的语言书写——正如我们提供房产建议的方式。
      </p>
      <h2>1. 我们收集的信息</h2>
      <p>我们只收集您选择分享的内容，以及运营网站所需的最低限度：</p>
      <ul>
        <li>
          <strong>咨询详情</strong>——当您使用我们的联系、咨询或房源提交表单时的姓名、电子邮箱、电话号码及留言内容。我们的表单会在
          WhatsApp 或您的邮件客户端打开一条预填消息；随后对话在该平台上依其自身隐私条款继续进行。
        </li>
        <li>
          <strong>使用数据</strong>——由我们的托管服务商为安全与性能而收集的标准技术日志（IP 地址、浏览器类型、访问页面）。
        </li>
      </ul>
      <p>我们不运行广告追踪器，不出售数据，也不建立营销画像。</p>
      <h2>2. 我们如何使用您的信息</h2>
      <ul>
        <li>回应您的咨询并提供房产顾问服务。</li>
        <li>在您要求时，为您匹配合适的房产或买家。</li>
        <li>运营、保护并改进网站。</li>
        <li>履行适用于印尼房地产交易的法律义务。</li>
      </ul>
      <h2>3. 共享</h2>
      <p>
        我们仅在为您服务所必需时共享个人信息：与您请我们引荐的卖家或买家、与参与您交易的公证人、律师及其他专业人士，以及托管我们网站的服务商。我们绝不向第三方出售或出租您的资料。
      </p>
      <h2>4. 沟通平台</h2>
      <p>
        WhatsApp 与电子邮件是我们的主要沟通渠道。您在那里发送的消息，除受本政策约束外，还受这些平台各自的隐私政策约束。
      </p>
      <h2>5. 留存</h2>
      <p>
        我们会在为您服务所需、以及履行与房产交易相关的法律记录保存义务所需的期间内保留咨询往来，随后予以删除。
      </p>
      <h2>6. 您的权利</h2>
      <p>
        您可以索取我们所持有的关于您的个人信息副本、要求我们更正，或要求我们删除（受法律留存义务约束）。请写信至{" "}
        {mail}，我们将在合理时间内回复。
      </p>
      <h2>7. Cookie</h2>
      <p>
        本站仅使用技术上必要的存储（例如，记住您在本次会话中已看过我们的加载动画）。不设置任何广告或跨站追踪 Cookie。
      </p>
      <h2>8. 变更</h2>
      <p>
        随着网站或法律的演变，我们可能更新本政策。上方的『最后更新』日期始终反映当前版本。
      </p>
      <h2>9. 联系</h2>
      <p>
        对隐私有疑问？请通过 {mail} 或 {site.address} 联系我们。
      </p>
    </>
  ),
  ja: (
    <>
      <p>
        {site.legalName}（『Bhagawan Property』『当社』）はお客様のプライバシーを尊重します。本ポリシーは、当社が
        {site.url} を通じて収集する個人情報、その利用方法、そしてお客様が持つ選択肢を説明するものです。
        不動産の助言と同じく、平易な言葉で記します。
      </p>
      <h2>1. 収集する情報</h2>
      <p>当社は、お客様が共有を選んだ情報と、サイト運営に必要な最小限のみを収集します。</p>
      <ul>
        <li>
          <strong>お問い合わせ内容</strong>——当社の問い合わせ・照会・物件提出フォームをご利用の際の氏名、メールアドレス、電話番号、メッセージ本文。
          フォームは WhatsApp またはメールクライアントに入力済みのメッセージを開き、以降の会話は各プラットフォーム自身のプライバシー条件のもとで続きます。
        </li>
        <li>
          <strong>利用データ</strong>——セキュリティと性能のためにホスティング事業者が収集する標準的な技術ログ（IP アドレス、ブラウザの種類、閲覧ページ）。
        </li>
      </ul>
      <p>当社は広告トラッカーを稼働させず、データを販売せず、マーケティング・プロファイルも作成しません。</p>
      <h2>2. 情報の利用方法</h2>
      <ul>
        <li>お問い合わせへの対応と、不動産アドバイザリー・サービスの提供のため。</li>
        <li>ご依頼に応じて、適した物件や買主とお引き合わせするため。</li>
        <li>ウェブサイトの運営・保護・改善のため。</li>
        <li>インドネシアの不動産取引に適用される法的義務を果たすため。</li>
      </ul>
      <h2>3. 共有</h2>
      <p>
        当社は、お客様へのサービスに必要な場合にのみ個人情報を共有します——お引き合わせをご依頼の売主・買主、取引に関与する公証人・弁護士その他の専門家、当社サイトをホスティングするサービス提供者。第三者へお客様の情報を販売・貸与することは決してありません。
      </p>
      <h2>4. コミュニケーション手段</h2>
      <p>
        WhatsApp とメールが当社の主なコミュニケーション手段です。そこで送信されるメッセージは、当社のポリシーに加え、各プラットフォーム自身のプライバシーポリシーにも従います。
      </p>
      <h2>5. 保存</h2>
      <p>
        お問い合わせのやり取りは、お客様へのサービスと、不動産取引に関わる法的な記録保存義務のために必要な期間保持し、その後削除します。
      </p>
      <h2>6. お客様の権利</h2>
      <p>
        当社が保有するお客様の個人情報の写しの請求、訂正の依頼、または削除の依頼（法的な保存義務に従います）が可能です。{mail} 宛にご連絡いただければ、合理的な期間内に回答します。
      </p>
      <h2>7. Cookie</h2>
      <p>
        本サイトは技術的に必要なストレージのみを使用します（例：このセッションで当社のローディング演出をすでにご覧になったことの記憶）。広告やクロスサイトのトラッキング Cookie は一切設定しません。
      </p>
      <h2>8. 変更</h2>
      <p>
        サイトや法律の変化に応じて、本ポリシーを更新することがあります。上記の『最終更新』日は常に現行版を反映します。
      </p>
      <h2>9. お問い合わせ</h2>
      <p>
        プライバシーに関するご質問は、{mail} または {site.address} までご連絡ください。
      </p>
    </>
  ),
};

export default function PrivacyBody() {
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
