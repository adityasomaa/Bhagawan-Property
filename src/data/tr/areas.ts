// Manual translations of area-guide editorial. English lives in
// data/areas.ts and is the fallback; only id / zh / ja are stored here.
// Areas are filled in incrementally — a missing area or field falls back
// to English automatically.
import type { Lang } from "@/lib/i18n/dict";

type L = Partial<Record<Lang, string>>;

export interface AreaTr {
  tagline?: L;
  intro?: L[];
  idealFor?: L;
  lifestyle?: { title?: L; description?: L }[];
  thingsToDo?: L[];
  investment?: {
    overview?: L;
    typicalBuyer?: L;
    rentalDemand?: L;
    capitalGrowth?: L;
    opportunities?: L;
  };
  statLabels?: L[]; // by index: [Airport, Typical villa yield, Vibe]
}

const STAT_LABELS: L[] = [
  { id: "Bandara", zh: "机场", ja: "空港" },
  { id: "Perkiraan yield villa", zh: "villa 预期收益率", ja: "ヴィラ想定利回り" },
  { id: "Suasana", zh: "氛围", ja: "雰囲気" },
];

export const areaTr: Record<string, AreaTr> = {
  uluwatu: {
    tagline: {
      id: "Tebing dramatis, ombak kelas dunia, dan pemandangan laut paling memukau di Bali.",
      zh: "壮丽的崖壁、世界级的浪点，以及巴厘岛最令人屏息的海景。",
      ja: "ドラマチックな断崖、世界クラスのサーフ、そしてバリ随一の息をのむオーシャンビュー。",
    },
    intro: [
      {
        id: "Bertengger di ujung selatan Semenanjung Bukit, Uluwatu adalah sisi Bali yang paling sinematik. Tebing kapur menjorok ke air biru toska, ombak kelas dunia bergulir di bawah pura di atas tebing, dan matahari terbenam di sini tak tertandingi di seluruh pulau.",
        zh: "坐落于 Bukit 半岛最南端，Uluwatu 是巴厘岛最具电影感的一隅。石灰岩崖壁直插碧蓝海水，世界闻名的浪点在崖顶神庙下翻涌，这里的落日更是全岛无出其右。",
        ja: "Bukit 半島の南端に位置する Uluwatu は、バリでもっとも映画的な場所です。石灰岩の断崖がターコイズの海へと落ち込み、崖上の寺院の下を世界的なサーフブレイクが転がり、ここの夕日は島のどこにも並ぶものがありません。",
      },
      {
        id: "Dulu sekadar pos surfing yang sepi, Uluwatu kini matang menjadi salah satu alamat paling didambakan di Bali. Resor butik, villa berdesain, dan beach club ternama kini berbagi semenanjung dengan warung dan pantai tersembunyi — perpaduan langka antara alam yang liar dan hidup yang elegan.",
        zh: "曾是安静的冲浪据点，Uluwatu 如今已成长为巴厘岛最令人向往的地址之一。精品度假村、设计感别墅与知名海滩俱乐部，如今与暖食小馆和隐秘海滩共享这片半岛——原始的自然张力与精致生活之间难得的平衡。",
        ja: "かつては静かなサーフの前哨地だった Uluwatu も、いまやバリで最も憧れられる住所のひとつへと成熟しました。ブティックリゾート、デザイン性の高いヴィラ、名高いビーチクラブが、ワルンや隠れたビーチとともに半島を分かち合う——荒々しい自然の迫力と洗練された暮らしの、稀有なバランスです。",
      },
    ],
    idealFor: {
      id: "Pembeli yang mencari pemandangan laut dramatis, budaya surfing, dan kinerja sewa villa yang kuat di koridor mewah dengan apresiasi tercepat di Bali.",
      zh: "追求壮丽海景、冲浪文化，以及在巴厘岛升值最快的高端走廊中获得强劲别墅租赁表现的买家。",
      ja: "ドラマチックなオーシャンビュー、サーフカルチャー、そしてバリで最も値上がりの速い高級コリドーでの力強いヴィラ賃貸パフォーマンスを求める買主に。",
    },
    lifestyle: [
      {
        title: { id: "Pantai", zh: "海滩", ja: "ビーチ" },
        description: {
          id: "Padang Padang, Bingin, Thomas Beach, dan pasir putih Melasti — sebagian air terjernih di Bali.",
          zh: "Padang Padang、Bingin、Thomas Beach，以及 Melasti 的白沙——巴厘岛最清澈的海水之一。",
          ja: "Padang Padang、Bingin、Thomas Beach、そして Melasti の白い砂浜——バリでも指折りの透明度を誇る海。",
        },
      },
      {
        title: { id: "Surfing", zh: "冲浪", ja: "サーフ" },
        description: {
          id: "Uluwatu, Padang Padang, dan Impossibles adalah ombak kelas dunia yang menarik peselancar sepanjang tahun.",
          zh: "Uluwatu、Padang Padang 与 Impossibles 都是世界级浪点，全年吸引冲浪者。",
          ja: "Uluwatu、Padang Padang、Impossibles は世界選手権級の波で、一年を通じてサーファーを惹きつけます。",
        },
      },
      {
        title: { id: "Beach Club", zh: "海滩俱乐部", ja: "ビーチクラブ" },
        description: {
          id: "Savaya, Ulu Cliffhouse, dan Palmilla menetapkan standar sesi sunset di atas tebing.",
          zh: "Savaya、Ulu Cliffhouse 与 Palmilla 树立了崖顶落日时光的标杆。",
          ja: "Savaya、Ulu Cliffhouse、Palmilla が、崖上のサンセット・セッションの基準をつくっています。",
        },
      },
      {
        title: { id: "Kuliner", zh: "餐饮", ja: "ダイニング" },
        description: {
          id: "Dari fine dining di tepi tebing hingga warung legendaris di atas Pantai Bingin.",
          zh: "从崖边的精致餐饮，到 Bingin 海滩之上的传奇暖食小馆。",
          ja: "崖際のファインダイニングから、Bingin ビーチを見下ろす伝説的なワルンまで。",
        },
      },
      {
        title: { id: "Wellness", zh: "康养", ja: "ウェルネス" },
        description: {
          id: "Shala yoga, studio pemulihan, dan sanctuary spa menghadap Samudra Hindia.",
          zh: "瑜伽馆、恢复工作室与水疗静所，皆面向印度洋。",
          ja: "インド洋を望むヨガシャラ、リカバリースタジオ、スパのサンクチュアリ。",
        },
      },
      {
        title: { id: "Budaya", zh: "文化", ja: "文化" },
        description: {
          id: "Pura Luhur Uluwatu dan tari api Kecak setiap malam saat matahari terbenam.",
          zh: "Uluwatu 断崖神庙（Pura Luhur Uluwatu）及每晚落日时分的 Kecak 火舞。",
          ja: "Pura Luhur Uluwatu 寺院と、夕暮れに毎晩行われるケチャの火の舞。",
        },
      },
    ],
    thingsToDo: [
      {
        id: "Saksikan tari api Kecak di Pura Uluwatu saat matahari tenggelam ke laut",
        zh: "在 Uluwatu 神庙观看 Kecak 火舞，看夕阳沉入海中",
        ja: "夕日が海に沈む頃、Uluwatu 寺院でケチャの火の舞を鑑賞",
      },
      {
        id: "Berselancar — atau sekadar menonton para pro — di Padang Padang dan Suluban",
        zh: "在 Padang Padang 与 Suluban 冲浪——或只是观看高手",
        ja: "Padang Padang や Suluban でサーフィン——あるいはプロの技を眺めるだけでも",
      },
      {
        id: "Bersantai seharian di teluk-teluk jernih Pantai Melasti",
        zh: "在 Melasti 海滩清澈的海湾里悠闲度过一整天",
        ja: "Melasti ビーチの透き通った入り江で、のんびり一日を",
      },
      {
        id: "Koktail sunset di beach club di atas tebing",
        zh: "在崖顶海滩俱乐部享用落日鸡尾酒",
        ja: "崖上のビーチクラブでサンセット・カクテルを",
      },
      {
        id: "Menjelajah gua dan teluk tersembunyi di bawah tebing Bingin",
        zh: "探索 Bingin 崖壁下隐秘的洞穴与海湾",
        ja: "Bingin の崖下に隠れた洞窟や入り江を探検",
      },
    ],
    investment: {
      overview: {
        id: "Uluwatu adalah kisah pertumbuhan terkuat di properti Bali. Harga tanah di Bukit naik tajam dalam lima tahun terakhir seiring infrastruktur, kuliner, dan perhotelan menyusul keindahan alam semenanjung — namun harga per are-nya masih di bawah Canggu dan Seminyak.",
        zh: "Uluwatu 是巴厘岛房地产中最强劲的成长故事。过去五年，随着基建、餐饮与酒店业追赶上半岛的天然之美，Bukit 的地价大幅上涨——但每 are 的价格仍低于 Canggu 与 Seminyak。",
        ja: "Uluwatu はバリ不動産で最も力強い成長ストーリーです。この5年、インフラ・ダイニング・ホスピタリティが半島の自然美に追いつき、Bukit の地価は急上昇しました——それでも1アール当たりの価格は、いまだ Canggu や Seminyak を下回っています。",
      },
      typicalBuyer: {
        id: "Investor lifestyle dan pengusaha pecinta surfing yang membeli villa ocean-view untuk pemakaian pribadi sekaligus sewa, ditambah developer yang land-banking kavling di atas tebing.",
        zh: "生活方式型投资者与热爱冲浪的创业者，购入海景别墅自用兼出租，以及囤积崖顶地块的开发商。",
        ja: "自用と賃貸を兼ねてオーシャンビュー・ヴィラを購入するライフスタイル投資家やサーフ好きの起業家、そして崖上の区画をランドバンクするデベロッパー。",
      },
      rentalDemand: {
        id: "Luar biasa. Villa ocean-view di Uluwatu memasang tarif malam premium dengan tingkat hunian tinggi dari wisata surfing, pelancong wellness, dan pasar acara.",
        zh: "极为强劲。Uluwatu 的海景别墅可设定高端的每晚房价，并凭冲浪旅游、康养旅客与活动市场保持高入住率。",
        ja: "非常に高い需要。Uluwatu のオーシャンビュー・ヴィラは高単価の宿泊料を設定でき、サーフ観光・ウェルネス旅行者・イベント市場により高い稼働率を保ちます。",
      },
      capitalGrowth: {
        id: "Termasuk yang tertinggi di pulau — tanah di atas tebing dan ocean-view sifatnya terbatas, dan rampungnya infrastruktur jalan baru terus memangkas waktu tempuh.",
        zh: "位居全岛前列——崖顶与海景土地稀缺有限，加之新道路基建的完工不断缩短通行时间。",
        ja: "島でも最高水準——崖上・オーシャンビューの土地は有限で、新しい道路インフラの完成が移動時間を縮め続けています。",
      },
      opportunities: {
        id: "Villa leasehold ocean-view untuk yield, dan tanah freehold dekat Melasti serta Nyang Nyang untuk pertumbuhan nilai jangka panjang.",
        zh: "追求收益，可选海景租赁产权别墅；追求长期增值，可选 Melasti 与 Nyang Nyang 附近的永久产权土地。",
        ja: "利回りにはオーシャンビューのリースホールド・ヴィラを、長期の値上がりには Melasti や Nyang Nyang 近くのフリーホールド土地を。",
      },
    },
    statLabels: STAT_LABELS,
  },

  canggu: {
    tagline: {
      id: "Ibu kota kreatif Bali — sawah, ombak surfing, dan komunitas global yang berdenyut.",
      zh: "巴厘岛的创意之都——稻田、浪点，以及蓬勃的全球社群。",
      ja: "バリのクリエイティブ首都——田園、サーフブレイク、そして活気あるグローバルコミュニティ。",
    },
    intro: [
      {
        id: "Canggu adalah tempat energi Bali memusat. Yang lima belas tahun lalu masih sawah dan pantai surfing yang tenang, kini menjadi kawasan paling banyak dibicarakan di Asia Tenggara — magnet bagi para founder, kreatif, dan profesional remote dari seluruh penjuru dunia.",
        zh: "Canggu 是巴厘岛能量汇聚之地。十五年前还是稻田与一片安静冲浪海滩的地方，如今已成为东南亚最受热议的街区——吸引着来自世界各地的创业者、创意人与远程工作者。",
        ja: "Canggu はバリのエネルギーが凝縮する場所です。15年前は田んぼと静かなサーフビーチだった一帯が、いまや東南アジアで最も話題の街へ——世界中から創業者、クリエイター、リモートワーカーを惹きつける磁石です。",
      },
      {
        id: "Daya tariknya ada pada perpaduannya: pantai surfing berpasir hitam, kopi spesialti di tiap sudut, sebagian restoran dan gym terbaik di Asia, serta kehidupan sosial dari surfing subuh hingga beach bar larut malam. Bagi investor, Canggu tetap pasar sewa paling likuid dan paling teruji di pulau ini.",
        zh: "魅力在于它的混搭：黑沙冲浪海滩、街角遍布的精品咖啡、亚洲一流的餐厅与健身房，以及从清晨冲浪到深夜海滩酒吧的社交生活。对投资者而言，Canggu 仍是全岛流动性最强、最经受考验的租赁市场。",
        ja: "その魅力は「混ざり合い」にあります——黒砂のサーフビーチ、街角ごとのスペシャルティコーヒー、アジア屈指のレストランやジム、そして早朝サーフから深夜のビーチバーまで続く社交。投資家にとって Canggu は、いまも島で最も流動性が高く、実績のある賃貸市場です。",
      },
    ],
    idealFor: {
      id: "Investor yang ingin likuiditas sewa maksimal, dan pembeli yang ingin tinggal di pusat komunitas internasional Bali.",
      zh: "追求最高租赁流动性的投资者，以及想住在巴厘岛国际社群中心的买家。",
      ja: "最大の賃貸流動性を求める投資家、そしてバリの国際コミュニティの中心に暮らしたい買主に。",
    },
    lifestyle: [
      {
        title: { id: "Kafe", zh: "咖啡馆", ja: "カフェ" },
        description: {
          id: "Konsentrasi kopi spesialti dan budaya brunch terpadat di Asia Tenggara.",
          zh: "东南亚精品咖啡与早午餐文化最密集之地。",
          ja: "東南アジアで最も密度の高いスペシャルティコーヒーとブランチ文化。",
        },
      },
      {
        title: { id: "Surfing", zh: "冲浪", ja: "サーフ" },
        description: {
          id: "Ombak longboard yang lembut di Batu Bolong dan break yang lebih menantang di Echo Beach cocok untuk semua level.",
          zh: "Batu Bolong 柔和的长板浪与 Echo Beach 更有力的浪，适合各个水平。",
          ja: "Batu Bolong の穏やかなロングボード波と、Echo Beach の力強いブレイク——あらゆるレベルに。",
        },
      },
      {
        title: { id: "Beach Club", zh: "海滩俱乐部", ja: "ビーチクラブ" },
        description: {
          id: "Dari beanbag sunset di Old Man's hingga suasana klub yang lebih polished di atas pasir.",
          zh: "从 Old Man's 的落日豆袋，到沙滩上更为精致的俱乐部氛围。",
          ja: "Old Man's のサンセット・ビーンバッグから、砂上の洗練されたクラブシーンまで。",
        },
      },
      {
        title: { id: "Kebugaran", zh: "健身", ja: "フィットネス" },
        description: {
          id: "Gym kelas dunia, akademi MMA, box CrossFit, dan studio pemulihan.",
          zh: "世界级健身房、MMA 学院、CrossFit 场馆与恢复工作室。",
          ja: "世界クラスのジム、MMA アカデミー、CrossFit ボックス、リカバリースタジオ。",
        },
      },
      {
        title: { id: "Kehidupan Malam", zh: "夜生活", ja: "ナイトライフ" },
        description: {
          id: "Kehidupan malam paling hidup di Bali, dari beach bar hingga rooftop club.",
          zh: "巴厘岛最热闹的夜生活，从海滩酒吧到屋顶俱乐部。",
          ja: "ビーチバーからルーフトップクラブまで、バリで最も賑わう夜。",
        },
      },
      {
        title: { id: "Sekolah", zh: "学校", ja: "学校" },
        description: {
          id: "Sekolah Montessori dan internasional membuat Canggu benar-benar ramah keluarga.",
          zh: "蒙特梭利与国际学校，让 Canggu 真正适合家庭。",
          ja: "モンテッソーリやインターナショナルスクールが、Canggu を家族にも本当に暮らしやすくしています。",
        },
      },
    ],
    thingsToDo: [
      {
        id: "Surfing sunset di Batu Bolong disusul bir di pantai",
        zh: "在 Batu Bolong 冲落日浪，再到海滩上喝杯啤酒",
        ja: "Batu Bolong でサンセットサーフ、その後はビーチでビールを",
      },
      {
        id: "Menyusuri deretan kafe Berawa untuk brunch",
        zh: "沿 Berawa 的咖啡馆一路早午餐",
        ja: "Berawa のカフェを巡ってブランチ・ホッピング",
      },
      {
        id: "Berkendara menembus sawah shortcut saat golden hour",
        zh: "在黄金时刻骑行穿过那条稻田捷径",
        ja: "ゴールデンアワーに近道の田んぼを抜けてドライブ",
      },
      {
        id: "Menikmati live music di beach bar Echo Beach",
        zh: "在 Echo Beach 的海滩酒吧欣赏现场音乐",
        ja: "Echo Beach のビーチバーでライブ音楽を",
      },
      {
        id: "Pagi di pasar Minggu La Brisa",
        zh: "周日上午逛 La Brisa 市集",
        ja: "日曜の朝は La Brisa のマーケットへ",
      },
    ],
    investment: {
      overview: {
        id: "Canggu adalah tolok ukur pasar sewa Bali. Permintaan konsisten melampaui pasokan di zona inti Berawa, Batu Bolong, dan Nelayan, dan kolam pembelinya paling dalam di pulau ini — yang menjaga likuiditas jual kembali.",
        zh: "Canggu 是巴厘岛租赁市场的标杆。在 Berawa、Batu Bolong 与 Nelayan 核心区，需求持续超过供给，而买家群体为全岛最深厚——这保护了二手转售的流动性。",
        ja: "Canggu はバリの賃貸市場のベンチマークです。Berawa、Batu Bolong、Nelayan の中心エリアでは需要が供給を上回り続け、買主層は島で最も厚い——それが再販の流動性を守ります。",
      },
      typicalBuyer: {
        id: "Investor yang fokus pada yield dan profesional ekonomi digital yang membeli villa dua hingga empat kamar dalam jangkauan scooter dari pantai.",
        zh: "以收益为导向的投资者，以及数字经济从业者，购入距海滩摩托车可达的两至四卧别墅。",
        ja: "利回り重視の投資家と、ビーチまでバイクで行ける2〜4ベッドルームのヴィラを購入するデジタル経済のプロフェッショナル。",
      },
      rentalDemand: {
        id: "Terkuat dan paling teruji di pulau, dengan hunian sepanjang tahun yang didorong pekerja remote, peselancar, dan wisatawan.",
        zh: "全岛最强、最经考验，全年入住率由远程工作者、冲浪者与度假客共同支撑。",
        ja: "島で最も強く実績のある需要。リモートワーカー、サーファー、旅行者に支えられ、通年で高い稼働率を保ちます。",
      },
      capitalGrowth: {
        id: "Tanah inti Canggu makin langka, mendorong apresiasi berkelanjutan — sementara koridor tetangga menyerap limpahannya.",
        zh: "Canggu 核心地块日益稀缺，推动持续增值——而周边走廊则承接外溢需求。",
        ja: "Canggu 中心部の土地はますます希少になり、持続的な値上がりを後押し——一方で周辺のコリドーがあふれた需要を吸収します。",
      },
      opportunities: {
        id: "Villa leasehold modern di Berawa dan Padonan untuk yield langsung; kavling freehold di sisi utara untuk potensi pengembangan.",
        zh: "Berawa 与 Padonan 的现代租赁产权别墅可获即时收益；北缘的永久产权地块具开发潜力。",
        ja: "即時利回りには Berawa や Padonan のモダンなリースホールド・ヴィラを、開発の伸びしろには北端のフリーホールド区画を。",
      },
    },
    statLabels: STAT_LABELS,
  },
};
