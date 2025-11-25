import React, { useRef, useState, useEffect } from 'react';
import { ReportData } from '../types';
import { HiXMark, HiClipboardDocument, HiArrowDownTray, HiEnvelope } from 'react-icons/hi2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { formatCurrency } from '../utils/dateUtils';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    reportData: ReportData;
}

// Helper function to generate a plain text email body from the report data
const generateEmailBody = (data: ReportData): string => {
    let body = `尊敬的 ${data.participant.name || '同学'},\n\n`;
    body += `感谢您关注联邦赛瑞思学院。以下为您定制的课程费用报价单，请查阅。\n\n`;
    body += `========================================\n`;
    body += `  费用报价单\n`;
    body += `========================================\n\n`;

    body += `【参与者详情】\n`;
    body += `----------------------------------------\n`;
    body += `姓名: ${data.participant.name || 'N/A'}\n`;
    body += `联系号码: ${data.participant.whatsapp || 'N/A'}\n`;
    body += `邮箱: ${data.participant.email || 'N/A'}\n\n`;

    data.pathwayDetails.forEach((detail, index) => {
        body += `----------------------------------------\n`;
        body += `课程 ${index + 1}: ${detail.course.name}\n`;
        body += `----------------------------------------\n\n`;
        
        body += `【费用明细】\n`;
        
        const appFee = detail.course.fees.application[data.studentType];
        const courseFee = detail.course.fees.course;
        const combinedCourseFee = appFee + courseFee;

        body += `课程总费用: ${formatCurrency(combinedCourseFee)}\n`;
        body += `材料费: ${formatCurrency(detail.course.fees.material)}\n`;
        body += `考试费: ${formatCurrency(detail.course.fees.examination)}\n`;
        body += `行政费: ${formatCurrency(detail.course.fees.administrative)}\n`;

        if (detail.selectedMiscFees.length > 0) {
            body += `\n[杂费]\n`;
            detail.selectedMiscFees.forEach(fee => {
                body += `${fee.name} (x${fee.quantity}): ${formatCurrency(fee.amount * fee.quantity)}\n`;
            });
            body += `杂费总计: ${formatCurrency(detail.courseMiscTotal)}\n`;
        }

        body += `\n费用总计: ${formatCurrency(detail.courseSubtotal)}\n\n`;
    });

    if (data.livingCost.totalLivingCost > 0) {
        const monthlyCost = data.livingCost.costs.rent + data.livingCost.costs.food + data.livingCost.costs.transport + data.livingCost.costs.medical;
        body += `========================================\n`;
        body += `  生活费估算 (可选)\n`;
        body += `========================================\n\n`;
        body += `预估月花费: ${formatCurrency(monthlyCost)}\n`;
        body += `总时长: ${data.livingCost.totalDuration} 个月\n`;
        body += `预估生活费总额: ${formatCurrency(data.livingCost.totalLivingCost)}\n\n`;
    }

    body += `========================================\n`;
    body += `  最终摘要\n`;
    body += `========================================\n\n`;
    body += `小计: ${formatCurrency(data.totals.subtotal)}\n`;
    if (data.totals.scholarshipAmount > 0) {
        const scholarshipLabel = data.totals.scholarship.type === 'percentage' ? `${data.totals.scholarship.value}%` : '固定金额';
        body += `奖学金/折扣 (${scholarshipLabel}): -${formatCurrency(data.totals.scholarshipAmount)}\n`;
    }
    body += `消费税 (9%): ${formatCurrency(data.totals.gstAmount)}\n`;
    body += `总计: ${formatCurrency(data.totals.grandTotal)}\n\n`;

    body += `----------------------------------------\n`;
    body += `免责声明: 此报价仅为估算，可能会在不预先通知的情况下进行修订。\n\n`;
    body += `此致,\n`;
    body += `联邦赛瑞思学院 敬上\n`;
    
    return body;
};

