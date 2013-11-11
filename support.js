var debug = require('debug');
var log = debug('webot-example:log');

var _ = require('underscore')._;
var request = require('request');
var http = require('http');
var suggestmsg='1. 爱 (小虎队) 2. 大海 (张雨生) 3. 海阔天空 (beyond) 4. 飘雪 (陈慧娴) 5. 你的样子 (罗大佑) 6. 上海滩 (叶丽仪) 7. 偏偏喜欢你 (陈百强) 8. 吻别 (张学友) 9. 水手 (郑智化) 10. 一生爱你千百回 (梅艳芳) 11. 情人 (杜德伟) 12. 一剪梅 (张明敏) 13. 朋友 (谭咏麟) 14. 爱你 (郭富城) 15. 爱我的人和我爱的人 (裘海正) 16. 感恩的心 (欧阳菲菲) 17. 昨日重现 (高胜美) 18. 红日 (李克勤) 19. 朋友别哭 (吕方) 20. 梁祝 (吴奇隆) 21. 七天七世纪 (李天华) 22. 一千个伤心的理由 (张学友) 23. 追梦人 (凤飞飞) 24. 情人 (beyond) 25. 屋顶 (吴宗宪) 26. 女人花 (梅艳芳) 27. 最浪漫的事 (赵咏华) 28. 回家 (顺子) 29. 明天会更好 (罗大佑) 30. 童年 (罗大佑) 31. 如果这都不算爱 (张学友) 32. 爱要怎么说出口 (赵传) 33. 讲不出再见 (谭咏麟) 34. 大约在冬季 (齐秦) 35. 千千阙歌 (陈慧娴) 36. 别怕我伤心 (张信哲) 37. 爱如潮水 (张信哲) 38. 铁血丹心 (罗文) 39. 说谎 (温兆伦) 40. 情书 (张学友) 41. 谢谢你的爱 (刘德华) 42. 喜欢你 (beyond) 43. 我恨我痴心 (刘德华) 44. 祝你一路顺风 (吴奇隆) 45. 你怎么舍得我难过 (黄品源) 46. 我的未来不是梦 (张雨生) 47. 大地 (beyond) 48. 一千零一夜 (邰正宵) 49. 祝福 (张学友) 50. 生日快乐 (伊能静) 51. 我们的故事 (赵咏华) 52. 心雨 (高胜美) 53. 容易受伤的女人 (王菲) 54. 你最珍贵 (张学友/高慧君) 55. 稻草人 (林志颖) 56. 回家 (王杰) 57. 阳光总在风雨后 (许美静) 58. 不让我的眼泪陪我过夜 (齐秦) 59. 一路上有你 (张学友) 60. 心如刀割 (张学友) 61. 宝贝对不起 (草蜢) 62. 爱的代价 (张艾嘉) 63. 窗外 (李琛) 64. 你的眼神 (林志美) 65. 千纸鹤 (邰正宵) 66. 白月光 (张信哲) 67. 再回首 (姜育恒) 68. 你好毒 (张学友) 69. 来生缘 (刘德华) 70. 沧海一声笑 (许冠杰) 71. 我愿意 (王菲) 72. 同桌的你 (老狼) 73. 心要让你听见 (邰正宵) 74. 让我欢喜让我忧 (周华健) 75. 星星点灯 (郑智化) 76. 无地自容 (黑豹) 77. 男儿当自强 (林子祥) 78. 精忠报国 (屠洪刚) 79. 爱你在心口难开 (高胜美) 80. 一场游戏一场梦 (王杰) 81. 晚秋 (毛宁) 82. 忘情水 (刘德华) 83. 水中花 (谭咏麟) 84. 味道 (辛晓琪) 85. 爱你十分泪七分 (裘海正) 86. 我是真的爱你 (张信哲) 87. 为爱痴狂 (刘若英) 88. 漫步人生路 (邓丽君) 89. 真心英雄 (周华健) 90. 爱上一个不回家的人 (林忆莲) 91. 知心爱人 (付笛生/任静) 92. 爱就一个字 (张信哲) 93. 饿狼传说 (张学友) 94. 涛声依旧 (毛宁) 95. 特别的爱给特别的你 (伍思凯) 96. 我不想说 ( 杨钰莹) 97. 护花使者 (李克勤) 98. 囚鸟 (张宇) 99. 懂你 (满文军) 100. 忘忧草 (周华健) 101. 把悲伤留给自己 (陈升) 102. 天若有情 (高胜美) 103. 至少还有你 (林忆莲) 104. 笨小孩 (刘德华) 105. 笑红尘 (陈淑桦) 106. 狼 (齐秦) 107. 野百合也有春天 (罗大佑) 108. 棋子 (王菲) 109. 梦醒时分 (陈淑桦) 110. 雨一直下 (张宇) 111. 爱江山更爱美人 (李丽芬) 112. 彩虹 (羽泉) 113. 如果还有明天 (刘伟仁) 114. 花心 (周华健) 115. 白天不懂夜的黑 (那英) 116. 恋曲1990 (罗大佑) 117. 一生何求 (陈百强) 118. 相思风雨中 (张学友/汤宝如) 119. 一无所有 (崔健) 120. 我的中国心 (张明敏) 121. 当爱已成往事 (张国荣) 122. 但愿人长久 (王菲) 123. 我是一只小小鸟 (赵传) 124. 长城 (beyond) 125. 没有情人的情人节 (孟庭苇) 126. 用心良苦 (张宇) 127. 铿锵玫瑰 (林忆莲) 128. 刀剑如梦 (周华健) 129. 等你等到我心痛 (张学友) 130. 沉默是金 (张国荣/许冠杰) 131. 今夜你会不会来 (黎明) 132. 我是不是该安静的走开 (郭富城) 133. 执着 (田震) 134. 霸王别姬 (屠洪刚) 135. 哭砂 (黄茑茑) 136. 游戏人间 (郑智化) 137. 天竺少女 (李玲玉) 138. 鬼迷心窍 (李宗盛) 139. 在雨中 (刘家昌) 140. 亲密爱人 (梅艳芳) 141. 选择 (林子祥/叶倩文) 142. 别问我是谁 (王馨平) 143. 忘记你我做不到 (张学友) 144. 找一个字代替 (邰正宵) 145. 恰似你的温柔 (蔡琴) 146. 归来吧 (陈慧娴) 147. 故乡的云 (费翔) 148. 千年等一回 (高胜美) 149. 爱相随 (周华健) 150. 小城故事 (邓丽君) 151. 你知道我在等你吗 (张洪量) 152. 安妮 (王杰) 153. 风中的承诺 (李翊君) 154. 如果云知道 (许茹芸) 155. 一天一点爱恋 (梁朝伟) 156. 勇敢一点 (赵传) 157. 凡人歌 (李宗盛) 158. 鲁冰花 (甄妮) 159. 我想有个家 (潘美辰) 160. 一言难尽 (张宇) 161. 万水千山总是情 (汪明荃) 162. 橄榄树 (齐豫) 163. 笑看风云 (郑少秋) 164. 绝口不提爱你 (郑中基) 165. 万里长城永不倒 (罗文) 166. 再回到从前 (张镐哲) 167. 一笑而过 (那英) 168. 兰花草 (刘文正) 169. 每次都想呼喊你的名字 (张学友) 170. 每次都想呼喊你的名字 (李恕权) 171. 明天你是否依然爱我 (童安格) 172. 你在他乡还好吗 (李进) 173. 潇洒走一回 (叶倩文) 174. 想你 (范文芳) 175. 心太软 (任贤齐) 176. 滚滚红尘 (老狼) 177. 滚滚红尘 (陈淑桦) 178. 爱一回伤一回 (吕方) 179. 孤枕难眠 (周华健) 180. 只想一生跟你走 (张学友) 181. 其实不想走 (周华健) 182. 红蜻蜓 (小虎队) 183. 当 (动力火车) 184. 不是我不小心 (张镐哲) 185. 光阴的故事 ( 罗大佑) 186. 九百九十九朵玫瑰 (邰正宵) 187. 太想爱你 (张信哲) 188. 睡在我上铺的兄弟 (老狼) 189. 舞女泪 (韩宝仪) 190. 男人哭吧不是罪 (刘德华) 191. 再见理想 (beyond) 192. 对你爱不完 (郭富城) 193. 笑忘书 (王菲) 194. 不装饰你的梦 (蔡国权) 195. 一天到晚游泳的鱼 (张雨生) 196. 皇后大道东 (罗大佑) 197. 月亮惹的祸 (张宇) 198. 青春舞曲 (罗大佑) 199. 雨蝶 (李翊君) 200. 姐姐 (张楚) 201. 赤裸裸 (郑钧) 202. 回头太难 (张学友) 203. 亲亲我的宝贝 (周华健) 204. 爱的奉献 (韦唯) 205. 大国民 (郑智化) 206. 外面的世界 (齐秦) 207. 美酒加咖啡 (邓丽君) 208. 我终于失去了你 (赵传) 209. 风继续吹 (张国荣) 210. 我和春天有个约会 (邝美云) 211. 思念 (毛阿敏) 212. 宽容 (张信哲) 213. 把根留住 (童安格) 214. 我是不是你最疼爱的人 (潘越云) 215. 每天爱你多一些 (张学友) 216. 大中国 (高枫) 217. 东方之珠 (罗大佑) 218. 不 (陈百强) 219. 人生何处不相逢 (陈慧娴) 220. 不后悔 (张学友) 221. 你快回来 (孙楠) 222. 夜来香 (林子祥) 223. 夜来香 (邓丽君) 224. 新鸳鸯蝴蝶梦 (黄安) 225. 初恋 (红孩儿) 226. 一世情缘 (童安格) 227. 风中有朵雨做的云 (孟庭苇) 228. 外婆的澎湖湾 (刘文正) 229. 外婆的澎湖湾 (潘安邦) 230. 半斤八两 (许冠杰) 231. 执迷不悔 (王菲) 232. 四季歌 (达明一派) 233. 最爱 (周慧敏) 234. 有一点动心 (张信哲) 235. 弯弯的月亮 (刘欢) 236. 随缘 (温兆伦) 237. 口是心非 (张雨生) 238. 一生中最爱 (谭咏麟) 239. 爱是永恒 (张学友) 240. 领悟 (辛晓琪) 241. 小芳 (李春波) 242. 在水一方 (邓丽君) 243. 创世纪 (陈百强) 244. 青青河边草 (高胜美) 245. 被遗忘的时光 (蔡琴) 246. 明月千里寄相思 (徐小凤) 247. 你的眼睛背叛你的心 (郑中基) 248. 浪子心声 (许冠杰) 249. 渴望 (毛阿敏) 250. 其实你不懂我的心 (童安格) 251. 有没有一首歌会让你想起我 (周华健) 252. 十七岁的雨季 (林志颖) 253. 失恋阵线联盟 (草蜢) 254. 开心的马骝 (刘德华) 255. 让我一次爱个够 (庾澄庆) 256. 红尘有你 (王杰) 257. 流光飞舞 (陈淑桦) 258. 敢问路在何方 (西游记) 259. 路边的野花不要采 (邓丽君) 260. 昨夜星辰 (龙飘飘) 261. 爱情鸟 (林依轮) 262. 流星 (王菲) 263. 为什么受伤的总是我 (林志颖) 264. 一帘幽梦 (许茹芸) 265. 得意的笑 (李丽芬) 266. 谁的心忘了收 (孙楠) 267. 冬季到台北来看雨 (孟庭苇) 268. 爱在深秋 (谭咏麟) 269. 傻瓜 (苏慧伦) 270. 满江红 (罗文) 271. 追风少年 (吴奇隆) 272. 念亲恩 (陈百强) 273. 爱情故事 (辛晓琪) 274. 梦回唐朝 (唐朝) 275. 想和你去吹吹风 (张学友) 276. 真我的风采 (刘德华) 277. 年轻时代 (郑智化) 278. 烛光里的妈妈 (毛阿敏) 279. 直觉 (张信哲) 280. 天长地久 (周启生) 281. 祝你平安 (孙悦) 282. 爱之初体验 (张震岳) 283. 冬天里的一把火 (费翔) 284. 忘了你忘了我 (王杰) 285. 回到拉萨 (郑钧) 286. 花房姑娘 (崔健) 287. 少年壮志不言愁 (刘欢) 288. 九妹 (黄鹤翔) 289. 一封家书 (李春波) 290. 千言万语 (邓丽君) 291. 我被青春撞了一下腰 (张真) 292. 似是故人来 (梅艳芳) 293. 最近比较烦 (周华健) 294. 天使在夜里哭 (周子寒) 295. 不走 (杜德伟) 296. 夜上海 (周璇) 297. 分手总要在雨天 (张学友) 298. 初恋情人 (刘小慧) 299. 纤夫的爱 (尹相杰/于文华) 300. 当年情 (张国荣) 301. 笑脸 (谢东) 302. 听说爱情回来过 (林忆莲) 303. 跟往事干杯 (姜育恒) 304. 我曾用心爱着你 (潘美辰) 305. 绿岛小夜曲 (蔡幸娟) 306. 不了情 (徐小凤) 307. 天涯歌女 (徐小凤) 308. 青苹果乐园 (小虎队) 309. 难以抗拒 (李度) 310. 顺流逆流 (徐小凤) 311. 你究竟有几个好妹妹 (孟庭苇) 312. 不老的传说 (张学友) 313. 雾里看花 (那英) 314. 明明白白我的心 (陈淑桦) 315. 相思成灾 (刘德华) 316. 你看你看月亮的脸 (孟庭苇) 317. 南海姑娘 (邓丽君) 318. 南海姑娘 (王菲) 319. 野花 (田震) 320. 无情的雨无情的你 (齐秦) 321. 篱笆墙的影子 (毛阿敏) 322. 奉献 (苏芮) 323. 还是朋友 (张雨生) 324. 玻璃心 (齐秦) 325. 石头记 (黄耀明) 326. 石头记 (达明一派) 327. 蝶恋花 (黄凯芹) 328. 逝去的诺言 (陈慧娴) 329. 真心真意过一生 (叶倩文) 330. 山不转水转 (那英) 331. 你的柔情我永远不懂 (陈琳) 332. 回忆 (钟镇涛) 333. 今宵多珍重 (陈百强) 334. 难得有情人 (关淑怡) 335. 一人有一个梦想 (黎瑞恩) 336. 牵挂你的人是我 (高林生) 337. 堆积情感 (邝美云) 338. 未了情 (郭富城) 339. 星光依旧灿烂 (小虎队) 340. 摘下满天星 (郑少秋) 341. 蝴蝶飞呀 (小虎队) 342. 偷心 (张学友) 343. 阿莲 (戴军) 344. 每一步 (徐小凤) 345. 流浪的小孩 (伊能静) 346. 堕落天使 (郑智化) 347. 糊涂的爱 (王志文) 348. 恋恋风尘 (陈慧娴) 349. 流星下的愿 (张学友/许慧欣) 350. 我的眼里只有你 (景岗山) 351. 上上签 (周华健) 352. 忘记他 (邓丽君) 353. 天天想你 (张雨生) 354. 尘缘 (罗文) 355. 我很丑可是我很温柔 (赵传) 356. 情凭谁来定错对 (谭咏麟) 357. 何日君再来 (邓丽君) 358. 何日君再来 (费玉清) 359. 不怕付出 (蓝心湄) 360. 好大一棵树 (田震) 361. 你把我的女人带走 (温兆伦) 362. 女人何苦为难女人 (辛晓琪) 363. 三月里的小雨 (刘文正) 364. 夜太黑 (林忆莲) 365. 新长征路上的摇滚 (崔健) 366. 让一切随风 (钟镇涛) 367. 小路 (邓丽君) 368. 爱与哀愁 (童安格) 369. 是不是这样的夜晚你才会这样的想起我 (吴宗宪) 370. 想你的时候 (千百惠) 371. 蓝雨 (张学友) 372. 真的汉子 (林子祥) 373. 萤火虫 (伊能静) 374. 为了爱梦一生 (王杰) 375. 一天一天等下去 (吴奇隆) 376. 相约到永久 (关之琳) 377. 你快乐所以我快乐 (王菲) 378. 婉君 (李翊君) 379. 哈萨雅琪 (周传雄) 380. 彼岸花 (王菲) 381. 双星情歌 (许冠杰) 382. 耶利亚女郎 (童安格) 383. 情已逝 (张学友) 384. 亲爱的小孩 (苏芮) 385. 独上西楼 (邓丽君) 386. 轻轻的告诉你 (杨钰莹) 387. 只要你过得比我好 (钟镇涛) 388. 我应该 (张学友) 389. 南屏晚钟 (徐小凤) 390. 天才白痴梦 (许冠杰) 391. 海上花 (甄妮) 392. 心的方向 (周华健) 393. 亚洲雄风 (韦唯/刘欢) 394. 彩云伴海鸥 (高胜美) 395. 曾经心疼 (叶倩文) 396. 你是我心底的烙印 (钟镇涛) 397. 我期待 (张雨生) 398. 冰点与沸点 (周海媚) 399. 寂寞让我如此美丽 (陈明) 400. 风再起时 (张国荣) 401. 爱你痛到不知痛 (张学友) 402. 似水流年 (梅艳芳) 403. 我是真的付出我的爱 (周华健) 404. 难以抗拒你容颜 (张信哲) 405. 星光灿烂 (罗中旭) 406. 阿郎恋曲 (许冠杰) 407. 我是一棵秋天的树 (张雨生) 408. 星星知我心 (蔡幸娟) 409. 走四方 (韩磊) 410. 摘星的晚上 (李国祥) 411. 不是每个恋曲都有美好回忆 (林志颖) 412. 恋曲1980 (罗大佑) 413. 只记今朝笑 (林青霞) 414. 失乐园 (陈淑桦) 415. 绿叶对根的情意 (毛阿敏) 416. 真的还是假的 (孟庭苇) 417. 长城谣 (张明敏) 418. 忘情森巴舞 (草蜢) 419. 几度夕阳红 (潘越云) 420. 摘星 (陈百强) 421. 不必在乎我是谁 (林忆莲) 422. 雨中的恋人们 (黄凯芹) 423. 那个傻瓜爱过你 (赵传) 424. 最爱上海滩 ( 刘德华) 425. 无语问苍天 (高胜美) 426. 捕风的汉子 (谭咏麟) 427. 我的爱对你说 (叶倩文) 428. 半梦半醒 (谭咏麟) 429. 几许风雨 (罗文) 430. 我独自在风雨中 (高明骏) 431. 命运是你家 (beyond) 432. 灰色 (林忆莲) 433. 为你钟情 (张国荣) 434. 偷偷爱你 (梁朝伟) 435. 寂寞公路 (伍思凯) 436. 伤感的恋人 (黄凯芹) 437. 垄上行 (张明敏) 438. 我所爱的让我流泪 (赵传) 439. 错过你错过爱 (张信哲) 440. 我来自北京 (黎明) 441. 用我一辈子去忘记 (郑智化) 442. 鸳鸯锦 (叶欢) 443. 京华春梦 (汪明荃) 444. 深深深 (李克勤) 445. 我心已许 (蔡幸娟) 446. 一颗不变心 (张学友) 447. 情未了 (黄凯芹/周慧敏) 448. 卡拉永远OK (谭咏麟) 449. 含羞草 (翁倩玉) 450. 月朦胧鸟朦胧 (凤飞飞) 451. 永远不回头 (张雨生) 452. Amani (beyond) 453. 钟爱一生 (杜德伟) 454. 季候风 (王菲) 455. 穿过你的黑发我的手 (罗大佑) 456. 好好爱我 (张蔷) 457. 像我这样的朋友 (谭咏麟) 458. 海角天涯 (刘锡明) 459. 非常夏日 (王菲) 460. 青蛙公主 (温兆伦) 461. 白衣飘飘的年代 (叶蓓) 462. 报告班长 (庾澄庆) 463. 你你你为了爱情 (刘雅丽) 464. 坏女孩 (梅艳芳) 465. 宝贝，对不起 (草蜢) 466. 我的1997 (艾敬) 467. 大会堂演奏厅 (李克勤) 468. 深爱着你 (陈百强) 469. 一个人的我依然会微笑 (林佳仪) 470. 倾心 (黄凯芹) 471. 想你想的好孤寂 (邰正宵) 472. 寡妇村传奇 (周华健) 473. 天天等天天问 (叶欢) 474. 人在边缘 (黎明) 475. 两忘烟水里 (关正杰) 476. 红颜美人多薄命 (伊能静) 477. 春风吻上我的脸 (凤飞飞) 478. 我们都是这样失恋的 (草蜢) 479. 爱人同志 (罗大佑) 480. 因为寂寞 (张艾嘉) 481. 小村之恋 (邓丽君) 482. 轻抚你的脸 (张学友) 483. 纸船 (许冠杰) 484. 改变1995 (黄舒骏) 485. 一生不可自决 (陈百强) 486. 为什么我的真换来我的疼 (高胜美) 487. 我拿什么爱你 (齐秦) 488. 怪你过份美丽 (张国荣) 489. 想哭就哭 (姜育恒) 490. 风雨同路 (徐小凤 ) 491. 寂寞的眼 (周华健) 492. 最真的期待 (赵咏华) 493. 来来回回 (张学友) 494. 真心换绝情 (吴宗宪) 495. 美丽的花蝴蝶 (张洪量) 496. HELLO (王杰) 497. 亚拉伯跳舞女郎 (beyond) 498. 伤心的我 (邝美云) 499. 春光乍泄 (黄耀明) 500. 虹 (齐秦) 501. 天下没有不散的筵席 (郑钧)  ';
var mytimeout=4000;
/**
 * 通过高德地图API查询用户的位置信息
 */
