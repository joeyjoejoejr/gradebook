## Assumptions:
* There are no restrictions on teachers managing courses (they can add or delete
  courses to any semester at will)
* For simplicity it's up to the teacher to enroll or unenroll students. This
  doesn't make complete sense but a realistic system would have some kind of
  more in-depth registration system. This approach limits the number of forms need for
  this app.
* Grades range between 0-100 where: >=90 4.0(A); >=80 3.0(B); >=70 2.0(C); >=60
  1.0(D); <60 0.0(E)
* For simplicity there is no concept of incomplete
* Students can only view their own grades
* All courses are scoped to a semester, and semesters are arbitrarily named
* For the sake of simplicity there will be no UI to manage semesters.

## Intended Database Schema

```
________________         _______________________
| users        |         | courses             |
| id int       |         | id int              |
| name varchar | ------< | teacher_id int      |
| type varchar |         | name varchar        |         ________________
---------------- >-      | semester_id int     | >------ | semesters    |
                  |  ----|                     |         | id int       |
__________________|  |   -----------------------         | name varchar |
| registration    | >-                                   ----------------
| id int          |
| student_id int  |
| course_id int   |
-------------------
```
