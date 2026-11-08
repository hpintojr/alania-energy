import type { ServiceContent } from "@/app/service-page";

const R = {
  gas: { href: "/natural-gas", label: "Natural Gas", blurb: "Firm, dispatchable generation that anchors the campus." },
  nuclear: { href: "/nuclear", label: "Nuclear", blurb: "The long-term green power source in the generation mix." },
  tech: { href: "/technology", label: "Turbine Technology", blurb: "The proven GE turbine platform our gas generation is designed around." },
  campus: { href: "/campus", label: "Cedar City Energy Campus", blurb: "Generation built next to the loads it serves." },
  dc: { href: "/data-centers", label: "Data Centers", blurb: "Dedicated, always-on power for data-center scale." },
  green: { href: "/green-technology", label: "Green Technology", blurb: "Green buildings, a green data center and planned carbon capture." },
};

export const NATURAL_GAS: ServiceContent = {
  art: "/art/natural-gas.svg",
  eyebrow: "Natural Gas Generation",
  title: "Dispatchable power, on demand.",
  intro:
    "Natural gas is the foundation of the Cedar City Energy Campus. It is designed to provide firm, around-the-clock electricity that large industrial and data-center customers can plan around, independent of sun or wind.",
  points: [
    { title: "Firm baseload", body: "Runs day and night, independent of sun or wind, to support critical loads." },
    { title: "Responsive output", body: "Generation can be raised or lowered quickly to follow demand as it changes." },
    { title: "Built to scale", body: "Planned so capacity can be added in phases as customer demand on the campus grows." },
    { title: "Lower carbon than coal", body: "Natural gas emits significantly less carbon dioxide per unit of electricity than coal." },
  ],
  sections: [
    {
      heading: "Why natural gas",
      paras: [
        "Modern economies run on electricity that is there the moment it is needed. Natural gas generation delivers that kind of firm, dispatchable power: operators decide when it runs and how much it produces, rather than waiting on weather conditions.",
        "It is also a mature, well-understood technology. The equipment, fuel supply, workforce and regulatory framework for gas-fired generation are established across the United States, which lowers execution risk for a project of this kind.",
      ],
    },
    {
      heading: "How we approach it",
      paras: [
        "Alania Energy is developing natural gas generation directly on the Cedar City Energy Campus, next to the customers who will use the power. Producing electricity where it is consumed is intended to reduce reliance on long-distance transmission and the congestion that comes with it.",
      ],
      bullets: [
        { title: "Generation at the point of use", body: "Power is planned to be produced on the same campus as the loads it serves." },
        { title: "Gas supply to the site", body: "Fuel is planned to be delivered to the campus by natural gas infrastructure serving the site." },
        { title: "Multiple generating units", body: "Generation is designed as several turbine units, so the campus does not depend on any single machine." },
        { title: "Phased growth", body: "New units can be brought online in stages as demand on the campus increases." },
      ],
    },
    {
      heading: "Responsible operation",
      paras: [
        "Natural gas produces roughly half the carbon dioxide of coal for each unit of electricity generated, along with far lower emissions of sulfur dioxide and particulates. That makes it a practical source of firm power while lower-carbon resources such as nuclear are developed over the longer term.",
        "Like every power plant of its kind, generation on the campus will be subject to federal and Utah air-quality permitting and ongoing compliance requirements.",
      ],
    },
  ],
  related: [R.tech, R.campus, R.nuclear],
  cta: {
    title: "Talk to us about power supply.",
    body: "If you are planning a large load, we would like to hear from you.",
  },
};

