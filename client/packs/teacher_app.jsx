import React from 'react';
import ReactDOM from 'react-dom';
import TeacherPage from 'TeacherPage';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TeacherPage />,
    document.body.appendChild(document.createElement('div')),
  );
});
