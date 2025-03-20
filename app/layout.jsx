
import './globals.css';

export const metadata = {
  title: 'Simple Fullstack App',
  description: 'A simple fullstack application with NextJS and Express',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
