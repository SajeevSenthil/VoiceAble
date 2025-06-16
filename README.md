# 🎙️ VoiceAble

> Just speak or type your need, and VoiceAble generates a digital accessibility tool in seconds.  
> **No coding, just inclusion.**

---

## 🌟 Inspiration

VoiceAble was created for **Prompt Stream 3: Social Good** — _"Build an assistant that takes in a natural language description (like 'a voice-controlled daily planner') and outputs an accessible tool — instantly, no tech knowledge required."_

We saw a gap in accessibility: while tools exist, **creating** them still requires technical knowledge. Our goal was to eliminate that barrier using voice and AI. Whether it’s a planner, a form, or a support widget — VoiceAble gives non-coders the power to build inclusive tools just by describing them in plain English.

---

## 💡 What it does

- Users **speak or type** what they want — e.g., “a tool to collect student feedback with emojis.”
- VoiceAble **generates the corresponding JSX code** using GPT-4o-mini.
- The generated component is instantly **rendered in the browser**.
- Users can **download the tool as a project file** via Lovable.

---

## 🧱 Tech Stack

| Layer          | Tech Used                         |
|----------------|-----------------------------------|
| Framework      | React + TypeScript                |
| UI Styling     | Tailwind CSS + Lucide Icons       |
| Build Tool     | Vite                              |
| AI Integration | GPT-4o-mini via OpenRouter        |
| Utilities      | Lovable (for file packaging)      |
| State/UI Logic | Custom hooks, ShadCN UI components |

---

## 🚧 Challenges We Faced

- Translating **unstructured speech** into usable code
- Keeping AI responses **accessible and semantically correct**
- Handling **dynamic component rendering** with minimal delay
- Supporting **dark/light mode** with consistent styling

---

## ✅ Accomplishments

- End-to-end voice → AI → code → download flow
- Intuitive and **zero-friction UX**
- Fully responsive and theme-aware interface
- Deployed with support for real-time rendering

---

## 📚 What We Learned

- Prompt engineering for **functional code generation**
- Integrating GPT-4o-mini efficiently in a live frontend app
- Balancing AI flexibility with frontend safety and validation
- Designing accessibility-first UIs for broad users

---

## 🚀 What’s Next

- 🌐 Support for multilingual input
- 🧠 Chained tool creation (e.g., linked inputs + validation)
- 📲 PWA version for offline generation
- ♿ Built-in WCAG accessibility audits

---

## 📦 Built With

- **React**, **TypeScript**, **Vite**
- **Tailwind CSS**, **Lucide Icons**
- **GPT-4o-mini** via [OpenRouter](https://openrouter.ai/)
- **Lovable** for downloadable tool packaging
- **ShadCN UI**, **Custom Hooks**, and **ESLint** for developer experience

---

## 🎥 Demo

> Want to see VoiceAble in action?  
> 📽️ _[[Demo video link here](https://youtu.be/NesQ9su7AGs)]_


Let me know if you’d like this as a downloadable file or want badges (build, license, stars, etc.) added!
