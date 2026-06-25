---
title: 매력적인 시각화 생성을 위한 모범 사례
description: >-
  눈에 띄는 시각화로 데이터 스토리를 전달하세요. 어떤 차트가 메시지를 가장 잘 전달하는지, 색상을 어떻게 조합하는지, 그리고 최신 데이터
  분석 프로그램의 기능이 어떻게 직관적이고 간결하며 강력한 대시보드를 만들 수 있게 하는지 알아보세요.
date: 'Apr 8, 2026'
author: Casey Ciniello
cover: /images/2020/07/best-practices-for-creating-compelling-visualizations.png
seo:
  title: 매력적인 시각화 생성을 위한 모범 사례 | Reveal 임베디드 분석
  description: >-
    눈에 띄는 시각화로 데이터 스토리를 전달하세요. 어떤 차트가 메시지를 가장 잘 전달하는지, 색상을 어떻게 조합하는지, 그리고 최신 데이터
    분석 프로그램의 기능이 어떻게 직관적이고 간결하며 강력한 대시보드를 만들 수 있게 하는지 알아보세요.
  ogTitle: 매력적인 시각화 생성을 위한 모범 사례 | Reveal 임베디드 분석
  ogDescription: >-
    눈에 띄는 시각화로 데이터 스토리를 전달하세요. 어떤 차트가 메시지를 가장 잘 전달하는지, 색상을 어떻게 조합하는지, 그리고 최신 데이터
    분석 프로그램의 기능이 어떻게 직관적이고 간결하며 강력한 대시보드를 만들 수 있게 하는지 알아보세요.
  ogType: article
  twitterTitle: 매력적인 시각화 생성을 위한 모범 사례 | Reveal 임베디드 분석
  twitterDescription: >-
    눈에 띄는 시각화로 데이터 스토리를 전달하세요. 어떤 차트가 메시지를 가장 잘 전달하는지, 색상을 어떻게 조합하는지, 그리고 최신 데이터
    분석 프로그램의 기능이 어떻게 직관적이고 간결하며 강력한 대시보드를 만들 수 있게 하는지 알아보세요.
  ogImage: /images/2020/07/best-practices-for-creating-compelling-visualizations.png
source_hash: dadaf244
source_locale: en
---
## 시각화의 영향력을 높이는 방법

우리는 모두 정보와 콘텐츠의 홍수에 시달리며, 이는 종종 압도적입니다. 그렇다면 중요한 데이터를 노이즈로부터 어떻게 빠르게 분리할 수 있을까요? 그리고 이를 고객, 임원 또는 파트너를 위한 설득력 있는 데이터 스토리로 어떻게 구성할 수 있을까요?

전달하고자 하는 스토리에 맞는 적절한 시각화(차트 또는 그래프)를 선택하는 것이 필수적입니다.

**본 문서에서는 영향력 있는 시각화를 만드는 데 도움이 되는 상위 10가지 모범 사례를 소개합니다. 여기에는 다음이 포함됩니다:**

- 사용자를 최우선으로 이해하기
- 적절한 차트 유형 선택하기
- 색상과 텍스트를 적절하게 사용하기
- 차트 장식(Chart Junk) 피하기
- 데이터 명확하게 제시하기
- 중요한 부분을 강조하기
- 효과적인 상호 작용 사용하기
- 3D를 현명하게 사용하기
- 세부 사항에 주의 기울이기
- 적절한 스케일 사용하기

또한, 최신 현대적 분석 플랫폼이 시각화들을 강력한 대시보드로 결합하는 방법을 보여줍니다. 이 대시보드는 직관적이며, 여러 소스의 데이터를 결합하고, 사용자가 원하는 특정 정보로 빠르게 드릴다운할 수 있게 해줍니다.

<!-- gate -->

<div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-9">

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-1">데이터 시각화란 무엇인가요?</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="text-secondary">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="">제11장</a></li></ul></div>

<p class="wp-block-paragraph">데이터 시각화는 데이터가 막대형 차트의 막대, 라인형 차트의 선, 또는 파이 차트의 조각과 같은 기호로 표현되는 차트 또는 그래픽 표현을 의미합니다. 차트와 데이터 시각화는 상호 교환적으로 사용될 수 있습니다.</p>

<p class="wp-block-paragraph">데이터 시각화는 단일 시각화로 독립적으로 존재하거나 여러 차트를 결합하여 대시보드를 만들 수 있습니다</p>

<figure class="wp-block-image size-full"><img fetchpriority="high" decoding="async" width="768" height="374" src="/images/2020/12/business-teams-reveal-sales-dashboard.jpg" alt="Data visualization - business teams reveal sales dashboard." title="Data visualization - business teams reveal sales dashboard" /></figure>

