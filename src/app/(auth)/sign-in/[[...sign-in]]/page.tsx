import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center mt-14 mb-36'>
        <SignIn />
    </div>
  )
}