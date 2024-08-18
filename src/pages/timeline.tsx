import React from 'react';
import { CheckCircle, Circle, Flag } from 'lucide-react';

const stages = [
  { name: "需求分析", description: "收集和分析项目需求，确定主要功能和非功能需求，创建需求文档和用户故事", date: "2024-01-15", isMilestone: true },
  { name: "设计", description: "创建软件架构和用户界面设计，制定技术栈和数据库Schema设计", date: "2024-02-01", isMilestone: false },
  { name: "开发", description: "编写代码并实现功能，进行单元测试和持续集成", date: "2024-03-01", isMilestone: false },
  { name: "测试", description: "进行集成测试、系统测试和用户验收测试，修复发现的缺陷", date: "2024-04-15", isMilestone: true },
  { name: "部署", description: "将软件部署到生产环境，进行最终的性能调优和安全检查", date: "2024-05-01", isMilestone: true },
  { name: "维护", description: "持续支持和更新软件，处理用户反馈，进行必要的功能升级", date: "2024-05-15", isMilestone: false }
];

const Timeline = ({ currentStage }) => {
  return (
    <div className="container mx-auto p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">软件开发进度时间轴</h2>
      <div className="relative" style={{ minWidth: '1000px' }}>
        <div className="h-0.5 bg-blue-500 absolute top-3.5 left-0 right-0"></div>
        <div className="flex justify-between">
          {stages.map((stage, index) => (
            <div key={index} className="w-1/6 flex flex-col items-center">
              <div className="relative flex items-center justify-center w-7 h-7 rounded-full border-2 border-blue-500 bg-white z-10">
                {index <= currentStage ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
                {stage.isMilestone && (
                  <Flag className="w-3 h-3 text-red-500 absolute -top-1 -right-1" />
                )}
              </div>
              <div className="text-center mt-1">
                <span className="text-xs font-semibold">{stage.date}</span>
              </div>
              <div className={`border-l-2 border-dashed border-gray-300 ${index % 2 === 0 ? 'h-24' : 'h-56'}`}></div>
              <div className={`p-4 border border-gray-300 rounded-lg shadow-sm w-48 ${index % 2 === 0 ? '-mt-1' : '-mt-1'}`}>
                <h3 className="font-bold text-sm mb-2">{stage.name}</h3>
                <p className="text-xs text-gray-600">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SoftwareDevelopmentTimeline() {
  return <Timeline currentStage={2} />;
}