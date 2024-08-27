import React from 'react';

interface Milestone {
  date: string;
  version: string;
}

interface VersionTimelineProps {
  milestones: Milestone[];
  currentDate?: Date;
}

const VersionTimeline: React.FC<VersionTimelineProps> = ({ milestones, currentDate = new Date() }) => {
  const sortedMilestones = [...milestones].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const startDate = new Date(sortedMilestones[0].date);
  const endDate = new Date(Math.max(new Date(sortedMilestones[sortedMilestones.length - 1].date).getTime(), currentDate.getTime()));
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const getLeftPosition = (date: Date | string): string => {
    const daysFromStart = (new Date(date).getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    return `calc(100px + (100% - 200px) * ${daysFromStart / totalDays})`;
  };

  const isCurrentDateVisible = currentDate >= startDate && currentDate <= endDate;
  const currentDatePosition = getLeftPosition(currentDate);

  return (
    <div className="w-full py-12">
      <div className="relative h-[150px]  " style={{ padding: '0 100px' }}>
  
        {/* Continuous horizontal line */}
        <div className="absolute w-full h-1 bg-slate-600 top-1/2 left-0 transform -translate-y-1/2"></div>
        
        {/* Milestones */}
        {sortedMilestones.map((milestone, index) => (
          <div key={index} className="absolute flex flex-col items-center" style={{ left: getLeftPosition(milestone.date), top: '50%', transform: 'translate(-50%, -50%)' }}>
            <span className="text-xs font-medium mb-2 whitespace-nowrap">{formatDate(milestone.date)}</span>
            <div className="w-2 h-4 bg-blue-500 relative">
              {/* <div className="absolute w-full h-px bg-black top-1/2 transform -translate-y-1/2"></div> */}
            </div>
            <span className="text-xs text-gray-600 mt-2 whitespace-nowrap">{milestone.version}</span>
          </div>
        ))}

        {/* Current date marker */}
        {isCurrentDateVisible && (
          <div 
            className="absolute top-0 bottom-0 flex flex-col items-center justify-between py-2  " 
            style={{ left: currentDatePosition, width: '2px' }}
          >
             <span className="text-xs font-bold text-red-500 whitespace-nowrap mt-1">Current</span>
            <div className="w-0.5 flex-grow bg-red-500"></div>
           
          </div>
        )}
      </div>
    </div>
  );
};

// Example usage
const milestones: Milestone[] = [
  { date: '2024-08-14', version: '设计串讲' },
  { date: '2024-08-26', version: '单服务转测' },
  { date: '2024-08-28', version: '集成测试转测' },
  { date: '2024-08-31', version: '第2轮测试' },
  { date: '2024-09-03', version: '第3轮测试' },
  { date: '2024-09-04', version: '发布评审' },
  { date: '2024-09-05', version: '上线' },
];

// Assume the current date is March 1, 2024
const currentDate = new Date('2024-02-19');

const App: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Version Timeline</h1>
      <VersionTimeline milestones={milestones} currentDate={currentDate} />
    </div>
  );
};

export default App;