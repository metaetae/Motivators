//링크 엘리먼트 Random Position 설정
const links = document.querySelectorAll(".link-tree li");

const getRandomPosition = (min, max) => {
return Math.round(Math.random() * (max - min) + min);
}

const initialPositions = [];

const saveInitialPositions = () => {
for (let i = 0; i < links.length; i++) {
const linkWidth = links[i].offsetWidth;
const linkHeight = links[i].offsetHeight;

let randomLeft, randomTop, newPos;
let attempts = 0;

do {
    randomLeft = getRandomPosition(0, window.innerWidth - linkWidth);
    randomTop = getRandomPosition(0, window.innerHeight - linkHeight);
    newPos = { left: randomLeft, top: randomTop, width: linkWidth, height: linkHeight };
    attempts++;
    if (attempts > 100) break; // 무한 루프 방지
} while (isOverlapping(newPos, initialPositions, linkWidth, linkHeight));

initialPositions.push(newPos);

links[i].style.position = 'absolute';
links[i].style.left = `${randomLeft}px`;
links[i].style.top = `${randomTop}px`;

}};

const isOverlapping = (newPos, existingPositions, width, height) => {
    for (let pos of existingPositions) {
    if (newPos.left < pos.left + pos.width &&
    newPos.left + width > pos.left &&
    newPos.top < pos.top + pos.height &&
    newPos.top + height > pos.top) {
    return true;
    }
    }
    return false;
    };
    
    saveInitialPositions();
    
    window.addEventListener('resize', () => {
    const scaleX = window.innerWidth / initialWidth;
    const scaleY = window.innerHeight / initialHeight;

    for (let i = 0; i < links.length; i++) {
        const newLeft = initialPositions[i].left * scaleX;
        const newTop = initialPositions[i].top * scaleY;
    
        links[i].style.left = `${newLeft}px`;
        links[i].style.top = `${newTop}px`;
    }
});

const initialWidth = window.innerWidth;
const initialHeight = window.innerHeight;


//모드 전환 테마 설정
    function setTheme(theme) {
      if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
      updateBackLink(theme);
    }

    function applyTheme() {
      const theme = localStorage.getItem('theme') || 'light';
      setTheme(theme);
    }

    function toggleTheme() {
      const theme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      setTheme(theme);
    }

    window.addEventListener('load', applyTheme);

//guestbook
document.getElementById('guestbookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    if (name && message) {
        const entry = { name: name, message: message };
        
        addEntryToGuestbook(entry);
        saveGuestbookEntry(entry);

        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    loadGuestbook();
    applyTheme();
});

function addEntryToGuestbook(entry) {
    const guestbookEntries = document.getElementById('guestbookEntries');
    
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'name';
    nameSpan.textContent = `${entry.name}: `;
    
    const messageSpan = document.createElement('span');
    messageSpan.textContent = entry.message;
    
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'delete-icon';
    deleteIcon.onclick = function() {
        if (confirm('삭제하시겠습니까?')) {
            guestbookEntries.removeChild(entryDiv);
            deleteGuestbookEntry(entry);
        }
    };
    
    entryDiv.appendChild(nameSpan);
    entryDiv.appendChild(messageSpan);
    entryDiv.appendChild(deleteIcon);
    
    guestbookEntries.insertBefore(entryDiv, guestbookEntries.firstChild);
    guestbookEntries.style.display = 'block';
}

function saveGuestbookEntry(entry) {
    let guestbookEntries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
    guestbookEntries.push(entry);
    localStorage.setItem('guestbookEntries', JSON.stringify(guestbookEntries));
}

function loadGuestbook() {
    const guestbookEntries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
    guestbookEntries.forEach(entry => {
        addEntryToGuestbook(entry);
    });
}

function deleteGuestbookEntry(entry) {
    let guestbookEntries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
    guestbookEntries = guestbookEntries.filter(e => e.name !== entry.name || e.message !== entry.message);
    localStorage.setItem('guestbookEntries', JSON.stringify(guestbookEntries));
}

//introduce.html
function show(hidden){

    if (document.getElementById('hidden').style.display=="none") document.getElementById('hidden').style.display="block"; //표시하게 하기
    
    else document.getElementById('hidden').style.display="none"; //안보이게 하기
    
    }