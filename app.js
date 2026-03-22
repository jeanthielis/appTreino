const { createApp } = Vue;

// ── CONSTANTES ─────────────────────────────────────────────────────────────
const ALL_WEEK_DAYS = [
  { code: 'DOM', label: 'Dom', full: 'Domingo',   jsDay: 0 },
  { code: 'SEG', label: 'Seg', full: 'Segunda',   jsDay: 1 },
  { code: 'TER', label: 'Ter', full: 'Terça',     jsDay: 2 },
  { code: 'QUA', label: 'Qua', full: 'Quarta',    jsDay: 3 },
  { code: 'QUI', label: 'Qui', full: 'Quinta',    jsDay: 4 },
  { code: 'SEX', label: 'Sex', full: 'Sexta',     jsDay: 5 },
  { code: 'SAB', label: 'Sáb', full: 'Sábado',   jsDay: 6 },
];

const goalLabels = {
  hipertrofia:     { label: 'Hipertrofia',     icon: 'ph-barbell',   color: '#FF4D4D' },
  emagrecimento:   { label: 'Emagrecimento',   icon: 'ph-fire',      color: '#FF6B35' },
  condicionamento: { label: 'Condicionamento', icon: 'ph-heartbeat', color: '#00C9A7' },
};

// ── BIBLIOTECA DE TREINOS ──────────────────────────────────────────────────
const workoutLibrary = [
  {
    id: 'masc-hipertrofia', sex: 'masculino', goal: 'hipertrofia',
    name: 'Hipertrofia Masculino', minDays: 3,
    description: 'ABC Split clássico para máximo ganho de massa muscular.',
    badge: 'CLÁSSICO', badgeColor: '#FF4D4D',
    sessions: [
      { muscle: "PEITO + TRÍCEPS", icon: "<i class='ph-fill ph-fire'></i>", color: "#FF4D4D", cardio: "10min Aquecimento Esteira", exercises: [
        { id:"mh1", name:"Supino Reto com Barra",       sets:4, reps:"6–10",  rest:90, muscle:"Peitoral", tip:"Descida controlada em 3s. Puxe as escápulas antes de começar." },
        { id:"mh2", name:"Supino Inclinado Halteres",   sets:3, reps:"8–12",  rest:75, muscle:"Peitoral", tip:"Ângulo 30–45°. Maior ativação clavicular." },
        { id:"mh3", name:"Crossover Polia",             sets:3, reps:"12–15", rest:60, muscle:"Peitoral", tip:"Foque na contração final. Cruze as mãos." },
        { id:"mh4", name:"Tríceps Polia (Corda)",       sets:4, reps:"10–15", rest:60, muscle:"Tríceps",  tip:"Abra a corda na extensão total. Cotovelo fixo." },
        { id:"mh5", name:"Tríceps Francês Haltere",     sets:3, reps:"10–12", rest:60, muscle:"Tríceps",  tip:"Mantenha cotovelos fixos e próximos à cabeça." },
      ]},
      { muscle: "COSTAS + BÍCEPS", icon: "<i class='ph-fill ph-shield-chevron'></i>", color: "#4D8EFF", cardio: "10min Bike", exercises: [
        { id:"mh6",  name:"Barra Fixa (Pull-Up)",          sets:4, reps:"6–10",  rest:90, muscle:"Dorsal", tip:"Toque o peito na barra. Amplitude máxima." },
        { id:"mh7",  name:"Remada Curvada com Barra",      sets:4, reps:"8–10",  rest:90, muscle:"Dorsal", tip:"Puxe para o umbigo. Tronco a 45°." },
        { id:"mh8",  name:"Puxada Pronada",                sets:3, reps:"10–12", rest:75, muscle:"Dorsal", tip:"Peito para frente, cotovelos ao chão." },
        { id:"mh9",  name:"Rosca Direta com Barra",        sets:4, reps:"8–12",  rest:60, muscle:"Bíceps", tip:"Sem balanço. Supine o punho no topo." },
        { id:"mh10", name:"Rosca Martelo com Halteres",    sets:3, reps:"10–12", rest:60, muscle:"Bíceps", tip:"Pegada neutra. Foco no braquial." },
      ]},
      { muscle: "PERNAS + OMBROS", icon: "<i class='ph-fill ph-sneaker'></i>", color: "#FF9900", cardio: "15min HIIT", exercises: [
        { id:"mh11", name:"Agachamento Livre com Barra",   sets:5, reps:"6–10",  rest:120, muscle:"Quadríceps", tip:"Desça abaixo do paralelo. Joelhos alinhados." },
        { id:"mh12", name:"Leg Press 45°",                 sets:4, reps:"10–15", rest:90,  muscle:"Quadríceps", tip:"Calcanhares apoiados. Não trave os joelhos." },
        { id:"mh13", name:"Stiff Deadlift com Barra",      sets:4, reps:"8–12",  rest:90,  muscle:"Posterior",  tip:"Sinta o alongamento ao descer." },
        { id:"mh14", name:"Desenvolvimento Militar",        sets:4, reps:"8–12",  rest:75,  muscle:"Ombro",      tip:"Não arqueie a lombar. Core contraído." },
        { id:"mh15", name:"Elevação Lateral com Halteres", sets:3, reps:"15–20", rest:60,  muscle:"Ombro",      tip:"Cotovelos levemente fletidos. Pesos leves." },
      ]},
    ]
  },
  {
    id: 'masc-emagrecimento', sex: 'masculino', goal: 'emagrecimento',
    name: 'Emagrecimento Masculino', minDays: 3,
    description: 'Full Body com cardio intenso para máxima queima calórica.',
    badge: 'QUEIMA', badgeColor: '#FF6B35',
    sessions: [
      { muscle: "FULL BODY A", icon: "<i class='ph-fill ph-fire'></i>", color: "#FF6B35", cardio: "20min Esteira moderada", exercises: [
        { id:"me1", name:"Agachamento com Halteres", sets:4, reps:"15–20", rest:45, muscle:"Quadríceps", tip:"Mantenha o ritmo. Descanse o mínimo." },
        { id:"me2", name:"Supino com Halteres",      sets:3, reps:"12–15", rest:45, muscle:"Peitoral",   tip:"Movimentos controlados e contínuos." },
        { id:"me3", name:"Remada na Máquina",        sets:3, reps:"12–15", rest:45, muscle:"Dorsal",     tip:"Contraia as costas. Amplitude completa." },
        { id:"me4", name:"Cadeira Flexora",          sets:3, reps:"15–20", rest:45, muscle:"Posterior",  tip:"Pausa de 1s na contração máxima." },
        { id:"me5", name:"Abdominal Supra",          sets:3, reps:"20–25", rest:30, muscle:"Core",       tip:"Mãos atrás da orelha, olhar para cima." },
      ]},
      { muscle: "CARDIO + CORE", icon: "<i class='ph-fill ph-person-simple-run'></i>", color: "#FF6B35", cardio: "30min HIIT Bicicleta", exercises: [
        { id:"me6", name:"Burpees",            sets:5, reps:"10",  rest:60, muscle:"Full Body", tip:"Explosão máxima no salto. Mantenha a forma." },
        { id:"me7", name:"Prancha Isométrica", sets:4, reps:"45s", rest:45, muscle:"Core",      tip:"Corpo em linha reta. Respire normalmente." },
        { id:"me8", name:"Mountain Climber",   sets:4, reps:"30s", rest:30, muscle:"Core",      tip:"Movimentos rápidos e alternados." },
        { id:"me9", name:"Jump Squat",         sets:4, reps:"12",  rest:60, muscle:"Pernas",    tip:"Aterrisagem suave, joelhos semifletidos." },
      ]},
      { muscle: "FULL BODY B", icon: "<i class='ph-fill ph-lightning'></i>", color: "#FF6B35", cardio: "20min Elíptico", exercises: [
        { id:"me10", name:"Levantamento Terra (leve)", sets:4, reps:"12–15", rest:60, muscle:"Posterior", tip:"Técnica antes do peso. Barra perto das pernas." },
        { id:"me11", name:"Supino Inclinado Halteres", sets:3, reps:"12–15", rest:45, muscle:"Peitoral",  tip:"Controle a descida." },
        { id:"me12", name:"Desenvolvimento Halteres",  sets:3, reps:"12–15", rest:45, muscle:"Ombro",     tip:"Sem arqueamento lombar." },
        { id:"me13", name:"Rosca Alternada",           sets:3, reps:"12–15", rest:45, muscle:"Bíceps",    tip:"Supinação completa no topo." },
        { id:"me14", name:"Tríceps Polia (Barra)",     sets:3, reps:"15–20", rest:45, muscle:"Tríceps",   tip:"Cotovelo fixo ao lado do corpo." },
      ]},
    ]
  },
  {
    id: 'masc-condicionamento', sex: 'masculino', goal: 'condicionamento',
    name: 'Condicionamento Masculino', minDays: 3,
    description: 'Treino funcional e aeróbico para performance esportiva.',
    badge: 'ESPORTE', badgeColor: '#00C9A7',
    sessions: [
      { muscle: "FUNCIONAL UPPER", icon: "<i class='ph-fill ph-person-simple-throw'></i>", color: "#00C9A7", cardio: "25min Corrida Contínua", exercises: [
        { id:"mc1", name:"Flexão de Braço",       sets:4, reps:"15–20", rest:60, muscle:"Peitoral", tip:"Varie a posição das mãos a cada série." },
        { id:"mc2", name:"Barra Fixa (Máximo)",   sets:4, reps:"máx",   rest:60, muscle:"Dorsal",   tip:"Amplitude total. Braços estendem ao descer." },
        { id:"mc3", name:"Arnold Press",          sets:3, reps:"12–15", rest:60, muscle:"Ombro",    tip:"Rotação completa do punho." },
        { id:"mc4", name:"Mergulho Paralelas",    sets:3, reps:"10–15", rest:60, muscle:"Tríceps",  tip:"Corpo reto para foco em tríceps." },
        { id:"mc5", name:"Rosca Martelo",         sets:3, reps:"12–15", rest:45, muscle:"Bíceps",   tip:"Pegada neutra. Movimento controlado." },
      ]},
      { muscle: "FUNCIONAL LOWER", icon: "<i class='ph-fill ph-sneaker'></i>", color: "#00C9A7", cardio: "20min Bike HIIT", exercises: [
        { id:"mc6", name:"Agachamento Sumô",      sets:4, reps:"15",       rest:60, muscle:"Adutores",   tip:"Pés bem abertos, pontas para fora." },
        { id:"mc7", name:"Avanço Caminhando",     sets:3, reps:"12 cada",  rest:60, muscle:"Glúteos",    tip:"Joelho traseiro quase toca o chão." },
        { id:"mc8", name:"Step Up na Caixa",      sets:3, reps:"12 cada",  rest:60, muscle:"Quadríceps", tip:"Pressione pelo calcanhar ao subir." },
        { id:"mc9", name:"Elevação de Panturrilha",sets:4, reps:"20–25",  rest:45, muscle:"Panturrilha", tip:"Pausa de 1s no topo. Desça lento." },
      ]},
      { muscle: "CIRCUITO TOTAL", icon: "<i class='ph-fill ph-circles-three'></i>", color: "#00C9A7", cardio: "15min Pular Corda", exercises: [
        { id:"mc10", name:"Kettlebell Swing",  sets:5, reps:"15",      rest:60, muscle:"Posterior", tip:"Explosão de quadril. Não force a lombar." },
        { id:"mc11", name:"Box Jump",          sets:4, reps:"8–10",   rest:60, muscle:"Pernas",    tip:"Aterrisagem suave amortecendo os joelhos." },
        { id:"mc12", name:"Remada Invertida",  sets:4, reps:"12–15",  rest:45, muscle:"Dorsal",    tip:"Corpo rígido como prancha." },
        { id:"mc13", name:"Sprint 30m",        sets:6, reps:"1 tiro", rest:90, muscle:"Full Body", tip:"Velocidade máxima em cada tiro." },
      ]},
    ]
  },
  {
    id: 'fem-hipertrofia', sex: 'feminino', goal: 'hipertrofia',
    name: 'Hipertrofia Feminino', minDays: 3,
    description: 'Foco em glúteos, pernas e definição muscular feminina.',
    badge: 'SHAPE', badgeColor: '#FF69B4',
    sessions: [
      { muscle: "GLÚTEOS + POSTERIOR", icon: "<i class='ph-fill ph-fire'></i>", color: "#FF69B4", cardio: "10min Elíptico Aquecimento", exercises: [
        { id:"fh1", name:"Agachamento Livre",        sets:4, reps:"10–15", rest:75, muscle:"Glúteos",   tip:"Desça abaixo do paralelo para maior ativação." },
        { id:"fh2", name:"Hip Thrust com Barra",     sets:4, reps:"12–15", rest:75, muscle:"Glúteos",   tip:"Extensão máxima de quadril no topo." },
        { id:"fh3", name:"Stiff com Halteres",       sets:4, reps:"12–15", rest:75, muscle:"Posterior", tip:"Sinta o alongamento dos ísquios ao descer." },
        { id:"fh4", name:"Abdução na Máquina",       sets:3, reps:"15–20", rest:60, muscle:"Glúteos",   tip:"Não balance o tronco. Isolamento total." },
        { id:"fh5", name:"Cadeira Flexora",          sets:3, reps:"15–20", rest:60, muscle:"Posterior", tip:"Pausa de 2s na contração. Desça lento." },
      ]},
      { muscle: "PEITO + COSTAS + OMBRO", icon: "<i class='ph-fill ph-shield-chevron'></i>", color: "#C77DFF", cardio: "15min Elíptico Leve", exercises: [
        { id:"fh6", name:"Supino Inclinado Halteres",   sets:3, reps:"12–15", rest:60, muscle:"Peitoral", tip:"Amplitude máxima. Pesos moderados." },
        { id:"fh7", name:"Puxada Aberta",               sets:4, reps:"10–12", rest:75, muscle:"Dorsal",   tip:"Peito para frente, cotovelos para baixo." },
        { id:"fh8", name:"Remada Baixa na Polia",       sets:3, reps:"12–15", rest:60, muscle:"Dorsal",   tip:"Puxe até o umbigo. Contraia as escápulas." },
        { id:"fh9", name:"Elevação Lateral Halteres",   sets:3, reps:"15–20", rest:45, muscle:"Ombro",    tip:"Pesos leves. Cotovelos levemente fletidos." },
      ]},
      { muscle: "PERNAS COMPLETO", icon: "<i class='ph-fill ph-sneaker'></i>", color: "#FF69B4", cardio: "20min HIIT", exercises: [
        { id:"fh10", name:"Leg Press 45°",          sets:4, reps:"15–20", rest:75, muscle:"Quadríceps", tip:"Pés altos e abertos para mais glúteo." },
        { id:"fh11", name:"Avanço com Halteres",    sets:3, reps:"12 cada", rest:60, muscle:"Glúteos",  tip:"Passadas longas para maior ativação." },
        { id:"fh12", name:"Cadeira Extensora",      sets:3, reps:"15–20", rest:60, muscle:"Quadríceps", tip:"Pausa de 2s no topo. Desça controlado." },
        { id:"fh13", name:"Elevação de Panturrilha",sets:4, reps:"20–25", rest:45, muscle:"Panturrilha", tip:"Pausa no topo e descida lenta 3s." },
      ]},
    ]
  },
  {
    id: 'fem-emagrecimento', sex: 'feminino', goal: 'emagrecimento',
    name: 'Emagrecimento Feminino', minDays: 3,
    description: 'Circuito dinâmico para queimar gordura e tonificar o corpo.',
    badge: 'TONIFICA', badgeColor: '#FF8C42',
    sessions: [
      { muscle: "INFERIOR + CARDIO", icon: "<i class='ph-fill ph-fire'></i>", color: "#FF8C42", cardio: "25min Caminhada/Corrida", exercises: [
        { id:"fe1", name:"Agachamento Sumô",   sets:4, reps:"15–20", rest:45, muscle:"Adutores", tip:"Pés bem abertos. Ritmo constante." },
        { id:"fe2", name:"Hip Thrust no Banco",sets:4, reps:"15–20", rest:45, muscle:"Glúteos",  tip:"Elevação máxima de quadril." },
        { id:"fe3", name:"Afundo Estático",    sets:3, reps:"15 cada",rest:45, muscle:"Glúteos", tip:"Joelho traseiro quase toca o chão." },
        { id:"fe4", name:"Abdominal Bicicleta",sets:3, reps:"20 cada",rest:30, muscle:"Core",    tip:"Rotação completa do tronco." },
        { id:"fe5", name:"Prancha Lateral",    sets:3, reps:"30s cada",rest:30, muscle:"Core",   tip:"Quadril levantado. Corpo em linha reta." },
      ]},
      { muscle: "CIRCUITO TOTAL", icon: "<i class='ph-fill ph-person-simple-run'></i>", color: "#FF8C42", cardio: "20min HIIT Funcional", exercises: [
        { id:"fe6", name:"Jumping Jacks",              sets:4, reps:"30s",   rest:30, muscle:"Full Body",  tip:"Ritmo acelerado. Braços ativos." },
        { id:"fe7", name:"Agachamento com Salto",      sets:4, reps:"10–12", rest:60, muscle:"Quadríceps", tip:"Aterrisagem suave e controlada." },
        { id:"fe8", name:"Flexão de Joelhos no Chão",  sets:3, reps:"12–15", rest:45, muscle:"Peitoral",   tip:"Amplitude total. Peito quase toca o chão." },
        { id:"fe9", name:"Mountain Climber",           sets:4, reps:"30s",   rest:30, muscle:"Core",       tip:"Joelhos alternados perto do peito." },
      ]},
      { muscle: "SUPERIOR + CORE", icon: "<i class='ph-fill ph-lightning'></i>", color: "#FF8C42", cardio: "20min Bicicleta/Elíptico", exercises: [
        { id:"fe10", name:"Remada com Halteres",      sets:3, reps:"15",    rest:45, muscle:"Dorsal",  tip:"Cotovelos para trás. Contraia as costas." },
        { id:"fe11", name:"Desenvolvimento Halteres", sets:3, reps:"15",    rest:45, muscle:"Ombro",   tip:"Leve e controlado. Não arqueie." },
        { id:"fe12", name:"Rosca Alternada",          sets:3, reps:"15",    rest:45, muscle:"Bíceps",  tip:"Supinação total. Sem balanço." },
        { id:"fe13", name:"Abdominal Supra",          sets:3, reps:"20–25", rest:30, muscle:"Core",    tip:"Expirar na contração." },
        { id:"fe14", name:"Prancha Isométrica",       sets:3, reps:"45s",   rest:45, muscle:"Core",    tip:"Contraia o abdômen. Não deixe o quadril cair." },
      ]},
    ]
  },
  {
    id: 'fem-condicionamento', sex: 'feminino', goal: 'condicionamento',
    name: 'Condicionamento Feminino', minDays: 3,
    description: 'Treino aeróbico e funcional para resistência e saúde.',
    badge: 'VITALIDADE', badgeColor: '#00B4D8',
    sessions: [
      { muscle: "FORÇA + CARDIO LOWER", icon: "<i class='ph-fill ph-heartbeat'></i>", color: "#00B4D8", cardio: "30min Corrida Leve", exercises: [
        { id:"fc1", name:"Agachamento com Halteres",      sets:3, reps:"15",    rest:60, muscle:"Quadríceps", tip:"Controle o movimento em toda amplitude." },
        { id:"fc2", name:"Elevação de Quadril no Chão",   sets:4, reps:"20",    rest:45, muscle:"Glúteos",    tip:"Contraia o glúteo no topo por 1s." },
        { id:"fc3", name:"Afundo com Passada",            sets:3, reps:"12 cada",rest:60, muscle:"Glúteos",   tip:"Tronco ereto e core ativado." },
        { id:"fc4", name:"Abdução Deitada com Elástico",  sets:3, reps:"20",    rest:45, muscle:"Glúteos",    tip:"Elástico no joelho para resistência." },
      ]},
      { muscle: "CORE + MOBILIDADE", icon: "<i class='ph-fill ph-leaf'></i>", color: "#00B4D8", cardio: "20min Caminhada Ativa", exercises: [
        { id:"fc5", name:"Prancha Isométrica", sets:4, reps:"30–45s", rest:45, muscle:"Core",   tip:"Respire profundo. Não prenda." },
        { id:"fc6", name:"Superman",           sets:3, reps:"15",     rest:45, muscle:"Lombar", tip:"Eleve braços e pernas. Pausa no topo." },
        { id:"fc7", name:"Bird Dog",           sets:3, reps:"10 cada",rest:45, muscle:"Core",   tip:"Sem rotação de quadril." },
        { id:"fc8", name:"Dead Bug",           sets:3, reps:"8 cada", rest:45, muscle:"Core",   tip:"Lombar colada no chão o tempo todo." },
      ]},
      { muscle: "FUNCIONAL TOTAL", icon: "<i class='ph-fill ph-circles-three'></i>", color: "#00B4D8", cardio: "25min HIIT Moderado", exercises: [
        { id:"fc9",  name:"Kettlebell Swing Leve",           sets:4, reps:"15",    rest:60, muscle:"Posterior", tip:"Explosão de quadril. Não force as costas." },
        { id:"fc10", name:"Agachamento + Elevação Lateral",  sets:3, reps:"12",    rest:60, muscle:"Full Body",  tip:"Combine os movimentos de forma fluída." },
        { id:"fc11", name:"Remada com Elástico",             sets:3, reps:"15",    rest:45, muscle:"Dorsal",     tip:"Cotovelos para trás e para baixo." },
        { id:"fc12", name:"Flexão Inclinada no Banco",       sets:3, reps:"12–15", rest:45, muscle:"Peitoral",   tip:"Ângulo facilita. Amplitude total." },
      ]},
    ]
  },
];

