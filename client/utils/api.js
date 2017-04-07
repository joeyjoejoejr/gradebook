const headers = {
  'Content-Type': 'application/json',
}

const handleResponse = response => response.json().then(json => {
  if(!response.ok) {
    let error = new Error(response.statusText);
    error.responseErrors = json.errors || ["Something went wrong"];
    throw error;
  }

  return json;
});


export let getCourses = () => fetch('api/courses', { headers })
  .then(handleResponse);

export let createCourse = body => fetch('api/courses', {
  method: 'POST', headers, body: JSON.stringify({ course: body })
}).then(handleResponse);

export let updateCourse = body => fetch(`api/courses/${body.id}`, {
  method: 'PUT', headers, body: JSON.stringify({ course: body })
}).then(handleResponse);

export let deleteCourse = course => fetch(`api/courses/${course.id}`, {
  method: 'DELETE', headers
});

export let searchStudents = name => fetch(`api/students?name=${name}`, {
  headers
}).then(handleResponse);
