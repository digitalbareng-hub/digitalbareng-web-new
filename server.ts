import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Melayani file statis dari folder public secara eksplisit
  app.use(express.static(path.join(__dirname, 'public')));

  if (process.env.NODE_ENV !== "production") {
    // Mode Development menggunakan Vite Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Mode Production melayani file statis dari dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    
    // Pastikan SPA Fallback bekerja: semua rute yang tidak ditemukan diarahkan ke index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    console.log(`SPA Fallback & SEO Support Active`);
  });
}

startServer();
