import React, { useEffect, useState, useRef } from 'react';
import { Star } from 'lucide-react';
interface Milestone {
  date: string;
  version: string;
  is_milestone?: boolean;
}

interface Version {
  name: string;
  milestones: Milestone[];
}

interface VersionTimelineProps {
  versions: Version[];
  currentDate?: Date;
}

const VersionTimeline: React.FC<VersionTimelineProps> = ({ versions, currentDate = new Date() }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const allMilestones = versions.flatMap(v => v.milestones);
  const sortedMilestones = [...allMilestones].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const startDate = parseDate(sortedMilestones[0].date);
  const endDate = new Date(Math.max(parseDate(sortedMilestones[sortedMilestones.length - 1].date).getTime(), currentDate.getTime()));
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);

    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  const MIN_NODE_WIDTH = 80;
  const NODE_SPACING = 20;
  const TOTAL_PADDING = 40;
  const VERSION_HEIGHT = 150;

  const calculatePositions = () => {
    const availableWidth = containerWidth - TOTAL_PADDING;
    const allDates = [...sortedMilestones.map(m => m.date), formatDate(currentDate)];
    const uniqueDates = Array.from(new Set(allDates)).sort();
    const nodeCount = uniqueDates.length;
    const minTotalWidth = nodeCount * (MIN_NODE_WIDTH + NODE_SPACING) - NODE_SPACING;

    if (availableWidth < minTotalWidth) {
      const spacing = availableWidth / (nodeCount - 1);
      return uniqueDates.map((date, index) => ({
        date,
        position: index * spacing
      }));
    }

    const positions: { date: string; position: number }[] = [];
    let lastPosition = 0;

    uniqueDates.forEach((date) => {
      const daysFromStart = (parseDate(date).getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      const idealPosition = (daysFromStart / totalDays) * availableWidth;
      const position = Math.max(idealPosition, lastPosition + MIN_NODE_WIDTH + NODE_SPACING);
      positions.push({ date, position });
      lastPosition = position;
    });

    if (lastPosition > availableWidth) {
      const scale = availableWidth / lastPosition;
      return positions.map(item => ({
        date: item.date,
        position: item.position * scale
      }));
    }

    return positions;
  };

  const positions = calculatePositions();

  const isCurrentDateVisible = currentDate >= startDate && currentDate <= endDate;
  const currentDatePosition = isCurrentDateVisible
    ? positions.find(p => p.date === formatDate(currentDate))?.position
    : null;

  return (
    <div className="w-full py-12" ref={containerRef}>
      {versions.map((version, versionIndex) => (
        <div key={versionIndex} className="relative mb-8" style={{ height: `${VERSION_HEIGHT}px`, padding: `0 ${TOTAL_PADDING / 2}px` }}>
          <h3 className="text-lg font-semibold mb-2">{version.name}</h3>
          <div className="absolute w-full h-1 bg-slate-600 top-1/2 left-0 transform -translate-y-1/2"></div>

          {version.milestones.map((milestone, index) => {
            const position = positions.find(p => p.date === milestone.date)?.position;
            return (
              <div 
                key={index} 
                className="absolute flex flex-col items-center" 
                style={{ 
                  left: `${position}px`, 
                  top: '50%', 
                  transform: 'translate(-50%, -50%)',
                  width: `${MIN_NODE_WIDTH}px`
                }}
              >
                <span className="text-xs font-small mb-2 whitespace-nowrap">{milestone.date}</span>
                {milestone.is_milestone&& <Star className="w-4 h-4 text-red-500 absolute top-4 right-3" />}
                <div className="w-2 h-4 bg-blue-500 relative"></div>
                <span className="text-xs text-black-600 mt-2 whitespace-nowrap">{milestone.version}</span>
              </div>
            );
          })}

          {isCurrentDateVisible && currentDatePosition !== null && (
            <div
              className="absolute top-0 bottom-0 flex flex-col items-center justify-between py-2"
              style={{ 
                left: `${currentDatePosition}px`, 
                width: '2px',
                height: '100%',
                zIndex: 10
              }}
            >
              <span className="text-xs font-bold text-red-500 whitespace-nowrap mt-1">NOW</span>
              <div className="w-0.5 flex-grow bg-red-500" style={{ minHeight: '100px' }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Example usage
const versions: Version[] = [
  {
    name: "研发工具",
    milestones: [
        { date: '2024-08-14', version: '设计串讲'},
        { date: '2024-08-26', version: '单服务转测' },
        { date: '2024-08-28', version: '集成测试转测' ,is_milestone:true },
        { date: '2024-08-31', version: '第2轮测试' },
        { date: '2024-09-03', version: '第3轮测试' },
        { date: '2024-09-04', version: '发布评审' ,is_milestone:true },
        { date: '2024-09-05', version: '上线' },
    ]
  },
  {
    name: "POC",
    milestones: [
        { date: '2024-08-14', version: '设计串讲' },
        { date: '2024-08-26', version: '单服务转测' },
        { date: '2024-08-28', version: '集成测试转测' },
        { date: '2024-08-31', version: '第2轮测试' },
        { date: '2024-09-03', version: '第3轮测试' },
        { date: '2024-09-04', version: '发布评审' },
        { date: '2024-09-05', version: '上线' },
    ]
  }
];

const currentDate = new Date();

const App: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Version Timeline</h1>
      <VersionTimeline versions={versions} currentDate={currentDate} />
    </div>
  );
};

export default App;