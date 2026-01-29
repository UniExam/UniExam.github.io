document.addEventListener('DOMContentLoaded', () => {

    const convocatoriasData = [
        {
            id: 'unam',
            nombre: 'Universidad Nacional Autónoma de México (UNAM)',
            logo: 'UNAM.png',
            url: 'https://www.dgae.unam.mx/Licenciatura2026/index.html',
            eventos: [
                { nombre: 'Publicación de Convocatoria', fecha: '2026-01-12' },
                { nombre: 'Registro de Aspirantes', fecha: '2026-01-23' },
                { nombre: 'Toma de fotografía', fecha: '2026-01-26' },
                { nombre: 'Aplicación de Examen', fecha: '2026-05-23' },
                { nombre: 'Publicación de Resultados', fecha: '2026-07-17' }
            ]
        },
        {
            id: 'ipn',
            nombre: 'Instituto Politécnico Nacional (IPN)',
            logo: 'POLI.png',
            url: 'https://www.ipn.mx/',
            eventos: [

                { nombre: 'Publicación de Convocatoria (Aproximadamente)', fecha: '2026-02-01' },
                { nombre: 'Aplicación de examen (Aproximadamente)', fecha: '2026-05-30'  },
                { nombre: 'Publicación de resultados (Aproximadamente)', fecha: '2026-07-05' }
            ]
        },

        {
            id: 'uaemex',
            nombre: 'Universidad Autónoma del Estado de México (UAMEX)',
            logo: 'UAEMEX.png',
            url: 'https://www.uaemex.mx/oferta-educativa/aspirantes/convocatorias-ingreso-2026.html',
            eventos: [
                
                { nombre: 'Publicación de Convocatoria', fecha: '2026-01-29' },
                { nombre: 'Registro de Aspirantes', fecha: '2026-02-06'  },
                { nombre: 'Aplicación de Exámen (Aproximadamente)', fecha: '2026-04-03'  },
                { nombre: 'Publicación de resultados (Aproximadamente)', fecha: '2026-05-23' }
            ]
        },
        {
            id: 'uaem',
            nombre: 'Universidad Autónoma del Estado de Morelos (UAEM)',
            logo: 'UAEM.png',
            url: 'https://www.uaem.mx/convocatoria-nivel-superior-2026/',
            eventos: [
                
                { nombre: 'Publicación de Convocatoria', fecha: '2026-01-28' },
                { nombre: 'PRE-FICHA', fecha: '2026-01-28' },
                { nombre: 'Fotografía', fecha: '2026-01-28' },
                { nombre: 'Ficha Definitiva', fecha: '2026-04-27' },
                { nombre: 'Exámen de Admisión', fecha: '2026-06-06' },
                { nombre: 'Publicación de Resultados', fecha: '2026-06-28' }  
            ]
        },
        {
            id: 'uady',
            nombre: 'Universidad Autónoma de Yucatán (UADY)',
            logo: 'UADY.png',
            url: 'https://ingreso.uady.mx/licenciatura/',
            eventos: [
                { nombre: 'Publicación de Convocatoria', fecha: '2026-01-27' },
                { nombre: 'Registro de Aspirantes', fecha: '2026-02-03'  },
                { nombre: 'Toma de fotografía', fecha: '2026-04-27' },
                { nombre: 'Descarga Pase de Ingreso', fecha: '2026-05-27' },
                { nombre: 'Exámen de Admisión', fecha: '2026-06-13' },
                { nombre: 'Publicación de Resultados', fecha: '2026-06-26' }
            ]
        },

        {
            id: 'uv',
            nombre: ' Universidad Veracruzana (UV)',
            logo: 'UV.png',
            url: 'https://www.uv.mx/',
            eventos: [
                
                { nombre: 'Publicación de Convocatoria (Aproximadamente)', fecha: '2026-02-02' },
                { nombre: 'Aplicación de examen (Aproximadamente)', fecha: '2026-05-17'  },
                { nombre: 'Publicación de resultados (Aproximadamente)', fecha: '2026-07-01' }
                
            ]
        },
        {
            id: 'uaeh',
            nombre: ' Universidad Autónoma del Estado de Hidalgo (UAEH)',
            logo: 'UAEH.png',
            url: 'https://www.uaeh.edu.mx/aspirantes/licenciatura/instructivo.html',
            eventos: [
                
                { nombre: 'Publicación de Convocatoria:', fecha: '2026-02-12' },
                { nombre: 'Fecha de Examen:', fecha: '2026-06-05' },
                { nombre: 'Publicación de Resultados:', fecha: '2026-06-10' },
                
            ]
        },

        {
            id: 'media superior',
            nombre: 'Media Superior (ECOEMS)',
            logo: 'ECOEMS.png',
            url: 'https://ecoems.org/',
            eventos: [
                
                { nombre: 'Publicación de Convocatoria (Aproximadamente)', fecha: '2026-02-09' },
                { nombre: 'Aplicación de examen (Aproximadamente)', fecha: '2026-06-14'  },
                { nombre: 'Publicación de resultados (Aproximadamente)', fecha: '2026-08-18' }
                
            ]
        },
    ];

    const convocatoriasLista = document.getElementById('convocatorias-lista');
    const monthYearEl = document.getElementById('month-year');
    const calendarioGrid = document.getElementById('calendario-grid');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const eventListEl = document.getElementById('event-list');
    const searchInput = document.getElementById('search-input');
    
    let currentDate = new Date();
    currentDate.setDate(1); // Start with the first day of the month
    let selectedDateElement = null;

    function renderConvocatorias(filter = '') {
        convocatoriasLista.innerHTML = '';
        const lowerCaseFilter = filter.toLowerCase().trim();
        
        const filteredData = convocatoriasData.filter(conv => 
            conv.nombre.toLowerCase().includes(lowerCaseFilter)
        );

        if (filteredData.length === 0) {
            convocatoriasLista.innerHTML = `<p>No se encontraron resultados para "${filter}".</p>`;
            return;
        }

        filteredData.forEach(conv => {
            const card = document.createElement('div');
            card.className = 'convocatoria-card';
            
            let eventosHtml = '<ul>';
            conv.eventos.forEach(evento => {
                const fecha = new Date(evento.fecha + 'T00:00:00-06:00'); // Assume central time
                eventosHtml += `<li><strong>${evento.nombre}:</strong> ${fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</li>`;
            });
            eventosHtml += '</ul>';

            card.innerHTML = `
                <div class="convocatoria-logo">
                    <img src="${conv.logo}" alt="Logo de ${conv.nombre}">
                </div>
                <div class="convocatoria-info">
                    <h3><a href="${conv.url}" target="_blank" rel="noopener noreferrer">${conv.nombre}</a></h3>
                    ${eventosHtml}
                </div>
            `;
            convocatoriasLista.appendChild(card);
        });
    }
const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");
  });
    function renderCalendar() {
        calendarioGrid.innerHTML = '';
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        monthYearEl.textContent = `${currentDate.toLocaleString('es-ES', { month: 'long' })} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        dayNames.forEach(name => {
            const dayNameEl = document.createElement('div');
            dayNameEl.className = 'day-name';
            dayNameEl.textContent = name;
            calendarioGrid.appendChild(dayNameEl);
        });

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day empty';
            calendarioGrid.appendChild(emptyCell);
        }

        const today = new Date();
        const allEvents = getAllEvents();

        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'day';
            dayCell.textContent = i;
            dayCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('today');
            }

            if (allEvents[dayCell.dataset.date]) {
                 const eventDot = document.createElement('span');
                 eventDot.className = 'event-dot';
                 dayCell.appendChild(eventDot);
            }
            
            dayCell.addEventListener('click', () => {
                if(selectedDateElement) {
                    selectedDateElement.classList.remove('selected');
                }
                selectedDateElement = dayCell;
                dayCell.classList.add('selected');
                showEventDetails(dayCell.dataset.date);
            });

            calendarioGrid.appendChild(dayCell);
        }
    }

    function getAllEvents() {
        const eventsByDate = {};
        convocatoriasData.forEach(conv => {
            conv.eventos.forEach(evento => {
                if (!eventsByDate[evento.fecha]) {
                    eventsByDate[evento.fecha] = [];
                }
                eventsByDate[evento.fecha].push({
                    nombre: evento.nombre,
                    escuela: conv.nombre
                });
            });
        });
        return eventsByDate;
    }
    
    function showEventDetails(dateString) {
        const allEvents = getAllEvents();
        const eventsForDay = allEvents[dateString];
        
        eventListEl.innerHTML = '';
        if (eventsForDay && eventsForDay.length > 0) {
            eventsForDay.forEach(evento => {
                const li = document.createElement('li');
                li.textContent = `${evento.nombre} (${evento.escuela})`;
                eventListEl.appendChild(li);
            });
        } else {
            eventListEl.innerHTML = '<li>No hay eventos para este día.</li>';
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    searchInput.addEventListener('input', (e) => {
        renderConvocatorias(e.target.value);
    });

    renderConvocatorias();
    renderCalendar();
});
