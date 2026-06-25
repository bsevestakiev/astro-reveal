// Localized chrome strings for the whitepaper layout (gate-form, author, and
// recent-content sections in BlogLayout.astro). The whitepaper *body* is
// translated in the content .md files; these are the surrounding UI strings.
//
// EN is the base. Localized strings are sourced from the previously
// hand/pipeline-translated whitepaper pages, cleaned for consistency.
// `getWhitepaperChrome(lang)` falls back to EN for unknown/missing locales.

const ERR_LINK_STYLE = 'color:red;text-decoration:underline;font-weight:bold;'
const supportLink = `<a href="mailto:support@revealbi.io" style="${ERR_LINK_STYLE}">support@revealbi.io</a>`

export interface WhitepaperChrome {
  continueReading: string
  fillOutPrompt: string
  required: string
  labelCountry: string
  labelEmail: string
  labelFirstName: string
  labelLastName: string
  labelPhone: string
  submit: string
  thankyou: string
  aboutAuthor: string
  recentContent: string
  moreFrom: (name: string) => string
  conditionError: string
  invalidEmailError: string
  freeEmailError: string
  recaptchaNotice: string
  apiErrorHtml: string
  recaptchaErrorHtml: string
  gdprHtml: string
}

const tryAgain = (label: string) =>
  `<a href="#" onclick="location.reload();return false;" style="${ERR_LINK_STYLE}">${label}</a>`

const termsLink = (label: string) =>
  `<a class="text-decoration-none font-weight-bolder" href="/terms-of-use">${label}</a>`
const privacyLink = (label: string) =>
  `<a class="text-decoration-none font-weight-bolder" href="/privacy-policy">${label}</a>`

const en: WhitepaperChrome = {
  continueReading: 'Continue Reading',
  fillOutPrompt: 'Fill out the form to continue reading.',
  required: 'Required',
  labelCountry: 'Country',
  labelEmail: 'Email',
  labelFirstName: 'First Name',
  labelLastName: 'Last Name',
  labelPhone: 'Phone',
  submit: 'Keep Reading',
  thankyou: 'Form submitted',
  aboutAuthor: 'About the Author',
  recentContent: 'Recent Content',
  moreFrom: name => `More from ${name}`,
  conditionError: 'Please accept the form terms to submit successfully.',
  invalidEmailError: "This email address doesn't appear valid. Please update and try again.",
  freeEmailError: 'Please use a business email address.',
  recaptchaNotice: 'This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Use apply.',
  apiErrorHtml: `Sorry, it seems that we have run into an issue with the form. ${tryAgain('Please try again')} in a few minutes. If you still experience issues, please contact us at ${supportLink}.`,
  recaptchaErrorHtml: `Unfortunately, Google has considered you a bot. Please contact ${supportLink}.`,
  gdprHtml: `I understand and agree to the terms of Infragistics&#39; ${termsLink('Terms of Use')} and ${privacyLink('Privacy Policy')}`,
}

const es: WhitepaperChrome = {
  continueReading: 'Continúe leyendo',
  fillOutPrompt: 'Complete el formulario para continuar leyendo.',
  required: 'Obligatorio',
  labelCountry: 'País',
  labelEmail: 'Correo electrónico',
  labelFirstName: 'Nombre',
  labelLastName: 'Apellido',
  labelPhone: 'Teléfono',
  submit: 'Siga leyendo',
  thankyou: 'Formulario enviado',
  aboutAuthor: 'Acerca del autor',
  recentContent: 'Contenido reciente',
  moreFrom: name => `Más de ${name}`,
  conditionError: 'Acepte los términos del formulario para enviarlo correctamente.',
  invalidEmailError: 'Esta dirección de correo electrónico no parece válida. Actualícela e inténtelo de nuevo.',
  freeEmailError: 'Utilice una dirección de correo electrónico corporativa.',
  recaptchaNotice: 'Este sitio está protegido por reCAPTCHA y se aplican la Política de Privacidad y los Términos de Uso de Google.',
  apiErrorHtml: `Lo sentimos, parece que hemos tenido un problema con el formulario. ${tryAgain('Inténtelo de nuevo')} en unos minutos. Si el problema persiste, póngase en contacto con nosotros en ${supportLink}.`,
  recaptchaErrorHtml: `Lamentablemente, Google lo ha considerado un bot. Póngase en contacto con ${supportLink}.`,
  gdprHtml: `Entiendo y acepto los ${termsLink('Términos de Uso')} y la ${privacyLink('Política de Privacidad')} de Infragistics`,
}

