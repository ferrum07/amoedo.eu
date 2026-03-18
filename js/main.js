// =============================================
// FRUTIGER AERO EXTREME - SISTEMA BILINGÜE
// Amoedo, 2026
// =============================================

const translations = {
    es: {
        navHome: "Inicio",
        navPolygon: "Polígono",
        navMontes: "Comunidad de Montes",
        navHistory: "Historia",
        navCultura: "Casa Cultural",
        navEvents: "Fiestas",
        navPhotos: "Fotos",
        welcomeTitle: "Bienvenidos al Paraíso Rural",
        welcomeText: "Descubre la magia de Amoedo. Donde el verde de nuestros montes se encuentra con la tranquilidad del futuro. Un lugar ideal para desconectar y respirar aire puro.",
        placesTitle: "Lugares de Interés",
        place1: "O Pouso",
        place2: "La Iglesia",
        place3: "Rutas de Senderismo",
        weatherTitle: "El Tiempo",
        weatherLoading: "Cargando datos del tiempo...",
        weatherError: "No se pudo cargar el tiempo",
        weatherHumidity: "Humedad",
        weatherWind: "Viento",
        weatherFeels: "Sensación",
        weatherPressure: "Presión",
        weatherUpdated: "Actualizado",
        weatherDescriptions: {
            "clear sky": "cielo despejado",
            "few clouds": "pocas nubes",
            "scattered clouds": "nubes dispersas",
            "broken clouds": "nuboso",
            "overcast clouds": "muy nuboso",
            "shower rain": "chubascos",
            "rain": "lluvia",
            "thunderstorm": "tormenta",
            "snow": "nieve",
            "mist": "niebla",
            "fog": "niebla densa",
            "haze": "bruma",
            "light rain": "lluvia ligera",
            "moderate rain": "lluvia moderada",
            "heavy rain": "lluvia fuerte",
            "drizzle": "llovizna"
        },
        eventTitle: "Próximo Evento",
        eventName: "Romaría de San Amaro",
        eventDate: "15 de enero de 2026",
        eventDesc: "Misa, procesión y verbena con Orquesta Saudade",
        eventBtn: "Ver programa",
        daysLabel: "días",
        dayLabel: "día",
        todayLabel: "¡Hoy!",
        linksTitle: "Enlaces",
        link1: "Concello de Pazos",
        link2: "Turismo Rías Baixas",
        link3: "Comunidad de Montes",
        footerText: "Amoedo, 2026"
    },
    gl: {
        navHome: "Inicio",
        navPolygon: "Polígono",
        navMontes: "Comunidade de Montes",
        navHistory: "Historia",
        navCultura: "Casa Cultural",
        navEvents: "Festas",
        navPhotos: "Fotos",
        welcomeTitle: "Benvidos ao Paraíso Rural",
        welcomeText: "Descubre a maxia de Amoedo. Onde o verde dos nosos montes se encontra coa tranquilidade do futuro. Un lugar ideal para desconectar e respirar aire puro.",
        placesTitle: "Lugares de Interese",
        place1: "O Pouso",
        place2: "A Igrexa",
        place3: "Rutas de Sendeirismo",
        weatherTitle: "O Tempo",
        weatherLoading: "Cargando datos do tempo...",
        weatherError: "Non se puido cargar o tempo",
        weatherHumidity: "Humidade",
        weatherWind: "Vento",
        weatherFeels: "Sensación",
        weatherPressure: "Presión",
        weatherUpdated: "Actualizado",
        weatherDescriptions: {
            "clear sky": "ceo despexado",
            "few clouds": "poucas nubes",
            "scattered clouds": "nubes dispersas",
            "broken clouds": "nuboso",
            "overcast clouds": "moi nuboso",
            "shower rain": "chuvasco",
            "rain": "chuvia",
            "thunderstorm": "tormenta",
            "snow": "neve",
            "mist": "néboa",
            "fog": "néboa densa",
            "haze": "brétema",
            "light rain": "chuvia lixeira",
            "moderate rain": "chuvia moderada",
            "heavy rain": "chuvia forte",
            "drizzle": "orballo"
        },
        eventTitle: "Próximo Evento",
        eventName: "Romaría de San Amaro",
        eventDate: "15 de xaneiro de 2026",
        eventDesc: "Misa, procesión e verbena coa Orquestra Saudade",
        eventBtn: "Ver programa",
        daysLabel: "días",
        dayLabel: "día",
        todayLabel: "¡Hoxe!",
        linksTitle: "Ligazóns",
        link1: "Concello de Pazos",
        link2: "Turismo Rías Baixas",
        link3: "Comunidade de Montes",
        footerText: "Amoedo, 2026"
    }
};

