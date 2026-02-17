const { Client } = require('pg')
const fs = require('fs')
const readline = require('readline')

// Database connection string - using the same URL from verification script
const connectionString = `postgresql://postgres:[password]@db.tkfaqwhhraroibxsxeih.supabase.co:5432/postgres`

function askPassword() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    
    rl.stdoutMuted = true
    rl.question('Enter your Supabase database password: ', (password) => {
      rl.close()
      resolve(password)
    })
    
    rl._writeToOutput = function _writeToOutput(stringToWrite) {
      if (rl.stdoutMuted)
        rl.output.write("*")
      else
        rl.output.write(stringToWrite)
    }
  })
}

async function setupDatabase() {
  let client

  try {
    console.log('🔍 Setting up NutriWell database...')
    console.log('📖 You can find your database password in:')
    console.log('   Supabase Dashboard > Settings > Database > Connection Info')
    console.log('')
    
    const password = process.env.DB_PASSWORD || await askPassword()
    console.log('\n✅ Password received')
    
    // Create client connection
    client = new Client({
      connectionString: connectionString.replace('[password]', password),
      ssl: { rejectUnauthorized: false }
    })
    
    await client.connect()
    console.log('✅ Connected to database')
    
    // Read the schema file
    const schema = fs.readFileSync('database/schema.sql', 'utf8')
    console.log('📝 Schema file loaded')
    
    // Execute the complete schema
    await client.query(schema)
    console.log('✅ Database schema executed successfully!')
    
    // Verify tables were created
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)
    
    if (result.rows.length > 0) {
      console.log('📋 Created tables:')
      result.rows.forEach(row => console.log(`  - ${row.table_name}`))
      console.log('')
      console.log('🎉 Database setup completed successfully!')
      console.log('   You can now test the authentication flow in your app.')
    } else {
      console.log('⚠️  No tables found in public schema')
    }
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message)
    console.log('\n💡 Troubleshooting:')
    console.log('   1. Check your database password in Supabase Dashboard')
    console.log('   2. Ensure your IP is allowed in Database Settings')
    console.log('   3. Try running the script again')
  } finally {
    if (client) {
      await client.end()
    }
  }
}

if (require.main === module) {
  setupDatabase()
}

module.exports = { setupDatabase } 