<h3 class="wp-block-heading">데이터 시각화 모범 사례를 따르는 것이 중요한 이유</h3>

<p class="wp-block-paragraph">소비자나 기업이 점점 더 복잡해지는 정보의 폭증에 직면함에 따라, 우리는 그들이 이를 더 빠르게 이해하도록 도와야 합니다.</p>

<p class="wp-block-paragraph">보시다시피, 데이터 시각화는 데이터를 더 소비하기 쉽게 만들고, 사용자가 결정을 내리도록 돕고, 이야기를 전달하는 데 도움이 됩니다.</p>

<ul class="wp-block-list">
<li>차트는 풍부한 데이터(종종 KPI)를 가져와서&nbsp;<strong>소비하기 쉽게 만듭니다</strong></li>

<li>여러 차트는 하나 이상의 시각화를 표시하는 대시보드를 구성하여&nbsp;<strong>사용자가 결정을 내리는 데 도움을 줍니다</strong></li>

<li>차트는&nbsp;<strong>스토리를</strong>설명적이거나 탐색적인 방식으로 전달할 수 있습니다</li>
</ul>

<p class="wp-block-paragraph">우리 인간은 시각적으로 생각하도록 프로그래밍되어 있습니다</p>

<ul class="wp-block-list">
<li>사람들의 65%는 시각적 학습자입니다&nbsp;<sup>i</sup></li>

<li>저희는 텍스트보다 이미지를 60,000배 더 빠르게 처리합니다.<sup>ii</sup></li>

<li>이미지를 인식하는 데 13밀리초가 걸립니다</li>
</ul>

<p class="wp-block-paragraph">아래 차트처럼 사람별 키를 보는 것만으로도, 이 데이터를 열 차트로 정렬하는 것이 즉각적인 통찰력을 어떻게 제공하는지 명확하게 알 수 있습니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="403" src="/images/2020/12/business-teams-reveal-bar-chart-updated.jpg" alt="Data visualization - business teams reveal bar chart" title="Data visualization - business teams reveal bar chart" /></figure>

<p class="wp-block-paragraph">따라서 시각화를 만들 때, 이 논문의 나머지 부분에서 강조하는 모범 사례를 따르는 것이 가장 좋습니다.</p>

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-2">사용자를 먼저 이해하기</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="text-secondary">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="">제11장</a></li></ul></div>

<p class="wp-block-paragraph">커뮤니케이션의 황금률은 청중을 아는 것입니다. 기술 사용자에게 하는 커뮤니케이션과 비즈니스 사용자에게 하는 커뮤니케이션, 또는 고객에게 영업 제안을 하거나 회사 임원들에게 발표하는 것은 다르게 할 것입니다.</p>

<p class="wp-block-paragraph">모든 시각화는 데이터 스토리를 전달합니다. 스토리를 디자인하는 사람으로서 당신의 역할은 다음과 같습니다:</p>

<ul class="wp-block-list">
<li>데이터가 전할 이야기에 대한 명확성을 확보하세요</li>

<li>청중과 그들의 목표를 파악하세요</li>
</ul>

<p class="wp-block-paragraph">자, 시각화를 만들 때, 시각화가 복잡한 데이터를 단순화하고, 데이터 스토리를 전달하며, 의사 결정을 유도하는지 확인하면서 다음 질문들을 염두에 두세요:</p>

<p class="wp-block-paragraph">복잡한 데이터를 간소화:</p>

<ul class="wp-block-list">
<li>누가 시각화를 사용할 것인가요?</li>

<li>청중을 아시나요?</li>

<li>이 시각화는 어떤 질문에 답해야 하나요?</li>
</ul>

<p class="wp-block-paragraph">데이터 스토리텔링 시작:</p>

<ul class="wp-block-list">
<li>단일 시각화가 필요하신가요, 아니면 여러 개의 시각화가 필요하신가요?</li>

<li>차트 제목이 데이터에 충분한 맥락을 제공하나요, 아니면 스토리를 전달하기 위해 보조 텍스트가 필요한가요?</li>
</ul>

<p class="wp-block-paragraph">의사 결정 추진</p>

<ul class="wp-block-list">
<li>데이터 스토리에서 중요한 포인트를 강조하는 데 사용할 수 있는 기술은 무엇인가요?</li>

<li>이것은 탐색적 시각화인가요 아니면 설명적 시각화인가요?</li>
</ul>

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-3">적절한 차트 유형 선택하기</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="text-secondary">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="">제11장</a></li></ul></div>

