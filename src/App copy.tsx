import React from 'react'
import { Button } from "./components/ui/button" 
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./components/ui/card"
import AdminTemplate from './pages/AdminTemplate'
interface Version {
  content: string;
  date: string;
  isMilestone: boolean;
  relatedTo?: { roadmapId: string; versionIndex: number; description?: string }; // 新增 description 字段
}

interface RoadmapData {
  id: string;
  name: string;
  color: string;
  versions: Version[];
}
const calculateCurrentDatePosition = (startDate: Date, endDate: Date, svgWidth: number): number => {
  const currentDate = new Date();
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = currentDate.getTime() - startDate.getTime();
  return (elapsedDuration / totalDuration) * svgWidth;
};
const initialData = [
  {
    id: "web-app",
    name: "Web App Roadmap",
    color: "#0066cc",
    versions: [
      { content: "项目启动", date: "2024-01-01", isMilestone: false },
      { content: "Alpha 版本", date: "2024-04-01", isMilestone: false, relatedTo: { roadmapId: "mobile-app", versionIndex: 1, description: "与 Web App Beta 版本同步" } },
      { content: "Beta 版本", date: "2024-07-01", isMilestone: false },
      { content: "v1.0 发布", date: "2024-10-01", isMilestone: true },
      { content: "功能更新", date: "2025-01-01", isMilestone: false },
      { content: "v2.0 规划", date: "2025-04-01", isMilestone: false },
    ],
  },
  {
    id: "mobile-app",
    name: "Mobile App Roadmap",
    color: "#ff6600",
    versions: [
      { content: "项目启动", date: "2024-01-01", isMilestone: true },
      { content: "Alpha 版本", date: "2024-04-01", isMilestone: false },
      { content: "Beta 版本", date: "2024-07-01", isMilestone: false, relatedTo: { roadmapId: "web-app", versionIndex: 2, description: "与 Web App Beta 版本同步" } },
      { content: "v1.0 发布", date: "2024-10-01", isMilestone: true },
    ],
  },
];
const Roadmap: React.FC<{ data: RoadmapData }> = ({ data }) => {
  const startDate = new Date(data.versions[0].date);
  const endDate = new Date(data.versions[data.versions.length - 1].date);
  const svgWidth = 1000; // 假设 SVG 的宽度为 1000
  const currentDatePosition = calculateCurrentDatePosition(startDate, endDate, svgWidth);

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} 500`} xmlns="http://www.w3.org/2000/svg">
      <line
        x1={currentDatePosition}
        y1="0"
        x2={currentDatePosition}
        y2="500"
        stroke={data.color}
        strokeWidth="2"
      />
      {/* 其他绘制内容 */}
    </svg>
  );
};
const App: React.FC = () => {
  return (
    <AdminTemplate initialData={initialData}>
      {initialData.map((roadmap) => (
        <Roadmap key={roadmap.id} data={roadmap} />
      ))}
    </AdminTemplate>
  );
};
export default App