const dbAlternatives = [
  { muscle:"Peitoral",    name:"Supino Halteres",           tip:"Maior amplitude de movimento." },
  { muscle:"Peitoral",    name:"Máquina Supino",            tip:"Foco total na contração." },
  { muscle:"Peitoral",    name:"Flexão de Braço",           tip:"Sem equipamento, eficaz." },
  { muscle:"Dorsal",      name:"Remada Máquina",            tip:"Isola sem sobrecarregar lombar." },
  { muscle:"Dorsal",      name:"Puxada Supinada",           tip:"Maior ativação do bíceps." },
  { muscle:"Quadríceps",  name:"Leg Press 45°",             tip:"Calcanhares bem apoiados." },
  { muscle:"Quadríceps",  name:"Hack Squat",                tip:"Ótima para isolar quadríceps." },
  { muscle:"Glúteos",     name:"Hip Thrust na Máquina",     tip:"Carga mais estável." },
  { muscle:"Glúteos",     name:"Avanço no Smith",           tip:"Maior controle do movimento." },
  { muscle:"Posterior",   name:"Cadeira Flexora",           tip:"Isolamento total dos ísquios." },
  { muscle:"Posterior",   name:"Mesa Flexora",              tip:"Amplitude maior que a cadeira." },
  { muscle:"Tríceps",     name:"Tríceps Testa",             tip:"Ótimo para a porção longa." },
  { muscle:"Tríceps",     name:"Mergulho no Banco",         tip:"Sem equipamento." },
  { muscle:"Bíceps",      name:"Rosca Scott",               tip:"Elimina o balanço." },
  { muscle:"Bíceps",      name:"Rosca Concentrada",         tip:"Máxima contração no pico." },
  { muscle:"Ombro",       name:"Elevação Frontal",          tip:"Foco no feixe anterior." },
  { muscle:"Ombro",       name:"Face Pull",                 tip:"Feixes posteriores." },
  { muscle:"Core",        name:"Prancha com Movimento",     tip:"Maior ativação dinâmica." },
  { muscle:"Core",        name:"Roda Abdominal",            tip:"Excelente para reto abdominal." },
  { muscle:"Lombar",      name:"Hiperextensão Romano",      tip:"Fortalece lombar com segurança." },
  { muscle:"Adutores",    name:"Adução na Máquina",         tip:"Isolamento completo." },
  { muscle:"Panturrilha", name:"Panturrilha no Leg Press",  tip:"Amplitude total." },
  { muscle:"Full Body",   name:"Agachamento + Press",       tip:"Combina membros inf. e sup." },
];

