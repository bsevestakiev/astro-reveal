export interface AuthorMeta {
  name: string
  slug: string
  avatarHash: string
  bio?: string
  /** Localized bios keyed by locale (es/ja/ko/pt-BR). Falls back to `bio`. */
  bioLocalized?: Record<string, string>
}

const authors: Record<string, AuthorMeta> = {
  'Martin Atanasov': {
    name: 'Martin Atanasov',
    slug: 'matanasov',
    avatarHash: 'a4618131aacb6a1bdd2348563ddde1d8de58ab287d3d518c67d8359f53425b9a',
  },
  'Bilyana Petrova': {
    name: 'Bilyana Petrova',
    slug: 'bpetrova',
    avatarHash: 'd133aa34c2cb301e7de0cdddeaf4a9101daa812c7f84d106ffe67c0497fab83b',
    bio: `Bilyana is an Embedded Analytics Content Specialist at Reveal. From research to creative writing, she's on a mission to make boring business blogs useful and actionable. When she's not at work, you can hardly find her as she loves discovering new destinations around the world, summiting mountain peaks, and playing with her adorable Siberian Laika.`,
    bioLocalized: {
      es: `Bilyana es especialista en contenido de análisis integrados en Reveal. Desde la investigación hasta la escritura creativa, tiene la misión de hacer que los blogs empresariales aburridos sean útiles y prácticos. Cuando no está trabajando, es difícil encontrarla, ya que le encanta descubrir nuevos destinos en todo el mundo, escalar picos de montañas y jugar con su adorable Laika siberiana.`,
      ja: `Bilyanaは、Revealの組み込み型分析コンテンツスペシャリストです。調査からクリエイティブな文章まで、退屈なビジネスブログを役立ち、実行可能なものにするという使命を帯びています。仕事をしていないときは、世界中の新しい目的地を発見したり、山の頂上を目指したり、愛らしいシベリアンライカと遊んだりするのが好きなので、なかなか見つけることができません。`,
      ko: `빌랴나는 Reveal의 임베디드 분석 콘텐츠 전문가입니다. 조사부터 창의적인 글쓰기까지, 그녀는 지루한 비즈니스 블로그를 유용하고 실행 가능하게 만드는 데 힘쓰고 있습니다. 그녀가 일하지 않을 때는 전 세계의 새로운 목적지를 발견하고, 산 정상에 오르고, 사랑스러운 시베리안 라이카와 함께 시간을 보내는 것을 좋아합니다.`,
      'pt-BR': `Bilyana é uma especialista em conteúdo de análise incorporada na Reveal. Da pesquisa à redação criativa, ela tem a missão de tornar os blogs de negócios chatos úteis e práticos. Quando não está no trabalho, é difícil encontrá-la, pois ela adora descobrir novos destinos ao redor do mundo, escalar picos de montanhas e brincar com sua adorável Laika Siberiana.`,
    },
  },
  'Casey Ciniello': {
    name: 'Casey Ciniello',
    slug: 'cmcguigan',
    avatarHash: '7edc58f30cbff551c6010477286151d2af4fd5ebc105c87e9fcdf3561a643c3b',
    bio: `Casey Ciniello is a data and analytics-focused product leader at Infragistics, where she drives strategy and innovation for the Reveal embedded analytics platform and the Slingshot work management solution. With a BA in mathematics and an MBA, she brings an in-depth analytical foundation and business perspective to building products that help organizations turn complex data into actionable insights.<br />
Casey leads the development of analytics-driven capabilities, shaping product direction through deep market analysis, user behavior insights, and evolving business intelligence trends. She works closely with customers to understand how data is used in real-world decision-making and translates those needs into intuitive, high-impact analytics experiences. Casey also serves as the Survey Lead for the annual Reveal Software Development Challenges survey, where she analyzes industry data to uncover key trends in analytics, AI, and modern development practices. Her insights and thought leadership have been featured in <a href="https://www.dataversity.net/author/casey-ciniello/">Dataversity</a>, <a href="https://www.rtinsights.com/author/casey-ciniello/">RT Insights</a>, SaaSXtra, <a href="https://sdtimes.com/author/casey-mcguigan/">SD Times</a>, <a href="https://solutionsreview.com/business-intelligence/author/cmcguigan/">Solutions Review</a>, <a href="https://techstrong.it/author/casey-ciniello/">TechStrong IT</a>, <a href="https://appdevelopermagazine.com/ai-productivity-rises-amid-2026-uncertainty/">App Developer Magazine</a>, Beta News, Integration Developer News, and UX Planet. She is a frequent webinar presenter on modern embedded analytics, machine learning, data visualizations, and scaling SaaS analytics. Casey joined Infragistics in 2013.`,
    bioLocalized: {
      es: `Casey Ciniello es una líder de productos centrada en datos y análisis en Infragistics, donde dirige la estrategia y la innovación para la plataforma de análisis integrada Reveal y la solución de gestión del trabajo Slingshot. Con una licenciatura en matemáticas y un MBA, aporta una sólida base analítica y una perspectiva empresarial para crear productos que ayudan a las organizaciones a convertir datos complejos en información útil.<br />
Casey lidera el desarrollo de capacidades basadas en análisis, dando forma a la dirección del producto a través de un profundo análisis de mercado, información sobre el comportamiento del usuario y las tendencias emergentes de la inteligencia empresarial. Trabaja en estrecha colaboración con los clientes para comprender cómo se utilizan los datos en la toma de decisiones del mundo real y traduce esas necesidades en experiencias de análisis intuitivas y de alto impacto. Casey también se desempeña como líder de la encuesta para la encuesta anual Reveal Software Development Challenges, donde analiza los datos de la industria para descubrir las tendencias clave en análisis, IA y prácticas de desarrollo modernas. Sus conocimientos y liderazgo intelectual han aparecido en <a href="https://www.dataversity.net/author/casey-ciniello/">Dataversity</a>, <a href="https://www.rtinsights.com/author/casey-ciniello/">RT Insights</a>, SaaSXtra, <a href="https://sdtimes.com/author/casey-mcguigan/">SD Times</a>, <a href="https://solutionsreview.com/business-intelligence/author/cmcguigan/">Solutions Review</a>, <a href="https://techstrong.it/author/casey-ciniello/">TechStrong IT</a>, <a href="https://appdevelopermagazine.com/ai-productivity-rises-amid-2026-uncertainty/">App Developer Magazine</a>, Beta News, Integration Developer News y UX Planet. Es una presentadora frecuente de seminarios web sobre análisis integrados modernos, aprendizaje automático, visualizaciones de datos y escalamiento de análisis SaaS. Casey se unió a Infragistics en 2013.`,
      ja: `Casey Cinielloは、Infragisticsのデータおよび分析に焦点を当てた製品リーダーであり、Reveal組み込み分析プラットフォームとSlingshotワークマネジメントソリューションの戦略とイノベーションを推進しています。数学の学士号とMBAを持ち、組織が複雑なデータを実行可能な洞察に変えるのに役立つ製品を構築するための、詳細な分析基盤とビジネスの視点をもたらします。<br />
Caseyは、市場分析、ユーザーの行動に関する洞察、および進化するビジネスインテリジェンスのトレンドを深く分析することにより、分析主導の機能の開発を主導し、製品の方向性を形作ります。彼女は顧客と緊密に連携して、データが実際の意思決定で使用されている方法を理解し、それらのニーズを直感的で影響力のある分析エクスペリエンスに変換します。Caseyはまた、毎年開催されるRevealソフトウェア開発チャレンジ調査の調査責任者も務めており、業界のデータを分析して、分析、AI、および最新の開発手法における主要なトレンドを明らかにしています。彼女の洞察とリーダーシップは、<a href="https://www.dataversity.net/author/casey-ciniello/">Dataversity</a>、<a href="https://www.rtinsights.com/author/casey-ciniello/">RT Insights</a>、SaaSXtra、<a href="https://sdtimes.com/author/casey-mcguigan/">SD Times</a>、<a href="https://solutionsreview.com/business-intelligence/author/cmcguigan/">Solutions Review</a>、<a href="https://techstrong.it/author/casey-ciniello/">TechStrong IT</a>、<a href="https://appdevelopermagazine.com/ai-productivity-rises-amid-2026-uncertainty/">App Developer Magazine</a>、Beta News、Integration Developer News、UX Planetに掲載されています。彼女は、最新の組み込み分析、機械学習、データ視覚化、およびSaaS分析のスケーリングに関するウェビナーの常連スピーカーです。Caseyは2013年にInfragisticsに参加しました。`,
      ko: `Casey Ciniello는 Infragistics의 데이터 및 분석에 중점을 둔 제품 리더로, Reveal 임베디드 분석 플랫폼 및 Slingshot 작업 관리 솔루션에 대한 전략 및 혁신을 주도합니다. 수학 학사 및 MBA를 보유한 그녀는 조직이 복잡한 데이터를 실행 가능한 통찰력으로 전환하는 데 도움이 되는 제품을 구축하는 데 심층적인 분석 기반 및 비즈니스 관점을 제공합니다.<br />
Casey는 분석 기반 기능 개발을 주도하며 심층적인 시장 분석, 사용자 행동 통찰력 및 진화하는 비즈니스 인텔리전스 트렌드를 통해 제품 방향을 결정합니다. 그녀는 고객과 긴밀히 협력하여 데이터가 실제 의사 결정에 어떻게 사용되는지 이해하고 이러한 요구 사항을 직관적이고 영향력 있는 분석 경험으로 변환합니다. Casey는 또한 연례 Reveal 소프트웨어 개발 챌린지 설문 조사에 대한 설문 조사 책임자로 활동하며 업계 데이터를 분석하여 분석, AI 및 최신 개발 사례의 주요 트렌드를 파악합니다. 그녀의 통찰력과 사상적 리더십은 <a href="https://www.dataversity.net/author/casey-ciniello/">Dataversity</a>, <a href="https://www.rtinsights.com/author/casey-ciniello/">RT Insights</a>, SaaSXtra, <a href="https://sdtimes.com/author/casey-mcguigan/">SD Times</a>, <a href="https://solutionsreview.com/business-intelligence/author/cmcguigan/">Solutions Review</a>, <a href="https://techstrong.it/author/casey-ciniello/">TechStrong IT</a>, <a href="https://appdevelopermagazine.com/ai-productivity-rises-amid-2026-uncertainty/">App Developer Magazine</a>, Beta News, Integration Developer News 및 UX Planet에 소개되었습니다. 그녀는 최신 임베디드 분석, 머신 러닝, 데이터 시각화 및 SaaS 분석 확장과 관련된 주제에 대한 웨비나 발표자로 자주 참여합니다. Casey는 2013년에 Infragistics에 합류했습니다.`,
      'pt-BR': `Casey Ciniello é uma líder de produto focada em dados e análises na Infragistics, onde lidera a estratégia e a inovação para a plataforma de análise embarcada Reveal e a solução de gerenciamento de trabalho Slingshot. Com um diploma de bacharel em matemática e um MBA, ela traz uma base analítica aprofundada e uma perspectiva de negócios para a criação de produtos que ajudam as organizações a transformar dados complexos em insights acionáveis.<br />
Casey lidera o desenvolvimento de recursos orientados por análise, moldando a direção do produto por meio de análises de mercado aprofundadas, insights sobre o comportamento do usuário e tendências de inteligência de negócios em evolução. Ela trabalha em estreita colaboração com os clientes para entender como os dados são usados na tomada de decisões do mundo real e traduz essas necessidades em experiências de análise intuitivas e de alto impacto. Casey também atua como líder da pesquisa para a pesquisa anual de desafios de desenvolvimento de software Reveal, onde analisa dados do setor para descobrir as principais tendências em análise, IA e práticas de desenvolvimento modernas. Seus insights e liderança de pensamento foram apresentados em <a href="https://www.dataversity.net/author/casey-ciniello/">Dataversity</a>, <a href="https://www.rtinsights.com/author/casey-ciniello/">RT Insights</a>, SaaSXtra, <a href="https://sdtimes.com/author/casey-mcguigan/">SD Times</a>, <a href="https://solutionsreview.com/business-intelligence/author/cmcguigan/">Solutions Review</a>, <a href="https://techstrong.it/author/casey-ciniello/">TechStrong IT</a>, <a href="https://appdevelopermagazine.com/ai-productivity-rises-amid-2026-uncertainty/">App Developer Magazine</a>, Beta News, Integration Developer News e UX Planet. Ela é uma apresentadora frequente de webinars sobre análise embarcada moderna, aprendizado de máquina, visualizações de dados e dimensionamento de análises SaaS. Casey ingressou na Infragistics em 2013.`,
    },
  },
  'Zdravko Kolev': {
    name: 'Zdravko Kolev',
    slug: 'zkolev',
    avatarHash: '3bde60b73e7f1f2e5a5a122d848606b124353534f8dfea8de1c4c6b0948f7482',
  },
  'Jason Beres': {
    name: 'Jason Beres',
    slug: 'jberes',
    avatarHash: '22bbd9f6c7c31add2b89f09f2b2fb18ac77364cb0c4fc0212f43efe48c220836',
    bio: `Jason Beres is the company's senior software executive and analytics-focused technology leader, spearheading the customer-driven, innovative features and functionality throughout all Infragistics' software, including testing, development, and user experience. Jason works directly with Infragistics customers around the globe to deliver an exceptional user experience. He is an expert on technology subjects such as embedded analytics, BI product design, developer experience, low-code app builders, platform modernization, and practical AI in software, etc. Jason is a former Microsoft .NET MVP, and he is the author of several books on software development, covering SQL Server, C#, Visual Basic, Rich Client and Web Development. A national and international conference speaker on AI, product, platform strategy, embedded analytics, and design-led software topics, Jason is very active in the developer and UX community and has been featured in Analytics Insight, <a href="https://www.infoq.com/profile/Jason-Beres/">InfoQ</a>, <a href="https://www.rtinsights.com/author/jason-beres/">RTInsights</a>, <a href="https://www.uxmatters.com/authors/archives/2022/01/jason_beres.php">UX Matters</a>, <a href="https://solutionsreview.com/business-process-management/author/jberes/">Solutions Review</a>, <a href="https://www.codemag.com/People/Bio/Jason.Beres">CODE Magazine</a>, <a href="https://sdtimes.com/author/jason-beres/">SD Times</a>, <a href="https://devops.com/author/jason-beres/">DevOps</a>, <a href="https://futurecio.tech/study-reveals-low-code-tools-boost-productivity/">FutureCIO</a>, <a href="https://www.designnews.com/author/jason-beres-">Design News</a>, etc. He joined Infragistics in 2003.`,
  },
}

export function getAuthorBio(name: string | undefined, lang?: string): string | undefined {
  const a = getAuthor(name)
  if (!a) return undefined
  return (lang && a.bioLocalized?.[lang]) || a.bio
}

export function getAuthor(name: string | undefined): AuthorMeta | undefined {
  if (!name) return undefined
  return authors[name]
}

export function getAvatarUrl(name: string | undefined, size = 30): string | undefined {
  const a = getAuthor(name)
  if (!a) return undefined
  return `https://secure.gravatar.com/avatar/${a.avatarHash}?s=${size}&d=mm&r=g`
}

export function getAuthorUrl(name: string | undefined): string | undefined {
  const a = getAuthor(name)
  if (!a) return undefined
  return `/author/${a.slug}`
}

/** All known authors, for enumerating /author/<slug> archive routes. */
export const ALL_AUTHORS: AuthorMeta[] = Object.values(authors)

export function getAuthorBySlug(slug: string): AuthorMeta | undefined {
  return ALL_AUTHORS.find((a) => a.slug === slug)
}