<p class="wp-block-paragraph">데이터로 효과적인 이야기를 전달할 때 가장 큰 어려움 중 하나는 적절한 차트 유형을 선택하는 것입니다. 무한한 양이 존재하며, 각각은 메시지나 데이터 스토리를 가장 잘 전달하는 데 도움이 되는 고유한 속성을 가지고 있습니다. 데이터가 여러 차트와 작동할 수 있지만, 데이터를 소비자에게 명확하고 간결하게 만드는 차트를 선택하는 것은 제작자인 귀하에게 달려 있습니다.</p>

<p class="wp-block-paragraph">이 과정을 돕기 위해, 데이터에 대한 각 시각화를 선택할 때 다음 핵심 질문들을 생각하고 아래 가이드를 사용하여 도움을 받으세요:</p>

<ul class="wp-block-list">
<li>차트로 전달하고 싶은 핵심 메시지는 무엇인가요?</li>

<li>변수를 비교하시겠습니까?</li>

<li>데이터의 분포를 이해해야 합니까?</li>

<li>분석해야 할 가능한 트렌드가 있습니까?</li>
</ul>

<p class="wp-block-paragraph">전달하고 싶은 포인트를 선택하고 최적의 차트 유형을 선택하세요.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="600" src="/images/2020/12/business-teams-reveal-chart-types-update.jpg" alt="Data visualization - business teams reveal chart types" title="Data visualization - business teams reveal chart types" /></figure>

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-4">색상과 텍스트의 올바른 사용</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="text-secondary">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="">제11장</a></li></ul></div>

<p class="wp-block-paragraph">색상과 텍스트는 중요한 부분을 강조하는 데 도움이 되거나, 또는&nbsp;<strong>데이터 스토리에서 벗어나게 할 수 있습니다</strong>. 색상을 사용하여 아름다움이나 &#8220;차트 예술에 의존하지 않고 데이터에 기반하여 효과적으로 소통하세요.&#8221;</p>

<p class="wp-block-paragraph">이 차트를 볼 때:</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="438" src="/images/2020/12/business-teams-reveal-use-chart-colors-updated.jpg" alt="Data visualization - business teams reveal use chart colors" title="Data visualization - business teams reveal use chart colors" /></figure>

<ul class="wp-block-list">
<li>색상이 너무 비슷해서 여러 필드를 빠르게 구별하기 어렵습니다</li>

<li>글꼴 사용이 부적절합니다. 세리프 글꼴은 종이에 읽기에는 좋지만 화면에서는 그렇지 않습니다</li>

<li>3D는 전체에 대한 부품 크기를 알기 어렵게 만듭니다</li>

<li>파이 차트의 레이블이 거의 읽을 수 없습니다.</li>
</ul>

<p class="wp-block-paragraph">차트 혼란을 피하고 스토리에서 벗어나지 않으려면, 차트에 사용할 수 있는 세 가지 유형의 색 구성표가 있습니다 – 발산형, 순차형 및 범주형.</p>

<p class="wp-block-paragraph">차트를 위한 적절한 색상을 선택할 때 아래 지침을 따르세요:</p>

<p class="wp-block-paragraph">사용<strong>발산하는</strong>&nbsp;양 끝에서 중앙 값이 공유될 때의 색상 구성</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="605" src="/images/2020/12/business-teams-reveal-diverging-color-scheme-updated.jpg" alt="Data visualization - business teams reveal diverging color scheme" title="Data visualization - business teams reveal diverging color scheme" /></figure>

<p class="wp-block-paragraph">사용<strong>순차적</strong>숫자 또는 순서가 있는 값의 색상</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="550" src="/images/2020/12/business-teams-reveal-sequential-color-scheme.jpg" alt="Data visualization - business teams reveal sequential color scheme" title="Data visualization - business teams reveal sequential color scheme" /></figure>

<p class="wp-block-paragraph">사용<strong>범주형</strong>&nbsp;순서가 없는 고유 변수를 가진 색상</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="462" src="/images/2020/12/business-teams-reveal-categorical-color-scheme.jpg" alt="Data visualization - business teams reveal categorical color scheme" title="Data visualization - business teams reveal categorical color scheme" /></figure>

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-5">차트 장식 피하기</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="text-secondary">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="">제11장</a></li></ul></div>

<p class="wp-block-paragraph">시각화에 초점을 맞추어 데이터 스토리텔링을 하고 차트를 깔끔하고 읽기 쉽게 유지하세요. 다음과 같은 불필요한 정보나 그래픽으로 사용자를 혼란스럽게 하지 마세요:</p>

