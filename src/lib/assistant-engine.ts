import { getProduct, products, type Product } from 'data/catalog';
import { formatBRL, normalizeText, roundMoney } from 'lib/format';
import type {
  AssistantTurn,
  PartyContext,
  ServiceRecommendation
} from 'lib/assistant-types';

const FIELD_ORDER = [
  'eventType',
  'audienceSize',
  'budget',
  'date',
  'venue',
  'location',
  'ageRange',
  'audienceType',
  'style',
  'time'
] as const;

const QUESTIONS: Record<(typeof FIELD_ORDER)[number], string> = {
  eventType: 'Que tipo de festa é? Aniversário, casamento, confraternização ou outra?',
  audienceSize: 'Quantas pessoas você espera?',
  budget: 'Qual teto de orçamento, em reais, você quer respeitar?',
  date: 'Tem uma data, mesmo que aproximada?',
  venue: 'Onde será: em casa, salão, praia ou outro espaço?',
  location: 'Em qual bairro ou cidade?',
  ageRange: 'Qual a faixa de idade de quem vai?',
  audienceType: 'O público é mais família, amigos ou colegas?',
  style: 'Como você imagina o estilo: colorido, clássico, intimista ou outro?',
  time: 'Qual o horário, mesmo que aproximado?'
};

export function missingFields(context: PartyContext) {
  return FIELD_ORDER.filter((key) => {
    const value = context[key];
    if (Array.isArray(value)) return value.length === 0;
    return value == null || value === '';
  });
}

export function estimateQuantity(product: Product, audienceSize?: number) {
  if (product.unit.includes('pessoa')) return Math.max(1, audienceSize || 1);
  if (product.unit.includes('caixa')) {
    return Math.max(1, Math.ceil((audienceSize || 20) / 10));
  }
  if (product.unit.includes('combo')) {
    return Math.max(1, Math.ceil((audienceSize || 20) / 40));
  }
  return 1;
}

export function lineTotal(product: Product, quantity: number) {
  return roundMoney(product.price * quantity);
}

function eventTag(eventType?: string) {
  const value = normalizeText(eventType || '');
  if (value.includes('casament')) return 'Casamento';
  if (value.includes('corporat') || value.includes('confratern') || value.includes('empresa')) {
    return 'Corporativo';
  }
  if (value.includes('infantil') || value.includes('crianca')) return 'Infantil';
  if (value.includes('anivers')) return 'Aniversário';
  return '';
}

function wants(preferences: string[] | undefined, token: string) {
  return (preferences || []).some((item) => normalizeText(item).includes(token));
}

function scoreProduct(product: Product, context: PartyContext) {
  let score = product.rating * 8;
  const tag = eventTag(context.eventType);
  if (tag && product.tags.includes(tag)) score += 24;
  const style = normalizeText(context.style || '');
  const haystack = normalizeText(
    `${product.title} ${product.description} ${product.tags.join(' ')}`
  );
  if (style && haystack.includes(style)) score += 14;
  const age = normalizeText(context.ageRange || '');
  if ((age.includes('crianca') || age.includes('infantil')) && product.tags.includes('Infantil')) {
    score += 18;
  }
  if (wants(context.preferences, 'buffet') && product.id.startsWith('buffet')) score += 36;
  if (wants(context.preferences, 'dj') && product.id === 'dj-profissional') score += 40;
  if (wants(context.preferences, 'banda') && product.id === 'banda-ao-vivo') score += 36;
  if (wants(context.preferences, 'decor') && product.category === 'decoracao') score += 16;
  if (wants(context.preferences, 'foto') && product.category === 'midia') score += 16;
  if (wants(context.preferences, 'bar') && product.id === 'barman-joao') score += 20;
  if (style.includes('color') && product.id === 'baloes-painel') score += 22;
  if (tag === 'Casamento' && product.id === 'buffet-premium') score += 18;
  if (tag === 'Casamento' && product.id === 'decoracao-classica') score += 12;
  const cost = lineTotal(product, estimateQuantity(product, context.audienceSize));
  if (context.budget && cost > context.budget) score -= 30;
  return score;
}

