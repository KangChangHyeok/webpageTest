// DOM이 완전히 로드된 후 실행
const imageSliderIndex = 0;

async function loadProducts() {
    try {
        const response = await fetch('https://dev.cusme-shoe.net/products/search/?search=&ordering=&page_size=10&page_number=1');
        const data = await response.json();
        const products = data.results;

        const productList = document.querySelector('.product-list');
        productList.innerHTML = ''; // 기존 내용 비우기

        products.forEach(product => {
            // 이미지가 없는 경우 대비
            const imageUrl = (product.image_items && product.image_items.length > 0)
                ? product.image_items[0].image
                : '';

            const productHTML = `
                <li class="product-item" data-id="${product.id}">
                    <img src="${imageUrl}" alt="${product.name}">
                    <div class="product-info">
                        <h1 class="brand-name">${product.supplier_eng_name}</h1>
                        <p class="product-name">${product.name}</p>
                        <p class="product-original-price">${product.price.toLocaleString()}원</p>
                        <div class="product-price">
                            <p class="product-discount-rate">${product.discount_rate}%</p>
                            <p class="product-final-price">${product.total_price.toLocaleString()}원</p>
                        </div>
                    </div>
                </li>
            `;
            productList.insertAdjacentHTML('beforeend', productHTML);
        });
    } catch (error) {
        console.error('상품 데이터 로드 실패:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    // 커즈미슈즈에 등록된 상품 데이터 가져오기
    loadProducts();

    const productList = document.querySelector('.product-list');
    productList.addEventListener('click', function(e) {
        let target = e.target;
        // li.product-item이 아닐 경우 부모로 타고 올라감
        while (target && !target.classList.contains('product-item')) {
            target = target.parentElement;
        }
        if (target && target.classList.contains('product-item')) {
            const productId = target.getAttribute('data-id');
            // iOS 웹뷰로 메시지 전송 (WKWebView)
            window.webkit.messageHandlers.iosListener.postMessage({
                productId: productId,
                productName: target.querySelector('.product-name').textContent,
                brandName: target.querySelector('.brand-name').textContent
            });
        }
    });

    // Intersection Observer 옵션 설정
    const observerOptions = {
        threshold: 0.1, // 요소가 10% 보일 때 트리거
        rootMargin: '0px 0px -20px 0px' // 요소가 화면 하단에서 20px 전에 트리거
    };

    // Intersection Observer 생성
    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             // 요소가 화면에 나타나면 'visible' 클래스 추가
    //             entry.target.classList.add('visible');
            
    //         }
    //     });
    // }, observerOptions);

    // 애니메이션을 적용할 모든 요소 선택 (이미지, 텍스트, 제목 등)
    // const animatedElements = document.querySelectorAll('img, h1, h2, h3, p, strong, div, section, header');
    
    // // 각 요소에 애니메이션 클래스 추가 및 observer 적용
    // animatedElements.forEach((element, index) => {
    //     // 애니메이션 클래스 추가
    //     element.classList.add('scroll-fade-in');
        
    //     // observer 적용
    //     observer.observe(element);
    // });

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