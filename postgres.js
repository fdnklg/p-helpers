const { Pool, Client } = require('pg') // install pg via npm

// keep this discrete information hidden in config file e.g.
const db = {
    dbhost: "url_to_db_here",
    dbname: "db_name",
    dbuser: "user_name_here",
    dbpassword: "password here"
},

const pool = new Pool({
    user: db.dbuser,
    host: db.dbhost,
    database: db.dbname,
    password: db.dbpassword,
    port: 5432,
})

// define a correct mysql query here as string literal
const text = `
SELECT id, "bikeId", "providerId", "timestamp", latitude, longitude
	FROM public."bikeLocations"
	WHERE ("timestamp" >  current_date - INTERVAL '1 day') and ("timestamp" < current_date);
`

const fetch = async () => {
    // async/await
    try {
      const res = await pool.query(text) // response from db
    //    do
        
    } catch(err) {
      console.log(err.stack)
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

