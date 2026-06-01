const form         = document.getElementById('grade-form');
const nameInput    = document.getElementById('student-name');
const markInput    = document.getElementById('student-mark');
const errorMsg     = document.getElementById('error-msg');
const resultArea   = document.getElementById('result-area');
const studentList  = document.getElementById('student-list');
const studentCount = document.getElementById('student-count');
const submitBtn    = document.getElementById('submit-btn');

let totalStudents = 0;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const studentName = nameInput.value.trim();
    const studentMark = parseInt(markInput.value.trim());

    if (studentName === '') {
        showError('Please enter the student\'s name.');
        nameInput.focus();
        return;
    }

    if (markInput.value.trim() === '') {
        showError('Please enter a mark.');
        markInput.focus();
        return;
    }

    if (isNaN(studentMark) || studentMark < 0 || studentMark > 100) {
        showError('Mark must be a number between 0 and 100.');
        markInput.focus();
        return;
    }

    hideError();

    let grade, resultClass, passFail;

    if (studentMark >= 80 && studentMark <= 100) {
        grade       = 'Distinction';
        resultClass = 'distinction';
        passFail    = 'PASS';
    } else if (studentMark >= 65 && studentMark <= 79) {
        grade       = 'Merit';
        resultClass = 'merit';
        passFail    = 'PASS';
    } else if (studentMark >= 50 && studentMark <= 64) {
        grade       = 'Pass';
        resultClass = 'pass';
        passFail    = 'PASS';
    } else {
        grade       = 'Fail';
        resultClass = 'fail';
        passFail    = 'FAIL';
    }

    resultArea.className = 'result-area visible ' + resultClass;
    resultArea.innerHTML =
        '<div class="result-name">' + studentName + '</div>' +
        '<div class="result-grade">' + passFail + ' &mdash; ' + grade + '</div>' +
        '<div class="result-mark">Mark: ' + studentMark + ' / 100</div>';

    addToList(studentName, studentMark, grade, resultClass, passFail);

    form.reset();
    nameInput.focus();
});

function addToList(name, mark, grade, cssClass, passFail) {

    const emptyState = studentList.querySelector('.empty-state');
    if (emptyState) {
        studentList.removeChild(emptyState);
    }

    const li = document.createElement('li');
    li.className = 'student-item ' + cssClass;

    li.innerHTML =
        '<div>' +
            '<div class="s-name">' + name + '</div>' +
            '<div class="s-mark">Mark: ' + mark + ' / 100</div>' +
        '</div>' +
        '<span class="s-badge">' + passFail + ' &mdash; ' + grade + '</span>';

    studentList.insertBefore(li, studentList.firstChild);

    totalStudents++;
    studentCount.textContent =
        totalStudents === 1 ? '1 student' : totalStudents + ' students';
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('visible');
}

function hideError() {
    errorMsg.textContent = '';
    errorMsg.classList.remove('visible');
}