exports.geo2loc = function geo2loc(param, cb){
  var options = {
    url: 'http://restapi.amap.com/rgeocode/simple',
    timeout: mytimeout,
    qs: {
      resType: 'json',
      encode: 'utf-8',
      range: 3000,
      roadnum: 0,
      crossnum: 0,
      poinum: 0,
      retvalue: 1,
      sid: 7001,
      region: [param.lng, param.lat].join(',')
    }
  };
  log('querying amap for: [%s]', options.qs.region);

  //查询
  request.get(options, function(err, res, body){
    if(err){
      error('geo2loc failed', err);
      return cb(err);
    }
    var data = JSON.parse(body);
    if(data.list && data.list.length>=1){
      data = data.list[0];
      var location = data.city.name || data.province.name;
      log('location is %s, %j', location, data);
      return cb(null, location, data);
    }
    log('geo2loc found nth.');
    return cb('geo2loc found nth.');
  });
};
/**
 * 中译英
 *
 * @param  {String}   keyword 关键词
 * @param  {Function} cb            回调函数
 * @param  {Error}    cb.err        错误信息
 * @param  {String}   cb.result     查询结果
 */
exports.translate_english= function(keyword, cb){
  log('searching: %s', keyword);
  var options = {    
	//url:'http://51anygo.sinaapp.com/googlefy/fanyi.php?txt=%D6%D0%B9%FA%C8%CB%C3%F1%B9%B2%BA%CD%B9%FA',
	url:'http://findme.jhost.cn/php/googlefy/fanyi.php?txt='+keyword.trim(),
    //url: 'http://51anygo.sinaapp.com/googlefy/fanyi.php?txt='+keyword.trim(),
    timeout: mytimeout,
    qs:{}
	};
  console.log('options: ' + options.url);
  //request.setTimeout(timeout, [callback]);
  request.get(options, function(err, res, body){
    if (err || !body){
      return cb(null, '现在暂时无法搜索，待会儿再来好吗？');
    }
	console.log(body);  

    var result;
    result = body;
	var pageData = "";
    res.setEncoding('gb2312');
    res.on('data', function (chunk) {
        pageData += chunk;
    });
 
    res.on('end', function(){
        console.log(pageData);
        //这里处理抓取到的数据
    });
    // 则会生成图文列表
    return cb(null, result);
  });
};


