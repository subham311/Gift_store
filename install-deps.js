const { execSync } = require('child_process');
const path = require('path');

console.log('Installing frontend dependencies...');
try {
  execSync('npm install', { 
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit',
    shell: true
  });
  console.log('Frontend dependencies installed successfully!');
} catch (error) {
  console.error('Failed to install frontend dependencies');
  process.exit(1);
}

console.log('Installing backend dependencies...');
try {
  execSync('npm install', { 
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit',
    shell: true
  });
  console.log('Backend dependencies installed successfully!');
} catch (error) {
  console.error('Failed to install backend dependencies');
  process.exit(1);
}

console.log('All dependencies installed successfully!');

