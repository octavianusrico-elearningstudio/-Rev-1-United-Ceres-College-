import React from 'react';

export const Header: React.FC = () => {

    return (
        <header className="bg-brand-dark shadow-lg sticky top-0 z-20 border-b border-brand-primary/20 print:hidden">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                 <div className="flex items-center justify-between">
                    <div>
                        {/* Changed tracking-tight to tracking-wide for better Chinese character legibility */}
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-brand-text">
                            课程费用计算器
                        </h1>
                        <p className="text-sm text-brand-text/90 mt-1">联邦赛瑞思学院</p>
                    </div>
                </div>
            </div>
        </header>
    );
};