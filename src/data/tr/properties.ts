// Manual translations of property editorial bodies (excerpt, description,
// highlights, features). English lives in data/properties.ts and is used as
// the fallback, so only id / zh / ja are stored here.
import type { Lang } from "@/lib/i18n/dict";

export interface PropertyTr {
  excerpt: string;
  description: string[];
  highlights: string[];
  features: string[];
}

export const propertyTr: Record<string, Partial<Record<Lang, PropertyTr>>> = {
  "kayu-tulang-canggu": {
    id: {
      excerpt:
        "Villa 3 lantai bergaya di kompleks elite tertutup di Kayu Tulang, beberapa menit dari Batu Bolong.",
      description: [
        "Villa yang stylish dan fungsional di salah satu sudut paling bergengsi di Canggu — berada dalam kompleks elite super-eksklusif di Jalan Kayu Tulang. Cocok untuk hunian pribadi maupun investasi dengan imbal hasil tinggi.",
        "Rampung dibangun pada 2024 di tiga lantai, rumah ini memadukan interior modern yang hangat dengan kolam pribadi dan tata ruang yang praktis: dua kamar tidur, ruang belajar, serta area living, dapur, dan servis yang lega.",
        "Justru kompleksnya yang menghadirkan quiet luxury di sini — jalan akses selebar 6 meter, kabel sepenuhnya di bawah tanah tanpa kabel udara, lingkungan rapi dan tertata, serta keamanan 24 jam.",
      ],
      highlights: [
        "Kompleks elite tertutup — jalan 6m, kabel bawah tanah, keamanan 24 jam",
        "8 menit ke Pantai Batu Bolong; 6 menit ke Desa Kitsune",
        "8 menit ke La Brisa dan Old Man's",
        "Dibangun 2024 · 3 lantai · kolam pribadi",
      ],
      features: [
        "2 Kamar tidur",
        "2 + 1 Kamar mandi",
        "Ruang keluarga",
        "Dapur & ruang makan",
        "Ruang belajar",
        "Area lemari & servis",
        "Kolam pribadi",
        "Area parkir",
      ],
    },
    zh: {
      excerpt: "位于 Kayu Tulang 高端封闭社区的时尚三层别墅，距 Batu Bolong 海滩仅几分钟。",
      description: [
        "一处时尚又实用的别墅，坐落于 Canggu 最具声望的地段之一——Jalan Kayu Tulang 的超高端封闭社区内。既适合自住，也适合作为高回报投资。",
        "2024 年落成，共三层，将温暖的现代室内与私人泳池、实用的布局融为一体：两间卧室、一间书房，以及宽敞的起居、厨房与服务区。",
        "真正的低调奢华来自社区本身——6 米宽的车道、全地下线缆无空中电线、整洁有序的环境，以及 24 小时安保。",
      ],
      highlights: [
        "高端封闭社区——6 米车道、地下线缆、24 小时安保",
        "8 分钟到 Batu Bolong 海滩；6 分钟到 Desa Kitsune",
        "8 分钟到 La Brisa 与 Old Man's",
        "2024 年建成 · 三层 · 私人泳池",
      ],
      features: [
        "2 间卧室",
        "2 + 1 卫浴",
        "客厅",
        "厨房与餐厅",
        "书房",
        "衣帽间与服务区",
        "私人泳池",
        "停车位",
      ],
    },
    ja: {
      excerpt:
        "Kayu Tulang のハイエンドなゲーテッド・コンプレックスに建つスタイリッシュな3階建てヴィラ。Batu Bolong ビーチまで数分。",
      description: [
        "Canggu でもっとも評価の高いエリアのひとつ、Jalan Kayu Tulang の超高級ゲーテッド・コンプレックス内に建つ、スタイリッシュで機能的なヴィラです。ご自宅としても、高利回りの投資としても最適です。",
        "2024年竣工、3フロア構成。温かみのあるモダンな内装に、プライベートプールと実用的な間取り——2ベッドルーム、書斎、そしてゆとりあるリビング・キッチン・サービス空間を備えます。",
        "静かな贅沢を生むのは、コンプレックスそのものです——幅6メートルの private road、電線をすべて地中化した空中配線のない街並み、整然とした環境、そして24時間セキュリティ。",
      ],
      highlights: [
        "高級ゲーテッド・コンプレックス——6m道路・地中配線・24時間警備",
        "Batu Bolong ビーチまで8分、Desa Kitsune まで6分",
        "La Brisa と Old Man's まで8分",
        "2024年築 · 3フロア · プライベートプール",
      ],
      features: [
        "2 ベッドルーム",
        "2 + 1 バスルーム",
        "リビングルーム",
        "キッチン & ダイニング",
        "書斎",
        "ワードローブ & サービス area",
        "プライベートプール",
        "駐車スペース",
      ],
    },
  },

  "pecatu-uluwatu": {
    id: {
      excerpt:
        "Villa kolam tropis 2 kamar, siap huni & fully furnished dalam komunitas terkelola di Pecatu — mulai IDR 3,5 M.",
      description: [
        "Sekumpulan villa tropis dua kamar yang siap huni dan fully furnished dalam komunitas terkelola di Pecatu, Uluwatu — pintu masuk yang benar-benar turnkey ke pasar villa Bukit yang berkembang pesat.",
        "Tiap villa punya kolam pribadi, sementara komunitasnya menambah kolam renang umum, gym, resepsionis, kafetaria, dan manajemen properti in-house — semua kebutuhan pemilik maupun tamu tersedia di lokasi.",
        "Beberapa unit masih tersedia, dengan harga mulai IDR 3,5 M hingga IDR 4,1 M tergantung luas tanah dan bangunan. Pembelian dimulai dengan booking fee IDR 25 juta yang dapat dikembalikan dan kunjungan proyek dalam 14 hari.",
      ],
      highlights: [
        "Semua unit siap huni & fully furnished",
        "Kolam pribadi per villa + kolam komunal, gym & kafe",
        "Manajemen properti in-house di lokasi",
        "9 menit ke pusat Uluwatu; 15 menit ke Pantai Padang Padang",
      ],
      features: [
        "2 Kamar tidur",
        "Fully furnished",
        "Kolam pribadi",
        "Kolam renang komunal",
        "Gym",
        "Resepsionis",
        "Kafetaria",
        "Manajemen properti",
      ],
    },
    zh: {
      excerpt: "Pecatu 托管社区内的两卧热带泳池别墅，现房、全屋家私——3.5 亿印尼盾起。",
      description: [
        "一批现房、全屋家私的两卧热带别墅，坐落于 Uluwatu 的 Pecatu 托管社区内——真正拎包入住，切入高速成长的 Bukit 半岛别墅市场。",
        "每栋别墅均配私人泳池，社区还提供公共泳池、健身房、前台、咖啡厅以及内部物业管理——业主与住客所需的一切都在园区内。",
        "尚余少量单位，视土地与建筑面积，售价 3.5 亿至 4.1 亿印尼盾。购买流程始于 2,500 万印尼盾可退订金，并在 14 天内实地看房。",
      ],
      highlights: [
        "所有单位现房、全屋家私",
        "每栋私人泳池 + 公共泳池、健身房与咖啡厅",
        "园区内部物业管理",
        "9 分钟到 Uluwatu 中心；15 分钟到 Padang Padang 海滩",
      ],
      features: [
        "2 间卧室",
        "全屋家私",
        "私人泳池",
        "公共泳池",
        "健身房",
        "前台",
        "咖啡厅",
        "物业管理",
      ],
    },
    ja: {
      excerpt:
        "Pecatu の管理型コミュニティに建つ、2ベッドルームのトロピカル・プールヴィラ。即入居可・フル家具付き——IDR 3.5B〜。",
      description: [
        "Uluwatu の Pecatu、管理型コミュニティ内に建つ、即入居可・フル家具付きの2ベッドルーム・トロピカルヴィラ群です。成長著しい Bukit 半島のヴィラ市場へ、まさにターンキーで入る一手。",
        "各ヴィラにプライベートプールを備え、コミュニティには共用プール、ジム、レセプション、カフェテリア、そして自社管理まで——オーナーにもゲストにも必要なものが敷地内にそろっています。",
        "残りわずかで、土地・建物面積に応じて IDR 3.5B〜4.1B。購入は返金可能な IDR 2,500万の予約金から始まり、14日以内に現地をご見学いただきます。",
      ],
      highlights: [
        "全ユニット即入居可・フル家具付き",
        "各ヴィラにプライベートプール + 共用プール・ジム・カフェ",
        "敷地内の自社物件管理",
        "Uluwatu 中心まで9分、Padang Padang ビーチまで15分",
      ],
      features: [
        "2 ベッドルーム",
        "フル家具付き",
        "プライベートプール",
        "共用スイミングプール",
        "ジム",
        "レセプション",
        "カフェテリア",
        "物件管理",
      ],
    },
  },

  "villa-ungasan-oceanview": {
    id: {
      excerpt:
        "Villa di desa clifftop Ungasan dengan pemandangan laut dari rooftop di atas Bukit. (Detail bersifat indikatif — akan dikonfirmasi.)",
      description: [
        "Villa berukuran lega di Ungasan, tinggi di Semenanjung Bukit, dengan teras rooftop yang membingkai pemandangan sepanjang garis pantai selatan.",
        "Catatan: harga dan spesifikasi yang ditampilkan di sini masih sementara sementara kami merampungkan listing ini — hubungi kami untuk detail yang sudah dikonfirmasi.",
      ],
      highlights: [
        "Teras rooftop pemandangan laut",
        "Ungasan — hunian Bukit yang tenang dan tinggi",
        "Beberapa menit ke pantai Melasti dan Pandawa",
        "Spesifikasi akan dikonfirmasi",
      ],
      features: ["Teras rooftop", "Kolam pribadi", "Pemandangan laut", "Selesai dibangun", "Parkir"],
    },
    zh: {
      excerpt: "位于 Ungasan 崖顶村落的别墅，屋顶可俯瞰 Bukit 半岛海景。（信息为暂定，待确认。）",
      description: [
        "一栋空间充裕的别墅，坐落于 Bukit 半岛高处的 Ungasan，屋顶露台将南部海岸线尽收眼底。",
        "请注意：此处显示的价格与规格为暂定，我们正在最终确认这处房源——如需确认信息，请联系我们。",
      ],
      highlights: [
        "屋顶海景露台",
        "Ungasan——安静而高处的 Bukit 生活",
        "几分钟到 Melasti 与 Pandawa 海滩",
        "规格待确认",
      ],
      features: ["屋顶露台", "私人泳池", "海景", "已建成", "停车位"],
    },
    ja: {
      excerpt:
        "Bukit の高台、Ungasan の崖上集落に建つヴィラ。屋上からオーシャンビュー。（詳細は暫定・要確認。）",
      description: [
        "Bukit 半島の高台 Ungasan に建つ、ゆとりあるヴィラ。屋上テラスが南海岸の景色を切り取ります。",
        "ご注意：ここに表示の価格・仕様は、本物件を最終確認中のため暫定です——確定情報はお問い合わせください。",
      ],
      highlights: [
        "屋上オーシャンビュー・テラス",
        "Ungasan——静かで高台の Bukit 暮らし",
        "Melasti・Pandawa ビーチまで数分",
        "仕様は要確認",
      ],
      features: ["屋上テラス", "プライベートプール", "オーシャンビュー", "竣工済み", "駐車場"],
    },
  },

  "casa-mirea-2": {
    id: {
      excerpt:
        "Villa kontemporer multi-lantai dengan kolam pribadi dekat Pererenan. (Detail bersifat indikatif — akan dikonfirmasi.)",
      description: [
        "Villa kontemporer yang crisp, tertata di beberapa lantai mengelilingi kolam pribadi, di koridor pertumbuhan Pererenan–Canggu.",
        "Catatan: harga dan spesifikasi yang ditampilkan di sini masih sementara sementara kami merampungkan listing ini — hubungi kami untuk detail yang sudah dikonfirmasi.",
      ],
      highlights: [
        "Desain kontemporer multi-lantai",
        "Kolam pribadi",
        "Koridor pertumbuhan Pererenan",
        "Spesifikasi akan dikonfirmasi",
      ],
      features: ["Kolam pribadi", "Hunian multi-lantai", "Dapur modern", "Parkir", "Selesai dibangun"],
    },
    zh: {
      excerpt: "邻近 Pererenan 的当代多层别墅，配私人泳池。（信息为暂定，待确认。）",
      description: [
        "一栋利落的当代别墅，多层布局环绕私人泳池，坐落于 Pererenan–Canggu 成长走廊。",
        "请注意：此处显示的价格与规格为暂定，我们正在最终确认这处房源——如需确认信息，请联系我们。",
      ],
      highlights: ["当代多层设计", "私人泳池", "Pererenan 成长走廊", "规格待确认"],
      features: ["私人泳池", "多层居住", "现代厨房", "停车位", "已建成"],
    },
    ja: {
      excerpt:
        "Pererenan 近くの、プライベートプール付きコンテンポラリー多層ヴィラ。（詳細は暫定・要確認。）",
      description: [
        "プライベートプールを囲む多層構成の、すっきりとしたコンテンポラリーヴィラ。Pererenan–Canggu の成長コリドーに位置します。",
        "ご注意：ここに表示の価格・仕様は、本物件を最終確認中のため暫定です——確定情報はお問い合わせください。",
      ],
      highlights: ["コンテンポラリーな多層デザイン", "プライベートプール", "Pererenan 成長コリドー", "仕様は要確認"],
      features: ["プライベートプール", "多層リビング", "モダンキッチン", "駐車場", "竣工済み"],
    },
  },

  "villa-iris-n-stone": {
    id: {
      excerpt:
        "Villa modern natural-stone-and-white di area Seminyak. (Detail bersifat indikatif — akan dikonfirmasi.)",
      description: [
        "Villa modern yang memadukan volume putih yang bersih dengan detail batu alam dan tanaman tropis yang rimbun.",
        "Catatan: harga dan spesifikasi yang ditampilkan di sini masih sementara sementara kami merampungkan listing ini — hubungi kami untuk detail yang sudah dikonfirmasi.",
      ],
      highlights: [
        "Desain modern batu alam & putih",
        "Kolam pribadi",
        "Gaya hidup Seminyak yang serba dekat",
        "Spesifikasi akan dikonfirmasi",
      ],
      features: ["Kolam pribadi", "Detail batu alam", "Taman tropis", "Parkir", "Selesai dibangun"],
    },
    zh: {
      excerpt: "Seminyak 一带的天然石材与纯白现代别墅。（信息为暂定，待确认。）",
      description: [
        "一栋现代别墅，以利落的白色体量搭配天然石材细部与茂密的热带植栽。",
        "请注意：此处显示的价格与规格为暂定，我们正在最终确认这处房源——如需确认信息，请联系我们。",
      ],
      highlights: ["天然石材与纯白现代设计", "私人泳池", "步行可达的 Seminyak 生活", "规格待确认"],
      features: ["私人泳池", "石材细部", "热带花园", "停车位", "已建成"],
    },
    ja: {
      excerpt:
        "Seminyak エリアの、天然石×ホワイトのモダンヴィラ。（詳細は暫定・要確認。）",
      description: [
        "すっきりとした白のヴォリュームに、天然石のディテールと豊かなトロピカル植栽を合わせたモダンヴィラ。",
        "ご注意：ここに表示の価格・仕様は、本物件を最終確認中のため暫定です——確定情報はお問い合わせください。",
      ],
      highlights: ["天然石×ホワイトのモダンデザイン", "プライベートプール", "歩ける Seminyak ライフ", "仕様は要確認"],
      features: ["プライベートプール", "石のディテール", "トロピカルガーデン", "駐車場", "竣工済み"],
    },
  },

  "sansa-villa": {
    id: {
      excerpt:
        "Villa Mediterania-tropis baru dengan kolam pribadi di Bukit. (Off-plan — detail indikatif, akan dikonfirmasi.)",
      description: [
        "Villa yang segar dan penuh cahaya, memadukan whitewash Mediterania dengan atap alang-alang tropis dan kolam pribadi — bagian dari koleksi off-plan / new-build kami di Bukit.",
        "Catatan: harga dan spesifikasi yang ditampilkan di sini masih sementara sementara kami merampungkan listing ini — hubungi kami untuk detail yang sudah dikonfirmasi.",
      ],
      highlights: [
        "Bangunan baru · desain Mediterania-tropis",
        "Kolam pribadi",
        "Lokasi Semenanjung Bukit",
        "Spesifikasi akan dikonfirmasi",
      ],
      features: ["Kolam pribadi", "Living open-plan", "Aksen alang-alang", "Furnished", "Parkir"],
    },
    zh: {
      excerpt: "Bukit 半岛新建的地中海—热带风别墅，配私人泳池。（期房——信息暂定，待确认。）",
      description: [
        "一栋清新明亮的别墅，将地中海白墙与热带茅草屋顶及私人泳池融合——属于我们在 Bukit 的期房 / 新建系列。",
        "请注意：此处显示的价格与规格为暂定，我们正在最终确认这处房源——如需确认信息，请联系我们。",
      ],
      highlights: ["新建 · 地中海—热带设计", "私人泳池", "Bukit 半岛地段", "规格待确认"],
      features: ["私人泳池", "开放式起居", "茅草点缀", "带家私", "停车位"],
    },
    ja: {
      excerpt:
        "Bukit に新築された、プライベートプール付きの地中海×トロピカル・ヴィラ。（オフプラン——詳細は暫定・要確認。）",
      description: [
        "地中海の白い漆喰にトロピカルな茅葺きとプライベートプールを合わせた、明るく爽やかなヴィラ——Bukit のオフプラン／新築コレクションの一棟です。",
        "ご注意：ここに表示の価格・仕様は、本物件を最終確認中のため暫定です——確定情報はお問い合わせください。",
      ],
      highlights: ["新築 · 地中海×トロピカルのデザイン", "プライベートプール", "Bukit 半島の立地", "仕様は要確認"],
      features: ["プライベートプール", "オープンプランのリビング", "茅葺きのアクセント", "家具付き", "駐車場"],
    },
  },
};
