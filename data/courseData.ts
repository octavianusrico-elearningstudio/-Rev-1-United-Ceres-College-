import { Course, MiscFee } from '../types';

const standardMiscFees: MiscFee[] = [
    { id: 're-exam', name: '重考费 (每模块)', amount: 200, category: 'standard' },
    { id: 'deferment', name: '延期费 (每模块)', amount: 500, category: 'standard' },
    { id: 're-module', name: '重修费 (每模块)', amount: 700, category: 'standard' },
    { id: 'course-change', name: '转课程费', amount: 300, category: 'standard' },
    { id: 'graduation', name: '毕业典礼费', amount: 350, category: 'standard' },
    { id: 'photocopy-a4-bw', name: 'A4 黑白复印 (每页)', amount: 0.10, isPerUnit: true, category: 'standard' },
    { id: 'photocopy-a4-color', name: 'A4 彩色复印 (每页)', amount: 0.30, isPerUnit: true, category: 'standard' },
    { id: 'photocopy-a3-bw', name: 'A3 黑白复印 (每页)', amount: 0.20, isPerUnit: true, category: 'standard' },
    { id: 'photocopy-a3-color', name: 'A3 彩色复印 (每页)', amount: 0.50, isPerUnit: true, category: 'standard' },
    { id: 'printing-a4-bw', name: 'A4 黑白打印 (每页)', amount: 1, isPerUnit: true, category: 'standard' },
    { id: 'printing-a4-color', name: 'A4 彩色打印 (每页)', amount: 0.5, isPerUnit: true, category: 'standard' },
    { id: 'printing-a3-bw', name: 'A3 黑白打印 (每页)', amount: 2, isPerUnit: true, category: 'standard' },
    { id: 'printing-a3-color', name: 'A3 彩色打印 (每页)', amount: 1, isPerUnit: true, category: 'standard' },
    { id: 't-shirt', name: 'UCC T恤', amount: 20, isPerUnit: true, category: 'service' },
    { id: 'guardian', name: '监护人行政费', amount: 100, notes: '不可退款', category: 'service' },
    { id: 'airport-pickup', name: '接机服务', amount: 180, notes: '不可退款', category: 'service' },
    { id: 'hpb-fee', name: '健康促进局 (HPB) 申请费', amount: 300, notes: '不可退款', category: 'service' },
];

export const courseData: Course[] = [
  {
    id: 'aeis-p2', name: 'AEIS 预备课程 - 小学 2 年级', abbreviation: 'AEISP2', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-p3', name: 'AEIS 预备课程 - 小学 3 年级', abbreviation: 'AEISP3', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-p4', name: 'AEIS 预备课程 - 小学 4 年级', abbreviation: 'AEISP4', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-p5', name: 'AEIS 预备课程 - 小学 5 年级', abbreviation: 'AEISP5', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-s1', name: 'AEIS 预备课程 - 中学 1 年级', abbreviation: 'AEISS1', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-s2', name: 'AEIS 预备课程 - 中学 2 年级', abbreviation: 'AEISS2', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-s3', name: 'AEIS 预备课程 - 中学 3 年级', abbreviation: 'AEISS3', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'ielts', name: 'IELTS 雅思预备课程', abbreviation: 'IELTS', durationMonths: 6, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 6460, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel1-ft', name: '英语一级证书 (全日制)', abbreviation: 'CEL1', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 2480, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel2-ft', name: '英语二级证书 (全日制)', abbreviation: 'CEL2', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 2480, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel3-ft', name: '英语三级证书 (全日制)', abbreviation: 'CEL3', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 2480, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel1-pt', name: '英语一级证书 (兼职)', abbreviation: 'CEL1', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 1488, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel2-pt', name: '英语二级证书 (兼职)', abbreviation: 'CEL2', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 1488, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel3-pt', name: '英语三级证书 (兼职)', abbreviation: 'CEL3', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 1488, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel-ft', name: '英语语言证书 (全日制)', abbreviation: 'CEL', durationMonths: 6, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 5260, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cm', name: '通用管理证书', abbreviation: 'CM', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 5000, material: 200, examination: 200, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cme', name: '通用管理证书 (电子竞技)', abbreviation: 'CME', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 5000, material: 200, examination: 200, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cm-m', name: '通用管理证书 (中文)', abbreviation: 'CM(M)', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 5000, material: 200, examination: 200, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cme-m', name: '通用管理证书 (中文) (电子竞技)', abbreviation: 'CME(M)', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 5000, material: 200, examination: 200, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dbm', name: '商业管理大专文凭', abbreviation: 'DBM', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 8400, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dbme', name: '商业管理大专文凭 (电子竞技)', abbreviation: 'DBME', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 8400, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dbm-m', name: '商业管理大专文凭 (中文)', abbreviation: 'DBM(M)', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 8400, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dbme-m', name: '商业管理大专文凭 (中文) (电子竞技)', abbreviation: 'DBME(M)', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 8400, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dthm', name: '旅游与酒店管理大专文凭', abbreviation: 'DTHM', durationMonths: 6, modules: 6,
    fees: { application: { local: 150, international: 400 }, course: 6300, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dthme', name: '旅游与酒店管理大专文凭 (电子竞技)', abbreviation: 'DTHME', durationMonths: 6, modules: 6,
    fees: { application: { local: 150, international: 400 }, course: 6300, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dthm-m', name: '旅游与酒店管理大专文凭 (中文)', abbreviation: 'DTHM(M)', durationMonths: 6, modules: 6,
    fees: { application: { local: 150, international: 400 }, course: 6300, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dthme-m', name: '旅游与酒店管理大专文凭 (中文) (电子竞技)', abbreviation: 'DTHME(M)', durationMonths: 6, modules: 6,
    fees: { application: { local: 150, international: 400 }, course: 6300, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'pgc', name: '工商管理研究生证书', abbreviation: 'PGC', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 6800, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'pgc-m', name: '工商管理研究生证书 (中文)', abbreviation: 'PGC(M)', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 6800, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'pgd', name: '工商管理研究生文凭', abbreviation: 'PGD', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 13600, material: 400, examination: 400, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'pgd-m', name: '工商管理研究生文凭 (中文)', abbreviation: 'PGD(M)', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 13600, material: 400, examination: 400, administrative: 150 },
    miscFees: standardMiscFees
  }
];