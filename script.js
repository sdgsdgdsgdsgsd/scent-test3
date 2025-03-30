document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const startScreen = document.getElementById('start-screen');
  const questionScreen = document.getElementById('question-screen');
  const resultScreen = document.getElementById('result-screen');
  const questionText = document.getElementById('question-text');
  const choicesContainer = document.getElementById('choices');

  const questions = [
    { text: "휴일이 생겼을 때 당신의 선택은?", options: ["조용한 숲속 산책", "카페에서 책읽기", "해변 드라이브"] },
    { text: "좋아하는 공간의 분위기는?", options: ["우디하고 따뜻함", "맑고 가벼움", "시크하고 차분함"] },
    { text: "가장 끌리는 색감은?", options: ["모스그린", "라이트 베이지", "차콜 그레이"] },
  ];

  const scentMap = ["샌달우드", "바질앤베티버", "블랙티앤피그"];
  const scentImages = ["wood.jpg", "basil.jpg", "blacktea.jpg"];
  const scentQuotes = [
    "자연과 하나 되는 당신, 평화로운 우디 향이 어울려요.",
    "생기 넘치고 상쾌한 당신에게 잘 어울리는 허브 향!",
    "고요하고 지적인 분위기의 당신에게 블랙티 향이 찰떡!"
  ];

  let currentQuestion = 0;
  let answers = [];

  startBtn.addEventListener('click', () => {
    startScreen.classList.remove('active');
    questionScreen.classList.add('active');
    document.body.classList.add('woody-theme');
    showQuestion();
  });

  function showQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.text;
    choicesContainer.innerHTML = '';
    q.options.forEach((option, idx) => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.onclick = () => handleAnswer(idx);
      choicesContainer.appendChild(btn);
    });
  }

  function handleAnswer(idx) {
    answers.push(idx);
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    const sum = answers.reduce((a, b) => a + b, 0);
    const resultIdx = Math.floor(sum / answers.length);

    questionScreen.classList.remove('active');
    resultScreen.classList.add('active');

    document.getElementById('result-title').textContent = scentMap[resultIdx];
    document.getElementById('result-desc').textContent = scentQuotes[resultIdx];
    document.getElementById('result-img').src = scentImages[resultIdx];
    document.getElementById('result-quote').textContent = `"${scentQuotes[resultIdx]}"`;
  }

  document.getElementById('retry-btn').onclick = () => {
    location.reload();
  }

  window.copyURL = function () {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었어요!');
  }

  window.downloadResultImage = function () {
    html2canvas(document.getElementById('result-screen')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'my_scent_result.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  window.shareInstagram = function () {
    alert('인스타그램 공유는 스크린샷을 업로드 해주세요!');
  }

  window.shareTikTok = function () {
    alert('TikTok 공유는 영상 제작 후 업로드 해주세요!');
  }
});
