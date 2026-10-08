// Mock Demonstration Library Data for Offline & Testing Mode

export const DEMO_DOCUMENTS = [
    {
        id: "demo-doc-1",
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        type: "book",
        authors: [
            { first_name: "Robert C.", last_name: "Martin" }
        ],
        year: 2008,
        source: "Prentice Hall",
        publisher: "Prentice Hall",
        identifiers: {
            isbn: "978-0132350884"
        },
        abstract: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
        tags: ["Software Engineering", "Clean Code", "Design Patterns"],
        created: "2026-01-15T10:00:00.000Z",
        last_modified: "2026-10-01T12:00:00.000Z"
    },
    {
        id: "demo-doc-2",
        title: "Design Patterns: Elements of Reusable Object-Oriented Software",
        type: "book",
        authors: [
            { first_name: "Erich", last_name: "Gamma" },
            { first_name: "Richard", last_name: "Helm" },
            { first_name: "Ralph", last_name: "Johnson" },
            { first_name: "John", last_name: "Vlissides" }
        ],
        year: 1994,
        source: "Addison-Wesley Professional",
        publisher: "Addison-Wesley",
        identifiers: {
            isbn: "978-0201633610"
        },
        abstract: "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.",
        tags: ["Architecture", "Design Patterns", "OOP"],
        created: "2026-02-10T14:30:00.000Z",
        last_modified: "2026-09-20T08:15:00.000Z"
    },
    {
        id: "demo-doc-3",
        title: "Deep Learning: Foundations and Concepts",
        type: "journal",
        authors: [
            { first_name: "Ian", last_name: "Goodfellow" },
            { first_name: "Yoshua", last_name: "Bengio" },
            { first_name: "Aaron", last_name: "Courville" }
        ],
        year: 2016,
        source: "MIT Press",
        publisher: "MIT Press",
        identifiers: {
            doi: "10.1038/nature14539"
        },
        abstract: "An introduction to a broad range of topics in deep learning, covering mathematical and conceptual background, deep learning techniques used in industry, and research perspectives.",
        tags: ["Machine Learning", "Deep Learning", "AI"],
        created: "2026-03-05T09:12:00.000Z",
        last_modified: "2026-08-11T16:40:00.000Z"
    },
    {
        id: "demo-doc-4",
        title: "Attention Is All You Need",
        type: "conference_proceedings",
        authors: [
            { first_name: "Ashish", last_name: "Vaswani" },
            { first_name: "Noam", last_name: "Shazeer" },
            { first_name: "Niki", last_name: "Parmar" },
            { first_name: "Jakob", last_name: "Uszkoreit" },
            { first_name: "Llion", last_name: "Jones" },
            { first_name: "Aidan N.", last_name: "Gomez" },
            { first_name: "Lukasz", last_name: "Kaiser" },
            { first_name: "Illia", last_name: "Polosukhin" }
        ],
        year: 2017,
        source: "Advances in Neural Information Processing Systems (NeurIPS)",
        publisher: "Curran Associates, Inc.",
        identifiers: {
            doi: "10.48550/arXiv.1706.03762"
        },
        abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms.",
        tags: ["Transformers", "NLP", "Neural Networks"],
        created: "2026-04-12T11:00:00.000Z",
        last_modified: "2026-07-29T10:20:00.000Z"
    }
];

export const DEMO_GROUPS = [
    { id: "demo-group-1", name: "Computer Science Research" },
    { id: "demo-group-2", name: "Software Architecture" }
];