// ── APP ────────────────────────────────────────────────────────────────────
createApp({
  data() {
    return {
      // Firebase
      fbConfig: {
        apiKey: "AIzaSyDUd9SldMEiWiPshIeE5JWe4yD-KBudpms",
        authDomain: "treinamentopro-eb804.firebaseapp.com",
        projectId: "treinamentopro-eb804",
        storageBucket: "treinamentopro-eb804.firebasestorage.app",
        messagingSenderId: "403175162467",
        appId: "1:403175162467:web:6e6ef18838cfd2d80e6e56"
      },
      db: null, auth: null, authUser: null,
      authMode: 'login', authLoading: false, authError: '',
      authForm: { name: '', email: '', password: '' },

      // Onboarding
      onboardStep: 1,
      onboard: {
        weight: '', height: '', age: '',
        sex: 'masculino', goal: 'hipertrofia',
        trainingDays: ['SEG', 'QUA', 'SEX'],
        selectedPlanId: '',
      },

      // App state
      view: 'home',
      selectedDay: 0,
      expandedEx: null,

      // User data (loaded from Firestore)
      userData: {
        weight: 0, height: 0, age: 0,
        sex: '', goal: '', trainingDays: [],
        activePlanId: '', plan: [],
        hydration: 0, lastHydrationDate: '',
        setupDone: false,
      },

      exLogs: [],
      completedWorkouts: {},
      newWeight: '',
      chartInstance: null,

      // Biblioteca
      libFilter: { sex: '', goal: '' },
      applyingPlanId: null,
      showApplyConfirm: false,
      planToApply: null,

      // Config edit state
      configSaving: false,
      configEdit: null,

      // Swap modal
      showSwapModal: false,
      swapExIndex: null,

      // Timer
      timer: { show: false, running: false, seconds: 0, total: 90, name: '', interval: null },

      // IA Generator (motor local — sem API)
      aiForm: {
        level: 'intermediario',
        equipment: 'academia',
        split: 'auto',
        focus: [],
        restrictions: [],
        style: 'tradicional',
        intensity: 'moderada',
      },
      aiGenerating: false,
      aiError: '',
      aiGeneratedPlan: null,
      aiSaving: false,

      // Util
      allWeekDays: ALL_WEEK_DAYS,
      workoutLibrary,
    };
  },

  computed: {
    userName()  { return this.authUser?.displayName || 'Atleta'; },
    needsSetup(){ return this.authUser && !this.userData.setupDone; },

    // Dias mapeados: cada sessão do plano recebe o dia da semana escolhido pelo usuário
    mappedDays() {
      const sessions = this.userData.plan || [];
      const chosen   = this.userData.trainingDays || [];
      return sessions.map((session, i) => ({
        ...session,
        day: chosen[i] || `D${i+1}`,
        dayFull: (ALL_WEEK_DAYS.find(d => d.code === chosen[i]) || {}).full || chosen[i] || `Dia ${i+1}`,
      }));
    },

    // Índice do treino de hoje
    currentDayIndex() {
      const todayCode = ALL_WEEK_DAYS[new Date().getDay()].code;
      const idx = (this.userData.trainingDays || []).indexOf(todayCode);
      return idx >= 0 ? idx : 0;
    },

    todayPlan() { return this.mappedDays[this.currentDayIndex] || this.mappedDays[0] || {}; },
    isTodayTrainingDay() {
      const todayCode = ALL_WEEK_DAYS[new Date().getDay()].code;
      return (this.userData.trainingDays || []).includes(todayCode);
    },

    currentPlan() { return this.mappedDays[this.selectedDay] || {}; },

    imc() {
      if (!this.userData.weight || !this.userData.height) return '—';
      const m = this.userData.height / 100;
      return (this.userData.weight / (m * m)).toFixed(1);
    },
    hydrationPercent() { return Math.min(100, ((this.userData.hydration || 0) / 3500) * 100); },
    timerDashoffset()  { return (1 - (this.timer.seconds / this.timer.total)) * 628; },

    alternativesList() {
      if (this.swapExIndex === null || !this.currentPlan.exercises) return [];
      const cur = this.currentPlan.exercises[this.swapExIndex];
      return dbAlternatives.filter(a => a.muscle === cur.muscle && a.name !== cur.name);
    },
    swapMuscleGroup() {
      if (this.swapExIndex === null || !this.currentPlan.exercises) return '';
      return this.currentPlan.exercises[this.swapExIndex].muscle;
    },

    filteredLibrary() {
      return workoutLibrary.filter(p =>
        (!this.libFilter.sex  || p.sex  === this.libFilter.sex) &&
        (!this.libFilter.goal || p.goal === this.libFilter.goal)
      );
    },

    // Planos compatíveis com os dias escolhidos no onboarding
    compatiblePlans() {
      const days = this.onboard.trainingDays.length;
      return workoutLibrary.filter(p =>
        p.sex  === this.onboard.sex  &&
        p.goal === this.onboard.goal &&
        p.sessions.length <= days
      );
    },

    activePlanId() { return this.userData.activePlanId || ''; },
    userGoalInfo()  { return goalLabels[this.userData.goal] || null; },
    userSexIcon()   { return this.userData.sex === 'feminino' ? '♀' : '♂'; },

    // Onboarding: dias disponíveis para o próximo step (filtra por minDays do plano)
    onboardDaysCount() { return this.onboard.trainingDays.length; },

    // Config edit helpers
    configTrainingDays() { return this.configEdit ? this.configEdit.trainingDays : []; },
  },

  watch: {
    selectedDay() { this.expandedEx = null; this.initExLogs(); },
  },

  mounted() {
    this.initFirebase();
    this.requestNotificationPermission();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  },

  methods: {
    // ── FIREBASE ──
    initFirebase() {
      firebase.initializeApp(this.fbConfig);
      this.db   = firebase.firestore();
      this.auth = firebase.auth();
      this.auth.onAuthStateChanged(user => {
        this.authUser = user;
        if (user) this.loadUserData();
      });
    },

    async doAuth() {
      if (!this.authForm.email || !this.authForm.password) return this.authError = 'Preencha os dados.';
      if (this.authMode === 'register' && !this.authForm.name) return this.authError = 'Informe seu nome.';
      this.authLoading = true; this.authError = '';
      try {
        if (this.authMode === 'login') {
          await this.auth.signInWithEmailAndPassword(this.authForm.email, this.authForm.password);
        } else {
          const res = await this.auth.createUserWithEmailAndPassword(this.authForm.email, this.authForm.password);
          await res.user.updateProfile({ displayName: this.authForm.name });
          // Cria doc mínimo — setupDone false para forçar onboarding
          await this.db.collection('users').doc(res.user.uid).set({
            setupDone: false, hydration: 0, lastHydrationDate: new Date().toDateString(),
          });
        }
      } catch(e) { this.authError = 'Erro: ' + e.message; }
      this.authLoading = false;
    },

    signOut() { this.auth.signOut(); this.userData = { setupDone: false }; },

    async loadUserData() {
      const doc = await this.db.collection('users').doc(this.authUser.uid).get();
      if (doc.exists) {
        const data = doc.data();
        if (data.lastHydrationDate !== new Date().toDateString()) {
          data.hydration = 0;
          data.lastHydrationDate = new Date().toDateString();
          this.db.collection('users').doc(this.authUser.uid).update({ hydration: 0, lastHydrationDate: data.lastHydrationDate });
        }
        this.userData = { ...this.userData, ...data };
        if (data.sex)  this.libFilter.sex  = data.sex;
        if (data.goal) this.libFilter.goal = data.goal;
      }
      this.db.collection(`users/${this.authUser.uid}/workouts`).onSnapshot(snap => {
        const comp = {};
        snap.forEach(s => comp[s.id] = s.data());
        this.completedWorkouts = comp;
        this.initExLogs();
      });

    },

    // ── ONBOARDING ──
    onboardNext() {
      if (this.onboardStep === 4 && this.onboard.trainingDays.length === 0)
        return alert('Selecione pelo menos 1 dia de treino.');
      if (this.onboardStep === 5 && !this.onboard.selectedPlanId)
        return alert('Escolha um plano de treino.');
      if (this.onboardStep < 5) { this.onboardStep++; return; }
      this.finishOnboarding();
    },
    onboardBack() { if (this.onboardStep > 1) this.onboardStep--; },

    toggleOnboardDay(code) {
      const idx = this.onboard.trainingDays.indexOf(code);
      if (idx >= 0) {
        if (this.onboard.trainingDays.length <= 1) return; // mínimo 1 dia
        this.onboard.trainingDays.splice(idx, 1);
      } else {
        // Insere mantendo a ordem da semana
        this.onboard.trainingDays.push(code);
        this.onboard.trainingDays.sort((a, b) =>
          ALL_WEEK_DAYS.findIndex(d => d.code === a) - ALL_WEEK_DAYS.findIndex(d => d.code === b)
        );
      }
      // Reseta plano selecionado se incompatível
      this.onboard.selectedPlanId = '';
    },

    selectOnboardPlan(planId) { this.onboard.selectedPlanId = planId; },

    async finishOnboarding() {
      const plan = workoutLibrary.find(p => p.id === this.onboard.selectedPlanId);
      if (!plan) return;
      const mappedPlan = plan.sessions.map((s, i) => ({ ...s, _sessionIdx: i }));
      const docData = {
        setupDone: true,
        weight:       parseFloat(this.onboard.weight) || 0,
        height:       parseFloat(this.onboard.height) || 0,
        age:          parseInt(this.onboard.age)      || 0,
        sex:          this.onboard.sex,
        goal:         this.onboard.goal,
        trainingDays: this.onboard.trainingDays,
        activePlanId: plan.id,
        plan:         mappedPlan,
        hydration:    0,
        lastHydrationDate: new Date().toDateString(),
      };
      await this.db.collection('users').doc(this.authUser.uid).set(docData, { merge: true });
      this.userData = { ...this.userData, ...docData };
      this.libFilter.sex  = docData.sex;
      this.libFilter.goal = docData.goal;
      this.initExLogs();
    },

    // ── CONFIGURAÇÕES ──
    openConfig() {
      this.configEdit = {
        weight:       this.userData.weight  || '',
        height:       this.userData.height  || '',
        age:          this.userData.age     || '',
        sex:          this.userData.sex     || 'masculino',
        goal:         this.userData.goal    || 'hipertrofia',
        trainingDays: [...(this.userData.trainingDays || [])],
      };
      this.view = 'config';
    },

    toggleConfigDay(code) {
      const idx = this.configEdit.trainingDays.indexOf(code);
      if (idx >= 0) {
        if (this.configEdit.trainingDays.length <= 1) return;
        this.configEdit.trainingDays.splice(idx, 1);
      } else {
        this.configEdit.trainingDays.push(code);
        this.configEdit.trainingDays.sort((a, b) =>
          ALL_WEEK_DAYS.findIndex(d => d.code === a) - ALL_WEEK_DAYS.findIndex(d => d.code === b)
        );
      }
    },

    async saveConfig() {
      this.configSaving = true;
      const upd = {
        weight:       parseFloat(this.configEdit.weight) || this.userData.weight,
        height:       parseFloat(this.configEdit.height) || this.userData.height,
        age:          parseInt(this.configEdit.age)      || this.userData.age,
        sex:          this.configEdit.sex,
        goal:         this.configEdit.goal,
        trainingDays: this.configEdit.trainingDays,
      };

      // Se sexo/objetivo/dias mudaram, verifica se precisa reatribuir plano
      const planChanged =
        upd.sex  !== this.userData.sex  ||
        upd.goal !== this.userData.goal ||
        JSON.stringify(upd.trainingDays) !== JSON.stringify(this.userData.trainingDays);

      if (planChanged) {
        // Busca melhor plano compatível
        const newPlan = workoutLibrary.find(p =>
          p.sex  === upd.sex  &&
          p.goal === upd.goal &&
          p.sessions.length <= upd.trainingDays.length
        );
        if (newPlan) {
          upd.activePlanId = newPlan.id;
          upd.plan = newPlan.sessions.map((s, i) => ({ ...s, _sessionIdx: i }));
        }
      }

      await this.db.collection('users').doc(this.authUser.uid).update(upd);
      this.userData = { ...this.userData, ...upd };
      this.libFilter.sex  = upd.sex;
      this.libFilter.goal = upd.goal;
      this.configSaving = false;
      this.view = 'home';
    },

    // ── BIBLIOTECA ──
    getRecommendedPlan(sex, goal) {
      return workoutLibrary.find(p => p.sex === sex && p.goal === goal) || workoutLibrary[0];
    },
    promptApplyPlan(plan) { this.planToApply = plan; this.showApplyConfirm = true; },
    async applyLibraryPlan() {
      const plan = this.planToApply;
      if (!plan) return;
      this.applyingPlanId = plan.id;
      this.showApplyConfirm = false;
      const mappedPlan = plan.sessions.map((s, i) => ({ ...s, _sessionIdx: i }));
      this.userData.plan = mappedPlan;
      this.userData.activePlanId = plan.id;
      this.selectedDay = 0;
      this.initExLogs();
      await this.db.collection('users').doc(this.authUser.uid).update({
        plan: mappedPlan, activePlanId: plan.id,
      });
      this.applyingPlanId = null;
      this.planToApply = null;
      this.view = 'treino';
    },
    isPlanActive(planId) { return this.activePlanId === planId; },
    getGoalInfo(goal)    { return goalLabels[goal] || { label: goal, color: '#888', icon: 'ph-star' }; },

    // ── HIDRATAÇÃO ──
    async addWater(ml) {
      this.userData.hydration = (this.userData.hydration || 0) + ml;
      await this.db.collection('users').doc(this.authUser.uid).update({ hydration: this.userData.hydration });
    },

    // ── PROGRESSIVE OVERLOAD ──
    initExLogs() {
      if (!this.currentPlan || !this.currentPlan.exercises) return;
      this.exLogs = this.currentPlan.exercises.map(ex => {
        const history = this.completedWorkouts[this.currentPlan.day + '_' + ex.id];
        return { kg: history?.kg || '', reps: history?.reps || '' };
      });
    },
    isDone(index) {
      if (!this.currentPlan.exercises) return false;
      const ex = this.currentPlan.exercises[index];
      const history = this.completedWorkouts[this.currentPlan.day + '_' + ex.id];
      return history && history.date === new Date().toDateString();
    },
    async toggleDone(index) {
      const ex    = this.currentPlan.exercises[index];
      const logId = this.currentPlan.day + '_' + ex.id;
      await this.db.collection(`users/${this.authUser.uid}/workouts`).doc(logId).set({
        kg: this.exLogs[index].kg, reps: this.exLogs[index].reps, date: new Date().toDateString(),
      });
      this.expandedEx = null;
    },

    // ── SUBSTITUIÇÃO ──
    openSwapModal(index) { this.swapExIndex = index; this.showSwapModal = true; },
    async confirmSwap(altEx) {
      const oldEx = this.currentPlan.exercises[this.swapExIndex];
      const nova  = { ...oldEx, name: altEx.name, tip: altEx.tip, id: 'alt_' + Date.now() };
      this.currentPlan.exercises[this.swapExIndex] = nova;
      this.showSwapModal = false;
      this.expandedEx = null;
      this.initExLogs();
      await this.db.collection('users').doc(this.authUser.uid).update({ plan: this.userData.plan });
    },

    // ── PESO / GRÁFICO ──
    async saveWeight() {
      if (!this.newWeight) return;
      this.userData.weight = parseFloat(this.newWeight);
      await this.db.collection('users').doc(this.authUser.uid).update({ weight: this.userData.weight });
      await this.db.collection(`users/${this.authUser.uid}/weightHistory`).add({
        weight: this.userData.weight, date: new Date().toISOString(),
      });
      this.newWeight = '';
      this.renderChart();
    },
    async renderChart() {
      const ctx = document.getElementById('weightChart');
      if (!ctx) return;
      if (this.chartInstance) this.chartInstance.destroy();
      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Hoje'],
          datasets: [{ label: 'Peso (kg)', data: [82, 81.5, 80.8, this.userData.weight],
            borderColor: '#FF5C00', backgroundColor: 'rgba(255,92,0,0.1)', fill: true, tension: 0.3 }],
        },
        options: { responsive: true, plugins: { legend: { display: false } },
          scales: { y: { grid: { color: '#333' } }, x: { grid: { color: '#333' } } }, color: '#fff' },
      });
    },

    // ── IA GENERATOR (motor local) ──

    toggleAiChip(arr, val) {
      const i = arr.indexOf(val);
      if (i >= 0) arr.splice(i, 1); else arr.push(val);
    },

    generateAiPlan() {
      this.aiGenerating = true;
      this.aiError = '';
      this.aiGeneratedPlan = null;

      // Simula delay de processamento para UX
      setTimeout(() => {
        try {
          const plan = this._buildLocalPlan();
          this.aiGeneratedPlan = plan;
        } catch(e) {
          this.aiError = e.message || 'Erro ao gerar plano.';
        }
        this.aiGenerating = false;
      }, 1800);
    },

    _buildLocalPlan() {
      const { level, equipment, style, intensity, focus, restrictions } = this.aiForm;
      const { sex, goal, trainingDays, weight, height, age } = this.userData;
      const days = trainingDays || ['SEG','QUA','SEX'];
      const nDays = days.length;

      // ── BASE DE EXERCÍCIOS ──────────────────────────────────────────────
      const DB = {
        // PEITORAL
        peitoral: {
          eq: {
            academia: [
              { n:'Supino Reto com Barra',       s:[3,4,5], r:{ini:'12–15',int:'8–12',av:'5–8'},    rest:{leve:90,mod:90,pesada:120}, tip:'Descida 3s. Escápulas retraídas e deprimidas antes de começar.' },
              { n:'Supino Inclinado Halteres',    s:[3,4],   r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:75,mod:75,pesada:90},  tip:'Ângulo 30–45°. Maior ativação clavicular. Controle a descida.' },
              { n:'Supino Declinado com Barra',   s:[3,4],   r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:75,mod:90,pesada:90},  tip:'Foco na porção esternal inferior. Ótimo para definição.' },
              { n:'Crossover na Polia',           s:[3,4],   r:{ini:'15–20',int:'12–15',av:'12–15'}, rest:{leve:60,mod:60,pesada:60},  tip:'Cruze as mãos na fase final para máxima contração.' },
              { n:'Fly com Halteres (plano)',     s:[3],     r:{ini:'15',int:'12–15',av:'12'},        rest:{leve:60,mod:60,pesada:60},  tip:'Leve flexão no cotovelo. Amplitude máxima.' },
              { n:'Peck Deck (Borboleta)',         s:[3],     r:{ini:'15–20',int:'12–15',av:'12–15'}, rest:{leve:60,mod:60,pesada:60},  tip:'Pausa de 1s na contração máxima.' },
              { n:'Supino com Halteres (plano)',  s:[3,4],   r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:75,mod:75,pesada:90},  tip:'Maior amplitude que a barra. Controle a descida.' },
            ],
            halteres: [
              { n:'Supino com Halteres (plano)',  s:[3,4],   r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:75,mod:75,pesada:90},  tip:'Amplitude máxima. Controle a descida.' },
              { n:'Supino Inclinado Halteres',    s:[3,4],   r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:75,mod:75,pesada:90},  tip:'Ângulo 30–45°. Ativação clavicular.' },
              { n:'Fly com Halteres',             s:[3],     r:{ini:'15',int:'12–15',av:'12'},        rest:{leve:60,mod:60,pesada:60},  tip:'Leve flexão no cotovelo. Amplitude máxima.' },
              { n:'Flexão de Braço',              s:[3,4],   r:{ini:'10–15',int:'15–20',av:'20+'},   rest:{leve:60,mod:60,pesada:60},  tip:'Core firme. Peito toca levemente o chão.' },
            ],
            elasticos: [
              { n:'Flexão de Braço',              s:[3,4],   r:{ini:'10–15',int:'15–20',av:'20+'},   rest:{leve:60,mod:60,pesada:60},  tip:'Core firme. Amplitude total.' },
              { n:'Crossover com Elástico',       s:[3],     r:{ini:'15–20',int:'15',av:'15'},        rest:{leve:45,mod:45,pesada:45},  tip:'Cruze na frente para contração máxima.' },
              { n:'Fly com Elástico',             s:[3],     r:{ini:'15–20',int:'15',av:'15'},        rest:{leve:45,mod:45,pesada:45},  tip:'Mimetize o fly com halteres.' },
            ],
            sem: [
              { n:'Flexão de Braço',              s:[4,5],   r:{ini:'10–15',int:'15–20',av:'20+'},   rest:{leve:60,mod:60,pesada:60},  tip:'Core firme. Peito toca o chão.' },
              { n:'Flexão Inclinada (banco)',     s:[3],     r:{ini:'12–15',int:'15',av:'15–20'},     rest:{leve:60,mod:60,pesada:60},  tip:'Mais fácil que a normal. Ótimo para iniciantes.' },
              { n:'Flexão Declinada (pés alto)', s:[3],     r:{ini:'8–12',int:'12–15',av:'15–20'},   rest:{leve:60,mod:60,pesada:60},  tip:'Foco na porção superior do peitoral.' },
              { n:'Flexão Diamante',              s:[3],     r:{ini:'8–12',int:'12–15',av:'15–20'},   rest:{leve:60,mod:60,pesada:60},  tip:'Mãos próximas. Maior ativação de tríceps e peitoral interno.' },
            ],
          },
          color: '#FF4D4D', icon: "<i class='ph-fill ph-fire'></i>", label: 'PEITORAL',
        },

        // DORSAL
        dorsal: {
          eq: {
            academia: [
              { n:'Puxada Aberta Pronada',       s:[4],   r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:75,mod:75,pesada:90},  tip:'Peito para frente. Cotovelos apontados para o chão.' },
              { n:'Remada Curvada com Barra',    s:[4],   r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:90,mod:90,pesada:120}, tip:'Tronco 45°. Puxe para o umbigo. Não balance.' },
              { n:'Remada Unilateral Haltere',   s:[3,4], r:{ini:'12–15',int:'10–12',av:'8–12'},  rest:{leve:60,mod:60,pesada:75},  tip:'Apoie o joelho no banco. Puxe cotovelo para trás e cima.' },
              { n:'Puxada Supinada',             s:[3,4], r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:75,mod:75,pesada:90},  tip:'Pegada supinada ativa mais bíceps.' },
              { n:'Remada Baixa (Polia)',        s:[3],   r:{ini:'15',int:'12–15',av:'12'},        rest:{leve:60,mod:60,pesada:75},  tip:'Puxe até o abdômen. Contraia escápulas ao final.' },
              { n:'Barra Fixa (Pull-Up)',        s:[3,4], r:{ini:'5–8',int:'8–12',av:'12+'},       rest:{leve:90,mod:90,pesada:90},  tip:'Amplitude total. Tente tocar o peito na barra.' },
            ],
            halteres: [
              { n:'Remada Unilateral Haltere',   s:[3,4], r:{ini:'12–15',int:'10–12',av:'8–12'},  rest:{leve:60,mod:60,pesada:75},  tip:'Apoie no banco. Puxe cotovelo alto.' },
              { n:'Remada Curvada Halteres',     s:[3,4], r:{ini:'12–15',int:'10–12',av:'8–12'},  rest:{leve:75,mod:75,pesada:90},  tip:'Tronco 45°. Puxe os dois halteres simultaneamente.' },
              { n:'Pullover com Haltere',        s:[3],   r:{ini:'12–15',int:'12',av:'10–12'},     rest:{leve:60,mod:60,pesada:60},  tip:'Amplitude máxima. Sinta o alongamento do dorsal.' },
            ],
            elasticos: [
              { n:'Remada com Elástico',         s:[3,4], r:{ini:'15–20',int:'15',av:'15'},        rest:{leve:45,mod:45,pesada:45},  tip:'Ancora o elástico. Puxe cotovelos para trás.' },
              { n:'Puxada com Elástico',         s:[3],   r:{ini:'15–20',int:'15',av:'15'},        rest:{leve:45,mod:45,pesada:45},  tip:'Ancora acima da cabeça. Puxe cotovelos para baixo.' },
            ],
            sem: [
              { n:'Remada Invertida (mesa)',     s:[3,4], r:{ini:'10–15',int:'12–15',av:'15–20'}, rest:{leve:60,mod:60,pesada:60},  tip:'Corpo rígido. Puxe o peito até a borda da mesa.' },
              { n:'Barra Fixa (Pull-Up)',        s:[3,4], r:{ini:'3–5',int:'6–10',av:'12+'},       rest:{leve:90,mod:90,pesada:90},  tip:'Se não conseguir, use elástico de assistência.' },
            ],
          },
          color: '#4D8EFF', icon: "<i class='ph-fill ph-shield-chevron'></i>", label: 'COSTAS',
        },

        // OMBRO
        ombro: {
          eq: {
            academia: [
              { n:'Desenvolvimento Militar (Barra)', s:[4],   r:{ini:'12–15',int:'10–12',av:'6–10'},  rest:{leve:75,mod:90,pesada:120}, tip:'Não arqueie a lombar. Core firme.' },
              { n:'Elevação Lateral Halteres',       s:[3,4], r:{ini:'15–20',int:'15',av:'12–15'},     rest:{leve:60,mod:60,pesada:60},  tip:'Peso leve. Cotovelo ligeiramente fletido. Controle a descida.' },
              { n:'Desenvolvimento Arnold',          s:[3],   r:{ini:'12–15',int:'10–12',av:'8–10'},   rest:{leve:75,mod:75,pesada:90},  tip:'Rotação completa do punho no movimento.' },
              { n:'Elevação Frontal Halteres',       s:[3],   r:{ini:'15',int:'12–15',av:'12'},         rest:{leve:60,mod:60,pesada:60},  tip:'Alternado ou simultâneo. Pausa no topo.' },
              { n:'Face Pull (Polia)',               s:[3],   r:{ini:'15–20',int:'15',av:'15'},         rest:{leve:60,mod:60,pesada:60},  tip:'Fundamental para saúde do manguito. Puxe até a orelha.' },
              { n:'Remada Alta com Barra',           s:[3],   r:{ini:'15',int:'12–15',av:'12'},         rest:{leve:60,mod:60,pesada:75},  tip:'Cotovelos acima dos ombros. Cuidado com amplitude excessiva.' },
            ],
            halteres: [
              { n:'Desenvolvimento com Halteres',    s:[3,4], r:{ini:'12–15',int:'10–12',av:'8–10'},   rest:{leve:75,mod:75,pesada:90},  tip:'Não arqueie a lombar. Sente firme.' },
              { n:'Elevação Lateral Halteres',       s:[3,4], r:{ini:'15–20',int:'15',av:'12–15'},     rest:{leve:60,mod:60,pesada:60},  tip:'Peso leve. Controle a descida lentamente.' },
              { n:'Desenvolvimento Arnold',          s:[3],   r:{ini:'12–15',int:'10–12',av:'8–10'},   rest:{leve:75,mod:75,pesada:90},  tip:'Rotação completa do punho.' },
              { n:'Elevação Frontal Halteres',       s:[3],   r:{ini:'15',int:'12–15',av:'12'},         rest:{leve:60,mod:60,pesada:60},  tip:'Pausa no topo por 1s.' },
            ],
            elasticos: [
              { n:'Press Aéreo com Elástico',        s:[3],   r:{ini:'15',int:'15',av:'15'},            rest:{leve:45,mod:45,pesada:45},  tip:'Ancora o elástico abaixo dos pés. Empurre acima da cabeça.' },
              { n:'Elevação Lateral com Elástico',   s:[3],   r:{ini:'15–20',int:'15',av:'15'},         rest:{leve:45,mod:45,pesada:45},  tip:'Movimento controlado. Pausa no topo.' },
            ],
            sem: [
              { n:'Pike Push-Up',                    s:[3,4], r:{ini:'8–12',int:'12–15',av:'15–20'},   rest:{leve:60,mod:60,pesada:60},  tip:'Quadril elevado. Testa vai ao chão. Foco nos ombros.' },
              { n:'Handstand Push-Up',               s:[3],   r:{ini:'3–5',int:'5–8',av:'8–12'},        rest:{leve:90,mod:90,pesada:90},  tip:'Avançado. Use parede para apoio.' },
            ],
          },
          color: '#FF9900', icon: "<i class='ph-fill ph-person-simple-throw'></i>", label: 'OMBROS',
        },

        // BÍCEPS
        biceps: {
          eq: {
            academia: [
              { n:'Rosca Direta com Barra',    s:[3,4], r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:60,mod:60,pesada:75},  tip:'Sem balanço. Supine o punho no topo.' },
              { n:'Rosca Alternada Halteres',  s:[3],   r:{ini:'12–15',int:'10–12',av:'10–12'}, rest:{leve:60,mod:60,pesada:60},  tip:'Supinação completa. Pause 1s no pico.' },
              { n:'Rosca Martelo Halteres',    s:[3],   r:{ini:'12–15',int:'10–12',av:'10–12'}, rest:{leve:60,mod:60,pesada:60},  tip:'Pegada neutra. Foco no braquial e braquiorradial.' },
              { n:'Rosca Scott (Máquina)',     s:[3],   r:{ini:'15',int:'12–15',av:'12'},        rest:{leve:60,mod:60,pesada:60},  tip:'Elimina o balanço completamente.' },
              { n:'Rosca Concentrada',         s:[3],   r:{ini:'15',int:'12–15',av:'12'},        rest:{leve:60,mod:60,pesada:60},  tip:'Máxima contração no pico. Cótovelo no joelho.' },
            ],
            halteres: [
              { n:'Rosca Alternada Halteres',  s:[3,4], r:{ini:'12–15',int:'10–12',av:'10–12'}, rest:{leve:60,mod:60,pesada:60},  tip:'Supinação total. Sem balanço.' },
              { n:'Rosca Martelo Halteres',    s:[3],   r:{ini:'12–15',int:'10–12',av:'10–12'}, rest:{leve:60,mod:60,pesada:60},  tip:'Pegada neutra. Braquial e braquiorradial.' },
              { n:'Rosca Concentrada',         s:[3],   r:{ini:'15',int:'12–15',av:'12'},        rest:{leve:60,mod:60,pesada:60},  tip:'Cotovelo no joelho. Isolamento total.' },
            ],
            elasticos: [
              { n:'Rosca com Elástico',        s:[3],   r:{ini:'15–20',int:'15',av:'15'},        rest:{leve:45,mod:45,pesada:45},  tip:'Ancora o elástico. Supine o punho no topo.' },
            ],
            sem: [
              { n:'Rosca Isométrica Invertida',s:[3],   r:{ini:'30s',int:'45s',av:'60s'},        rest:{leve:45,mod:45,pesada:45},  tip:'Segure o próprio braço e contraia contra resistência.' },
            ],
          },
          color: '#00B4D8', icon: "<i class='ph-fill ph-arm-flex'></i>", label: 'BÍCEPS',
        },

        // TRÍCEPS
        triceps: {
          eq: {
            academia: [
              { n:'Tríceps Polia (Corda)',     s:[3,4], r:{ini:'15–20',int:'12–15',av:'10–15'}, rest:{leve:60,mod:60,pesada:60},  tip:'Abra a corda na extensão total. Cotovelo fixo.' },
              { n:'Tríceps Polia (Barra)',     s:[3],   r:{ini:'15–20',int:'12–15',av:'10–12'}, rest:{leve:60,mod:60,pesada:60},  tip:'Cotovelo ao lado do corpo. Extensão completa.' },
              { n:'Tríceps Francês Haltere',  s:[3],   r:{ini:'15',int:'12–15',av:'10–12'},     rest:{leve:60,mod:60,pesada:75},  tip:'Cotovelos fixos. Desça atrás da cabeça.' },
              { n:'Tríceps Testa Barra',      s:[3],   r:{ini:'15',int:'12–15',av:'10–12'},     rest:{leve:60,mod:60,pesada:75},  tip:'Traz a barra até a testa. Cotovelos estáticos.' },
              { n:'Mergulho nas Paralelas',   s:[3],   r:{ini:'8–12',int:'12–15',av:'15–20'},   rest:{leve:75,mod:75,pesada:75},  tip:'Corpo reto para foco em tríceps.' },
            ],
            halteres: [
              { n:'Tríceps Francês Haltere',  s:[3,4], r:{ini:'15',int:'12–15',av:'10–12'},     rest:{leve:60,mod:60,pesada:75},  tip:'Cotovelos fixos próximos à cabeça.' },
              { n:'Tríceps Testa Halteres',   s:[3],   r:{ini:'15',int:'12–15',av:'10–12'},     rest:{leve:60,mod:60,pesada:75},  tip:'Cotovelos apontados para cima o tempo todo.' },
              { n:'Extensão Tríceps Inclinada',s:[3],  r:{ini:'15',int:'12–15',av:'10–12'},     rest:{leve:60,mod:60,pesada:60},  tip:'Apoiado no banco inclinado. Extensão completa.' },
            ],
            elasticos: [
              { n:'Tríceps com Elástico',     s:[3],   r:{ini:'15–20',int:'15',av:'15'},        rest:{leve:45,mod:45,pesada:45},  tip:'Ancora acima. Empurre para baixo com cotovelo fixo.' },
            ],
            sem: [
              { n:'Mergulho no Banco',        s:[3,4], r:{ini:'10–15',int:'15–20',av:'20+'},   rest:{leve:60,mod:60,pesada:60},  tip:'Mãos no banco atrás. Desça até cotovelo 90°.' },
              { n:'Flexão Diamante',          s:[3],   r:{ini:'8–12',int:'12–15',av:'15–20'},   rest:{leve:60,mod:60,pesada:60},  tip:'Mãos próximas formando diamante. Cotovelos fechados.' },
            ],
          },
          color: '#9B5FDE', icon: "<i class='ph-fill ph-lightning'></i>", label: 'TRÍCEPS',
        },

        // QUADRÍCEPS
        quad: {
          eq: {
            academia: [
              { n:'Agachamento Livre com Barra',    s:[4,5], r:{ini:'15',int:'10–12',av:'6–10'},    rest:{leve:90,mod:120,pesada:180}, tip:'Desça abaixo do paralelo. Joelhos alinhados com os pés.' },
              { n:'Leg Press 45°',                  s:[3,4], r:{ini:'15–20',int:'12–15',av:'10–12'}, rest:{leve:90,mod:90,pesada:120},  tip:'Não trave os joelhos. Calcanhares apoiados.' },
              { n:'Cadeira Extensora',              s:[3],   r:{ini:'15–20',int:'15',av:'12–15'},     rest:{leve:60,mod:60,pesada:75},   tip:'Pausa de 2s no topo. Desça lentamente.' },
              { n:'Hack Squat',                     s:[3,4], r:{ini:'15',int:'12',av:'10–12'},        rest:{leve:90,mod:90,pesada:120},  tip:'Amplitude máxima. Costas apoiadas.' },
              { n:'Afundo com Barra (Lunge)',       s:[3],   r:{ini:'12 cada',int:'10 cada',av:'10 cada'}, rest:{leve:75,mod:90,pesada:90},   tip:'Passada longa. Joelho traseiro quase toca o chão.' },
            ],
            halteres: [
              { n:'Agachamento com Halteres',       s:[3,4], r:{ini:'15–20',int:'12–15',av:'10–12'}, rest:{leve:75,mod:90,pesada:90},   tip:'Halteres nas laterais ou à frente. Desça até paralelo.' },
              { n:'Agachamento Sumô Haltere',       s:[3],   r:{ini:'15–20',int:'12–15',av:'12'},     rest:{leve:60,mod:75,pesada:75},   tip:'Pés largos, pontas para fora. Ativa adutores e glúteos.' },
              { n:'Afundo com Halteres',            s:[3],   r:{ini:'12 cada',int:'10 cada',av:'10 cada'}, rest:{leve:60,mod:75,pesada:75},   tip:'Passada longa. Controle o equilíbrio.' },
              { n:'Step Up com Halteres',           s:[3],   r:{ini:'12 cada',int:'10 cada',av:'10 cada'}, rest:{leve:60,mod:60,pesada:75},   tip:'Pressione pelo calcanhar ao subir.' },
            ],
            elasticos: [
              { n:'Agachamento com Elástico',       s:[3,4], r:{ini:'20',int:'15–20',av:'15–20'},     rest:{leve:45,mod:60,pesada:60},   tip:'Elástico na sola dos pés e nas mãos.' },
              { n:'Afundo com Elástico',            s:[3],   r:{ini:'15 cada',int:'12 cada',av:'12 cada'}, rest:{leve:45,mod:45,pesada:45},   tip:'Elástico fixo no calcanhar.' },
            ],
            sem: [
              { n:'Agachamento Livre',              s:[4,5], r:{ini:'20–25',int:'20',av:'20'},         rest:{leve:60,mod:60,pesada:60},   tip:'Cadência lenta (3s descida, 3s subida).' },
              { n:'Afundo Estático',                s:[3],   r:{ini:'15 cada',int:'15 cada',av:'15 cada'}, rest:{leve:60,mod:60,pesada:60},   tip:'Joelho traseiro quase toca o chão.' },
              { n:'Agachamento Búlgaro',            s:[3],   r:{ini:'8–10 cada',int:'10–12 cada',av:'12–15 cada'}, rest:{leve:75,mod:75,pesada:75}, tip:'Pé traseiro elevado. Maior amplitude e ativação.' },
              { n:'Wall Sit (Cadeira na Parede)',   s:[3],   r:{ini:'30s',int:'45s',av:'60s'},          rest:{leve:45,mod:45,pesada:45},   tip:'Coxa paralela ao chão. Isométrico.' },
            ],
          },
          color: '#FF9900', icon: "<i class='ph-fill ph-sneaker'></i>", label: 'QUADRÍCEPS',
        },

        // POSTERIOR / ISQUIOS
        posterior: {
          eq: {
            academia: [
              { n:'Stiff com Barra (RDL)',      s:[3,4], r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:90,mod:90,pesada:120}, tip:'Sinta o alongamento dos ísquios. Barra perto do corpo.' },
              { n:'Cadeira Flexora',            s:[3,4], r:{ini:'15–20',int:'12–15',av:'12–15'}, rest:{leve:60,mod:75,pesada:75},  tip:'Pausa de 2s na contração. Desça em 3s.' },
              { n:'Mesa Flexora',               s:[3],   r:{ini:'15–20',int:'12–15',av:'12–15'}, rest:{leve:60,mod:75,pesada:75},  tip:'Maior amplitude que a cadeira.' },
              { n:'Levantamento Terra',         s:[3,4], r:{ini:'12',int:'8–10',av:'5–8'},        rest:{leve:120,mod:150,pesada:180},tip:'Barra perto das pernas. Quadril para frente ao subir.' },
              { n:'Good Morning',               s:[3],   r:{ini:'15',int:'12–15',av:'12'},        rest:{leve:75,mod:75,pesada:90},  tip:'Flexão de quadril. Costas neutras.' },
            ],
            halteres: [
              { n:'Stiff com Halteres',         s:[3,4], r:{ini:'12–15',int:'10–12',av:'8–10'},  rest:{leve:75,mod:90,pesada:90},  tip:'Amplitude máxima. Sinta o alongamento.' },
              { n:'Levantamento Terra Halteres',s:[3],   r:{ini:'12',int:'10–12',av:'8–10'},      rest:{leve:90,mod:120,pesada:120},tip:'Mesmo padrão da barra. Bom para iniciantes.' },
            ],
            elasticos: [
              { n:'Leg Curl com Elástico',      s:[3],   r:{ini:'15–20',int:'15',av:'15'},        rest:{leve:45,mod:45,pesada:45},  tip:'Ancora o elástico. Flex de joelho deitado.' },
            ],
            sem: [
              { n:'Nordic Curl',                s:[3],   r:{ini:'3–5',int:'5–8',av:'8–10'},       rest:{leve:90,mod:90,pesada:90},  tip:'Avançado. Desça lentamente com controle. Use travesseiro no joelho.' },
              { n:'Stiff com Peso Corporal',    s:[3],   r:{ini:'20',int:'20',av:'20'},            rest:{leve:45,mod:45,pesada:45},  tip:'Incline o tronco sentindo o alongamento.' },
              { n:'Glute Bridge',               s:[4],   r:{ini:'20',int:'20',av:'20'},            rest:{leve:45,mod:45,pesada:45},  tip:'Elevação máxima do quadril. Contraia o glúteo.' },
            ],
          },
          color: '#C77DFF', icon: "<i class='ph-fill ph-circles-three'></i>", label: 'POSTERIOR',
        },

        // GLÚTEOS
        gluteos: {
          eq: {
            academia: [
              { n:'Hip Thrust com Barra',        s:[4],   r:{ini:'15–20',int:'12–15',av:'10–12'}, rest:{leve:75,mod:90,pesada:90},  tip:'Extensão máxima de quadril no topo. Contraia forte 2s.' },
              { n:'Agachamento Sumô com Barra',  s:[3,4], r:{ini:'15',int:'12–15',av:'10–12'},     rest:{leve:90,mod:90,pesada:120}, tip:'Pés largos, pontas para fora. Desça profundo.' },
              { n:'Abdução na Máquina',          s:[3],   r:{ini:'20',int:'15–20',av:'15–20'},     rest:{leve:60,mod:60,pesada:60},  tip:'Pausa de 1s no pico. Não balance o tronco.' },
              { n:'Afundo Avanço (Smith)',        s:[3],   r:{ini:'12 cada',int:'10 cada',av:'10 cada'}, rest:{leve:75,mod:75,pesada:90},  tip:'Passada ampla para ativar o glúteo.' },
              { n:'Extensão de Quadril 45°',     s:[3],   r:{ini:'20',int:'15–20',av:'15–20'},     rest:{leve:60,mod:60,pesada:60},  tip:'Foco no glúteo máximo. Extensão completa.' },
            ],
            halteres: [
              { n:'Hip Thrust no Banco',         s:[4],   r:{ini:'20',int:'15–20',av:'12–15'},     rest:{leve:75,mod:75,pesada:90},  tip:'Coloque haltere no quadril. Contraia no topo.' },
              { n:'Agachamento Sumô Haltere',    s:[3,4], r:{ini:'20',int:'15',av:'12–15'},         rest:{leve:75,mod:75,pesada:90},  tip:'Pés largos. Haltere entre as pernas.' },
              { n:'Afundo Avanço Halteres',      s:[3],   r:{ini:'12 cada',int:'10 cada',av:'10 cada'}, rest:{leve:60,mod:75,pesada:75},  tip:'Passada longa. Quadril para frente ao subir.' },
              { n:'Extensão de Quadril no Banco',s:[3],   r:{ini:'20',int:'15–20',av:'15–20'},     rest:{leve:60,mod:60,pesada:60},  tip:'Uma perna de cada vez.' },
            ],
            elasticos: [
              { n:'Hip Thrust com Elástico',     s:[4],   r:{ini:'20',int:'20',av:'20'},            rest:{leve:45,mod:60,pesada:60},  tip:'Elástico sobre o quadril e fixado no chão.' },
              { n:'Abdução com Elástico (mini)', s:[3,4], r:{ini:'20–25',int:'20',av:'20'},          rest:{leve:45,mod:45,pesada:45},  tip:'Elástico na altura dos joelhos. Em pé ou deitada.' },
              { n:'Afundo com Elástico',         s:[3],   r:{ini:'15 cada',int:'12 cada',av:'12 cada'}, rest:{leve:45,mod:45,pesada:45},  tip:'Elástico fixo no calcanhar.' },
            ],
            sem: [
              { n:'Glute Bridge',                s:[4],   r:{ini:'20',int:'25',av:'30'},            rest:{leve:45,mod:45,pesada:45},  tip:'Deitada. Elevação máxima e contração forte no topo.' },
              { n:'Donkey Kick',                 s:[3],   r:{ini:'20 cada',int:'20 cada',av:'20 cada'}, rest:{leve:45,mod:45,pesada:45},  tip:'Em 4 apoios. Chute para trás e cima.' },
              { n:'Fire Hydrant',                s:[3],   r:{ini:'20 cada',int:'20 cada',av:'20 cada'}, rest:{leve:45,mod:45,pesada:45},  tip:'Em 4 apoios. Eleve a perna para o lado.' },
              { n:'Agachamento Sumô Estático',   s:[3],   r:{ini:'30s',int:'45s',av:'60s'},          rest:{leve:45,mod:45,pesada:45},  tip:'Posição baixa do sumô. Isométrico.' },
            ],
          },
          color: '#FF69B4', icon: "<i class='ph-fill ph-heart'></i>", label: 'GLÚTEOS',
        },

        // CORE
        core: {
          eq: {
            academia: [
              { n:'Abdominal na Polia',           s:[3], r:{ini:'20',int:'15–20',av:'15'},     rest:{leve:45,mod:45,pesada:45}, tip:'Flexione o tronco contraindo o abdômen. Não use o pescoço.' },
              { n:'Prancha Isométrica',           s:[3,4], r:{ini:'30s',int:'45s',av:'60s+'},  rest:{leve:45,mod:45,pesada:45}, tip:'Corpo em linha reta. Respire normalmente.' },
              { n:'Elevação de Pernas Paralelas', s:[3], r:{ini:'12–15',int:'15',av:'15–20'},  rest:{leve:60,mod:60,pesada:60}, tip:'Lombar colada na barra. Desça lentamente.' },
              { n:'Russian Twist com Peso',       s:[3], r:{ini:'20',int:'20',av:'20'},         rest:{leve:45,mod:45,pesada:45}, tip:'Pés levantados para intensificar.' },
            ],
            halteres: [
              { n:'Russian Twist com Haltere',    s:[3], r:{ini:'20',int:'20',av:'20'},         rest:{leve:45,mod:45,pesada:45}, tip:'Pés levantados. Rotação completa do tronco.' },
              { n:'Remo Haltere (Anti-rotação)',  s:[3], r:{ini:'10 cada',int:'10 cada',av:'10 cada'}, rest:{leve:45,mod:45,pesada:45}, tip:'Estabilize o core durante o movimento.' },
              { n:'Prancha com Haltere',          s:[3], r:{ini:'8 cada',int:'10 cada',av:'12 cada'}, rest:{leve:45,mod:45,pesada:45}, tip:'Prancha e faça remada alternada.' },
            ],
            elasticos: [
              { n:'Prancha com Elástico',         s:[3], r:{ini:'30s',int:'45s',av:'60s'},      rest:{leve:45,mod:45,pesada:45}, tip:'Elástico nas costas. Mantém tensão adicional.' },
              { n:'Pallof Press',                 s:[3], r:{ini:'12 cada',int:'12 cada',av:'12 cada'}, rest:{leve:45,mod:45,pesada:45}, tip:'Anti-rotação. Empurre e segure 2s.' },
            ],
            sem: [
              { n:'Prancha Isométrica',           s:[3,4], r:{ini:'30s',int:'45s',av:'60s+'},  rest:{leve:45,mod:45,pesada:45}, tip:'Linha reta da cabeça ao calcanhar.' },
              { n:'Abdominal Supra',              s:[3], r:{ini:'20',int:'25',av:'30'},          rest:{leve:45,mod:45,pesada:45}, tip:'Expirar na contração. Mãos atrás da orelha.' },
              { n:'Prancha Lateral',              s:[3], r:{ini:'20s cada',int:'30s cada',av:'45s cada'}, rest:{leve:45,mod:45,pesada:45}, tip:'Quadril elevado. Corpo em linha reta.' },
              { n:'Mountain Climber',             s:[3], r:{ini:'20s',int:'30s',av:'40s'},       rest:{leve:45,mod:45,pesada:45}, tip:'Joelhos alternados perto do peito. Ritmo rápido.' },
              { n:'Dead Bug',                     s:[3], r:{ini:'8 cada',int:'10 cada',av:'12 cada'}, rest:{leve:45,mod:45,pesada:45}, tip:'Lombar colada no chão. Extend arm+opposite leg.' },
              { n:'Abdominal Bicicleta',          s:[3], r:{ini:'20 cada',int:'25 cada',av:'30 cada'}, rest:{leve:45,mod:45,pesada:45}, tip:'Rotação completa. Olhar para o lado.' },
            ],
          },
          color: '#FFD700', icon: "<i class='ph-fill ph-circles-three-plus'></i>", label: 'CORE',
        },

        // PANTURRILHA
        panturrilha: {
          eq: {
            academia: [
              { n:'Elevação de Panturrilha em Pé',  s:[4], r:{ini:'20–25',int:'20',av:'20'},   rest:{leve:45,mod:45,pesada:45}, tip:'Pausa de 2s no topo. Desça lentamente (3s).' },
              { n:'Panturrilha no Leg Press',       s:[3], r:{ini:'20–25',int:'20',av:'20'},   rest:{leve:45,mod:45,pesada:45}, tip:'Amplitude máxima. Excelente variação.' },
              { n:'Panturrilha Sentado',            s:[3], r:{ini:'20–25',int:'20',av:'20'},   rest:{leve:45,mod:45,pesada:45}, tip:'Foco no sóleo. Joelho 90°.' },
            ],
            halteres: [
              { n:'Elevação Panturrilha c/ Haltere',s:[3,4], r:{ini:'20–25',int:'20',av:'20'}, rest:{leve:45,mod:45,pesada:45}, tip:'Use degrau para amplitude total.' },
            ],
            elasticos: [
              { n:'Flexão Plantar com Elástico',   s:[3], r:{ini:'20–25',int:'20',av:'20'},   rest:{leve:45,mod:45,pesada:45}, tip:'Ancora o elástico e empurre com o pé.' },
            ],
            sem: [
              { n:'Elevação Panturrilha Unilateral',s:[3], r:{ini:'15–20 cada',int:'20 cada',av:'25 cada'}, rest:{leve:45,mod:45,pesada:45}, tip:'Em degrau ou chão. Segure apoio leve.' },
            ],
          },
          color: '#00B4D8', icon: "<i class='ph-fill ph-sneaker-move'></i>", label: 'PANTURRILHA',
        },

        // LOMBAR
        lombar: {
          eq: {
            academia: [
              { n:'Hiperextensão no Romano',    s:[3], r:{ini:'15–20',int:'15',av:'12–15'}, rest:{leve:60,mod:60,pesada:60}, tip:'Não hiperexenda. Pare na posição neutra da coluna.' },
              { n:'Good Morning com Barra',     s:[3], r:{ini:'15',int:'12–15',av:'12'},    rest:{leve:75,mod:75,pesada:75}, tip:'Flexão de quadril. Costas neutras o tempo todo.' },
            ],
            halteres: [
              { n:'Superman com Halteres',      s:[3], r:{ini:'12',int:'12–15',av:'15'},    rest:{leve:45,mod:45,pesada:45}, tip:'Eleve braços e pernas simultaneamente.' },
            ],
            elasticos: [
              { n:'Extensão de Quadril c/ Elástico',s:[3], r:{ini:'15–20',int:'15',av:'15'}, rest:{leve:45,mod:45,pesada:45}, tip:'Ancora o elástico no tornozelo. Em 4 apoios.' },
            ],
            sem: [
              { n:'Superman',                   s:[3], r:{ini:'12–15',int:'15',av:'20'},    rest:{leve:45,mod:45,pesada:45}, tip:'Eleve braços e pernas. Pausa de 2s no topo.' },
              { n:'Bird Dog',                   s:[3], r:{ini:'10 cada',int:'10 cada',av:'12 cada'}, rest:{leve:45,mod:45,pesada:45}, tip:'Estabilidade: sem rotação de quadril.' },
            ],
          },
          color: '#A8A8A8', icon: "<i class='ph-fill ph-person'></i>", label: 'LOMBAR',
        },

        // CARDIO HIIT
        hiit: {
          eq: {
            academia: [
              { n:'Burpees',            s:[3,4,5], r:{ini:'8',int:'10',av:'12'},    rest:{leve:60,mod:60,pesada:60}, tip:'Explosão máxima no salto. Mantenha a técnica.' },
              { n:'Jump Squat',         s:[3,4],   r:{ini:'10',int:'12',av:'15'},   rest:{leve:60,mod:60,pesada:60}, tip:'Aterrisagem suave amortecendo os joelhos.' },
              { n:'Mountain Climber',   s:[3,4],   r:{ini:'30s',int:'40s',av:'45s'},rest:{leve:45,mod:45,pesada:45}, tip:'Ritmo acelerado. Quadril nivelado.' },
              { n:'Box Jump',           s:[4],     r:{ini:'6',int:'8',av:'10'},      rest:{leve:75,mod:75,pesada:75}, tip:'Aterrisagem suave. Desça pelo lado.' },
              { n:'Sprint na Esteira',  s:[5,6],   r:{ini:'20s',int:'30s',av:'30s'},rest:{leve:60,mod:60,pesada:60}, tip:'Velocidade máxima. Recuperação ativa entre os tiros.' },
            ],
            halteres: [
              { n:'Burpees com Halteres',s:[3],   r:{ini:'8',int:'8–10',av:'10'},   rest:{leve:75,mod:75,pesada:75}, tip:'Segure os halteres durante todo o movimento.' },
              { n:'Jump Squat',          s:[3,4], r:{ini:'10',int:'12',av:'15'},    rest:{leve:60,mod:60,pesada:60}, tip:'Aterrisagem suave e controlada.' },
            ],
            elasticos: [
              { n:'Jumping Jack',       s:[3,4],   r:{ini:'30s',int:'40s',av:'45s'},rest:{leve:45,mod:45,pesada:45}, tip:'Elástico nos tornozelos para resistência extra.' },
            ],
            sem: [
              { n:'Burpees',            s:[3,4,5], r:{ini:'8',int:'10',av:'12'},    rest:{leve:60,mod:60,pesada:60}, tip:'Explosão máxima no salto.' },
              { n:'Jumping Jacks',      s:[3],     r:{ini:'30s',int:'40s',av:'45s'},rest:{leve:45,mod:45,pesada:45}, tip:'Ritmo acelerado. Braços ativos.' },
              { n:'High Knees',         s:[3],     r:{ini:'30s',int:'40s',av:'45s'},rest:{leve:45,mod:45,pesada:45}, tip:'Joelhos na altura do quadril. Braços em movimento.' },
            ],
          },
          color: '#FF6B35', icon: "<i class='ph-fill ph-person-simple-run'></i>", label: 'CARDIO HIIT',
        },
      };

      // ── RESTRIÇÕES → grupos excluídos ──────────────────────────────────
      const restrictionMap = {
        joelho:    ['quad', 'gluteos'],
        ombro:     ['peitoral', 'ombro', 'triceps'],
        lombar:    ['lombar', 'posterior'],
        cervical:  ['core'],
        punho:     ['peitoral', 'biceps', 'triceps'],
        quadril:   ['gluteos', 'posterior'],
      };
      const blockedGroups = new Set();
      for (const r of restrictions) {
        (restrictionMap[r] || []).forEach(g => blockedGroups.add(g));
      }

      // ── FOCO → boost de grupos ──────────────────────────────────────────
      const focusBoost = {
        gluteos:   ['gluteos', 'posterior', 'quad'],
        pernas:    ['quad', 'posterior', 'gluteos', 'panturrilha'],
        superior:  ['peitoral', 'dorsal', 'ombro', 'biceps', 'triceps'],
        core:      ['core', 'lombar'],
        ombros:    ['ombro', 'triceps'],
        costas:    ['dorsal', 'lombar'],
        braccos:   ['biceps', 'triceps'],
        peito:     ['peitoral'],
        cardio:    ['hiit'],
        funcional: ['core', 'hiit', 'lombar'],
      };
      const boostedGroups = new Set();
      for (const f of focus) {
        (focusBoost[f] || []).forEach(g => boostedGroups.add(g));
      }

      // ── SPLITS por número de dias ───────────────────────────────────────
      const femFocus = (sex === 'feminino');

      const splits = {
        1: [['quad','gluteos','peitoral','dorsal','core']],
        2: [
          femFocus
            ? ['gluteos','posterior','quad','core']
            : ['peitoral','dorsal','ombro','biceps','triceps'],
          femFocus
            ? ['peitoral','dorsal','ombro','core']
            : ['quad','posterior','gluteos','panturrilha','core'],
        ],
        3: femFocus
          ? [['gluteos','posterior','quad'],['peitoral','dorsal','ombro'],['quad','gluteos','core']]
          : [['peitoral','triceps'],['dorsal','biceps'],['quad','posterior','ombro']],
        4: femFocus
          ? [['gluteos','posterior'],['peitoral','dorsal','ombro'],['quad','gluteos','panturrilha'],['core','hiit']]
          : [['peitoral','triceps'],['dorsal','biceps'],['quad','posterior'],['ombro','core']],
        5: femFocus
          ? [['gluteos','posterior'],['peitoral','dorsal'],['quad','panturrilha'],['ombro','core'],['gluteos','hiit']]
          : [['peitoral'],['dorsal'],['quad','posterior'],['ombro','core'],['biceps','triceps']],
        6: femFocus
          ? [['gluteos'],['peitoral','ombro'],['quad','panturrilha'],['posterior'],['dorsal','core'],['gluteos','hiit']]
          : [['peitoral'],['dorsal','biceps'],['quad'],['ombro'],['posterior','triceps'],['core','hiit']],
        7: femFocus
          ? [['gluteos'],['peitoral','ombro'],['quad','panturrilha'],['posterior'],['dorsal'],['core'],['gluteos','hiit']]
          : [['peitoral'],['dorsal'],['quad'],['ombro'],['posterior'],['biceps','triceps'],['core','hiit']],
      };

      const sessionGroups = splits[Math.min(nDays, 7)] || splits[3];
      // Ajusta para o número exato de dias
      const usedGroups = sessionGroups.slice(0, nDays);

      // ── SELECIONAR EXERCÍCIOS POR SESSÃO ────────────────────────────────
      const repsKey = level === 'avancado' ? 'av' : level === 'iniciante' ? 'ini' : 'int';
      const intensityMap = { leve: 'leve', moderada: 'mod', pesada: 'pesada' };
      const restKey = intensityMap[intensity] || 'mod';

      // Exercícios por sessão dependendo do estilo
      const exPerSession = style === 'circuito' ? 5 : (nDays >= 5 ? 4 : (nDays >= 4 ? 5 : 6));
      const minEx = Math.min(exPerSession, level === 'iniciante' ? 4 : exPerSession);

      const sessions = usedGroups.map((groups, dayIdx) => {
        // Filtra grupos bloqueados e inclui boosted com preferência
        const availGroups = groups.filter(g => !blockedGroups.has(g));
        const sortedGroups = availGroups.sort((a, b) => {
          if (boostedGroups.has(a) && !boostedGroups.has(b)) return -1;
          if (!boostedGroups.has(a) && boostedGroups.has(b)) return 1;
          return 0;
        });

        const selectedExercises = [];
        const usedNames = new Set();

        // Objetivo afeta cardio
        const cardioMap = {
          emagrecimento: [
            '20min Esteira (7–8 km/h)',
            '25min Bike HIIT (30s forte / 90s leve)',
            '20min Corda ou Elíptico',
            '15min Corrida Intervalada',
          ],
          hipertrofia: [
            '10min Aquecimento na Esteira (leve)',
            '10min Bike (aquecimento leve)',
            '8min Elíptico (aquecimento)',
          ],
          condicionamento: [
            '20min Corrida Contínua',
            '15min Pular Corda',
            '20min HIIT na Bike',
            '25min Natação (se disponível)',
          ],
        };
        const cardioPool = cardioMap[goal] || cardioMap.hipertrofia;
        const cardio = cardioPool[dayIdx % cardioPool.length];

        // Principal grupo muscular da sessão para meta-info
        const primaryGroup = sortedGroups[0] || 'core';
        const primaryDb = DB[primaryGroup];

        // Pega exercícios de todos os grupos desta sessão
        let totalNeeded = minEx;
        const perGroup = Math.max(2, Math.floor(totalNeeded / sortedGroups.length));

        for (const grp of sortedGroups) {
          if (!DB[grp]) continue;
          const eqList = DB[grp].eq[equipment] || DB[grp].eq['sem'] || [];
          const shuffled = [...eqList].sort(() => Math.random() - 0.5);

          let added = 0;
          for (const ex of shuffled) {
            if (usedNames.has(ex.n)) continue;
            if (selectedExercises.length >= totalNeeded) break;
            if (added >= perGroup && selectedExercises.length >= Math.floor(totalNeeded * 0.6)) break;

            const setsArr = ex.s;
            const setsTarget = setsArr[Math.min(
              level === 'avancado' ? setsArr.length - 1 : level === 'iniciante' ? 0 : 1,
              setsArr.length - 1
            )];
            const restVal = ex.rest[restKey] || ex.rest['mod'] || 60;

            // Reduce sets for beginners on big exercises
            const finalSets = level === 'iniciante' ? Math.min(setsTarget, 3) : setsTarget;

            selectedExercises.push({
              id: `loc_${Date.now()}_${dayIdx}_${selectedExercises.length}`,
              name: ex.n,
              sets: finalSets,
              reps: ex.r[repsKey] || ex.r['int'],
              rest: restVal,
              muscle: DB[grp]?.label || grp,
              tip: ex.tip,
            });
            usedNames.add(ex.n);
            added++;
          }
        }

        // Fallback se poucos exercícios
        if (selectedExercises.length < 3) {
          const fallbackGrp = femFocus ? 'core' : 'core';
          const fallbackList = DB[fallbackGrp].eq[equipment] || DB[fallbackGrp].eq['sem'] || [];
          for (const ex of fallbackList.slice(0, 2)) {
            if (!usedNames.has(ex.n)) {
              selectedExercises.push({
                id: `loc_fb_${Date.now()}_${selectedExercises.length}`,
                name: ex.n,
                sets: 3,
                reps: ex.r[repsKey] || '15',
                rest: 60,
                muscle: 'Core',
                tip: ex.tip,
              });
              usedNames.add(ex.n);
            }
          }
        }

        // Cor e ícone do grupo principal
        const dbMeta = primaryDb || DB.core;
        const muscleLabel = sortedGroups.map(g => DB[g]?.label || g).join(' + ');

        return {
          muscle: muscleLabel.toUpperCase(),
          icon: dbMeta.icon,
          color: dbMeta.color,
          cardio,
          exercises: selectedExercises,
        };
      });

      // ── METADATA DO PLANO ───────────────────────────────────────────────
      const goalNames = {
        hipertrofia: ['Power Hypertrophy', 'Mass Builder', 'Iron Volume', 'Progressive Overload'],
        emagrecimento: ['Fat Burner Pro', 'Shred Protocol', 'Metabolic Blast', 'Burn & Tone'],
        condicionamento: ['Athletic Edge', 'Performance Plus', 'Functional Power', 'Endurance Force'],
      };
      const namePool = goalNames[goal] || goalNames.hipertrofia;
      const planName = namePool[Math.floor(Math.random() * namePool.length)];

      const goalDescs = {
        hipertrofia:    'Periodização inteligente para máximo ganho de massa muscular.',
        emagrecimento:  'Alta densidade de volume para aceleração metabólica e queima calórica.',
        condicionamento:'Exercícios funcionais e aeróbicos para performance e resistência.',
      };
      const badgeByGoal = {
        hipertrofia:    { badge: 'POWER',   color: '#FF4D4D' },
        emagrecimento:  { badge: 'SHRED',   color: '#FF6B35' },
        condicionamento:{ badge: 'ATLETA',  color: '#00C9A7' },
      };
      const meta = badgeByGoal[goal] || { badge: 'PRO', color: '#9B5FDE' };

      return {
        id: 'local_' + Date.now(),
        name: planName,
        description: goalDescs[goal] || 'Treino personalizado gerado pelo motor local.',
        badge: meta.badge,
        badgeColor: meta.color,
        sex, goal,
        isLocalGenerated: true,
        generatedAt: new Date().toISOString(),
        sessions,
      };
    },

    async saveAiGeneratedPlan() {
      if (!this.aiGeneratedPlan) return;
      this.aiSaving = true;
      const plan = this.aiGeneratedPlan;
      const mappedPlan = plan.sessions.map((s, i) => ({ ...s, _sessionIdx: i }));

      await this.db.collection('users').doc(this.authUser.uid).update({
        plan: mappedPlan,
        activePlanId: plan.id,
      });

      this.userData.plan         = mappedPlan;
      this.userData.activePlanId = plan.id;
      this.selectedDay  = 0;
      this.initExLogs();
      this.aiGeneratedPlan = null;
      this.aiSaving = false;
      this.view = 'treino';
    },

    resetAiForm() {
      this.aiGeneratedPlan = null;
      this.aiError = '';
      this.aiForm = { level: 'intermediario', equipment: 'academia', split: 'auto', focus: [], restrictions: [], style: 'tradicional', intensity: 'moderada' };
    },

    // ── TIMER ──
    requestNotificationPermission() {
      if ('Notification' in window && Notification.permission !== 'granted') Notification.requestPermission();
    },
    startTimer(secs, name) {
      clearInterval(this.timer.interval);
      this.timer = { show: true, running: true, seconds: secs, total: secs, name, interval: null };
      this.timer.interval = setInterval(this.tickTimer, 1000);
    },
    tickTimer() {
      if (this.timer.seconds <= 0) {
        this.stopTimer();
        if (Notification.permission === 'granted') new Notification('IRON PLAN', { body: 'Descanso concluído!' });
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        return;
      }
      this.timer.seconds--;
    },
    toggleTimer() {
      this.timer.running = !this.timer.running;
      if (this.timer.running) this.timer.interval = setInterval(this.tickTimer, 1000);
      else clearInterval(this.timer.interval);
    },
    stopTimer() {
      clearInterval(this.timer.interval);
      this.timer.show = false; this.timer.running = false; this.timer.seconds = 0;
    },
  },
}).mount('#app');
