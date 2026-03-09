export const services = [
  {
    id: 'classic-60',
    nameRu: 'Классический массаж',
    nameEn: 'Classic Massage',
    descRu: 'Глубокая проработка мышц и триггерных точек для снятия зажимов, восстановления подвижности и улучшения кровообращения.',
    descEn: 'Deep work on muscles and trigger points to release tension, restore mobility and improve blood circulation.',
    duration: 60,
    price: 2200,
    category: 'classic',
    dikidiWidget: '205593',
    image: 'https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/jmbysf4d_%D0%A4%D0%BE%D1%82%D0%BE01.jpg'
  },
  {
    id: 'classic-90',
    nameRu: 'Классический массаж',
    nameEn: 'Classic Massage',
    descRu: 'Глубокая проработка мышц и триггерных точек для снятия зажимов, восстановления подвижности и улучшения кровообращения.',
    descEn: 'Deep work on muscles and trigger points to release tension, restore mobility and improve blood circulation.',
    duration: 90,
    price: 2700,
    category: 'classic',
    dikidiWidget: '205594',
    image: 'https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/jmbysf4d_%D0%A4%D0%BE%D1%82%D0%BE01.jpg'
  },
  {
    id: 'relaxing-60',
    nameRu: 'Расслабляющий массаж',
    nameEn: 'Relaxation Massage',
    descRu: 'Мягкая техника для полного погружения в состояние покоя. Снимает стресс, помогает телу и разуму отдохнуть, улучшает сон и дарит ощущение лёгкости после напряжённой недели. Позвольте себе наконец выдохнуть.',
    descEn: 'Deep work on muscles and trigger points to release tension, restore mobility and improve blood circulation.',
    duration: 60,
    price: 2000,
    category: 'relaxing',
    dikidiWidget: '205595',
    image: 'https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/zl2je0hz_%D0%A4%D0%BE%D1%82%D0%BE02.jpg'
  },
  {
    id: 'relaxing-90',
    nameRu: 'Расслабляющий массаж',
    nameEn: 'Relaxation Massage',
    descRu: 'Мягкая техника для полного погружения в состояние покоя. Снимает стресс, помогает телу и разуму отдохнуть, улучшает сон и дарит ощущение лёгкости после напряжённой недели. Позвольте себе наконец выдохнуть.',
    descEn: 'Deep work on muscles and trigger points to release tension, restore mobility and improve blood circulation.',
    duration: 90,
    price: 2500,
    category: 'relaxing',
    dikidiWidget: '205596',
    image: 'https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/zl2je0hz_%D0%A4%D0%BE%D1%82%D0%BE02.jpg'
  },
  {
    id: 'facial',
    nameRu: 'Массаж лица',
    nameEn: 'Facial Massage',
    descRu: 'Деликатная проработка лица для снятия отёков и улучшения тонуса кожи',
    descEn: 'Gentle facial work to reduce puffiness and improve skin tone',
    duration: 60,
    price: 1600,
    category: 'facial',
    dikidiWidget: '205597',
    image: 'https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/8cdj8xgp_%D0%A4%D0%BE%D1%82%D0%BE3.jpg'
  },
  {
    id: 'body-therapy',
    nameRu: 'Телесная терапия',
    nameEn: 'Body Therapy',
    descRu: 'Комплексная работа с телом и лицом для полного восстановления ресурса',
    descEn: 'Comprehensive body and face work for complete resource restoration',
    detailsRu: [
      'Массаж всего тела с пульсационными элементами для глубокого расслабления (Палсинг)',
      'Авторская медитация',
      'Массаж лица',
      'Чай в зоне отдыха'
    ],
    detailsEn: [
      'Full body massage with pulsation elements for deep relaxation (Pulsing)',
      'Guided meditation',
      'Facial massage',
      'Tea in relaxation area'
    ],
    duration: 120,
    price: 4000,
    category: 'therapy',
    dikidiWidget: '205598',
    image: 'https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/0vjqt8d7_%D0%A4%D0%BE%D1%82%D0%BE04.jpg'
  },
  {
    id: 'body-therapy-couple',
    nameRu: 'Телесная терапия для двоих',
    nameEn: 'Body Therapy for Two',
    descRu: 'Совместная практика для восстановления ресурса и снятия напряжения в комфортной, приватной атмосфере.',
    descEn: 'Joint practice for resource restoration and tension relief in a comfortable, private atmosphere.',
    detailsRu: [
      'Массаж всего тела с пульсационными элементами для глубокого расслабления (Палсинг)',
      'Авторская медитация',
      'Массаж лица',
      'Чай в зоне отдыха'
    ],
    detailsEn: [
      'Full body massage with pulsation elements for deep relaxation (Pulsing)',
      'Guided meditation',
      'Facial massage',
      'Tea in relaxation area'
    ],
    duration: 120,
    price: 8000,
    category: 'therapy-couple',
    dikidiWidget: '205599',
    image: 'https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/ldpxmia4_%D0%A4%D0%BE%D1%82%D0%BE05.jpg'
  }
];

