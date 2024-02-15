import Modal from "../components/modal"

const faqs = [
    {
        id: 1,
        question: "Quel est l'objectif de ce site de veille technologique\u00A0?",
        answer:
            "Notre site a pour vocation de permettre aux utilisateurs de partager des publications et de rester informés sur les dernières avancées technologiques dans divers domaines, mais principalement sur le web.",
    },
    {
        id: 2,
        question: "Comment puis-je publier du contenu sur ce site\u00A0?",
        answer:
            "Pour publier du contenu, vous devez vous inscrire gratuitement sur notre plateforme. Une fois inscrit, vous pourrez soumettre vos articles de veille technologique depuis la page feed.",
    },
    {
        id: 3,
        question: "Est-ce que le site sera mis à jour avec de nouvelles fonctionnalités à l'avenir\u00A0?",
        answer:
            "Oui, nous travaillons constamment à améliorer notre site et à ajouter de nouvelles fonctionnalités pour offrir une meilleure expérience à nos utilisateurs. Restez à l'écoute pour les mises à jour à venir !",
    },
    {
        id: 4,
        question: "Est-ce que je peux trier le contenu pour rechercher un sujet spécifique\u00A0?",
        answer:
            "Absolument, notre page d'alimentation dispose d'un système de filtrage. Les filtres sont basés sur les modules de cours que les étudiants de l'IIM en développement web ont durant l'année.",
    },
    {
        id: 5,
        question: "Qui peut utiliser notre site\u00A0?",
        answer:
            "Notre site est accessible à tous, mais il est principalement conçu pour les étudiants de l'IIM en développement web. En effet, le contenu est principalement axé sur les modules de cours suivis par les étudiants tout au long de l'année.",
    },
    {
        id: 6,
        question: "Y a-t-il des restrictions sur le type de contenu que je peux publier\u00A0?",
        answer:
            "Nous encourageons la publication de contenu pertinent et informatif sur la veille technologique. Cependant, nous avons des directives communautaires qui interdisent le contenu offensant, illégal ou trompeur.",
    },
]



export default function Example() {
    return (
        <div className="">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                <h2 className="text-4xl font-bold leading-10 tracking-tight ">FAQ</h2>
                <p className="mt-6 max-w-full text-base leading-7">
                Vous saurez comment utiliser l&apos;application, le but et quel est le but de
                    Et vous saurez tout sur l&apos;application.
                </p>
                <div className="mt-12">
                    <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="p-4 rounded-xl border-secondary_200 border">
                                <dt className="text-xl font-bold mb-2 text-post_title">{faq.question}</dt>
                                <dd className="mt-2 text-base text-gray-300 leading-7">{faq.answer}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