export const NUCLEAR: ServiceContent = {
  art: "/art/nuclear.svg",
  eyebrow: "Nuclear",
  title: "Long-term green power.",
  intro:
    "Nuclear energy is part of Alania Energy's long-term plan for the Cedar City Energy Campus: a source of large-scale electricity that produces no carbon emissions while it operates and runs around the clock.",
  points: [
    { title: "Green operation", body: "Nuclear plants produce electricity without burning fuel, so they emit no carbon dioxide while operating." },
    { title: "Always on", body: "Nuclear units typically run at full output for long stretches between refueling outages." },
    { title: "Compact footprint", body: "A nuclear plant produces a large amount of power from a relatively small area of land." },
    { title: "Long asset life", body: "Nuclear facilities are designed to operate for decades." },
  ],
  sections: [
    {
      heading: "Why nuclear",
      paras: [
        "Large customers increasingly want power that is both reliable and clean. Nuclear is one of the few sources that offers both at scale: it delivers steady, around-the-clock output and produces no carbon emissions during operation.",
        "For an energy campus serving demanding, continuous loads, that combination makes nuclear a natural long-term complement to natural gas generation.",
      ],
    },
    {
      heading: "Advanced nuclear",
      paras: [
        "The nuclear industry is moving toward a new generation of reactor designs, including small modular reactors. These designs aim to use factory-built components, smaller unit sizes and passive safety features that rely on natural forces such as gravity and convection rather than operator action.",
        "Alania Energy's plan centers on advanced nuclear as a long-term component of the campus generation mix.",
      ],
    },
    {
      heading: "How it fits with natural gas",
      paras: [
        "Nuclear projects have longer licensing and construction timelines than gas-fired generation. Natural gas provides firm power in the nearer term, and nuclear is the long-term addition, so the campus is designed to offer firm supply first, with a path to a lower-carbon generation mix over time.",
      ],
      bullets: [
        { title: "Near term", body: "Planned natural gas generation is intended to deliver firm, dispatchable power." },
        { title: "Long term", body: "Advanced nuclear adds green, around-the-clock capacity." },
      ],
    },
    {
      heading: "Safety and oversight",
      paras: [
        "Commercial nuclear generation in the United States is licensed and regulated by the U.S. Nuclear Regulatory Commission, which oversees siting, design, construction and operation. Any nuclear generation on the campus would proceed through that federal process.",
      ],
    },
  ],
  related: [R.gas, R.campus, R.dc],
  cta: {
    title: "Interested in green capacity?",
    body: "Reach out to discuss long-term power needs and the role of nuclear on the campus.",
  },
};

export const TECHNOLOGY: ServiceContent = {
  art: "/art/technology.svg",
  eyebrow: "Technology",
  title: "Designed around GE gas turbine technology.",
  intro:
    "Alania Energy plans to base its natural gas generation on GE gas turbine technology, a platform with a long track record in power generation around the world.",
  points: [
    { title: "Proven platform", body: "GE turbines have decades of operating history across power plants worldwide." },
    { title: "Fast start", body: "Gas turbines can start and reach output quickly compared with large conventional plants." },
    { title: "Flexible output", body: "Turbine output can follow demand up and down through the day." },
    { title: "Serviceable fleet", body: "Standardized units and an established service network support planned maintenance." },
  ],
  sections: [
    {
      heading: "Why GE turbines",
      paras: [
        "Choosing equipment with a long operating history reduces technology risk. GE gas turbines are widely used in power generation, with established supply chains, trained technicians and spare-parts networks behind them.",
        "That track record matters for a campus intended to deliver power reliably for many years.",
      ],
    },
    {
      heading: "What turbines do well",
      paras: [
        "A gas turbine burns natural gas to drive a generator. Because turbines are compact and respond quickly, they suit a campus that needs both steady baseload power and the ability to adjust as demand shifts.",
      ],
      bullets: [
        { title: "Quick response", body: "Units can be started, stopped and adjusted to match load." },
        { title: "Modular design", body: "Several turbine units work together, so capacity is not concentrated in one machine." },
        { title: "Compact footprint", body: "Turbine generation packs substantial output into a small area." },
        { title: "Planned maintenance", body: "Units can be serviced in rotation while others keep running." },
      ],
    },
    {
      heading: "Reliability by design",
      paras: [
        "Designing generation around multiple standardized units means maintenance can be scheduled one unit at a time, and an unplanned outage on one unit does not take the whole plant offline. Standardization also simplifies training, spare parts and long-term service planning.",
      ],
    },
  ],
  related: [R.gas, R.campus, R.dc],
  cta: {
    title: "Questions about the technology?",
    body: "We are happy to walk through how generation on the campus is designed.",
  },
  footnote:
    "GE is a trademark of General Electric Company or its affiliates. References to GE equipment describe the technology Alania Energy plans to use and do not imply any endorsement, sponsorship or partnership.",
};