export const subscriptions = [
  // Классический массаж - 60 мин (обычная цена 2,200₽)
  // 3 visits: -200₽, 5 visits: -250₽, 10 visits: -300₽
  {
    id: 'sub-classic-60-3',
    nameRu: 'Классический массаж',
    nameEn: 'Classic Massage',
    visits: 3,
    duration: 60,
    price: 6000,
    pricePerSession: 2000,
    regularPrice: 6600,
    savings: 600,
    category: 'classic'
  },
  {
    id: 'sub-classic-60-5',
    nameRu: 'Классический массаж',
    nameEn: 'Classic Massage',
    visits: 5,
    duration: 60,
    price: 9750,
    pricePerSession: 1950,
    regularPrice: 11000,
    savings: 1250,
    category: 'classic'
  },
  {
    id: 'sub-classic-60-10',
    nameRu: 'Классический массаж',
    nameEn: 'Classic Massage',
    visits: 10,
    duration: 60,
    price: 19000,
    pricePerSession: 1900,
    regularPrice: 22000,
    savings: 3000,
    category: 'classic'
  },
  // Классический массаж - 90 мин (обычная цена 2,700₽)
  {
    id: 'sub-classic-90-3',
    nameRu: 'Классический массаж',
    nameEn: 'Classic Massage',
    visits: 3,
    duration: 90,
    price: 7500,
    pricePerSession: 2500,
    regularPrice: 8100,
    savings: 600,
    category: 'classic'
  },
  {
    id: 'sub-classic-90-5',
    nameRu: 'Классический массаж',
    nameEn: 'Classic Massage',
    visits: 5,
    duration: 90,
    price: 12250,
    pricePerSession: 2450,
    regularPrice: 13500,
    savings: 1250,
    category: 'classic'
  },
  {
    id: 'sub-classic-90-10',
    nameRu: 'Классический массаж',
    nameEn: 'Classic Massage',
    visits: 10,
    duration: 90,
    price: 24000,
    pricePerSession: 2400,
    regularPrice: 27000,
    savings: 3000,
    category: 'classic'
  },
  // Расслабляющий массаж - 60 мин (обычная цена 2,000₽)
  {
    id: 'sub-relaxing-60-3',
    nameRu: 'Расслабляющий массаж',
    nameEn: 'Relaxation Massage',
    visits: 3,
    duration: 60,
    price: 5400,
    pricePerSession: 1800,
    regularPrice: 6000,
    savings: 600,
    category: 'relaxing'
  },
  {
    id: 'sub-relaxing-60-5',
    nameRu: 'Расслабляющий массаж',
    nameEn: 'Relaxation Massage',
    visits: 5,
    duration: 60,
    price: 8750,
    pricePerSession: 1750,
    regularPrice: 10000,
    savings: 1250,
    category: 'relaxing'
  },
  {
    id: 'sub-relaxing-60-10',
    nameRu: 'Расслабляющий массаж',
    nameEn: 'Relaxation Massage',
    visits: 10,
    duration: 60,
    price: 17000,
    pricePerSession: 1700,
    regularPrice: 20000,
    savings: 3000,
    category: 'relaxing'
  },
  // Расслабляющий массаж - 90 мин (обычная цена 2,500₽)
  {
    id: 'sub-relaxing-90-3',
    nameRu: 'Расслабляющий массаж',
    nameEn: 'Relaxation Massage',
    visits: 3,
    duration: 90,
    price: 6900,
    pricePerSession: 2300,
    regularPrice: 7500,
    savings: 600,
    category: 'relaxing'
  },
  {
    id: 'sub-relaxing-90-5',
    nameRu: 'Расслабляющий массаж',
    nameEn: 'Relaxation Massage',
    visits: 5,
    duration: 90,
    price: 11250,
    pricePerSession: 2250,
    regularPrice: 12500,
    savings: 1250,
    category: 'relaxing'
  },
  {
    id: 'sub-relaxing-90-10',
    nameRu: 'Расслабляющий массаж',
    nameEn: 'Relaxation Massage',
    visits: 10,
    duration: 90,
    price: 22000,
    pricePerSession: 2200,
    regularPrice: 25000,
    savings: 3000,
    category: 'relaxing'
  }
];

export const masters = [
  {
    id: 'master-1',
    nameRu: 'Наталья',
    nameEn: 'Natalya',
    specializationRu: 'Специалист по комплексному восстановлению тела и психики',
    specializationEn: 'Specialist in comprehensive body and mind recovery',
    bioRu: null,
    bioEn: null,
    bioDetailsRu: [
      'Медитативное расслабление',
      'Точечную глубокую проработку мышечных триггеров'
    ],
    bioDetailsEn: [
      'Meditative relaxation',
      'Precise deep work on muscle triggers'
    ],
    bioIntroRu: 'В работе сочетает:',
    bioIntroEn: 'Combines in practice:',
    image: 'https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/9ib6h8ej_%D0%9D%D0%B0%D1%82%D0%B0%D0%BB%D1%8C%D1%8F.jpg',
    dikidiWidget: '205600'
  },
  {
    id: 'master-2',
    nameRu: 'Милана',
    nameEn: 'Milana',
    specializationRu: '',
    specializationEn: '',
    bioRu: null,
    bioEn: null,
    bioDetailsRu: [
      'Нежность и плавность — помогает вам отпустить тревоги и погрузиться в состояние покоя.',
      'Силу и точность — прорабатывает каждую напряжённую зону, возвращая телу лёгкость.'
    ],
    bioDetailsEn: [
      'Gentleness and fluidity — helps you let go of anxiety and immerse in a state of calm.',
      'Strength and precision — works through every tense area, restoring lightness to the body.'
    ],
    bioIntroRu: 'В своей практике сочетает:',
    bioIntroEn: 'Combines in practice:',
    image: 'https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/u3c5l9x0_%D0%90%D0%BB%D0%B5%D0%BD%D0%B0.jpg',
    dikidiWidget: '205601'
  }
];

export const BOOKING_URL = 'https://dikidi.net/#widget=205592';