function reasonFor(product: Product, context: PartyContext) {
  const bits: string[] = [];
  const tag = eventTag(context.eventType);
  if (tag && product.tags.includes(tag)) bits.push(`combina com ${context.eventType}`);
  const style = normalizeText(context.style || '');
  const about = normalizeText(
    `${product.title} ${product.description} ${product.id} ${product.tags.join(' ')}`
  );
  const styleFits =
    (style && about.includes(style)) ||
    (style.includes('color') && product.id === 'baloes-painel');
  if (context.style && styleFits) bits.push(`encaixa num estilo ${context.style}`);
  if (product.unit.includes('pessoa') && context.audienceSize) {
    bits.push(`cobre ${context.audienceSize} pessoas`);
  }
  bits.push(
    `avaliação ${product.rating.toFixed(1).replace('.', ',')} no catálogo`
  );
  return `Por que recomendamos: ${bits.join('; ')}.`;
}

export function recommendFromCatalog(context: PartyContext): ServiceRecommendation[] {
  const size = context.audienceSize || 40;
  const budget = context.budget;
  const ranked = [...products].sort(
    (a, b) => scoreProduct(b, context) - scoreProduct(a, context)
  );
  const categories = ['alimentacao', 'musica', 'decoracao', 'midia'] as const;
  const chosen: ServiceRecommendation[] = [];
  let spent = 0;

  for (const category of categories) {
    const options = ranked.filter((product) => product.category === category);
    const affordable = options.find((product) => {
      const total = lineTotal(product, estimateQuantity(product, size));
      return !budget || spent + total <= budget * 1.02;
    });
    const pick = affordable || (category === 'alimentacao' ? options[0] : undefined);
    if (!pick) continue;
    if (category !== 'alimentacao' && !affordable) continue;
    const quantity = estimateQuantity(pick, size);
    const total = lineTotal(pick, quantity);
    if (budget && category !== 'alimentacao' && spent + total > budget * 1.05) continue;
    chosen.push({
      productId: pick.id,
      quantity,
      reason: reasonFor(pick, context),
      lineTotal: total
    });
    spent = roundMoney(spent + total);
  }

  return chosen;
}

export function priceRecommendations(
  items: { productId: string; quantity?: number; reason?: string }[]
): ServiceRecommendation[] {
  const seen = new Set<string>();
  const priced: ServiceRecommendation[] = [];
  for (const item of items) {
    if (seen.has(item.productId)) continue;
    const product = getProduct(item.productId);
    if (!product) continue;
    seen.add(item.productId);
    const quantity = Math.max(1, Math.round(item.quantity || 1));
    priced.push({
      productId: product.id,
      quantity,
      reason: item.reason?.trim() || reasonFor(product, {}),
      lineTotal: lineTotal(product, quantity)
    });
  }
  return priced;
}

function capture(pattern: RegExp, text: string) {
  const match = text.match(pattern);
  return match?.[1];
}

