import Spline from '@splinetool/react-spline';

export default function Header() {
    return (
        <div className="mx-auto w-full px-6 py-16 sm:py-24 lg:px-12 h-screen flex lg:max-w-7xl">
            <div className='flex flex-col w-1/2 mt-36 gap-4'>
                <h1 className='text-7xl font-black text text-[#1DA1F2]'>Totally not Twitter</h1>
                <p className=''>Fully anonymous post from anyone, like this cube represents.</p>
                <a href="#feed" className='border-gray-400 border-2 rounded-lg shadow-md p-2 w-fit'>See your feed</a>
            </div>
            <div className='h-full w-3/5 flex justify-center items-center max-md:hidden'>
                <Spline className='mb-32' scene="https://prod.spline.design/l5qSnulO3eY0SGbZ/scene.splinecode" />
            </div>
        </div>
    )}