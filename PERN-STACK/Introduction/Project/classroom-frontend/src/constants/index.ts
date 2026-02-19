export const DEPARTMENTS = [
  'CS', 
  'Math',
  'English',
  "Computer Systems Engineering",
  "Software Engineering",
  "Electrical Engineering",
  "Artificial Intelligence",
  "Mathematics",
  "Physics",
  "Business Administration",];


    //  the imediate parenthesis after the arrow funciton simply means it makes it an immediate return
     export const DEPARTMENTS_OPTIONS = DEPARTMENTS.map((dept) => ({
        value: dept,
        label: dept
     }))