const ja: WhitepaperChrome = {
  continueReading: '続きを読む',
  fillOutPrompt: 'フォームに記入して続きをお読みください。',
  required: '必須',
  labelCountry: '国',
  labelEmail: 'メールアドレス',
  labelFirstName: '名',
  labelLastName: '姓',
  labelPhone: '電話番号',
  submit: '続きを読む',
  thankyou: 'フォームが送信されました',
  aboutAuthor: '著者について',
  recentContent: '最新のコンテンツ',
  moreFrom: name => `${name}のその他の記事`,
  conditionError: 'フォームの規約に同意してから送信してください。',
  invalidEmailError: 'このメールアドレスは有効ではないようです。修正してもう一度お試しください。',
  freeEmailError: 'ビジネス用のメールアドレスをご利用ください。',
  recaptchaNotice: 'このサイトはreCAPTCHAによって保護されており、Googleのプライバシーポリシーおよび利用規約が適用されます。',
  apiErrorHtml: `申し訳ございませんが、フォームで問題が発生したようです。数分後に${tryAgain('もう一度お試しください')}。問題が解決しない場合は、${supportLink} までお問い合わせください。`,
  recaptchaErrorHtml: `残念ながら、Googleはあなたをボットと判断しました。${supportLink} までお問い合わせください。`,
  gdprHtml: `Infragisticsの${termsLink('利用規約')}および${privacyLink('プライバシーポリシー')}に同意し、理解しました。`,
}

const ko: WhitepaperChrome = {
  continueReading: '계속 읽기',
  fillOutPrompt: '양식을 작성하여 계속 읽으십시오.',
  required: '필수',
  labelCountry: '국가',
  labelEmail: '이메일',
  labelFirstName: '이름',
  labelLastName: '성',
  labelPhone: '전화번호',
  submit: '계속 읽기',
  thankyou: '양식이 제출되었습니다',
  aboutAuthor: '저자 소개',
  recentContent: '최신 콘텐츠',
  moreFrom: name => `${name}의 다른 글`,
  conditionError: '양식 약관에 동의해야 제출할 수 있습니다.',
  invalidEmailError: '이 이메일 주소는 유효하지 않은 것 같습니다. 업데이트한 후 다시 시도하십시오.',
  freeEmailError: '회사 이메일 주소를 사용하십시오.',
  recaptchaNotice: '이 사이트는 reCAPTCHA로 보호되며 Google 개인정보처리방침 및 이용약관이 적용됩니다.',
  apiErrorHtml: `죄송합니다. 양식에 문제가 발생한 것 같습니다. 잠시 후 ${tryAgain('다시 시도해 주십시오')}. 문제가 계속되면 ${supportLink} 로 문의해 주십시오.`,
  recaptchaErrorHtml: `안타깝게도 Google에서 귀하를 봇으로 간주했습니다. ${supportLink} 로 문의해 주십시오.`,
  gdprHtml: `Infragistics의 ${termsLink('이용약관')} 및 ${privacyLink('개인정보처리방침')}에 동의하며 이를 이해합니다.`,
}

const ptBR: WhitepaperChrome = {
  continueReading: 'Continue lendo',
  fillOutPrompt: 'Preencha o formulário para continuar lendo.',
  required: 'Obrigatório',
  labelCountry: 'País',
  labelEmail: 'E-mail',
  labelFirstName: 'Nome',
  labelLastName: 'Sobrenome',
  labelPhone: 'Telefone',
  submit: 'Continue lendo',
  thankyou: 'Formulário enviado',
  aboutAuthor: 'Sobre o autor',
  recentContent: 'Conteúdo recente',
  moreFrom: name => `Mais de ${name}`,
  conditionError: 'Aceite os termos do formulário para enviar com sucesso.',
  invalidEmailError: 'Este endereço de e-mail não parece válido. Atualize e tente novamente.',
  freeEmailError: 'Use um endereço de e-mail corporativo.',
  recaptchaNotice: 'Este site é protegido pelo reCAPTCHA e a Política de Privacidade e os Termos de Uso do Google se aplicam.',
  apiErrorHtml: `Desculpe, parece que tivemos um problema com o formulário. ${tryAgain('Tente novamente')} em alguns minutos. Se o problema persistir, entre em contato conosco em ${supportLink}.`,
  recaptchaErrorHtml: `Infelizmente, o Google o identificou como um bot. Entre em contato com ${supportLink}.`,
  gdprHtml: `Eu entendo e concordo com os ${termsLink('Termos de Uso')} e a ${privacyLink('Política de Privacidade')} da Infragistics`,
}

const CHROME: Record<string, WhitepaperChrome> = { en, es, ja, ko, 'pt-BR': ptBR }

export function getWhitepaperChrome(lang?: string): WhitepaperChrome {
  return (lang && CHROME[lang]) || en
}