export const ReportModal: React.FC<Props> = ({ isOpen, onClose, reportData }) => {
    const reportContentRef = useRef<HTMLDivElement>(null);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (isOpen) {
            setShowModal(true);
        } else {
            // Delay closing for animation
            timeoutId = setTimeout(() => setShowModal(false), 300);
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isOpen]);

    if (!showModal && !isOpen) return null;

    const handleSendEmail = () => {
        if (!reportData.participant.email) {
            alert('请先输入参与者邮箱地址。');
            return;
        }

        const subject = '联邦赛瑞思学院费用报价';
        const body = generateEmailBody(reportData);

        const mailtoLink = `mailto:${reportData.participant.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    };

    const handleCopyToClipboard = () => {
        if (reportContentRef.current) {
            const text = reportContentRef.current.innerText;
            navigator.clipboard.writeText(text).then(() => {
                alert('报告已复制到剪贴板！');
            }).catch(err => {
                console.error('复制报告失败: ', err);
                alert('复制报告失败。');
            });
        }
    };

    const handleDownloadPdf = async () => {
        if (!reportContentRef.current) return;
        setIsDownloadingPdf(true);
    
        try {
            const element = reportContentRef.current;
            // Clone the element to render it off-screen with specific print styles
            const clone = element.cloneNode(true) as HTMLElement;
            
            // Force A4 width (approx 794px at 96 DPI) to ensure layout consistency
            clone.style.width = '794px'; 
            clone.style.height = 'auto';
            clone.style.position = 'absolute';
            clone.style.top = '-10000px';
            clone.style.left = '-10000px';
            clone.style.backgroundColor = '#ffffff';
            // Add padding to simulate PDF margins
            clone.style.padding = '40px';
            
            // HARMONIZATION: Prioritize Inter for numbers/Latin, Noto Sans SC for Chinese
            clone.style.fontFamily = '"Inter", "Noto Sans SC", sans-serif';
            
            // Ensure full content is visible
            clone.style.overflow = 'visible';
            clone.style.maxHeight = 'none';

            document.body.appendChild(clone);
    
            // Use html2canvas to capture the visual representation
            const canvas = await html2canvas(clone, {
                scale: 2, // Higher scale for sharper text
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: 794
            });
    
            document.body.removeChild(clone);
    
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            let heightLeft = imgHeight;
            let position = 0;
            
            // Add first page
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
            
            // Handle pagination if content overflows one page
            while (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }
    
            pdf.save('Fee_Quotation_UCC.pdf');
        } catch (err) {
            console.error("PDF generation failed:", err);
            alert('生成 PDF 失败。');
        } finally {
            setIsDownloadingPdf(false);
        }
    };

    const modalClasses = isOpen ? 'opacity-100' : 'opacity-0';
    const containerClasses = isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0';
    const durationBreakdownText = reportData.pathwayDetails.length > 1 ? `(${reportData.pathwayDetails.map(p => `${p.course.abbreviation} ${p.course.durationMonths}个月`).join(' + ')})` : '';

    return (
        <div className={`fixed inset-0 bg-black/60 flex justify-center items-center z-50 print:bg-transparent print:block transition-opacity duration-300 ease-in-out ${modalClasses}`} onClick={onClose}>
            <div className={`bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col print:shadow-none print:h-auto print:max-h-none transition-all duration-300 ease-in-out ${containerClasses}`} onClick={(e) => e.stopPropagation()}>
                <header className="p-4 border-b flex justify-between items-center print:hidden">
                    <h2 className="text-xl font-bold text-slate-800 tracking-wide">费用报价报告</h2>
                    <div className="flex items-center gap-1">
                         <button onClick={handleSendEmail} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors" title="通过邮件发送">
                            <HiEnvelope size={20} />
                        </button>
                         <button onClick={handleDownloadPdf} disabled={isDownloadingPdf} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-wait" title="下载 PDF">
                            {isDownloadingPdf ? (
                                <svg className="animate-spin h-5 w-5 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <HiArrowDownTray size={20} />
                            )}
                        </button>
                         <button onClick={handleCopyToClipboard} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors" title="复制到剪贴板">
                            <HiClipboardDocument size={20} />
                        </button>
                        <button onClick={onClose} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                            <HiXMark size={24} />
                        </button>
                    </div>
                </header>
                
                {/* Applied font-sans and tracking classes for harmonization */}
                <div ref={reportContentRef} className="p-8 overflow-y-auto bg-white font-sans text-slate-800 leading-relaxed" id="report-content">
                    <div className="mb-8 flex justify-between items-start border-b border-gray-100 pb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-wide">联邦赛瑞思学院</h1>
                            <p className="text-slate-600 text-lg mt-1 tracking-wide">费用报价单</p>
                        </div>
                        <div className="text-right text-sm text-slate-500">
                            <p className="mb-1">生成日期:</p>
                            <p className="font-medium text-slate-800 tabular-nums">{new Date().toLocaleDateString('zh-CN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>

                    <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50/50">
                        <h3 className="font-bold text-lg mb-4 text-slate-800 border-b pb-2 border-gray-200 tracking-wide">参与者详情</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
                            <div>
                                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">姓名</span>
                                <span className="font-semibold text-gray-900 text-base block">{reportData.participant.name || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">联系号码</span>
                                <span className="font-semibold text-gray-900 text-base block tabular-nums">{reportData.participant.whatsapp || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">邮箱</span>
                                <span className="font-semibold text-gray-900 text-base block">{reportData.participant.email || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    
                    {reportData.pathwayDetails.map((detail, index) => {
                        // Calculate Combined Fee for View
                        const appFee = detail.course.fees.application[reportData.studentType];
                        const courseFee = detail.course.fees.course;
                        const combinedCourseFee = appFee + courseFee;

                        return (
                        <div key={detail.course.id} className="mb-10">
                             <h3 className="text-xl font-bold text-brand-primary bg-slate-50 border-l-4 border-brand-primary p-4 rounded-r-lg mb-6 tracking-wide">
                                课程 {index + 1}: {detail.course.name}
                            </h3>
                            
                            <div className="px-2">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-3 text-slate-800 flex items-center gap-2 tracking-wide">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> 费用明细
                                        </h4>
                                        <div className="text-sm space-y-3 pl-4 border-l border-gray-200 ml-1">
                                            <div className="flex justify-between items-center group">
                                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">课程总费用</span> 
                                                <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(combinedCourseFee)}</span>
                                            </div>
                                            <div className="flex justify-between items-center group">
                                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">材料费</span> 
                                                <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(detail.course.fees.material)}</span>
                                            </div>
                                            <div className="flex justify-between items-center group">
                                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">考试费</span> 
                                                <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(detail.course.fees.examination)}</span>
                                            </div>
                                            <div className="flex justify-between items-center group">
                                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">行政费</span> 
                                                <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(detail.course.fees.administrative)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {detail.selectedMiscFees.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mt-6 mb-3 text-slate-800 flex items-center gap-2 tracking-wide">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> 杂费
                                            </h4>
                                            <div className="text-sm space-y-3 pl-4 border-l border-gray-200 ml-1">
                                                {detail.selectedMiscFees.map(fee => (
                                                     <div key={fee.name} className="flex justify-between items-center">
                                                        <span className="text-slate-600">{fee.name} <span className="text-xs text-slate-400 ml-1">(x{fee.quantity})</span></span> 
                                                        <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(fee.amount * fee.quantity)}</span>
                                                    </div>
                                                ))}
                                                <div className="flex justify-between pt-2 border-t border-dashed border-gray-300 font-bold mt-2">
                                                    <span className="text-slate-700 tracking-wide">杂费总计</span> 
                                                    <span className="tabular-nums">{formatCurrency(detail.courseMiscTotal)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between mt-4 p-4 bg-gray-50 rounded-lg text-lg font-bold border border-gray-100 items-center">
                                        <span className="text-slate-800 tracking-wide">费用总计</span>
                                        <span className="text-brand-primary tabular-nums text-xl">{formatCurrency(detail.courseSubtotal)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                    
                    {reportData.livingCost.totalLivingCost > 0 && (
                        <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-lg">
                            <h3 className="font-bold text-lg mb-4 text-blue-900 tracking-wide">生活费估算 (可选)</h3>
                             <div className="text-sm space-y-3 text-blue-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-700">预估月花费</span> 
                                    <span className="font-medium tabular-nums">{formatCurrency(reportData.livingCost.costs.rent + reportData.livingCost.costs.food + reportData.livingCost.costs.transport + reportData.livingCost.costs.medical)}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <span className="text-blue-700">总时长</span>
                                    <div className="text-right">
                                        <span className="font-medium tabular-nums">{reportData.livingCost.totalDuration} 个月</span>
                                        {durationBreakdownText && (
                                            <p className="text-xs text-blue-600 mt-0.5">{durationBreakdownText}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-blue-200 font-bold mt-2 text-base items-center">
                                    <span className="text-blue-900 tracking-wide">预估生活费总额</span> 
                                    <span className="tabular-nums">{formatCurrency(reportData.livingCost.totalLivingCost)}</span>
                                </div>
                             </div>
                        </div>
                    )}

                    <div className="mt-10 pt-8 border-t-2 border-slate-200">
                        <div className="flex flex-col items-end gap-3">
                            <h3 className="font-bold text-lg mb-2 text-slate-800 tracking-wide">最终摘要</h3>
                            <div className="w-full sm:w-96 space-y-2 text-sm">
                                <div className="flex justify-between text-slate-600 items-center">
                                    <span>小计</span> 
                                    <span className="font-medium text-slate-800 tabular-nums">{formatCurrency(reportData.totals.subtotal)}</span>
                                </div>
                                 {reportData.totals.scholarshipAmount > 0 && (
                                    <div className="flex justify-between text-green-700 items-center">
                                        <span>
                                            奖学金/折扣 <span className="text-xs ml-1">({reportData.totals.scholarship.type === 'percentage' ? `${reportData.totals.scholarship.value}%` : '固定金额'})</span>
                                        </span>
                                        <span className="font-medium tabular-nums">-{formatCurrency(reportData.totals.scholarshipAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-slate-600 items-center">
                                    <span>消费税 (9%)</span> 
                                    <span className="font-medium text-slate-800 tabular-nums">{formatCurrency(reportData.totals.gstAmount)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-slate-300 items-center">
                                    <span className="text-slate-900 tracking-wide">总计</span> 
                                    <span className="text-brand-primary tabular-nums text-2xl">{formatCurrency(reportData.totals.grandTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 pt-6 border-t border-slate-100 text-xs text-slate-400 text-center">
                        <p>免责声明: 此报价仅为估算，可能会在不预先通知的情况下进行修订。</p>
                        <p className="mt-1 font-medium tracking-wider">联邦赛瑞思学院 | unitedceres.edu.sg</p>
                    </div>
                </div>
            </div>
        </div>
    );
};