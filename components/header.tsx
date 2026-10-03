import Link from 'next/link'
import { Container } from './layout/container'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full bg-background'>
      <Container className='flex h-20 items-center justify-between'>
        <Link href={"/"}> Neuvikon </Link>
        <div className='flex items-center justify-center gap-2'>
          <Button> Contact Sales </Button>
          <ModeToggle />
        </div>
      </Container>
    </header>
  )
}

export default Header