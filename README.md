# Grade Book App

This is a demo application for managing courses, grading students, and reporting
on that information.

## Installing

Clone the repository, run the setup script, and start the server

```bash
git clone git@github.com:joeyjoejoejr/gradebook
bin/setup
bin/server
```

## Logins(all passwords are 'password')

### Admin
rweber@example.com

### Teacher
jsmith@example.com

### Students
jjackson@example.com
dhiggenbotham@example.com
jhiggenbotham@example.com

## Running Tests

The app has a full suite of unit and end-to-end tests. Chromedriver should be
installed by the chromedriver-helper gem, it can also be installed directly and
added to your PATH.

```bash
bin/spec
```

## Architectural Decisions

### Tech Stack:
  * Ruby 2.4 -- should work on previous rubies
  * Rails 5.1 (rc) -- I chose to use the release candidate for rails 5.1 for its
    out-of-the-box yarn and webpack support. Enabling easy react development without
    the need for libraries like react-rails or react_on_rails.
  * Postgresql -- The standard relational database
  * React -- I chose to create a decoupled front-end. This decision
    significantly increased the time that it took to finish this project. I
    wasn't able to leverage a lot of rails builtins (generators, form helpers,
    etc). This tradeoff may not be worth it for a project this size, but in my
    experience pays of before long on any non-trivial project. I also decided
    for forgo using state management like redux, for the sake of simplicity.

There wasn't a lot of opportunity for OOD in this application, however the
courses controller uses simple service object for creating and updating courses,
and the dashboard endpoint uses the strategy pattern to return query objects for
each user's view.

### TODOS
  * Add an interface to manage users
  * Add semester model and interface
  * Use a router for the front-end. Currently nothing is linkable, and browser
    history doesn't work
  * Add state management for the front-end. A fair amount of the complexity in
    the react app is around managing, and passing state around. somehting like
    redux would be a solve for this problem
