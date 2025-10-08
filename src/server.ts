import app from './app';
import { ENV } from './app/config';
import connectDB from './app/config/db';

(async () => {
  try {
    await connectDB();
    app.listen(ENV.port, () => {
      console.log(`Server started on http://localhost:${ENV.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
