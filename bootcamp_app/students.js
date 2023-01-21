const { Pool } = require('pg');
const args = process.argv.slice(2)

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `SELECT students.id as student_id, students.name as student, cohort_id, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;`;

const cohortName = args[0];
const limit = args[1];
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
.then(res => {
  res.rows.map((user => {
    console.log(`${user.student} has an id of ${user.student_id} and was in the ${user.cohort} cohort`)
  }));
})
.catch(err => console.error('query error', err.stack));
