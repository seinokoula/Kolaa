import { CheckIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'
import Image from 'next/image'

const steps = [
    { name: 'Create account', description: 'Vitae sed mi luctus laoreet.', href: '#', status: 'complete' },
    { name: 'Profile information', description: 'Cursus semper viverra facilisis et et some more. Cursus semper viverra facilisis et et some more. Cursus semper viverra facilisis et et some more. Cursus semper viverra facilisis et et some more.', href: '#', status: 'current', },
    { name: 'Business information', description: 'Penatibus eu quis ante.', href: '#', status: 'upcoming' },
    { name: 'Theme', description: 'Faucibus nec enim leo et.', href: '#', status: 'upcoming' },
    { name: 'Preview', description: 'Iusto et officia maiores porro ad non quas.', href: '#', status: 'upcoming' },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
export default function Example() {
    return (
        <div className="">
            <div className="mx-auto max-w-full px-6 py-16 sm:py-24 lg:px-8">
                <div className="mx-auto flex max-w-2xl flex-col justify-between lg:mx-0 lg:max-w-none">
                    <div>
                        <h2 className="text-4xl font-bold leading-10 tracking-tight ">Road map</h2>
                        <p className="mt-6 text-base leading-8">
                            Découvrez notre RoadMap innovante pour un aperçu complet des améliorations et des fonctionnalités passionnantes à venir.
                        </p>
                    </div>
                    <div className='flex gap-16 my-12 max-lg:flex-col justify-center'>
                        <div className="w-full lg:max-w-lg lg:flex-auto">
                            <Image
                                width={1344}
                                height={1104}
                                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80"
                                alt=""
                                className=" aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover md:min-w-32 md:min-h-full lg:aspect-auto lg:h-[34.5rem]"
                            />
                        </div>
                        <nav aria-label="Progress" className='flex items-center'>
                            <ol role="list" className="overflow-hidden">
                                {steps.map((step, stepIdx) => (
                                    <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-16' : '', 'relative')}>
                                        {step.status === 'complete' ? (
                                            <>
                                                {stepIdx !== steps.length - 1 ? (
                                                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600" aria-hidden="true" />
                                                ) : null}
                                                <a href={step.href} className="group relative flex items-start">
                                                    <span className="flex h-9 items-center">
                                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                                                            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                                        </span>
                                                    </span>
                                                    <span className="ml-4 flex min-w-0 flex-col">
                                                        <span className="text-sm font-medium">{step.name}</span>
                                                        <span className="text-sm text-gray-500">{step.description}</span>
                                                    </span>
                                                </a>
                                            </>
                                        ) : step.status === 'current' ? (
                                            <>
                                                {stepIdx !== steps.length - 1 ? (
                                                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                                                ) : null}
                                                <a href={step.href} className="group relative flex items-start" aria-current="step">
                                                    <span className="flex h-9 items-center" aria-hidden="true">
                                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                                                            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                                                        </span>
                                                    </span>
                                                    <span className="ml-4 flex min-w-0 flex-col">
                                                        <span className="text-sm font-medium text-indigo-600">{step.name}</span>
                                                        <span className="text-sm text-gray-500">{step.description}</span>
                                                    </span>
                                                </a>
                                            </>
                                        ) : (
                                            <>
                                                {stepIdx !== steps.length - 1 ? (
                                                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                                                ) : null}
                                                <a href={step.href} className="group relative flex items-start">
                                                    <span className="flex h-9 items-center" aria-hidden="true">
                                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                                            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                                                        </span>
                                                    </span>
                                                    <span className="ml-4 flex min-w-0 flex-col">
                                                        <span className="text-sm font-medium text-gray-500">{step.name}</span>
                                                        <span className="text-sm text-gray-500">{step.description}</span>
                                                    </span>
                                                </a>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
