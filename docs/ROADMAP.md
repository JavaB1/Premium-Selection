# Premium Selection — Roadmap

Активный план разработки. Обновлять по мере работы.

> Last updated: 2026-04-27 (evening)

---

## ✅ Done

### Audit + fixes (P0–P3)
- `nav.dark` CSS (было невидимое меню на белых секциях)
- Удалён `index-v1-grid.html` бэкап из публичной зоны
- 8 JPEG сжаты mozjpeg (−83%: 7.74 MB → 1.31 MB)
- WebP варианты + `<picture>` в works/news/hero (−78% от JPG)
- `vercel.json` + `_headers` (XFO, XCTO, HSTS, cache-immutable)
- Open Graph + Twitter Card + canonical + JSON-LD Organization
- `prefers-reduced-motion` гейт (CSS + JS таймеры)
- `robots.txt` + `sitemap.xml` (discover noindex)
- DEBUG-gated `console.log`
- `:focus-visible` outline для всех интерактивных
- Удалена цена `$X-YK` везде в discover (UZ-рынок)
- Бюджет-tiers переформулированы как scope levels (S/M/L/XL)

### Hero interactivity (главная)
- Центральный текст +40% по размеру; grid-rows центру 1.6fr
- Synonym typewriter rotation вместо fade
- Plate `contenteditable`: click → type → Enter → modal
- Modal: «— Идея: ___» + «С чего начнём?» + 2 CTA (Discover / Связаться)
- Modal центрируется через native `<dialog>` margin auto + `::backdrop`
- Cancel/Esc/× → плашка возвращается к авто-ротации, ничего не сохраняется

### Discover
- `?w=<word>` seed banner («— Идея: ___»)
- Wizard всегда стартует с шага 1 (smart-jump убран)
- Слово прокидывается в финальный ТЗ как «Слово клиента с главной»

### Marketing & Research direction page
- Скелет 8 секций: Hero / Trust-bar / Услуги / Подход / Кейсы / Цифры / Команда / CTA
- Sticky sub-nav со scroll-spy (подсветка активной секции)
- `nav.dark` переключение на белых секциях
- Counter-анимация цифр от 0 при входе в viewport
- Cases-фильтр (Все / FMCG / Финансы / HoReCa / Ритейл)
- **Polish #1–5**:
  - Hero watermark «01» + top-right meta + scroll-hint pulse + fade-up entrance
  - Cases hover-overlay: «что сделали» + ключевая метрика красной стрелкой
  - Sub-nav progress-bar (% scroll после hero)
  - Services hover: крупный номер + раскрытие списка «что входит»
  - Process 3-я колонка «— Получаете» с deliverables каждого этапа

---

### Production + IT direction pages
- Полный шаблон M&R перенесён 1:1 на Production (`02`) и IT (`03`) со всеми polish #1–5 внутри (watermark + hero meta + scroll-hint pulse + fade-up; cases hover-overlay + метрики; subnav progress-bar; services hover с раскрытием; process 3-я колонка «Получаете»)
- Контент переработан под направление: услуги, кейсы, числа, команда, breadcrumb, watermark `02`/`03`
- Связи: dir-rows главной → новые URL; футер всех 4 страниц подсвечивает все 3 направления; sitemap.xml обновлён

---

## 🔄 In Progress

— нет активных задач, выбираем следующую из backlog —

---

## 📋 Backlog

### ✅ M&R + Production + IT polish #6–10 (done на всех 3 страницах)
- [x] **6.** Team hover-card с цитатой эксперта — 4 уникальных фразы на каждой странице
- [x] **7.** Numbers с подзаголовком — direction-specific subs (полиграфия/web/исследования)
- [x] **8.** Trust-bar marquee — бегущая строка лого, 32s loop, fade на краях, pause on hover
- [x] **9.** Cases multi-select фильтр — Set-based logic, «Все» exclusive, остальные toggle
- [x] **10.** Hero manifest cycling — 4-фразовый crossfade каждые 4.2s, прокидывается в textContent

### M&R polish — nice-to-have (#11–14)
- [ ] **11.** Real SVG line-style иконки услуг
- [ ] **12.** Page transition между главной и direction (fade + scroll-restore)
- [ ] **13.** Case modal на клик (full case study overlay)
- [ ] **14.** Sticky «Связаться» FAB после 50% scroll

### Top nav — done
- [x] mix-blend-mode: difference + isolation на .nav (4 страницы) — эффект «фон влияет», без JS-свопа
- [x] Красная линия-разделитель в .directions section-head (index.html)

### Backend integration (separate sprint)
- [ ] Admin-панель для лидов
- [ ] Email + Telegram delivery
- [ ] Form submit на discover.html и hero modal (заменить no-op log)
- [ ] Lead storage + management

### Content (после backend)
- [ ] AI-бот для контент-мейкеров (генерация постов под индустрию)
- [ ] Реальные logos клиентов
- [ ] Реальные фото команды
- [ ] Реальные case-studies с метриками

### Дальние страницы
- [ ] «Все работы» с фильтрами
- [ ] Detailed case page
- [ ] Legal pages (privacy, cookies, offer)
- [ ] 404 / 500 / «Спасибо»
- [ ] EN + UZ переводы
- [ ] CRM integration

---

## Конвенции

- Работаем feature-branches, commit per logical unit, push в main после approval
- Backend integration — отдельный проект (никаких backend без явной задачи)
- Цены в UZS / USD убраны — конкретику обсуждаем на discovery
- Hero modal не сохраняет данные — это будущая backend-задача
- Никаких frameworks — vanilla HTML/CSS/JS, без сборки
