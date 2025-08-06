// Constants for grade points
const GRADE_POINTS = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0
};

// DOM Elements
const completedCoursesTable = document.getElementById('completed-courses-table');
const remainingCoursesTable = document.getElementById('remaining-courses-table');
const coursesChecklist = document.getElementById('courses-checklist');
const totalCreditsElement = document.getElementById('total-credits');
const completedCreditsElement = document.getElementById('completed-credits');
const remainingCreditsElement = document.getElementById('remaining-credits');
const cgpaElement = document.getElementById('cgpa');
const progressBar = document.getElementById('credit-progress-bar');
const progressText = document.getElementById('credit-progress-text');

// Load courses data from JSON file
async function loadCourseData() {
    try {
        const response = await fetch('obeCourses.json');
        if (!response.ok) {
            throw new Error('Failed to fetch course data');
        }
        const courses = await response.json();
        processCourseData(courses);
    } catch (error) {
        console.error('Error loading course data:', error);
        alert('Failed to load course data. Please try again later.');
    }
}

// Process course data
function processCourseData(courses) {
    // Categorize courses
    const completedCourses = courses.filter(course => course.grade && course.grade.trim() !== '');
    const remainingCourses = courses.filter(course => !course.grade || course.grade.trim() === '');
    
    // Calculate statistics
    const totalCredits = calculateTotalCredits(courses);
    const completedCredits = calculateTotalCredits(completedCourses);
    const remainingCredits = calculateTotalCredits(remainingCourses);
    const cgpa = calculateCGPA(completedCourses);
    const progressPercentage = (completedCredits / totalCredits) * 100;
    
    // Update DOM
    displayCompletedCourses(completedCourses);
    displayRemainingCourses(remainingCourses);
    displayCoursesChecklist(remainingCourses);
    updateStatistics(totalCredits, completedCredits, remainingCredits, cgpa);
    updateProgressBar(progressPercentage);
}

// Calculate total credits for a set of courses
function calculateTotalCredits(courses) {
    return courses.reduce((total, course) => {
        // Convert credit to number if it's a string
        const creditValue = parseFloat(course.credit) || 0;
        return total + creditValue;
    }, 0);
}

// Calculate CGPA from completed courses
function calculateCGPA(completedCourses) {
    let totalGradePoints = 0;
    let totalCredits = 0;
    
    completedCourses.forEach(course => {
        const credit = parseFloat(course.credit) || 0;
        const gradePoint = GRADE_POINTS[course.grade] || 0;
        
        totalGradePoints += (credit * gradePoint);
        totalCredits += credit;
    });
    
    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
}

// Display completed courses in table
function displayCompletedCourses(completedCourses) {
    const tbody = completedCoursesTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    completedCourses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.cidAlt}</td>
            <td>${course.name}</td>
            <td>${course.credit}</td>
            <td>${course.grade}</td>
        `;
        tbody.appendChild(row);
    });
}

// Display remaining courses in table
function displayRemainingCourses(remainingCourses) {
    const tbody = remainingCoursesTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    remainingCourses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.cidAlt}</td>
            <td>${course.name}</td>
            <td>${course.credit}</td>
        `;
        tbody.appendChild(row);
    });
}

// Display courses checklist
function displayCoursesChecklist(remainingCourses) {
    coursesChecklist.innerHTML = '';
    
    remainingCourses.forEach(course => {
        const checklistItem = document.createElement('div');
        checklistItem.className = 'checklist-item';
        checklistItem.innerHTML = `
            <span>${course.cidAlt}</span>: ${course.name}
        `;
        coursesChecklist.appendChild(checklistItem);
    });
}

// Update statistics display
function updateStatistics(totalCredits, completedCredits, remainingCredits, cgpa) {
    totalCreditsElement.textContent = totalCredits.toFixed(1);
    completedCreditsElement.textContent = completedCredits.toFixed(1);
    remainingCreditsElement.textContent = remainingCredits.toFixed(1);
    cgpaElement.textContent = cgpa;
}

// Update progress bar
function updateProgressBar(progressPercentage) {
    const roundedPercentage = Math.round(progressPercentage);
    progressBar.style.width = `${roundedPercentage}%`;
    progressText.textContent = `${roundedPercentage}%`;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', loadCourseData);
