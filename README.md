# Gumball Egg Letter Machine

A delightful single-page web experience that simulates a gumball machine dispensing eggs. Each egg contains a letter and image for your friend!

## Features

- 🎰 Classic red gumball machine design
- 🥚 Smooth egg dispensing animations
- 💌 Full-screen reveal with polaroid-styled presentation
- 💾 Progress saved in localStorage
- 📱 Mobile-friendly responsive design
- 🎁 10 sample prizes (easily customizable)

## Setup

1. Clone or download this repository
2. Open `index.html` in a web browser
3. That's it! No build process required.

## Customizing Prizes

Edit the `prizes` array in `script.js`:

```javascript
const prizes = [
    {
        id: 1,
        name: "Your Prize Name",
        image: "assets/images/prize-1.jpg", // or external URL
        letter: "Your letter text with <strong>HTML</strong> formatting"
    },
    // ... add more prizes (up to 20)
];
```

### Adding Your Own Images

1. Add images to the `assets/images/` folder
2. Name them: `prize-1.jpg`, `prize-2.jpg`, etc. (matching the prize `id`)
3. The code will automatically use local images if available, otherwise falls back to the placeholder URL

## GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select your branch and `/ (root)` folder
4. Your site will be live at `https://yourusername.github.io/repository-name/`

## How It Works

1. **Insert Coin**: Click the button to start the machine
2. **Egg Dispenses**: Watch the egg roll down the chute
3. **Click Egg**: Tap the egg to crack it open
4. **Reveal**: See the full-screen reveal with image and letter
5. **Next**: Continue to the next prize

The machine tracks which prizes have been dispensed and won't show duplicates. Use the restart button (🔄) to reset progress.

## Browser Support

Works in all modern browsers that support:
- CSS animations
- localStorage
- ES6 JavaScript

Enjoy! 🎉
