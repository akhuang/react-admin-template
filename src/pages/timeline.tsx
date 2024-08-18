import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle, Circle, Flag, ArrowRight } from 'lucide-react';

interface Stage {
    name: string;
    description: string;
    date: string;
    isMilestone: boolean;
}

interface Version {
    name: string;
    color: string;
    currentStage: number;
    stages: Stage[];
}

const timelineData: Version[] = [
    {
        name: "研发工具&公有云",
        color: "#3B82F6",
        currentStage: 5,
        stages: [
            { name: "需求分析", description: "收集和分析项目需求，确定主要功能和非功能需求，创建需求文档和用户故事", date: "2024-01-15", isMilestone: true },
            { name: "设计", description: "创建软件架构和用户界面设计，制定技术栈和数据库Schema", date: "2024-02-01", isMilestone: false },
            { name: "开发", description: "编写代码并实现功能，进行单元测试和持续集成", date: "2024-03-01", isMilestone: false },
            { name: "测试", description: "进行集成测试、系统测试和用户验收测试，修复发现的缺陷", date: "2024-04-15", isMilestone: true },
            { name: "部署", description: "将软件部署到生产环境，进行最终的性能调优和安全检查", date: "2024-05-01", isMilestone: true },
            { name: "维护", description: "持续支持和更新软件，处理用户反馈，进行必要的功能升级", date: "2024-05-15", isMilestone: false }
        ]
    },
    {
        name: "这是一个测试版本",
        color: "#10B981",
        currentStage: 2,
        stages: [
            { name: "需求分析", description: "收集v2.0版本的新需求，分析用户反馈", date: "2024-06-01", isMilestone: true },
            { name: "设计", description: "更新软件架构，设计新功能的用户界面", date: "2024-06-15", isMilestone: false },
            { name: "开发", description: "实现新功能，重构现有代码", date: "2024-07-01", isMilestone: false },
            { name: "测试", description: "对新功能进行全面测试，进行回归测试", date: "2024-07-15", isMilestone: true },
            { name: "部署", description: "部署v2.0版本，监控系统性能", date: "2024-08-01", isMilestone: true },
            { name: "维护", description: "处理v2.0版本的用户反馈，修复潜在问题", date: "2024-08-15", isMilestone: false }
        ]
    },
    {
        name: "v3.0",
        color: "#F59E0B",
        currentStage: 0,
        stages: [
            { name: "需求分析", description: "规划v3.0版本的主要特性，进行市场调研", date: "2024-09-01", isMilestone: true },
            { name: "设计", description: "设计v3.0版本的新架构和UI/UX", date: "2024-09-15", isMilestone: false },
            { name: "开发", description: "开发v3.0版本的核心功能", date: "2024-10-01", isMilestone: false },
            { name: "测试", description: "全面测试v3.0版本，包括性能和安全测试", date: "2024-10-15", isMilestone: true },
            { name: "部署", description: "分阶段部署v3.0版本", date: "2024-11-01", isMilestone: true },
            { name: "维护", description: "持续优化v3.0版本，收集用户反馈", date: "2024-11-15", isMilestone: false }
        ]
    }
];

interface TimelineItemProps {
    stage: Stage;
    index: number;
    version: Version;
    maxHeight: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ stage, index, version, maxHeight }) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [lineHeight, setLineHeight] = useState(0);

    useEffect(() => {
        if (boxRef.current) {
            const boxTop = boxRef.current.offsetTop;
            setLineHeight(boxTop - 18); // 28px is the top position of the line start
        }
    }, [maxHeight]);

    return (
        <div className="flex flex-col items-center relative" style={{ width: `${100 / version.stages.length}%`, padding: '0 10px' }}>
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full border-2 bg-white z-10" style={{ borderColor: version.color }}>
                {index <= version.currentStage ? (
                    <CheckCircle className="w-5 h-5" style={{ color: version.color }} />
                ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                )}
                {stage.isMilestone && (
                    <Flag className="w-3 h-3 text-red-500 absolute -top-1 -right-1" />
                )}
            </div>
            <div className="text-center mt-1 mb-2">
                <span className="text-xs font-semibold">{stage.date}</span>
            </div>
            <div
                className="w-px absolute left-1/2 transform -translate-x-1/2"
                style={{
                    top: '28px',
                    height: `${lineHeight}px`,
                    backgroundColor: version.color
                }}
            ></div>
            <div
                ref={boxRef}
                className={`w-full p-4 border border-gray-300 rounded-lg shadow-sm bg-white relative z-10`}
                style={{
                    marginTop: index % 2 === 0 ? '20px' : `${maxHeight / 2}px`,
                    borderLeftColor: version.color,
                    borderLeftWidth: '4px'
                }}
            >
                {/* <h3 className="font-bold text-sm mb-2">{stage.name}</h3> */}
                <p className="text-xs text-gray-600">{stage.description}</p>
            </div>
        </div>
    );
};

interface VersionTimelineProps {
    version: Version;
    maxHeight: number;
}

const VersionTimeline: React.FC<VersionTimelineProps> = ({ version, maxHeight }) => (
    <div className="flex flex-col mb-12 relative">
        <div className="absolute left-0 -top-6 font-bold" style={{ color: version.color }}>{version.name}</div>
        <div className="w-full h-7 flex items-center">
            <div className="flex-grow h-0.5" style={{ backgroundColor: version.color }}></div>
            <svg className="text-gray-500 -ml-[1px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: version.color }}>
                <path d="M0 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <div className="flex justify-between items-start relative mt-2 -top-9">
            {version.stages.map((stage, index) => (
                <TimelineItem
                    key={index}
                    stage={stage}
                    index={index}
                    version={version}
                    maxHeight={maxHeight}
                />
            ))}
        </div>
    </div>
);

const Timeline: React.FC = () => {
    const [maxHeight, setMaxHeight] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (timelineRef.current) {
            const boxes = timelineRef.current.querySelectorAll('[class*="w-full p-4 border"]');
            let maxBoxHeight = 0;
            boxes.forEach(box => {
                maxBoxHeight = Math.max(maxBoxHeight, box.offsetHeight);
            });
            setMaxHeight(maxBoxHeight + 40); // 40px for additional spacing
        }
    }, []);

    return (
        <div className="container mx-auto p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-12">软件开发进度时间轴</h2>
            <div className="relative" style={{ minWidth: '1200px' }} ref={timelineRef}>
                {timelineData.map((version, index) => (
                    <VersionTimeline key={index} version={version} maxHeight={maxHeight} />
                ))}
            </div>
        </div>
    );
};

export default Timeline;