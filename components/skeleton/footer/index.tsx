export default function Footer() {
  return (
    <footer className="footer items-center text-neutral-content p-4 bg-white md:px-6 md:py-8 dark:bg-gray-800">
      <div className="items-center grid-flow-col">
        <p>Copyright © {new Date().getFullYear()} Bookabulary</p>
      </div>
    </footer>
  )
}