export const CAMPUS: ServiceContent = {
  art: "/art/campus.svg",
  eyebrow: "Now in development",
  title: "Cedar City Energy Campus",
  intro:
    "A purpose-built energy campus in Cedar City, Utah, designed to place large-scale generation right next to the industrial and data-center loads it serves.",
  points: [
    { title: "Power", body: "Planned transmission infrastructure to move power across the campus." },
    { title: "Water", body: "Planned water supply to support campus operations." },
    { title: "Natural gas", body: "Planned gas service to fuel campus generation." },
    { title: "Fiber and rail", body: "Planned fiber connectivity and rail access for heavy equipment." },
  ],
  sections: [
    {
      heading: "The idea",
      paras: [
        "Most large power users connect to a regional grid and wait for capacity to become available. The Cedar City Energy Campus takes a different approach: generation and the customers it serves share the same site, so power is produced where it is used.",
        "Co-locating supply and demand is intended to reduce dependence on long-distance transmission and the grid congestion that can delay new large loads.",
      ],
    },
    {
      heading: "Why Cedar City",
      paras: [
        "Cedar City sits in southwest Utah along the Interstate 15 corridor between Salt Lake City and Las Vegas. The location gives the campus road access for construction and operations, room to grow, and a setting suited to large-scale industrial development.",
      ],
    },
    {
      heading: "Planned infrastructure",
      paras: [
        "A large energy campus depends on more than generation. The campus is planned around access to the core infrastructure that heavy industrial and data-center users require.",
      ],
      bullets: [
        { title: "Power", body: "Transmission infrastructure is planned to connect campus generation with campus loads." },
        { title: "Water", body: "The campus plan includes water supply for generation and customer operations." },
        { title: "Natural gas", body: "Natural gas service is planned as the fuel source for generation." },
        { title: "Fiber", body: "High-capacity fiber is planned for data-center and digital infrastructure customers." },
        { title: "Rail", body: "Rail access is planned to support delivery of heavy equipment and materials." },
        { title: "Room to grow", body: "The campus is planned so generation and customers can be added in phases." },
      ],
    },
    {
      heading: "Development status",
      paras: [
        "The campus is in development. Investor materials are provided only to parties who meet applicable eligibility requirements, on request and subject to review. Nothing on this site is an offer to sell or a solicitation of an offer to buy securities.",
      ],
    },
  ],
  related: [R.green, R.dc, R.gas],
  cta: {
    title: "Explore the campus with us.",
    body: "Contact us to discuss locating on the campus.",
  },
};

export const DATA_CENTERS: ServiceContent = {
  art: "/art/data-centers.svg",
  eyebrow: "Data Centers",
  title: "Built for data-center scale.",
  intro:
    "Data centers need large amounts of power that never switches off. The Cedar City Energy Campus is being designed to deliver that power on site, reducing reliance on a congested regional grid.",
  points: [
    { title: "Dedicated supply", body: "Generation planned on the same campus as your facility." },
    { title: "Always-on power", body: "Firm natural gas generation designed to run around the clock." },
    { title: "Green by design", body: "Green buildings, planned carbon capture and advanced nuclear over the long term." },
    { title: "Planned infrastructure", body: "Power, water, gas, fiber and rail planned for the site." },
  ],
  sections: [
    {
      heading: "The challenge",
      paras: [
        "Demand for computing, driven by cloud services and artificial intelligence, is growing quickly, and the power behind it is often the hardest part to secure. In many regions, new large loads face long waits to connect to the grid, while data centers themselves cannot tolerate interruptions.",
        "That leaves developers looking for sites where reliable, large-scale power can be planned for with confidence.",
      ],
    },
    {
      heading: "What the campus offers",
      paras: [
        "The Cedar City Energy Campus is being designed to serve next-generation data-center loads directly, with generation and customers sharing the same site.",
      ],
      bullets: [
        { title: "Power where you build", body: "Campus generation is planned to serve campus customers, reducing reliance on distant transmission." },
        { title: "Firm in the near term", body: "Planned natural gas generation, designed around GE turbine technology, is intended to provide around-the-clock supply." },
        { title: "Greener over time", body: "Planned carbon capture now and advanced nuclear over the long term." },
        { title: "Room to expand", body: "The campus is planned to add generation as customer demand grows." },
      ],
    },
    {
      heading: "A green data center",
      paras: [
        "Data halls on the campus are planned to be built with insulating XBeton AAC block to reduce cooling demand, powered on site, and supported by planned carbon capture and, over the long term, advanced nuclear.",
      ],
    },
    {
      heading: "Who it is for",
      paras: [
        "Hyperscale and enterprise data-center developers, AI computing operators, and other large, continuous industrial users that need dependable power at scale.",
      ],
    },
    {
      heading: "How to engage",
      paras: [
        "Tell us about your load, timeline and site requirements. We will follow up to discuss how the campus can support your project.",
      ],
    },
  ],
  related: [R.green, R.campus, R.gas],
  cta: {
    title: "Planning a data center?",
    body: "Email us your load requirements and timeline to start the conversation.",
  },
};

