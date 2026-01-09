// State Machine
const STATES = {
    IDLE_STAGE_1: 'idle_stage_1',
    DISPENSING: 'dispensing',
    EGG_READY_STAGE_2: 'egg_ready_stage_2',
    REVEAL_STAGE_2: 'reveal_stage_2',
    DONE: 'done'
};

// Current state
let currentState = STATES.IDLE_STAGE_1;

// Prize Pool - 10 sample prizes
const prizes = [
    {
        id: 1,
        name: "Memory Lane",
        image: "https://via.placeholder.com/800x600/ff6b6b/ffffff?text=Memory+Lane",
        letter: "Dear Stanley,<br><br>This memory always makes me <strong>smile</strong>. Remember that time we...<br><br>Those moments are what make our friendship so special! 💙"
    },
    {
        id: 2,
        name: "Adventure Time",
        image: "https://via.placeholder.com/800x600/4ecdc4/ffffff?text=Adventure+Time",
        letter: "Hey Stanley!<br><br>Thinking about all our <em>adventures</em> together brings back such great memories.<br><br>Here's to many more! 🎉"
    },
    {
        id: 3,
        name: "Laugh Out Loud",
        image: "https://via.placeholder.com/800x600/ffe66d/333333?text=Laugh+Out+Loud",
        letter: "Stanley,<br><br>You have the best sense of humor! This moment had me <strong>laughing</strong> for days.<br><br>Thanks for always bringing joy! 😂"
    },
    {
        id: 4,
        name: "Friendship Forever",
        image: "https://via.placeholder.com/800x600/95e1d3/333333?text=Friendship+Forever",
        letter: "To my amazing friend,<br><br>Our friendship means the world to me. Through thick and thin, you've always been there.<br><br>Here's to us! 🎊"
    },
    {
        id: 5,
        name: "Celebration",
        image: "https://via.placeholder.com/800x600/f38181/ffffff?text=Celebration",
        letter: "Happy Birthday, Stanley!<br><br>Today we celebrate <strong>you</strong> and all the wonderful things that make you special.<br><br>Hope your day is as amazing as you are! 🎂"
    },
    {
        id: 6,
        name: "Dream Big",
        image: "https://via.placeholder.com/800x600/aa96da/ffffff?text=Dream+Big",
        letter: "Stanley,<br><br>You inspire me to <em>dream bigger</em> and reach for the stars. Your ambition is contagious!<br><br>Keep shining! ⭐"
    },
    {
        id: 7,
        name: "Gratitude",
        image: "https://via.placeholder.com/800x600/fce38a/333333?text=Gratitude",
        letter: "Dear friend,<br><br>I'm so <strong>grateful</strong> to have you in my life. Your kindness and support mean everything.<br><br>Thank you for being you! 🙏"
    },
    {
        id: 8,
        name: "Milestone",
        image: "https://via.placeholder.com/800x600/ffaaa5/ffffff?text=Milestone",
        letter: "Stanley,<br><br>This milestone is just the beginning! You've accomplished so much, and there's so much more ahead.<br><br>Proud of you! 🏆"
    },
    {
        id: 9,
        name: "Joy & Happiness",
        image: "https://via.placeholder.com/800x600/a8e6cf/333333?text=Joy+%26+Happiness",
        letter: "To bring you joy,<br><br>Your happiness is important to me. I hope this brings a <strong>smile</strong> to your face!<br><br>You deserve all the happiness in the world! 😊"
    },
    {
        id: 10,
        name: "Special Moment",
        image: "https://via.placeholder.com/800x600/ffd3a5/333333?text=Special+Moment",
        letter: "Stanley,<br><br>This moment captured something <em>special</em> between us. It's a memory I'll treasure forever.<br><br>Thank you for being part of my life! 💝"
    }
];

// Dispensed prizes (tracked by ID)
let dispensedPrizeIds = [];

// Current prize being displayed
let currentPrize = null;

// DOM Elements
const insertCoinBtn = document.getElementById('insertCoinBtn');
const restartBtn = document.getElementById('restartBtn');
const coin = document.getElementById('coin');
const globe = document.getElementById('globe');
const egg = document.getElementById('egg');
const trayEgg = document.getElementById('trayEgg');
const whiteFlash = document.getElementById('whiteFlash');
const revealOverlay = document.getElementById('revealOverlay');
const revealImage = document.getElementById('revealImage');
const revealCaption = document.getElementById('revealCaption');
const revealLetter = document.getElementById('revealLetter');
const nextBtn = document.getElementById('nextBtn');
const remainingCount = document.getElementById('remainingCount');
const endMessage = document.getElementById('endMessage');
const ballsContainer = document.getElementById('ballsContainer');