let currentLang = localStorage.getItem('amoedoLang') || 'es';

// ✅ FUNCIÓN PRINCIPAL DE CAMBIO DE IDIOMA (SIEMPRE FUNCIONA)
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('amoedoLang', lang);
    document.getElementById('lang-es').classList.toggle('active', lang === 'es');
    document.getElementById('lang-gl').classList.toggle('active', lang === 'gl');
    updateCommonTexts();
    if (typeof updatePageTexts === 'function') updatePageTexts();
    fetchWeather();
    updateCountdown();
}

// ✨ NUEVA FUNCIÓN: SOLO PARA CLICKS (con efecto visual)
function handleLanguageClick(lang, event) {
    // Crear onda de luz cian
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = event.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    event.target.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Cambiar idioma
    changeLanguage(lang);
}

function updateCommonTexts() {
    const t = translations[currentLang];
    const elements = {
        'nav-home': t.navHome,
        'nav-polygon': t.navPolygon,
        'nav-montes': t.navMontes,
        'nav-history': t.navHistory,
        'nav-cultura': t.navCultura,
        'nav-events': t.navEvents,
        'nav-photos': t.navPhotos,
        'welcome-title': t.welcomeTitle,
        'welcome-text': t.welcomeText,
        'places-title': t.placesTitle,
        'place-1': t.place1,
        'place-2': t.place2,
        'place-3': t.place3,
        'weather-title': t.weatherTitle,
        'event-title': t.eventTitle,
        'event-name': t.eventName,
        'event-date': t.eventDate,
        'event-desc': t.eventDesc,
        'event-btn': t.eventBtn,
        'links-title': t.linksTitle,
        'link-1': t.link1,
        'link-2': t.link2,
        'link-3': t.link3,
        'footer-text': t.footerText
    };

    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }
}

const API_KEY = '26741e61eedf97afb86a8a3d120c9537';
const LAT = 42.3833;
const LON = -8.6167;
const weatherIcons = {
    '01d':'☀️','01n':'🌙','02d':'⛅','02n':'☁️','03d':'☁️','03n':'☁️',
    '04d':'☁️','04n':'☁️','09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌧️',
    '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️','50d':'🌫️','50n':'🌫️'
};

