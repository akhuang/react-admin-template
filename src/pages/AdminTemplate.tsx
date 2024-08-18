import React, { useState, useEffect, useRef } from 'react';

interface Version {
  content: string;
  date: string;
  isMilestone: boolean;
  isCurrentDate?: boolean; // 添加一个标记来标识当前日期
  relatedTo?: { roadmapId: string; versionIndex: number; description?: string };
}

interface RoadmapData {
  id: string;
  name: string;
  color: string;
  versions: Version[];
}

interface VersionLineProps {
  data: RoadmapData;
  yOffset: number;
  width: number;
  roadmapData: RoadmapData[];
}

const calculateCurrentDatePosition = (startDate: Date, endDate: Date, svgWidth: number): number => {
  const currentDate = new Date();
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = currentDate.getTime() - startDate.getTime();
  return (elapsedDuration / totalDuration) * svgWidth;
};

const insertCurrentDate = (roadmapData: RoadmapData[]): RoadmapData[] => {
  const currentDate = new Date().toISOString().split('T')[0]; // 获取当前日期
  return roadmapData.map(data => {
    const versionsWithCurrentDate = [...data.versions];
    const currentDateObj = new Date(currentDate);

    // 找到插入位置
    let insertIndex = versionsWithCurrentDate.findIndex(v => new Date(v.date) > currentDateObj);
    if (insertIndex === -1) {
      insertIndex = versionsWithCurrentDate.length;
    }

    versionsWithCurrentDate.splice(insertIndex, 0, {
      content: 'Current Date',
      date: currentDate,
      isMilestone: false,
      isCurrentDate: true // 添加标记
    });

    return { ...data, versions: versionsWithCurrentDate };
  });
};

