// DOM이 완전히 로드된 후 실행
const imageSliderIndex = 0;


fetch('https://api.cusme-shoe.net/products/search/?search=&ordering=&page_size=10&page_number=1') 
    .then(response => response.json())
    .then(data => console.log(data));

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer 옵션 설정
    const observerOptions = {
        threshold: 0.1, // 요소가 10% 보일 때 트리거
        rootMargin: '0px 0px -20px 0px' // 요소가 화면 하단에서 20px 전에 트리거
    };

    // Intersection Observer 생성
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 화면에 나타나면 'visible' 클래스 추가
                entry.target.classList.add('visible');
            
            }
        });
    }, observerOptions);

    // 애니메이션을 적용할 모든 요소 선택 (이미지, 텍스트, 제목 등)
    const animatedElements = document.querySelectorAll('img, h1, h2, h3, p, strong, div, section, header');
    
    // 각 요소에 애니메이션 클래스 추가 및 observer 적용
    animatedElements.forEach((element, index) => {
        // 애니메이션 클래스 추가
        element.classList.add('scroll-fade-in');
        
        // observer 적용
        observer.observe(element);
    });

    // 카운트다운 기능 추가
    function startCountdown() {
        // 목표 날짜 설정 (예: 3일 후)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);
        targetDate.setHours(21, 40, 55, 0); // 21시 40분 55초로 설정

        function updateCountdown() {
            const now = new Date();
            const timeDifference = targetDate - now;

            if (timeDifference <= 0) {
                // 카운트다운 종료
                document.querySelector('.count-down-time-date').textContent = '00';
                document.querySelector('.count-down-time-hour').textContent = '00';
                document.querySelector('.count-down-time-minute').textContent = '00';
                document.querySelector('.count-down-time-second').textContent = '00';
                return;
            }

            // 남은 시간 계산
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // 화면에 업데이트 (두 자리 숫자로 표시)
            document.querySelector('.count-down-time-date').textContent = days.toString().padStart(2, '0');
            document.querySelector('.count-down-time-hour').textContent = hours.toString().padStart(2, '0');
            document.querySelector('.count-down-time-minute').textContent = minutes.toString().padStart(2, '0');
            document.querySelector('.count-down-time-second').textContent = seconds.toString().padStart(2, '0');
        }

        // 초기 실행
        updateCountdown();
        
        // 1초마다 업데이트
        setInterval(updateCountdown, 1000);
    }

    // 카운트다운 시작
    startCountdown();

    // transform: translate(-100vw)

    document.querySelector('.button1').addEventListener('click', () => {
        document.querySelector('.image-slider').style.transform = 'translateX(0%)';
    });

    document.querySelector('.button2').addEventListener('click', () => {
        document.querySelector('.image-slider').style.transform = 'translateX(-100%)';
    });

    document.querySelector('.button3').addEventListener('click', () => {
        document.querySelector('.image-slider').style.transform = 'translateX(-200%)';
    });
}); 