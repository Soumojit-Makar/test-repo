// Server-side rendered page — data fetched on every request
export async function getServerSideProps() {
  const now = new Date();
  return {
    props: {
      serverTime: now.toISOString(),
      greeting: getGreeting(now.getHours()),
      facts: [
        'This page is rendered on the SERVER for every request.',
        'No static HTML — the server builds it fresh each time.',
        'Perfect for dynamic, personalized, or real-time content.',
        'Works great deployed as Serverful or Serverless!',
      ],
    },
  };
}

function getGreeting(hour) {
  if (hour < 12) return '🌅 Good Morning';
  if (hour < 18) return '☀️ Good Afternoon';
  return '🌙 Good Evening';
}

export default function Home({ serverTime, greeting, facts }) {
  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.title}>⚡ Next.js SSR Demo</h1>
        <p style={styles.subtitle}>{greeting}! This page was built on the server.</p>

        <div style={styles.timeBox}>
          <span style={styles.label}>Server Render Time</span>
          <span style={styles.time}>{serverTime}</span>
        </div>

        <ul style={styles.list}>
          {facts.map((f, i) => (
            <li key={i} style={styles.listItem}>
              <span style={styles.bullet}>→</span> {f}
            </li>
          ))}
        </ul>

        <div style={styles.badge}>Powered by ServerAutomation</div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    fontFamily: "'Segoe UI', sans-serif",
    padding: '2rem',
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '3rem',
    maxWidth: '600px',
    width: '100%',
    color: '#fff',
  },
  title: { fontSize: '2.2rem', margin: '0 0 0.5rem', fontWeight: 700 },
  subtitle: { color: '#a8b2d8', marginBottom: '2rem', fontSize: '1.1rem' },
  timeBox: {
    background: 'rgba(100,108,255,0.2)',
    border: '1px solid rgba(100,108,255,0.4)',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  label: { fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#8892b0' },
  time: { fontSize: '1rem', fontFamily: 'monospace', color: '#64ffda' },
  list: { listStyle: 'none', padding: 0, margin: '0 0 2rem' },
  listItem: { padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#ccd6f6', display: 'flex', gap: '0.5rem' },
  bullet: { color: '#64ffda', fontWeight: 'bold' },
  badge: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '50px',
    padding: '0.5rem 1.5rem',
    fontSize: '0.85rem',
    textAlign: 'center',
    fontWeight: 600,
    letterSpacing: '0.5px',
  },
};
