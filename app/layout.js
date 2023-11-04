import './globals.css'
export const metadata = {
  title: 'Music Guesser',
  description: 'Music guessing app',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body className={``}>
        {children}
      </body>
    </html>
  )
}
