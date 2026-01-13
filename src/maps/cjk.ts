/**
 * Chinese/Japanese/Korean (CJK) character transliteration map.
 *
 * Includes common Chinese (Pinyin), Japanese (Romaji), and Korean
 * (Romanized) character mappings for frequently used characters.
 *
 * Note: This is NOT a complete CJK transliteration system - that would
 * require tens of thousands of characters. This map covers the most
 * commonly used characters in modern text.
 *
 * @module maps/cjk
 */

/**
 * Chinese (Hanzi) to Pinyin transliteration map.
 *
 * Covers common Chinese characters with their Pinyin pronunciation.
 * For production use, consider a dedicated Pinyin library.
 */
export const chineseMap: Readonly<Record<string, string>> = {
  // Numbers
  '一': 'yi',
  '二': 'er',
  '三': 'san',
  '四': 'si',
  '五': 'wu',
  '六': 'liu',
  '七': 'qi',
  '八': 'ba',
  '九': 'jiu',
  '十': 'shi',
  '零': 'ling',
  '百': 'bai',
  '千': 'qian',
  '万': 'wan',

  // Common characters
  '人': 'ren',
  '的': 'de',
  '是': 'shi',
  '了': 'le',
  '在': 'zai',
  '我': 'wo',
  '有': 'you',
  '他': 'ta',
  '这': 'zhe',
  '个': 'ge',
  '上': 'shang',
  '们': 'men',
  '来': 'lai',
  '到': 'dao',
  '时': 'shi',
  '大': 'da',
  '地': 'di',
  '为': 'wei',
  '子': 'zi',
  '中': 'zhong',
  '你': 'ni',
  '说': 'shuo',
  '生': 'sheng',
  '国': 'guo',
  '年': 'nian',
  '着': 'zhe',
  '就': 'jiu',
  '那': 'na',
  '和': 'he',
  '要': 'yao',
  '她': 'ta',
  '出': 'chu',
  '也': 'ye',
  '得': 'de',
  '里': 'li',
  '后': 'hou',
  '自': 'zi',
  '以': 'yi',
  '会': 'hui',
  '家': 'jia',
  '可': 'ke',
  '下': 'xia',
  '而': 'er',
  '过': 'guo',
  '天': 'tian',
  '去': 'qu',
  '能': 'neng',
  '对': 'dui',
  '小': 'xiao',
  '多': 'duo',
  '然': 'ran',
  '于': 'yu',
  '心': 'xin',
  '学': 'xue',
  '么': 'me',
  '之': 'zhi',
  '都': 'dou',
  '好': 'hao',
  '看': 'kan',
  '起': 'qi',
  '发': 'fa',
  '当': 'dang',
  '没': 'mei',
  '成': 'cheng',
  '只': 'zhi',
  '如': 'ru',
  '事': 'shi',
  '把': 'ba',
  '还': 'hai',
  '用': 'yong',
  '第': 'di',
  '样': 'yang',
  '道': 'dao',
  '想': 'xiang',
  '作': 'zuo',
  '种': 'zhong',
  '开': 'kai',
  '美': 'mei',
  '乳': 'ru',
  '总': 'zong',
  '从': 'cong',
  '无': 'wu',
  '情': 'qing',
  '己': 'ji',
  '面': 'mian',
  '最': 'zui',
  '女': 'nv',
  '但': 'dan',
  '前': 'qian',
  '回': 'hui',
  '任': 'ren',
  '结': 'jie',
  '点': 'dian',
  '重': 'zhong',
  '告': 'gao',
  '行': 'xing',
  '话': 'hua',
  '眠': 'mian',

  // Common words/phrases
  '北京': 'bei-jing',
  '上海': 'shang-hai',
  '中国': 'zhong-guo',
  '世界': 'shi-jie',
  '朋友': 'peng-you',
  '喜欢': 'xi-huan',
  '学习': 'xue-xi',
  '工作': 'gong-zuo',
  '生活': 'sheng-huo',
  '时间': 'shi-jian',
  '问题': 'wen-ti',
  '方法': 'fang-fa',
  '东西': 'dong-xi',
  '意思': 'yi-si',
  '现在': 'xian-zai',
  '因为': 'yin-wei',
  '所以': 'suo-yi',
  '这样': 'zhe-yang',
  '这里': 'zhe-li',
  '那里': 'na-li',
  '什么': 'shen-me',
  '怎么': 'zen-me',
  '多少': 'duo-shao',
  '非常': 'fei-chang',
  '一起': 'yi-qi',
  '已经': 'yi-jing',
  '还是': 'hai-shi',

  // Greetings and common phrases
  '你好': 'ni-hao',
  '再见': 'zai-jian',
  '谢谢': 'xie-xie',
  '对不起': 'dui-bu-qi',
  '没关系': 'mei-guan-xi',
} as const;