<ul class="wp-block-list">
<li>3D, 디스럽티브 쉐이딩</li>

<li>굵은 그리드 선/박스 테두리</li>

<li>독특한 글꼴 선택</li>

<li>산만한 배경 이미지</li>
</ul>

<p class="wp-block-paragraph">그래픽의 많은 잉크는 데이터 정보를 제시해야 합니다. 데이터 잉크는 그래픽의 지울 수 없는 핵심이며, 표현된 숫자의 변화에 반응하여 배열된 비중복 잉크입니다.</p>

<figure class="wp-block-pullquote"><blockquote><p>무엇보다 데이터를 보여주세요.</p><cite>에드워드 터프티, The Visual Display of Quantitative Data, 1983</cite></blockquote></figure>

<p class="wp-block-paragraph">아래 차트를 보면 너무 많은 것이 담겨 있어서 차트 자체의 목적을 흐립니다:</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="390" src="/images/2020/12/business-teams-reveal-chart-junk.jpg" alt="Data visualization - business teams reveal chart junk" title="Data visualization - business teams reveal chart junk" /></figure>

<p class="wp-block-paragraph">시각화에서 불필요한 요소를 제거하면 이 차트의 스토리가 훨씬 더 명확해집니다:</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="420" src="/images/2020/12/business-teams-reveal-avoid-chart-junk.jpg" alt="Data visualization - business teams reveal avoid chart junk" title="Data visualization - business teams reveal avoid chart junk" /></figure>

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-6">데이터를 명확하게 하세요</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="text-secondary">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="">제11장</a></li></ul></div>

<p class="wp-block-paragraph">시각화 기능을 사용하여 데이터 스토리에 명확성을 더하세요. 데이터를 오름차순으로 정렬하여 성장 스토리를 전달하세요. 하락하는 성장률이나 수익을 보여주려면 내림차순 정렬을 사용하세요.</p>

<p class="wp-block-paragraph">제목, 추세선 또는 십자선과 같은 차트 기능은 스토리를 더 빠르게 전달하는 데 도움이 될 수 있습니다. 데이터 시각화가 명확하도록 다음 6가지 모범 사례를 따르십시오:</p>

<h3 class="wp-block-heading">차트 제목 및 설명</h3>

<p class="wp-block-paragraph">설명적이고 간결하게 사용하세요&nbsp;<strong>제목</strong>차트에 소비자에게 이유와 설명을 제공하는 제목을 사용하세요. 차트 제목은 간단하고 핵심적이어야 하며, 데이터와 시각화가 이야기의 핵심을 전달해야 합니다. 주로 제목은 아래의 차트와 직접적으로 관련되어 이를 지원해야 합니다. 예를 들어, 아래 차트에서는 범례와 시각화가 부서와 연령에 대한 이야기를 전달하게 하되, 소비자가 이 차트에서 무엇을 얻고 있는지에 대한 충분히 간결한 정보를 제공하세요.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="510" src="/images/2020/12/business-teams-reveal-titles-updated.jpg" alt="Data visualization - business teams reveal titles" title="Data visualization - business teams reveal titles" /></figure>

<h3 class="wp-block-heading">알파벳순 정렬</h3>

<p class="wp-block-paragraph">데이터를 정렬하세요&nbsp;<strong>알파벳순으로</strong>x축에서 카테고리를 사용할 때, 사람들이 찾고 있는 것을 빠르게 찾도록 도와야 할 때입니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="480" src="/images/2020/12/business-teams-reveal-alphabetical.jpg" alt="Data visualization - business teams reveal alphabetical" title="Data visualization - business teams reveal alphabetical" /></figure>

<h3 class="wp-block-heading">오름차순으로 데이터 정렬</h3>

<p class="wp-block-paragraph">데이터를 &nbsp;정렬<strong>오름차순</strong>성장의 이야기를 전달해야 할 때 순서를 지정합니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="480" src="/images/2020/12/business-teams-reveal-ascending.jpg" alt="Data visualization - business teams reveal ascending" title="Data visualization - business teams reveal ascending" /></figure>

<h3 class="wp-block-heading">내림차순으로 데이터 정렬</h3>

<p class="wp-block-paragraph">데이터를 &nbsp;정렬<strong>내림차순</strong>가장 큰 것부터 가장 작은 것까지 비교해야 할 때의 정렬입니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="480" src="/images/2020/12/business-teams-reveal-descending.jpg" alt="Data visualization - business teams reveal descending" title="Data visualization - business teams reveal descending" /></figure>

