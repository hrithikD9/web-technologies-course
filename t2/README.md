# Student CGPA Progress Tracker

A web-based application that helps students track their academic progress, including completed courses, remaining courses, and CGPA calculation.

## Features

- **Overall Progress Visualization**: Visual progress bar showing percentage of completed credits
- **CGPA Calculation**: Automatic calculation of CGPA based on completed courses and grades
- **Course Tracking**: 
  - ✅ List of completed courses with grades
  - ⏳ List of remaining courses
  - 📚 Checklist of courses left to take
- **Credit Statistics**: Display of total, completed, and remaining credits

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- JSON for course data storage

## Project Structure

- `index.html`: Main HTML structure of the application
- `style.css`: CSS styling for responsive and user-friendly interface
- `script.js`: JavaScript for application logic and calculations
- `obeCourses.json`: JSON file containing course data (course codes, names, credits, grades)

## How It Works

1. The application loads course data from `obeCourses.json`
2. Courses are categorized as completed or remaining based on grade data
3. Statistics are calculated (total credits, completed credits, remaining credits, CGPA)
4. Progress bar and tables are populated with course information
5. Grade points are assigned according to the standard grading system (A+, A, A-, etc.)

## CGPA Calculation

The application uses the following grade points for CGPA calculation:

| Grade | Points |
|-------|--------|
| A+    | 4.0    |
| A     | 4.0    |
| A-    | 3.7    |
| B+    | 3.3    |
| B     | 3.0    |
| B-    | 2.7    |
| C+    | 2.3    |
| C     | 2.0    |
| C-    | 1.7    |
| D+    | 1.3    |
| D     | 1.0    |
| F     | 0.0    |

## Setup and Usage

1. Clone the repository
2. Open `index.html` in a web browser
3. The application will automatically load and display your academic progress
4. To update your courses or grades, modify the `obeCourses.json` file

## Customization

You can customize this application by:

- Modifying the grading system in the `GRADE_POINTS` object in `script.js`
- Updating the course data in `obeCourses.json`
- Adjusting the styling in `style.css`

## Future Enhancements

- Adding user authentication to track multiple students
- Implementing course prerequisites visualization
- Adding semester-wise GPA calculation
- Allowing direct editing of grades through the interface

## License

This project is part of a web technologies course assignment and is available for educational purposes.