async function fetchWeather() {
    const t = translations[currentLang];
    const w = document.getElementById('weather-widget');
    if (!w) return;
    
    // Skeleton shimmer en estilo Frutiger Aero
    w.innerHTML = `
        <h3 id="weather-title">${t.weatherLoading}</h3>
        <div class="skeleton-shimmer" style="height: 120px; border-radius: 12px; margin: 15px 0;"></div>
        <div class="skeleton-shimmer" style="height: 20px; width: 60%; margin: 10px 0;"></div>
    `;
    
    try {
        const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=${currentLang}`);
        if (!r.ok) throw new Error('Error');
        const d = await r.json();
        displayWeather(d);
    } catch(e) {
        w.innerHTML = `<h3 id="weather-title">${t.weatherTitle}</h3><div class="loading">${t.weatherError}</div>`;
    }
}

function displayWeather(d) {
    const t = translations[currentLang];
    const w = document.getElementById('weather-widget');
    if (!w) return;
    const temp = Math.round(d.main.temp);
    const feels = Math.round(d.main.feels_like);
    const hum = d.main.humidity;
    const press = d.main.pressure;
    const wind = Math.round(d.wind.speed * 3.6);
    const icon = weatherIcons[d.weather[0].icon] || '🌤️';
    let desc = d.weather[0].description;
    if (t.weatherDescriptions[desc.toLowerCase()]) desc = t.weatherDescriptions[desc.toLowerCase()];
    const time = new Date().toLocaleTimeString(currentLang === 'es' ? 'es-ES' : 'gl-ES', {hour:'2-digit',minute:'2-digit'});
    w.innerHTML = `<h3 id="weather-title">${t.weatherTitle}</h3><div class="weather-icon">${icon}</div><div class="weather-temp">${temp}°C</div><div class="weather-desc">${desc}</div><div class="weather-details"><div class="weather-detail-item"><strong>${t.weatherFeels}</strong>${feels}°C</div><div class="weather-detail-item"><strong>${t.weatherHumidity}</strong>${hum}%</div><div class="weather-detail-item"><strong>${t.weatherWind}</strong>${wind} km/h</div><div class="weather-detail-item"><strong>${t.weatherPressure}</strong>${press} hPa</div></div><div class="weather-update">${t.weatherUpdated}: ${time}</div>`;
}

function updateCountdown() {
    const t = translations[currentLang];
    const de = document.getElementById('days-left');
    const dl = document.getElementById('days-label');
    if (!de || !dl) return;
    const ev = new Date('2026-01-15T00:00:00');
    const diff = Math.ceil((ev - new Date()) / 86400000);
    if (diff === 0) {
        de.textContent = '🎉';
        dl.textContent = t.todayLabel;
    } else if (diff === 1) {
        de.textContent = diff;
        dl.textContent = t.dayLabel;
    } else if (diff > 0) {
        de.textContent = diff;
        dl.textContent = t.daysLabel;
    } else {
        const ny = new Date('2027-01-15T00:00:00');
        de.textContent = Math.ceil((ny - new Date()) / 86400000);
        dl.textContent = t.daysLabel;
    }
}

function createBokehCircles() {
    const b = document.querySelector('.bokeh');
    if (!b) return;
    b.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const cx = Math.random() * 100;
        const cy = Math.random() * 100;
        const r = Math.random() * 80 + 40;
        const opacity = Math.random() * 0.3 + 0.15;
        const duration = Math.random() * 20 + 25;
        const delay = Math.random() * 10;
        
        circle.setAttribute('cx', cx + '%');
        circle.setAttribute('cy', cy + '%');
        circle.setAttribute('r', r);
        circle.setAttribute('fill', 'white');
        circle.setAttribute('opacity', opacity);
        circle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.style.position = 'absolute';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.appendChild(circle);
        b.appendChild(svg);
    }
}

// 🎨 Inyectar estilos necesarios
function injectAeroStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(137, 247, 254, 0.6) 0%, transparent 70%);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            z-index: 10;
        }
        @keyframes ripple-animation {
            to { transform: scale(2); opacity: 0; }
        }
        .skeleton-shimmer {
            background: linear-gradient(90deg, #f0f7ff 25%, #e0f0ff 50%, #f0f7ff 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
    `;
    document.head.appendChild(style);
}

// 🚀 Inicialización
document.addEventListener('DOMContentLoaded', function() {
    injectAeroStyles();
    changeLanguage(currentLang); // ✅ Funciona sin evento
    fetchWeather();
    updateCountdown();
    setInterval(fetchWeather, 600000);
    setInterval(updateCountdown, 3600000);
    createBokehCircles();
});
// ── Scroll Reveal ────────────────────────────
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.07) + 's';
        observer.observe(el);
    });
}

// Re-init on DOMContentLoaded (already wrapped)
document.addEventListener('DOMContentLoaded', initScrollReveal);
