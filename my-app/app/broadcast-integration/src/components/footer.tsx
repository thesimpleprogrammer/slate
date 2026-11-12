export default function Footer () {
    return (
        <footer className="border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600 flex justify-between">
          <div>© {new Date().getFullYear()} Ifiok&apos;s Gallery</div>
          <div className="space-x-3">
            <a href="#">Instagram</a>
            <a href="#">Vimeo</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    )
}