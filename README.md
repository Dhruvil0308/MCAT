# Textor - The First Personalized AI Tutor

Textor is an innovative AI-powered tutoring platform that provides personalized educational support through text messaging. Our platform adapts to individual learning styles and needs, making education more accessible and effective.

## 🚀 Features

### For Parents
- **Personalized Learning Plans**: Customize how the AI tutor interacts with your child
- **Progress Monitoring**: Choose your preferred update frequency (daily digest, weekly summary, etc.)
- **Flexible Teaching Styles**: From step-by-step explanations to guided questioning
- **Assignment Management**: Set tasks and deadlines with automated reminders
- **Parent Dashboard**: Stay informed about your child's learning progress

### For Students
- **24/7 Homework Help**: Get instant assistance with any subject
- **Adaptive Learning**: AI that adjusts to your learning pace and style
- **Multiple Response Styles**: Choose how you want to receive help
- **Study Reminders**: Customizable notifications to keep you on track
- **Parent Integration**: Optional parent updates for accountability

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.3.4 with TypeScript
- **Styling**: Tailwind CSS
- **Development**: Turbopack for fast development
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📁 Project Structure

```
textor/
├── textor-landing/          # Main landing page and onboarding
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx     # Homepage with animated taglines
│   │   │   ├── form/        # Onboarding flow
│   │   │   │   └── page.tsx # Multi-step form for parents/students
│   │   │   ├── layout.tsx   # Root layout
│   │   │   └── globals.css  # Global styles
│   │   └── ...
│   ├── public/              # Static assets
│   └── package.json
├── src/                     # Core application (future)
│   └── app/
│       └── page.tsx         # Placeholder for main app
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/textor.git
   cd textor
   ```

2. **Install dependencies**
   ```bash
   cd textor-landing
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📋 Onboarding Flow

### Parent Onboarding
1. **Who are you?** - Parent/Guardian selection
2. **Child's Grade** - K-12 grade selection
3. **Child's Name** - Personalization
4. **Help Type** - Multi-select learning needs
5. **Update Frequency** - Parent notification preferences
6. **Teaching Style** - How AI should teach
7. **Tone** - AI communication style
8. **Usage Mode** - Parent-directed vs student-independent
9. **Task Management** - Due dates and reminders (conditional)
10. **Contact Information** - Phone numbers for both parent and child

### Student Onboarding
1. **Who are you?** - Student selection
2. **Grade Level** - Current grade
3. **Name** - Student's first name
4. **Help Preferences** - Types of assistance needed
5. **Response Style** - How AI should respond
6. **Tone Preference** - Communication style
7. **Reminder Settings** - Study/homework reminders
8. **Contact Information** - Student phone number
9. **Parent Integration** - Optional parent updates

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on all devices
- **Smooth Animations**: Engaging typewriter effects and transitions
- **Accessible UI**: Clean, modern interface with proper contrast
- **Progressive Enhancement**: Works without JavaScript
- **Mobile-First**: Optimized for mobile devices

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🌟 Key Features

### Smart Form Logic
- **Conditional Questions**: Only show relevant questions based on previous answers
- **Multi-step Flow**: Smooth navigation with back/forward functionality
- **Validation**: Real-time form validation and error handling
- **Progress Tracking**: Visual feedback on form completion

### Responsive Design
- **Mobile Optimized**: Touch-friendly interface
- **Desktop Compatible**: Full-featured desktop experience
- **Cross-browser**: Works on all modern browsers

### Performance
- **Fast Loading**: Optimized bundle sizes
- **SEO Ready**: Proper meta tags and structure
- **Accessibility**: WCAG compliant design

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Custom domain support

### Netlify
1. Drag and drop the `out` folder after build
2. Or connect GitHub for automatic deployments

### Other Platforms
- Any static hosting service
- CDN for global distribution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@textor.com
- **Documentation**: [docs.textor.com](https://docs.textor.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/textor/issues)

## 🗺️ Roadmap

### Phase 1: Landing & Onboarding ✅
- [x] Landing page with animated taglines
- [x] Multi-step onboarding form
- [x] Parent and student flows
- [x] Responsive design

### Phase 2: Core Platform (In Development)
- [ ] AI integration
- [ ] Messaging interface
- [ ] Progress tracking
- [ ] Parent dashboard

### Phase 3: Advanced Features (Planned)
- [ ] Multi-subject support
- [ ] Video integration
- [ ] Group learning
- [ ] Analytics dashboard

## 🙏 Acknowledgments

- Built with Next.js and TypeScript
- Styled with Tailwind CSS
- Icons from various open-source libraries
- Inspired by the need for personalized education

---

**Textor** - Making learning personal, one text at a time. 📚✨ 