export const GREEN: ServiceContent = {
  art: "/art/green-technology.svg",
  eyebrow: "Green Technology",
  title: "Green by design.",
  intro:
    "Alania Energy is developing the Cedar City Energy Campus around green technology: green buildings, a green data center, and planned carbon capture and waste-to-nanocarbon processes designed to reduce carbon and lock it away.",
  points: [
    { title: "Green buildings", body: "Campus buildings planned with XBeton autoclaved aerated concrete (AAC) block." },
    { title: "Green data center", body: "Data halls planned with AAC construction, on-site power and a greener energy mix." },
    { title: "Carbon capture", body: "Natural gas generation planned with carbon capture to remove CO2 from exhaust." },
    { title: "Waste to nanocarbon", body: "A planned process that turns waste into nanocarbon locked into building materials." },
  ],
  sections: [
    {
      heading: "Green buildings",
      paras: [
        "Campus buildings, including the data halls, are planned to be built with XBeton autoclaved aerated concrete (AAC) block. AAC is a lightweight, insulating masonry material: its air-filled structure helps keep buildings cooler in summer and warmer in winter, which reduces the energy needed for heating and cooling. It is also non-combustible.",
        "Alania Energy plans to pursue recognized green-building certification, such as LEED, for campus buildings as the design advances. The campus has not yet been certified.",
      ],
      bullets: [
        { title: "Insulating", body: "AAC's cellular structure reduces heating and cooling loads." },
        { title: "Lightweight", body: "Less material by volume than conventional poured concrete." },
        { title: "Fire resistant", body: "AAC is a non-combustible building material." },
        { title: "Certification", body: "Recognized green-building certification, such as LEED, is planned." },
      ],
    },
    {
      heading: "A green data center",
      paras: [
        "The campus is being designed as a green data center campus. Data halls are planned with AAC construction to reduce cooling demand, and power is planned to be generated on site, reducing reliance on long-distance transmission.",
        "Over time, the energy mix is planned to become greener still: carbon capture on natural gas generation in the nearer term, and advanced nuclear as the long-term green power source.",
      ],
      bullets: [
        { title: "Efficient shell", body: "Insulating AAC buildings to help reduce cooling energy." },
        { title: "Power on site", body: "Generation planned next to the data halls it serves." },
        { title: "Captured carbon", body: "Carbon capture planned on natural gas generation." },
        { title: "Green over time", body: "Advanced nuclear planned as the long-term power source." },
      ],
    },
    {
      heading: "Removing carbon",
      paras: [
        "Natural gas generation on the campus is planned with carbon capture equipment, designed to separate carbon dioxide from plant exhaust so it is captured rather than released to the atmosphere.",
        "Alania Energy also plans a waste-to-nanocarbon process that converts waste streams into nanocarbon materials. Used in building products, that carbon is locked into long-lasting materials instead of entering the air.",
      ],
      bullets: [
        { title: "Capture", body: "CO2 separated from generation exhaust, as planned." },
        { title: "Convert", body: "Waste converted into nanocarbon materials, as planned." },
        { title: "Lock away", body: "Carbon held in durable building products." },
        { title: "Report", body: "Performance details will be shared as systems come online." },
      ],
    },
    {
      heading: "Our commitment",
      paras: [
        "The campus is in development, and the green technologies described here are planned. As design, permitting and construction advance, we will share specific details on certification, capture performance and materials so our green claims can be verified.",
      ],
    },
  ],
  related: [R.dc, R.campus, R.gas],
  cta: {
    title: "Building something green?",
    body: "Talk with us about green power and green buildings for your project.",
  },
  footnote:
    "XBeton is referenced as the planned supplier of AAC building block. All green technologies described on this page are planned and subject to design, permitting and change.",
};
