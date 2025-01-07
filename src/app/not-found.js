import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h1>Couldn&apos;t find that...</h1>
      <div>
        <Link href="/">Go back to Home, maybe I don&apos;t know</Link>
        <img src="/img/idriguess.png" alt="idriel" />
      </div>
    </div>
  );
}
