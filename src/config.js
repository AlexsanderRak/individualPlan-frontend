const portAdmin = 'http://localhost:3002';
const portAuth = 'http://localhost:3001';

const config = {
    login: `${portAdmin}/login`,
    user: `${portAdmin}/user`,
    creatClient: `${portAdmin}/creatClient`,
    
//  new
    auth: `${portAuth}/auth`,
    regestration: `${portAuth}/auth/regestration`,
    activeProfile: `${portAuth}/auth/activeProfile`,
    userSkillMatrix: `${portAuth}/user/skillMatrix`,
    decision: `${portAuth}/decision`,
    decisionSearch: `${portAuth}/decision/search`,
    decisionGetOne: `${portAuth}/decision/one`,
    developmentPlan: `${portAuth}/developmentPlan`,
    developmentPlanSearch: `${portAuth}/developmentPlan/search`,
    developmentPlanGetOne: `${portAuth}/developmentPlan/one`,
    
}

export const role = {
    0: {ru:'Администратор', en:'admin'},
    12: {ru:'Менеджер', en:'manager'},
    13: {ru:'Сотрудник', en:'employee'},
}


export default config;