/**
 * 搜索音乐
 *
 * @param  {String}   keyword 关键词
 * @param  {Function} cb            回调函数
 * @param  {Error}    cb.err        错误信息
 * @param  {String}   cb.result     查询结果
 */
exports.search_music = function(keyword, cb){
  log('searching: %s', keyword);
  var options = {
     //url:'http://api2.sinaapp.com/search/music/?appkey=0020130430&appsecert=fa6095e1133d28ad&reqtype=music&keyword=%E5%8D%81%E5%B9%B4',
    //url: 'http://api2.sinaapp.com/search/music/?appkey=0020130430&appsecert=fa6095e1133d28ad&reqtype=music&keyword='+keyword.trim(),
	//url:'http://51anygo.sinaapp.com/baidumusic/baidumusic.php?name=%E5%8D%81%E5%B9%B4',
	//url:'http://51anygo.sinaapp.com/baidumusic/baidumusic.php?name=%CA%AE%C4%EA',
	//url:'http://findme.jhost.cn/php/baidumusic/baidumusic.php?name='+keyword.trim(),
    //url: 'http://51anygo.sinaapp.com/baidumusic/baidumusic.php?name='+keyword.trim(),
	//url:'http://findme.jhost.cn/php/xiamimusic/music.php?name='+encodeURI(keyword.trim()),
    url:'http://findme.jhost.cn/php/xiamimusic/xm.php?name='+encodeURI(keyword.trim()),
    timeout: mytimeout,
    qs:{}
	};
    console.log('options: ' + options.url);
  request.get(options, function(err, res, body){
  //http://m.kugou.com/weixin/?action=single&filename=%u6076%u9b54%u5976%u7238-%u636e%u8bf4JZ%u4e5f%u5728%u627e%u540d%u5b57S&issoft=1&timelen=294231&chl=qq_client&MicroBlog=2
//http://m.kugou.com/weixin/?action=single&filename=dreamhigh - loveyou&hash=C112AA214825217A61D04A92F1A923B3&issoft=1&timelen=294231&chl=qq_client&MicroBlog=2
//http://cloud.kugou.com/app/getSearchResult.php?key={loveyou}&pageNo={pageno}&pageSize={pagesize}
    if (err || !body || body.match("failed") ){
      //return cb(null, '现在暂时无法搜索，待会儿再来好吗？');
         result = [{
            pic: 'http://findme.jhost.cn/php/cry.jpg',
            url: 'http://m.kugou.com',
            title: '网络不给力啊,试下在线听歌吧！',
            description: ''
        }];
        return cb(null, result);
    }
	console.log(body);
    //var regex = /comCode/gi;
    var i = 1;
	var result;
    var json=body;
    //json = json.force_encoding('UTF-8')
    //json = json.gsub(/[\u0000-\u001f\u007f\u0080-\u009f]/,'')
    try {	
        var jsonObj=JSON.parse(String(json));
        //console.log(jsonObj);  
        if (!jsonObj || !jsonObj.music || !jsonObj.music.title ){	  
            var nofindmsg='找不到您要的歌曲，试下别的歌吧';	           
            var indexfrom=parseInt(Math.random()*(490-1+1));
            var findtag = ' '+indexfrom+'.';   
            var rfindbgn=suggestmsg.indexOf(findtag);
            var findtag = ' '+(indexfrom+10)+'.'; 
            var rfindend=suggestmsg.indexOf(findtag);	
            if(rfindbgn>=0 && rfindend>=0)  
            {  
                suggestmsg = suggestmsg.substring(rfindbgn,rfindend);
                nofindmsg+=',您想试下这些歌曲'+suggestmsg;
            }  
            return cb(null, nofindmsg);
        }       
        
        console.log("jsonObj.music.musicurl:"+jsonObj.music.musicurl);
        console.log("jsonObj.music.description:"+jsonObj.music.description);
        //var m = regex.exec(body);


        result = {
          type: 'music',
          //description: jsonObj.music.description,
          description:  jsonObj.music.description,
          title: jsonObj.music.title,
          musicUrl: jsonObj.music.musicurl,
          hqMusicUrl: jsonObj.music.hqmusicurl
        }
    } catch (err) {
         console.log('err: ' + err)
         return cb(null, nofindmsg);
    }
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    // 则会生成图文列表
    return cb(null, result);
  });
};