const VersionLine: React.FC<VersionLineProps> = ({ data, yOffset, width, roadmapData }) => {
  const versionCount = data.versions.length;
  const spacing = (width - 200) / (versionCount - 1);
  const textRefs = useRef<(SVGTextElement | null)[]>([]);

  useEffect(() => {
    textRefs.current = textRefs.current.slice(0, versionCount * 2);
  }, [versionCount]);

  const getTextBoxSize = (contentIndex: number, dateIndex: number) => {
    const contentElement = textRefs.current[contentIndex];
    const dateElement = textRefs.current[dateIndex];
    if (contentElement && dateElement) {
      const contentBox = contentElement.getBBox();
      const dateBox = dateElement.getBBox();
      return {
        width: Math.max(contentBox.width, dateBox.width) + 20,
        height: contentBox.height + dateBox.height + 15
      };
    }
    return { width: 120, height: 50 };
  };

  const getRelatedPosition = (relatedTo: { roadmapId: string; versionIndex: number }) => {
    const relatedRoadmap = roadmapData.find(r => r.id === relatedTo.roadmapId);
    if (relatedRoadmap) {
      const relatedVersionCount = relatedRoadmap.versions.length;
      const relatedSpacing = (width - 200) / (relatedVersionCount - 1);
      const relatedX = 100 + relatedTo.versionIndex * relatedSpacing;
      const relatedYOffset = 130 + roadmapData.findIndex(r => r.id === relatedTo.roadmapId) * 250;
      return { x: relatedX, y: relatedYOffset };
    }
    return null;
  };

  return (
    <g>
      <line x1="50" y1={yOffset} x2={width - 50} y2={yOffset} stroke={data.color} strokeWidth="2" />
      <path d={`M${width - 50},${yOffset - 5} L${width - 40},${yOffset} L${width - 50},${yOffset + 5}`} fill={data.color} />

      {data.versions.map((v, index) => {
        const x = 100 + index * spacing;
        const isEven = index % 2 === 0;
        const textY = isEven ? yOffset - 70 : yOffset + 70;
        const { width: boxWidth, height: boxHeight } = getTextBoxSize(index * 2, index * 2 + 1);
        const relatedPosition = v.relatedTo ? getRelatedPosition(v.relatedTo) : null;

        return (
          <g key={`${v.content}-${v.date}`}>
            {v.isCurrentDate ? (
              <>
                <line
                  x1={x}
                  y1={yOffset - 40}
                  x2={x}
                  y2={yOffset + 50}
                  stroke="red"
                  strokeWidth="2"
                />
                <path
                  d="M10,10 L10,70 M10,10 Q20,15 30,10 T50,10 L50,25 Q40,30 30,25 T10,25 Z"
                  fill="red"
                  stroke="red"
                  strokeWidth="1"
                  transform={`translate(${x - 10}, ${yOffset - 60}) scale(0.9)`}
                />
                <text
                  x={x}
                  y={isEven ? textY + 20 : textY - boxHeight + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="red"
                >
                  {v.content}
                </text>
                <text
                  x={x}
                  y={isEven ? textY + 40 : textY - boxHeight + 40}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="red"
                >
                  {v.date}
                </text>
              </>
            ) : v.isMilestone ? (
              <>
 <path d={`M${x},${yOffset - 6} L${x + 6},${yOffset} L${x},${yOffset + 6} L${x - 6},${yOffset} Z`} fill="red" stroke="red" strokeWidth="2" />
<path
                  d={`M${x},${yOffset} Q${x},${(yOffset + textY) / 2} ${x},${isEven ? textY + boxHeight / 2 : textY - boxHeight / 2}`}
                  fill="none"
                  stroke={data.color}
                  strokeWidth="1"
                />

                <rect
                  x={x - boxWidth / 2}
                  y={isEven ? textY : textY - boxHeight}
                  width={boxWidth}
                  height={boxHeight + 5}
                  fill="white"
                  stroke={data.color}
                  strokeWidth="1"
                  rx="5"
                  ry="5"
                />

                <text
                  ref={el => textRefs.current[index * 2] = el}
                  x={x}
                  y={isEven ? textY + 20 : textY - boxHeight + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill={data.color}
                >
                  {v.content}
                </text>
                <text
                  ref={el => textRefs.current[index * 2 + 1] = el}
                  x={x}
                  y={isEven ? textY + 40 : textY - boxHeight + 40}
                  textAnchor="middle"
                  fontSize="10"
                  fill={data.color}
                >
                  {v.date}
                </text>
              </>
             
              
            ) : (
              <>
                <circle cx={x} cy={yOffset} r="4" fill="white" stroke={data.color} strokeWidth="2" />
                <text
                  x={x}
                  y={isEven ? textY + 20 : textY - boxHeight + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill={data.color}
                >
                  {v.content}
                </text>
                <text
                  x={x}
                  y={isEven ? textY + 40 : textY - boxHeight + 40}
                  textAnchor="middle"
                  fontSize="10"
                  fill={data.color}
                >
                  {v.date}
                </text>
                <path
                  d={`M${x},${yOffset} Q${x},${(yOffset + textY) / 2} ${x},${isEven ? textY + boxHeight / 2 : textY - boxHeight / 2}`}
                  fill="none"
                  stroke={data.color}
                  strokeWidth="1"
                />

                <rect
                  x={x - boxWidth / 2}
                  y={isEven ? textY : textY - boxHeight}
                  width={boxWidth}
                  height={boxHeight + 5}
                  fill="white"
                  stroke={data.color}
                  strokeWidth="1"
                  rx="5"
                  ry="5"
                />

                <text
                  ref={el => textRefs.current[index * 2] = el}
                  x={x}
                  y={isEven ? textY + 20 : textY - boxHeight + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill={data.color}
                >
                  {v.content}
                </text>
                <text
                  ref={el => textRefs.current[index * 2 + 1] = el}
                  x={x}
                  y={isEven ? textY + 40 : textY - boxHeight + 40}
                  textAnchor="middle"
                  fontSize="10"
                  fill={data.color}
                >
                  {v.date}
                </text>
              </>


            )}





            {relatedPosition && (
              <>
                <path
                  d={getPathWithArrow(x, yOffset, relatedPosition.x, relatedPosition.y)}
                  stroke="gray"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  fill="none"
                  markerEnd="url(#solidLineArrowhead)" // 使用虚线箭头
                />
                {v.relatedTo?.description && (
                  <text
                    x={(x + relatedPosition.x) / 2 + 20} // 调整文本位置
                    y={(yOffset + relatedPosition.y) / 2 - 30} // 调整文本位置
                    textAnchor="middle"
                    fontSize="10"
                    fill="gray"
                  >
                    {v.relatedTo.description}
                  </text>
                )}
              </>
            )}
          </g>
        );
      })}
    </g>
  );
};

interface MultiVersionRoadmapTrainProps {
  initialData: RoadmapData[];
}

const getPathWithArrow = (x1: number, y1: number, x2: number, y2: number) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const curveX = midX + 20; // 调整弯曲程度
  const curveY = midY - 20; // 调整弯曲程度

  // 计算箭头位置，稍微缩短路径
  const arrowOffsetX = (x2 - x1) * 0.05;
  const arrowOffsetY = (y2 - y1) * 0.05;
  const arrowX = x2 - arrowOffsetX;
  const arrowY = y2 - arrowOffsetY;

  return `M${x1},${y1} Q${curveX},${curveY} ${arrowX},${arrowY}`;
};

const MultiVersionRoadmapTrain: React.FC<MultiVersionRoadmapTrainProps> = ({ initialData }) => {
  const [roadmapData, setRoadmapData] = useState<RoadmapData[]>(insertCurrentDate(initialData));
  const [svgWidth, setSvgWidth] = useState(900);
  const [svgHeight, setSvgHeight] = useState(300);

  useEffect(() => {
    const maxVersions = Math.max(...roadmapData.map(data => data.versions.length));
    const newWidth = Math.max(900, 200 + maxVersions * 200);
    setSvgWidth(newWidth);

    const newHeight = Math.max(300, roadmapData.length * 250);
    setSvgHeight(newHeight);
  }, [roadmapData]);

  return (
    <div className="multi-version-roadmap-container" style={{ width: '100%', height: '100%' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="solidLineArrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="gray" />
          </marker>
        </defs>
        {roadmapData.map((data, index) => (
          <React.Fragment key={data.id}>
            <text x="20" y={50 + index * 250} fontSize="16" fontWeight="bold" fill={data.color}>{data.name}</text>
            <VersionLine data={data} yOffset={130 + index * 250} width={svgWidth} roadmapData={roadmapData} />
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default MultiVersionRoadmapTrain;