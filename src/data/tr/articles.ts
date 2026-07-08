// Translations of Knowledge Base articles. English lives in
// data/articles.ts and is the fallback. Titles + excerpts are filled first
// (they appear on cards and previews); full section bodies + FAQ follow.
import type { Lang } from "@/lib/i18n/dict";
import type { ArticleSection } from "@/data/articles";

export interface ArticleTr {
  title?: string;
  excerpt?: string;
  // Parallel to the English article. Matched by index; any missing section,
  // paragraph, list item, or FAQ entry falls back to the English original.
  sections?: ArticleSection[];
  faq?: { q: string; a: string }[];
}

export const articleTr: Record<string, Partial<Record<Lang, ArticleTr>>> = {
  "freehold-vs-leasehold-bali": {
    id: {
      title: "Hak Milik vs Sewa di Bali: Mana yang Tepat untuk Anda?",
      excerpt:
        "Keputusan terpenting dalam setiap pembelian di Bali. Kami uraikan kedua struktur secara jujur — biaya, risiko, dan siapa yang paling cocok untuk masing-masing.",
      sections: [
        {
          paragraphs: [
            "Setiap obrolan soal beli properti di Bali pada akhirnya sampai di persimpangan yang sama: hak milik atau sewa? Inilah keputusan yang menentukan anggaran, struktur hukum, strategi keluar, sekaligus ketenangan pikiran Anda — dan di sinilah nasihat yang jujur paling berarti.",
            "Di Bhagawan Property kami tidak mendorong klien ke salah satu struktur. Keduanya sah, keduanya bisa sangat baik, dan keduanya bisa keliru untuk pembeli yang salah. Beginilah cara kami menjelaskannya secara terus terang.",
          ],
        },
        {
          heading: "Apa arti hak milik sebenarnya bagi orang asing",
          paragraphs: [
            "Hak Milik adalah kepemilikan tanah selamanya. Hukum Indonesia menyediakan Hak Milik hanya untuk warga negara Indonesia — jadi orang asing tidak bisa memegang sertifikat hak milik atas namanya sendiri. Pembeli asing mengakses hak milik lewat PT PMA (perusahaan penanaman modal asing) yang sepenuhnya patuh, yang bisa memegang tanah dengan sertifikat HGB (Hak Guna Bangunan), biasanya 30 tahun pertama, dapat diperpanjang hingga 80 tahun.",
            "Rute PT PMA punya biaya pendirian dan kepatuhan tahunan, dan ini alat yang tepat bagi investor yang menjalankan properti sebagai bisnis: sewa-menyewa, pengembangan, atau portofolio. Yang bukan peruntukannya: struktur santai untuk satu vila liburan. Siapa pun yang menyuruh Anda 'pakai nominee saja' — warga Indonesia yang memegang sertifikat atas nama Anda — sedang menempatkan Anda pada struktur yang berulang kali menolak dilindungi pengadilan Indonesia. Kami tidak akan pernah merekomendasikannya.",
          ],
        },
        {
          heading: "Apa arti sewa (leasehold) sebenarnya",
          paragraphs: [
            "Hak Sewa adalah sewa jangka panjang yang didaftarkan atas tanah — umumnya 25 sampai 35 tahun di pasar saat ini, sering dengan opsi perpanjangan dalam kontrak. Sederhana, sepenuhnya legal untuk orang asing atas nama pribadi, lebih murah untuk ditransaksikan, dan inilah cara mayoritas vila milik asing di Bali sebenarnya dipegang.",
            "Konsekuensinya nyata: nilai aset menyusut menjelang akhir masa sewa, perpanjangan harus dinegosiasikan (idealnya harga dan mekanismenya dikunci dalam kontrak awal), dan opsi pembiayaan terbatas. Sewa yang terstruktur baik dengan sisa masa panjang, mekanisme perpanjangan yang jelas, dan harga per tahun yang wajar adalah aset yang benar-benar bagus. Sewa pendek yang dibeli dengan harga setara hak milik, tidak.",
          ],
        },
        {
          heading: "Bagaimana kami membantu klien memutuskan",
          list: [
            "Beli terutama untuk imbal hasil sewa selama 10–20 tahun? Leasehold biasanya menang dari sisi cash-on-cash.",
            "Membangun portofolio, mengembangkan, atau menjalankan hospitality? Hak milik lewat PT PMA memberi kontrol dan kelayakan pembiayaan bank.",
            "Beli aset warisan untuk diteruskan? Hak milik — justru sertifikat selamanya itulah intinya.",
            "Properti pertama di Bali dengan anggaran menengah? Sewa jangka panjang di area yang sudah terbukti adalah titik masuk yang masuk akal.",
          ],
        },
        {
          heading: "Kesimpulan yang jujur",
          paragraphs: [
            "Hitung harga sewa per tahun, minta syarat perpanjangan tertulis, pastikan sertifikat cocok dengan tanahnya, dan strukturkan hak milik dengan benar atau tidak sama sekali. Kalau sebuah transaksi hanya bisa jalan dengan jalan pintas hukum, itu bukan transaksi — itu kewajiban dengan kolam renang.",
          ],
        },
      ],
      faq: [
        {
          q: "Bisakah orang asing memiliki properti hak milik di Bali?",
          a: "Tidak atas nama pribadi. Orang asing mengakses kendali setara hak milik lewat perusahaan PT PMA yang memegang sertifikat HGB (30 tahun, dapat diperpanjang hingga 80), atau memegang hak sewa jangka panjang yang terdaftar atas nama pribadi.",
        },
        {
          q: "Berapa lama masa sewa yang umum di Bali?",
          a: "Kebanyakan sewa vila berjalan 25–35 tahun, sering dengan opsi perpanjangan dalam kontrak. Selalu tuliskan harga dan mekanisme perpanjangan ke dalam kontrak sewa awal.",
        },
        {
          q: "Apakah struktur nominee aman?",
          a: "Tidak. Pengadilan Indonesia secara konsisten menolak melindungi penerima manfaat asing dari pengaturan nominee. Bhagawan Property tidak pernah merekomendasikannya.",
        },
      ],
    },
    zh: {
      title: "巴厘岛永久产权 vs 租赁产权：哪种适合您？",
      excerpt: "任何巴厘岛置业中最重要的决定。我们如实拆解两种结构——成本、风险，以及各自真正适合谁。",
      sections: [
        {
          paragraphs: [
            "每一次关于在巴厘岛置业的谈话，最终都会走到同一个岔路口：永久产权还是租赁产权？这个决定关乎您的预算、法律结构、退出策略，以及内心的安宁——也正是在这里，诚实的建议最为重要。",
            "在 Bhagawan Property，我们不会把客户推向任何一种结构。两者都合法，都可能非常出色，也都可能对错误的买家而言是错误的选择。以下是我们真正会当面讲清楚的方式。",
          ],
        },
        {
          heading: "永久产权对外国人到底意味着什么",
          paragraphs: [
            "永久产权（Hak Milik）是对土地本身的永久所有权。印尼法律将 Hak Milik 保留给印尼公民——因此外国人无法以本人名义持有永久产权证。外国买家通过完全合规的 PT PMA（外资公司）获得永久产权，公司可以 HGB（建筑权）名义持有土地，通常首期 30 年，可延展至 80 年。",
            "PT PMA 路径有设立与年度合规成本，是把房产作为生意经营者的正确工具：出租、开发或投资组合。它不适合作为一套度假别墅的随意结构。任何叫您『用代持就好』——由印尼公民替您持证——的人，都是在把您置于印尼法院一再拒绝保护的结构中。我们永远不会推荐。",
          ],
        },
        {
          heading: "租赁产权到底意味着什么",
          paragraphs: [
            "租赁产权（Hak Sewa）是登记在土地上的长期租约——当今市场通常为 25 到 35 年，往往附带合同约定的续租选项。它简单、对以个人名义的外国人完全合法、交易成本更低，也是巴厘岛多数外资别墅实际采用的持有方式。",
            "代价是真实的：资产会在租期末端逐渐摊薄，续租需要协商（最好在原始合同中锁定价格与机制），融资选择有限。一份结构良好、剩余期限长、续租机制清晰、每年价格公道的租约，是一项真正的好资产。而以近似永久产权价格买入的短租约，则不是。",
          ],
        },
        {
          heading: "我们如何帮客户做决定",
          list: [
            "主要为 10–20 年的租金收益而买？租赁产权通常在现金回报率上胜出。",
            "要建立投资组合、做开发或经营酒店住宿？通过 PT PMA 的永久产权带来掌控力与银行可贷性。",
            "买一份传世资产留给后代？永久产权——永久的产权正是意义所在。",
            "在巴厘岛的第一套房、预算中等？在成熟区域买一份长期租约是明智的入门。",
          ],
        },
        {
          heading: "诚实的结论",
          paragraphs: [
            "按年计算租约价格，坚持把续租条款写进白纸黑字，核实产权证与土地一致，永久产权要么结构做对、要么干脆不做。如果一笔交易只有靠法律捷径才成立，那它就不是交易——而是一份带泳池的负债。",
          ],
        },
      ],
      faq: [
        {
          q: "外国人能在巴厘岛拥有永久产权房产吗？",
          a: "不能以个人名义。外国人通过持有 HGB 产权（30 年，可延展至 80 年）的 PT PMA 公司获得等同永久产权的掌控，或以个人名义持有登记的长期租赁产权。",
        },
        {
          q: "巴厘岛典型的租赁产权有多长？",
          a: "多数别墅租约为 25–35 年，通常附带合同续租选项。务必把续租价格与机制写进原始租约。",
        },
        {
          q: "代持结构安全吗？",
          a: "不安全。印尼法院一贯拒绝保护代持安排中的外国受益人。Bhagawan Property 从不推荐。",
        },
      ],
    },
    ja: {
      title: "バリのフリーホールド vs リースホールド：あなたに合うのはどっち？",
      excerpt:
        "バリでの購入で最も重要な決断。両方の仕組みを正直に——費用、リスク、そしてそれぞれが本当に合う人を——解き明かします。",
      sections: [
        {
          paragraphs: [
            "バリでの不動産購入をめぐる会話は、最終的に必ず同じ分かれ道にたどり着きます——フリーホールドか、リースホールドか。これは予算、法的スキーム、出口戦略、そして心の安らぎまでを左右する決断であり、正直な助言が最も重みを持つ場面です。",
            "Bhagawan Property では、どちらのスキームにもお客様を誘導しません。どちらも合法で、どちらも素晴らしい選択になり得ますし、相手を間違えればどちらも誤りになります。私たちが実際にテーブルを挟んでお話しする内容を、そのままご紹介します。",
          ],
        },
        {
          heading: "フリーホールドが外国人にとって本当に意味すること",
          paragraphs: [
            "フリーホールド（Hak Milik）は土地そのものの永久所有です。インドネシア法は Hak Milik をインドネシア国民に限定しているため、外国人が自分の名義で権利証を保有することはできません。外国人購入者は、完全に適法な PT PMA（外資企業）を通じてフリーホールドにアクセスし、その会社が HGB（建築権）で土地を保有します。通常は最初の30年、80年まで延長可能です。",
            "PT PMA ルートには設立費用と年次のコンプライアンス費用が伴い、賃貸・開発・ポートフォリオなど、不動産を事業として運営する投資家に適した手段です。向かないのは、別荘1軒のための気軽なスキームとして使うこと。『名義貸し（ノミニー）を使えばいい』——インドネシア国民があなたの代わりに権利証を持つ——と勧める者は、インドネシアの裁判所が繰り返し保護を拒んできたスキームにあなたをさらしています。私たちは決して推奨しません。",
          ],
        },
        {
          heading: "リースホールドが本当に意味すること",
          paragraphs: [
            "リースホールド（Hak Sewa）は土地に登記された長期賃借権で、現在の市場では一般に25〜35年、多くは契約上の延長オプション付きです。シンプルで、個人名義の外国人にも完全に合法、取引費用も安く、実際バリの外資系ヴィラの大半はこの形で保有されています。",
            "トレードオフは現実です。資産は賃借期間の終盤に向けて価値が目減りし、延長は交渉が必要で（理想は当初契約で価格と仕組みを固定すること）、融資の選択肢は限られます。残存期間が長く、延長の仕組みが明確で、年あたりの価格が公正な、よく組まれたリースは本当に良い資産です。一方、フリーホールド並みの価格で買う短いリースは違います。",
          ],
        },
        {
          heading: "お客様の判断をどう支えるか",
          list: [
            "主に10〜20年の賃料利回りのために買う？ リースホールドがキャッシュ・オン・キャッシュで勝るのが通常です。",
            "ポートフォリオ構築、開発、ホスピタリティ運営？ PT PMA 経由のフリーホールドが支配力と融資適格性をもたらします。",
            "受け継ぐためのレガシー資産？ フリーホールド——永久の権利こそが目的です。",
            "中程度の予算でのバリ最初の物件？ 実績あるエリアの長期リースが賢明な入り口です。",
          ],
        },
        {
          heading: "正直な結論",
          paragraphs: [
            "リースは年あたりで価格を評価し、延長条件は必ず書面で、権利証が土地と一致するか確認し、フリーホールドは正しく組むか、いっそやらないか。法的な抜け道がなければ成立しない取引は、取引ではありません——プール付きの負債です。",
          ],
        },
      ],
      faq: [
        {
          q: "外国人はバリでフリーホールド不動産を所有できますか？",
          a: "個人名義ではできません。外国人は HGB 権利（30年、80年まで延長可）を保有する PT PMA を通じてフリーホールド相当の支配を得るか、個人名義で登記された長期リースホールドを保有します。",
        },
        {
          q: "バリの一般的なリースホールドの期間は？",
          a: "ヴィラのリースはたいてい25〜35年で、契約上の延長オプション付きが多いです。延長の価格と仕組みは必ず当初のリース契約に明記してください。",
        },
        {
          q: "ノミニー（名義貸し）スキームは安全ですか？",
          a: "安全ではありません。インドネシアの裁判所はノミニー契約の外国人受益者の保護を一貫して拒んできました。Bhagawan Property は決して推奨しません。",
        },
      ],
    },
  },
  "can-foreigners-buy-property-in-bali": {
    id: {
      title: "Bisakah Orang Asing Membeli Properti di Bali? Jawaban Lengkap 2026",
      excerpt:
        "Bisa — secara legal dan aman, jika Anda memakai struktur yang tepat. Inilah cara kepemilikan asing bekerja di Indonesia, tanpa mitos.",
      sections: [
        {
          paragraphs: [
            "Ini pertanyaan pertama yang diajukan setiap pembeli internasional, dan internet menjawabnya buruk di kedua arah — entah 'orang asing tidak bisa punya apa-apa' atau 'santai saja, tinggal tanda tangan di sini.' Kebenarannya presisi: orang asing tidak bisa memegang hak milik Indonesia atas nama pribadi, tetapi hukum Indonesia menyediakan beberapa rute yang sepenuhnya legal untuk mengamankan hak properti jangka panjang.",
          ],
        },
        {
          heading: "Rute 1: Sewa (leasehold) atas nama pribadi",
          paragraphs: [
            "Rute paling sederhana dan paling umum. Sewa jangka panjang terdaftar (Hak Sewa) memberi Anda hak eksklusif atas properti selama masa sewa — biasanya 25–35 tahun dengan perpanjangan yang dinegosiasikan. Tidak butuh perusahaan, tidak butuh visa khusus, dan transaksinya cepat. Pekerjaan pentingnya ada di kontrak: mekanisme perpanjangan, klausul warisan, dan verifikasi sertifikat tanah yang tepat.",
          ],
        },
        {
          heading: "Rute 2: PT PMA — perusahaan milik asing",
          paragraphs: [
            "PT PMA adalah perusahaan terbatas Indonesia yang bisa 100% dimiliki asing. Ia bisa memegang tanah dengan Hak Guna Bangunan — sertifikat 30 tahun pertama yang dapat diperpanjang hingga 80 tahun — dan secara legal boleh menjalankan pendapatan sewa, yang secara teknis membutuhkan izin bila lewat sewa pribadi. Ini struktur bagi investor profesional: biaya dan kepatuhan lebih besar, kontrol jauh lebih besar.",
          ],
        },
        {
          heading: "Rute 3: Hak Pakai bagi pemegang izin tinggal",
          paragraphs: [
            "Orang asing yang memegang izin tinggal Indonesia (KITAS/KITAP) boleh memegang sertifikat Hak Pakai atas sebuah hunian atas nama sendiri, dengan syarat nilai minimum properti. Cocok untuk penghuni sungguhan yang membeli rumah untuk ditinggali.",
          ],
        },
        {
          heading: "Yang harus dihindari",
          list: [
            "Pengaturan nominee — warga Indonesia 'memegang' hak milik untuk Anda. Pengadilan tidak melindunginya.",
            "Sewa yang tidak terdaftar atau sewa yang hanya ditandatangani dengan kerabat pemilik tanah.",
            "Transaksi apa pun yang mengurangi ruang untuk uji tuntas hukum secara independen.",
            "Harga yang hanya masuk akal bila zonasinya dipakai secara ilegal.",
          ],
        },
        {
          heading: "Pendekatan kami",
          paragraphs: [
            "Setiap transaksi Bhagawan Property berjalan lewat notaris independen (PPAT) dan uji tuntas hukum: verifikasi sertifikat, cek zonasi, status pajak, dan tinjauan struktur. Membeli di Bali itu aman ketika prosesnya dihormati — dan proses itulah yang kami kelola untuk Anda. #Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "Apakah legal bagi orang asing membeli properti di Bali?",
          a: "Ya. Orang asing secara legal bisa memegang hak sewa jangka panjang terdaftar atas nama pribadi, sertifikat HGB lewat perusahaan PT PMA, atau sertifikat Hak Pakai dengan izin tinggal. Hanya hak milik pribadi (Hak Milik) yang dibatasi untuk warga negara Indonesia.",
        },
        {
          q: "Apakah saya harus tinggal di Indonesia untuk membeli properti di Bali?",
          a: "Tidak. Struktur sewa dan PT PMA tidak mensyaratkan izin tinggal. Sertifikat Hak Pakai membutuhkan izin tinggal KITAS/KITAP.",
        },
      ],
    },
    zh: {
      title: "外国人能在巴厘岛买房吗？2026 完整解答",
      excerpt: "能——只要用对结构，就合法且安全。这就是外国人在印尼持有房产的真实方式，不含误传。",
      sections: [
        {
          paragraphs: [
            "这是每位国际买家问的第一个问题，而网络在两个方向上都答得很糟——要么『外国人什么都不能拥有』，要么『没问题，在这里签字就行』。真相很精确：外国人不能以个人名义持有印尼永久产权，但印尼法律提供了数条完全合法的途径来获取安全的长期产权。",
          ],
        },
        {
          heading: "途径一：以个人名义的租赁产权",
          paragraphs: [
            "最简单、最常见的途径。登记的长期租约（Hak Sewa）在租期内赋予您对房产的专属权利——通常 25–35 年，附协商续租。无需公司、无需特殊签证，交易迅速。关键功夫在合同上：续租机制、继承条款，以及对土地产权证的精确核实。",
          ],
        },
        {
          heading: "途径二：PT PMA——外资公司",
          paragraphs: [
            "PT PMA 是可 100% 外资持有的印尼有限公司。它可以 Hak Guna Bangunan（建筑权）名义持有土地——首期 30 年，可延展至 80 年——并可合法经营租金收入，而个人租赁在技术上需要牌照才能出租。这是专业投资者的结构：成本与合规更高，掌控力却大得多。",
          ],
        },
        {
          heading: "途径三：居留者的 Hak Pakai",
          paragraphs: [
            "持有印尼居留许可（KITAS/KITAP）的外国人，可以本人名义持有住宅的 Hak Pakai（使用权）产权，需满足最低房产价值门槛。适合真正在此定居、买房自住的人。",
          ],
        },
        {
          heading: "应避开的事",
          list: [
            "代持安排——由印尼公民替您『持有』永久产权。法院不予保护。",
            "未登记的租约，或只与土地所有者的亲属签署的租约。",
            "任何劝阻您做独立法律尽职调查的交易。",
            "只有在土地违规使用下才说得通的价格。",
          ],
        },
        {
          heading: "我们的做法",
          paragraphs: [
            "Bhagawan Property 的每一笔交易都要经过独立公证人（PPAT）与法律尽职调查：产权核实、分区核查、税务状态与结构审阅。只要尊重流程，在巴厘岛置业就是安全的——而这套流程，正是我们为您把关的。#Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "外国人在巴厘岛买房合法吗？",
          a: "合法。外国人可合法地以个人名义持有登记的长期租赁产权、通过 PT PMA 公司持有 HGB 产权，或凭居留许可持有 Hak Pakai 产权。只有个人永久产权（Hak Milik）仅限印尼公民。",
        },
        {
          q: "买巴厘岛房产需要住在印尼吗？",
          a: "不需要。租赁产权与 PT PMA 结构都不要求居留身份。Hak Pakai 产权需要 KITAS/KITAP 居留许可。",
        },
      ],
    },
    ja: {
      title: "外国人はバリで不動産を買える？2026年 完全ガイド",
      excerpt:
        "買えます——正しいスキームを使えば、合法かつ安全に。神話を排し、インドネシアでの外国人所有の仕組みをそのままご説明します。",
      sections: [
        {
          paragraphs: [
            "これはすべての海外購入者が最初に尋ねる問いで、ネット上の答えは両極端に間違っています——『外国人は何も所有できない』か、『問題ない、ここに署名すればいい』か。真実は正確です。外国人は個人名義でインドネシアのフリーホールドを保有できませんが、インドネシア法は安全な長期の不動産権を確保する、完全に合法な複数のルートを用意しています。",
          ],
        },
        {
          heading: "ルート1：個人名義のリースホールド",
          paragraphs: [
            "最もシンプルで一般的なルートです。登記された長期リース（Hak Sewa）は、賃借期間中——通常25〜35年、延長は交渉——物件の専有権を与えます。会社も特別なビザも不要で、取引は速い。肝心なのは契約面です。延長の仕組み、相続条項、そして土地権利証の正確な確認。",
          ],
        },
        {
          heading: "ルート2：PT PMA——外資企業",
          paragraphs: [
            "PT PMA は100%外資が可能なインドネシアの有限会社です。Hak Guna Bangunan（建築権）で土地を保有でき——最初の30年、80年まで延長可——賃料収入も合法的に運営できます（個人リースでは技術的に許認可が必要です）。これはプロ投資家のスキームで、費用とコンプライアンスは増えますが、支配力ははるかに大きくなります。",
          ],
        },
        {
          heading: "ルート3：居住者のための Hak Pakai",
          paragraphs: [
            "インドネシアの居住許可（KITAS/KITAP）を持つ外国人は、最低物件価格を条件に、住居について自分名義で Hak Pakai（使用権）の権利証を保有できます。実際に居住し、住むための家を買う人に向いています。",
          ],
        },
        {
          heading: "避けるべきこと",
          list: [
            "ノミニー契約——インドネシア国民があなたのためにフリーホールドを『保有』する。裁判所は保護しません。",
            "未登記のリース、または土地所有者の親族とだけ交わすリース。",
            "独立した法的デューデリジェンスを思いとどまらせるような取引。",
            "違法な区画利用を前提としてはじめて成立する価格。",
          ],
        },
        {
          heading: "私たちのやり方",
          paragraphs: [
            "Bhagawan Property のすべての取引は、独立した公証人（PPAT）と法的デューデリジェンスを通します。権利証の確認、区画チェック、税務ステータス、スキームのレビュー。手順が尊重される限り、バリでの購入は安全です——その手順こそ、私たちがあなたのために管理するものです。#Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "外国人がバリで不動産を買うのは合法ですか？",
          a: "合法です。外国人は、個人名義で登記された長期リースホールド、PT PMA 経由の HGB 権利、または居住許可付きの Hak Pakai 権利を合法的に保有できます。制限されるのは個人のフリーホールド（Hak Milik）だけで、これはインドネシア国民に限られます。",
        },
        {
          q: "バリで不動産を買うにはインドネシアに住む必要がありますか？",
          a: "いいえ。リースホールドと PT PMA のスキームは居住を要しません。Hak Pakai の権利には KITAS/KITAP の居住許可が必要です。",
        },
      ],
    },
  },
  "bali-property-investment-guide-2026": {
    id: {
      title: "Panduan Investasi Properti Bali 2026",
      excerpt:
        "Yield, koridor pertumbuhan, dan strategi yang benar-benar berhasil — panduan jernih untuk berinvestasi di pulau paling dicintai dunia.",
      sections: [
        {
          paragraphs: [
            "Alasan berinvestasi di Bali bertumpu pada satu ketimpangan sederhana: permintaan global untuk tinggal di pulau ini tumbuh setiap tahun, sementara tanah yang benar-benar berlokasi bagus itu terbatas. Kedatangan wisatawan sudah pulih penuh dan menembus rekor baru, ekonomi digital-nomad membuat 'low season' jadi konsep yang memudar, dan akomodasi bergaya vila terus merebut pangsa dari hotel.",
            "Tapi angka rata-rata menyembunyikan segalanya di Bali. Selisih antara vila yang dibeli dengan baik dan yang dibeli dengan buruk adalah selisih antara yield bersih 12% dan penyesalan yang tak likuid. Beginilah cara kami memikirkannya.",
          ],
        },
        {
          heading: "Mesin yield: sewa jangka pendek",
          paragraphs: [
            "Vila yang dikelola baik di area utama umumnya menghasilkan yield kotor 8–14%, dengan performa terkuat memadukan tiga bahan: lokasi yang terbukti (Canggu, Uluwatu, Pererenan, Seminyak), desain yang khas saat difoto, dan manajemen profesional dengan penetapan harga dinamis.",
            "Yield bersih turun cukup jauh setelah manajemen (15–25% dari pendapatan), utilitas, perawatan, dan pajak — modelkan dengan jujur, dan curigai setiap listing yang hanya mengutip angka kotor tanpa memperhitungkan tingkat hunian. Kalkulator ROI kami dirancang untuk menghitung angka ini secara konservatif.",
          ],
        },
        {
          heading: "Mesin pertumbuhan: kelangkaan tanah",
          paragraphs: [
            "Pertumbuhan nilai di Bali mengikuti gravitasi infrastruktur dan gaya hidup. Para pemenang dekade terakhir — Canggu, lalu Pererenan, lalu Bukit — semuanya mengikuti pola yang sama: budaya surf-and-café datang, harga tanah berlipat, lalu berlipat lagi begitu brand hospitality memvalidasi area itu.",
            "Frontier saat ini bergerak ke barat sepanjang pesisir (Seseh, Kedungu, Nyanyi) dan ke selatan menyeberangi tebing-tebing Bukit. Sanur adalah kasus khusus: area matang dengan katalis baru yang nyata berupa Kawasan Ekonomi Khusus dan distrik rumah sakit internasional.",
          ],
        },
        {
          heading: "Empat strategi yang berhasil",
          list: [
            "Yield-first: vila leasehold jangka panjang di kantong sewa yang terbukti, dikelola profesional. Sederhana, likuid, menghasilkan arus kas.",
            "Growth-first: tanah hak milik di koridor frontier yang tervalidasi, dipegang 5–10 tahun.",
            "Build-to-rent: tanah leasehold plus konstruksi — imbal hasil tertinggi dan pekerjaan terbanyak.",
            "Legacy: estate hak milik atau aset tebing lewat PT PMA, dipegang tanpa batas waktu.",
          ],
        },
        {
          heading: "Risiko yang tak pernah ditulis di brosur",
          paragraphs: [
            "Penegakan zonasi mengetat — verifikasi tata guna lahan sebelum, bukan sesudah. Kelebihan pasokan itu nyata di vila mid-market yang generik; aset yang khas terus mengungguli. Amortisasi menjelang akhir sewa wajib ada di model Anda. Dan mata uang: pendapatan sebagian besar terkait USD sementara biaya berjalan dalam rupiah — secara historis menguntungkan pemilik asing, tapi tetap layak masuk satu baris di spreadsheet Anda.",
            "Komitmen kami sederhana: kami lebih rela kehilangan penjualan daripada menempatkan klien pada aset yang salah. Itulah arti buyer-first. #Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "Berapa yield sewa yang realistis di Bali?",
          a: "Vila berlokasi bagus dan dikelola profesional umumnya mencapai yield kotor 8–14%; pemodelan bersih yang konservatif biasanya berada di 6–10% setelah manajemen, biaya operasional, dan pajak.",
        },
        {
          q: "Area Bali mana yang potensinya paling bagus untuk investasi di 2026?",
          a: "Uluwatu dan Pererenan memimpin momentum pertumbuhan nilai; Canggu dan Seminyak menawarkan pasar sewa yang paling dalam dan terbukti; Sanur punya katalis infrastruktur unik lewat Kawasan Ekonomi Khusus-nya; Ubud mendominasi segmen wellness yang tumbuh cepat.",
        },
      ],
    },
    zh: {
      title: "2026 巴厘岛房产投资指南",
      excerpt: "收益率、成长走廊，以及真正奏效的策略——一份清醒的指南，助您投资这座全球最受爱戴的岛屿。",
      sections: [
        {
          paragraphs: [
            "巴厘岛的投资逻辑，建立在一个简单的失衡之上：全球想留在这座岛上的需求逐年增长，而真正地段优越的土地却是有限的。游客到访已完全恢复并创下新高，数字游民经济让『淡季』成为渐渐模糊的概念，别墅式住宿也在持续从酒店手中夺取份额。",
            "但在巴厘岛，平均数掩盖了一切。买得好的别墅与买得差的别墅之间的差距，就是 12% 净收益率与一份缺乏流动性的懊悔之间的差距。以下是我们的思考方式。",
          ],
        },
        {
          heading: "收益引擎：短租",
          paragraphs: [
            "核心区域内运营良好的别墅，通常产生 8–14% 的毛收益率，表现最强者往往集齐三样要素：经过验证的地段（Canggu、Uluwatu、Pererenan、Seminyak）、上镜且辨识度高的设计，以及采用动态定价的专业管理。",
            "扣除管理费（收入的 15–25%）、水电、维护与税费后，净收益率会明显下降——请如实建模，并对任何只报毛收入、忽略入住率的挂牌保持警惕。我们的 ROI 计算器正是为保守地测算这些数字而设计的。",
          ],
        },
        {
          heading: "成长引擎：土地稀缺",
          paragraphs: [
            "巴厘岛的资本增值追随基础设施与生活方式的引力。过去十年的赢家——Canggu，然后 Pererenan，再到 Bukit——都遵循同一模式：冲浪与咖啡文化到来，地价翻倍，随后在酒店品牌验证该区域后再度翻倍。",
            "当前的前沿沿海岸向西延伸（Seseh、Kedungu、Nyanyi），并向南越过 Bukit 的崖顶。Sanur 是特例：一个成熟区域，却因经济特区（SEZ）与国际医院区而拥有真正的新催化剂。",
          ],
        },
        {
          heading: "四种奏效的策略",
          list: [
            "收益优先：在经过验证的租赁热点买长期租赁别墅，交由专业管理。简单、流动、产生现金流。",
            "成长优先：在获得验证的前沿走廊买入永久产权土地，持有 5–10 年。",
            "以租养建：租赁土地加建造——回报最高，工作量也最大。",
            "传世：通过 PT PMA 持有永久产权庄园或崖顶资产，无限期持有。",
          ],
        },
        {
          heading: "宣传册里从不写的风险",
          paragraphs: [
            "分区执法正在收紧——请在买之前、而非之后核实土地用途。同质化的中端别墅确实存在供应过剩；有辨识度的资产则持续跑赢。租期末端的价值摊薄必须纳入您的模型。还有汇率：收入多与美元挂钩，成本却以印尼盾计——历史上这有利于外国业主，但仍值得在电子表格里留一行。",
            "我们的承诺很简单：我们宁愿丢掉一笔成交，也不把客户放进错误的资产。这就是买家优先的含义。#Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "巴厘岛现实的租金收益率是多少？",
          a: "地段优越、专业管理的别墅通常可达 8–14% 毛收益率；保守的净值建模在扣除管理、运营成本与税费后，一般落在 6–10%。",
        },
        {
          q: "2026 年巴厘岛哪些区域投资潜力最好？",
          a: "Uluwatu 与 Pererenan 领跑资本增值势头；Canggu 与 Seminyak 拥有最深厚、最经验证的租赁市场；Sanur 凭经济特区拥有独特的基建催化剂；Ubud 主导快速增长的康养板块。",
        },
      ],
    },
    ja: {
      title: "バリ不動産 投資ガイド 2026",
      excerpt:
        "利回り、成長コリドー、そして実際に効く戦略——世界で最も愛される島への投資を、冷静に見据えるガイド。",
      sections: [
        {
          paragraphs: [
            "バリの投資論拠は、単純な不均衡の上に成り立っています。この島に滞在したいという世界の需要は毎年伸び続ける一方、本当に立地の良い土地は限られています。観光客の到来は完全に回復し新記録を更新、デジタルノマド経済は『閑散期』という概念を薄れさせ、ヴィラ型の宿泊はホテルからシェアを奪い続けています。",
            "しかしバリでは、平均値がすべてを覆い隠します。上手に買ったヴィラと下手に買ったヴィラの差は、ネット利回り12％と、流動性のない後悔との差です。私たちの考え方をご紹介します。",
          ],
        },
        {
          heading: "利回りエンジン：短期賃貸",
          paragraphs: [
            "主要エリアでうまく運営されるヴィラは、通常グロス利回り8〜14％を生みます。最も成績の良い物件は3つの要素を兼ね備えています——実績あるロケーション（Canggu、Uluwatu、Pererenan、Seminyak）、写真映えする独自のデザイン、そしてダイナミックプライシングを行うプロの運営。",
            "ネット利回りは、運営費（売上の15〜25％）、光熱費、メンテナンス、税金を引くと大きく下がります。正直にモデル化し、稼働率を無視したグロスの数字だけを掲げる物件は疑ってください。当社の ROI 計算機は、これらの数字を保守的に見積もるよう作られています。",
          ],
        },
        {
          heading: "成長エンジン：土地の希少性",
          paragraphs: [
            "バリのキャピタルゲインは、インフラとライフスタイルの重力に従います。過去10年の勝者——Canggu、次に Pererenan、そして Bukit——はすべて同じパターンをたどりました。サーフとカフェの文化が到来し、地価が倍になり、ホスピタリティ・ブランドがそのエリアを裏づけると、さらに倍になる。",
            "現在のフロンティアは海岸沿いを西へ（Seseh、Kedungu、Nyanyi）、そして Bukit の崖上を南へと広がります。Sanur は特別なケースで、成熟エリアでありながら、経済特区（SEZ）と国際病院地区という本物の新しい触媒を持っています。",
          ],
        },
        {
          heading: "効く4つの戦略",
          list: [
            "利回り優先：実績ある賃貸ポケットで長期リースのヴィラを、プロ運営で。シンプル、流動的、キャッシュフローを生む。",
            "成長優先：検証済みのフロンティア・コリドーでフリーホールドの土地を、5〜10年保有。",
            "ビルド・トゥ・レント：リースの土地＋建築——最も高いリターンと、最も多い手間。",
            "レガシー：PT PMA 経由でフリーホールドのエステートや崖上資産を、無期限に保有。",
          ],
        },
        {
          heading: "パンフレットには載らないリスク",
          paragraphs: [
            "区画規制の執行は強化中——土地利用は後ではなく前に確認を。ありふれた中価格帯ヴィラでは供給過剰が現実で、個性ある資産は上回り続けます。リース終了に向けた価値の目減りは必ずモデルに入れること。そして為替：収入は主に米ドル連動、費用はルピア——歴史的には外国人所有者に有利でしたが、スプレッドシートに一行割く価値はあります。",
            "私たちの約束はシンプルです。お客様を誤った資産に入れるくらいなら、成約を逃すほうを選びます。それが「買主優先」の意味です。#Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "バリで現実的な賃料利回りはどのくらいですか？",
          a: "立地が良くプロが運営するヴィラは通常グロス8〜14％を達成します。保守的なネットのモデルでは、運営費・維持費・税金を引いて6〜10％に落ち着くのが一般的です。",
        },
        {
          q: "2026年、投資ポテンシャルが最も高いバリのエリアは？",
          a: "Uluwatu と Pererenan がキャピタルゲインの勢いをリード。Canggu と Seminyak は最も厚く実績ある賃貸市場を提供。Sanur は経済特区という独自のインフラ触媒を持ち、Ubud は急成長するウェルネス分野を支配しています。",
        },
      ],
    },
  },
  "bali-property-taxes-explained": {
    id: {
      title: "Pajak Properti Bali Dijelaskan: Apa yang Dibayar Pembeli, Pemilik, dan Penjual",
      excerpt:
        "BPHTB, PPh, PBB tahunan, dan pajak penghasilan sewa — peta lengkap perpajakan properti Indonesia, dalam bahasa yang sederhana.",
      sections: [
        {
          paragraphs: [
            "Pajak properti Indonesia sebenarnya lugas begitu dipetakan dengan jelas — dan memasukkannya ke perhitungan Anda sejak hari pertama adalah bentuk kejujuran dasar. Berikut gambaran lengkap untuk transaksi vila pada umumnya. (Angka berlaku per pertengahan 2026; selalu konfirmasikan tarifnya ke notaris dan penasihat pajak Anda saat transaksi.)",
          ],
        },
        {
          heading: "Saat Anda membeli",
          list: [
            "BPHTB (pajak peralihan bagi pembeli): 5% dari nilai transaksi kena pajak untuk peralihan hak milik/HGB.",
            "Biaya notaris/PPAT: biasanya sekitar 1% dari nilai transaksi.",
            "Uji tuntas hukum: biaya tetap, dan setiap rupiahnya sepadan.",
            "Pembelian leasehold: tidak ada BPHTB — pajak sewa ditanggung berbeda (lihat bagian menjual).",
          ],
        },
        {
          heading: "Selama Anda memiliki",
          list: [
            "PBB (pajak bumi & bangunan tahunan): pungutan tahunan yang moderat, biasanya beberapa juta rupiah untuk sebuah vila.",
            "Pajak penghasilan sewa: PPh final 10% atas penghasilan sewa kotor bagi wajib pajak dalam negeri yang punya NPWP; 20% untuk non-residen. Perusahaan PT PMA dikenai aturan pajak badan.",
            "Bila menjalankan sewa jangka pendek: izin lokal (PBG/SLF, pendaftaran pariwisata) dan biaya kecil terkait.",
          ],
        },
        {
          heading: "Saat Anda menjual",
          list: [
            "PPh (pajak penghasilan penjual): 2,5% dari nilai peralihan kotor pada penjualan hak milik/HGB.",
            "Pengalihan leasehold: pajak final 10% atas nilai sewa berlaku bagi pihak yang menyewakan (strukturnya bervariasi — mintalah nasihat).",
            "Komisi agen: lazimnya dibayar oleh penjual.",
          ],
        },
        {
          heading: "Intinya secara praktis",
          paragraphs: [
            "Anggarkan sekitar 6–7% di atas harga beli untuk akuisisi hak milik (pajak, notaris, hukum), dan modelkan pendapatan sewa setelah dipotong 10–20%. Kalau angka sebuah listing hanya masuk sebelum pajak, berarti tidak masuk. Kami memberi setiap klien rincian lengkap biaya transaksi sebelum penawaran apa pun diajukan.",
          ],
        },
      ],
      faq: [
        {
          q: "Berapa pajak yang dibayar pembeli atas properti Bali?",
          a: "Pembeli hak milik/HGB membayar BPHTB 5% ditambah biaya notaris sekitar 1%. Pembelian leasehold tidak kena BPHTB, sehingga biaya masuknya lebih rendah.",
        },
        {
          q: "Bagaimana pajak penghasilan sewa di Bali?",
          a: "Penghasilan sewa dikenai pajak final — 10% dari sewa kotor bagi wajib pajak dalam negeri yang punya NPWP, 20% untuk non-residen. Perusahaan PT PMA dikenai aturan pajak badan.",
        },
      ],
    },
    zh: {
      title: "巴厘岛房产税详解：买家、业主与卖家各付什么",
      excerpt: "BPHTB、PPh、年度 PBB 与租金所得税——用通俗语言，绘出印尼房产税收的完整地图。",
      sections: [
        {
          paragraphs: [
            "印尼房产税一旦清晰地梳理出来，其实并不复杂——从第一天起就把它算进您的数字里，是最基本的诚实。以下是一笔典型别墅交易的完整图景。（数据截至 2026 年年中；交易时请务必向您的公证人与税务顾问确认税率。）",
          ],
        },
        {
          heading: "买入时",
          list: [
            "BPHTB（买方过户税）：永久产权/HGB 过户，按应税交易价值的 5%。",
            "公证人/PPAT 费用：通常约为交易价值的 1%。",
            "法律尽职调查：固定收费，每一分都值。",
            "租赁产权购买：无 BPHTB——租赁税以不同方式承担（见『出售时』）。",
          ],
        },
        {
          heading: "持有期间",
          list: [
            "PBB（年度土地与建筑税）：一笔适度的年度费用，别墅通常为数百万印尼盾。",
            "租金所得税：对持有 NPWP 的税务居民，按毛租金 10% 的最终预扣税；非居民 20%。PT PMA 公司则按企业税规则征税。",
            "若经营短租：当地牌照（PBG/SLF、旅游登记）及相关小额费用。",
          ],
        },
        {
          heading: "出售时",
          list: [
            "PPh（卖方所得税）：永久产权/HGB 出售，按毛过户价值的 2.5%。",
            "租赁权转让：按租赁价值 10% 的最终税，由出租方承担（结构各异——请咨询）。",
            "中介佣金：惯例由卖方支付。",
          ],
        },
        {
          heading: "实用要点",
          paragraphs: [
            "永久产权收购请在买价之上预留约 6–7%（税费、公证、法律），并按扣除 10–20% 预扣后的净额来测算租金收入。如果一份挂牌的数字只有税前才成立，那它就不成立。在提出任何报价之前，我们都会为每位客户提供一份完整的交易成本清单。",
          ],
        },
      ],
      faq: [
        {
          q: "买家买巴厘岛房产要付多少税？",
          a: "永久产权/HGB 买家支付 5% BPHTB 过户税，加上约 1% 公证费。租赁产权购买不含 BPHTB，因此入手成本更低。",
        },
        {
          q: "巴厘岛的租金收入如何征税？",
          a: "租金收入适用最终预扣税——持有 NPWP 的印尼税务居民按毛租金 10%，非居民 20%。PT PMA 公司按企业税规则征税。",
        },
      ],
    },
    ja: {
      title: "バリの不動産税を解説：買主・所有者・売主が払うもの",
      excerpt:
        "BPHTB、PPh、年次 PBB、賃貸所得税——インドネシアの不動産税を、わかりやすい言葉で一枚の地図に。",
      sections: [
        {
          paragraphs: [
            "インドネシアの不動産税は、明快に整理すれば実は分かりやすく、初日から数字に織り込むことは基本的な誠実さです。典型的なヴィラ取引の全体像を示します。（数値は2026年半ば時点。税率は取引時に必ず公証人と税務顧問に確認してください。）",
          ],
        },
        {
          heading: "購入するとき",
          list: [
            "BPHTB（買主の移転税）：フリーホールド/HGB の移転で、課税取引価額の5％。",
            "公証人/PPAT 費用：通常、取引価額の約1％。",
            "法的デューデリジェンス：定額で、その1ルピアの価値があります。",
            "リースホールド購入：BPHTB なし——リース税は別の形で負担します（「売却」参照）。",
          ],
        },
        {
          heading: "保有している間",
          list: [
            "PBB（年次の土地・建物税）：控えめな年次課税で、ヴィラなら通常は数百万ルピア。",
            "賃貸所得税：NPWP を持つ居住納税者はグロス賃料の10％の最終源泉税、非居住者は20％。PT PMA 企業は法人課税ルールで課税されます。",
            "短期賃貸を運営する場合：地方の許認可（PBG/SLF、観光登録）と関連する少額費用。",
          ],
        },
        {
          heading: "売却するとき",
          list: [
            "PPh（売主の所得税）：フリーホールド/HGB の売却で、グロス移転価額の2.5％。",
            "リースの譲渡：リース価額の10％の最終税が賃貸人に適用（構成は様々——助言を受けてください）。",
            "仲介手数料：慣例として売主が負担します。",
          ],
        },
        {
          heading: "実務的な要点",
          paragraphs: [
            "フリーホールド取得では購入価格に約6〜7％（税・公証・法務）を上乗せして予算化し、賃料収入は10〜20％の源泉税控除後でモデル化してください。物件の数字が税引き前でしか成立しないなら、それは成立していません。私たちはオファーを出す前に、すべてのお客様へ取引コストの全内訳をお渡しします。",
          ],
        },
      ],
      faq: [
        {
          q: "バリの不動産で買主が払う税金はいくらですか？",
          a: "フリーホールド/HGB の買主は5％の BPHTB 移転税に加え、約1％の公証費用を払います。リースホールド購入は BPHTB がかからず、初期コストが低くなります。",
        },
        {
          q: "バリの賃貸所得はどう課税されますか？",
          a: "賃貸所得は最終源泉税の対象です——NPWP を持つインドネシア居住納税者はグロス賃料の10％、非居住者は20％。PT PMA 企業は法人課税ルールで課税されます。",
        },
      ],
    },
  },
  "bali-visa-guide-for-property-buyers": {
    id: {
      title: "Visa untuk Pembeli Properti Bali: KITAS, Second Home, dan Tinggal Lama",
      excerpt:
        "Anda tak butuh visa untuk membeli — tetapi visa yang tepat mengubah cara Anda menikmati apa yang Anda beli. Opsi 2026, dibandingkan.",
      sections: [
        {
          paragraphs: [
            "Mari luruskan dulu miskonsepsi terbesarnya: Anda tidak butuh visa Indonesia apa pun untuk membeli properti di Bali. Pembelian leasehold dan PT PMA bisa dituntaskan sepenuhnya hanya dengan paspor. Pertanyaan soal visa itu tentang apa yang datang setelahnya — seberapa lama, dan atas dasar apa, Anda bisa benar-benar menikmati pulau ini.",
          ],
        },
        {
          heading: "Visa kunjungan: titik awal",
          paragraphs: [
            "Visa on Arrival (bisa diperpanjang sekali) mencakup tinggal 60 hari, dan visa kunjungan multiple-entry D1/D2 cocok untuk pembeli yang bolak-balik selama proses beli atau membangun. Bagus untuk bertransaksi; bukan cara untuk tinggal di sini.",
          ],
        },
        {
          heading: "KITAS: andalan untuk tinggal",
          paragraphs: [
            "KITAS (izin tinggal terbatas) adalah rute tinggal standar, dan pembeli properti biasanya sampai ke sana lewat salah satu dari tiga jalan: KITAS investor lewat PT PMA sendiri (pasangan alami dengan properti yang dipegang perusahaan), KITAS pensiun untuk yang berusia 60+, atau KITAS remote-worker untuk profesional dengan gaji dari luar negeri. KITAS juga membuka kehidupan praktis: perbankan lokal, NPWP untuk tarif pajak sewa 10% yang menguntungkan, SIM lokal, dan — yang penting — kelayakan untuk sertifikat Hak Pakai atas nama Anda sendiri.",
          ],
        },
        {
          heading: "Visa Second Home: dirancang untuk pemilik properti",
          paragraphs: [
            "Visa Second Home memberi izin tinggal lima hingga sepuluh tahun bagi individu yang menyimpan deposito memenuhi syarat di bank negara Indonesia atau memiliki properti Indonesia yang memenuhi syarat. Visa ini dibuat persis untuk kelompok pemilik vila internasional — masa tinggal panjang, tanpa syarat bekerja, keluarga termasuk.",
          ],
        },
        {
          heading: "Mencocokkan visa dengan strategi",
          list: [
            "Investor murni, sesekali berkunjung: visa kunjungan sudah cukup.",
            "Menjalankan sewa lewat PT PMA: KITAS investor.",
            "Pensiun di vila Sanur Anda: KITAS pensiun atau Second Home.",
            "Bekerja remote dari Canggu: KITAS remote-worker.",
            "Membeli rumah besar untuk ditinggali: visa Second Home + sertifikat Hak Pakai.",
          ],
        },
        {
          paragraphs: [
            "Aturan imigrasi di Indonesia berubah cepat — kami bekerja dengan agen visa berlisensi dan penasihat imigrasi, dan kami akan menghubungkan Anda dengan spesialis yang tepat untuk situasi Anda sebagai bagian dari setiap pembelian. #Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "Apakah saya butuh visa untuk membeli properti di Bali?",
          a: "Tidak. Pembelian properti bisa dituntaskan hanya dengan paspor. Visa penting untuk seberapa lama Anda bisa tinggal dan untuk membuka manfaat seperti tarif pajak residen dan sertifikat Hak Pakai.",
        },
      ],
    },
    zh: {
      title: "巴厘岛购房者签证指南：KITAS、第二家园与长期居留",
      excerpt: "买房不需要签证——但对的签证会改变您享受所购之物的方式。2026 各选项，逐一对比。",
      sections: [
        {
          paragraphs: [
            "先澄清最大的误解：在巴厘岛买房，您不需要任何印尼签证。租赁产权与 PT PMA 购买，凭一本护照即可完成。签证问题关乎的是之后——您能真正享受这座岛多久、以何种身份。",
          ],
        },
        {
          heading: "访问签证：起点",
          paragraphs: [
            "落地签（可延期一次）覆盖 60 天停留，多次入境的 D1/D2 访问签证适合在购买或建造期间反复往返的买家。用于交易很好；却不是在此定居的方式。",
          ],
        },
        {
          heading: "KITAS：居留的主力",
          paragraphs: [
            "KITAS（有限居留许可）是标准的居留途径，购房者通常经三条路之一抵达：通过自有 PT PMA 的投资者 KITAS（与公司持有房产天然配套）、面向 60 岁以上者的退休 KITAS，或面向境外发薪专业人士的远程工作者 KITAS。KITAS 还解锁实际生活：本地银行、用于享受优惠 10% 租金税率的 NPWP 税号、本地驾照，以及——尤为重要——以本人名义申请 Hak Pakai 产权的资格。",
          ],
        },
        {
          heading: "第二家园签证：为业主而设",
          paragraphs: [
            "第二家园签证向在印尼国有银行维持合格存款、或持有合格印尼房产的个人授予五到十年居留。它正是为国际别墅业主群体量身打造——长期居留、无工作要求、家属随行。",
          ],
        },
        {
          heading: "让签证匹配策略",
          list: [
            "纯投资者、偶尔到访：访问签证足矣。",
            "通过 PT PMA 经营租赁：投资者 KITAS。",
            "退休定居 Sanur 别墅：退休 KITAS 或第二家园。",
            "在 Canggu 远程办公：远程工作者 KITAS。",
            "购置自住大宅：第二家园签证 + Hak Pakai 产权。",
          ],
        },
        {
          paragraphs: [
            "印尼的移民规则变化很快——我们与持牌签证代理及移民顾问合作，并会在每一次购买中，为您对接最契合您情况的专家。#Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "在巴厘岛买房需要签证吗？",
          a: "不需要。购房仅凭护照即可完成。签证关乎您能停留多久，以及解锁诸如居民税率与 Hak Pakai 产权等权益。",
        },
      ],
    },
    ja: {
      title: "バリ購入者のためのビザガイド：KITAS・セカンドホーム・長期滞在",
      excerpt:
        "購入にビザは不要——ですが、正しいビザは「買ったもの」との暮らし方を一変させます。2026年の選択肢を比較します。",
      sections: [
        {
          paragraphs: [
            "まず最大の誤解を正しましょう。バリで不動産を買うのに、インドネシアのビザは一切不要です。リースホールドや PT PMA の購入は、パスポートだけで完結できます。ビザの問題は、その後のこと——どれくらいの期間、どんな立場で、実際にこの島を楽しめるか——にあります。",
          ],
        },
        {
          heading: "訪問ビザ：出発点",
          paragraphs: [
            "アライバルビザ（1回延長可）は60日の滞在をカバーし、マルチプルの D1/D2 訪問ビザは、購入や建築の間に何度も往復する買主に向いています。取引には十分ですが、ここで暮らす手段ではありません。",
          ],
        },
        {
          heading: "KITAS：居住の主役",
          paragraphs: [
            "KITAS（限定滞在許可）は標準的な居住ルートで、不動産購入者は通常3つのいずれかで到達します——自社の PT PMA を通じた投資家 KITAS（会社保有の物件と自然に組み合わさる）、60歳以上のためのリタイアメント KITAS、または海外給与のプロ向けのリモートワーカー KITAS。KITAS は実生活も解錠します——現地の銀行口座、有利な10％賃貸税率のための NPWP 税番号、現地の運転免許、そして——重要なことに——自分名義の Hak Pakai 権利の資格。",
          ],
        },
        {
          heading: "セカンドホームビザ：所有者のために設計",
          paragraphs: [
            "セカンドホームビザは、インドネシアの国営銀行に規定の預金を維持するか、規定のインドネシア不動産を保有する個人に、5〜10年の居住を付与します。まさに国際的なヴィラ所有者層のために作られたもので——長い在留、就労要件なし、家族も対象です。",
          ],
        },
        {
          heading: "ビザを戦略に合わせる",
          list: [
            "純粋な投資家で、たまに訪れる：訪問ビザで十分。",
            "PT PMA で賃貸を運営する：投資家 KITAS。",
            "Sanur のヴィラでリタイア：リタイアメント KITAS かセカンドホーム。",
            "Canggu からリモートワーク：リモートワーカー KITAS。",
            "住むための大きな家を買う：セカンドホームビザ + Hak Pakai 権利。",
          ],
        },
        {
          paragraphs: [
            "インドネシアの入管ルールは急速に変わります——私たちは認可を受けたビザ代理人・入管顧問と連携し、すべての購入の一環として、あなたの状況に最適な専門家をおつなぎします。#Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "バリで不動産を買うのにビザは必要ですか？",
          a: "いいえ。不動産購入はパスポートだけで完結できます。ビザは、どれだけ滞在できるか、そして居住者向け税率や Hak Pakai 権利といった恩恵を解錠するために重要になります。",
        },
      ],
    },
  },
  "area-guide-uluwatu-investment": {
    id: {
      title: "Kupas Area: Kenapa Uluwatu Kisah Pertumbuhan Terkuat di Bali",
      excerpt:
        "Kelangkaan clifftop, infrastruktur yang menyusul, dan pasar mewah yang masih matang — anatomi investasi Semenanjung Bukit.",
      sections: [
        {
          paragraphs: [
            "Setiap siklus properti di Bali punya tokoh utamanya. Era 2010-an milik Seminyak, akhir 2010-an milik Canggu. Siklus saat ini milik Uluwatu — dan uniknya, fundamentalnya menunjukkan ini masih tahap awal.",
          ],
        },
        {
          heading: "Matematika kelangkaan",
          paragraphs: [
            "Garis pantai Semenanjung Bukit yang bisa diinvestasikan itu tetap: sepenggal tebing terbatas antara Balangan dan Nusa Dua, sebagian besar sudah diamankan resor dan estate. Tak seperti frontier sawah di pesisir barat daya — yang selalu bisa mengonversi satu petak sawah lagi — pasokan clifftop tidak bisa diproduksi. Ketika permintaan menumpuk melawan pasokan tetap, arah jangka panjangnya tidak misterius.",
          ],
        },
        {
          heading: "Infrastruktur yang menyusul",
          paragraphs: [
            "Bertahun-tahun kendala Bukit adalah akses dan air. Keduanya membaik tegas: jalan arteri diperlebar, jalur selatan baru memangkas waktu transfer bandara, dan infrastruktur utilitas mengikuti investasi hospitality. Setiap perbaikan menaikkan kembali nilai tanah yang dulu didiskon karena ketidaknyamanan.",
          ],
        },
        {
          heading: "Bauran permintaan",
          paragraphs: [
            "Ekonomi tamu di Uluwatu luar biasa terdiversifikasi: wisata surf (segmen paling loyal untuk kembali dalam industri travel), pasar pernikahan dan acara di tebing, wisatawan wellness, dan segmen mewah yang berjangkar pada resor kelas dunia. Permintaan yang terdiversifikasi berarti tingkat hunian yang tangguh.",
            "Data performa vila mencerminkannya — properti ocean-view di Bukit kini mematok sebagian tarif per malam tertinggi di pulau ini sambil tetap diperdagangkan pada harga tanah di bawah setara Canggu.",
          ],
        },
        {
          heading: "Cara membelinya",
          list: [
            "Yield: vila leasehold ocean-view di atas Bingin, Padang Padang, dan Suluban.",
            "Growth: tanah hak milik ke arah Melasti dan Nyang Nyang sebelum gelombang hospitality berikutnya mendarat.",
            "Trophy: hak milik clifftop sejati — beli saat ia muncul, karena itu jarang terjadi.",
          ],
        },
      ],
    },
    zh: {
      title: "区域深读：为何 Uluwatu 是巴厘岛最强的成长故事",
      excerpt: "崖顶的稀缺、追赶中的基建，以及仍在成熟的高端市场——Bukit 半岛的投资解剖。",
      sections: [
        {
          paragraphs: [
            "巴厘岛的每一轮地产周期都有主角。2010 年代属于 Seminyak，2010 年代末属于 Canggu。当前这一轮属于 Uluwatu——而不寻常的是，基本面显示它仍处早期。",
          ],
        },
        {
          heading: "稀缺的数学",
          paragraphs: [
            "Bukit 半岛可投资的海岸线是固定的：Balangan 与 Nusa Dua 之间有限的一段崖岸，大部分已被度假村与庄园锁定。不同于西南海岸的稻田前沿——总能再多改造一块水田——崖顶供应无法被制造。当需求不断累积、对撞固定供应，长期方向并不神秘。",
          ],
        },
        {
          heading: "基建的追赶",
          paragraphs: [
            "多年来 Bukit 的瓶颈是通路与供水。二者都已明显改善：拓宽的主干道、缩短机场接送时间的新南向连接线，以及跟随酒店投资而来的市政设施。每一次改善，都会把此前因不便而被折价的土地重新估值。",
          ],
        },
        {
          heading: "需求结构",
          paragraphs: [
            "Uluwatu 的客源经济格外多元：冲浪旅游（旅行业中最忠诚的回头客群体）、崖顶上的婚礼与活动市场、康养旅客，以及由世界级度假村锚定的高端板块。多元的需求意味着坚韧的入住率。",
            "别墅业绩数据印证了这一点——Bukit 上的海景物业如今拿到全岛最高的部分夜租价，而地价仍低于 Canggu 的同类。",
          ],
        },
        {
          heading: "该如何买",
          list: [
            "收益：Bingin、Padang Padang 与 Suluban 之上的海景租赁别墅。",
            "成长：在下一波酒店浪潮登陆前，买向 Melasti 与 Nyang Nyang 的永久产权土地。",
            "标杆：真正的崖顶永久产权——一出现就买，因为它极少出现。",
          ],
        },
      ],
    },
    ja: {
      title: "エリア深掘り：なぜ Uluwatu はバリ最強の成長ストーリーなのか",
      excerpt:
        "崖上の希少性、追いつくインフラ、そしてなお成熟途上の高級市場——Bukit 半島の投資アナトミー。",
      sections: [
        {
          paragraphs: [
            "バリのどの不動産サイクルにも主役がいます。2010年代は Seminyak、2010年代後半は Canggu。今のサイクルは Uluwatu のもので——珍しいことに、ファンダメンタルズはまだ初期であることを示しています。",
          ],
        },
        {
          heading: "希少性の数学",
          paragraphs: [
            "Bukit 半島の投資可能な海岸線は固定されています。Balangan と Nusa Dua の間の限られた崖線で、その多くはすでにリゾートやエステートに押さえられています。もう一枚の田をいつでも転換できる南西海岸の田園フロンティアとは違い、崖上の供給は作り出せません。需要が固定供給に対して積み上がるとき、長期の方向は謎ではありません。",
          ],
        },
        {
          heading: "追いつくインフラ",
          paragraphs: [
            "長年、Bukit の制約はアクセスと水でした。どちらも明確に改善しました——拡幅された幹線道路、空港送迎の時間を縮める新しい南側の連絡路、そしてホスピタリティ投資に続くインフラ整備。改善のたびに、かつて不便さゆえに割り引かれていた土地が再評価されます。",
          ],
        },
        {
          heading: "需要のミックス",
          paragraphs: [
            "Uluwatu のゲスト経済は際立って多様です——サーフ観光（旅行業で最もリピート率の高い層）、崖上のウェディングとイベント市場、ウェルネス旅行者、そして世界水準のリゾートに支えられた高級層。多様な需要は、堅牢な稼働率を意味します。",
            "ヴィラの実績データもそれを裏づけます——Bukit のオーシャンビュー物件は、いまや島でも最高水準の宿泊単価を取りつつ、Canggu 相当を下回る地価で取引されています。",
          ],
        },
        {
          heading: "どう買うか",
          list: [
            "利回り：Bingin、Padang Padang、Suluban の上手にあるオーシャンビューのリースホールド・ヴィラ。",
            "成長：次のホスピタリティの波が到来する前に、Melasti や Nyang Nyang 方面のフリーホールド土地。",
            "トロフィー：本物の崖上フリーホールド——現れたときに買う。めったに出ないからです。",
          ],
        },
      ],
    },
  },
  "bali-market-update-mid-2026": {
    id: {
      title: "Update Pasar Bali: Pertengahan 2026",
      excerpt:
        "Rekor kedatangan, pasar villa yang matang, penegakan zonasi yang mengetat, dan ke mana harga benar-benar bergerak di paruh pertama 2026.",
      sections: [
        {
          paragraphs: [
            "Pembacaan pertengahan tahun kami atas pasar, ditarik dari aktivitas transaksi di jaringan kami, data pariwisata yang dipublikasikan, dan apa yang kami lihat di lapangan tiap pekan. Versi singkatnya: permintaan tetap kuat secara struktural, kualitas mulai berpisah dari kuantitas, dan regulasi — untungnya — makin serius.",
          ],
        },
        {
          heading: "Permintaan: rekor, lagi",
          paragraphs: [
            "Kedatangan wisatawan asing terus mencetak rekor, dengan Australia, India, dan Eropa sama-sama tumbuh serta durasi tinggal rata-rata terus naik berkat travel remote-work. Menginap bergaya vila terus merebut pangsa dari hotel, terutama di segmen keluarga dan grup yang mendorong permintaan tiga kamar ke atas.",
          ],
        },
        {
          heading: "Harga: kisah koridor berlanjut",
          paragraphs: [
            "Kenaikan terkuat selama dua belas bulan terakhir kembali terjadi di koridor pertumbuhan: garis Pererenan–Seseh–Kedungu dan zona clifftop Bukit. Canggu inti dan Seminyak tetap stabil ketimbang spektakuler — ceritanya adalah kelangkaan dan kedalaman sewa, bukan pertumbuhan yang jadi headline. Narasi KEK Sanur kini terlihat menarik posisi-posisi awal.",
          ],
        },
        {
          heading: "Pasokan dan regulasi",
          paragraphs: [
            "Segmen vila mid-market yang generik itu padat, dan produk rata-rata di gang rata-rata harus bekerja lebih keras untuk terisi. Sementara itu penegakan zonasi dan izin sewa mengetat di seluruh Badung — perkembangan yang kami sambut, karena ini melindungi pemilik yang patuh dan menghukum persis jalan pintas yang kami larang untuk klien.",
          ],
        },
        {
          heading: "Sikap kami untuk H2 2026",
          list: [
            "Tetap disiplin soal harga sewa: nilai per sisa tahun, bukan angka headline.",
            "Utamakan desain yang khas dan lokasi yang sungguhan ketimbang stok yang identik di spreadsheet.",
            "Tanah koridor hak milik tetap eksposur pertumbuhan jangka menengah yang paling bersih.",
            "Kepatuhan kini adalah alpha: properti yang berizin dan bersertifikat akan lebih menghasilkan dan lebih laku.",
          ],
        },
      ],
    },
    zh: {
      title: "巴厘岛市场速递：2026 年中",
      excerpt: "创纪录的到访、日趋成熟的别墅市场、收紧的分区执法，以及 2026 上半年价格真正的走向。",
      sections: [
        {
          paragraphs: [
            "这是我们对市场的年中研判，取材自我们网络内的成交活动、公开的旅游数据，以及我们每周在一线所见。简版结论：需求在结构上依然强劲，质量正与数量分道扬镳，而监管——所幸——越来越认真。",
          ],
        },
        {
          heading: "需求：再创纪录",
          paragraphs: [
            "外国到访持续刷新纪录，澳大利亚、印度与欧洲齐增，平均停留时长在远程办公旅行的带动下持续拉长。别墅式住宿继续从酒店手中夺取份额，尤其是在推动三居室以上需求的家庭与团体板块。",
          ],
        },
        {
          heading: "价格：走廊故事仍在续写",
          paragraphs: [
            "过去十二个月最强的升值，再次出现在成长走廊：Pererenan–Seseh–Kedungu 一线与 Bukit 的崖顶片区。核心 Canggu 与 Seminyak 稳健而非惊艳——它们的故事是稀缺与租赁深度，而非抢眼的涨幅。Sanur 的经济特区叙事，如今已明显吸引早期布局。",
          ],
        },
        {
          heading: "供应与监管",
          paragraphs: [
            "同质化的中端别墅板块颇为拥挤，普通地段的普通产品要更费力才能填满入住。与此同时，分区与租赁牌照执法在整个 Badung 收紧——我们对此表示欢迎，因为它保护合规业主，并恰恰惩罚我们劝客户远离的那些捷径。",
          ],
        },
        {
          heading: "我们对 2026 下半年的立场",
          list: [
            "在租约定价上保持纪律：看每一剩余年的价值，而非标题数字。",
            "宁选有辨识度的设计与真实地段，也不选电子表格里千篇一律的存货。",
            "永久产权走廊土地，仍是最干净的中期成长敞口。",
            "合规如今就是超额收益：有牌照、有认证的物业，将更能赚、也更好卖。",
          ],
        },
      ],
    },
    ja: {
      title: "バリ市況アップデート：2026年半ば",
      excerpt:
        "過去最高の来訪、成熟するヴィラ市場、強化される区画規制、そして2026年前半に価格が実際に動いた先。",
      sections: [
        {
          paragraphs: [
            "私たちのネットワークでの取引活動、公表された観光データ、そして毎週現場で見ているものから導いた、年央の市況読みです。短く言えば——需要は構造的に強いまま、質が量から分かれ始め、規制は（ありがたいことに）より本気になっています。",
          ],
        },
        {
          heading: "需要：再び記録",
          paragraphs: [
            "外国人の到来は記録を更新し続け、オーストラリア、インド、欧州がそろって伸び、リモートワーク旅行を背景に平均滞在日数も延び続けています。ヴィラ型の滞在はホテルからシェアを奪い続け、特に3ベッドルーム以上の需要をけん引する家族・グループ層で顕著です。",
          ],
        },
        {
          heading: "価格：コリドーの物語は続く",
          paragraphs: [
            "過去12か月で最も強い値上がりは、再び成長コリドーで起きました——Pererenan–Seseh–Kedungu のラインと、Bukit の崖上ゾーン。コアの Canggu と Seminyak は華々しさより堅調で——その物語は希少性と賃貸の厚みであり、見出しになる成長ではありません。Sanur の SEZ の物語は、いまや早い段階からのポジション取りを目に見えて引き寄せています。",
          ],
        },
        {
          heading: "供給と規制",
          paragraphs: [
            "ありふれた中価格帯ヴィラのセグメントは混み合い、平凡な通りの平凡な物件は稼働のためにより懸命に働いています。一方、区画と賃貸許認可の執行は Badung 全域で強化されました——コンプライアンスを守る所有者を保護し、私たちがお客様に避けるよう助言してきた抜け道をまさに罰する動きで、私たちは歓迎します。",
          ],
        },
        {
          heading: "2026年下半期の私たちのスタンス",
          list: [
            "リース価格には規律を保つ：見出しの数字ではなく、残存年あたりの価値で。",
            "スプレッドシート上で同一の在庫より、個性あるデザインと本物のロケーションを優先。",
            "フリーホールドのコリドー土地は、依然として最もクリーンな中期の成長エクスポージャー。",
            "コンプライアンスはいまやアルファ：許認可と認証を備えた物件が、より稼ぎ、より売れる。",
          ],
        },
      ],
    },
  },
  "due-diligence-checklist-bali": {
    id: {
      title: "Checklist Due Diligence Lengkap untuk Membeli di Bali",
      excerpt:
        "Pemeriksaan persis yang kami jalankan sebelum klien menandatangani apa pun — sertifikat, zonasi, akses, pajak, dan pertanyaan yang sering dilupakan pembeli.",
      sections: [
        {
          paragraphs: [
            "Uji tuntas adalah tempat pembelian di Bali berhasil atau gagal — dan ini bagian dari pekerjaan kami yang paling kami anggap serius. Di bawah ini kerangka checklist yang kami jalankan bersama penasihat hukum independen sebelum klien Bhagawan Property mana pun berkomitmen membeli. Pakai ini bahkan bila Anda tak pernah bekerja dengan kami.",
          ],
        },
        {
          heading: "1. Sertifikat",
          list: [
            "Verifikasi sertifikat (SHM/HGB/akta sewa) di Badan Pertanahan Nasional (BPN) — bukan dari fotokopi.",
            "Pastikan pemilik terdaftar persis orang yang Anda ajak bernegosiasi.",
            "Cek beban: hipotek, sengketa, catatan blokir.",
            "Cocokkan batas sertifikat dengan survei fisik yang baru.",
          ],
        },
        {
          heading: "2. Zonasi dan izin",
          list: [
            "Pastikan zona (ITR) mengizinkan peruntukan yang Anda tuju — hunian, sewa, atau hospitality.",
            "Verifikasi izin bangunan (PBG, dulu IMB) cocok dengan yang benar-benar dibangun.",
            "Cek SLF (sertifikat laik fungsi) untuk bangunan yang sudah selesai.",
            "Untuk sewa: pastikan kelayakan izin pariwisata di zona itu.",
          ],
        },
        {
          heading: "3. Tanahnya sendiri",
          list: [
            "Akses jalan yang sah — terdaftar, bukan kesepakatan informal.",
            "Sumber air dan keandalannya; sambungan PDAM atau izin sumur.",
            "Kapasitas listrik dan status sambungan.",
            "Perilaku banjir di musim hujan; tanya tetangga, bukan cuma penjual.",
            "Pertimbangan pura, sanggah, atau adat di atas atau di sebelah tanah.",
          ],
        },
        {
          heading: "4. Kontrak",
          list: [
            "Untuk sewa: opsi perpanjangan dengan mekanisme harga, klausul warisan, hak sublease/sewa, perlindungan pemutusan dini.",
            "Untuk hak milik lewat PT PMA: kepatuhan perusahaan, persyaratan modal, jadwal HGB.",
            "Alokasi pajak antar pihak dinyatakan eksplisit.",
            "Deposit ditahan di escrow notaris, jangan pernah ditransfer informal.",
          ],
        },
        {
          heading: "5. Penjual dan angka-angkanya",
          list: [
            "Pajak bumi dan bangunan (PBB) sudah lunas terkini.",
            "Untuk vila yang beroperasi: riwayat sewa yang teraudit atau bisa diverifikasi bank, bukan tangkapan layar.",
            "Daftar inventaris, kewajiban staf, dan kontrak manajemen ditinjau.",
            "Penilaian independen bila harganya jauh dari bukti pembanding.",
          ],
        },
        {
          paragraphs: [
            "Tak ada yang eksotis di sini — cuma menyeluruh. Selisih antara pembelian Bali yang aman dan sebuah kisah peringatan jarang soal keberuntungan; itu soal apakah seseorang mengerjakan ini sebelum uang berpindah. Seseorang itu adalah kami. #Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "Uji tuntas apa yang diperlukan saat membeli properti di Bali?",
          a: "Verifikasi sertifikat di BPN, konfirmasi zonasi (ITR), cek izin bangunan (PBG/SLF), survei fisik, akses jalan yang sah, verifikasi air dan listrik, tinjauan kontrak oleh penasihat independen, dan cek status pajak — sebelum deposit apa pun berpindah.",
        },
      ],
    },
    zh: {
      title: "巴厘岛购房完整尽职调查清单",
      excerpt: "在客户签署任何文件之前，我们逐项执行的核查——产权、分区、通路、税务，以及多数买家会忘的问题。",
      sections: [
        {
          paragraphs: [
            "尽职调查决定了巴厘岛置业的成败——这也是我们工作中最当真的一环。以下是我们与独立法律顾问一起、在任何 Bhagawan Property 客户下定决心购买之前所执行的实际清单框架。哪怕您从不与我们合作，也请照此使用。",
          ],
        },
        {
          heading: "1. 产权证",
          list: [
            "在国家土地局（BPN）核实产权证（SHM/HGB/租赁契据）——不要凭复印件。",
            "确认登记业主正是与您谈判的那个人。",
            "查抵押、纠纷、查封备注等权利负担。",
            "将产权证边界与一次新的实地测量比对。",
          ],
        },
        {
          heading: "2. 分区与许可",
          list: [
            "确认分区（ITR）允许您的预期用途——住宅、出租或酒店住宿。",
            "核实建筑许可（PBG，原 IMB）与实际建成的相符。",
            "查已完工建筑的 SLF（适用功能证书）。",
            "若做出租：确认该分区内的旅游牌照资格。",
          ],
        },
        {
          heading: "3. 土地本身",
          list: [
            "合法的道路通行权——须登记，而非非正式的善意默许。",
            "水源及其可靠性；PDAM 接驳或水井许可。",
            "供电容量与接驳状态。",
            "雨季的内涝表现；问邻居，而不仅仅是卖家。",
            "土地之上或旁侧的寺庙、神龛或习惯法（adat）相关事项。",
          ],
        },
        {
          heading: "4. 合同",
          list: [
            "租约方面：带定价机制的续租选项、继承条款、转租/出租权、提前终止的保护。",
            "通过 PT PMA 的永久产权方面：公司合规、资本要求、HGB 时间表。",
            "各方之间的税务分摊须明确写明。",
            "定金存于公证人托管账户，切勿私下转账。",
          ],
        },
        {
          heading: "5. 卖家与数字",
          list: [
            "土地与建筑税（PBB）已缴清至最新。",
            "对运营中的别墅：经审计或可经银行核实的租赁历史，而非截图。",
            "审阅物品清单、员工义务与管理合同。",
            "若价格远离可比证据，进行独立估值。",
          ],
        },
        {
          paragraphs: [
            "这里没有什么高深之处——只是够彻底。安全的巴厘岛置业与一则警世故事之间的差别，很少靠运气；而在于资金转移之前，是否有人做了这份功课。那个人，就是我们。#Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "在巴厘岛买房需要做哪些尽职调查？",
          a: "在 BPN 核实产权证、确认分区（ITR）、核查建筑许可（PBG/SLF）、实地测量、合法道路通行、供水与供电核实、由独立顾问审阅合同，以及税务状态核查——都要在任何定金转移之前完成。",
        },
      ],
    },
    ja: {
      title: "バリで買う前の 完全デューデリジェンス・チェックリスト",
      excerpt:
        "お客様が何かに署名する前に、私たちが必ず行うチェック——権利証、区画、アクセス、税金、そして多くの買主が忘れる問い。",
      sections: [
        {
          paragraphs: [
            "デューデリジェンスは、バリでの購入が成功するか失敗するかの分かれ目であり、私たちが最も真剣に取り組む仕事です。以下は、Bhagawan Property のお客様が購入を決断する前に、独立した法律顧問とともに実行する実際のチェックリストの枠組みです。私たちと取引しない場合でも、ぜひお使いください。",
          ],
        },
        {
          heading: "1. 権利証",
          list: [
            "権利証（SHM/HGB/リース証書）を国家土地庁（BPN）で確認——コピーではなく。",
            "登記上の所有者が、交渉相手とまさに同一人物か確認。",
            "抵当、係争、ブロック記載などの負担を確認。",
            "権利証の境界を、新しい実地測量と照合。",
          ],
        },
        {
          heading: "2. 区画と許可",
          list: [
            "区画（ITR）が意図する用途——住宅、賃貸、ホスピタリティ——を認めているか確認。",
            "建築許可（PBG、旧 IMB）が実際の建物と一致するか確認。",
            "完成済み建物の SLF（機能適合証明）を確認。",
            "賃貸の場合：その区画で観光許認可の適格性を確認。",
          ],
        },
        {
          heading: "3. 土地そのもの",
          list: [
            "合法的な道路アクセス——登記されたもので、非公式の好意ではなく。",
            "水源と信頼性；PDAM 接続または井戸の許可。",
            "電力容量と接続状況。",
            "雨季の浸水挙動；売主だけでなく、近隣に尋ねる。",
            "土地の上や隣接地にある寺院・祠・慣習法（adat）上の配慮事項。",
          ],
        },
        {
          heading: "4. 契約",
          list: [
            "リースの場合：価格メカニズム付きの延長オプション、相続条項、転貸/賃貸の権利、早期解約の保護。",
            "PT PMA 経由のフリーホールドの場合：会社のコンプライアンス、資本要件、HGB のタイムライン。",
            "当事者間の税負担配分を明示。",
            "手付金は公証人のエスクローで保管し、決して非公式に送金しない。",
          ],
        },
        {
          heading: "5. 売主と数字",
          list: [
            "土地・建物税（PBB）が最新まで納付済み。",
            "運営中のヴィラの場合：監査済み、または銀行で検証可能な賃貸履歴——スクショではなく。",
            "什器リスト、スタッフの義務、管理契約をレビュー。",
            "価格が比較可能な証拠から大きく外れる場合は、独立した鑑定を。",
          ],
        },
        {
          paragraphs: [
            "ここに特別なものは何もありません——ただ徹底しているだけです。安全なバリ購入と、戒めの物語との差は、めったに運ではありません。お金が動く前に、誰かがこの仕事をしたかどうかです。その誰かが、私たちです。#Here4U",
          ],
        },
      ],
      faq: [
        {
          q: "バリで不動産を買うとき、どんなデューデリジェンスが必要ですか？",
          a: "BPN での権利証確認、区画（ITR）の確認、建築許可のチェック（PBG/SLF）、実地測量、合法的な道路アクセス、水と電力の確認、独立顧問による契約レビュー、税務ステータスの確認——いずれも手付金が動く前に行います。",
        },
      ],
    },
  },
};
