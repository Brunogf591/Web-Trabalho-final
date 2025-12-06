export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
  
    <main>
      <h1>Bem-vindo ao Nosso Jogo</h1>
      {children}
    </main>

  );
}