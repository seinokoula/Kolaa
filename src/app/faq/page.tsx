import Modal from "../components/modal"

const faqs = [
    {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        id: 2,
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        id: 3,
        question: "lorem ipsum dolor sit amet consectetur adipisicing elit?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        id: 4,
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        id: 5,
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        id: 6,
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },

]

export default function Example() {
    return (
        <div className="">
            <Modal />
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                <h2 className="text-4xl font-bold leading-10 tracking-tight ">FAQ</h2>
                <p className="mt-6 max-w-full text-base leading-7">
                    You will know how to use the app, the goal and what is the purpose of{' '}
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="font-semibold text-pink-600 hover:text-pink-500">
                        Open Teck
                    </a>{' '}
                    And you will know everything about the app.
                </p>
                <div className="mt-12">
                    <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="border border-gray-400 p-4 rounded-xl">
                                <dt className="text-base font-semibold leading-7 ">{faq.question}</dt>
                                <dd className="mt-2 text-base text-gray-300 leading-7">{faq.answer}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            M</div>
        </div>
    )
}
