import { Course, MiscFee } from '../types';

const standardMiscFees: MiscFee[] = [
    { id: 're-exam', name: '重考费 (每个课程模块)', amount: 200, category: 'standard' },
    { id: 'deferment', name: '延期费 (每个课程模块)', amount: 500, category: 'standard' },
    { id: 're-module', name: '重修费 (每个课程模块)', amount: 700, category: 'standard' },
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
    { id: 't-shirt', name: '学院T恤', amount: 20, isPerUnit: true, category: 'service' },
    { id: 'guardian', name: '监护人行政费', amount: 100, notes: '不可退款', category: 'service' },
    { id: 'airport-pickup', name: '接机服务', amount: 180, notes: '不可退款', category: 'service' },
    { id: 'hpb-fee', name: '健康促进局申请费', amount: 300, notes: '不可退款', category: 'service' },
];

export const courseData: Course[] = [
  {
    id: 'aeis-p2', name: '政府中小学入学预备课程 - 小学 2 年级', abbreviation: '小二预备班', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-p3', name: '政府中小学入学预备课程 - 小学 3 年级', abbreviation: '小三预备班', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-p4', name: '政府中小学入学预备课程 - 小学 4 年级', abbreviation: '小四预备班', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-p5', name: '政府中小学入学预备课程 - 小学 5 年级', abbreviation: '小五预备班', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-s1', name: '政府中小学入学预备课程 - 中学 1 年级', abbreviation: '中一预备班', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-s2', name: '政府中小学入学预备课程 - 中学 2 年级', abbreviation: '中二预备班', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'aeis-s3', name: '政府中小学入学预备课程 - 中学 3 年级', abbreviation: '中三预备班', durationMonths: 6, modules: 2,
    fees: { application: { local: 150, international: 400 }, course: 9500, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'ielts', name: '雅思预备课程', abbreviation: '雅思', durationMonths: 6, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 6460, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel1-ft', name: '英语一级证书 (全日制)', abbreviation: '英语一级', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 2480, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel2-ft', name: '英语二级证书 (全日制)', abbreviation: '英语二级', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 2480, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel3-ft', name: '英语三级证书 (全日制)', abbreviation: '英语三级', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 2480, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel1-pt', name: '英语一级证书 (兼职)', abbreviation: '英语一级', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 1488, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel2-pt', name: '英语二级证书 (兼职)', abbreviation: '英语二级', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 1488, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel3-pt', name: '英语三级证书 (兼职)', abbreviation: '英语三级', durationMonths: 3, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 1488, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cel-ft', name: '英语语言证书 (全日制)', abbreviation: '英语语言', durationMonths: 6, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 5260, material: 100, examination: 100, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cm', name: '通用管理证书', abbreviation: '通用管理', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 5000, material: 200, examination: 200, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cme', name: '通用管理证书 (线上课程)', abbreviation: '通用管理(线上)', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 5000, material: 200, examination: 200, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cm-m', name: '通用管理证书 (中文)', abbreviation: '通用管理(中)', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 5000, material: 200, examination: 200, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'cme-m', name: '通用管理证书 (中文) (线上课程)', abbreviation: '通用管理(中/线上)', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 5000, material: 200, examination: 200, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dbm', name: '商业管理国际大一', abbreviation: '商业国际大一', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 8400, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dbme', name: '商业管理国际大一 (线上课程)', abbreviation: '商业国际大一(线上)', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 8400, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dbm-m', name: '商业管理国际大一 (中文)', abbreviation: '商业国际大一(中)', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 8400, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dbme-m', name: '商业管理国际大一 (中文) (线上课程)', abbreviation: '商业国际大一(中/线上)', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 8400, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dthm', name: '旅游与酒店管理国际大一', abbreviation: '旅游国际大一', durationMonths: 6, modules: 6,
    fees: { application: { local: 150, international: 400 }, course: 6300, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dthme', name: '旅游与酒店管理国际大一 (线上课程)', abbreviation: '旅游国际大一(线上)', durationMonths: 6, modules: 6,
    fees: { application: { local: 150, international: 400 }, course: 6300, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dthm-m', name: '旅游与酒店管理国际大一 (中文)', abbreviation: '旅游国际大一(中)', durationMonths: 6, modules: 6,
    fees: { application: { local: 150, international: 400 }, course: 6300, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'dthme-m', name: '旅游与酒店管理国际大一 (中文) (线上课程)', abbreviation: '旅游国际大一(中/线上)', durationMonths: 6, modules: 6,
    fees: { application: { local: 150, international: 400 }, course: 6300, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'pgc', name: '工商管理研究生证书', abbreviation: '研究生证书', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 6800, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'pgc-m', name: '工商管理研究生证书 (中文)', abbreviation: '研究生证书(中)', durationMonths: 4, modules: 4,
    fees: { application: { local: 150, international: 400 }, course: 6800, material: 300, examination: 300, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'pgd', name: '工商管理研究生文凭', abbreviation: '研究生文凭', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 13600, material: 400, examination: 400, administrative: 150 },
    miscFees: standardMiscFees
  },
  {
    id: 'pgd-m', name: '工商管理研究生文凭 (中文)', abbreviation: '研究生文凭(中)', durationMonths: 8, modules: 8,
    fees: { application: { local: 150, international: 400 }, course: 13600, material: 400, examination: 400, administrative: 150 },
    miscFees: standardMiscFees
  }
];