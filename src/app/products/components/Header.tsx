export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-black border-b border-gray-700 z-50 py-6 flex justify-center">
      <div className="flex items-center gap-4 flex-col md:flex-row">
        <img src="/logo.png" alt="TranspNet Logo" className="w-32 h-32 md:w-16 md:h-16 object-contain" />
        <h1 className="text-2xl md:text-4xl font-bold hidden md:block">Teste Frontend</h1>
      </div>
    </header>
  )
}
