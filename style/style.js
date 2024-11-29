    
    const gameArea = document.getElementById('gameArea');
    const scoreBoard = document.getElementById('scoreBoard');
    const timerDisplay = document.getElementById('timer');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const restartButton = document.getElementById('restartButton');
    const finalScoreDisplay = document.getElementById('finalScore');
    let score = 0;
    let timer = 30;
    let gameInterval;
    let fruitInterval;

    const images = [
      '/image/target1.png',
      '/image/target2.png',
      '/image/target3.png',
      '/image/target4.png',
      '/image/target5.png',
      '/image/target6.png',
      '/image/target7.png',
    ];

    function updateScore() {
      scoreBoard.textContent = `Score: ${score}`;
    }

    function updateTimer() {
      timerDisplay.textContent = `Time: ${timer}`;
    }

    function createTarget() {
      const imageSrc = images[Math.floor(Math.random() * images.length)];
      const target = document.createElement('img');
      target.src = imageSrc;
      target.classList.add('target');
      gameArea.appendChild(target);

      // Set random horizontal position
      target.style.left = `${Math.random() * (gameArea.clientWidth - 100)}px`;

      // Remove target after falling off-screen
      target.addEventListener('animationend', () => target.remove());

      target.addEventListener('click', (event) => {
        score++;
        updateScore();

        const clickSound = new Audio('image/click.mp3');
        clickSound.currentTime = 0;
        clickSound.play();

        showImageAtClick(event.clientX, event.clientY);

        // Remove the clicked fruit
        target.remove();
      });
    }

    function showImageAtClick(x, y) {
      const clickEffect = document.createElement('div');
      clickEffect.classList.add('clickEffect');
      clickEffect.style.left = `${x - 50}px`;
      clickEffect.style.top = `${y - 50}px`;
      gameArea.appendChild(clickEffect);

      setTimeout(() => clickEffect.remove(), 800);
    }

    function startGame() {
      score = 0;
      timer = 30;
      updateScore();
      updateTimer();
      gameOverMessage.style.display = 'none';

      // Spawn fruits every 1 second
      fruitInterval = setInterval(() => {
        createTarget();
      }, 1000);

      // Start game timer
      gameInterval = setInterval(() => {
        timer--;
        updateTimer();
        if (timer <= 0) {
          endGame();
        }
      }, 1000);
    }

    function endGame() {
      clearInterval(gameInterval);
      clearInterval(fruitInterval);
      document.querySelectorAll('.target').forEach((target) => target.remove());
      finalScoreDisplay.textContent = score; // Update score dynamically
      gameOverMessage.style.display = 'block';
    }

    restartButton.addEventListener('click', () => {
      startGame();
    });

    startGame();

    // Disable context menu and shortcuts
    document.addEventListener('contextmenu', (event) => event.preventDefault());
    document.addEventListener('selectstart', (event) => event.preventDefault());
    document.addEventListener('dragstart', (event) => event.preventDefault());
    document.addEventListener('keydown', (event) => {
      if (
        (event.ctrlKey && ['u', 's', 'c'].includes(event.key.toLowerCase())) ||
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'i')
      ) {
        event.preventDefault();
      }
    });