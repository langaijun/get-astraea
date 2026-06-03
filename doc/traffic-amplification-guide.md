# Traffic Amplification Materials Guide

## Completed (Code Changes)

### 1. Share Buttons Added
- Each god page now has X (Twitter), Pinterest, and Copy Link buttons
- Pre-filled share text with god name and page URL

### 2. Internal Link Structure
- About page links to all 12 god pages (clickable avatars)
- Result page bridges to corresponding god page
- Each god page shows 3 related deities

### 3. SEO Meta Tags
- All 12 god pages have optimized titles and descriptions
- Schema markup (Article + Person + FAQPage) added
- Sitemap.xml updated with current dates

## TODO (Requires External Tools)

### 1. Pinterest Vertical Images

Create one vertical image (1000x1500px) for each god:

| God | File Name | Text Overlay | Emoji |
|-----|-----------|---------------|-------|
| Athena | `pin-athena.png` | "I am Athena - Goddess of Wisdom" | 🦉 |
| Apollo | `pin-apollo.png` | "I am Apollo - God of Light & Art" | ☀️ |
| Artemis | `pin-artemis.png` | "I am Artemis - Goddess of Independence" | 🏹 |
| Hestia | `pin-hestia.png` | "I am Hestia - Goddess of Home" | 🏠 |
| Demeter | `pin-demeter.png` | "I am Demeter - Goddess of Harvest" | 🌾 |
| Hephaestus | `pin-hephaestus.png` | "I am Hephaestus - God of Creation" | ⚒️ |
| Hermes | `pin-hermes.png` | "I am Hermes - God of Communication" | 🪶 |
| Aphrodite | `pin-aphrodite.png` | "I am Aphrodite - Goddess of Love" | 🌹 |
| Dionysus | `pin-dionysus.png` | "I am Dionysus - God of Joy" | 🍇 |
| Persephone | `pin-persephone.png` | "I am Persephone - Goddess of Rebirth" | 🌸 |
| Hebe | `pin-hebe.png` | "I am Hebe - Goddess of Youth" | 💫 |
| Iris | `pin-iris.png` | "I am Iris - Goddess of Hope" | 🌈 |

**Design Guidelines:**
- Use the god's color palette
- Include oracle's Whisper branding
- Add "Take the quiz: get-astraea.com" at bottom
- Upload to: `vercel-project/share-images/pins/`

### 2. Instagram Story Templates

Create reusable templates for:
- "My archetype is [GOD NAME]" (with customizable slot)
- "Which Greek deity guides you?" (quiz promotion)
- Word count: ~1000 characters

### 3. Social Media Copy

**Twitter/X Posts:**
- "I got Athena as my guiding deity! Which Greek god guides you? Take the quiz: https://get-astraea.com"
- "Discover your inner archetype through ancient wisdom. Free 2-min quiz: [link]"

**Pinterest Pin Descriptions:**
- "Athena represents wisdom, strategy, and protection. Learn if this Greek goddess guides your life. Take the free quiz at Oracle's Whisper!"
- Include relevant hashtags: #GreekMythology #PersonalityQuiz #SelfDiscovery #Athena

## Deployment Checklist

- [ ] Generate all 12 Pinterest images
- [ ] Upload images to `share-images/pins/`
- [ ] Test share buttons on all god pages
- [ ] Verify sitemap.xml is submitted to Google Search Console
- [ ] Create social media content calendar
- [ ] Set up Pinterest boards for each deity
- [ ] Test internal links (about page → god pages)

## Success Metrics

- Traffic from Pinterest/X to god pages
- Backlinks to god pages
- SERP visibility for each deity + "quiz" or "test"
- Engagement time on god pages (benchmark: 30+ seconds)
