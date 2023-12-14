export default function Main({children}) {
  return (
    <main class="py-6 2xl:px-6">
      <div class="container">
        <div class="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            {children}
        </div>
      </div>
    </main>
  );
}