<h3 class="wp-block-heading">추세선</h3>

<p class="wp-block-paragraph">추세선은 시계열 차트에서 강력한 기법이며, 인기 미디어에서 점점 더 많이 목격되고 있습니다. 뉴욕 주지사 앤드류 쿠오모는 이상치 날짜를 제거하기 위해 코로나바이러스 증가 또는 감소율에 7일 평균 추세선을 자주 사용했습니다. 일별 변동이 이해를 더 어렵게 만들 수 있는 곳에서, 시계열 추세선은 시간이 지남에 따른 데이터의 일반적인 방향을 보여줍니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="371" src="/images/2020/12/business-teams-reveal-clear-with-data.jpg" alt="Data visualization - business teams reveal clear with data" title="Data visualization - business teams reveal clear with data" /></figure>

<h3 class="wp-block-heading">교차 조준점</h3>

<p class="wp-block-paragraph">사용<strong>십자선</strong>&nbsp;뷰어가 차트를 분석할 때 더 많은 세부 정보를 얻는 데 도움이 됩니다. 모든 차트에 십자선이 필요한 것은 아니지만, 아래 차트에서 십자선이 사용자가 정확한 데이터 포인트에 대한 명확한 통찰력을 얻는 데 어떻게 도움이 되는지 확인할 수 있습니다:</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="470" src="/images/2020/12/business-teams-reveal-crosshairs.jpg" alt="Data visualization - business teams reveal crosshairs" title="Data visualization - business teams reveal crosshairs" /></figure>

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-7">중요한 부분을 강조하세요</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="text-secondary">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="">제11장</a></li></ul></div>

<p class="wp-block-paragraph">사용자의 데이터 스토리에서 가장 중요한 것에 초점을 맞추도록 시각화를 설계하세요. 데이터 내의 주요 지점, 추세 및 경계를 강조하는 것은 최종 사용자에게 필요한 빠른 통찰력을 제공하는 핵심이 될 수 있습니다.</p>

<p class="wp-block-paragraph">중요한 데이터를 강조할 때 다음 핵심 기능을 사용하세요:</p>

<h3 class="wp-block-heading">시리즈 하이라이팅</h3>

<p class="wp-block-paragraph">사용자의 주의를 원하는 곳에 집중시키기 위해&nbsp;<strong>시리즈 강조</strong>.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="510" src="/images/2020/12/business-teams-reveal-series-highlighting.jpg" alt="Data visualization - business teams reveal series highlighting" title="Data visualization - business teams reveal series highlighting" /></figure>

<h3 class="wp-block-heading">조건부 서식</h3>

<p class="wp-block-paragraph">주요 데이터 포인트에 주의를 집중시키려면&nbsp;<strong>조건부 서식</strong>데이터 변동과 연관되는 경계를 설정하세요.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="330" src="/images/2020/12/business-teams-reveal-conditional-formatting.jpg" alt="Data visualization - business teams reveal conditional formatting" title="Data visualization - business teams reveal conditional formatting" /></figure>

<h3 class="wp-block-heading">차트 주석</h3>

<p class="wp-block-paragraph">&nbsp;<strong>차트 주석을 사용하여 스토리텔링을 지원할 수 있습니다</strong> 주석은 소비자에게 데이터 포인트보다 깊은 통찰력을 제공합니다.</p>

<h3 class="wp-block-heading">이상치 감지</h3>

<p class="wp-block-paragraph"><strong>이상치 감지</strong>&nbsp;데이터 세트에서 이상 징후나 편차를 빠르게 강조 표시할 수 있습니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="390" src="/images/2020/12/business-teams-reveal-outlier-detection.jpg" alt="Data visualization - business teams reveal outlier detection" title="Data visualization - business teams reveal outlier detection" /></figure>

<h3 class="wp-block-heading">시계열</h3>

<p class="wp-block-paragraph"><strong>시계열</strong>&nbsp;예측 기능은 과거 및 현재 데이터를 기반으로 미래 데이터 포인트를 예측할 수 있게 하여 사용자에게 예측 분석을 제공합니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="379" src="/images/2020/12/business-teams-reveal-time-series.jpg" alt="Data visualization - business teams reveal time series" title="Data visualization - business teams reveal time series" /></figure>

<h3 class="wp-block-heading">선형 회귀</h3>

