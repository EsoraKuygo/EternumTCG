import Link from 'next/link';

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
      }}
    >
      {/* Pseudo utilisateur */}
      <div style={{ fontSize: '18px' }}>
        <span style={{ fontWeight: 'bold' }}>Pseudo:</span> <span>(Placeholder)</span>
      </div>

      {/* Navigation */}
      <nav>
        <ul
          style={{
            display: 'flex',
            gap: '20px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
              Welcome
            </Link>
          </li>
          <li>
            <Link href="/cartes" style={{ textDecoration: 'none', color: 'white' }}>
              Cards
            </Link>
          </li>
          <li>
            <Link href="/decks" style={{ textDecoration: 'none', color: 'white' }}>
              Decks
            </Link>
          </li>
        </ul>
      </nav>

      {/* Placeholder pour des icônes ou options futures */}
      <div>
        <button
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
