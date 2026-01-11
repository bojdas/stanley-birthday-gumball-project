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
        name: "Bojro",
        image: "assets/images/prize-1.jpg",
        letter: "ni hao fine shyt,<br>Happy birthday Stanley-chan! Here's to 19 years of being a Jewish Canadian! I'll always remember Daniel dropping \"Call On Me,\" you getting hella hyped, and then shipping you off in the uber and tucking yo aah in bed after u PROJECTILE VOMITED. 🤮 <br>I'm seriously so grateful that you were my first Cornell friend, and I feel you've opened my eyes up so much to the world, whether it be Koreans, chromehearts, or your deep yap‼️ <br>Anyways imma visit the big van 🍁 some time so I can add it to my insta bio, and I'm tryna get a closet tour and get food recs. 🍲 meow.<br>Love,<br>B Diddy 😻🧃"
    },
    {
        id: 2,
        name: "David",
        image: "assets/images/prize-2.jpg",
        letter: "Dear Stanley,<br>Happy birthday! You are my favorite Canadian and that will never change. Nevertheless, I’m still gonna Nut-in-Sci you. Even though I’m usually sleeping and you’re usually… nutting(?), we still somehow find the time to make fruitful encounters.<br>I hope you’ve had fun back in Canada during the break. Though keeping in mind recent geopolitical events, perhaps you will be joining me in becoming an American one day.<br>Until then,<br>David"
    },
    {
        id: 3,
        name: "Jaelyn",
        image: "assets/images/prize-3.jpg",
        letter: "HAPPY BIRTHDAY STANLEYYY!!<br>Crazy to think if Bojro never introduced us we wouldn’t be friends right now 🙏<br>#ilovecanadavancouver<br>– Jaelyn"
    },
    {
        id: 4,
        name: "Sajan",
        image: "assets/images/prize-4.jpg",
        letter: "Happy birthday wuca, Its been amazing getting to know you and FWS with you and zzzzzetong was mad fun. Ur my favorite Canadian and I hope you get to show me around Vancouver some day. Love you wuca have a good one<br>– Sajan"
    },
    {
        id: 5,
        name: "Rehaan",
        image: "assets/images/prize-5.jpg",
        letter: "Happy birthday! Thank you for being a chill roomate this past semester. Even though going random had me worried, I’m lucky I ended up rooming with you. Looking forward to spending the next semester with you. <br>– Rehaan"
    },
    {
        id: 6,
        name: "Abe",
        image: "assets/images/prize-6.jpg",
        letter: "STANLEY!!<br>Hey goattt HAPPY BIRTHDAYY!! it’s been so nice getting to know you this year for cornell and i’m glad we’re friends!! you’re always so funny and bring a vibe to wherever we hangout in dull ahh ithaca😭. i hope you have a great one and we all love u soso much 😁<br>–abe <br>p.s. when we running back matcha?"
    },
    {
        id: 7,
        name: "Masaki",
        image: "assets/images/prize-7.jpg",
        letter: "To my favorite chrome hearts, Frank ocean, abg enthusiast:<br>HAPPY BIRTHDAY STANLEY!!<br>I’m so lucky to have met you at Cornell, and I might’ve not made the first semester without you. I smell many abgs and Pokémon card hits in the near future, we’ll make it through the next 7 semesters.😛😛<br>-your twin Masaki"
    },
    {
        id: 8,
        name: "Johnny",
        image: "assets/images/prize-8.jpg",
        letter: "Hi Stan the Man! Happy 19th birthday! Sorry we can’t be there to celebrate in person. But I hope you live it up over in Vancouver, or wherever you’re going. I remember when we first met (kinda). I think we were going to some party, and at first, your blunt words threw me off, i won’t lie. But we talked about random stuff like pokémon, and as i got to know you better, i found out that your bluntness was your way of being sincere. Not wearing a mask, as you say. And I’ve come to really appreciate your different worldviews, your truthfulness, and our conversations on life and different dilemmas. One of my most fond memories of college was that night me you and elaine just yapped, and we went back to your room and talked more, until 4-5. Not to be too sappy, but I truly do value you, and am very thankful that I got to know you, and have you in my life. Anyways, i was told to keep it short, so I hope you celebrate safely, and I wish you the best 19th birthday!<br>-Johnny"
    },
    {
        id: 9,
        name: "Nico",
        image: "assets/images/prize-9.jpg",
        letter: "Dearest Stanley,<br>Happy birthday to the best Canadian anyone can ask for. You put the W in WE FAILED nutrition, chem, and all the classes next sem WE will fail together. Luv you 😘 <br>-Nico"
    },
    {
        id: 10,
        name: "Audrey",
        image: "assets/images/prize-10.jpg",
        letter: "Happy birthday Stanley!! I’m so glad I got to know u this year! Thanks for being such an amazing friend and physics tutor 😊 Hope you have a great bday!! - Audrey"
    },
    {
        id: 11,
        name: "Noah",
        image: "assets/images/prize-11.jpg",
        letter: "HAPPY BIRTHDAY STANLEY!!! im so glad i got to know you this sem and im glad we got so close ☺️. we definitely bonded through chem trauma(even if youre always preying on my downfall) and just chatting about anything! youre such a real guy and i really appreciate that authenticity especially in this day and age. i hope you have the best 19th birthday and i know youre gonna have a great year! im looking forward to hanging w you more and getting closer 😉 to you this sem. and ill def come to vancouver this summer if i can afford it!! see you soon sw☺️<br>-Noah"
    },
    {
        id: 12,
        name: "Elaine",
        image: "assets/images/prize-12.jpg",
        letter: "Dear the FLATEST of them all,<br>    Happy birthday flat stanely. You are holy unc now! Ty for letting me bomb your dorm at weird hours and letting me make buldak in your water boiler . I’m so grateful that you trapped me into that inital talk tuah - our conversations are always so interesting, unique, and 67. On a real note, thanks for being one of my go to people here, you are an important part of our group. Dont forget all the things you need to tell me from you Canadian adventures, take tuah soon goat!<br>Best,<br>676869676869elainezhang"
    },
    {
        id: 13,
        name: "Ryan",
        image: "assets/images/prize-13.jpg",
        letter: "dear stanley,<br>happy birthday penis penis penis penis penis penis penis<br>anyways ur my favorite cutie little canadian and ur so hot and fantastic and beautiful <br>anyways it has been super nice getting to know u this semester and i look forward to getting closer w u. hopefully we can goon together more and get food mmmm.<br>happy 19th again YESS UNC<br>-ur favorite, ryan chen"
    },
    {
        id: 14,
        name: "Kevin",
        image: "assets/images/prize-14.jpg",
        letter: "Roses are red, violets are blue, I hate fucking Canadians, but I guess that you’ll do. In this vast vast world, of hundreds of “you”, I’d give you a 7 out of 6 for what you do. Happy happy birthday, second best Canadian of all, I hope that you enjoy my letter this fall.<br><br>-yevin kan write poetry"
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

// Generate decorative balls in globe with random colors
function generateBalls() {
    ballsContainer.innerHTML = '';
    const totalBalls = 20;
    const remaining = getRemainingPrizes().length;
    const colorClasses = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 
                         'color-7', 'color-8', 'color-9', 'color-10', 'color-11', 'color-12'];

    for (let i = 0; i < totalBalls; i++) {
        const ball = document.createElement('div');
        ball.className = 'ball';
        
        // Assign random color
        const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];
        ball.classList.add(randomColor);
        
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
