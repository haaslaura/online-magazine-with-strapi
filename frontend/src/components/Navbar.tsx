import Link from 'next/link';
import type { Category } from '@/types/strapi';
import styles from './Navbar.module.css';

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Online Magazine
        </Link>
        <ul className={styles.links}>
          <li>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/categories/${cat.slug}`}
                className={styles.link}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