/**
 * 搜索快递
 *
 * @param  {String}   keyword 关键词
 * @param  {Function} cb            回调函数
 * @param  {Error}    cb.err        错误信息
 * @param  {String}   cb.result     查询结果
 */
exports.search_kd = function(keyword, cb){
  log('searching: %s', keyword);
  var options = {
    url: 'http://findme.jhost.cn/php/kuaidi100/get.php?nu='+keyword.trim(),
    timeout: mytimeout,
	//url: 'http://51anygo.sinaapp.com/kuaidi100/get.php?nu='+keyword.trim(),
    qs: {
    }
  };
  //console.log('options: ' + options.url);
  request.get(options, function(err, res, body){
    if (err || !body){
      return cb(null, '现在暂时无法搜索，待会儿再来好吗？');
    }
    //var regex = /comCode/gi;
    var i = 1;

    //var m = regex.exec(body);

    var result;
    //console.log("body:",body);
	result = body;
    if(result.match("异常") || result.match("错误") ){
        //console.log("body:",body);
        result = [{
            pic: 'http://findme.jhost.cn/php/cry.jpg',
            url: 'http://m.46644.com/tool/express/?tpltype=weixin',
            title: '快递号无法智能查找,点击链接指定快递公司查找！',
            description: ''
        }];
    }
	//console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
	var pageData = "";
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        pageData += chunk;
    });
 
    res.on('end', function(){
        console.log(pageData);
        //这里处理抓取到的数据
    });
    /*if (m.length) {
      result = '在百度搜索:' + keyword +',得到以下结果：\n' 
      result = res;
    } else {
      result = '搜不到任何结果呢';
    }*/

    // result 会直接作为
    // robot.reply() 的返回值
    //
    // 如果返回的是一个数组：
    // result = [{
    //   pic: 'http://img.xxx....',
    //   url: 'http://....',
    //   title: '这个搜索结果是这样的',
    //   description: '哈哈哈哈哈....'
    // }];
    //
    // 则会生成图文列表
    return cb(null, result);
  });
};


