const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateSecureKey(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

function setupEnvironment() {
  const backendEnvPath = path.join(__dirname, '..', 'backend', '.env');
  const backendEnvExamplePath = path.join(__dirname, '..', 'backend', '.env.example');
  
  // Check if .env already exists
  if (fs.existsSync(backendEnvPath)) {
    console.log('⚠️  .env file already exists in backend directory');
    console.log('   If you want to regenerate it, delete the existing .env file first');
    return;
  }
  
  // Read the example file
  if (!fs.existsSync(backendEnvExamplePath)) {
    console.error('❌ .env.example file not found in backend directory');
    return;
  }
  
  let envContent = fs.readFileSync(backendEnvExamplePath, 'utf8');
  
  // Generate secure secrets
  const jwtSecret = generateSecureKey();
  
  // Replace placeholder values
  envContent = envContent
    .replace('your_postgres_username', 'postgres')
    .replace('your_postgres_password', 'postgres')
    .replace('your_very_secure_jwt_secret_key_change_this_in_production', jwtSecret)
    .replace('tech_services', 'tech_services_dev');
  
  // Write the .env file
  fs.writeFileSync(backendEnvPath, envContent);
  
  console.log('✅ Environment file created successfully!');
  console.log('📁 File location: backend/.env');
  console.log('⚠️  Important: Never commit this file to version control');
  console.log('📝 Update the database credentials in backend/.env if needed');
}

// Run the setup
setupEnvironment();