export function extractContext(message: string, base: PartyContext): PartyContext {
  const text = normalizeText(message);
  const next: PartyContext = {
    ...base,
    preferences: [...(base.preferences || [])]
  };

  if (/anivers/.test(text)) next.eventType = 'aniversário';
  else if (/casament/.test(text)) next.eventType = 'casamento';
  else if (/formatura/.test(text)) next.eventType = 'formatura';
  else if (/confratern|corporativ|empresa|time\b/.test(text)) {
    next.eventType = 'confraternização';
  } else if (/infantil|crianca/.test(text) && !next.eventType) {
    next.eventType = 'festa infantil';
  }

  const size = text.match(/(\d{1,4})\s*(pessoas|convidados|amigos|adultos|criancas|criança)/);
  if (size) next.audienceSize = Number(size[1]);

  const mil = text.match(/(\d+(?:[.,]\d+)?)\s*mil\b/);
  const money = text.match(/r\$\s*(\d{1,3}(?:\.\d{3})+|\d+)/);
  const budgetWords = text.match(
    /orcamento(?:\s+de)?\s+(\d{1,3}(?:\.\d{3})+|\d+)/
  );
  if (mil) next.budget = Math.round(Number(mil[1].replace(',', '.')) * 1000);
  else if (money) next.budget = Number(money[1].replace(/\./g, ''));
  else if (budgetWords) next.budget = Number(budgetWords[1].replace(/\./g, ''));

  const months = [
    'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  const longDate = text.match(
    new RegExp(`(\\d{1,2})\\s*de\\s*(${months.join('|')})`)
  );
  const shortDate = text.match(/\b(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?\b/);
  if (longDate) next.date = message.match(/\d{1,2}\s*de\s*[A-Za-zÀ-ú]+/)?.[0] || longDate[0];
  else if (shortDate) next.date = shortDate[0];
  else if (/sabado|domingo|sexta|quinta|quarta|terca|segunda/.test(text)) {
    const day = capture(/(sabado|domingo|sexta|quinta|quarta|terca|segunda)/, text);
    if (day) next.date = day.replace('terca', 'terça').replace('sabado', 'sábado');
  }

  const clock = text.match(/\b(\d{1,2})\s*(?:h|:)\s*(\d{2})?\b/);
  if (clock) next.time = clock[2] ? `${clock[1]}h${clock[2]}` : `${clock[1]}h`;
  else if (/a noite|de noite/.test(text)) next.time = 'à noite';
  else if (/de tarde|a tarde/.test(text)) next.time = 'à tarde';
  else if (/de manha|pela manha/.test(text)) next.time = 'de manhã';

  if (/amigos/.test(text)) next.audienceType = 'amigos';
  else if (/familia/.test(text)) next.audienceType = 'família';
  else if (/colegas|trabalho|empresa/.test(text)) next.audienceType = 'colegas';
  else if (/criancas/.test(text)) next.audienceType = 'crianças';

  const ageRange = text.match(/(\d{1,2})\s*(?:a|-)\s*(\d{1,2})\s*anos/);
  if (ageRange) next.ageRange = `${ageRange[1]} a ${ageRange[2]} anos`;
  else if (/criancas/.test(text)) next.ageRange = next.ageRange || 'crianças';
  else if (/adultos/.test(text)) next.ageRange = 'adultos';
  else {
    const years = text.match(/(\d{1,2})\s*anos/);
    if (years) next.ageRange = `cerca de ${years[1]} anos`;
  }

  if (/em casa|na minha casa|no apartamento/.test(text)) next.venue = 'em casa';
  else if (/salao/.test(text)) next.venue = 'salão';
  else if (/praia/.test(text)) next.venue = 'praia';
  else if (/sitio|chacara/.test(text)) next.venue = 'sítio';
  else if (/restaurante/.test(text)) next.venue = 'restaurante';
  else if (/clube/.test(text)) next.venue = 'clube';

  const places = [
    ['boa viagem', 'Boa Viagem'],
    ['olinda', 'Olinda'],
    ['casa forte', 'Casa Forte'],
    ['recife', 'Recife'],
    ['pina', 'Pina'],
    ['jaboatao', 'Jaboatão']
  ] as const;
  for (const [needle, label] of places) {
    if (text.includes(needle)) {
      next.location = label;
      break;
    }
  }

  const styles = [
    ['colorid', 'colorido'],
    ['classic', 'clássico'],
    ['intimist', 'intimista'],
    ['luxo', 'luxo'],
    ['descontra', 'descontraído'],
    ['tematic', 'temático'],
    ['hollywood', 'hollywood'],
    ['minimal', 'minimalista'],
    ['rustic', 'rústico'],
    ['elegante', 'elegante']
  ] as const;
  for (const [needle, label] of styles) {
    if (text.includes(needle)) {
      next.style = label;
      break;
    }
  }

  const prefMap = [
    ['buffet', 'buffet'],
    ['dj', 'dj'],
    ['banda', 'banda'],
    ['decor', 'decoração'],
    ['balao', 'decoração'],
    ['foto', 'foto'],
    ['film', 'filmagem'],
    ['barman', 'bar'],
    ['drink', 'bar'],
    ['doce', 'doces'],
    ['salgad', 'salgados']
  ] as const;
  const prefs = new Set(next.preferences || []);
  for (const [needle, label] of prefMap) {
    if (text.includes(needle)) prefs.add(label);
  }
  next.preferences = Array.from(prefs);
  return next;
}

function acknowledge(before: PartyContext, after: PartyContext) {
  const bits: string[] = [];
  if (!before.eventType && after.eventType) bits.push(after.eventType);
  if (!before.audienceSize && after.audienceSize) bits.push(`${after.audienceSize} pessoas`);
  if (!before.budget && after.budget) bits.push(`teto de ${formatBRL(after.budget)}`);
  if (!before.date && after.date) bits.push(after.date);
  if (!before.time && after.time) bits.push(after.time);
  if (!before.venue && after.venue) bits.push(after.venue);
  if (!before.location && after.location) bits.push(after.location);
  if (!before.style && after.style) bits.push(`estilo ${after.style}`);
  if (!bits.length) return '';
  return `Anotei ${bits.join(', ')}. `;
}

function readyToRecommend(context: PartyContext, message: string, turns: number) {
  const text = normalizeText(message);
  const forced = /recomen|monta|pode suger|ja pode|fecha o plano|sugere/.test(text);
  const core = Boolean(context.eventType && context.audienceSize && context.budget);
  if (forced && (context.eventType || context.audienceSize)) return true;
  if (!core) return false;
  const missing = missingFields(context);
  const optionalLeft = missing.filter((key) =>
    ['date', 'venue', 'location', 'ageRange', 'audienceType', 'style', 'time'].includes(key)
  );
  if (turns >= 2 && optionalLeft.length <= 4) return true;
  if (context.venue && context.date) return true;
  return turns >= 3;
}

export function runDemoTurn(
  latestMessage: string,
  base: PartyContext,
  userTurns: number
): AssistantTurn {
  const context = extractContext(latestMessage, base);
  const missing = missingFields(context);
  const intro = acknowledge(base, context);

  if (!readyToRecommend(context, latestMessage, userTurns)) {
    const next = missing[0];
    const question = next ? QUESTIONS[next] : 'Me conta mais um detalhe da festa.';
    return {
      source: 'demo',
      message: `${intro}${question}`,
      context,
      recommendations: [],
      estimatedTotal: 0,
      missing
    };
  }

  const planContext: PartyContext = { ...context };
  const assumptions: string[] = [];
  if (!planContext.audienceSize) {
    planContext.audienceSize = 40;
    assumptions.push('assumi 40 pessoas');
  }
  if (!planContext.budget) {
    planContext.budget = 8000;
    assumptions.push('usei um teto ilustrativo de R$ 8.000');
  }
  const recommendations = recommendFromCatalog(planContext);
  const estimatedTotal = roundMoney(
    recommendations.reduce((sum, item) => sum + item.lineTotal, 0)
  );
  const budget = planContext.budget || 0;
  const relation =
    estimatedTotal <= budget
      ? `dentro do orçamento de ${formatBRL(budget)}`
      : `${formatBRL(estimatedTotal - budget)} acima do orçamento de ${formatBRL(budget)}`;
  const assumptionText = assumptions.length
    ? ` ${assumptions[0].charAt(0).toUpperCase()}${assumptions.join(' e ').slice(1)}.`
    : '';

  return {
    source: 'demo',
    message: `${intro}Separei um conjunto do catálogo para ${planContext.eventType || 'essa festa'}. O estimado fica em ${formatBRL(estimatedTotal)}, ${relation}.${assumptionText}`,
    context,
    recommendations,
    estimatedTotal,
    missing
  };
}
