## Assumptions:
* There are no restrictions on teachers managing courses (they can add or delete
  courses at will)
* For simplicity it's up to the teacher to enroll or unenroll students. This
  doesn't make complete sense but a realistic system would have some kind of
  more in-depth registration system. This approach limits the number of forms need for
  this app.
* For simplicity there will only be one grade per course and it can be assigned
  by the teacher
* Grades range between 0-100 where: >=90 4.0(A); >=80 3.0(B); >=70 2.0(C); >=60
  1.0(D); <60 0.0(E)
* For simplicity there is no concept of incomplete
* Students can only view their own grades
* For the sake of simplicity there will be no UI to manage semesters, and all
  courses will be assumed to be on the currenrt semester.
* The front end will be simple enough that it won't need it's own tests
* This app will not support IE (no fetch or Promise implementations)

## Intended Database Schema

```
________________         _______________________
| users        |         | courses             |
| id int       |         | id int              |
| name varchar | ------< | teacher_id int      |
| type varchar |         | name varchar        |
---------------- >-      |                     |
                  |  ----|                     |
__________________|  |   -----------------------
| registration    | >-
| id int          |
| student_id int  |
| course_id int   |
-------------------
```
