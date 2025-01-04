export default function Footer() {
    return (
      <footer
        style={{
          position: 'fixed', // Fixe le footer en bas
          bottom: 0,
          left: 0,
          width: '100%', // S'assure qu'il s'étire sur toute la largeur
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#222',
          color: 'white',
          borderTop: '2px solid #444',
          zIndex: 1000, // Assure qu'il reste au-dessus des autres éléments
        }}
      >
        {/* Zone de texte gauche */}
        <div style={{ maxWidth: '45%' }}>
          <p style={{ margin: 0 }}>
            <strong>About Us:</strong> This project is a card-based application
            designed for collectors and players to explore and enjoy unique cards.
          </p>
        </div>
  
        {/* Image au centre */}
        <div style={{ maxWidth: '10%' }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
  
        {/* Zone de texte droite */}
        <div style={{ maxWidth: '45%', textAlign: 'right' }}>
          <p style={{ margin: 0 }}>
            <strong>Contact Us:</strong> For support or inquiries, reach us at{' '}
            <a href="mailto:support@example.com" style={{ color: '#4caf50' }}>
              support@example.com
            </a>.
          </p>
        </div>
      </footer>
    );
  }
  