module.exports = {
  apps: [
    {
      name: 'tutorbuddy.co',
      script: 'npm',
      args: 'start',
      cwd: '/home/tutorbuddy/htdocs/tutorbuddy.co/tutorbuddy',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
}; 