<p class="wp-block-paragraph">선형 회귀는 종속 변수와 독립 변수 간의 추세를 플롯할 수 있게 해줍니다. 데이터의 일반적인 추세에 맞는(예측하는) '최적 적합' 선을 보여주고 싶을 때 사용하세요.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="457" src="/images/2020/12/business-teams-reveal-linear-regression.jpg" alt="Data visualization - business teams reveal linear regression" title="Data visualization - business teams reveal linear regression" /></figure>

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-8">효과적인 상호 작용 활용하기</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="text-secondary">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="">제11장</a></li></ul></div>

<p class="wp-block-paragraph">현대 데이터 분석 프로그램은 사용자가 원하는 질문에 대해 더 깊은 통찰력을 얻을 수 있도록 데이터를 슬라이스하고 다이싱할 수 있는 상호 작용을 쉽게 만들 수 있게 합니다.</p>

<p class="wp-block-paragraph">가장 효과적인 상호 작용 중 일부는 다음과 같습니다:</p>

<h3 class="wp-block-heading">동적 필터링</h3>

<p class="wp-block-paragraph">대시보드나 시각화에 필터를 추가하면 데이터를 즉석에서 조정하여 더 깊은 통찰력을 얻을 수 있습니다. 대시보드 수준 또는 시각화 수준에서 뷰어들이 카테고리 필드나 날짜 범위별로 데이터를 자르고 나눌 수 있도록 다양한 옵션을 제공하십시오.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="780" height="900" src="/images/2020/12/business-teams-reveal-dynamic-filtering.jpg" alt="Data visualization - business teams reveal dynamic filtering" title="Data visualization - business teams reveal dynamic filtering" /></figure>

<h3 class="wp-block-heading">드릴다운</h3>

<p class="wp-block-paragraph">카테고리 또는 날짜 필드에 계층 구조를 활성화하면 최종 사용자가 더 심층적인 분석을 수행할 수 있습니다. 예를 들어, 다음 시각화에서 다양한 마케팅 채널에서 특정 제품까지 드릴다운하여 어떤 인지도를 창출하고 있는지에 대한 또 다른 수준의 통찰력을 얻을 수 있습니다:</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="478" src="/images/2020/12/business-teams-reveal-drilldown.jpg" alt="Data visualization - business teams reveal drilldown" title="Data visualization - business teams reveal drilldown" /></figure>

<h3 class="wp-block-heading">트리맵</h3>

<p class="wp-block-paragraph">트리맵은 드릴다운에 탁월한 시각화 기법입니다. 방대한 양의 계층적 데이터를 한눈에 간결하게 표시하며 전체의 일부로서 데이터를 보여줍니다. 한 국가의 예산과 다른 모든 국가의 예산 간의 관계를 볼 수 있으며, 드릴다운을 통해 사용자는 더 깊은 분석을 빠르게 수행할 수 있습니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="830" src="/images/2020/12/business-teams-reveal-treemap.jpg" alt="Data visualization - business teams reveal treemap" title="Data visualization - business teams reveal treemap" /></figure>

<h3 class="wp-block-heading">대시보드 연결</h3>

<p class="wp-block-paragraph">데이터 포인트나 시각화를 다른 대시보드에 연결할 수 있어 드릴다운을 새로운 수준으로 끌어올리세요. 아래 예시에서는 진행 중인 마케팅 캠페인 결과를 보여주는 개요 마케팅 대시보드를 설정할 수 있습니다. 대시보드 링크를 사용하면 해당 대시보드와 실행 중인 각 캠페인에 대한 보다 상세한 대시보드 간의 연결을 설정할 수 있습니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="502" src="/images/2020/12/business-teams-reveal-dashboard-linking.jpg" alt="Data visualization - business teams reveal dashboard linking" title="Data visualization - business teams reveal dashboard linking" /></figure>

<p class="wp-block-paragraph">이미지와 텍스트 필드를 사용하여 랜딩 페이지를 만들거나, 대시보드 내에서 바로 링크할 수 있습니다:</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="397" src="/images/2020/12/business-teams-reveal-dashboard-linking2.jpg" alt="Data visualization - business teams reveal dashboard linking" title="Data visualization - business teams reveal dashboard linking" /></figure>

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-9">3D를 현명하게 사용하세요</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="text-secondary">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="">제11장</a></li></ul></div>

<p class="wp-block-paragraph">3D는 실제 데이터를 모호하게 만들어 가정과 분석 사이의 여지를 만듭니다.</p>

<p class="wp-block-paragraph">3D 시각화는 표면 분석, 변동성 분석 또는 지형 연구를 수행할 때 유용합니다. 이 차트는 X, Y, Z를 포함한 여러 축을 사용하여 위에서 아래까지 화산의 온도 변화를 보여주기 때문에 작동하며, 3D 공간에서 더 유용한 이야기를 전달합니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="636" src="/images/2020/12/business-teams-reveal-3d-wisely.jpg" alt="Data visualization - business teams reveal 3d wisely" title="Data visualization - business teams reveal 3d wisely" /></figure>