/**
 * Japanese (Hiragana/Katakana) to Romaji transliteration map.
 *
 * Covers all Hiragana and Katakana characters with Hepburn romanization.
 */
export const japaneseMap: Readonly<Record<string, string>> = {
  // Hiragana - basic vowels
  'あ': 'a',
  'い': 'i',
  'う': 'u',
  'え': 'e',
  'お': 'o',

  // Hiragana - k
  'か': 'ka',
  'き': 'ki',
  'く': 'ku',
  'け': 'ke',
  'こ': 'ko',

  // Hiragana - g
  'が': 'ga',
  'ぎ': 'gi',
  'ぐ': 'gu',
  'げ': 'ge',
  'ご': 'go',

  // Hiragana - s
  'さ': 'sa',
  'し': 'shi',
  'す': 'su',
  'せ': 'se',
  'そ': 'so',

  // Hiragana - z
  'ざ': 'za',
  'じ': 'ji',
  'ず': 'zu',
  'ぜ': 'ze',
  'ぞ': 'zo',

  // Hiragana - t
  'た': 'ta',
  'ち': 'chi',
  'つ': 'tsu',
  'て': 'te',
  'と': 'to',

  // Hiragana - d
  'だ': 'da',
  'ぢ': 'ji',
  'づ': 'zu',
  'で': 'de',
  'ど': 'do',

  // Hiragana - n
  'な': 'na',
  'に': 'ni',
  'ぬ': 'nu',
  'ね': 'ne',
  'の': 'no',

  // Hiragana - h
  'は': 'ha',
  'ひ': 'hi',
  'ふ': 'fu',
  'へ': 'he',
  'ほ': 'ho',

  // Hiragana - b
  'ば': 'ba',
  'び': 'bi',
  'ぶ': 'bu',
  'べ': 'be',
  'ぼ': 'bo',

  // Hiragana - p
  'ぱ': 'pa',
  'ぴ': 'pi',
  'ぷ': 'pu',
  'ぺ': 'pe',
  'ぽ': 'po',

  // Hiragana - m
  'ま': 'ma',
  'み': 'mi',
  'む': 'mu',
  'め': 'me',
  'も': 'mo',

  // Hiragana - y
  'や': 'ya',
  'ゆ': 'yu',
  'よ': 'yo',

  // Hiragana - r
  'ら': 'ra',
  'り': 'ri',
  'る': 'ru',
  'れ': 're',
  'ろ': 'ro',

  // Hiragana - w
  'わ': 'wa',
  'を': 'wo',
  'ん': 'n',

  // Katakana - basic vowels
  'ア': 'a',
  'イ': 'i',
  'ウ': 'u',
  'エ': 'e',
  'オ': 'o',

  // Katakana - k
  'カ': 'ka',
  'キ': 'ki',
  'ク': 'ku',
  'ケ': 'ke',
  'コ': 'ko',

  // Katakana - g
  'ガ': 'ga',
  'ギ': 'gi',
  'グ': 'gu',
  'ゲ': 'ge',
  'ゴ': 'go',

  // Katakana - s
  'サ': 'sa',
  'シ': 'shi',
  'ス': 'su',
  'セ': 'se',
  'ソ': 'so',

  // Katakana - z
  'ザ': 'za',
  'ジ': 'ji',
  'ズ': 'zu',
  'ゼ': 'ze',
  'ゾ': 'zo',

  // Katakana - t
  'タ': 'ta',
  'チ': 'chi',
  'ツ': 'tsu',
  'テ': 'te',
  'ト': 'to',

  // Katakana - d
  'ダ': 'da',
  'ヂ': 'ji',
  'ヅ': 'zu',
  'デ': 'de',
  'ド': 'do',

  // Katakana - n
  'ナ': 'na',
  'ニ': 'ni',
  'ヌ': 'nu',
  'ネ': 'ne',
  'ノ': 'no',

  // Katakana - h
  'ハ': 'ha',
  'ヒ': 'hi',
  'フ': 'fu',
  'ヘ': 'he',
  'ホ': 'ho',

  // Katakana - b
  'バ': 'ba',
  'ビ': 'bi',
  'ブ': 'bu',
  'ベ': 'be',
  'ボ': 'bo',

  // Katakana - p
  'パ': 'pa',
  'ピ': 'pi',
  'プ': 'pu',
  'ペ': 'pe',
  'ポ': 'po',

  // Katakana - m
  'マ': 'ma',
  'ミ': 'mi',
  'ム': 'mu',
  'メ': 'me',
  'モ': 'mo',

  // Katakana - y
  'ヤ': 'ya',
  'ユ': 'yu',
  'ヨ': 'yo',

  // Katakana - r
  'ラ': 'ra',
  'リ': 'ri',
  'ル': 'ru',
  'レ': 're',
  'ロ': 'ro',

  // Katakana - w
  'ワ': 'wa',
  'ヲ': 'wo',
  'ン': 'n',

  // Katakana - combinations
  'キヤ': 'kya',
  'キユ': 'kyu',
  'キヨ': 'kyo',
  'シャ': 'sha',
  'シュ': 'shu',
  'ショ': 'sho',
  'チャ': 'cha',
  'チュ': 'chu',
  'チョ': 'cho',
  'ニャ': 'nya',
  'ニュ': 'nyu',
  'ニョ': 'nyo',
  'ヒャ': 'hya',
  'ヒュ': 'hyu',
  'ヒョ': 'hyo',
  'ミャ': 'mya',
  'ミュ': 'myu',
  'ミョ': 'myo',
  'リャ': 'rya',
  'リュ': 'ryu',
  'リョ': 'ryo',
  'ギャ': 'gya',
  'ギュ': 'gyu',
  'ギョ': 'gyo',
  'ジャ': 'ja',
  'ジュ': 'ju',
  'ジョ': 'jo',
  'ビャ': 'bya',
  'ビュ': 'byu',
  'ビョ': 'byo',
  'ピャ': 'pya',
  'ピュ': 'pyu',
  'ピョ': 'pyo',

  // Common Japanese words
  'こんにちは': 'konnichiha',
  'さようなら': 'sayounara',
  'ありがとう': 'arigatou',
  'すみません': 'sumimasen',
  'はい': 'hai',
  'いいえ': 'iie',
} as const;