// Initialize
function init() {
    // Load from localStorage
    const saved = localStorage.getItem('dispensedPrizeIds');
    if (saved) {
        dispensedPrizeIds = JSON.parse(saved);
    }

    // Generate balls in globe
    generateBalls();

    // Update UI
    updateRemaining();
    checkEndState();

    // Event listeners
    insertCoinBtn.addEventListener('click', insertCoin);
    restartBtn.addEventListener('click', resetMachine);
    trayEgg.addEventListener('click', crackEgg);
    nextBtn.addEventListener('click', nextPrize);

    // Animation end handlers
    coin.addEventListener('animationend', handleCoinAnimationEnd);
    egg.addEventListener('animationend', handleEggAnimationEnd);
    trayEgg.addEventListener('animationend', handleTrayEggAnimationEnd);
    whiteFlash.addEventListener('animationend', handleWhiteFlashEnd);
}

// Generate decorative balls in globe
function generateBalls() {
    ballsContainer.innerHTML = '';
    const totalBalls = 20;
    const remaining = getRemainingPrizes().length;
    const dispensed = dispensedPrizeIds.length;

    for (let i = 0; i < totalBalls; i++) {
        const ball = document.createElement('div');
        ball.className = 'ball';
        
        // Dim or hide balls based on dispensed count
        if (i >= remaining) {
            ball.classList.add('dimmed');
        }
        
        ballsContainer.appendChild(ball);
    }
}

// Get remaining prizes
function getRemainingPrizes() {
    return prizes.filter(prize => !dispensedPrizeIds.includes(prize.id));
}

// Get image path with fallback
function getImagePath(prize) {
    // If prize.image is already a local path, use it
    if (prize.image && prize.image.startsWith('assets/')) {
        return prize.image;
    }
    // Otherwise, try local path first, then fallback to provided URL
    const localPath = `assets/images/prize-${prize.id}.jpg`;
    return prize.image || localPath;
}

// Update remaining counter and visual balls
function updateRemaining() {
    const remaining = getRemainingPrizes().length;
    remainingCount.textContent = remaining;
    generateBalls(); // Rebuild balls to reflect current state
}

// Check end state
function checkEndState() {
    const remaining = getRemainingPrizes().length;
    
    if (remaining === 0 && currentState !== STATES.DONE) {
        currentState = STATES.DONE;
        insertCoinBtn.disabled = true;
        endMessage.classList.remove('hidden');
        restartBtn.style.transform = 'scale(1.2)';
        restartBtn.style.background = 'rgba(255, 215, 0, 0.9)';
    } else {
        endMessage.classList.add('hidden');
        restartBtn.style.transform = '';
        restartBtn.style.background = '';
    }
}

// Stage 1: Insert Coin
function insertCoin() {
    if (currentState !== STATES.IDLE_STAGE_1) {
        return; // Prevent double-click
    }

    const remaining = getRemainingPrizes();
    if (remaining.length === 0) {
        return;
    }

    currentState = STATES.DISPENSING;
    insertCoinBtn.disabled = true;

    // Select random prize from remaining
    const randomIndex = Math.floor(Math.random() * remaining.length);
    currentPrize = remaining[randomIndex];

    // Start coin animation
    coin.classList.add('dropping');
    
    // Start machine shake (slightly delayed)
    setTimeout(() => {
        globe.classList.add('shaking');
        // Remove shake class after animation
        setTimeout(() => {
            globe.classList.remove('shaking');
        }, 500);
    }, 150);

    // Start egg roll animation (after coin starts)
    setTimeout(() => {
        egg.classList.add('rolling');
        
        // Fallback: if animation doesn't complete, handle manually
        setTimeout(() => {
            if (currentState === STATES.DISPENSING) {
                handleEggAnimationEnd({ animationName: 'eggRoll' });
            }
        }, 1000);
    }, 400);
}

// Handle coin animation end
function handleCoinAnimationEnd(e) {
    if (e && e.animationName && e.animationName !== 'coinDrop') return;
    
    coin.classList.remove('dropping');
    coin.style.opacity = '0';
}

// Handle egg roll animation end
function handleEggAnimationEnd(e) {
    if (e.animationName !== 'eggRoll') return;
    
    egg.classList.remove('rolling');
    egg.style.opacity = '0';
    
    // Show egg in tray with bounce
    trayEgg.classList.add('visible', 'clickable');
    trayEgg.style.opacity = '1';
    
    // Add label to egg
    const label = document.createElement('div');
    label.className = 'egg-label';
    label.textContent = currentPrize.name;
    trayEgg.innerHTML = '';
    trayEgg.appendChild(label);
    
    // Small bounce animation
    setTimeout(() => {
        trayEgg.classList.add('bouncing');
    }, 50);
    
    // Transition to EGG_READY_STAGE_2 after bounce
    setTimeout(() => {
        currentState = STATES.EGG_READY_STAGE_2;
        trayEgg.classList.remove('bouncing');
    }, 350);
}

