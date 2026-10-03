import Link from 'next/link'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'

const Header = () => {
  return (
    <header className='h-20 w-full bg-background flex items-center justify-between'>
      <div>
        <Link href={"/"}> Neuvikon </Link>
      </div>      
      <div className='flex items-center justify-center gap-2'>
        <Button> Contact Sales </Button>
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header