/**
 * Korean (Hangul) to Romanized transliteration map.
 *
 * Covers basic Hangul jamo and common syllables.
 * Note: Complete Hangul transliteration requires parsing
 * the syllable blocks into individual jamo.
 */
export const koreanMap: Readonly<Record<string, string>> = {
  // Basic consonants (choseong)
  'ㄱ': 'g',
  'ㄲ': 'kk',
  'ㄴ': 'n',
  'ㄷ': 'd',
  'ㄸ': 'tt',
  'ㄹ': 'r',
  'ㅁ': 'm',
  'ㅂ': 'b',
  'ㅃ': 'pp',
  'ㅅ': 's',
  'ㅆ': 'ss',
  'ㅇ': '',
  'ㅈ': 'j',
  'ㅉ': 'jj',
  'ㅊ': 'ch',
  'ㅋ': 'k',
  'ㅌ': 't',
  'ㅍ': 'p',
  'ㅎ': 'h',

  // Basic vowels (jungseong)
  'ㅏ': 'a',
  'ㅐ': 'ae',
  'ㅑ': 'ya',
  'ㅒ': 'yae',
  'ㅓ': 'eo',
  'ㅔ': 'e',
  'ㅕ': 'yeo',
  'ㅖ': 'ye',
  'ㅗ': 'o',
  'ㅘ': 'wa',
  'ㅙ': 'wae',
  'ㅚ': 'oe',
  'ㅛ': 'yo',
  'ㅜ': 'u',
  'ㅝ': 'wo',
  'ㅞ': 'we',
  'ㅟ': 'wi',
  'ㅠ': 'yu',
  'ㅡ': 'eu',
  'ㅢ': 'ui',
  'ㅣ': 'i',

  // Common Korean words
  '안녕': 'annyeong',
  '하세요': 'haseyo',
  '감사': 'gamsa',
  '합니다': 'hamnida',
  '사랑': 'sarang',
  '한국': 'hanguk',
  '서울': 'seoul',
} as const;
