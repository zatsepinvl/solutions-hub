import {Solution} from "../../solution/solution";
import dayjs from "dayjs";

const watchOutLicenses: Solution = {
    id: "s3",
    slug: "opensource-licences",
    name: "[DEMO] Watch out open source software licences",
    views: 1341,
    stars: 321,
    updatedAt: dayjs(),
    keywords: [
        "opensource",
        "license",
        "agpl",
        "gpl",
        "lgpl"
    ],
    description: "Which open source licences library can I use in my closed project? Let's have a look closed on them.",
    readme: `
# Open source licenses
...content here...
`,
    assets: [],
    contributors: [
        {
            userId: "u2",
            name: "John Connor",
        },
    ],
}

export default watchOutLicenses;