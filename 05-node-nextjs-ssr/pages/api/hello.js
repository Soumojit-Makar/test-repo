// Next.js API route — also server-side
export default function handler(req, res) {
  res.status(200).json({
    service: 'nextjs-ssr-demo',
    version: '1.0.0',
    method: req.method,
    timestamp: new Date().toISOString(),
    message: 'This is a Next.js API route — runs on the server!',
  });
}
