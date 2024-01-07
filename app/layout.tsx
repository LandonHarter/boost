import Providers from './components/Providers'
import Header from './components/header/header'
import './globals.css'

export const metadata = {
  title: "Boost - The All In One Platform for Homeless and Low Income People",
  description: "Boost is a platform that helps homeless and low income people find help, connect with others, and get back on their feet."
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
