export type Locale = "uz" | "ru" | "en";

export const translations = {
  uz: {
    // App
    appName: "Regress Dashboard",
    company: "SEMUR Insurance",

    // Nav
    dashboard: "Boshqaruv paneli",
    cases: "Ishlar ro'yxati",
    addCase: "Yangi ish",
    export: "Excel yuklab olish",

    // Status labels
    status: {
      NOT_REVIEWED: "Ko'rib chiqilmadi",
      SENT_TO_LAWYER: "Yuristga yuborildi",
      IN_COLLECTION: "Undirish jarayonida",
      FULLY_COLLECTED: "To'liq undirildi",
      ARCHIVED: "Arxivlangan",
    },

    // Dashboard summary
    totalCases: "Jami ishlar",
    totalClaim: "Jami da'vo miqdori",
    totalReturned: "Qaytarilgan miqdor",
    remainingDebt: "Qoldiq qarz",
    collectionRate: "Undirilish foizi",
    postalExpense: "Pochta xarajatlari",
    penalty: "Jarima",

    // Direction
    direction: "Yo'nalish",
    allDirections: "Barcha yo'nalishlar",

    // Table columns
    id: "ID",
    insured: "Sug'urta qildiruvchi",
    contractNumber: "Shartnoma raqami",
    contractDate: "Shartnoma sanasi",
    policyNumber: "Polis raqami",
    incidentDate: "Hodisa sanasi",
    claimAmount: "Da'vo miqdori",
    returnedAmount: "Qaytarilgan",
    remainingDebtCol: "Qoldiq qarz",
    debtor: "Qarzdor",
    actions: "Amallar",

    // Filters
    filters: "Filtrlar",
    search: "Qidirish",
    searchPlaceholder: "Ism yoki pasport bo'yicha qidirish",
    dateFrom: "Sanadan",
    dateTo: "Sanagacha",
    resetFilters: "Filtrlarni tozalash",
    applyFilters: "Qo'llash",

    // Pagination
    page: "Sahifa",
    of: "dan",
    rowsPerPage: "Qatorlar soni",
    showing: "Ko'rsatilmoqda",
    entries: "ta yozuv",

    // Stats
    byDirection: "Yo'nalishlar bo'yicha",
    monthlyDynamics: "Oylik dinamika",
    byStatus: "Holat bo'yicha",
    preCourt: "Sudgacha undirish",
    court: "Sud ажrimi",
    enforcement: "MIB ijrosi",

    // Case detail
    caseDetail: "Ish tafsilotlari",
    contractInfo: "Shartnoma ma'lumotlari",
    debtorInfo: "Qarzdor ma'lumotlari",
    processInfo: "Jarayon ma'lumotlari",
    warningLetter: "Ogohlantirish xati",
    lawsuit: "Da'vo arizasi",
    courtDecision: "Sud ажrimi",
    enforcementOrder: "MIB ijrosi",
    paymentInfo: "To'lov ma'lumotlari",

    // Fields
    fullName: "F.I.SH",
    pinfl: "JSHSHIR",
    passport: "Pasport",
    region: "Hudud",
    address: "Manzil",
    phone: "Telefon",
    notes: "Izohlar",
    insuranceLiability: "Sug'urta javobgarligi",
    insurancePremium: "Sug'urta mukofoti",
    coverageStart: "Boshlanish",
    coverageEnd: "Tugash",
    insuranceClass: "Sug'urta klassi",
    protocolNumber: "Bayonnoma raqami",
    protocolDate: "Bayonnoma sanasi",
    paymentDate: "To'lov sanasi",

    // Buttons
    view: "Ko'rish",
    edit: "Tahrirlash",
    updateStep: "Bosqichni yangilash",
    save: "Saqlash",
    cancel: "Bekor qilish",
    close: "Yopish",
    back: "Orqaga",

    // Messages
    loading: "Yuklanmoqda...",
    noData: "Ma'lumot topilmadi",
    error: "Xatolik yuz berdi",
    success: "Muvaffaqiyatli saqlandi",

    // Months
    months: [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
      "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ],
    year: "Yil",
  },

  ru: {
    appName: "Regress Dashboard",
    company: "SEMUR Insurance",

    dashboard: "Панель управления",
    cases: "Список дел",
    addCase: "Новое дело",
    export: "Скачать Excel",

    status: {
      NOT_REVIEWED: "Не рассмотрено",
      SENT_TO_LAWYER: "Направлено юристу",
      IN_COLLECTION: "В процессе взыскания",
      FULLY_COLLECTED: "Полностью взыскано",
      ARCHIVED: "Архивировано",
    },

    totalCases: "Всего дел",
    totalClaim: "Общая сумма претензий",
    totalReturned: "Возвращено",
    remainingDebt: "Остаток долга",
    collectionRate: "Процент взыскания",
    postalExpense: "Почтовые расходы",
    penalty: "Штраф",

    direction: "Направление",
    allDirections: "Все направления",

    id: "ID",
    insured: "Страхователь",
    contractNumber: "Номер договора",
    contractDate: "Дата договора",
    policyNumber: "Номер полиса",
    incidentDate: "Дата страх. случая",
    claimAmount: "Сумма претензии",
    returnedAmount: "Возвращено",
    remainingDebtCol: "Остаток долга",
    debtor: "Должник",
    actions: "Действия",

    filters: "Фильтры",
    search: "Поиск",
    searchPlaceholder: "Поиск по имени или паспорту",
    dateFrom: "Дата с",
    dateTo: "Дата по",
    resetFilters: "Сбросить фильтры",
    applyFilters: "Применить",

    page: "Страница",
    of: "из",
    rowsPerPage: "Строк на странице",
    showing: "Показано",
    entries: "записей",

    byDirection: "По направлениям",
    monthlyDynamics: "Ежемесячная динамика",
    byStatus: "По статусу",
    preCourt: "Досудебное взыскание",
    court: "Судебное решение",
    enforcement: "Исполнение СП",

    caseDetail: "Детали дела",
    contractInfo: "Информация о договоре",
    debtorInfo: "Информация о должнике",
    processInfo: "Информация о процессе",
    warningLetter: "Предупредительное письмо",
    lawsuit: "Исковое заявление",
    courtDecision: "Решение суда",
    enforcementOrder: "Исполнительный лист",
    paymentInfo: "Информация об оплате",

    fullName: "Ф.И.О.",
    pinfl: "ПИНФЛ",
    passport: "Паспорт",
    region: "Регион",
    address: "Адрес",
    phone: "Телефон",
    notes: "Примечания",
    insuranceLiability: "Страховая ответственность",
    insurancePremium: "Страховая премия",
    coverageStart: "Начало",
    coverageEnd: "Конец",
    insuranceClass: "Класс страхования",
    protocolNumber: "Номер протокола",
    protocolDate: "Дата протокола",
    paymentDate: "Дата выплаты",

    view: "Просмотр",
    edit: "Редактировать",
    updateStep: "Обновить этап",
    save: "Сохранить",
    cancel: "Отмена",
    close: "Закрыть",
    back: "Назад",

    loading: "Загрузка...",
    noData: "Данные не найдены",
    error: "Произошла ошибка",
    success: "Успешно сохранено",

    months: [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ],
    year: "Год",
  },

  en: {
    appName: "Regress Dashboard",
    company: "SEMUR Insurance",

    dashboard: "Dashboard",
    cases: "Cases List",
    addCase: "New Case",
    export: "Download Excel",

    status: {
      NOT_REVIEWED: "Not Reviewed",
      SENT_TO_LAWYER: "Sent to Lawyer",
      IN_COLLECTION: "In Collection",
      FULLY_COLLECTED: "Fully Collected",
      ARCHIVED: "Archived",
    },

    totalCases: "Total Cases",
    totalClaim: "Total Claim Amount",
    totalReturned: "Total Returned",
    remainingDebt: "Remaining Debt",
    collectionRate: "Collection Rate",
    postalExpense: "Postal Expenses",
    penalty: "Penalty",

    direction: "Direction",
    allDirections: "All Directions",

    id: "ID",
    insured: "Insured",
    contractNumber: "Contract Number",
    contractDate: "Contract Date",
    policyNumber: "Policy Number",
    incidentDate: "Incident Date",
    claimAmount: "Claim Amount",
    returnedAmount: "Returned",
    remainingDebtCol: "Remaining Debt",
    debtor: "Debtor",
    actions: "Actions",

    filters: "Filters",
    search: "Search",
    searchPlaceholder: "Search by name or passport",
    dateFrom: "Date from",
    dateTo: "Date to",
    resetFilters: "Reset filters",
    applyFilters: "Apply",

    page: "Page",
    of: "of",
    rowsPerPage: "Rows per page",
    showing: "Showing",
    entries: "entries",

    byDirection: "By Direction",
    monthlyDynamics: "Monthly Dynamics",
    byStatus: "By Status",
    preCourt: "Pre-Court Collection",
    court: "Court Decision",
    enforcement: "Enforcement Order",

    caseDetail: "Case Details",
    contractInfo: "Contract Information",
    debtorInfo: "Debtor Information",
    processInfo: "Process Information",
    warningLetter: "Warning Letter",
    lawsuit: "Lawsuit",
    courtDecision: "Court Decision",
    enforcementOrder: "Enforcement Order",
    paymentInfo: "Payment Information",

    fullName: "Full Name",
    pinfl: "PINFL",
    passport: "Passport",
    region: "Region",
    address: "Address",
    phone: "Phone",
    notes: "Notes",
    insuranceLiability: "Insurance Liability",
    insurancePremium: "Insurance Premium",
    coverageStart: "Coverage Start",
    coverageEnd: "Coverage End",
    insuranceClass: "Insurance Class",
    protocolNumber: "Protocol Number",
    protocolDate: "Protocol Date",
    paymentDate: "Payment Date",

    view: "View",
    edit: "Edit",
    updateStep: "Update Step",
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    back: "Back",

    loading: "Loading...",
    noData: "No data found",
    error: "An error occurred",
    success: "Successfully saved",

    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    year: "Year",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
