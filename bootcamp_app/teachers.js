const { Pool } = require('pg');
const args = process.argv.slice(2)

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;`

const cohortName = args[0];
const values = [`%${cohortName}%`]

pool.query(queryString, values)
.then(res => {
  res.rows.map((x => console.log(`${x.cohort}: ${x.teacher}`)));
})
.catch(err => console.error('query error', err.stack));

