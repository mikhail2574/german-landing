export type Locale = "ua" | "ru";

export type ScarcityModel = {
  label: string;
  seatsLeft: number;
  totalSeats: number;
  startDate: string;
  note: string;
};

export type MiniCourse = {
  id: string;
  title: string;
  subtitle: string;
  tagChips: string[];
  durationWeeks: number;
  sessionsPerWeek: number;
  sessionLengthMin: number;
  outcome: string;
  outcomePoints: string[];
  forWhom: string;
  inside: string[];
  deliverables: string[];
  notFor: string;
  cta: string;
};

export type LandingModel = {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  nav: {
    story: string;
    groups: string;
    miniCourses: string;
    faq: string;
    checklist: string;
    primaryCta: string;
  };
  topUrgency: {
    badge: string;
    text: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustPills: string[];
  };
  pass: {
    label: string;
    stamp: string;
    startLabel: string;
    scheduleLabel: string;
    formatLabel: string;
    schedule: string;
    format: string;
    pricing: {
      promoLabel: string;
      oldPrice: string;
      newPrice: string;
      moduleLabel: string;
      onlinePrice: string;
    };
    statusLine: string;
  };
  story: {
    label: string;
    title: string;
    subtitle: string;
    moments: Array<{
      title: string;
      text: string;
      action: string;
    }>;
  };
  groups: {
    label: string;
    title: string;
    subtitle: string;
    startLabel: string;
    scheduleLabel: string;
    formatLabel: string;
    seatsSuffix: string;
    cards: Array<{
      id: string;
      level: string;
      schedule: string;
      format: string;
      scarcity: ScarcityModel;
    }>;
    pricing: {
      promoLabel: string;
      oldPrice: string;
      newPrice: string;
      moduleLabel: string;
      onlinePrice: string;
    };
    primaryCta: string;
    helper: string;
  };
  miniCourses: {
    label: string;
    title: string;
    subtitle: string;
    helperText: string;
    pricing: {
      student: number;
      external: number;
    };
    requiresLevel: string;
    format: string;
    pricingStudentLabel: string;
    pricingExternalLabel: string;
    entryLabel: string;
    diagnosticsNote: string;
    eligibilityTitle: string;
    eligibilityStudent: string;
    eligibilityExternal: string;
    cards: MiniCourse[];
  };
  founder: {
    label: string;
    title: string;
    role: string;
    metaLine: string;
    text: string;
    bullets: string[];
  };
  checklist: {
    label: string;
    title: string;
    subtitle: string;
    benefits: string[];
    emailLabel: string;
    telegramLabel: string;
    submit: string;
    buttonHint: string;
    privacy: string;
    submitting: string;
    success: string;
    submitError: string;
    channelUrl: string;
    channelModalTitle: string;
    channelModalText: string;
    channelModalCta: string;
    channelModalClose: string;
    invalidEmail: string;
    missingEmail: string;
  };
  form: {
    title: string;
    subtitle: string;
    level: string;
    format: string;
    time: string;
    city: string;
    cityPlaceholder: string;
    levelOptions: Array<{ id: string; label: string }>;
    formatOptions: Array<{ id: string; label: string }>;
    timeOptions: Array<{ id: string; label: string }>;
    fields: {
      email: string;
      telegram: string;
      name: string;
    };
    placeholders: {
      email: string;
      telegram: string;
      name: string;
    };
    stepLevelFormat: string;
    stepContacts: string;
    stepAddons: string;
    stepConfirm: string;
    addonsTitle: string;
    addonsHint: string;
    addonsDisabledHint: string;
    addonsReviewHint: string;
    addonsSelectedLabel: string;
    noAddons: string;
    submit: string;
    submitting: string;
    contactHint: string;
    responseSla: string;
    contactError: string;
    invalidEmail: string;
    submitError: string;
    consentText: string;
    consentError: string;
    successTitle: string;
    successText: string;
    successCta: string;
  };
  faq: {
    label: string;
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  contacts: {
    email: string;
    telegram: string;
    location: string;
    response: string;
  };
  footer: {
    legal: string;
    contactLine: string;
    links: {
      impressum: string;
      privacy: string;
      contact: string;
    };
  };
};

const commonMiniCoursesUa: MiniCourse[] = [
  {
    id: "mini-med",
    title: "Німецька для лікаря: запис + симптоми + план лікування",
    subtitle: "Arztpraxis без стресу: телефон, реєстратура, уточнення",
    tagChips: ["Arzt", "Telefon", "Termin", "4w"],
    durationWeeks: 4,
    sessionsPerWeek: 1,
    sessionLengthMin: 90,
    outcome:
      "За 4 тижні ви самостійно проходите базовий медичний діалог: від запису до уточнення плану лікування.",
    outcomePoints: [
      "Записуєтесь на Termin телефоном або онлайн.",
      "Описуєте симптоми та уточнюєте призначення.",
      "Розумієте інструкції після прийому і вмієте перепитати.",
    ],
    forWhom:
      "Для тих, хто хоче самостійно записуватись і чітко пояснювати симптоми.",
    inside: [
      "Скрипти дзвінків + рольові діалоги Arzt–Patient з фідбеком.",
      "Лексика симптомів, аналізів, дозування, повторний Termin.",
      "Мікро-граматика під задачі (питання, модальні, порядок слів).",
    ],
    deliverables: [
      "Шаблони фраз для дзвінків і прийому",
      "Чекліст ‘що сказати/спитати’ у лікаря",
    ],
    notFor:
      "Не підійде, якщо у вас рівень нижче A2 або ви очікуєте тільки теорію без розмовної практики.",
    cta: "Деталі та умови",
  },
  {
    id: "mini-bureau",
    title: "Німецька для Jobcenter та Behörden: листи + відповіді + дзвінки",
    subtitle: "Briefe без паніки: Frist, Termin, Nachweise",
    tagChips: ["Jobcenter", "Behörde", "Briefe", "4w"],
    durationWeeks: 4,
    sessionsPerWeek: 1,
    sessionLengthMin: 90,
    outcome:
      "За 4 тижні ви ведете базову комунікацію з Jobcenter/Behörde без хаосу: листи, короткі відповіді та дзвінки.",
    outcomePoints: [
      "Читаєте листи та одразу розумієте потрібну дію.",
      "Пишете короткі офіційні відповіді за шаблоном.",
      "Телефонуєте й фіксуєте домовленості.",
    ],
    forWhom: "Для тих, хто хоче самостійно вести справи без перекладача.",
    inside: [
      "Розбір реальних листів: Frist, Termin, Nachweise.",
      "Шаблони email/листів + короткі офіційні формулювання.",
      "Сценарії дзвінків: статус, перенесення Termin, уточнення документів.",
    ],
    deliverables: ["Чеклісти по документах", "Шаблони відповідей (email/лист)"],
    notFor:
      "Не підійде, якщо у вас рівень нижче A2 або ви шукаєте лише разовий «переклад листа» без системної практики.",
    cta: "Деталі та умови",
  },
  {
    id: "mini-work",
    title:
      "Німецька для роботи та співбесіди: фрази, статуси, Selbstvorstellung",
    subtitle: "Arbeitsalltag + Bewerbung без тупняку",
    tagChips: ["Bewerbung", "Arbeit", "Interview", "4w"],
    durationWeeks: 4,
    sessionsPerWeek: 1,
    sessionLengthMin: 90,
    outcome:
      "За 4 тижні ви впевнено проводите базову робочу комунікацію: статуси, уточнення задач і коротка самопрезентація.",
    outcomePoints: [
      "Робите коротку Selbstvorstellung і відповідаєте на базові питання.",
      "Уточнюєте задачі, дедлайни і зміни в команді.",
      "Пишете робочі повідомлення без зайвого стресу.",
    ],
    forWhom:
      "Для тих, хто виходить на ринок праці або хоче рости в поточній роботі.",
    inside: [
      "Структура: Lebenslauf, мотиваційний лист, типові питання.",
      "Робочі міні-сценарії: передача задачі, апдейт статусу, запит уточнення.",
      "Симуляція співбесіди з персональним фідбеком.",
    ],
    deliverables: [
      "Шаблони фраз для роботи/чатів",
      "Скелет Selbstvorstellung + Q&A",
    ],
    notFor:
      "Не підійде, якщо у вас рівень нижче A2 або вам потрібна тільки граматика без рольових сценаріїв.",
    cta: "Деталі та умови",
  },
];

const commonMiniCoursesRu: MiniCourse[] = [
  {
    id: "mini-med",
    title: "Немецкий для врача: запись + симптомы + план лечения",
    subtitle: "Arztpraxis без стресса: телефон, регистратура, уточнения",
    tagChips: ["Arzt", "Telefon", "Termin", "4w"],
    durationWeeks: 4,
    sessionsPerWeek: 1,
    sessionLengthMin: 90,
    outcome:
      "За 4 недели вы самостоятельно проходите базовый медицинский диалог: от записи до уточнения плана лечения.",
    outcomePoints: [
      "Записываетесь на Termin по телефону или онлайн.",
      "Описываете симптомы и уточняете назначения.",
      "Понимаете инструкции после приема и умеете переспросить.",
    ],
    forWhom:
      "Для тех, кто хочет самостоятельно записываться и четко объяснять симптомы.",
    inside: [
      "Скрипты звонков + ролевые диалоги Arzt–Patient с фидбеком.",
      "Лексика симптомов, анализов, дозировки, повторный Termin.",
      "Микро-грамматика под задачи (вопросы, модальные, порядок слов).",
    ],
    deliverables: [
      "Шаблоны фраз для звонков и приема",
      "Чеклист «что сказать/спросить» у врача",
    ],
    notFor:
      "Не подойдет, если у вас уровень ниже A2 или вы ожидаете только теорию без разговорной практики.",
    cta: "Детали и условия",
  },
  {
    id: "mini-bureau",
    title: "Немецкий для Jobcenter и Behörden: письма + ответы + звонки",
    subtitle: "Briefe без паники: Frist, Termin, Nachweise",
    tagChips: ["Jobcenter", "Behörde", "Briefe", "4w"],
    durationWeeks: 4,
    sessionsPerWeek: 1,
    sessionLengthMin: 90,
    outcome:
      "За 4 недели вы ведете базовую коммуникацию с Jobcenter/Behörde без хаоса: письма, короткие ответы и звонки.",
    outcomePoints: [
      "Читаете письма и сразу понимаете нужное действие.",
      "Пишете короткие официальные ответы по шаблону.",
      "Звоните и фиксируете договоренности.",
    ],
    forWhom: "Для тех, кто хочет самостоятельно вести вопросы без переводчика.",
    inside: [
      "Разбор реальных писем: Frist, Termin, Nachweise.",
      "Шаблоны email/писем + короткие официальные формулировки.",
      "Сценарии звонков: статус, перенос Termin, уточнение документов.",
    ],
    deliverables: ["Чеклисты по документам", "Шаблоны ответов (email/письмо)"],
    notFor:
      "Не подойдет, если у вас уровень ниже A2 или вам нужен только разовый «перевод письма» без системной практики.",
    cta: "Детали и условия",
  },
  {
    id: "mini-work",
    title:
      "Немецкий для работы и собеседования: фразы, статусы, Selbstvorstellung",
    subtitle: "Arbeitsalltag + Bewerbung без ступора",
    tagChips: ["Bewerbung", "Arbeit", "Interview", "4w"],
    durationWeeks: 4,
    sessionsPerWeek: 1,
    sessionLengthMin: 90,
    outcome:
      "За 4 недели вы уверенно проводите базовую рабочую коммуникацию: статусы, уточнение задач и короткая самопрезентация.",
    outcomePoints: [
      "Делаете короткую Selbstvorstellung и отвечаете на базовые вопросы.",
      "Уточняете задачи, дедлайны и изменения в команде.",
      "Пишете рабочие сообщения без лишнего стресса.",
    ],
    forWhom:
      "Для тех, кто выходит на рынок труда или хочет расти в текущей работе.",
    inside: [
      "Структура: Lebenslauf, мотивационное письмо, типовые вопросы.",
      "Рабочие мини-сценарии: передача задачи, апдейт статуса, запрос уточнения.",
      "Симуляция собеседования с персональным фидбеком.",
    ],
    deliverables: [
      "Шаблоны фраз для работы и чатов",
      "Скелет Selbstvorstellung + Q&A",
    ],
    notFor:
      "Не подойдет, если у вас уровень ниже A2 или вам нужна только грамматика без ролевых сценариев.",
    cta: "Детали и условия",
  },
];

export const landingContent: Record<Locale, LandingModel> = {
  ua: {
    meta: {
      title: "Deutsch fur Leben | Німецька для інтеграції в Німеччині",
      description:
        "Практичні групи A1-B1 + міні-курси для Jobcenter, Arzt та роботи. Старт найближчого потоку 21.02, залишилось 4 місця.",
      ogLocale: "uk_UA",
    },
    nav: {
      story: "Як проходить інтеграція",
      groups: "Групи",
      miniCourses: "Міні-курси",
      faq: "FAQ",
      checklist: "Чекліст",
      primaryCta: "Приєднатися до групи",
    },
    topUrgency: {
      badge: "Набір відкрито",
      text: "A1.1 стартує вже 01.03!",
      cta: "Забронювати місце",
    },
    hero: {
      eyebrow: "Integration Pass для життя в Німеччині",
      title:
        "Німецька, яка проходить через Jobcenter, Behörde та реальну роботу",
      subtitle:
        "Один маршрут без хаосу: A1 -> A2 -> B1. Ми вчимо не теорію заради теорії, а дії: Termin (запис), листи, дзвінки, робочі розмови.",
      primaryCta: "Приєднатися до групи",
      secondaryCta: "Отримати чекліст",
      trustPills: [
        "До 8 людей у групі",
        "Online по Німеччині",
        "Офiс в Лейпцигу",
      ],
    },
    pass: {
      label: "A1.1 - виживання",
      stamp: "",
      startLabel: "Старт",
      scheduleLabel: "Розклад",
      formatLabel: "Формат",
      schedule: "Пн / Ср / Пт, 18:30 - 6 недiль",
      format: "Офлайн в Лейпцигу/онлайн",
      pricing: {
        promoLabel: "Знижка для перших потоків",
        oldPrice: "249 €",
        newPrice: "225 €",
        moduleLabel: "за модуль A1.1 (і далі)",
        onlinePrice: "Online: 199 € за модуль",
      },
      statusLine: "Підтвердження місця протягом 24 годин",
    },
    story: {
      label: "Hero Moment 02",
      title: "Система навчання: 3 кроки щотижня → видимий прогрес",
      subtitle:
        "Пн/Ср/Пт — один цикл: ввели → натренували → застосували. Без «зубріння», з реальними діалогами.",
      moments: [
        {
          title: "Крок 01: Ввід + опора",
          text: "Вивчаємо тему через контекст: 8–12 ключових фраз + 1 граматичний інструмент. Одразу — короткі діалоги.",
          action: "Результат: маєте готовий сценарiй",
        },
        {
          title: "Крок 02: Автоматизація",
          text: "Багато парної практики та рольових ігор. Варіації ситуацій + виправлення типових помилок.",
          action: "Результат: говорите швидше й точніше",
        },
        {
          title: "Крок 03: Інтеграція + впевненість",
          text: "Міні-сценарії на час: з’єднуємо нову тему з попередніми. Фідбек + міні-перевірка без підказок.",
          action: "Результат: проходите діалог самостійно",
        },
      ],
    },
    groups: {
      label: "Hero Moment 03",
      title: "Найближчі групи з реальним дефіцитом місць",
      subtitle: "Єдиний стандарт відбору: рівень + ваш графік.",
      startLabel: "Старт",
      scheduleLabel: "Розклад",
      formatLabel: "Формат",
      seatsSuffix: "місць",
      cards: [
        {
          id: "a1-evening",
          level: "A1.1 / Виживання",
          schedule: "Пн / Ср / Пт, 18:30",
          format: "Офлайн в Лейпцигу",
          scarcity: {
            label: "СТАРТ",
            seatsLeft: 3,
            totalSeats: 8,
            startDate: "01.03",
            note: "Базові діалоги + вимова + домашні шаблони",
          },
        },
        {
          id: "a2-evening",
          level: "A1.1 / Виживання",
          schedule: "Пн / Ср / Пт, 19:45",
          format: "Офлайн в Лейпцигу",
          scarcity: {
            label: "СТАРТ",
            seatsLeft: 8,
            totalSeats: 8,
            startDate: "01.03",
            note: "Базові діалоги + вимова + домашні шаблони",
          },
        },
        {
          id: "b1-dtz",
          level: "A1.1 / Виживання",
          schedule: "Вт / Чт / Сб, 18:30",
          format: "Онлайн",
          scarcity: {
            label: "СТАРТ",
            seatsLeft: 8,
            totalSeats: 8,
            startDate: "08.03",
            note: "Базові діалоги + вимова + домашні шаблони",
          },
        },
      ],
      pricing: {
        promoLabel: "Знижка для перших потоків",
        oldPrice: "249 €",
        newPrice: "225 €",
        moduleLabel: "за модуль A1.1 (і далі)",
        onlinePrice: "Online: 199 € за модуль",
      },
      primaryCta: "Заповнити заявку в групу",
      helper:
        "Ми не продаємо зайве. Після діагностики радимо тільки релевантний потік.",
    },
    miniCourses: {
      label: "Upsell modules",
      title: "Міні-модулі: точкове прокачування під ваші задачі",
      subtitle:
        "Add-on до основної групи без перевантаження: 4 тижні, 1×90 хв/тиждень, шаблони та чеклісти.",
      helperText:
        "Модуль підключається тільки з рівня A2+ — щоб ви реально говорили, а не виживали.",
      pricing: {
        student: 45,
        external: 59,
      },
      requiresLevel: "A2+",
      format: "4 тижні · 1×90 хв/тиждень · Online · шаблони/чеклісти",
      pricingStudentLabel: "для студентів",
      pricingExternalLabel: "для інших",
      entryLabel: "Вхід",
      diagnosticsNote: "Для інших — коротка діагностика перед стартом",
      eligibilityTitle: "Доступ",
      eligibilityStudent:
        "Для студентів школи: 45 € (рівень A2+ або група B1).",
      eligibilityExternal:
        "Для інших: 59 € (потрібен рівень A2+; перед стартом — коротка діагностика).",
      cards: commonMiniCoursesUa,
    },
    founder: {
      label: "Хто веде",
      title: "Михайло, засновник Deutsch für Leben",
      role: "Викладач німецької та куратор інтеграційних маршрутів",
      metaLine: "TELC C1 Hochschule · Leipzig · Online · 3+ роки у викладаннi",
      text: "Я пройшов власний шлях інтеграції в Німеччині у 2022 році, тому знаю, де виникає реальний тиск: Briefe, Termine, Telefonate, Behörde, Jobcenter, Arzt, Arbeit. На заняттях ми працюємо через практичні сценарії та готові шаблони, які ви застосовуєте вже цього ж тижня.",
      bullets: [
        "3+ роки викладання дорослим (малі групи)",
        "Фокус на реальних процесах: Jobcenter, Behörde, Arzt, Arbeit",
        "Щотижневий фідбек + домашні шаблони (листи/діалоги)",
      ],
    },
    checklist: {
      label: "Lead magnet",
      title: "Чеклист: 50 фраз для Jobcenter і дзвінків",
      subtitle: "Залиште контакт — надішлемо PDF за 1 хвилину.",
      benefits: [
        "Фрази для листів + дзвінка",
        "2 e-mail шаблони + скрипт дзвінка",
        "Підходить для рівня A1–A2",
      ],
      emailLabel: "E-Mail",
      telegramLabel: "Telegram (опційно)",
      submit: "Отримати PDF",
      buttonHint: "Без спаму. 1 PDF + 1 сервісне повідомлення.",
      privacy: "Без спаму. 1 PDF + 1 сервісне повідомлення.",
      submitting: "Надсилаємо...",
      success: "PDF надіслано — перевірте пошту",
      submitError:
        "Не вдалося відправити форму. Спробуйте ще раз або напишіть у Telegram.",
      channelUrl: "https://t.me/deutschfuerleben",
      channelModalTitle: "PDF вже в Telegram-каналі школи",
      channelModalText:
        "Ми вже завантажили PDF у Telegram-канал школи німецької. Переходьте за посиланням та забирайте матеріал.",
      channelModalCta: "Перейти в Telegram-канал",
      channelModalClose: "Закрити",
      invalidEmail: "Вкажіть коректний e-mail.",
      missingEmail: "Вкажіть e-mail для відправки чекліста.",
    },
    form: {
      title: "Фінальна заявка на групу",
      subtitle:
        "Один крок: залиште контакти, а модулі-додатки ми вже підставили.",
      level: "Рівень",
      format: "Формат",
      time: "Зручний час",
      city: "Місто",
      cityPlaceholder: "Наприклад, Leipzig",
      levelOptions: [
        { id: "a1", label: "A1 (з нуля)" },
        { id: "a2", label: "A2" },
        { id: "b1", label: "B1 / DTZ" },
      ],
      formatOptions: [
        { id: "online", label: "Онлайн" },
        { id: "mixed", label: "Офлайн" },
      ],
      timeOptions: [
        { id: "morning", label: "Ранок" },
        { id: "evening", label: "Вечір" },
        { id: "weekend", label: "Вихідні" },
      ],
      fields: {
        email: "E-Mail",
        telegram: "Telegram",
        name: "Ім'я",
      },
      placeholders: {
        email: "name@example.com",
        telegram: "@username",
        name: "Ваше ім'я",
      },
      stepLevelFormat: "Step 1: Оберіть рівень та формат",
      stepContacts: "Step 2: Контакти",
      stepAddons: "Step 3: Міні-курси (add-on)",
      stepConfirm: "Step 4: Підтвердження",
      addonsTitle: "Додаткові міні-курси",
      addonsHint: "Обрані add-ons будуть враховані при підборі групи.",
      addonsDisabledHint:
        "Add-on доступний з рівня A2 або для студентів наших груп (після діагностики).",
      addonsReviewHint:
        "Add-ons додаються до основної заявки. Підтвердимо доцільність після діагностики.",
      addonsSelectedLabel: "Обрано",
      noAddons: "Ще не обрано жодного add-on",
      submit: "Надіслати заявку",
      submitting: "Надсилаємо...",
      contactHint: "Залиште e-mail або Telegram. Можна обидва.",
      responseSla: "Відповідаємо протягом 24 годин (будні).",
      contactError: "Вкажіть e-mail або Telegram.",
      invalidEmail: "Вкажіть коректний e-mail.",
      submitError:
        "Не вдалося відправити заявку. Спробуйте ще раз або напишіть у Telegram.",
      consentText: "Погоджуюся з Datenschutzerklärung та Impressum.",
      consentError: "Підтвердіть згоду перед відправкою.",
      successTitle: "Заявку отримано",
      successText: "Заявку надіслано. Напишемо вам у Telegram або на e-mail.",
      successCta: "Написати в Telegram",
    },
    faq: {
      label: "FAQ",
      title: "Що важливо знати перед стартом",
      items: [
        {
          q: "Як швидко я зможу дійти до B1?",
          a: "У нас кожен рівень поділено на 2 інтенсивні модулі: A1.1, A1.2, A2.1, A2.2, B1.1 і B1.2. Кожен модуль триває 6 тижнів. Разом — 36 тижнів, або приблизно 8 місяців безперервної роботи над собою.",
        },
        {
          q: "Як швидко можна стартувати?",
          a: "Після короткої діагностики зазвичай підбираємо групу протягом 24 годин.",
        },
        {
          q: "Чи можна додати міні-курс пізніше?",
          a: "Так, але модулі з дефіцитом місць краще фіксувати одразу в заявці.",
        },
        {
          q: "Чи підходить формат, якщо я працюю повний день?",
          a: "Так, основні потоки мають вечірні слоти та чітку домашню структуру на 20-40 хвилин на день.",
        },
        {
          q: "Що, якщо рівень ще дуже початковий?",
          a: "Для рівня нижче A1 ми починаємо з базової адаптації і підбираємо максимально простий темп.",
        },
      ],
    },
    contacts: {
      email: "info@deutschfuerleben.de",
      telegram: "@deutschfuerleben",
      location: "Leipzig, Sachsen • online по всій Німеччині",
      response: "Відповідаємо протягом 24 годин",
    },
    footer: {
      legal:
        "Deutsch fur Leben - практичні курси німецької для дорослих у Німеччині.",
      contactLine: "Питання: info@deutschfuerleben.de • @deutschfuerleben",
      links: {
        impressum: "Impressum",
        privacy: "Datenschutzerklarung",
        contact: "Kontakt",
      },
    },
  },
  ru: {
    meta: {
      title: "Deutsch fur Leben | Немецкий для интеграции в Германии",
      description:
        "Практические группы A1-B1 + мини-модули для Jobcenter, Arzt и работы. Старт ближайшего потока 01.03, осталось 3 места.",
      ogLocale: "ru_RU",
    },
    nav: {
      story: "Как проходит интеграция",
      groups: "Группы",
      miniCourses: "Мини-модули",
      faq: "FAQ",
      checklist: "Чеклист",
      primaryCta: "Вступить в группу",
    },
    topUrgency: {
      badge: "Набор открыт",
      text: "A1.1 стартует уже 01.03!",
      cta: "Забронировать место",
    },
    hero: {
      eyebrow: "Integration Pass для жизни в Германии",
      title:
        "Немецкий, который работает в Jobcenter (центр занятости), Behörde (ведомство) и на работе",
      subtitle:
        "Один маршрут без хаоса: A1 -> A2 -> B1. Мы тренируем не теорию ради теории, а действия: Termin (запись), письма, звонки и рабочие диалоги.",
      primaryCta: "Вступить в группу",
      secondaryCta: "Получить чеклист",
      trustPills: [
        "До 8 человек в группе",
        "Online по Германии",
        "Офис в Лейпциге",
      ],
    },
    pass: {
      label: "A1.1 - выживание",
      stamp: "",
      startLabel: "Старт",
      scheduleLabel: "Расписание",
      formatLabel: "Формат",
      schedule: "Пн / Ср / Пт, 18:30 - 6 недель",
      format: "Офлайн в Лейпциге/онлайн",
      pricing: {
        promoLabel: "Скидка для первых потоков",
        oldPrice: "249 €",
        newPrice: "225 €",
        moduleLabel: "за модуль A1.1 (и далее)",
        onlinePrice: "Online: 199 € за модуль",
      },
      statusLine: "Подтверждение места в течение 24 часов",
    },
    story: {
      label: "Этап 02",
      title: "Система обучения: 3 шага каждую неделю → видимый прогресс",
      subtitle:
        "Пн/Ср/Пт — один цикл: ввели → натренировали → применили. Без «зубрежки», с реальными диалогами.",
      moments: [
        {
          title: "Шаг 01: Ввод + опора",
          text: "Изучаем тему через контекст: 8–12 ключевых фраз + 1 грамматический инструмент. Сразу — короткие диалоги.",
          action: "Результат: у вас готовый сценарий",
        },
        {
          title: "Шаг 02: Автоматизация",
          text: "Много парной практики и ролевых игр. Вариации ситуаций + исправление типичных ошибок.",
          action: "Результат: говорите быстрее и точнее",
        },
        {
          title: "Шаг 03: Интеграция + уверенность",
          text: "Мини-сценарии на время: соединяем новую тему с предыдущими. Фидбек + мини-проверка без подсказок.",
          action: "Результат: проходите диалог самостоятельно",
        },
      ],
    },
    groups: {
      label: "Этап 03",
      title: "Ближайшие группы с реальным дефицитом мест",
      subtitle: "Один стандарт подбора: уровень + ваш график.",
      startLabel: "Старт",
      scheduleLabel: "Расписание",
      formatLabel: "Формат",
      seatsSuffix: "мест",
      cards: [
        {
          id: "a1-evening",
          level: "A1.1 / Выживание",
          schedule: "Пн / Ср / Пт, 18:30",
          format: "Офлайн в Лейпциге",
          scarcity: {
            label: "СТАРТ",
            seatsLeft: 3,
            totalSeats: 8,
            startDate: "01.03",
            note: "Базовые диалоги + произношение + домашние шаблоны",
          },
        },
        {
          id: "a2-evening",
          level: "A1.1 / Выживание",
          schedule: "Пн / Ср / Пт, 19:45",
          format: "Офлайн в Лейпциге",
          scarcity: {
            label: "СТАРТ",
            seatsLeft: 8,
            totalSeats: 8,
            startDate: "01.03",
            note: "Базовые диалоги + произношение + домашние шаблоны",
          },
        },
        {
          id: "b1-dtz",
          level: "A1.1 / Выживание",
          schedule: "Вт / Чт / Сб, 18:30",
          format: "Онлайн",
          scarcity: {
            label: "СТАРТ",
            seatsLeft: 8,
            totalSeats: 8,
            startDate: "08.03",
            note: "Базовые диалоги + произношение + домашние шаблоны",
          },
        },
      ],
      pricing: {
        promoLabel: "Скидка для первых потоков",
        oldPrice: "249 €",
        newPrice: "225 €",
        moduleLabel: "за модуль A1.1 (и далее)",
        onlinePrice: "Online: 199 € за модуль",
      },
      primaryCta: "Заполнить заявку в группу",
      helper:
        "Мы не продаем лишнее. После диагностики рекомендуем только релевантный поток.",
    },
    miniCourses: {
      label: "Мини-модули",
      title: "Мини-модули: точечная прокачка под ваши задачи",
      subtitle:
        "Дополнение к основной группе без перегруза: 4 недели, 1×90 мин/неделю, шаблоны и чеклисты.",
      helperText:
        "Модуль подключается только с уровня A2+ — чтобы вы реально говорили, а не выживали.",
      pricing: {
        student: 45,
        external: 59,
      },
      requiresLevel: "A2+",
      format: "4 недели · 1×90 мин/неделю · Online · шаблоны/чеклисты",
      pricingStudentLabel: "для студентов",
      pricingExternalLabel: "для других",
      entryLabel: "Вход",
      diagnosticsNote: "Для других — короткая диагностика перед стартом",
      eligibilityTitle: "Доступ",
      eligibilityStudent:
        "Для студентов школы: 45 € (уровень A2+ или группа B1).",
      eligibilityExternal:
        "Для других: 59 € (нужен уровень A2+; перед стартом — короткая диагностика).",
      cards: commonMiniCoursesRu,
    },
    founder: {
      label: "Кто ведет",
      title: "Михаил, основатель Deutsch für Leben",
      role: "Преподаватель немецкого и куратор интеграционных маршрутов",
      metaLine: "TELC C1 Hochschule · Leipzig · Online · 3+ года преподавания",
      text: "Я прошел собственный путь интеграции в Германии в 2022 году, поэтому знаю, где возникает реальное давление: Briefe, Termine, Telefonate, Behörde, Jobcenter, Arzt, Arbeit. На занятиях мы работаем через практические сценарии и готовые шаблоны, которые вы применяете уже на этой же неделе.",
      bullets: [
        "3+ года преподавания взрослым (малые группы)",
        "Фокус на реальных процессах: Jobcenter, Behörde, Arzt, Arbeit",
        "Еженедельный фидбек + домашние шаблоны (письма/диалоги)",
      ],
    },
    checklist: {
      label: "Чеклист",
      title: "Чеклист: 50 фраз для Jobcenter и звонков",
      subtitle: "Оставьте контакт — отправим PDF за 1 минуту.",
      benefits: [
        "Фразы для писем + звонка",
        "2 e-mail шаблона + скрипт звонка",
        "Подходит для уровня A1–A2",
      ],
      emailLabel: "E-Mail",
      telegramLabel: "Telegram (опционально)",
      submit: "Получить PDF",
      buttonHint: "Без спама. 1 PDF + 1 сервисное сообщение.",
      privacy: "Без спама. Только материал и 1 сервисное сообщение.",
      submitting: "Отправляем...",
      success: "PDF отправлен — проверьте почту",
      submitError:
        "Не удалось отправить форму. Попробуйте еще раз или напишите в Telegram.",
      channelUrl: "https://t.me/deutschfuerleben",
      channelModalTitle: "PDF уже в Telegram-канале школы",
      channelModalText:
        "Мы уже загрузили PDF в Telegram-канал школы немецкого. Переходите по ссылке и забирайте материал.",
      channelModalCta: "Перейти в Telegram-канал",
      channelModalClose: "Закрыть",
      invalidEmail: "Укажите корректный e-mail.",
      missingEmail: "Укажите e-mail для отправки чеклиста.",
    },
    form: {
      title: "Финальная заявка в группу",
      subtitle:
        "Один шаг: оставьте контакты, а модули-добавки мы уже подставили.",
      level: "Уровень",
      format: "Формат",
      time: "Удобное время",
      city: "Город",
      cityPlaceholder: "Например, Leipzig",
      levelOptions: [
        { id: "a1", label: "A1 (с нуля)" },
        { id: "a2", label: "A2" },
        { id: "b1", label: "B1 / DTZ" },
      ],
      formatOptions: [
        { id: "online", label: "Онлайн" },
        { id: "mixed", label: "Оффлайн" },
      ],
      timeOptions: [
        { id: "morning", label: "Утро" },
        { id: "evening", label: "Вечер" },
        { id: "weekend", label: "Выходные" },
      ],
      fields: {
        email: "E-Mail",
        telegram: "Telegram",
        name: "Имя",
      },
      placeholders: {
        email: "name@example.com",
        telegram: "@username",
        name: "Ваше имя",
      },
      stepLevelFormat: "Шаг 1: Выберите уровень и формат",
      stepContacts: "Шаг 2: Контакты",
      stepAddons: "Шаг 3: Мини-модули (дополнение)",
      stepConfirm: "Шаг 4: Подтверждение",
      addonsTitle: "Дополнительные мини-курсы",
      addonsHint: "Выбранные модули-дополнения учтем при подборе группы.",
      addonsDisabledHint:
        "Дополнительный модуль доступен с уровня A2 или для студентов наших групп (после диагностики).",
      addonsReviewHint:
        "Модули-дополнения добавляются к основной заявке. Подтвердим уместность после диагностики.",
      addonsSelectedLabel: "Выбрано",
      noAddons: "Пока не выбрано ни одного доп. модуля",
      submit: "Отправить заявку",
      submitting: "Отправляем...",
      contactHint: "Оставьте e-mail или Telegram. Можно оба.",
      responseSla: "Отвечаем в течение 24 часов (будни).",
      contactError: "Укажите e-mail или Telegram.",
      invalidEmail: "Укажите корректный e-mail.",
      submitError:
        "Не удалось отправить заявку. Попробуйте еще раз или напишите в Telegram.",
      consentText: "Соглашаюсь с Datenschutzerklärung и Impressum.",
      consentError: "Подтвердите согласие перед отправкой.",
      successTitle: "Заявка получена",
      successText: "Заявка отправлена. Напишем вам в Telegram или на e-mail.",
      successCta: "Написать в Telegram",
    },
    faq: {
      label: "FAQ",
      title: "Что важно знать перед стартом",
      items: [
        {
          q: "Как быстро я смогу дойти до B1?",
          a: "У нас каждый уровень разбит на 2 интенсивных модуля: A1.1, A1.2, A2.1, A2.2, B1.1 и B1.2. Каждый модуль длится 6 недель. Итого — 36 недель, или примерно 8 месяцев непрерывной работы над собой.",
        },
        {
          q: "Как быстро можно стартовать?",
          a: "После короткой диагностики обычно подбираем группу в течение 24 часов.",
        },
        {
          q: "Можно добавить мини-курс позже?",
          a: "Да, но модули с дефицитом мест лучше фиксировать сразу в заявке.",
        },
        {
          q: "Подойдет ли формат, если я работаю полный день?",
          a: "Да, основные потоки имеют вечерние слоты и домашнюю структуру на 20-40 минут в день.",
        },
        {
          q: "Что, если уровень пока очень начальный?",
          a: "Для уровня ниже A1 начинаем с базовой адаптации и подбираем максимально мягкий темп.",
        },
      ],
    },
    contacts: {
      email: "info@deutschfuerleben.de",
      telegram: "@deutschfuerleben",
      location: "Leipzig, Sachsen • online по всей Германии",
      response: "Отвечаем в течение 24 часов",
    },
    footer: {
      legal:
        "Deutsch fur Leben - практические курсы немецкого для взрослых в Германии.",
      contactLine: "Вопросы: info@deutschfuerleben.de • @deutschfuerleben",
      links: {
        impressum: "Impressum",
        privacy: "Datenschutzerklarung",
        contact: "Kontakt",
      },
    },
  },
};

export const primaryScarcityByLocale: Record<Locale, ScarcityModel> = {
  ua: {
    label: "A1",
    seatsLeft: 5,
    totalSeats: 8,
    startDate: "01.03",
    note: "Найближчий старт: вечірній потік",
  },
  ru: {
    label: "A1",
    seatsLeft: 5,
    totalSeats: 8,
    startDate: "01.03",
    note: "Ближайший старт: вечерний поток",
  },
};
