type Confidence = "Bad" | "OK" | "Good" | null;

type Subtopic = {
  id: string;
  name: string;
  learnt: boolean;
  confidence: Confidence;
  lastRevised: string | null;
  nextDue: string | null;
};

type TopicGroup = {
  id: string;
  name: string;
  notCovered?: boolean;
  isPlaceholder?: boolean;
  subtopics: Subtopic[];
};

type Subject = {
  id: string;
  name: string;
  code?: string;
  groups: TopicGroup[];
};

export type AppData = { subjects: Subject[] };

const topic = (
  id: string,
  name: string,
  learnt = true,
  confidence: Confidence = "OK",
  nextDue: string | null = "2026-08-22",
): Subtopic => ({
  id,
  name,
  learnt,
  confidence: learnt ? confidence : null,
  lastRevised: learnt ? "2026-08-12" : null,
  nextDue: learnt ? nextDue : null,
});

const group = (id: string, name: string, subtopics: Subtopic[], extras: Partial<TopicGroup> = {}): TopicGroup => ({
  id,
  name,
  subtopics,
  ...extras,
});

export function buildSeedData(): AppData {
  return {
    subjects: [
      {
        id: "maths",
        name: "Maths",
        code: "OCR Higher",
        groups: [
          group("maths-number", "Number", [
            topic("maths-fractions", "Fractions, decimals and percentages", true, "Good"),
            topic("maths-indices", "Indices and standard form", true, "OK"),
            topic("maths-surds", "Surds", false),
          ]),
          group("maths-algebra", "Algebra", [
            topic("maths-quadratics", "Quadratic equations", true, "Bad", "2026-08-18"),
            topic("maths-sequences", "Sequences", true, "OK"),
            topic("maths-functions", "Functions", false),
          ]),
          group("maths-geometry", "Geometry and measures", [
            topic("maths-trig", "Trigonometry", true, "OK", "2026-08-25"),
            topic("maths-circle", "Circle theorems", true, "Good"),
          ]),
        ],
      },
      {
        id: "english-language",
        name: "English Language",
        code: "AQA 8700",
        groups: [
          group("eng-lang-paper-1", "Paper 1", [
            topic("eng-lang-fiction", "Creative reading", true, "OK", "2026-08-24"),
            topic("eng-lang-narrative", "Narrative writing", true, "Good"),
          ]),
          group("eng-lang-paper-2", "Paper 2", [
            topic("eng-lang-nonfiction", "Non-fiction reading", true, "Bad", "2026-08-17"),
            topic("eng-lang-perspectives", "Viewpoints and perspectives", false),
          ]),
        ],
      },
      {
        id: "english-literature",
        name: "English Literature",
        code: "AQA 8702",
        groups: [
          group("eng-lit-shakespeare", "Shakespeare", [
            topic("eng-lit-macbeth", "Macbeth: ambition and power", true, "OK"),
            topic("eng-lit-macbeth-context", "Macbeth: context and structure", true, "Good"),
          ]),
          group("eng-lit-modern", "Modern text", [
            topic("eng-lit-modern-themes", "Key themes and character arcs", true, "Bad", "2026-08-15"),
            topic("eng-lit-modern-quotes", "Selecting and embedding quotations", false),
          ]),
          group("eng-lit-poetry", "Poetry anthology", [
            topic("eng-lit-poetry-comparison", "Comparison and unseen poetry", true, "OK"),
          ]),
        ],
      },
      {
        id: "chemistry",
        name: "Chemistry",
        code: "AQA 8462 Triple",
        groups: [
          group("chem-atomic", "Atomic structure and the periodic table", [
            topic("chem-atomic-structure", "Atomic structure", true, "Good"),
            topic("chem-periodic", "The periodic table", true, "OK"),
          ]),
          group("chem-bonding", "Bonding, structure and properties", [
            topic("chem-ionic", "Ionic, covalent and metallic bonding", true, "Bad", "2026-08-19"),
            topic("chem-properties", "Properties of substances", false),
          ]),
          group("chem-quantitative", "Quantitative chemistry", [
            topic("chem-moles", "Moles and reacting masses", true, "OK", "2026-08-26"),
          ]),
        ],
      },
      {
        id: "biology",
        name: "Biology",
        code: "AQA 8461 Triple",
        groups: [
          group("bio-cell", "Cell biology", [
            topic("bio-cell-structure", "Cell structure", true, "Good"),
            topic("bio-transport", "Transport in cells", true, "OK"),
          ]),
          group("bio-organisation", "Organisation", [
            topic("bio-digestive", "The digestive system", true, "Bad", "2026-08-16"),
            topic("bio-enzymes", "Enzymes", false),
          ]),
          group("bio-bioenergetics", "Bioenergetics", [
            topic("bio-photosynthesis", "Photosynthesis", true, "OK"),
          ]),
        ],
      },
      {
        id: "physics",
        name: "Physics",
        code: "AQA 8463 Triple",
        groups: [
          group("physics-energy", "Energy", [
            topic("physics-energy-stores", "Energy stores and transfers", true, "Good"),
            topic("physics-efficiency", "Efficiency", true, "OK"),
          ]),
          group("physics-electricity", "Electricity", [
            topic("physics-circuits", "Circuit calculations", true, "Bad", "2026-08-20"),
            topic("physics-resistance", "Resistance", false),
          ]),
          group("physics-forces", "Forces", [
            topic("physics-momentum", "Momentum", true, "OK"),
          ]),
        ],
      },
      {
        id: "geography",
        name: "Geography",
        code: "AQA 8035",
        groups: [
          group("geo-natural-hazards", "Natural hazards", [
            topic("geo-tectonics", "Tectonic hazards", true, "OK"),
            topic("geo-weather", "Weather hazards", true, "Good"),
          ]),
          group("geo-living-world", "The living world", [
            topic("geo-ecosystems", "Ecosystems", true, "Bad", "2026-08-14"),
            topic("geo-tropical", "Tropical rainforests", false),
          ]),
          group("geo-uk", "The challenge of natural hazards in the UK", [
            topic("geo-uk-urban", "Urban change", true, "OK"),
          ]),
        ],
      },
      {
        id: "spanish",
        name: "Spanish",
        code: "AQA 8692 Higher",
        groups: [
          group("spanish-theme-1", "People and lifestyle", [
            topic("spanish-identity", "Identity and relationships", true, "Good"),
            topic("spanish-healthy", "Healthy living", true, "OK"),
          ]),
          group("spanish-theme-2", "Popular culture", [
            topic("spanish-free-time", "Free-time activities", true, "Bad", "2026-08-21"),
            topic("spanish-customs", "Customs and festivals", false),
          ]),
          group("spanish-grammar", "Grammar and translation", [
            topic("spanish-tenses", "Past, present and future tenses", true, "OK"),
          ]),
        ],
      },
      {
        id: "dt",
        name: "D&T",
        code: "EDUQAS",
        groups: [
          group("dt-core", "Core principles", [
            topic("dt-materials", "Materials and their properties", true, "OK"),
            topic("dt-processes", "Manufacturing processes", false),
          ]),
          group("dt-option", "In-depth option", [], { isPlaceholder: true }),
        ],
      },
    ],
  };
}