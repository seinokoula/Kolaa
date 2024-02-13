import Modal from "../components/modal"

const faqs = [
    {
        id: 1,
        question: "Quel est l'objectif de ce site de veille technologique ?",
        answer:
            "Notre site a pour vocation de permettre aux utilisateurs de partager des publications et de rester informés sur les dernières avancées technologiques dans divers domaines, mais principalement sur le web.",
    },
    {
        id: 2,
        question: "Comment puis-je publier du contenu sur ce site ?",
        answer:
            "Pour publier du contenu, vous devez vous inscrire gratuitement sur notre plateforme. Une fois inscrit, vous pourrez soumettre vos articles de veille technologique depuis la page feed.",
    },
    {
        id: 3,
        question: "Est-ce que le site sera mis à jour avec de nouvelles fonctionnalités à l'avenir ?",
        answer:
            "Oui, nous travaillons constamment à améliorer notre site et à ajouter de nouvelles fonctionnalités pour offrir une meilleure expérience à nos utilisateurs. Restez à l'écoute pour les mises à jour à venir !",
    },
    {
        id: 4,
        question: "Est-ce que je peux trier le contenu pour rechercher un sujet spécifique ?",
        answer:
            "Absolument, notre page d'alimentation dispose d'un système de filtrage. Les filtres sont basés sur les modules de cours que les étudiants de l'IIM en développement web ont durant l'année.",
    },
    {
        id: 5,
        question: "Qui peut utiliser notre site ?",
        answer:
            "Notre site est accessible à tous, mais il est principalement conçu pour les étudiants de l'IIM en développement web. En effet, le contenu est principalement axé sur les modules de cours suivis par les étudiants tout au long de l'année.",
    },
    {
        id: 6,
        question: "Y a-t-il des restrictions sur le type de contenu que je peux publier ?",
        answer:
            "Nous encourageons la publication de contenu pertinent et informatif sur la veille technologique. Cependant, nous avons des directives communautaires qui interdisent le contenu offensant, illégal ou trompeur.",
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
            </div>
        </div>
    )
}
