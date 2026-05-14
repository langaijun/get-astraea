# Oracle's Whisper | 神谕的低语

A gentle oracle personality quiz built with pure HTML/JS and deployed on Vercel.

## Project Structure

```
vercel-project/
├── index.html              # Landing page
├── quiz.html               # Quiz page (12 questions)
├── result.html             # Free result page
├── premium.html            # Premium result page with AI report
├── privacy.html            # Privacy policy
├── disclaimer.html         # Disclaimer
├── js/
│   ├── gods-data.js        # 12 deities data
│   ├── quiz-data.js        # 12 questions with options
│   ├── quiz.js            # Quiz logic
│   ├── i18n.js            # Language switching (EN/ZH)
│   ├── result.js          # Result page logic
│   ├── premium.js         # Premium page logic
│   └── share.js           # Canvas share card generator
├── i18n/
│   ├── en.json            # English translations
│   └── zh.json            # Chinese translations
├── api/
│   └── oracle.ts          # Vercel Edge Function (DeepSeek API)
├── icons/                 # Avatar icons (emoji-based)
├── vercel.json            # Vercel configuration
└── package.json           # Project metadata
```

## Setup

1. Clone or copy this project to your machine
2. Install Vercel CLI: `npm i -g vercel`
3. Deploy: `vercel --prod`

## Environment Variables

Add the following environment variable in Vercel:

- `DEEPSEEK_API_KEY`: Your DeepSeek API key for generating oracle reports

## Features

- 🌙 12 Greek deities with unique traits
- 📝 12-question personality quiz
- 🌍 Bilingual (English/Chinese)
- 💰 PayPal payment integration ($2.99)
- 🤖 AI-powered personalized reports (DeepSeek)
- 📤 Shareable oracle cards
- 🔒 Privacy-focused (sessionStorage)

## Contact

- Email: langaijun@foxmail.com
- Twitter: @wangwei111223

## License

For entertainment reference only.
