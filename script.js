// DOM이 완전히 로드된 후 실행
const imageSliderIndex = 0;
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