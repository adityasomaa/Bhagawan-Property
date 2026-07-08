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

  sanur: {
    tagline: {
      id: "Air yang tenang, pagi keemasan, dan hidup tepi laut paling anggun di Bali.",
      zh: "平静的海水、金色的清晨，以及巴厘岛最优雅的海滨生活。",
      ja: "穏やかな海、黄金の朝、そしてバリでもっとも優雅な海辺の暮らし。",
    },
    intro: [
      {
        id: "Sanur adalah Bali dalam wujudnya yang paling lembut. Laguna terlindung menjaga laut tetap tenang dan bisa berenang, jalur tepi pantai sepanjang sembilan kilometer mengundang bersepeda pagi dan lari tanpa alas kaki, dan ritme hidupnya mengikuti matahari terbit alih-alih kehidupan malam.",
        zh: "Sanur 是巴厘岛最温柔的一面。受庇护的潟湖让海水平静宜泳，九公里的海滨步道邀你晨骑与赤足慢跑，生活的节奏追随日出，而非夜生活。",
        ja: "Sanur は、もっとも穏やかな姿のバリです。守られたラグーンが海を静かで泳ぎやすく保ち、9キロの海沿いの遊歩道が朝のサイクリングや裸足のランを誘い、暮らしのリズムはナイトライフではなく日の出に従います。",
      },
      {
        id: "Lama menjadi favorit keluarga dan penghuni jangka panjang, Sanur memasuki babak baru: Kawasan Ekonomi Khusus Sanur, distrik rumah sakit internasional, dan tepi pantai yang direvitalisasi menarik perhatian baru ke kota resor pertama Bali — tanpa mengganggu pesona jiwa lamanya.",
        zh: "长久以来深受家庭与长住居民青睐，Sanur 正翻开新篇章：Sanur 经济特区、国际医院片区，以及焕新的海滨，为巴厘岛最早的度假小镇带来新的关注——却不扰动它历久的old-soul韵味。",
        ja: "長く家族や長期滞在者に愛されてきた Sanur は、新たな章を迎えています——Sanur 経済特区、国際病院地区、そして再生された海辺が、バリ最初のリゾートタウンに新しい注目を集めています。それでいて、古き良き魅力は損なわれていません。",
      },
    ],
    idealFor: {
      id: "Keluarga, pensiunan, dan penghuni jangka panjang yang menghargai kemudahan berjalan kaki, pantai tenang, dan infrastruktur yang mapan.",
      zh: "重视步行便利、平静海滩与成熟基建的家庭、退休人士与长住居民。",
      ja: "歩きやすさ、穏やかなビーチ、整ったインフラを重んじる家族・リタイア層・長期滞在者に。",
    },
    lifestyle: [
      { title: { id: "Pantai", zh: "海滩", ja: "ビーチ" }, description: { id: "Air tenang terlindung karang dan pantai pasir keemasan yang sempurna untuk berenang dan jalan pagi.", zh: "受珊瑚礁庇护的平静海水与金沙海滩，最适合游泳与晨间散步。", ja: "リーフに守られた穏やかな海と金色の砂浜——泳ぎにも朝の散歩にも最適。" } },
      { title: { id: "Jalur Tepi Pantai", zh: "海滨步道", ja: "海沿いの遊歩道" }, description: { id: "Sembilan kilometer promenade bebas kendaraan yang menghubungkan kafe, dermaga, dan beach club.", zh: "九公里无车海滨长廊，串联咖啡馆、栈桥与海滩俱乐部。", ja: "カフェ・桟橋・ビーチクラブを結ぶ、9キロの車両フリーのプロムナード。" } },
      { title: { id: "Kuliner", zh: "餐饮", ja: "ダイニング" }, description: { id: "Restoran tepi laut yang mapan, kafe organik, dan institusi old-Bali.", zh: "成熟的海景餐厅、有机咖啡馆，以及old-Bali老字号。", ja: "定評ある海辺のレストラン、オーガニックカフェ、そして old-Bali の名店。" } },
      { title: { id: "Wellness", zh: "康养", ja: "ウェルネス" }, description: { id: "Ekosistem spa, studio yoga, dan klinik holistik yang tenang.", zh: "宁静的水疗、瑜伽工作室与整体疗愈诊所生态。", ja: "スパ、ヨガスタジオ、ホリスティック・クリニックが静かに息づく街。" } },
      { title: { id: "Layanan Kesehatan", zh: "医疗", ja: "ヘルスケア" }, description: { id: "Rumah bagi distrik rumah sakit internasional baru Bali — akses medis terbaik di pulau ini.", zh: "巴厘岛全新国际医院片区所在——全岛最佳的医疗可及性。", ja: "バリの新しい国際病院地区の拠点——島で最良の医療アクセス。" } },
      { title: { id: "Sekolah", zh: "学校", ja: "学校" }, description: { id: "Beberapa sekolah internasional terpandang hanya beberapa menit berkendara.", zh: "数所受推崇的国际学校，车程仅几分钟。", ja: "評判の高いインターナショナルスクールが車で数分の距離に。" } },
    ],
    thingsToDo: [
      { id: "Matahari terbit di Pantai Karang — fajar paling terkenal di pulau ini", zh: "在 Karang 海滩看日出——全岛最著名的清晨", ja: "Karang ビーチで日の出を——島でいちばん有名な夜明け" },
      { id: "Bersepeda menyusuri seluruh jalur pantai dari Matahari Terbit ke Mertasari", zh: "沿海滨步道从 Matahari Terbit 一路骑到 Mertasari", ja: "Matahari Terbit から Mertasari まで、海沿いの道を走破" },
      { id: "Day-trip naik fast boat ke Nusa Penida dan Nusa Lembongan", zh: "乘快艇一日游 Nusa Penida 与 Nusa Lembongan", ja: "ファストボートで Nusa Penida と Nusa Lembongan へ日帰り" },
      { id: "Menyusuri pasar malam Sindhu untuk kuliner Bali autentik", zh: "逛 Sindhu 夜市，品尝地道巴厘美食", ja: "Sindhu ナイトマーケットで本場のバリ料理を" },
      { id: "Stand-up paddle di laguna pagi yang tenang bagai kaca", zh: "在如镜的清晨潟湖上立式桨板", ja: "鏡のように静かな朝のラグーンで SUP を" },
    ],
    investment: {
      overview: { id: "Sanur menawarkan stabilitas dan angin demografi yang mendukung. Kawasan Ekonomi Khusus dan distrik rumah sakit membawa wisata medis dan permintaan jangka panjang, sementara pasokan tetap terbatas oleh karakter kawasan yang mapan dan low-rise.", zh: "Sanur 提供稳定性与人口红利。经济特区与医院片区带来医疗旅游与长住需求，而成熟、低层的区域特征则限制了供给。", ja: "Sanur は安定性と人口動態の追い風をもたらします。経済特区と病院地区がメディカルツーリズムと長期滞在の需要を呼び込む一方、成熟した低層の街並みが供給を抑えています。" },
      typicalBuyer: { id: "End-user dan investor konservatif yang mencari apresiasi jangka panjang dengan pendapatan sewa jangka panjang yang andal.", zh: "追求长期增值与稳定长住租金的自用者与稳健型投资者。", ja: "長期の値上がりと、安定した長期滞在の賃料収入を求める自用者・堅実な投資家。" },
      rentalDemand: { id: "Stabil dan makin panjang — sewa bulanan dan musiman dari keluarga, pelancong medis, dan snowbird Eropa.", zh: "稳定且租期渐长——来自家庭、医疗旅客与欧洲候鸟的月租与季节性入住。", ja: "安定し、滞在は長期化——家族、医療目的の旅行者、ヨーロッパのスノーバードによる月極・季節滞在。" },
      capitalGrowth: { id: "Pertumbuhan satu digit yang konsisten dengan katalis kuat dari pipeline pengembangan KEK.", zh: "持续的个位数增长，并受经济特区开发管线的强力催化。", ja: "一桁の安定成長に、経済特区の開発パイプラインという強い触媒。" },
      opportunities: { id: "Rumah freehold di gang-gang tenang dekat Jalan Danau Tamblingan, dan villa leasehold yang diposisikan untuk gelombang wisata medis.", zh: "Jalan Danau Tamblingan 附近静巷中的永久产权住宅，以及为医疗旅游浪潮布局的租赁产权别墅。", ja: "Jalan Danau Tamblingan 沿いの静かな路地のフリーホールド住宅と、メディカルツーリズムの波に合わせたリースホールド・ヴィラ。" },
    },
    statLabels: STAT_LABELS,
  },

  seminyak: {
    tagline: {
      id: "Hunian resor pantai yang polished dengan kuliner dan butik terbaik di Bali.",
      zh: "精致的海滨度假生活，汇聚巴厘岛顶尖餐饮与精品店。",
      ja: "洗練されたビーチリゾートの暮らしに、バリ随一のダイニングとブティック。",
    },
    intro: [
      { id: "Seminyak adalah grande dame Bali — kawasan yang pertama mendefinisikan tropical-chic. Pantai keemasan yang luas bertemu jaringan jalan berjajar butik desainer, restoran destinasi, dan beach club yang membuat Bali termasyhur.", zh: "Seminyak 是巴厘岛的grande dame——最早定义tropical-chic的街区。宽阔的金色海滩，连着满是设计师精品店、目的地餐厅，以及让巴厘岛声名鹊起的海滩俱乐部的街道。", ja: "Seminyak はバリの grande dame——「トロピカル・シック」を最初に定義した街です。広い金色のビーチに、デザイナーブティック、デスティネーション・レストラン、そしてバリを有名にしたビーチクラブが並ぶ街路が続きます。" },
      { id: "Ia tetap alamat resor paling lengkap di pulau ini: semua dalam jangkauan jalan kaki, standarnya internasional, dan pasar sewanya semapan yang bisa ada. Bagi pembeli, Seminyak menawarkan sesuatu yang makin langka di Bali — kematangan.", zh: "它依旧是全岛最完备的度假地址：一切皆可步行、标准国际化、租赁市场成熟到极致。对买家而言，Seminyak 提供了巴厘岛日益稀有的东西——成熟。", ja: "いまも島で最も完成度の高いリゾート・アドレスです——すべてが徒歩圏、基準は国際水準、賃貸市場はこれ以上ないほど成熟しています。買主にとって Seminyak は、バリでますます希少なもの——成熟——を差し出します。" },
    ],
    idealFor: { id: "Pembeli yang menginginkan infrastruktur mapan, kemewahan yang bisa dijangkau berjalan kaki, dan pasar sewa jangka pendek yang terbukti dan tangguh.", zh: "追求成熟基建、步行可达的奢华，以及经受考验、韧性十足的短租市场的买家。", ja: "整ったインフラ、歩ける贅沢、そして実績とレジリエンスのある短期賃貸市場を求める買主に。" },
    lifestyle: [
      { title: { id: "Beach Club", zh: "海滩俱乐部", ja: "ビーチクラブ" }, description: { id: "Ku De Ta dan Potato Head — ikon yang mendefinisikan budaya sunset Bali.", zh: "Ku De Ta 与 Potato Head——定义了巴厘岛落日文化的标志。", ja: "Ku De Ta と Potato Head——バリのサンセット文化を定義したアイコン。" } },
      { title: { id: "Kuliner", zh: "餐饮", ja: "ダイニング" }, description: { id: "Deretan institusi fine-dining terdalam di pulau ini plus pendatang baru yang ramai.", zh: "全岛最深厚的高级餐饮阵容，以及人气十足的新面孔。", ja: "島で最も層の厚いファインダイニングの名店と、話題の新店。" } },
      { title: { id: "Belanja", zh: "购物", ja: "ショッピング" }, description: { id: "Butik flagship, galeri homeware, dan resortwear desainer di sepanjang Jalan Kayu Aya.", zh: "沿 Jalan Kayu Aya 的旗舰精品店、家居艺廊与设计师度假服饰。", ja: "Jalan Kayu Aya 沿いの旗艦ブティック、ホームウェアのギャラリー、デザイナーのリゾートウェア。" } },
      { title: { id: "Pantai", zh: "海滩", ja: "ビーチ" }, description: { id: "Pasir keemasan luas dari Double Six hingga Batu Belig, berjajar sunset bar.", zh: "从 Double Six 到 Batu Belig 的宽阔金沙，落日酒吧林立。", ja: "Double Six から Batu Belig まで広がる金色の砂浜に、サンセットバーが並びます。" } },
      { title: { id: "Spa", zh: "水疗", ja: "スパ" }, description: { id: "Day spa kelas dunia dan wellness in-villa di setiap kisaran harga.", zh: "世界闻名的日间水疗，以及各价位的别墅内康养。", ja: "世界的なデイスパと、あらゆる価格帯のヴィラ内ウェルネス。" } },
      { title: { id: "Kehidupan Malam", zh: "夜生活", ja: "ナイトライフ" }, description: { id: "Cocktail bar dan lounge yang tetap elegan hingga jauh lewat tengah malam.", zh: "鸡尾酒吧与酒廊，午夜过后依旧优雅。", ja: "真夜中を過ぎても上品なカクテルバーとラウンジ。" } },
    ],
    thingsToDo: [
      { id: "Menyusuri institusi sunset: Ku De Ta ke beanbag La Plancha", zh: "落日名所巡礼：从 Ku De Ta 到 La Plancha 的豆袋", ja: "サンセットの名店巡り：Ku De Ta から La Plancha のビーンバッグへ" },
      { id: "Belanja di butik 'Eat Street' Kayu Aya", zh: "在 Kayu Aya 的 'Eat Street' 精品店购物", ja: "Kayu Aya の「Eat Street」でブティック巡り" },
      { id: "Jalan panjang di pantai dari Double Six ke Echo Beach", zh: "从 Double Six 到 Echo Beach 的长距离海滩漫步", ja: "Double Six から Echo Beach まで、長いビーチウォーク" },
      { id: "Budaya long-lunch hari Minggu di restoran destinasi", zh: "在目的地餐厅享受周日的long-lunch文化", ja: "デスティネーション・レストランで日曜のロングランチ" },
      { id: "Sore-sore pijat dan spa — Seminyak paling jago", zh: "午后按摩与水疗——Seminyak 最擅长", ja: "午後はマッサージとスパを——Seminyak の得意分野" },
    ],
    investment: {
      overview: { id: "Seminyak adalah blue-chip Bali. Pertumbuhannya lebih stabil daripada area frontier, tetapi tingkat hunian, tarif malam, dan permintaan jual kembali paling bisa diprediksi di pulau ini. Stok freehold di dalam Seminyak dipegang ketat dan jarang berpindah tangan.", zh: "Seminyak 是巴厘岛的蓝筹。增长比前沿区域更稳，但入住率、每晚房价与二手需求为全岛最可预测。Seminyak 本地的永久产权存量被牢牢持有，鲜少易手。", ja: "Seminyak はバリのブルーチップです。成長はフロンティア地域より緩やかですが、稼働率・宿泊単価・再販需要は島で最も予測しやすい。Seminyak 中心部のフリーホールドは固く保有され、市場に出ることは稀です。" },
      typicalBuyer: { id: "Investor mapan yang mencari kinerja andal, dan pembeli lifestyle yang ingin segalanya di depan pintu.", zh: "追求稳定表现的成熟投资者，以及希望一切近在门口的生活方式买家。", ja: "安定したパフォーマンスを求める成熟投資家と、すべてを玄関先に求めるライフスタイル買主。" },
      rentalDemand: { id: "Dalam dan tangguh — Seminyak punya loyalitas tamu puluhan tahun dan konsisten masuk kode pos berhunian tertinggi di Bali.", zh: "深厚而有韧性——Seminyak 拥有数十年的客户忠诚度，长期位列巴厘岛入住率最高的地段。", ja: "厚みとレジリエンス——Seminyak には数十年のゲストのロイヤルティがあり、バリで最も稼働率の高いエリアに常に名を連ねます。" },
      capitalGrowth: { id: "Stabil, ditopang kelangkaan ekstrem tanah freehold berlokasi bagus.", zh: "稳定，受优质地段永久产权土地极度稀缺的支撑。", ja: "安定的——好立地のフリーホールド土地の極度の希少性に支えられています。" },
      opportunities: { id: "Peluang renovasi pada villa leasehold lama dekat pantai, dan penawaran freehold langka di koridor Oberoi–Laksmana.", zh: "海滩附近老旧租赁产权别墅的翻新机会，以及 Oberoi–Laksmana 走廊上稀有的永久产权房源。", ja: "ビーチ近くの古いリースホールド・ヴィラのリノベーション、そして Oberoi–Laksmana コリドーの希少なフリーホールド。" },
    },
    statLabels: STAT_LABELS,
  },

  ubud: {
    tagline: {
      id: "Ketenangan hutan, jiwa seni, dan jantung spiritual Bali.",
      zh: "丛林的宁静、艺术的灵魂，以及巴厘岛的精神腹地。",
      ja: "ジャングルの静けさ、芸術の魂、そしてバリの精神的なふるさと。",
    },
    intro: [
      { id: "Ubud adalah pusat budaya dan spiritual Bali — kota dataran tinggi yang dibalut hutan hujan, teras sawah, dan ngarai sungai. Pagi dimulai dengan kicau burung dan lonceng pura; malam berakhir dengan sunset hutan dan sebagian sajian farm-to-table terbaik di Asia.", zh: "Ubud 是巴厘岛的文化与精神中心——一座被雨林、梯田与河谷环抱的高地小镇。清晨始于鸟鸣与庙钟；夜晚终于丛林落日，以及亚洲一流的farm-to-table美食。", ja: "Ubud はバリの文化と精神の中心——熱帯雨林、棚田、川の渓谷に包まれた高原の町です。朝は鳥のさえずりと寺院の鐘で始まり、夜はジャングルの夕日と、アジア屈指のファーム・トゥ・テーブルの料理で終わります。" },
      { id: "Ekonomi wellness menjadikan Ubud rumahnya: institusi yoga, retret penyembuhan, dan dapur nabati menarik audiens global sepanjang tahun. Properti di sini berarti privasi, alam, dan pemandangan yang tak bisa ditiru pembangunan apa pun.", zh: "康养经济以 Ubud 为家：瑜伽机构、疗愈静修与植物性餐厨，全年吸引全球客群。这里的房产意味着私密、自然，以及任何开发都无法复制的景致。", ja: "ウェルネス経済は Ubud を拠点とします——ヨガの拠点、ヒーリング・リトリート、プラントベースの厨房が、一年を通じて世界中の人々を惹きつけます。ここでの不動産は、プライバシー、自然、そしてどんな開発にも再現できない眺めを意味します。" },
    ],
    idealFor: { id: "Wirausaha wellness, operator retret, dan pembeli yang mencari privasi, alam, dan ketenangan berlatar hutan.", zh: "康养创业者、静修营运方，以及追求私密、自然与丛林景致宁静的买家。", ja: "ウェルネスの起業家、リトリート運営者、そしてプライバシー・自然・ジャングルビューの静けさを求める買主に。" },
    lifestyle: [
      { title: { id: "Wellness", zh: "康养", ja: "ウェルネス" }, description: { id: "The Yoga Barn dan ratusan sanctuary lainnya — Ubud adalah ibu kota wellness Asia.", zh: "The Yoga Barn 及数百处静所——Ubud 是亚洲的康养之都。", ja: "The Yoga Barn をはじめ数百のサンクチュアリ——Ubud はアジアのウェルネス首都です。" } },
      { title: { id: "Kuliner", zh: "餐饮", ja: "ダイニング" }, description: { id: "Gastronomi berkaliber locavore berdampingan dengan warung organik legendaris.", zh: "locavore水准的美食，与传奇有机暖食小馆并肩。", ja: "ロカヴォア水準のガストロノミーと、伝説的なオーガニック・ワルンが隣り合います。" } },
      { title: { id: "Seni & Kriya", zh: "艺术与手作", ja: "アート & クラフト" }, description: { id: "Galeri, desa perajin, dan warisan kreatif terkaya di pulau ini.", zh: "艺廊、手艺人村落，以及全岛最丰厚的创意传承。", ja: "ギャラリー、職人の村、そして島で最も豊かな創造の伝統。" } },
      { title: { id: "Alam", zh: "自然", ja: "自然" }, description: { id: "Jalan-jalan teras sawah, lembah sungai, dan air terjun di segala arah.", zh: "梯田步道、河谷与四面八方的瀑布。", ja: "棚田の散策路、川の谷、そして四方にある滝。" } },
      { title: { id: "Budaya", zh: "文化", ja: "文化" }, description: { id: "Istana kerajaan, pura air, dan upacara harian yang menyatu dalam kehidupan biasa.", zh: "王宫、水神庙，以及融入日常的每日祭仪。", ja: "王宮、水の寺院、そして日常に織り込まれた毎日の儀式。" } },
      { title: { id: "Kafe", zh: "咖啡馆", ja: "カフェ" }, description: { id: "Kedai kopi berpemandangan hutan yang sempurna untuk pagi santai dan kerja remote.", zh: "丛林景观的咖啡馆，最适合悠闲的清晨与远程办公。", ja: "ジャングルビューのコーヒーハウス——ゆったりした朝にもリモートワークにも最適。" } },
    ],
    thingsToDo: [
      { id: "Menyusuri Campuhan Ridge saat matahari terbit sebelum kabut terangkat", zh: "在日出、雾气未散前走 Campuhan Ridge", ja: "霧が晴れる前、日の出に Campuhan Ridge を歩く" },
      { id: "Menjelajah teras sawah Tegallalang", zh: "探访 Tegallalang 梯田", ja: "Tegallalang の棚田を巡る" },
      { id: "Berendam di mata air suci Tirta Empul", zh: "在圣泉 Tirta Empul 沐浴净身", ja: "聖なる泉 Tirta Empul で身を清める" },
      { id: "Berburu air terjun — Tibumana, Tegenungan, dan Kanto Lampo", zh: "追瀑——Tibumana、Tegenungan 与 Kanto Lampo", ja: "滝巡り——Tibumana、Tegenungan、Kanto Lampo" },
      { id: "Sehari penuh perawatan dan santapan nabati di spa hutan", zh: "在丛林水疗中，享受一整天的护理与植物性餐食", ja: "ジャングルのスパで、一日中トリートメントとプラントベースの食事を" },
    ],
    investment: {
      overview: { id: "Pasar Ubud digerakkan wisata wellness — segmen perjalanan dengan pertumbuhan tercepat di dunia. Properti siap retret dan villa berpemandangan hutan menikmati permintaan yang jauh lebih tidak musiman dibanding pasar pantai, dan tanah di desa-desa sekitar tetap bernilai sangat baik.", zh: "Ubud 市场由康养旅游驱动——全球增长最快的旅行细分。适合静修的房产与丛林景观别墅，需求远比海滩市场更少受季节影响，周边村落的土地仍极具价值。", ja: "Ubud の市場を動かすのはウェルネス・ツーリズム——世界で最も成長の速い旅行分野です。リトリート向け物件やジャングルビューのヴィラは、ビーチ市場よりはるかに季節に左右されない需要を享受し、周辺集落の土地はいまも非常に割安です。" },
      typicalBuyer: { id: "Operator retret dan boutique-hospitality, plus pembeli lifestyle yang menukar kedekatan laut dengan privasi dan alam.", zh: "静修与精品酒店营运方，以及以海边邻近换取私密与自然的生活方式买家。", ja: "リトリートやブティック・ホスピタリティの運営者、そして海の近さをプライバシーと自然に替えるライフスタイル買主。" },
      rentalDemand: { id: "Kuat dan stabil, dipimpin pelancong wellness, rata-rata masa inap yang lebih panjang, dan pasar grup retret.", zh: "强劲而稳定，由康养旅客、更长的平均停留，以及静修团体市场引领。", ja: "力強く安定——ウェルネス旅行者、長めの平均滞在、そしてリトリートのグループ市場が牽引します。" },
      capitalGrowth: { id: "Sehat di desa-desa yang mengelilingi pusat Ubud — Tegallalang, Penestanan, dan Sayan — tempat pemandangan dilindungi ngarai sungai.", zh: "在环绕 Ubud 中心的村落——Tegallalang、Penestanan 与 Sayan——增长健康，那里的景观受河谷保护。", ja: "Ubud 中心を囲む集落——Tegallalang、Penestanan、Sayan——で健全。眺めは川の渓谷に守られています。" },
      opportunities: { id: "Tanah freehold berpemandangan lembah untuk pengembangan retret, dan villa leasehold mapan dengan pendapatan retret yang terbukti.", zh: "适合开发静修的谷景永久产权土地，以及已有可观静修收入的成熟租赁产权别墅。", ja: "リトリート開発向けの渓谷ビューのフリーホールド土地と、実績あるリトリート収入をもつ既存のリースホールド・ヴィラ。" },
    },
    statLabels: STAT_LABELS,
  },

  pererenan: {
    tagline: {
      id: "Tetangga Canggu yang stylish dan tenang — sawah bertemu pantai surfing berpasir hitam.",
      zh: "Canggu 时尚而安静的邻居——稻田邂逅黑沙冲浪海滩。",
      ja: "Canggu のスタイリッシュで静かな隣人——田園が黒砂のサーフビーチと出会う場所。",
    },
    intro: [
      { id: "Pererenan adalah tempat mereka yang paling mengenal Bali sedang membeli sekarang. Satu sungai di barat Canggu, ia menawarkan ombak yang sama, budaya kafe yang sama, dan komunitas internasional yang sama — dengan ritme yang lebih lembut dan cakrawala sawah yang masih utuh.", zh: "Pererenan 是最懂巴厘岛的人此刻正在下手的地方。位于 Canggu 以西一河之隔，它拥有同样的浪、同样的咖啡文化、同样的国际社群——却有更从容的节奏与仍然完整的稻田天际线。", ja: "Pererenan は、バリを最もよく知る人々がいま買っている場所です。Canggu の一本西の川向こうに位置し、同じ波、同じカフェ文化、同じ国際コミュニティを——より穏やかなリズムと、いまも失われていない田園の地平線とともに——提供します。" },
      { id: "Restoran berdesain dan gym butik telah hadir, tetapi karakter desanya tetap: upacara melintasi jalan pantai, kuntul bekerja di sawah, dan pantai pasir hitam saat sunset milik peselancar dan penunggang kuda, bukan keramaian.", zh: "设计感餐厅与精品健身房已经进驻，但村落的气质依旧：祭仪队伍经过海滩路，白鹭在稻田间劳作，落日时分的黑沙海滩属于冲浪者与骑马人，而非人潮。", ja: "デザイン性の高いレストランやブティックジムが登場しましたが、村の趣はそのまま——儀式が浜辺の道を通り、サギが田んぼで働き、夕暮れの黒砂ビーチは人混みではなくサーファーと乗馬の人のものです。" },
    ],
    idealFor: { id: "Investor early-mover dan pembeli lifestyle yang menginginkan Canggu masa depan dengan harga hari ini, plus lebih banyak ruang dan ketenangan.", zh: "希望以今日价格买入明日 Canggu、并享有更多空间与宁静的先行投资者与生活方式买家。", ja: "今日の価格で「明日の Canggu」を、より広い空間と静けさとともに求める先行投資家・ライフスタイル買主に。" },
    lifestyle: [
      { title: { id: "Pantai", zh: "海滩", ja: "ビーチ" }, description: { id: "Pantai pasir hitam luas dengan ombak konsisten dan sunset horse ride paling fotogenik di Bali.", zh: "宽阔的黑沙海滩，浪况稳定，还有巴厘岛最上镜的落日骑马。", ja: "安定した波の広い黒砂ビーチと、バリで最もフォトジェニックなサンセットの乗馬。" } },
      { title: { id: "Kuliner", zh: "餐饮", ja: "ダイニング" }, description: { id: "Gelombang baru restoran destinasi menjadikan Pererenan alamat kuliner tersendiri.", zh: "新一波目的地餐厅，让 Pererenan 自成一处美食地址。", ja: "デスティネーション・レストランの新しい波が、Pererenan を独立した美食のアドレスにしました。" } },
      { title: { id: "Kafe", zh: "咖啡馆", ja: "カフェ" }, description: { id: "Kopi spesialti dan tempat brunch terselip di antara sawah.", zh: "藏身稻田之间的精品咖啡与早午餐店。", ja: "田んぼの合間に佇むスペシャルティコーヒーとブランチの店。" } },
      { title: { id: "Kebugaran", zh: "健身", ja: "フィットネス" }, description: { id: "Gym butik dan studio pilates beberapa menit dari pasir.", zh: "精品健身房与普拉提工作室，距沙滩仅几分钟。", ja: "砂浜から数分のブティックジムとピラティススタジオ。" } },
      { title: { id: "Sawah", zh: "稻田", ja: "田園" }, description: { id: "Sawah yang masih digarap dan koridor hijau yang masih mendefinisikan lanskap.", zh: "仍在耕作的稻田与依旧定义地景的绿色走廊。", ja: "いまも耕される田んぼと、風景を今も形づくる緑のコリドー。" } },
      { title: { id: "Komunitas", zh: "社群", ja: "コミュニティ" }, description: { id: "Irisan Canggu internasional yang lebih tenang dan lebih residensial.", zh: "Canggu 国际社群中更安静、更居住性的一片。", ja: "Canggu の国際シーンの、より静かで住宅寄りの一角。" } },
    ],
    thingsToDo: [
      { id: "Sunset di Pantai Pererenan di bawah patung raksasa Gajah Mina", zh: "在巨型 Gajah Mina 雕像下的 Pererenan 海滩看落日", ja: "巨大な Gajah Mina 像の下、Pererenan ビーチで夕日を" },
      { id: "Berselancar di peak yang lengang antara Pererenan dan Seseh", zh: "在 Pererenan 与 Seseh 之间人少的浪点冲浪", ja: "Pererenan と Seseh の間の空いたピークでサーフィン" },
      { id: "Bersepeda menyusuri gang belakang melewati sawah ke Cemagi", zh: "沿后巷穿过稻田骑行到 Cemagi", ja: "裏道を田んぼ越しに Cemagi までサイクリング" },
      { id: "Makan malam di salah satu restoran baru desa yang tersohor", zh: "在村里备受赞誉的新餐厅之一享用晚餐", ja: "村で評判の新しいレストランの一軒でディナーを" },
      { id: "Jalan pagi menyusuri sungai menuju pantai", zh: "清晨沿河散步走向海滩", ja: "朝、川沿いを歩いてビーチへ" },
    ],
    investment: {
      overview: { id: "Pererenan adalah momentum play paling jelas di Bali. Ia menangkap limpahan permintaan Canggu sambil mempertahankan nilai kelangkaan — pembangunan lebih terkendali, kavling lebih luas, dan tepi pantainya tetap belum terkomersialkan.", zh: "Pererenan 是巴厘岛最清晰的动能之选。它承接 Canggu 外溢的需求，同时保有稀缺价值——建设更克制、地块更大、海滨仍未被商业化。", ja: "Pererenan はバリで最も明確なモメンタム・プレイです。Canggu からあふれる需要を取り込みつつ、希少価値を保っています——建設はより抑制的で、区画はより広く、海辺はいまだ商業化されていません。" },
      typicalBuyer: { id: "Investor yang melewatkan Canggu awal dan menginginkan lintasan yang sama, plus keluarga yang upgrade demi ruang dan ketenangan.", zh: "错过早期 Canggu、想要同样上升轨迹的投资者，以及为空间与宁静而升级的家庭。", ja: "初期の Canggu を逃し、同じ軌道を求める投資家、そして空間と静けさを求めて住み替える家族。" },
      rentalDemand: { id: "Naik cepat — tamu makin sengaja memilih Pererenan, bukan sekadar alternatif Canggu.", zh: "快速上升——住客越来越是主动选择 Pererenan，而非仅作 Canggu 的替代。", ja: "急上昇中——ゲストはますます、Canggu の代替としてではなく、あえて Pererenan を選んでいます。" },
      capitalGrowth: { id: "Koridor pertumbuhan persentase terkuat di pesisir barat daya dalam beberapa tahun terakhir, dengan ruang untuk melaju ke arah Seseh dan Kedungu.", zh: "近年西南海岸涨幅最强的走廊，并有向 Seseh 与 Kedungu 延伸的空间。", ja: "ここ数年、南西海岸で最も伸び率の高い成長コリドー。Seseh や Kedungu 方面へ広がる余地もあります。" },
      opportunities: { id: "Villa leasehold dekat jalan pantai untuk yield, dan tanah freehold ke arah Seseh untuk apresiasi jangka menengah.", zh: "海滩路附近的租赁产权别墅可获收益，向 Seseh 方向的永久产权土地则可获中期增值。", ja: "利回りには浜辺の道に近いリースホールド・ヴィラを、中期の値上がりには Seseh 方面のフリーホールド土地を。" },
    },
    statLabels: STAT_LABELS,
  },
};