// Handle tray egg animation end
function handleTrayEggAnimationEnd(e) {
    if (e.animationName === 'eggBounce') {
        trayEgg.classList.remove('bouncing');
    }
}

// Stage 2: Crack Egg
function crackEgg() {
    if (currentState !== STATES.EGG_READY_STAGE_2) {
        return; // Prevent clicking before ready
    }

    currentState = STATES.REVEAL_STAGE_2;

    // Remove clickable class
    trayEgg.classList.remove('clickable');
    
    // Start crack animation
    trayEgg.classList.add('cracking');
    
    // Show white flash (slightly after crack starts)
    setTimeout(() => {
        whiteFlash.classList.add('active');
    }, 150);
    
    // Fallback: if animation events don't fire, show reveal after timeout
    setTimeout(() => {
        if (currentState === STATES.REVEAL_STAGE_2 && !revealOverlay.classList.contains('visible')) {
            whiteFlash.classList.remove('active');
            showReveal();
        }
    }, 400);
}

// Handle white flash end
function handleWhiteFlashEnd(e) {
    if (e.animationName !== 'whiteFlash') return;
    
    whiteFlash.classList.remove('active');
    
    // Show reveal overlay (slight delay for smooth transition)
    setTimeout(() => {
        showReveal();
    }, 50);
}

// Show reveal overlay
function showReveal() {
    if (!currentPrize) return;

    // Set image (with fallback)
    const imagePath = getImagePath(currentPrize);
    revealImage.src = imagePath;
    revealImage.onerror = function() {
        // If local image fails and we have a fallback URL, use it
        if (currentPrize.image && !currentPrize.image.startsWith('assets/')) {
            this.src = currentPrize.image;
        } else {
            // Last resort: use placeholder service
            this.src = `https://via.placeholder.com/800x600/cccccc/666666?text=Image+${currentPrize.id}`;
        }
    };

    // Set caption
    revealCaption.textContent = currentPrize.name;

    // Set letter (with HTML)
    revealLetter.innerHTML = currentPrize.letter;

    // Show overlay
    revealOverlay.classList.remove('hidden');
    setTimeout(() => {
        revealOverlay.classList.add('visible');
    }, 10);
}

// Stage 3: Next Prize
function nextPrize() {
    // Hide overlay
    revealOverlay.classList.remove('visible');
    
    setTimeout(() => {
        revealOverlay.classList.add('hidden');
        
        // Mark prize as dispensed
        if (currentPrize && !dispensedPrizeIds.includes(currentPrize.id)) {
            dispensedPrizeIds.push(currentPrize.id);
            localStorage.setItem('dispensedPrizeIds', JSON.stringify(dispensedPrizeIds));
        }

        // Reset tray
        trayEgg.classList.remove('visible', 'clickable', 'cracking');
        trayEgg.style.opacity = '0';
        trayEgg.innerHTML = '';

        // Reset coin
        coin.style.opacity = '0';

        // Reset globe shake
        globe.classList.remove('shaking');

        // Reset egg
        egg.style.opacity = '0';
        egg.classList.remove('rolling');

        // Update remaining
        updateRemaining();
        checkEndState();

        // Return to IDLE_STAGE_1 or DONE
        if (getRemainingPrizes().length > 0) {
            currentState = STATES.IDLE_STAGE_1;
            insertCoinBtn.disabled = false;
        } else {
            currentState = STATES.DONE;
        }

        currentPrize = null;
    }, 250);
}

// Reset Machine
function resetMachine() {
    // Clear localStorage
    localStorage.removeItem('dispensedPrizeIds');
    dispensedPrizeIds = [];
    currentPrize = null;

    // Reset state
    currentState = STATES.IDLE_STAGE_1;

    // Reset UI
    insertCoinBtn.disabled = false;
    endMessage.classList.add('hidden');
    
    // Reset elements
    coin.style.opacity = '0';
    coin.classList.remove('dropping');
    globe.classList.remove('shaking');
    egg.style.opacity = '0';
    egg.classList.remove('rolling');
    trayEgg.classList.remove('visible', 'clickable', 'cracking', 'bouncing');
    trayEgg.style.opacity = '0';
    trayEgg.innerHTML = '';
    whiteFlash.classList.remove('active');
    revealOverlay.classList.remove('visible');
    revealOverlay.classList.add('hidden');

    // Update remaining
    updateRemaining();
    checkEndState();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