/**
 * 搜索百度
 *
 * @param  {String}   keyword 关键词
 * @param  {Function} cb            回调函数
 * @param  {Error}    cb.err        错误信息
 * @param  {String}   cb.result     查询结果
 */
exports.search = function(keyword, cb){
  log('searching: %s', keyword);
  var options = {
    url: 'http://www.baidu.com/s',
    timeout: mytimeout,
    qs: {
      wd: keyword
    }
  };
  request.get(options, function(err, res, body){
    if (err || !body){
      return cb(null, '现在暂时无法搜索，待会儿再来好吗？');
    }
    var regex = /<h3 class="t">\s*(<a.*?>.*?<\/a>).*?<\/h3>/gi;
    var links = [];
    var i = 1;

    while (true) {
      var m = regex.exec(body);
      if (!m || i > 5) break;
      links.push(i + '. ' + m[1]);
      i++;
    }

    var result;
    if (links.length) {
      result = '在百度搜索:' + keyword +',得到以下结果：\n' + links.join('\n');
      result = result.replace(/\s*data-click=".*?"/gi,  '');
      result = result.replace(/\s*onclick=".*?"/gi,  '');
      result = result.replace(/\s*target=".*?"/gi,  '');
      result = result.replace(/<em>(.*?)<\/em>/gi,  '$1');
      result = result.replace(/<font.*?>(.*?)<\/font>/gi,  '$1');
      result = result.replace(/<span.*?>(.*?)<\/span>/gi,  '$1');
    } else {
      result = '搜不到任何结果呢';
    }

    // result 会直接作为
    // robot.reply() 的返回值
    //
    // 如果返回的是一个数组：
    // result = [{
    //   pic: 'http://img.xxx....',
    //   url: 'http://....',
    //   title: '这个搜索结果是这样的',
    //   description: '哈哈哈哈哈....'
    // }];
    //
    // 则会生成图文列表
    return cb(null, result);
  });
};

/**
 * 下载图片
 *
 * 注意:只是简陋的实现,不负责检测下载是否正确,实际应用还需要检查statusCode.
 * @param  {String} url  目标网址
 * @param  {String} path 保存路径
 */
exports.download = function(url, stream){
  log('downloading %s a stream', url);
  return request(url).pipe(stream);
};
