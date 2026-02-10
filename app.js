const emailInput = document.getElementById('emailInput');
const validList = document.getElementById('validEmails');
const invalidList = document.getElementById('invalidEmails');
const totalCount = document.getElementById('totalCount');
const validCount = document.getElementById('validCount');
const invalidCount = document.getElementById('invalidCount');
const sendBtn = document.getElementById('sendBtn');
const subjectInput = document.getElementById('subject');
const bodyInput = document.getElementById('body');
const status = document.getElementById('status');

let validEmails = [];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener('input', validateEmails);

function validateEmails() {
    const emails = emailInput.value
        .split(',')
        .map(e => e.trim())
        .filter(Boolean);

    validEmails = [];
    validList.innerHTML = '';
    invalidList.innerHTML = '';

    emails.forEach(email => {
        const li = document.createElement('li');
        li.textContent = email;

        if (emailRegex.test(email)) {
            validEmails.push(email);
            validList.appendChild(li);
        } else {
            invalidList.appendChild(li);
        }
    });

    totalCount.textContent = emails.length;
    validCount.textContent = validEmails.length;
    invalidCount.textContent = emails.length - validEmails.length;

    sendBtn.disabled = !validEmails.length || !subjectInput.value || !bodyInput.value;
}

[subjectInput, bodyInput].forEach(el =>
    el.addEventListener('input', validateEmails)
);

sendBtn.addEventListener('click', () => {
    if (!validEmails.length) return;

    const gmailUrl =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&bcc=${encodeURIComponent(validEmails.join(','))}` +
        `&su=${encodeURIComponent(subjectInput.value)}` +
        `&body=${encodeURIComponent(bodyInput.value)}`;

    window.open(gmailUrl, '_blank');

    showStatus('Gmail opened successfully 🚀', 'success');
});

function showStatus(msg, type) {
    status.textContent = msg;
    status.className = `status ${type}`;
    status.classList.remove('hidden');
}