<p class="wp-block-paragraph">표준 비즈니스 사용에는 3D를 피하는 것이 가장 좋습니다. 예를 들어, 아래 두 차트에서 왼쪽은 읽고, 이해하고, 어떤 통찰력을 얻는 것이 거의 불가능합니다. 같은 데이터를 보여주는 오른쪽 차트는 훨씬 더 명확합니다. 간단히 훑어보기만 해도, 하와이 클럽이 1993년부터 1995년까지 다른 두 리조트보다 수익 면에서 꾸준히 우수했다는 것을 알 수 있습니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="291" src="/images/2020/12/business-teams-reveal-bad-charts.jpg" alt="Data visualization - business teams reveal bad charts" title="Data visualization - business teams reveal bad charts" /></figure>

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-10">세부 사항에 주의하세요</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="text-secondary">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="">제11장</a></li></ul></div>

<p class="wp-block-paragraph">때로는 세부 정보가 데이터 스토리를 향상시킬 수 있지만, 다른 때에는 과도한 세부 정보가 메시지를 혼란스럽게 합니다. 숫자를 형식화하거나 상위 결과를 데이터에서 필터링하는 것이 읽기 쉽습니다.</p>

<p class="wp-block-paragraph">데이터를 포맷하는 것은 숫자를 시각적으로 더 매력적이고 최종 사용자가 읽기 더 쉽게 만드는 빠르고 간단한 방법입니다. 게이지 또는 막대 차트 및 열 차트와 같은 차트의 경우, 데이터 포맷을 조정하여 데이터 포인트를 눈에 띄게 만들 수 있습니다. 예를 들어, 소수점 자릿수를 제한하거나 쉼표 구분 기호의 위치를 조정할 수 있습니다. 또한, 통화 또는 백분율 측정값, 또는 큰 숫자 포맷을 사용하는 것도 고려해 보세요.</p>

<p class="wp-block-paragraph">아래의 두 가지 다른 KPI를 비교해 보세요. 어느 것이 이해하기 더 쉬운가요?</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="176" src="/images/2020/12/business-teams-reveal-formatting.jpg" alt="Data visualization - business teams reveal formatting" title="Data visualization - business teams reveal formatting" /></figure>

<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-11">적절한 규모 사용하기</h2>

<div class="whitepapers__chapter-breadcrumbs d-block d-md-none mt-3 mb-4"><ul class="list-inline list-inline--piped"><li class="list-inline-item"><a href="#chapter-1" class="">챕터 1</a></li><li class="list-inline-item"><a href="#chapter-2" class="">챕터 2</a></li><li class="list-inline-item"><a href="#chapter-3" class="">챕터 3</a></li><li class="list-inline-item"><a href="#chapter-4" class="">챕터 4</a></li><li class="list-inline-item"><a href="#chapter-5" class="">챕터 5</a></li><li class="list-inline-item"><a href="#chapter-6" class="">챕터 6</a></li><li class="list-inline-item"><a href="#chapter-7" class="">챕터 7</a></li><li class="list-inline-item"><a href="#chapter-8" class="">챕터 8</a></li><li class="list-inline-item"><a href="#chapter-9" class="">챕터 9</a></li><li class="list-inline-item"><a href="#chapter-10" class="">챕터 10</a></li><li class="list-inline-item"><a href="#chapter-11" class="text-secondary">제11장</a></li></ul></div>

<figure class="wp-block-pullquote"><blockquote><p><strong>거짓말에는 세 가지 종류가 있다: 거짓말, 빌어먹을 거짓말, 그리고 통계.</strong></p><cite>마크 트웨인</cite></blockquote></figure>

<p class="wp-block-paragraph">오해를 불러일으키는 시각화는 어디에서나 발견될 수 있습니다. 뉴스, 회의실, 소셜 미디어 등에서 너무 자주 목격합니다: 속이는 차트들. 때로는 의도적이지 않지만, 다른 때에는 의도적입니다.</p>

<p class="wp-block-paragraph">오해의 소지가 있는 시각화를 피하는 가장 좋은 방법은 Y축의 스케일을 변경하는 것을 피하는 것입니다. 이는 데이터가 전달해야 하는 이야기와 다른 이야기를 전달하는 경향이 있습니다.</p>

