/**
 * Chinese locale example.
 *
 * Run with: npx tsx examples/02-locales/chinese.ts
 */

import { slug } from '../../src/index.ts';

// Chinese locale handles Pinyin
console.log(slug('北京', { locale: 'zh' })); // bei-jing
console.log(slug('上海', { locale: 'zh' })); // shang-hai
console.log(slug('你好', { locale: 'zh' })); // ni-hao
console.log(slug('中国', { locale: 'zh' })); // zhong-guo
