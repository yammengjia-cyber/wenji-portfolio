export const festivals = [
  {
    id: 1,
    title: '泼水节',
    location: '中国·云南省',
    dateRange: '4月15-17',
    tag: '节日庆祝',
    image: '/images/festival-songkran-new.jpg',
  },
  {
    id: 2,
    title: '音乐节',
    location: '中国·上海市',
    dateRange: '4月19-22',
    tag: '文化体验',
    image: '/images/festival-music-new.png',
  },
];

export const tripRecommendation = {
  from: '昆明',
  to: '西双版纳',
  days: 3,
  mapImage: '/images/culture-vyufu.png',
};

export const culturalSpots = [
  {
    id: 1,
    title: '约旦佩特拉古城',
    image: '/images/culture-bsi.png',
  },
  {
    id: 2,
    title: '上海老城区',
    image: '/images/culture-cqwd.png',
  },
  {
    id: 3,
    title: '云南大理古城',
    image: '/images/culture-cseo.png',
  },
];

export const myTrips = [
  {
    id: 1,
    title: '云南·西双版纳',
    daysAgo: '28 天前',
    image: '/images/trip-yunnan.png',
  },
  {
    id: 2,
    title: '江西·景德镇',
    daysAgo: '45天前',
    image: '/images/trip-jingdezhen.png',
  },
];

export const communityPosts = [
  {
    id: 1,
    user: '安妮',
    avatar: '/images/guest-experience.png',
    time: '18 分钟前',
    image: '/images/community-post-1.png',
    location: '云南省大理白市马鞍山乡',
    likes: 395,
  },
  {
    id: 2,
    user: '梅琳达',
    avatar: '/images/culture-weaving.png',
    time: '19 分钟前',
    image: '/images/community-post-2.png',
    location: '贵州省黔东南苗族侗族自治州',
    likes: 218,
  },
];

export const culturalProducts = [
  {
    id: 1,
    title: '绣花工艺布面画框',
    location: '中国·云南·大理',
    rating: 4.0,
    image: '/images/product-gallery.png',
    description: '白族缝纫的最大特色在于精细的手工针脚与色彩鲜明的拼接。他们将刺绣与缝纫结合，融入蝴蝶、梅花、波浪纹、太阳纹等寓意吉祥的图案',
  },
  {
    id: 2,
    title: '扎染手工体验',
    location: '中国·云南·大理',
    rating: 4.5,
    image: '/images/culture-weaving.png',
    description: '体验传统白族扎染工艺，制作属于自己的扎染作品',
  },
  {
    id: 3,
    title: '陶艺体验工坊',
    location: '中国·江西·景德镇',
    rating: 4.8,
    image: '/images/culture-pottery.png',
    description: '景德镇千年制瓷技艺，亲手制作一件瓷器',
  },
];

export const productItems = [
  { id: 1, image: '/images/product-ciuxiu.png', title: '刺绣团扇' },
  { id: 2, image: '/images/product-lanran.png', title: '蓝染布艺' },
  { id: 3, image: '/images/product-zhubian.jpg', title: '竹编花篮' },
  { id: 4, image: '/images/product-taoci.jpg', title: '手工陶瓷' },
];

export const activityDetail = {
  id: 1,
  title: '白族扎染体验',
  location: '中国·云南省·大理市',
  rating: 4.2,
  difficulty: '新手',
  groupSize: '4-6 人',
  duration: '2 小时',
  price: 98,
  priceUnit: '2小时',
  tags: ['商品购买', '文化介绍', '手工制作', '作品携带'],
  images: [
    '/images/activity-hero-dali.png',
    '/images/hero-textile.png',
  ],
  activityPhotos: [
    '/images/culture-weaving.png',
    '/images/culture-vsre.png',
    '/images/culture-dwwanuie.png',
  ],
  relatedSpots: [
    { title: '白族土家村', image: '/images/culture-bsi.png' },
    { title: '白族特色乐器', image: '/images/culture-djn.png' },
    { title: '崇圣寺', image: '/images/culture-cseo.png' },
    { title: '古城集市', image: '/images/culture-cqwd.png' },
  ],
};

export const itineraryDays = [
  {
    day: 1,
    items: ['到达大理', '游览大理古城，体验当地特色美食'],
  },
  {
    day: 2,
    items: ['参观少数民族博物馆：了解白族文化', '了解少数民族文化'],
  },
  {
    day: 3,
    items: ['体验白编制染工艺', '学习了解竹麻编织技能以及其文化背景'],
  },
  {
    day: 4,
    items: ['学习如何制作扎染和制作连衣裙', '买有趣制作的材料和手工的工艺品', '回程'],
  },
];

export const planTags = [
  { label: '预算', selected: false, size: 'sm' },
  { label: '3-5 天', selected: true, size: 'md' },
  { label: '朋友出行', selected: false, size: 'md' },
  { label: '独特体验', selected: true, size: 'lg' },
  { label: '年轻', selected: true, size: 'sm' },
  { label: '放松旅行', selected: false, size: 'md' },
  { label: '文化主题', selected: true, size: 'md' },
  { label: '度假', selected: false, size: 'sm' },
  { label: '1-2 天', selected: false, size: 'sm' },
  { label: '儿童', selected: false, size: 'md' },
  { label: '家庭', selected: false, size: 'sm' },
  { label: '美食', selected: false, size: 'md' },
  { label: '摄影', selected: false, size: 'sm' },
  { label: '民宿', selected: true, size: 'md' },
  { label: '手工艺', selected: false, size: 'lg' },
  { label: '编织', selected: false, size: 'sm' },
  { label: '扎染', selected: true, size: 'md' },
  { label: '知识科普', selected: false, size: 'md' },
  { label: '表演', selected: false, size: 'sm' },
  { label: '习俗', selected: false, size: 'sm' },
  { label: '3-5天', selected: false, size: 'md' },
];

export const lucyTripPlan = {
  user: '露西',
  duration: '已在此3个月',
  avatar: '/images/guest-experience.png',
  photos: ['/images/woodcarving-1.png', '/images/woodcarving-2.png'],
  date: '2024.4.13',
  location: '海南省·文昌市',
  schedule: [
    {
      step: 1,
      title: '参观',
      time: '9:30-11:00',
      description: '了解木雕文化\n参观许多木雕工艺品',
      image: '/images/woodcarving-1.png',
    },
    {
      step: 2,
      title: '学习',
      time: '1:30-3:00',
      description: '了解木雕的基本技能\n学习基本的工具使用和技术',
      image: '/images/woodcarving-2.png',
    },
    {
      step: 3,
      title: '体验',
      time: '3:00-5:00',
      description: '制作一件完整的手工制品\n获得成就感',
      image: '/images/culture-weaving.png',
    },
  ],
};