<p class="wp-block-paragraph">여기에 차트가 어떻게 잘못된 이야기를 할 수 있는지 한 가지 예시가 있습니다. 두 차트 모두 동일한 데이터를 보여주고 있습니다. 하지만 오른쪽 차트는 축이 5%에서 시작하여 미국 GDP가 급락하는 것처럼 보이게 만듭니다. 반면에 왼쪽 차트를 보면 실제로 작고 점진적인 하락만 있습니다.</p>

<figure class="wp-block-image size-full"><img decoding="async" width="768" height="275" src="/images/2020/12/business-teams-reveal-right-scale.jpg" alt="Data visualization - business teams reveal right scale" title="Data visualization - business teams reveal right scale" /></figure>

<h2 class="wp-block-heading mt-5" class="wp-block-heading mt-5" id="conclusion">결론</h2>

<p class="wp-block-paragraph">이 백서에 제시된 10가지 모범 사례는 시선을 사로잡고 매우 효과적인 시각화를 만드는 데 유용한 팁을 제공해야 합니다. 기업들은 추세를 더 잘 파악하거나 새로운 기회를 보기 위해 데이터를 더 많이 채택하고 있습니다. 데이터 시각화 및 대시보드를 사용하여 강력한 이야기를 전달하거나 팀으로부터 통찰력과 피드백을 수집하기 위한 탐색에 사용할 수 있습니다.</p>

<p class="wp-block-paragraph">이러한 기술들 중 일부를 직접 경험해 보고 싶다면, <a href="https://www.revealbi.io/download-sdk" target="_blank" rel="noopener">저희 SDK를 다운로드하여</a> 더 많은 정보를 알아보세요. <a href="https://www.revealbi.io/embedded-analytics" target="_blank" rel="noopener">Reveal 임베디드 분석을 통해</a>.</p>

<p class="wp-block-paragraph">웨비나도 시청하실 수 있습니다. &nbsp;<a class="rank-math-link" href="https://www.youtube.com/watch?v=Xwbz6BYdMw8&amp;list=PLZ4rRHIJepBt-USWdh-9BimHh-GjPAGUH&amp;index=6&amp;t=322s" target="_blank" rel="noopener">대시보드 생성 시 해야 할 것과 하지 말아야 할 것</a>.</p>

<p class="wp-block-paragraph"><em><sup><source>
i
</source></sup>&nbsp;마인드 툴즈, 1998</em><br><em><sup>ii</sup>&nbsp;3M 코퍼레이션, 2001</em></p>
        </div>
        <div class="col-12 col-md-3 d-none d-md-block">
          <nav class="whitepapers__chapters--side shadow">
            <ul class="list-group">
              <li class="list-group-item"><a href="#chapter-1"><small class="d-block mb-2">챕터 1</small><span class="font-weight-bold">데이터 시각화란 무엇인가요?</span></a></li><li class="list-group-item"><a href="#chapter-2"><small class="d-block mb-2">챕터 2</small><span class="font-weight-bold">사용자를 먼저 이해하기</span></a></li><li class="list-group-item"><a href="#chapter-3"><small class="d-block mb-2">챕터 3</small><span class="font-weight-bold">적절한 차트 유형 선택하기</span></a></li><li class="list-group-item"><a href="#chapter-4"><small class="d-block mb-2">챕터 4</small><span class="font-weight-bold">색상과 텍스트의 올바른 사용</span></a></li><li class="list-group-item"><a href="#chapter-5"><small class="d-block mb-2">챕터 5</small><span class="font-weight-bold">차트 장식 피하기</span></a></li><li class="list-group-item"><a href="#chapter-6"><small class="d-block mb-2">챕터 6</small><span class="font-weight-bold">데이터를 명확하게 하세요</span></a></li><li class="list-group-item"><a href="#chapter-7"><small class="d-block mb-2">챕터 7</small><span class="font-weight-bold">중요한 부분을 강조하세요</span></a></li><li class="list-group-item"><a href="#chapter-8"><small class="d-block mb-2">챕터 8</small><span class="font-weight-bold">효과적인 상호 작용 활용하기</span></a></li><li class="list-group-item"><a href="#chapter-9"><small class="d-block mb-2">챕터 9</small><span class="font-weight-bold">3D를 현명하게 사용하세요</span></a></li><li class="list-group-item"><a href="#chapter-10"><small class="d-block mb-2">챕터 10</small><span class="font-weight-bold">세부 사항에 주의하세요</span></a></li><li class="list-group-item"><a href="#chapter-11"><small class="d-block mb-2">제11장</small><span class="font-weight-bold">적절한 규모 사용하기</span></a></li>            </ul>
          </nav>
        </div>
      </div>
    </div>
