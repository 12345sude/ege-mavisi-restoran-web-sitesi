// ==========================================================================
// Seafood Restaurant - app.js
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMenu();
    initRatings();
    initCareers();
    initReservations();
    initScrollAnimations();
});

// ==========================================================================
// 1. Navbar Scroll & Mobile Menu
// ==========================================================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightNavLink();
    });

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // Highlight Active Link based on Scroll
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 150;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ==========================================================================
// 2. Menu Search & Filters
// ==========================================================================
const MENU_ITEMS = [
    {
        id: 1,
        name: 'Girit Ezmesi',
        category: 'starters',
        price: '180 ₺',
        desc: 'Süzme peynir, ezilmiş antep fıstığı, taze fesleğen, sarımsak ve sızma zeytinyağı ile hazırlanan geleneksel lezzet.',
        rating: 4.8,
        reviews: 24,
        image: 'images/dish3.png', // Fallback/Sharing image
        badge: 'Favori'
    },
    {
        id: 2,
        name: 'Izgara Ege Levreği',
        category: 'mains',
        price: '460 ₺',
        desc: 'Mangalda közlenmiş taze Ege levreği, marine edilmiş roka yaprakları, mor soğan halkaları ve limon eşliğinde.',
        rating: 4.9,
        reviews: 78,
        image: 'images/dish1.png',
        badge: 'Şefin Seçimi'
    },
    {
        id: 3,
        name: 'Istakozlu Linguine',
        category: 'mains',
        price: '680 ₺',
        desc: 'Taze ıstakoz eti, cherry domatesler, taze sarımsak, acı pul biber ve fesleğenli zengin domates sos ile harmanlanmış el yapımı makarna.',
        rating: 5.0,
        reviews: 42,
        image: 'images/dish2.png',
        badge: 'Gurme'
    },
    {
        id: 4,
        name: 'Ahtapot Izgara',
        category: 'starters',
        price: '390 ₺',
        desc: 'Özel marinasyonlu ve meşe odununda ızgaralanmış ahtapot bacağı, kekikli zeytinyağı sosu ve kapari ile.',
        rating: 4.7,
        reviews: 55,
        image: 'images/dish3.png',
        badge: 'Çok Satan'
    },
    {
        id: 5,
        name: 'Çıtır Kalamar & Karides',
        category: 'starters',
        price: '340 ₺',
        desc: 'Altın sarısı çıtır kaplamalı kalamar halkaları ve karides tava, ev yapımı sarımsaklı tartar sos ile sıcak servis edilir.',
        rating: 4.8,
        reviews: 92,
        image: 'images/dish3.png',
        badge: 'Taze'
    },
    {
        id: 6,
        name: 'Ege Tarla Salatası',
        category: 'salads',
        price: '160 ₺',
        desc: 'Çengelköy salatalığı, tarla domatesi, kırmızı soğan, kalamata zeytinleri, Ezine beyaz peyniri ve kekikli sızma zeytinyağı.',
        rating: 4.6,
        reviews: 18,
        image: 'images/dish1.png',
        badge: 'Hafif'
    },
    {
        id: 7,
        name: 'Roka & Parmesan Salatası',
        category: 'salads',
        price: '175 ₺',
        desc: 'Taze körpe roka yaprakları, kurutulmuş domates dilimleri, ceviz içi, parmesan peyniri ve özel nar ekşisi sosu.',
        rating: 4.7,
        reviews: 31,
        image: 'images/dish2.png',
        badge: ''
    },
    {
        id: 8,
        name: 'Sıcak Helva',
        category: 'desserts',
        price: '150 ₺',
        desc: 'Fırınlanmış tahin helvası, limon kabuğu rendesi ve antep fıstığı ile fırından yeni çıkmış sıcak kase servisi.',
        rating: 4.9,
        reviews: 64,
        image: 'images/dish1.png',
        badge: 'Geleneksel'
    },
    {
        id: 9,
        name: 'İrmik Helvası',
        category: 'desserts',
        price: '140 ₺',
        desc: 'Geleneksel kavrulmuş irmik helvası içerisinde gizli manda sütü dondurması ile ferahlatıcı bir final.',
        rating: 4.8,
        reviews: 49,
        image: 'images/dish2.png',
        badge: 'Klasik'
    },
    {
        id: 10,
        name: 'Ev Yapımı Nane Limonata',
        category: 'drinks',
        price: '75 ₺',
        desc: 'Taze sıkılmış limon suyu, nane yaprakları ve bal ile tatlandırılmış, buz gibi ev yapımı içecek.',
        rating: 4.7,
        reviews: 38,
        image: 'images/dish3.png',
        badge: 'Ev Yapımı'
    },
    {
        id: 11,
        name: 'Şalgam Suyu (Özel)',
        category: 'drinks',
        price: '55 ₺',
        desc: 'Doğal fermente acılı veya acısız Adana usulü şalgam suyu.',
        rating: 4.5,
        reviews: 15,
        image: 'images/dish1.png',
        badge: ''
    }
];

function initMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const menuSearch = document.getElementById('menuSearch');
    const tabBtns = document.querySelectorAll('.tab-btn');

    let currentCategory = 'all';
    let searchQuery = '';

    // Initial Render
    renderMenuItems();

    // Tab Filter click handler
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderMenuItems();
        });
    });

    // Search Keyup handler
    menuSearch.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderMenuItems();
    });

    function renderMenuItems() {
        menuGrid.innerHTML = '';
        
        const filtered = MENU_ITEMS.filter(item => {
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery) || 
                                  item.desc.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            menuGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                    <i class="fa-regular fa-face-frown" style="font-size: 3rem; margin-bottom: 15px; color: var(--accent);"></i>
                    <h3>Lezzet bulunamadı!</h3>
                    <p>Arama kriterlerinize uygun menü öğesi eşleşmedi. Farklı bir kelime deneyebilirsiniz.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card fade-in';
            
            // Build rating stars
            let starsHtml = '';
            const fullStars = Math.floor(item.rating);
            const hasHalf = item.rating % 1 >= 0.5;
            
            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                    starsHtml += '<i class="fa-solid fa-star"></i>';
                } else if (i === fullStars + 1 && hasHalf) {
                    starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
                } else {
                    starsHtml += '<i class="fa-regular fa-star"></i>';
                }
            }

            card.innerHTML = `
                <div class="menu-img-wrapper">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
                </div>
                <div class="menu-content">
                    <div class="menu-card-header">
                        <h3>${item.name}</h3>
                        <span class="menu-price">${item.price}</span>
                    </div>
                    <p class="menu-desc">${item.desc}</p>
                    <div class="menu-card-footer">
                        <div class="menu-card-stars">
                            ${starsHtml}
                            <span>(${item.reviews})</span>
                        </div>
                        <button class="menu-order-btn" onclick="openQuickOrder('${item.name}')">
                            Sipariş Ver <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }
}

// Global Order helper to bridge to Booking Section
window.openQuickOrder = function(itemName) {
    const bookNote = document.getElementById('bookNote');
    const contactSection = document.getElementById('contact');
    
    if (bookNote) {
        bookNote.value = `Menüden seçilen sipariş isteği: ${itemName}. `;
    }
    
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Pulse booking card briefly
        const bookingCard = document.querySelector('.booking-card');
        if (bookingCard) {
            bookingCard.style.outline = '3px solid var(--accent)';
            setTimeout(() => {
                bookingCard.style.outline = 'none';
            }, 2000);
        }
    }
};


// ==========================================================================
// 3. Ratings & Reviews System (LocalStorage)
// ==========================================================================
const DEFAULT_REVIEWS = [
    {
        id: 1,
        name: 'Kemal Akgün',
        rating: 5,
        comment: 'İzmir kordonda yediğim en taze levrekti. Mezelerden özellikle Girit ezmesi ve Ahtapot ızgarası olağanüstü. Servis ekibi çok ilgiliydi, teşekkür ederiz.',
        date: '2 saat önce'
    },
    {
        id: 2,
        name: 'Sude Elif Yılmaz',
        rating: 4,
        comment: 'Harika bir deniz manzarası var. Yemekler çok taze ve porsiyonlar gayet doyurucu. Rezervasyonsuz yer bulmak zor, mutlaka haftalar öncesinden planlayın.',
        date: '1 gün önce'
    },
    {
        id: 3,
        name: 'Caner Şen',
        rating: 5,
        comment: 'Istakozlu linguine gerçekten şefin ustalık eseri olmuş. Fiyatlar bu kalite ve taze lezzete göre oldukça makul. Romantik akşam yemekleri için mükemmel.',
        date: '3 gün önce'
    }
];

function initRatings() {
    const reviewsList = document.getElementById('reviewsList');
    const reviewForm = document.getElementById('reviewForm');
    const reviewerNameInput = document.getElementById('reviewerName');
    const reviewerCommentInput = document.getElementById('reviewerComment');
    const starInputContainer = document.getElementById('starRatingInput');
    const starBtns = starInputContainer.querySelectorAll('.star-btn');
    const ratingError = document.getElementById('ratingError');
    
    // Stats elements
    const avgRatingText = document.getElementById('avgRating');
    const avgStarsContainer = document.getElementById('avgStars');
    const totalReviewsText = document.getElementById('totalReviewsCount');

    let selectedRating = 0;

    // Load from local storage or set defaults
    let reviews = JSON.parse(localStorage.getItem('restaurant_reviews'));
    if (!reviews || reviews.length === 0) {
        reviews = [...DEFAULT_REVIEWS];
        localStorage.setItem('restaurant_reviews', JSON.stringify(reviews));
    }

    renderReviewsList();
    updateRatingStats();

    // Star Selection Interaction
    starBtns.forEach(star => {
        // Hover
        star.addEventListener('mouseover', () => {
            const val = parseInt(star.dataset.value);
            highlightInputStars(val, 'hover');
        });

        // Mouse out
        star.addEventListener('mouseout', () => {
            clearInputStarHover();
        });

        // Click
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.value);
            highlightInputStars(selectedRating, 'active');
            ratingError.style.display = 'none';
        });
    });

    function highlightInputStars(val, className) {
        starBtns.forEach(star => {
            const starVal = parseInt(star.dataset.value);
            if (starVal <= val) {
                star.classList.add(className);
                if (className === 'active') {
                    star.classList.replace('fa-regular', 'fa-solid');
                }
            } else {
                if (className === 'hover') {
                    star.classList.remove('hover');
                } else if (className === 'active') {
                    star.classList.remove('active');
                    star.classList.replace('fa-solid', 'fa-regular');
                }
            }
        });
    }

    function clearInputStarHover() {
        starBtns.forEach(star => {
            star.classList.remove('hover');
        });
    }

    // Submit Review Form
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate Rating
        if (selectedRating === 0) {
            ratingError.style.display = 'block';
            return;
        }

        const name = reviewerNameInput.value.trim();
        const comment = reviewerCommentInput.value.trim();

        if (!name || !comment) {
            alert('Lütfen tüm alanları doldurunuz.');
            return;
        }

        // Create new review object
        const newReview = {
            id: Date.now(),
            name: name,
            rating: selectedRating,
            comment: comment,
            date: 'Şimdi'
        };

        // Save
        reviews.unshift(newReview);
        localStorage.setItem('restaurant_reviews', JSON.stringify(reviews));

        // UI Reset & Update
        reviewForm.reset();
        selectedRating = 0;
        highlightInputStars(0, 'active');
        
        renderReviewsList();
        updateRatingStats();

        // Show Modal Notice
        showNotificationModal('Teşekkür Ederiz!', `${name}, değerlendirmeniz başarıyla kaydedildi. Deneyiminizi bizimle paylaştığınız için teşekkür ederiz.`);
    });

    function renderReviewsList() {
        reviewsList.innerHTML = '';
        reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-item';

            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    starsHtml += '<i class="fa-solid fa-star"></i>';
                } else {
                    starsHtml += '<i class="fa-regular fa-star"></i>';
                }
            }

            const initial = review.name.charAt(0).toUpperCase();

            reviewDiv.innerHTML = `
                <div class="review-meta">
                    <div class="reviewer-profile">
                        <div class="reviewer-avatar">${initial}</div>
                        <div class="reviewer-name-time">
                            <h4>${review.name}</h4>
                            <span>${review.date}</span>
                        </div>
                    </div>
                    <div class="review-item-stars">
                        ${starsHtml}
                    </div>
                </div>
                <p class="review-text">"${review.comment}"</p>
            `;
            reviewsList.appendChild(reviewDiv);
        });
    }

    function updateRatingStats() {
        if (reviews.length === 0) return;
        
        const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
        const avg = (sum / reviews.length).toFixed(1);
        
        avgRatingText.innerText = avg;
        totalReviewsText.innerText = `Toplam ${reviews.length} değerlendirme`;

        // Render Avg Stars
        avgStarsContainer.innerHTML = '';
        const fullStars = Math.floor(avg);
        const hasHalf = avg % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                avgStarsContainer.innerHTML += '<i class="fa-solid fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalf) {
                avgStarsContainer.innerHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                avgStarsContainer.innerHTML += '<i class="fa-regular fa-star"></i>';
            }
        }
    }
}

// ==========================================================================
// 4. Careers / Recruitment Application Form
// ==========================================================================
function initCareers() {
    const careerForm = document.getElementById('careerForm');
    const fileDropzone = document.getElementById('fileDropzone');
    const cvFileInput = document.getElementById('cvFile');
    const fileUploadName = document.getElementById('fileUploadName');

    // Trigger File input on click
    fileDropzone.addEventListener('click', () => {
        cvFileInput.click();
    });

    // File selection display
    cvFileInput.addEventListener('change', (e) => {
        handleFileSelection(e.target.files);
    });

    // Drag and Drop implementation
    fileDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropzone.style.borderColor = 'var(--accent)';
        fileDropzone.style.backgroundColor = 'rgba(182, 75, 38, 0.05)';
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileDropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            fileDropzone.style.borderColor = 'var(--secondary-dark)';
            fileDropzone.style.backgroundColor = 'rgba(13, 27, 42, 0.01)';
        });
    });

    fileDropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFileSelection(files);
        cvFileInput.files = files; // Sync files
    });

    function handleFileSelection(files) {
        if (files.length > 0) {
            const file = files[0];
            // Format file size
            const sizeKB = (file.size / 1024).toFixed(1);
            fileUploadName.innerText = `Seçilen Dosya: ${file.name} (${sizeKB} KB)`;
        }
    }

    // Submit Job Application
    careerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('applicantName').value.trim();
        const phone = document.getElementById('applicantPhone').value.trim();
        const email = document.getElementById('applicantEmail').value.trim();
        const position = document.getElementById('applicantPosition').value;
        const experience = document.getElementById('applicantExperience').value.trim();

        if (!name || !phone || !email || !position || !experience) {
            alert('Lütfen başvuru formundaki tüm zorunlu alanları doldurunuz.');
            return;
        }

        // Mock Resume object
        const fileName = cvFileInput.files.length > 0 ? cvFileInput.files[0].name : 'Eklenmedi';

        const application = {
            id: Date.now(),
            name,
            phone,
            email,
            position,
            experience,
            resume: fileName,
            date: new Date().toLocaleDateString('tr-TR')
        };

        // Save candidate details locally
        let careerApps = JSON.parse(localStorage.getItem('restaurant_career_apps')) || [];
        careerApps.push(application);
        localStorage.setItem('restaurant_career_apps', JSON.stringify(careerApps));

        // Reset
        careerForm.reset();
        fileUploadName.innerText = '';

        // Show Modal Notice
        showNotificationModal(
            'Başvurunuz Alındı!',
            `Değerli <strong>${name}</strong>, <strong>${position}</strong> pozisyonu için yaptığınız iş başvurusu başarıyla veritabanımıza iletildi. İlgili birimimiz inceledikten sonra telefon (${phone}) veya e-posta yoluyla sizinle irtibata geçecektir.`
        );
    });
}

// ==========================================================================
// 5. Reservation Forms
// ==========================================================================
function initReservations() {
    const bookingForm = document.getElementById('bookingForm');
    const bookDateInput = document.getElementById('bookDate');

    // Prevent booking dates in the past
    const today = new Date().toISOString().split('T')[0];
    if (bookDateInput) {
        bookDateInput.setAttribute('min', today);
    }

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('bookName').value.trim();
        const phone = document.getElementById('bookPhone').value.trim();
        const date = document.getElementById('bookDate').value;
        const time = document.getElementById('bookTime').value;
        const guests = document.getElementById('bookGuests').value;
        const notes = document.getElementById('bookNote').value.trim();

        if (!name || !phone || !date || !time || !guests) {
            alert('Lütfen rezervasyon için gerekli tüm alanları doldurunuz.');
            return;
        }

        const booking = {
            id: Date.now(),
            name,
            phone,
            date,
            time,
            guests,
            notes,
            status: 'Approved'
        };

        // Save Booking details locally
        let bookings = JSON.parse(localStorage.getItem('restaurant_bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('restaurant_bookings', JSON.stringify(bookings));

        // Reset Form
        bookingForm.reset();

        // Show Success Modal
        showNotificationModal(
            'Masa Rezervasyonunuz Onaylandı!',
            `Sayın <strong>${name}</strong>, <strong>${date}</strong> tarihinde saat <strong>${time}</strong> için <strong>${guests} kişilik</strong> masa rezervasyonunuz onaylanmıştır. Rezervasyon detayları SMS ile <strong>${phone}</strong> numaralı hattınıza iletilmiştir. Keyifli akşamlar dileriz!`
        );
    });
}

// ==========================================================================
// 6. Success Notification Modal Controls
// ==========================================================================
function showNotificationModal(title, message) {
    const modal = document.getElementById('notificationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const closeBtn = document.getElementById('modalCloseBtn');

    modalTitle.innerHTML = title;
    modalMessage.innerHTML = message;
    modal.classList.add('active');

    // Close on button click
    closeBtn.addEventListener('click', closeModal);

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
    }
}

// ==========================================================================
// 7. Scroll Reveal / Micro-Animations
// ==========================================================================
function initScrollAnimations() {
    const faders = document.querySelectorAll('.fade-in-up, .highlight-card, .menu-card, .position-card');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        // Add class for setup
        fader.style.opacity = '0';
        fader.style.transform = 'translateY(30px)';
        fader.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Inject utility styles into document header for .appear state
        if (!document.getElementById('scrollRevealStyles')) {
            const style = document.createElement('style');
            style.id = 'scrollRevealStyles';
            style.innerHTML = `
                .fade-in-up.appear, .highlight-card.appear, .menu-card.appear, .position-card.appear {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `;
            document.head.appendChild(style);
        }

        appearOnScroll.observe(fader);
    });
}
